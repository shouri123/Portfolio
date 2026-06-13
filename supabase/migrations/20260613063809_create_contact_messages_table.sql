-- =============================================
-- contact_messages table for portfolio contact form
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL CHECK (status IN ('unread', 'read', 'archived')),
    admin_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow visitors (anon) to INSERT messages via the contact form
CREATE POLICY "Allow anonymous insertions"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy 2: Allow authenticated admins to SELECT (read) all messages
CREATE POLICY "Allow admin read access"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);

-- Policy 3: Allow authenticated admins to UPDATE (status, notes) messages
CREATE POLICY "Allow admin update access"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Allow authenticated admins to DELETE (purge) messages
CREATE POLICY "Allow admin delete access"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (true);

-- Enable real-time for this table so admin dashboard gets live WebSocket pushes
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
