use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    pubkey::Pubkey,
    signature::{Keypair, Signer},
    system_instruction,
    transaction::Transaction,
};
use std::{str::FromStr, sync::Arc};
use tower_http::cors::CorsLayer;
use tracing::{info, warn};
use uuid::Uuid;

mod blockchain;
mod database;
mod error;
mod models;

use blockchain::BlockchainService;
use database::DatabaseService;
use error::{AppError, Result};
use models::*;

#[derive(Clone)]
pub struct AppState {
    pub blockchain: Arc<BlockchainService>,
    pub database: Arc<DatabaseService>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    pub fn error(message: &str) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(message.to_string()),
        }
    }
}

// Health check endpoint
async fn health_check() -> Json<ApiResponse<&'static str>> {
    Json(ApiResponse::success("Solana service is running"))
}

// Get wallet balance
async fn get_balance(
    Query(params): Query<BalanceQuery>,
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<BalanceResponse>>> {
    let pubkey = Pubkey::from_str(&params.address)
        .map_err(|_| AppError::InvalidInput("Invalid wallet address".to_string()))?;

    let balance = state.blockchain.get_balance(&pubkey).await?;
    
    Ok(Json(ApiResponse::success(BalanceResponse {
        address: params.address,
        balance_lamports: balance,
        balance_sol: balance as f64 / 1_000_000_000.0,
    })))
}

// Create a new token mint
async fn create_mint(
    State(state): State<AppState>,
    Json(payload): Json<CreateMintRequest>,
) -> Result<Json<ApiResponse<MintResponse>>> {
    let result = state.blockchain.create_mint(
        payload.decimals,
        &payload.mint_authority,
        payload.freeze_authority.as_deref(),
    ).await?;

    // Store mint info in database
    state.database.store_mint_info(&result).await?;

    Ok(Json(ApiResponse::success(result)))
}

// Mint tokens to an address
async fn mint_tokens(
    State(state): State<AppState>,
    Json(payload): Json<MintTokensRequest>,
) -> Result<Json<ApiResponse<TransactionResponse>>> {
    let mint_pubkey = Pubkey::from_str(&payload.mint_address)
        .map_err(|_| AppError::InvalidInput("Invalid mint address".to_string()))?;
    
    let destination_pubkey = Pubkey::from_str(&payload.destination_address)
        .map_err(|_| AppError::InvalidInput("Invalid destination address".to_string()))?;

    let result = state.blockchain.mint_tokens(
        &mint_pubkey,
        &destination_pubkey,
        payload.amount,
        &payload.authority,
    ).await?;

    // Store transaction in database
    let transaction_record = TransactionRecord {
        id: Uuid::new_v4(),
        user_id: payload.user_id,
        transaction_hash: result.signature.clone(),
        transaction_type: "mint".to_string(),
        amount: Some(payload.amount as f64),
        token_address: Some(payload.mint_address),
        from_address: None,
        to_address: Some(payload.destination_address),
        status: "confirmed".to_string(),
        block_number: result.slot,
        metadata: serde_json::json!({
            "mint_authority": payload.authority,
            "amount": payload.amount
        }),
    };

    state.database.store_transaction(&transaction_record).await?;

    Ok(Json(ApiResponse::success(result)))
}

// Transfer tokens between addresses
async fn transfer_tokens(
    State(state): State<AppState>,
    Json(payload): Json<TransferTokensRequest>,
) -> Result<Json<ApiResponse<TransactionResponse>>> {
    let mint_pubkey = Pubkey::from_str(&payload.mint_address)
        .map_err(|_| AppError::InvalidInput("Invalid mint address".to_string()))?;
    
    let from_pubkey = Pubkey::from_str(&payload.from_address)
        .map_err(|_| AppError::InvalidInput("Invalid from address".to_string()))?;
    
    let to_pubkey = Pubkey::from_str(&payload.to_address)
        .map_err(|_| AppError::InvalidInput("Invalid to address".to_string()))?;

    let result = state.blockchain.transfer_tokens(
        &mint_pubkey,
        &from_pubkey,
        &to_pubkey,
        payload.amount,
        &payload.owner,
    ).await?;

    // Store transaction in database
    let transaction_record = TransactionRecord {
        id: Uuid::new_v4(),
        user_id: payload.user_id,
        transaction_hash: result.signature.clone(),
        transaction_type: "transfer".to_string(),
        amount: Some(payload.amount as f64),
        token_address: Some(payload.mint_address),
        from_address: Some(payload.from_address),
        to_address: Some(payload.to_address),
        status: "confirmed".to_string(),
        block_number: result.slot,
        metadata: serde_json::json!({
            "owner": payload.owner,
            "amount": payload.amount
        }),
    };

    state.database.store_transaction(&transaction_record).await?;

    Ok(Json(ApiResponse::success(result)))
}

// Get transaction history for a user
async fn get_transactions(
    Query(params): Query<TransactionQuery>,
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<Vec<TransactionRecord>>>> {
    let transactions = state.database.get_user_transactions(
        params.user_id,
        params.limit.unwrap_or(50),
        params.offset.unwrap_or(0),
    ).await?;

    Ok(Json(ApiResponse::success(transactions)))
}

// Verify a transaction on-chain
async fn verify_transaction(
    Query(params): Query<VerifyTransactionQuery>,
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<TransactionStatus>>> {
    let status = state.blockchain.get_transaction_status(&params.signature).await?;
    
    // Update transaction status in database
    state.database.update_transaction_status(&params.signature, &status.status).await?;

    Ok(Json(ApiResponse::success(status)))
}

pub async fn create_app() -> Result<Router> {
    // Load environment variables
    dotenv::dotenv().ok();

    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Initialize services
    let blockchain = Arc::new(BlockchainService::new().await?);
    let database = Arc::new(DatabaseService::new().await?);

    let state = AppState {
        blockchain,
        database,
    };

    // Build router
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/balance", get(get_balance))
        .route("/mint/create", post(create_mint))
        .route("/mint/tokens", post(mint_tokens))
        .route("/transfer", post(transfer_tokens))
        .route("/transactions", get(get_transactions))
        .route("/verify", get(verify_transaction))
        .layer(CorsLayer::permissive())
        .with_state(state);

    Ok(app)
}

#[tokio::main]
async fn main() -> Result<()> {
    let app = create_app().await?;

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await?;
    info!("Solana service listening on http://0.0.0.0:8080");

    axum::serve(listener, app).await?;

    Ok(())
}
