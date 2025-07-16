-- Utility functions and views for AuraColour application

-- Function to generate unique gift voucher codes
CREATE OR REPLACE FUNCTION generate_voucher_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM gift_vouchers WHERE gift_vouchers.code = code) INTO exists_check;
    
    -- Exit loop if code is unique
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Function to get dashboard statistics
CREATE OR REPLACE FUNCTION get_dashboard_stats(admin_user_id UUID DEFAULT NULL)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats JSON;
BEGIN
  -- Check if user is admin (if admin_user_id provided)
  IF admin_user_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = admin_user_id AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  SELECT json_build_object(
    'totalRevenue', COALESCE(SUM(p.amount), 0),
    'totalOrders', COUNT(DISTINCT qs.id),
    'activeCustomers', COUNT(DISTINCT qs.user_id),
    'pendingReports', COUNT(DISTINCT ar.id) FILTER (WHERE ar.status = 'draft'),
    'completedReports', COUNT(DISTINCT ar.id) FILTER (WHERE ar.status = 'completed'),
    'contactForms', COUNT(DISTINCT cs.id),
    'monthlyRevenue', (
      SELECT COALESCE(SUM(amount), 0) 
      FROM payments 
      WHERE status = 'succeeded' 
        AND created_at >= date_trunc('month', CURRENT_DATE)
    ),
    'weeklyOrders', (
      SELECT COUNT(*) 
      FROM questionnaire_submissions 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    )
  ) INTO stats
  FROM questionnaire_submissions qs
  LEFT JOIN payments p ON p.questionnaire_id = qs.id AND p.status = 'succeeded'
  LEFT JOIN analyst_reports ar ON ar.questionnaire_id = qs.id
  LEFT JOIN contact_submissions cs ON cs.created_at >= CURRENT_DATE - INTERVAL '30 days';
  
  RETURN stats;
END;
$$;

-- Function to validate and redeem gift voucher
CREATE OR REPLACE FUNCTION redeem_gift_voucher(
  voucher_code TEXT,
  user_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  voucher gift_vouchers%ROWTYPE;
  result JSON;
BEGIN
  -- Get voucher details
  SELECT * INTO voucher
  FROM gift_vouchers
  WHERE code = voucher_code
    AND status = 'active'
    AND (expires_at IS NULL OR expires_at > NOW());
  
  -- Check if voucher exists and is valid
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Invalid or expired voucher code'
    );
  END IF;
  
  -- Redeem the voucher
  UPDATE gift_vouchers
  SET status = 'redeemed',
      redeemed_at = NOW(),
      redeemed_by = user_id
  WHERE id = voucher.id;
  
  -- Return success with voucher details
  RETURN json_build_object(
    'success', true,
    'voucher', json_build_object(
      'id', voucher.id,
      'amount', voucher.amount,
      'currency', voucher.currency,
      'service_type', voucher.service_type,
      'message', voucher.message
    )
  );
END;
$$;

