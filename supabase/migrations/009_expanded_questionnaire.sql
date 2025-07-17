-- Migration to support expanded questionnaires for different service types

-- Update questionnaire_submissions table with service_type field if not exists
ALTER TABLE questionnaire_submissions
ADD COLUMN IF NOT EXISTS service_type VARCHAR(100) DEFAULT '12-Season Color Analysis';

-- Create tables for service-specific data if they don't exist

-- Virtual Wardrobe Curation
CREATE TABLE IF NOT EXISTS wardrobe_audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  audit_type VARCHAR(50) DEFAULT 'virtual_curation',
  wardrobe_items JSONB DEFAULT '[]',
  outfit_combinations JSONB DEFAULT '[]',
  gap_analysis JSONB DEFAULT '[]',
  shopping_recommendations JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'pending',
  ai_analysis JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Personal Shopping Service
CREATE TABLE IF NOT EXISTS shopping_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  session_type VARCHAR(50) DEFAULT 'personal_shopping',
  budget_allocated INTEGER DEFAULT 0,
  curated_items JSONB DEFAULT '[]',
  fitting_notes TEXT DEFAULT '',
  purchase_recommendations JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'scheduled',
  ai_analysis JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Style Evolution Coaching
CREATE TABLE IF NOT EXISTS coaching_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  program_type VARCHAR(50) DEFAULT 'style_evolution',
  duration_months INTEGER DEFAULT 3,
  sessions_included INTEGER DEFAULT 6,
  makeover_included BOOLEAN DEFAULT true,
  confidence_coaching BOOLEAN DEFAULT true,
  progress_tracking JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'enrolled',
  ai_analysis JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE wardrobe_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_programs ENABLE ROW LEVEL SECURITY;

-- Create policies for wardrobe_audits
CREATE POLICY "Users can view their own wardrobe audits" ON wardrobe_audits
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM tickets t
    JOIN questionnaire_submissions qs ON t.id = qs.ticket_id
    WHERE t.id = wardrobe_audits.ticket_id AND qs.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage wardrobe audits" ON wardrobe_audits
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- Create policies for shopping_sessions
CREATE POLICY "Users can view their own shopping sessions" ON shopping_sessions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM tickets t
    JOIN questionnaire_submissions qs ON t.id = qs.ticket_id
    WHERE t.id = shopping_sessions.ticket_id AND qs.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage shopping sessions" ON shopping_sessions
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- Create policies for coaching_programs
CREATE POLICY "Users can view their own coaching programs" ON coaching_programs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM tickets t
    JOIN questionnaire_submissions qs ON t.id = qs.ticket_id
    WHERE t.id = coaching_programs.ticket_id AND qs.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage coaching programs" ON coaching_programs
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wardrobe_audits_ticket_id ON wardrobe_audits(ticket_id);
CREATE INDEX IF NOT EXISTS idx_shopping_sessions_ticket_id ON shopping_sessions(ticket_id);
CREATE INDEX IF NOT EXISTS idx_coaching_programs_ticket_id ON coaching_programs(ticket_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_service_type ON questionnaire_submissions(service_type);

-- Add updated_at triggers
CREATE TRIGGER update_wardrobe_audits_updated_at BEFORE UPDATE ON wardrobe_audits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shopping_sessions_updated_at BEFORE UPDATE ON shopping_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coaching_programs_updated_at BEFORE UPDATE ON coaching_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();