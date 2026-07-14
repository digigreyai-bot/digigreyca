
DROP POLICY "Anyone can submit a consultation request" ON public.consultation_submissions;
CREATE POLICY "Anyone can submit a bounded consultation request"
  ON public.consultation_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (phone IS NULL OR char_length(phone) <= 40)
    AND char_length(service) BETWEEN 1 AND 120
    AND (message IS NULL OR char_length(message) <= 4000)
  );
