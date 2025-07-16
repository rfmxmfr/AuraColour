import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveColorAnalysis = async (userId: string, analysis: any) => {
  return await supabase
    .from('color_analysis')
    .insert({ user_id: userId, analysis });
};

export const saveOrder = async (userId: string, orderData: any) => {
  return await supabase
    .from('orders')
    .insert({ user_id: userId, ...orderData });
};