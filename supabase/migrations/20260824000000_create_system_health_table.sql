-- =============================================
-- Table: system_health
-- Stores automated health checks, uptime status, database latency, and system telemetry.
-- =============================================

CREATE TABLE IF NOT EXISTS public.system_health (
    id TEXT PRIMARY KEY DEFAULT 'current',
    last_check_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    status TEXT NOT NULL DEFAULT 'operational',
    latency_ms INTEGER NOT NULL DEFAULT 0,
    projects_count INTEGER DEFAULT 0,
    unread_messages_count INTEGER DEFAULT 0,
    github_stars INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public / anonymous read access to system health indicators
CREATE POLICY "Allow public read access on system_health"
ON public.system_health
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy 2: Allow service role / admin backend full management access
CREATE POLICY "Allow service role write access on system_health"
ON public.system_health
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Seed initial current record if table is empty
INSERT INTO public.system_health (id, last_check_at, status, latency_ms, projects_count, unread_messages_count, github_stars, metadata)
VALUES ('current', NOW(), 'operational', 24, 10, 0, 92, '{"runtime": "Next.js App Router", "checked_by": "initial_seed"}'::jsonb)
ON CONFLICT (id) DO NOTHING;
