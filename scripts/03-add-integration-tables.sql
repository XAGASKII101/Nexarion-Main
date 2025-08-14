-- Add integration accounts table
CREATE TABLE IF NOT EXISTS integration_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  account_id VARCHAR(255) NOT NULL,
  account_name VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  account_data JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform, account_id)
);

-- Add automation triggers table
CREATE TABLE IF NOT EXISTS automation_triggers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  trigger_type VARCHAR(100) NOT NULL,
  trigger_config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add automation actions table
CREATE TABLE IF NOT EXISTS automation_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  action_config JSONB DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add webhook events table for real-time processing
CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE automation_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE webhook_events;
ALTER PUBLICATION supabase_realtime ADD TABLE automations;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_integration_accounts_user_platform ON integration_accounts(user_id, platform);
CREATE INDEX IF NOT EXISTS idx_webhook_events_processed ON webhook_events(processed, created_at);
CREATE INDEX IF NOT EXISTS idx_automation_responses_user_created ON automation_responses(user_id, created_at DESC);
