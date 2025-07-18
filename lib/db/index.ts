import { createClientClient } from '../supabase/client';
import { createServerClient } from '../supabase/server';

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  service_id: string;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type QuestionnaireSubmission = {
  id: string;
  user_id: string;
  questionnaire_id: string;
  booking_id: string | null;
  answers: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type Payment = {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_intent_id: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
};

// Client-side database functions
export const getServices = async (): Promise<Service[]> => {
  const supabase = createClientClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('price');
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data || [];
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  const supabase = createClientClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching service ${id}:`, error);
    return null;
  }
  
  return data;
};

// Server-side database functions
export const getServicesServer = async (): Promise<Service[]> => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('price');
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data || [];
};

export const getProfileServer = async (userId: string): Promise<Profile | null> => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error(`Error fetching profile ${userId}:`, error);
    return null;
  }
  
  return data;
};