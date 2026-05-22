ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS footer_bg_image text,
  ADD COLUMN IF NOT EXISTS footer_form_heading_light text,
  ADD COLUMN IF NOT EXISTS footer_form_heading_bold text,
  ADD COLUMN IF NOT EXISTS footer_cta_heading_light text,
  ADD COLUMN IF NOT EXISTS footer_cta_heading_bold text,
  ADD COLUMN IF NOT EXISTS footer_cta_button_text text,
  ADD COLUMN IF NOT EXISTS footer_cta_button_url text;
