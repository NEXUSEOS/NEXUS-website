-- Extend Supabase roles to align with @nexus/config platform RBAC
-- Run via Supabase CLI against website project

ALTER TABLE public.roles DROP CONSTRAINT IF EXISTS roles_name_check;
ALTER TABLE public.roles ADD CONSTRAINT roles_name_check CHECK (name IN (
  'visitor', 'viewer', 'developer', 'sponsor', 'editor', 'moderator', 'administrator', 'super_administrator'
));

INSERT INTO public.roles (name, description) VALUES
  ('viewer', 'Read-only platform access'),
  ('editor', 'CMS content editor'),
  ('moderator', 'Content and marketplace moderator'),
  ('super_administrator', 'Full platform super administrator')
ON CONFLICT (name) DO NOTHING;
