use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

// Request/Response models for API endpoints

#[derive(Debug, Deserialize)]
pub struct BalanceQuery {
    pub address: String,
}

#[derive(Debug, Serialize)]
pub struct BalanceResponse {
    pub address: String,
    pub balance_lamports: u64,
    pub balance_sol: f64,
}

#[derive(Debug, Deserialize)]
pub struct CreateMintRequest {
    pub decimals: u8,
    pub mint_authority: String,
    pub freeze_authority: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct MintResponse {
    pub mint_address: String,
    pub signature: String,
    pub decimals: u8,
    pub mint_authority: String,
    pub freeze_authority: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct MintTokensRequest {
    pub user_id: Uuid,
    pub mint_address: String,
    pub destination_address: String,
    pub amount: u64,
    pub authority: String,
}

#[derive(Debug, Deserialize)]
pub struct TransferTokensRequest {
    pub user_id: Uuid,
    pub mint_address: String,
    pub from_address: String,
    pub to_address: String,
    pub amount: u64,
    pub owner: String,
}

#[derive(Debug, Serialize)]
pub struct TransactionResponse {
    pub signature: String,
    pub slot: Option<u64>,
    pub status: String,
}

#[derive(Debug, Deserialize)]
pub struct TransactionQuery {
    pub user_id: Uuid,
    pub limit: Option<i64>,
    pub offset: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct VerifyTransactionQuery {
    pub signature: String,
}

#[derive(Debug, Serialize)]
pub struct TransactionStatus {
    pub signature: String,
    pub status: String,
    pub confirmations: Option<u64>,
    pub slot: Option<u64>,
}

// Database models

#[derive(Debug, Serialize, FromRow)]
pub struct TransactionRecord {
    pub id: Uuid,
    pub user_id: Uuid,
    pub transaction_hash: String,
    pub transaction_type: String,
    pub amount: Option<f64>,
    pub token_address: Option<String>,
    pub from_address: Option<String>,
    pub to_address: Option<String>,
    pub status: String,
    pub block_number: Option<u64>,
    pub metadata: serde_json::Value,
}

#[derive(Debug, Serialize, FromRow)]
pub struct MintRecord {
    pub id: Uuid,
    pub mint_address: String,
    pub decimals: i16,
    pub mint_authority: String,
    pub freeze_authority: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

// Token account information
#[derive(Debug, Serialize)]
pub struct TokenAccountInfo {
    pub address: String,
    pub mint: String,
    pub owner: String,
    pub amount: u64,
    pub decimals: u8,
}

// Error types for API responses
#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub error: String,
    pub code: Option<String>,
    pub details: Option<serde_json::Value>,
}
