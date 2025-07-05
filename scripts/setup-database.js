const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  try {
    console.log('Setting up Supabase database...')
    
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.profiles (
          id uuid references auth.users on delete cascade primary key,
          email text unique not null,
          full_name text,
          created_at timestamp with time zone default timezone('utc'::text, now()) not null,
          updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
      `
    })
    
    if (profilesError) console.error('Profiles table error:', profilesError)
    else console.log('✓ Profiles table created')
    
    // Create services table
    const { error: servicesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.services (
          id uuid default gen_random_uuid() primary key,
          name text not null,
          price decimal(10,2) not null,
          duration text,
          description text,
          features jsonb default '[]'::jsonb,
          image_url text,
          is_active boolean default true,
          created_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
      `
    })
    
    if (servicesError) console.error('Services table error:', servicesError)
    else console.log('✓ Services table created')
    
    // Create questionnaires table
    const { error: questionnairesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.questionnaires (
          id uuid default gen_random_uuid() primary key,
          user_id uuid references public.profiles(id) on delete cascade,
          email text not null,
          responses jsonb not null default '{}'::jsonb,
          photo_urls text[],
          status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
          created_at timestamp with time zone default timezone('utc'::text, now()) not null,
          updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
      `
    })
    
    if (questionnairesError) console.error('Questionnaires table error:', questionnairesError)
    else console.log('✓ Questionnaires table created')
    
    // Create color_analyses table
    const { error: analysesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.color_analyses (
          id uuid default gen_random_uuid() primary key,
          questionnaire_id uuid references public.questionnaires(id) on delete cascade not null,
          user_id uuid references public.profiles(id) on delete cascade,
          season text not null,
          confidence integer check (confidence >= 0 and confidence <= 100),
          top_colors jsonb default '[]'::jsonb,
          color_palette jsonb default '{}'::jsonb,
          recommendations text,
          created_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
      `
    })
    
    if (analysesError) console.error('Analyses table error:', analysesError)
    else console.log('✓ Color analyses table created')
    
    // Create contact_messages table
    const { error: contactError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.contact_messages (
          id uuid default gen_random_uuid() primary key,
          name text not null,
          email text not null,
          subject text not null,
          message text not null,
          status text default 'new' check (status in ('new', 'read', 'replied')),
          created_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
      `
    })
    
    if (contactError) console.error('Contact messages table error:', contactError)
    else console.log('✓ Contact messages table created')
    
    console.log('Database setup completed!')
    
  } catch (error) {
    console.error('Setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()