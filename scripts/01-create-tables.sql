-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'starter', 'professional', 'enterprise')),
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('inactive', 'trialing', 'active', 'canceled', 'past_due')),
  subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create automations table
CREATE TABLE IF NOT EXISTS automations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('whatsapp', 'instagram', 'email', 'webhook')),
  trigger_config JSONB DEFAULT '{}',
  actions JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create automation_runs table
CREATE TABLE IF NOT EXISTS automation_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  trigger_data JSONB DEFAULT '{}',
  result_data JSONB DEFAULT '{}',
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('whatsapp', 'instagram', 'gmail', 'telegram', 'discord')),
  status TEXT DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  config JSONB DEFAULT '{}',
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Create voice_clones table
CREATE TABLE IF NOT EXISTS voice_clones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  voice_id TEXT NOT NULL,
  provider TEXT DEFAULT 'elevenlabs' CHECK (provider IN ('elevenlabs', 'openai')),
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'ready', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('whatsapp', 'instagram', 'email', 'telegram', 'discord')),
  platform_message_id TEXT,
  sender_id TEXT NOT NULL,
  recipient_id TEXT NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'audio', 'video', 'document')),
  is_automated BOOLEAN DEFAULT false,
  automation_id UUID REFERENCES automations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_clones ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own automations" ON automations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own automations" ON automations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own automations" ON automations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own automations" ON automations FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own automation runs" ON automation_runs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own automation runs" ON automation_runs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own integrations" ON integrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own integrations" ON integrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own integrations" ON integrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own integrations" ON integrations FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own voice clones" ON voice_clones FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own voice clones" ON voice_clones FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own voice clones" ON voice_clones FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own voice clones" ON voice_clones FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own messages" ON messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_automations_user_id ON automations(user_id);
CREATE INDEX IF NOT EXISTS idx_automations_trigger_type ON automations(trigger_type);
CREATE INDEX IF NOT EXISTS idx_automation_runs_automation_id ON automation_runs(automation_id);
CREATE INDEX IF NOT EXISTS idx_automation_runs_user_id ON automation_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_platform ON integrations(platform);
CREATE INDEX IF NOT EXISTS idx_voice_clones_user_id ON voice_clones(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_platform ON messages(platform);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_automations_updated_at BEFORE UPDATE ON automations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_voice_clones_updated_at BEFORE UPDATE ON voice_clones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
