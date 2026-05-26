import { Link } from "react-router-dom";
import RichText from "@site/components/shared/RichText";
import { MapPin } from "lucide-react";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";
import CmsFormRenderer from "@site/components/shared/CmsFormRenderer";

export default function Footer() {
  const { settings } = useSiteSettings();

  const logoUrl = settings.footerLogoUrl?.trim() || settings.logoUrl?.trim() || "";
  const logoAlt = settings.footerLogoAlt?.trim() || settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";
  const phoneNumber = settings.phoneNumber?.trim() || "";
  const phoneDisplay = settings.phoneDisplay?.trim() || "404-555-5555";
  const phoneLabel = settings.phoneAvailability?.trim() || "Call For A Consultation";
  const copyrightText = (settings.copyrightText?.trim() || "").replace(
    /\{year\}/gi,
    String(new Date().getFullYear())
  );
  const rawMapUrl = settings.mapEmbedUrl?.trim() || "";
  const mapEmbedUrl = (() => {
    const srcMatch = rawMapUrl.match(/src=["']([^"']+)["']/);
    return srcMatch ? srcMatch[1] : rawMapUrl;
  })();
  const addressLine1 = settings.addressLine1?.trim() || "";
  const addressLine2 = settings.addressLine2?.trim() || "";

  const quickLinks = settings.footerAboutLinks ?? [];
  const quickLinksHeading = settings.footerResourcesHeading?.trim() || "Quick Links";

  const bgImage = settings.footerBgImage?.trim() || "https://design-pluto.netlify.app/images/footer-bg.jpg";
  const formHeadingLight = settings.footerFormHeadingLight?.trim() || "REQUEST A FREE CASE";
  const formHeadingBold = settings.footerFormHeadingBold?.trim() || "EVALUATION";
  const ctaHeadingHtml = settings.footerCtaHeadingLight?.trim() || "";
  const ctaHeadingFallback = "Trusted Counsel When You <strong>Need it Most</strong>";
  const ctaButtonText = settings.footerCtaButtonText?.trim() || "SCHEDULE A CONSULTATION";
  const ctaButtonUrl = settings.footerCtaButtonUrl?.trim() || "/contact";

  const telHref = phoneNumber ? `tel:${phoneNumber.replace(/\D/g, "")}` : "#";

  return (
    <footer
      style={{
        backgroundColor: "rgb(29, 129, 128)",
        position: "relative",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Top Section wrapper — bg image clipped here so it never bleeds into bottom section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full pointer-events-none hidden md:block">
          <div className="flex justify-end">
            <img
              src={bgImage}
              alt=""
              style={{ width: "1724px", maxWidth: "100%" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Top Section: Form box + CTA box — stack on mobile, side-by-side on desktop */}
        <div className="relative z-[2] mx-auto w-[95%] lg:w-[90%] max-w-[2560px] flex flex-col lg:flex-row lg:items-end">
        {/* Left: Contact Form Box */}
        <div
          className="w-full lg:w-[36.7%] lg:mr-[5.5%] p-[24px] md:p-[40px] relative z-[2]"
          style={{ backgroundColor: "rgb(39, 71, 86)" }}
        >
          <div className="mb-[20px] text-center">
            <p className="text-white font-light text-[22px] md:text-[32px] leading-tight m-0">
              {formHeadingLight}
            </p>
            <h2 className="text-white font-light text-[36px] md:text-[50px] lg:text-[59px] leading-tight pb-[10px] m-0">
              {formHeadingBold}
            </h2>
          </div>
          <CmsFormRenderer formId="contact" className="space-y-[20px]" />
        </div>

        {/* Right: CTA Box */}
        <div className="w-full lg:w-[57.8%] pb-0 lg:pb-[32px] lg:pr-[10%] relative z-[2]">
          <div
            className="w-full max-w-[630px] p-[24px] md:p-[32px]"
            style={{ backgroundColor: "rgb(39, 71, 86)" }}
          >
            <div className="text-center">
              <h2 className="text-white font-light text-[28px] md:text-[36px] lg:text-[43px] leading-tight pb-[10px] m-0">
                <RichText html={ctaHeadingHtml || ctaHeadingFallback} className="[&_strong]:font-bold [&_em]:italic" />
              </h2>
            </div>
            <div className="mt-[16px] text-center">
              <Link
                to={ctaButtonUrl}
                className="inline-block text-white text-[16px] md:text-[20px] lg:text-[24px] no-underline px-[20px] md:px-[30px] py-[12px] md:py-[15px]"
                style={{ backgroundColor: "rgb(238, 83, 14)" }}
              >
                {ctaButtonText}
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>{/* end top section wrapper */}

      {/* Bottom Section: 4 columns — stack on mobile, 2-col on sm, 4-col on lg */}
      <div className="relative z-[2] mx-auto w-[90%] max-w-[2560px] pt-[40px] md:pt-[60px] lg:pt-[80px] pb-[40px] md:pb-[54px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px] lg:gap-0">

        {/* Column 1: Logo + Phone */}
        <div className="relative z-[2] lg:mr-[5.5%]">
          {logoUrl ? (
            <div className="mb-[20px]">
              <Link to="/">
                <img src={logoUrl} alt={logoAlt} className="max-w-full w-[220px] md:w-[290px]" />
              </Link>
            </div>
          ) : null}
          <a href={telHref} className="no-underline flex items-start gap-[12px]">
            <img
              src="https://design-pluto.netlify.app/images/phone-icon-footer.png"
              alt=""
              width={48}
              height={48}
              className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] mt-[4px] shrink-0"
            />
            <div>
              <h4 className="text-white font-light text-[16px] md:text-[20px] leading-[28px] pb-[4px] m-0">
                {phoneLabel}
              </h4>
              <p
                className="text-white text-[24px] md:text-[30px] lg:text-[35px] leading-tight m-0"
                style={{ fontFamily: '"Crimson Pro", Georgia, serif' }}
              >
                {phoneDisplay}
              </p>
            </div>
          </a>
        </div>

        {/* Column 2: Quick Links */}
        <div className="relative z-[2] lg:mr-[5.5%]">
          <h3 className="text-white font-light text-[24px] md:text-[30px] lg:text-[36px] leading-tight pb-[10px] m-0">
            {quickLinksHeading}
          </h3>
          <nav className="flex flex-col gap-[8px]">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href || "#"}
                className="text-white font-light text-[18px] md:text-[22px] leading-[33px] no-underline hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3: Address */}
        <div className="relative z-[2] lg:mr-[5.5%]">
          {(addressLine1 || addressLine2) ? (
            <>
              <div className="mb-[16px]">
                <MapPin className="text-white w-[36px] h-[36px] md:w-[43px] md:h-[43px]" />
              </div>
              <p className="text-white font-light text-[18px] md:text-[22px] leading-[33px] m-0">
                <strong className="font-bold">Address</strong>
                <br />
                {addressLine1}
                {addressLine2 ? (<><br />{addressLine2}</>) : null}
              </p>
            </>
          ) : null}
        </div>

        {/* Column 4: Map */}
        <div className="relative z-[2]">
          {mapEmbedUrl ? (
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="250"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="w-full h-[250px] rounded-[10px] border-none align-middle"
            />
          ) : null}
        </div>
      </div>

      {/* Copyright */}
      {copyrightText ? (
        <div
          style={{
            backgroundColor: "rgb(39, 71, 86)",
            position: "relative",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "1080px",
              paddingBottom: "40px",
              paddingTop: "15px",
              width: "80%",
            }}
          >
          <p
            style={{
              color: "rgb(255, 255, 255)",
              fontFamily: "Outfit, Helvetica, Arial, sans-serif",
              fontSize: "20px",
              fontWeight: 300,
              lineHeight: "30px",
              margin: 0,
              textAlign: "center",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {copyrightText}
          </p>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
