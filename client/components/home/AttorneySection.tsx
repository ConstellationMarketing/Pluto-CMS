import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { AboutFirmContent } from "@site/lib/cms/homePageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

interface Props {
  content: AboutFirmContent;
}

export default function AttorneySection({ content }: Props) {
  const { phoneNumber, phoneDisplay } = useGlobalPhone();

  return (
    <section
      style={{
        backgroundColor: "rgb(239, 240, 235)",
        backgroundImage: content.bgDecorImage ? `url(${content.bgDecorImage})` : undefined,
        backgroundPosition: "0% 100%",
        backgroundRepeat: "no-repeat",
        position: "relative",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          position: "relative",
          width: "80%",
        }}
      >
        <div style={{ display: "flex", gap: "32px" }}>
          {/* Left column: text + actions */}
          <div style={{ marginRight: "5.5%", width: "64.833%" }}>
            {/* Bio block */}
            <div style={{ paddingTop: "4.2415%", paddingBottom: "4.2415%" }}>
              <div style={{ fontSize: "22px", lineHeight: "33px" }}>
                <h2
                  style={{
                    fontFamily: '"Crimson Pro", Georgia, serif',
                    fontSize: "68.8128px",
                    fontWeight: 300,
                    lineHeight: "75.6941px",
                    overflowWrap: "anywhere",
                    paddingBottom: "10px",
                    wordBreak: "break-word",
                  }}
                >
                  {content.attorneyName}
                </h2>
                <h3
                  style={{
                    color: "rgb(48, 48, 48)",
                    fontFamily: "Poppins, Helvetica, Arial, sans-serif",
                    fontSize: "40px",
                    fontStyle: "italic",
                    lineHeight: "40px",
                    overflowWrap: "anywhere",
                    paddingBottom: "10px",
                    wordBreak: "break-word",
                  }}
                >
                  {content.attorneyTitle}
                </h3>
                {content.attorneyBio1 && (
                  <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", paddingBottom: "22px", wordBreak: "break-word" }}>
                    {content.attorneyBio1}
                  </p>
                )}
                {content.attorneyBio2 && (
                  <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", wordBreak: "break-word" }}>
                    {content.attorneyBio2}
                  </p>
                )}
              </div>
            </div>

            {/* CTA + Phone block */}
            <div style={{ paddingTop: "4.2415%", paddingBottom: "4.2415%" }}>
              <div style={{ display: "flex", gap: "8.483%" }}>
                {/* CTA button */}
                <div style={{ width: "45.758%" }}>
                  <Link
                    to={content.meetCtaUrl || "/about-us"}
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(238, 83, 14)",
                      border: "1px solid rgb(238, 83, 14)",
                      color: "rgb(255, 255, 255)",
                      cursor: "pointer",
                      display: "inline-flex",
                      fontSize: "24px",
                      gap: "12px",
                      lineHeight: "40.8px",
                      paddingBottom: "15px",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      paddingTop: "15px",
                      textDecoration: "none",
                      transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {content.meetCtaText || "MEET THE ATTORNEY"}
                    <ArrowRight
                      width={20}
                      height={20}
                      aria-hidden="true"
                      style={{ color: "rgb(255, 255, 255)", stroke: "rgb(255, 255, 255)", flexShrink: 0 }}
                    />
                  </Link>
                </div>

                {/* Phone block */}
                <div style={{ width: "45.758%" }}>
                  <div style={{ alignItems: "flex-start", display: "flex", maxWidth: "550px" }}>
                    {content.phoneIconUrl && (
                      <div style={{ paddingTop: "10px", width: "48px" }}>
                        <img
                          decoding="async"
                          width={42}
                          height={42}
                          alt="Phone icon"
                          loading="lazy"
                          src={content.phoneIconUrl}
                          style={{ width: "48px", maxWidth: "100%", verticalAlign: "middle" }}
                        />
                      </div>
                    )}
                    <div style={{ flexGrow: 1, paddingLeft: "15px" }}>
                      <h4 style={{ fontSize: "24px", overflowWrap: "anywhere", paddingBottom: "10px", wordBreak: "break-word" }}>
                        {content.callLabel || "Call For A Consultation"}
                      </h4>
                      {phoneNumber && (
                        <a
                          href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                          style={{
                            display: "inline",
                            fontFamily: '"Crimson Text", serif',
                            fontSize: "48px",
                            lineHeight: "57.6px",
                            overflowWrap: "anywhere",
                            wordBreak: "break-word",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          {phoneDisplay}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: attorney photo */}
          {content.attorneyPhoto && (
            <div style={{ paddingTop: "2.855%", paddingBottom: "2.855%", width: "29.6667%" }}>
              <img
                decoding="async"
                width={568}
                height={787}
                alt={content.attorneyPhotoAlt}
                title={content.attorneyPhotoAlt}
                loading="lazy"
                src={content.attorneyPhoto}
                style={{ width: "100%", maxWidth: "100%", verticalAlign: "middle" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
