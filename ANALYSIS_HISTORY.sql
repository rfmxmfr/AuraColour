-- Create analysis_history table for tracking user analysis history
CREATE TABLE analysis_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  analysis_type VARCHAR(50) NOT NULL,
  analysis_data JSONB NOT NULL,
  image_urls TEXT[],
  shared BOOLEAN DEFAULT false,
  share_token VARCHAR(64) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table for tracking usage patterns
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  session_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_analysis_history_user_id ON analysis_history(user_id);
CREATE INDEX idx_analysis_history_created_at ON analysis_history(created_at);
CREATE INDEX idx_analysis_history_share_token ON analysis_history(share_token);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_user_id ON analytics(user_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Enable RLS
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own analysis history" ON analysis_history
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own analysis history" ON analysis_history
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anyone can view shared analysis" ON analysis_history
FOR SELECT USING (shared = true);

CREATE POLICY "Admin can manage all analysis history" ON analysis_history
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can view analytics" ON analytics
FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can create analytics events" ON analytics
FOR INSERT WITH CHECK (true);