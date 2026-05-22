import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";
import ContactForm from "@site/components/home/ContactForm";

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
  const ctaHeadingLight = settings.footerCtaHeadingLight?.trim() || "Trusted Counsel When You";
  const ctaHeadingBold = settings.footerCtaHeadingBold?.trim() || "Need it Most";
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
      {/* Decorative background image - top right absolute */}
      <div
        style={{
          maxWidth: "2560px",
          overflowX: "hidden",
          overflowY: "hidden",
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", pointerEvents: "none" }}>
          <img
            src={bgImage}
            alt=""
            style={{ width: "1724px", maxWidth: "100%", display: "inline", verticalAlign: "middle" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Top Section: Form box (left) + CTA box (right) */}
      <div
        style={{
          alignItems: "flex-end",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          position: "relative",
          width: "90%",
        }}
      >
        {/* Left: Contact Form Box */}
        <div
          style={{
            backgroundColor: "rgb(39, 71, 86)",
            marginRight: "5.5%",
            padding: "40px",
            position: "relative",
            width: "36.7%",
            zIndex: 2,
          }}
        >
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <p
              style={{
                color: "rgb(255, 255, 255)",
                fontSize: "32px",
                fontWeight: 300,
                lineHeight: "38.4px",
                margin: 0,
              }}
            >
              {formHeadingLight}
            </p>
            <h2
              style={{
                color: "rgb(255, 255, 255)",
                fontSize: "59.136px",
                fontWeight: 300,
                lineHeight: "59.136px",
                paddingBottom: "10px",
                margin: 0,
              }}
            >
              {formHeadingBold}
            </h2>
          </div>
          <FooterContactForm />
        </div>

        {/* Right: CTA Box */}
        <div
          style={{
            paddingBottom: "32px",
            paddingRight: "10%",
            position: "relative",
            width: "57.8%",
            zIndex: 2,
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(39, 71, 86)",
              maxWidth: "630px",
              padding: "32px",
              position: "relative",
              width: "100%",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  color: "rgb(255, 255, 255)",
                  fontSize: "43.1616px",
                  fontWeight: 300,
                  lineHeight: "43.1616px",
                  paddingBottom: "10px",
                  margin: 0,
                }}
              >
                {ctaHeadingLight}{" "}
                <strong style={{ fontWeight: 700 }}>{ctaHeadingBold}</strong>
              </h2>
            </div>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Link
                to={ctaButtonUrl}
                style={{
                  backgroundColor: "rgb(238, 83, 14)",
                  color: "rgb(255, 255, 255)",
                  display: "inline-block",
                  fontSize: "24px",
                  lineHeight: "40.8px",
                  padding: "15px 55px 15px 30px",
                  textDecoration: "none",
                }}
              >
                {ctaButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: 4 columns */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          paddingTop: "80px",
          paddingBottom: "54px",
          position: "relative",
          width: "80%",
        }}
      >
        {/* Column 1: Logo + Phone */}
        <div style={{ marginRight: "5.5%", order: 1, position: "relative", width: "20.875%", zIndex: 2 }}>
          {logoUrl ? (
            <div style={{ marginBottom: "13%", lineHeight: 0 }}>
              <Link to="/">
                <img src={logoUrl} alt={logoAlt} style={{ maxWidth: "100%", width: "290px" }} />
              </Link>
            </div>
          ) : null}
          <a href={telHref} style={{ textDecoration: "none" }}>
            <div style={{ display: "table", width: "100%", maxWidth: "550px" }}>
              <div style={{ display: "table-cell", width: "48px", lineHeight: 0, paddingTop: "10px", verticalAlign: "top" }}>
                <img
                  src="https://design-pluto.netlify.app/images/phone-icon-footer.png"
                  alt=""
                  width={48}
                  height={48}
                  style={{ width: "48px", height: "48px" }}
                />
              </div>
              <div style={{ display: "table-cell", paddingLeft: "15px", verticalAlign: "top" }}>
                <h4
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontSize: "20px",
                    fontWeight: 300,
                    lineHeight: "28px",
                    paddingBottom: "10px",
                    margin: 0,
                  }}
                >
                  {phoneLabel}
                </h4>
                <p
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontFamily: '"Crimson Pro", Georgia, serif',
                    fontSize: "35px",
                    lineHeight: "28px",
                    margin: 0,
                  }}
                >
                  {phoneDisplay}
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ marginRight: "5.5%", order: 2, position: "relative", width: "20.875%", zIndex: 2 }}>
          <h3
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: "36px",
              fontWeight: 300,
              lineHeight: "36px",
              paddingBottom: "10px",
              margin: 0,
            }}
          >
            {quickLinksHeading}
          </h3>
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {quickLinks.length > 0 ? (
              quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href || "#"}
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontSize: "22px",
                    fontWeight: 300,
                    lineHeight: "33px",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))
            ) : null}
          </nav>
        </div>

        {/* Column 3: Address */}
        <div style={{ marginRight: "5.5%", order: 3, position: "relative", width: "20.875%", zIndex: 2 }}>
          {(addressLine1 || addressLine2) ? (
            <>
              <div style={{ marginBottom: "20px" }}>
                <MapPin
                  style={{ color: "rgb(255, 255, 255)", width: "43px", height: "43px" }}
                />
              </div>
              <p
                style={{
                  color: "rgb(255, 255, 255)",
                  fontSize: "22px",
                  fontWeight: 300,
                  lineHeight: "33px",
                  margin: 0,
                }}
              >
                <strong style={{ fontWeight: 700 }}>Address</strong>
                <br />
                {addressLine1}
                {addressLine2 ? (
                  <>
                    <br />
                    {addressLine2}
                  </>
                ) : null}
              </p>
            </>
          ) : null}
        </div>

        {/* Column 4: Map */}
        <div style={{ order: 4, position: "relative", width: "20.875%", zIndex: 2 }}>
          {mapEmbedUrl ? (
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              style={{
                borderRadius: "10px",
                border: "none",
                width: "100%",
                height: "300px",
                verticalAlign: "middle",
              }}
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

function FooterContactForm() {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "rgb(247, 247, 247)",
    border: "1px solid rgb(196, 196, 196)",
    color: "rgb(107, 107, 107)",
    height: "50px",
    padding: "12px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  if (submitted) {
    return (
      <div style={{ color: "rgb(255, 255, 255)", textAlign: "center", padding: "40px 0" }}>
        <p style={{ fontSize: "20px", fontWeight: 300 }}>Thank you! We will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} role="form">
      <div style={{ padding: "5px" }}>
        <div style={{ marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="First Name *"
            name="firstName"
            required
            aria-required="true"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="Last Name *"
            name="lastName"
            required
            aria-required="true"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <input
            type="email"
            placeholder="Email Address *"
            name="email"
            required
            aria-required="true"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <textarea
            placeholder="Message *"
            name="message"
            required
            aria-required="true"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            style={{
              ...inputStyle,
              height: "200px",
              resize: "vertical",
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: "rgb(238, 83, 14)",
              color: "rgb(247, 247, 247)",
              cursor: "pointer",
              display: "block",
              fontSize: "22px",
              height: "60px",
              lineHeight: "33px",
              padding: "12px",
              textAlign: "center",
              width: "100%",
              border: "none",
              boxSizing: "border-box",
            }}
          >
            {submitting ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </form>
  );
}
