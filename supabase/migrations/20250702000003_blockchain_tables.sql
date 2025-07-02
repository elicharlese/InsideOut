-- Add token mints table for tracking created mints
CREATE TABLE IF NOT EXISTS token_mints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mint_address TEXT NOT NULL UNIQUE,
  decimals SMALLINT NOT NULL DEFAULT 9,
  mint_authority TEXT NOT NULL,
  freeze_authority TEXT,
  total_supply DECIMAL(20,8) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add user wallet addresses table
CREATE TABLE IF NOT EXISTS user_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  wallet_type TEXT NOT NULL CHECK (wallet_type IN ('solana', 'phantom', 'solflare', 'ledger')),
  is_primary BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, wallet_address)
);

-- Add token holdings table for tracking user token balances
CREATE TABLE IF NOT EXISTS token_holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  mint_address TEXT NOT NULL REFERENCES token_mints(mint_address) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  balance DECIMAL(20,8) NOT NULL DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, mint_address, wallet_address)
);

-- Add notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  action_url TEXT,
  action_text TEXT,
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add staking rewards table
CREATE TABLE IF NOT EXISTS staking_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES blockchain_transactions(id) ON DELETE SET NULL,
  mint_address TEXT NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('stake', 'unstake', 'claim')),
  epoch BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add governance proposals table
CREATE TABLE IF NOT EXISTS governance_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proposer_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  proposal_type TEXT NOT NULL CHECK (proposal_type IN ('parameter', 'upgrade', 'treasury', 'general')),
  voting_start TIMESTAMPTZ NOT NULL,
  voting_end TIMESTAMPTZ NOT NULL,
  execution_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'passed', 'rejected', 'executed')),
  votes_for DECIMAL(20,8) DEFAULT 0,
  votes_against DECIMAL(20,8) DEFAULT 0,
  total_votes DECIMAL(20,8) DEFAULT 0,
  quorum_threshold DECIMAL(20,8) NOT NULL,
  execution_threshold DECIMAL(20,8) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add governance votes table
CREATE TABLE IF NOT EXISTS governance_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES governance_proposals(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  vote_choice TEXT NOT NULL CHECK (vote_choice IN ('for', 'against', 'abstain')),
  voting_power DECIMAL(20,8) NOT NULL,
  transaction_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(proposal_id, voter_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_token_mints_address ON token_mints(mint_address);
CREATE INDEX IF NOT EXISTS idx_user_wallets_user_id ON user_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_wallets_address ON user_wallets(wallet_address);
CREATE INDEX IF NOT EXISTS idx_token_holdings_user_id ON token_holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_token_holdings_mint ON token_holdings(mint_address);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_staking_rewards_user_id ON staking_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_governance_proposals_status ON governance_proposals(status);
CREATE INDEX IF NOT EXISTS idx_governance_votes_proposal_id ON governance_votes(proposal_id);

-- Add updated_at triggers
CREATE TRIGGER update_token_mints_updated_at BEFORE UPDATE ON token_mints FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_user_wallets_updated_at BEFORE UPDATE ON user_wallets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_governance_proposals_updated_at BEFORE UPDATE ON governance_proposals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE token_mints ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE staking_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE governance_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE governance_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blockchain tables

-- Token mints (public read, admin write)
CREATE POLICY "Anyone can view active token mints" ON token_mints
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage token mints" ON token_mints
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User wallets
CREATE POLICY "Users can manage their own wallets" ON user_wallets
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Token holdings
CREATE POLICY "Users can view their own token holdings" ON token_holdings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can update token holdings" ON token_holdings
  FOR ALL USING (true); -- Will be restricted by service role

-- Notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service can create notifications" ON notifications
  FOR INSERT WITH CHECK (true); -- Will be restricted by service role

-- Staking rewards
CREATE POLICY "Users can view their own staking rewards" ON staking_rewards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can create staking rewards" ON staking_rewards
  FOR INSERT WITH CHECK (true); -- Will be restricted by service role

-- Governance proposals
CREATE POLICY "Anyone can view governance proposals" ON governance_proposals
  FOR SELECT USING (true);

CREATE POLICY "Users can create governance proposals" ON governance_proposals
  FOR INSERT WITH CHECK (auth.uid() = proposer_id);

CREATE POLICY "Proposers can update their proposals" ON governance_proposals
  FOR UPDATE USING (auth.uid() = proposer_id);

-- Governance votes
CREATE POLICY "Anyone can view governance votes" ON governance_votes
  FOR SELECT USING (true);

CREATE POLICY "Users can vote on proposals" ON governance_votes
  FOR INSERT WITH CHECK (auth.uid() = voter_id);

CREATE POLICY "Users can update their own votes" ON governance_votes
  FOR UPDATE USING (auth.uid() = voter_id);
