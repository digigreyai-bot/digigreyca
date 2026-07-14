
CREATE TABLE public.consultation_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.consultation_submissions TO anon;
GRANT INSERT ON public.consultation_submissions TO authenticated;
GRANT ALL ON public.consultation_submissions TO service_role;
ALTER TABLE public.consultation_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a consultation request"
  ON public.consultation_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
