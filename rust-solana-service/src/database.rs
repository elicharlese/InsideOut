use crate::{error::Result, models::*};
use sqlx::{PgPool, Row};
use uuid::Uuid;

pub struct DatabaseService {
    pool: PgPool,
}

impl DatabaseService {
    pub async fn new() -> Result<Self> {
        let database_url = std::env::var("DATABASE_URL")
            .expect("DATABASE_URL environment variable must be set");

        let pool = PgPool::connect(&database_url).await?;

        // Run migrations if needed
        sqlx::migrate!("../migrations").run(&pool).await?;

        Ok(Self { pool })
    }

    pub async fn store_transaction(&self, transaction: &TransactionRecord) -> Result<()> {
        sqlx::query!(
            r#"
            INSERT INTO blockchain_transactions (
                id, user_id, transaction_hash, transaction_type, amount,
                token_address, from_address, to_address, status, block_number, metadata,
                created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
            ON CONFLICT (transaction_hash) DO UPDATE SET
                status = EXCLUDED.status,
                block_number = EXCLUDED.block_number,
                updated_at = NOW()
            "#,
            transaction.id,
            transaction.user_id,
            transaction.transaction_hash,
            transaction.transaction_type,
            transaction.amount,
            transaction.token_address,
            transaction.from_address,
            transaction.to_address,
            transaction.status,
            transaction.block_number.map(|n| n as i64),
            transaction.metadata
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    pub async fn store_mint_info(&self, mint: &MintResponse) -> Result<()> {
        sqlx::query!(
            r#"
            INSERT INTO token_mints (
                id, mint_address, decimals, mint_authority, freeze_authority, created_at
            ) VALUES ($1, $2, $3, $4, $5, NOW())
            ON CONFLICT (mint_address) DO NOTHING
            "#,
            Uuid::new_v4(),
            mint.mint_address,
            mint.decimals as i16,
            mint.mint_authority,
            mint.freeze_authority
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    pub async fn get_user_transactions(
        &self,
        user_id: Uuid,
        limit: i64,
        offset: i64,
    ) -> Result<Vec<TransactionRecord>> {
        let transactions = sqlx::query_as!(
            TransactionRecord,
            r#"
            SELECT 
                id, user_id, transaction_hash, transaction_type, amount,
                token_address, from_address, to_address, status, 
                block_number, metadata
            FROM blockchain_transactions
            WHERE user_id = $1
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3
            "#,
            user_id,
            limit,
            offset
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(transactions)
    }

    pub async fn update_transaction_status(
        &self,
        transaction_hash: &str,
        status: &str,
    ) -> Result<()> {
        sqlx::query!(
            r#"
            UPDATE blockchain_transactions 
            SET status = $1, updated_at = NOW()
            WHERE transaction_hash = $2
            "#,
            status,
            transaction_hash
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    pub async fn get_mint_info(&self, mint_address: &str) -> Result<Option<MintRecord>> {
        let mint = sqlx::query_as!(
            MintRecord,
            r#"
            SELECT id, mint_address, decimals, mint_authority, freeze_authority, created_at
            FROM token_mints
            WHERE mint_address = $1
            "#,
            mint_address
        )
        .fetch_optional(&self.pool)
        .await?;

        Ok(mint)
    }

    pub async fn get_user_token_balances(&self, user_id: Uuid) -> Result<Vec<serde_json::Value>> {
        let balances = sqlx::query!(
            r#"
            SELECT 
                tm.mint_address,
                tm.decimals,
                SUM(CASE 
                    WHEN bt.transaction_type = 'mint' AND bt.to_address IS NOT NULL THEN bt.amount
                    WHEN bt.transaction_type = 'transfer' AND bt.to_address IS NOT NULL THEN bt.amount
                    WHEN bt.transaction_type = 'transfer' AND bt.from_address IS NOT NULL THEN -bt.amount
                    ELSE 0
                END) as balance
            FROM blockchain_transactions bt
            JOIN token_mints tm ON bt.token_address = tm.mint_address
            WHERE bt.user_id = $1 AND bt.status = 'confirmed'
            GROUP BY tm.mint_address, tm.decimals
            "#,
            user_id
        )
        .fetch_all(&self.pool)
        .await?;

        let results = balances
            .into_iter()
            .map(|row| {
                serde_json::json!({
                    "mint_address": row.mint_address,
                    "decimals": row.decimals,
                    "balance": row.balance.unwrap_or(0.0)
                })
            })
            .collect();

        Ok(results)
    }
}
