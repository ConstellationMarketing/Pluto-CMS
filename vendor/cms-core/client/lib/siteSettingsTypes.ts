// TypeScript interfaces for global site settings (Header/Footer CMS)

import { normalizeFaviconAssets, type FaviconAssets } from "@site/lib/seo/favicon";

export interface NavigationChildItem {
  label: string;
  href: string;
  openInNewTab?: boolean;
  children?: NavigationChildItem[];
}

export interface NavigationItem {
  label: string;
  href: string;
  order?: number;
  openInNewTab?: boolean;
  children?: NavigationChildItem[];
}

export interface FooterLink {
  label: string;
  href?: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";
  url: string;
  enabled: boolean;
}

export interface SiteSettings {
  // Site Name
  siteName: string;

  // Logo
  logoUrl: string;
  logoAlt: string;
  faviconSourceUrl: string;
  faviconAssets: FaviconAssets | null;

  // Phone
  phoneNumber: string; // e.g., "4049057742"
  phoneDisplay: string; // e.g., "404-905-7742"
  phoneAvailability: string; // e.g., "Available 24/7"
  applyPhoneGlobally: boolean;

  // Header CTA
  headerCtaText: string;
  headerCtaUrl: string;
  headerCtaBgColor: string;
  headerCtaTextColor: string;
  headerCtaBorderColor: string;

  // Header Phone
  headerPhoneLabel: string;
  headerPhoneIconUrl: string;

  // Navigation
  navigationItems: NavigationItem[];

  // Footer Links
  footerAboutLinks: FooterLink[];
  footerPracticeLinks: FooterLink[];
  footerResourcesHeading: string;
  footerPracticeAreasHeading: string;

  // Address
  addressLine1: string;
  addressLine2: string;

  // Map
  mapEmbedUrl: string;

  // Social
  socialLinks: SocialLink[];

  // Copyright
  copyrightText: string;

  // Footer Tagline (Rich Text HTML)
  footerTaglineHtml: string;

  // Footer Layout
  footerLogoUrl: string;
  footerLogoAlt: string;
  footerBgImage: string;
  footerFormHeadingLight: string;
  footerFormHeadingBold: string;
  footerCtaHeadingLight: string;
  footerCtaHeadingBold: string;
  footerCtaButtonText: string;
  footerCtaButtonUrl: string;

  // SEO
  siteUrl: string;
  siteNoindex: boolean;
  globalSchema: string; // JSON-LD schema injected on every page

  // Analytics & Scripts
  ga4MeasurementId: string;
  googleAdsId: string;
  googleAdsConversionLabel: string;
  headScripts: string;
  footerScripts: string;
}

// Database row structure from Supabase site_settings table
export interface SiteSettingsRow {
  id: string;
  settings_key: string;
  logo_url: string | null;
  logo_alt: string | null;
  favicon_source_url: string | null;
  favicon_assets: FaviconAssets | null;
  phone_number: string | null;
  phone_display: string | null;
  phone_availability: string | null;
  apply_phone_globally: boolean;
  header_cta_text: string | null;
  header_cta_url: string | null;
  header_cta_bg_color: string | null;
  header_cta_text_color: string | null;
  header_cta_border_color: string | null;
  header_phone_label: string | null;
  header_phone_icon_url: string | null;
  navigation_items: NavigationItem[];
  footer_about_links: FooterLink[];
  footer_practice_links: FooterLink[];
  footer_resources_heading: string | null;
  footer_practice_areas_heading: string | null;
  address_line1: string | null;
  address_line2: string | null;
  map_embed_url: string | null;
  social_links: SocialLink[];
  copyright_text: string | null;
  footer_tagline_html: string | null;
  footer_logo_url: string | null;
  footer_logo_alt: string | null;
  footer_bg_image: string | null;
  footer_form_heading_light: string | null;
  footer_form_heading_bold: string | null;
  footer_cta_heading_light: string | null;
  footer_cta_heading_bold: string | null;
  footer_cta_button_text: string | null;
  footer_cta_button_url: string | null;
  site_noindex: boolean;
  ga4_measurement_id: string | null;
  google_ads_id: string | null;
  google_ads_conversion_label: string | null;
  head_scripts: string | null;
  footer_scripts: string | null;
  site_name: string | null;
  site_url: string | null;
  global_schema: string | null;
  updated_at: string;
  updated_by: string | null;
}

