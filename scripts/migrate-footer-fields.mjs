import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sb = createClient(url, key);

// Test if new columns exist
const { error } = await sb
  .from("site_settings")
  .select("footer_bg_image")
  .limit(1);

if (!error) {
  console.log("✅ New footer columns already exist in the database!");
} else {
  console.log("❌ New footer columns NOT in database yet.");
  console.log("\nRun this SQL in your Supabase SQL Editor to add them:\n");
  console.log(`-- Step 1: Add columns to the table
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS footer_bg_image text,
  ADD COLUMN IF NOT EXISTS footer_form_heading_light text,
  ADD COLUMN IF NOT EXISTS footer_form_heading_bold text,
  ADD COLUMN IF NOT EXISTS footer_cta_heading_light text,
  ADD COLUMN IF NOT EXISTS footer_cta_heading_bold text,
  ADD COLUMN IF NOT EXISTS footer_cta_button_text text,
  ADD COLUMN IF NOT EXISTS footer_cta_button_url text;

-- Step 2: Recreate the public view to include new columns
CREATE OR REPLACE VIEW public.site_settings_public AS
SELECT
  id, settings_key, site_name, logo_url, logo_alt,
  phone_number, phone_display, phone_availability, apply_phone_globally,
  header_cta_text, header_cta_url, navigation_items,
  footer_about_links, footer_practice_links,
  footer_resources_heading, footer_practice_areas_heading,
  address_line1, address_line2, map_embed_url,
  social_links, copyright_text, footer_tagline_html,
  site_noindex, ga4_measurement_id, google_ads_id,
  google_ads_conversion_label, head_scripts, footer_scripts,
  site_url, updated_at, favicon_source_url, favicon_assets, global_schema,
  footer_bg_image, footer_form_heading_light, footer_form_heading_bold,
  footer_cta_heading_light, footer_cta_heading_bold,
  footer_cta_button_text, footer_cta_button_url
FROM site_settings;`);
}
