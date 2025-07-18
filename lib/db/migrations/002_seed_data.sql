-- Migration: 002_seed_data.sql
-- Description: Initial seed data for AuraColor app

-- Seed data for services
INSERT INTO services (name, description, price, duration, active)
VALUES 
  ('12-Season Color Analysis', 'Discover your optimal color palette based on your natural coloring. Our professional analysis will identify your color season and provide you with a comprehensive palette guide.', 75.00, 60, true),
  ('Virtual Wardrobe Curation', 'Get personalized wardrobe recommendations based on your color season. Our experts will help you curate a cohesive wardrobe that flatters your natural coloring.', 100.00, 90, true),
  ('Personal Shopping Service', 'One-on-one shopping assistance with a professional stylist who will help you select pieces that complement your color season and personal style.', 150.00, 120, true),
  ('Style Evolution Coaching', 'Complete style transformation program including color analysis, wardrobe curation, and personal shopping assistance.', 300.00, 180, true)
ON CONFLICT DO NOTHING;

-- Seed data for questionnaires
INSERT INTO questionnaires (title, description, active)
VALUES 
  ('Color Analysis Questionnaire', 'Preliminary questions to help us understand your coloring and style preferences before your color analysis session.', true),
  ('Style Preferences Survey', 'Help us understand your style preferences and goals for your wardrobe.', true)
ON CONFLICT DO NOTHING;

-- Seed data for questions (Color Analysis Questionnaire)
INSERT INTO questions (questionnaire_id, question_text, question_type, options, required, order_index)
VALUES 
  ((SELECT id FROM questionnaires WHERE title = 'Color Analysis Questionnaire'), 'How would you describe your natural hair color?', 'multiple_choice', '["Blonde", "Light brown", "Medium brown", "Dark brown", "Black", "Red", "Gray/Silver", "Other"]', true, 1),
  ((SELECT id FROM questionnaires WHERE title = 'Color Analysis Questionnaire'), 'How would you describe your eye color?', 'multiple_choice', '["Blue", "Green", "Gray", "Hazel", "Light brown", "Dark brown", "Other"]', true, 2),
  ((SELECT id FROM questionnaires WHERE title = 'Color Analysis Questionnaire'), 'How would you describe your skin tone?', 'multiple_choice', '["Very fair", "Fair", "Medium", "Olive", "Deep", "Other"]', true, 3),
  ((SELECT id FROM questionnaires WHERE title = 'Color Analysis Questionnaire'), 'Do you tan easily or burn in the sun?', 'multiple_choice', '["Always burn, never tan", "Usually burn, tan minimally", "Sometimes burn, tan gradually", "Rarely burn, tan easily", "Never burn, always tan"]', true, 4),
  ((SELECT id FROM questionnaires WHERE title = 'Color Analysis Questionnaire'), 'Which colors do you feel you look best in?', 'multiple_choice', '["Earth tones (browns, olives, mustards)", "Jewel tones (emerald, sapphire, ruby)", "Pastels (soft pink, baby blue, lavender)", "Bright colors (fuchsia, cobalt, yellow)", "Neutrals (black, white, gray, navy)", "Not sure"]', true, 5),
  ((SELECT id FROM questionnaires WHERE title = 'Color Analysis Questionnaire'), 'Please upload a recent photo of yourself in natural lighting without makeup.', 'file_upload', null, true, 6)
ON CONFLICT DO NOTHING;

-- Seed data for questions (Style Preferences Survey)
INSERT INTO questions (questionnaire_id, question_text, question_type, options, required, order_index)
VALUES 
  ((SELECT id FROM questionnaires WHERE title = 'Style Preferences Survey'), 'How would you describe your current style?', 'multiple_choice', '["Classic", "Casual", "Bohemian", "Minimalist", "Romantic", "Edgy", "Preppy", "Other"]', true, 1),
  ((SELECT id FROM questionnaires WHERE title = 'Style Preferences Survey'), 'What are your style goals?', 'multiple_choice', '["Build a capsule wardrobe", "Find my personal style", "Update my look", "Dress for my body type", "Incorporate more color", "Other"]', true, 2),
  ((SELECT id FROM questionnaires WHERE title = 'Style Preferences Survey'), 'Which clothing items do you wear most often?', 'multiple_choice', '["Dresses", "Jeans and t-shirts", "Skirts and blouses", "Trousers and sweaters", "Athleisure", "Other"]', true, 3),
  ((SELECT id FROM questionnaires WHERE title = 'Style Preferences Survey'), 'What is your budget for clothing per month?', 'multiple_choice', '["Under £50", "£50-£100", "£100-£200", "£200-£500", "Over £500"]', true, 4),
  ((SELECT id FROM questionnaires WHERE title = 'Style Preferences Survey'), 'Are there any colors or styles you absolutely avoid?', 'text', null, false, 5)
ON CONFLICT DO NOTHING;