-- Function to get user's color analysis history
CREATE OR REPLACE FUNCTION get_user_analysis_history(user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  history JSON;
BEGIN
  -- Check if user is accessing their own data or is admin
  IF auth.uid() != user_id AND NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst')
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  
  SELECT json_agg(
    json_build_object(
      'id', ar.id,
      'season', ar.season_analysis,
      'confidence', ar.confidence_score,
      'created_at', ar.created_at,
      'status', ar.status,
      'service_type', qs.service_type,
      'colors', ar.color_recommendations
    ) ORDER BY ar.created_at DESC
  ) INTO history
  FROM analyst_reports ar
  JOIN questionnaire_submissions qs ON qs.id = ar.questionnaire_id
  WHERE qs.user_id = user_id;
  
  RETURN COALESCE(history, '[]'::json);
END;
$$;

-- View for admin dashboard - questionnaire submissions with payment info
CREATE OR REPLACE VIEW admin_questionnaire_view AS
SELECT 
  qs.id,
  qs.name,
  qs.email,
  qs.phone,
  qs.service_type,
  qs.payment_status,
  qs.status,
  qs.created_at,
  qs.updated_at,
  p.amount as payment_amount,
  p.currency,
  p.paid_at,
  ar.season_analysis,
  ar.confidence_score,
  ar.status as report_status,
  prof.full_name as user_name
FROM questionnaire_submissions qs
LEFT JOIN payments p ON p.questionnaire_id = qs.id AND p.status = 'succeeded'
LEFT JOIN analyst_reports ar ON ar.questionnaire_id = qs.id
LEFT JOIN profiles prof ON prof.id = qs.user_id
ORDER BY qs.created_at DESC;

-- View for user's own submissions
CREATE OR REPLACE VIEW user_submissions_view AS
SELECT 
  qs.id,
  qs.service_type,
  qs.payment_status,
  qs.status,
  qs.created_at,
  p.amount,
  p.currency,
  ar.season_analysis,
  ar.confidence_score,
  ar.status as report_status,
  ar.sent_at
FROM questionnaire_submissions qs
LEFT JOIN payments p ON p.questionnaire_id = qs.id AND p.status = 'succeeded'
LEFT JOIN analyst_reports ar ON ar.questionnaire_id = qs.id
WHERE qs.user_id = auth.uid()
ORDER BY qs.created_at DESC;

-- View for monthly revenue statistics
CREATE OR REPLACE VIEW monthly_revenue_stats AS
SELECT 
  date_trunc('month', created_at) as month,
  COUNT(*) as total_payments,
  SUM(amount) as total_revenue,
  AVG(amount) as average_payment,
  COUNT(DISTINCT CASE WHEN currency = 'GBP' THEN 1 END) as gbp_payments,
  COUNT(DISTINCT CASE WHEN currency = 'USD' THEN 1 END) as usd_payments
FROM payments
WHERE status = 'succeeded'
GROUP BY date_trunc('month', created_at)
ORDER BY month DESC;

-- Trigger to automatically set payment status on questionnaire submissions
CREATE OR REPLACE FUNCTION update_questionnaire_payment_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update questionnaire payment status when payment succeeds
  IF NEW.status = 'succeeded' AND OLD.status != 'succeeded' THEN
    UPDATE questionnaire_submissions
    SET payment_status = 'confirmed'
    WHERE id = NEW.questionnaire_id;
  END IF;
  
  -- Update questionnaire payment status when payment fails
  IF NEW.status = 'failed' AND OLD.status != 'failed' THEN
    UPDATE questionnaire_submissions
    SET payment_status = 'failed'
    WHERE id = NEW.questionnaire_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER payment_status_trigger
  AFTER UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_questionnaire_payment_status();

-- Function to send notification (placeholder for webhook integration)
CREATE OR REPLACE FUNCTION notify_new_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- This would integrate with your notification system
  -- For now, we'll just log it
  INSERT INTO contact_submissions (name, email, subject, message)
  VALUES (
    'System',
    'admin@auracolor.com',
    'New Questionnaire Submission',
    'New submission from ' || COALESCE(NEW.name, 'Anonymous') || ' (' || COALESCE(NEW.email, 'No email') || ')'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_submission_notification
  AFTER INSERT ON questionnaire_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_submission();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION generate_voucher_code() TO authenticated;
GRANT EXECUTE ON FUNCTION get_dashboard_stats(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION redeem_gift_voucher(TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_analysis_history(UUID) TO authenticated;

-- Grant view access
GRANT SELECT ON admin_questionnaire_view TO authenticated;
GRANT SELECT ON user_submissions_view TO authenticated;
GRANT SELECT ON monthly_revenue_stats TO authenticated;

COMMENT ON FUNCTION generate_voucher_code IS 'Generate unique 8-character voucher code';
COMMENT ON FUNCTION get_dashboard_stats IS 'Get comprehensive dashboard statistics for admin';
COMMENT ON FUNCTION redeem_gift_voucher IS 'Validate and redeem gift voucher code';
COMMENT ON FUNCTION get_user_analysis_history IS 'Get user color analysis history';
COMMENT ON VIEW admin_questionnaire_view IS 'Admin view of all questionnaire submissions with payment and report info';
COMMENT ON VIEW user_submissions_view IS 'User view of their own submissions';
COMMENT ON VIEW monthly_revenue_stats IS 'Monthly revenue and payment statistics';