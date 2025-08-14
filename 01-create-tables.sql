-- Create users table for additional user data
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_plan TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create automations table
CREATE TABLE IF NOT EXISTS automations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  platform TEXT NOT NULL, -- 'instagram', 'whatsapp', 'email'
  status TEXT DEFAULT 'inactive', -- 'active', 'inactive', 'paused'
  trigger_type TEXT NOT NULL, -- 'comment', 'dm', 'mention'
  response_template TEXT,
  voice_enabled BOOLEAN DEFAULT false,
  voice_clone_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create automation_responses table
CREATE TABLE IF NOT EXISTS automation_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  trigger_content TEXT,
  response_content TEXT,
  response_type TEXT DEFAULT 'text', -- 'text', 'voice', 'sequence'
  status TEXT DEFAULT 'sent', -- 'sent', 'failed', 'pending'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create voice_clones table
CREATE TABLE IF NOT EXISTS voice_clones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  elevenlabs_voice_id TEXT,
  sample_audio_url TEXT,
  status TEXT DEFAULT 'processing', -- 'processing', 'ready', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_clones ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage own automations" ON automations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own responses" ON automation_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own voice clones" ON voice_clones FOR ALL USING (auth.uid() = user_id);
