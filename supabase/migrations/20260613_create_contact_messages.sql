-- Create the contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL CHECK (status IN ('unread', 'read', 'archived')),
    admin_notes TEXT
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Policy: Allow anyone (visitors) to insert messages (needed for contact form submission)
CREATE POLICY "Allow anonymous insertions" 
ON public.contact_messages 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 2. Policy: Restrict SELECT queries to authenticated users (admins) only
CREATE POLICY "Allow admin read access" 
ON public.contact_messages 
FOR SELECT 
TO authenticated 
USING (true);

-- 3. Policy: Restrict UPDATE queries (notes, read-status) to authenticated users (admins) only
CREATE POLICY "Allow admin write/update access" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated 
USING (true);

-- 4. Policy: Restrict DELETE actions to authenticated users (admins) only
CREATE POLICY "Allow admin delete access" 
ON public.contact_messages 
FOR DELETE 
TO authenticated 
USING (true);

-- Enable Real-time functionality for insertions on public.contact_messages
alter publication supabase_realtime add table public.contact_messages;
