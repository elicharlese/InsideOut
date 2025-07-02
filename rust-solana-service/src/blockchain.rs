use crate::{error::Result, models::*};
use anyhow::anyhow;
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    instruction::Instruction,
    pubkey::Pubkey,
    signature::{Keypair, Signature, Signer},
    system_instruction,
    transaction::Transaction,
};
use spl_associated_token_account::{
    get_associated_token_address, instruction::create_associated_token_account,
};
use spl_token::{
    instruction::{initialize_mint, mint_to, transfer},
    state::Mint,
};
use std::str::FromStr;
use tracing::{info, warn};

pub struct BlockchainService {
    client: RpcClient,
    payer: Keypair,
}

impl BlockchainService {
    pub async fn new() -> Result<Self> {
        let rpc_url = std::env::var("SOLANA_RPC_URL")
            .unwrap_or_else(|_| "https://api.devnet.solana.com".to_string());
        
        let client = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

        // Load payer keypair from environment
        let private_key = std::env::var("SOLANA_PRIVATE_KEY")
            .map_err(|_| anyhow!("SOLANA_PRIVATE_KEY environment variable not set"))?;
        
        let payer = Keypair::from_base58_string(&private_key);

        info!("Blockchain service initialized with payer: {}", payer.pubkey());

        Ok(Self { client, payer })
    }

    pub async fn get_balance(&self, pubkey: &Pubkey) -> Result<u64> {
        let balance = self.client.get_balance(pubkey)?;
        Ok(balance)
    }

    pub async fn create_mint(
        &self,
        decimals: u8,
        mint_authority: &str,
        freeze_authority: Option<&str>,
    ) -> Result<MintResponse> {
        let mint_keypair = Keypair::new();
        let mint_pubkey = mint_keypair.pubkey();

        let mint_authority_pubkey = Pubkey::from_str(mint_authority)
            .map_err(|_| anyhow!("Invalid mint authority address"))?;

        let freeze_authority_pubkey = if let Some(freeze_auth) = freeze_authority {
            Some(Pubkey::from_str(freeze_auth)
                .map_err(|_| anyhow!("Invalid freeze authority address"))?)
        } else {
            None
        };

        // Calculate rent exemption amount for mint account
        let mint_rent = self.client.get_minimum_balance_for_rent_exemption(Mint::LEN)?;

        let mut instructions = vec![
            // Create mint account
            system_instruction::create_account(
                &self.payer.pubkey(),
                &mint_pubkey,
                mint_rent,
                Mint::LEN as u64,
                &spl_token::id(),
            ),
            // Initialize mint
            initialize_mint(
                &spl_token::id(),
                &mint_pubkey,
                &mint_authority_pubkey,
                freeze_authority_pubkey.as_ref(),
                decimals,
            )?,
        ];

        let recent_blockhash = self.client.get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &instructions,
            Some(&self.payer.pubkey()),
            &[&self.payer, &mint_keypair],
            recent_blockhash,
        );

        let signature = self.client.send_and_confirm_transaction(&transaction)?;
        
        info!("Created mint {} with signature {}", mint_pubkey, signature);

        Ok(MintResponse {
            mint_address: mint_pubkey.to_string(),
            signature: signature.to_string(),
            decimals,
            mint_authority: mint_authority.to_string(),
            freeze_authority: freeze_authority.map(|s| s.to_string()),
        })
    }

    pub async fn mint_tokens(
        &self,
        mint: &Pubkey,
        destination: &Pubkey,
        amount: u64,
        authority: &str,
    ) -> Result<TransactionResponse> {
        let authority_pubkey = Pubkey::from_str(authority)
            .map_err(|_| anyhow!("Invalid authority address"))?;

        // Get or create associated token account
        let destination_ata = get_associated_token_address(destination, mint);
        
        let mut instructions = vec![];

        // Check if ATA exists
        if self.client.get_account(&destination_ata).is_err() {
            instructions.push(create_associated_token_account(
                &self.payer.pubkey(),
                destination,
                mint,
                &spl_token::id(),
            ));
        }

        // Add mint instruction
        instructions.push(mint_to(
            &spl_token::id(),
            mint,
            &destination_ata,
            &authority_pubkey,
            &[],
            amount,
        )?);

        let recent_blockhash = self.client.get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &instructions,
            Some(&self.payer.pubkey()),
            &[&self.payer], // Authority should sign separately
            recent_blockhash,
        );

        let signature = self.client.send_and_confirm_transaction(&transaction)?;
        let slot = self.client.get_slot()?;

        info!("Minted {} tokens to {} with signature {}", amount, destination_ata, signature);

        Ok(TransactionResponse {
            signature: signature.to_string(),
            slot: Some(slot),
            status: "confirmed".to_string(),
        })
    }

    pub async fn transfer_tokens(
        &self,
        mint: &Pubkey,
        from: &Pubkey,
        to: &Pubkey,
        amount: u64,
        owner: &str,
    ) -> Result<TransactionResponse> {
        let owner_pubkey = Pubkey::from_str(owner)
            .map_err(|_| anyhow!("Invalid owner address"))?;

        let from_ata = get_associated_token_address(from, mint);
        let to_ata = get_associated_token_address(to, mint);

        let mut instructions = vec![];

        // Check if destination ATA exists
        if self.client.get_account(&to_ata).is_err() {
            instructions.push(create_associated_token_account(
                &self.payer.pubkey(),
                to,
                mint,
                &spl_token::id(),
            ));
        }

        // Add transfer instruction
        instructions.push(transfer(
            &spl_token::id(),
            &from_ata,
            &to_ata,
            &owner_pubkey,
            &[],
            amount,
        )?);

        let recent_blockhash = self.client.get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &instructions,
            Some(&self.payer.pubkey()),
            &[&self.payer], // Owner should sign separately
            recent_blockhash,
        );

        let signature = self.client.send_and_confirm_transaction(&transaction)?;
        let slot = self.client.get_slot()?;

        info!("Transferred {} tokens from {} to {} with signature {}", amount, from_ata, to_ata, signature);

        Ok(TransactionResponse {
            signature: signature.to_string(),
            slot: Some(slot),
            status: "confirmed".to_string(),
        })
    }

    pub async fn get_transaction_status(&self, signature: &str) -> Result<TransactionStatus> {
        let signature = Signature::from_str(signature)
            .map_err(|_| anyhow!("Invalid signature format"))?;

        match self.client.get_signature_status(&signature)? {
            Some(status) => {
                let status_str = if status.is_ok() {
                    "confirmed"
                } else {
                    "failed"
                };

                Ok(TransactionStatus {
                    signature: signature.to_string(),
                    status: status_str.to_string(),
                    confirmations: None, // Could be enhanced to get actual confirmations
                    slot: None, // Could be enhanced to get slot
                })
            }
            None => Ok(TransactionStatus {
                signature: signature.to_string(),
                status: "not_found".to_string(),
                confirmations: None,
                slot: None,
            }),
        }
    }
}