// Default values matching current hardcoded content
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "",
  logoUrl:
    "",
  logoAlt: "",
  faviconSourceUrl: "",
  faviconAssets: null,
  phoneNumber: "",
  phoneDisplay: "",
  phoneAvailability: "",
  applyPhoneGlobally: true,
  headerCtaText: "",
  headerCtaUrl: "",
  headerCtaBgColor: "#ee530e",
  headerCtaTextColor: "#ffffff",
  headerCtaBorderColor: "",
  headerPhoneLabel: "",
  headerPhoneIconUrl: "",
  navigationItems: [
  ],
  footerAboutLinks: [

  ],
  footerPracticeLinks: [

  ],
  footerResourcesHeading: "",
  footerPracticeAreasHeading: "",
  addressLine1: "",
  addressLine2: "",
  mapEmbedUrl:
    "",
  socialLinks: [
   
  ],
  copyrightText: "",
  footerTaglineHtml: "",
  footerLogoUrl: "",
  footerLogoAlt: "",
  footerBgImage: "",
  footerFormHeadingLight: "",
  footerFormHeadingBold: "",
  footerCtaHeadingLight: "",
  footerCtaHeadingBold: "",
  footerCtaButtonText: "",
  footerCtaButtonUrl: "",
  siteUrl: "",
  siteNoindex: false,
  globalSchema: "",
  ga4MeasurementId: "",
  googleAdsId: "",
  googleAdsConversionLabel: "",
  headScripts: "",
  footerScripts: "",
};

// Helper to convert database row to SiteSettings interface
export function rowToSiteSettings(row: SiteSettingsRow): SiteSettings {
  return {
    siteName: row.site_name || DEFAULT_SITE_SETTINGS.siteName,
    logoUrl: row.logo_url || DEFAULT_SITE_SETTINGS.logoUrl,
    logoAlt: row.logo_alt || DEFAULT_SITE_SETTINGS.logoAlt,
    faviconSourceUrl: row.favicon_source_url || DEFAULT_SITE_SETTINGS.faviconSourceUrl,
    faviconAssets: normalizeFaviconAssets(row.favicon_assets) || DEFAULT_SITE_SETTINGS.faviconAssets,
    phoneNumber: row.phone_number || DEFAULT_SITE_SETTINGS.phoneNumber,
    phoneDisplay: row.phone_display || DEFAULT_SITE_SETTINGS.phoneDisplay,
    phoneAvailability:
      row.phone_availability || DEFAULT_SITE_SETTINGS.phoneAvailability,
    applyPhoneGlobally:
      row.apply_phone_globally ?? DEFAULT_SITE_SETTINGS.applyPhoneGlobally,
    headerCtaText: row.header_cta_text || DEFAULT_SITE_SETTINGS.headerCtaText,
    headerCtaUrl: row.header_cta_url || DEFAULT_SITE_SETTINGS.headerCtaUrl,
    headerCtaBgColor: row.header_cta_bg_color || DEFAULT_SITE_SETTINGS.headerCtaBgColor,
    headerCtaTextColor: row.header_cta_text_color || DEFAULT_SITE_SETTINGS.headerCtaTextColor,
    headerCtaBorderColor: row.header_cta_border_color || DEFAULT_SITE_SETTINGS.headerCtaBorderColor,
    headerPhoneLabel: row.header_phone_label || DEFAULT_SITE_SETTINGS.headerPhoneLabel,
    headerPhoneIconUrl: row.header_phone_icon_url || DEFAULT_SITE_SETTINGS.headerPhoneIconUrl,
    navigationItems: row.navigation_items?.length
      ? row.navigation_items
      : DEFAULT_SITE_SETTINGS.navigationItems,
    footerAboutLinks: row.footer_about_links?.length
      ? row.footer_about_links
      : DEFAULT_SITE_SETTINGS.footerAboutLinks,
    footerPracticeLinks: row.footer_practice_links?.length
      ? row.footer_practice_links
      : DEFAULT_SITE_SETTINGS.footerPracticeLinks,
    footerResourcesHeading:
      row.footer_resources_heading || DEFAULT_SITE_SETTINGS.footerResourcesHeading,
    footerPracticeAreasHeading:
      row.footer_practice_areas_heading || DEFAULT_SITE_SETTINGS.footerPracticeAreasHeading,
    addressLine1: row.address_line1 || DEFAULT_SITE_SETTINGS.addressLine1,
    addressLine2: row.address_line2 || DEFAULT_SITE_SETTINGS.addressLine2,
    mapEmbedUrl: row.map_embed_url || DEFAULT_SITE_SETTINGS.mapEmbedUrl,
    socialLinks: row.social_links?.length
      ? row.social_links
      : DEFAULT_SITE_SETTINGS.socialLinks,
    copyrightText: row.copyright_text || DEFAULT_SITE_SETTINGS.copyrightText,
    footerTaglineHtml: row.footer_tagline_html || DEFAULT_SITE_SETTINGS.footerTaglineHtml,
    footerLogoUrl: row.footer_logo_url || DEFAULT_SITE_SETTINGS.footerLogoUrl,
    footerLogoAlt: row.footer_logo_alt || DEFAULT_SITE_SETTINGS.footerLogoAlt,
    footerBgImage: row.footer_bg_image || DEFAULT_SITE_SETTINGS.footerBgImage,
    footerFormHeadingLight: row.footer_form_heading_light || DEFAULT_SITE_SETTINGS.footerFormHeadingLight,
    footerFormHeadingBold: row.footer_form_heading_bold || DEFAULT_SITE_SETTINGS.footerFormHeadingBold,
    footerCtaHeadingLight: row.footer_cta_heading_light || DEFAULT_SITE_SETTINGS.footerCtaHeadingLight,
    footerCtaHeadingBold: row.footer_cta_heading_bold || DEFAULT_SITE_SETTINGS.footerCtaHeadingBold,
    footerCtaButtonText: row.footer_cta_button_text || DEFAULT_SITE_SETTINGS.footerCtaButtonText,
    footerCtaButtonUrl: row.footer_cta_button_url || DEFAULT_SITE_SETTINGS.footerCtaButtonUrl,
    siteUrl: row.site_url || "",
    siteNoindex: row.site_noindex ?? DEFAULT_SITE_SETTINGS.siteNoindex,
    globalSchema: row.global_schema || "",
    ga4MeasurementId: row.ga4_measurement_id || "",
    googleAdsId: row.google_ads_id || "",
    googleAdsConversionLabel: row.google_ads_conversion_label || "",
    headScripts: row.head_scripts || "",
    footerScripts: row.footer_scripts || "",
  };
}

