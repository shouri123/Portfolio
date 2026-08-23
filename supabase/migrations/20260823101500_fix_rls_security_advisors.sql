-- =============================================
-- Migration: Fix RLS Policies & Security Definer Advisors
-- =============================================

-- 1. Remove overly permissive RLS policies on contact_messages
DROP POLICY IF EXISTS "Allow admin delete access" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admin update access" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admin read access" ON public.contact_messages;

-- 2. Remove overly permissive RLS policy on projects
DROP POLICY IF EXISTS "Allow admin full access" ON public.projects;

-- 3. Revoke public/anon/authenticated execute privileges on SECURITY DEFINER function rls_auto_enable
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'rls_auto_enable') THEN
        REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
        GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO service_role, postgres;
    END IF;
END $$;
