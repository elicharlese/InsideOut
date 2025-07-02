use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

pub type Result<T> = std::result::Result<T, AppError>;

#[derive(Debug)]
pub enum AppError {
    Database(sqlx::Error),
    Solana(solana_client::client_error::ClientError),
    SolanaProgram(solana_program::program_error::ProgramError),
    InvalidInput(String),
    NotFound(String),
    Unauthorized,
    Internal(String),
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        Self::Database(err)
    }
}

impl From<solana_client::client_error::ClientError> for AppError {
    fn from(err: solana_client::client_error::ClientError) -> Self {
        Self::Solana(err)
    }
}

impl From<solana_program::program_error::ProgramError> for AppError {
    fn from(err: solana_program::program_error::ProgramError) -> Self {
        Self::SolanaProgram(err)
    }
}

impl From<anyhow::Error> for AppError {
    fn from(err: anyhow::Error) -> Self {
        Self::Internal(err.to_string())
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, error_message, error_code) = match self {
            AppError::Database(err) => {
                tracing::error!("Database error: {:?}", err);
                (StatusCode::INTERNAL_SERVER_ERROR, "Database error".to_string(), Some("DB_ERROR"))
            }
            AppError::Solana(err) => {
                tracing::error!("Solana RPC error: {:?}", err);
                (StatusCode::BAD_REQUEST, format!("Blockchain error: {}", err), Some("SOLANA_ERROR"))
            }
            AppError::SolanaProgram(err) => {
                tracing::error!("Solana program error: {:?}", err);
                (StatusCode::BAD_REQUEST, format!("Program error: {}", err), Some("PROGRAM_ERROR"))
            }
            AppError::InvalidInput(msg) => {
                (StatusCode::BAD_REQUEST, msg, Some("INVALID_INPUT"))
            }
            AppError::NotFound(msg) => {
                (StatusCode::NOT_FOUND, msg, Some("NOT_FOUND"))
            }
            AppError::Unauthorized => {
                (StatusCode::UNAUTHORIZED, "Unauthorized".to_string(), Some("UNAUTHORIZED"))
            }
            AppError::Internal(msg) => {
                tracing::error!("Internal error: {}", msg);
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error".to_string(), Some("INTERNAL_ERROR"))
            }
        };

        let body = Json(json!({
            "success": false,
            "error": error_message,
            "code": error_code
        }));

        (status, body).into_response()
    }
}