// Helper to convert SiteSettings to database row format for updates
export function siteSettingsToRow(
  settings: SiteSettings,
): Partial<SiteSettingsRow> {
  return {
    logo_url: settings.logoUrl,
    logo_alt: settings.logoAlt,
    favicon_source_url: settings.faviconSourceUrl || null,
    favicon_assets: settings.faviconAssets,
    phone_number: settings.phoneNumber,
    phone_display: settings.phoneDisplay,
    phone_availability: settings.phoneAvailability,
    apply_phone_globally: settings.applyPhoneGlobally,
    header_cta_text: settings.headerCtaText,
    header_cta_url: settings.headerCtaUrl,
    header_cta_bg_color: settings.headerCtaBgColor || null,
    header_cta_text_color: settings.headerCtaTextColor || null,
    header_cta_border_color: settings.headerCtaBorderColor || null,
    header_phone_label: settings.headerPhoneLabel,
    header_phone_icon_url: settings.headerPhoneIconUrl,
    navigation_items: settings.navigationItems,
    footer_about_links: settings.footerAboutLinks,
    footer_practice_links: settings.footerPracticeLinks,
    footer_resources_heading: settings.footerResourcesHeading || null,
    footer_practice_areas_heading: settings.footerPracticeAreasHeading || null,
    address_line1: settings.addressLine1,
    address_line2: settings.addressLine2,
    map_embed_url: settings.mapEmbedUrl,
    social_links: settings.socialLinks,
    copyright_text: settings.copyrightText,
    footer_tagline_html: settings.footerTaglineHtml || null,
    ...(settings.footerLogoUrl ? { footer_logo_url: settings.footerLogoUrl } : {}),
    ...(settings.footerLogoAlt ? { footer_logo_alt: settings.footerLogoAlt } : {}),
    ...(settings.footerBgImage ? { footer_bg_image: settings.footerBgImage } : {}),
    ...(settings.footerFormHeadingLight ? { footer_form_heading_light: settings.footerFormHeadingLight } : {}),
    ...(settings.footerFormHeadingBold ? { footer_form_heading_bold: settings.footerFormHeadingBold } : {}),
    ...(settings.footerCtaHeadingLight ? { footer_cta_heading_light: settings.footerCtaHeadingLight } : {}),
    ...(settings.footerCtaHeadingBold ? { footer_cta_heading_bold: settings.footerCtaHeadingBold } : {}),
    ...(settings.footerCtaButtonText ? { footer_cta_button_text: settings.footerCtaButtonText } : {}),
    ...(settings.footerCtaButtonUrl ? { footer_cta_button_url: settings.footerCtaButtonUrl } : {}),
    site_noindex: settings.siteNoindex,
    ga4_measurement_id: settings.ga4MeasurementId || null,
    google_ads_id: settings.googleAdsId || null,
    google_ads_conversion_label: settings.googleAdsConversionLabel || null,
    head_scripts: settings.headScripts || null,
    footer_scripts: settings.footerScripts || null,
    site_name: settings.siteName,
    site_url: settings.siteUrl || null,
    global_schema: settings.globalSchema || null,
  };
}
