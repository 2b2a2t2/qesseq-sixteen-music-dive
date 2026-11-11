CREATE TABLE public.preorder_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  country text,
  message text,
  locale text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX preorder_signups_email_unique ON public.preorder_signups (lower(email));

GRANT INSERT ON public.preorder_signups TO anon, authenticated;
GRANT ALL ON public.preorder_signups TO service_role;

ALTER TABLE public.preorder_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the pre-order list"
ON public.preorder_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (name IS NULL OR char_length(name) <= 100)
  AND (country IS NULL OR char_length(country) <= 80)
  AND (message IS NULL OR char_length(message) <= 1000)
  AND locale IN ('en', 'fr')
);