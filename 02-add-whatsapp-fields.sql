-- Add WhatsApp-specific fields to automations table
ALTER TABLE automations ADD COLUMN IF NOT EXISTS whatsapp_phone_number TEXT;
ALTER TABLE automations ADD COLUMN IF NOT EXISTS whatsapp_template_name TEXT;

-- Add WhatsApp integration settings table
CREATE TABLE IF NOT EXISTS whatsapp_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  phone_number_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  webhook_verify_token TEXT NOT NULL,
  business_account_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE whatsapp_integrations ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can manage own WhatsApp integrations" ON whatsapp_integrations FOR ALL USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_integrations_user_id ON whatsapp_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_responses_platform ON automation_responses(platform);
