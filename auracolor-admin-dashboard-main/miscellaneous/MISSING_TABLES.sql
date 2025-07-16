-- Create tickets table
CREATE TABLE tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  service_type VARCHAR(100) DEFAULT 'color_analysis',
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'normal',
  image_url TEXT,
  questionnaire_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analyst reports table
CREATE TABLE analyst_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  analyst_id UUID REFERENCES profiles(id),
  season_analysis TEXT,
  color_recommendations JSONB,
  styling_notes TEXT,
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  status VARCHAR(50) DEFAULT 'draft',
  ai_analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_reports_ticket_id ON analyst_reports(ticket_id);
CREATE INDEX idx_reports_status ON analyst_reports(status);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyst_reports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin can manage tickets" ON tickets
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can manage reports" ON analyst_reports
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');