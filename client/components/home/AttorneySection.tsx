import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { AboutFirmContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
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
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
        position: "relative",
      }}
    >
      <div className="mx-auto w-[90%] md:w-[80%] max-w-[2560px] relative">
        <div className="flex flex-col lg:flex-row gap-[32px]">

          {/* Left: text + actions */}
          <div className="w-full lg:w-[64.833%] lg:mr-[5.5%]">
            <div className="py-[32px] md:py-[4.2415%]">
              <h2
                style={{
                  fontFamily: '"Crimson Pro", Georgia, serif',
                  fontSize: "clamp(32px, 6vw, 68px)",
                  fontWeight: 300,
                  lineHeight: 1.1,
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
                  fontSize: "clamp(18px, 3.5vw, 40px)",
                  fontStyle: "italic",
                  lineHeight: 1.2,
                  overflowWrap: "anywhere",
                  paddingBottom: "16px",
                  wordBreak: "break-word",
                }}
              >
                {content.attorneyTitle}
              </h3>
              {content.attorneyBioHtml ? (
                <RichText
                  html={content.attorneyBioHtml}
                  style={{ fontSize: "clamp(15px, 1.8vw, 22px)", lineHeight: 1.6 }}
                  className="[&_p]:pb-[20px] [&_p:last-child]:pb-0 [&_p]:overflow-wrap-anywhere"
                />
              ) : (
                <>
                  {content.attorneyBio1 && (
                    <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", lineHeight: 1.6, paddingBottom: "20px", overflowWrap: "anywhere", wordBreak: "break-word" }}>
                      {content.attorneyBio1}
                    </p>
                  )}
                  {content.attorneyBio2 && (
                    <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", lineHeight: 1.6, overflowWrap: "anywhere", wordBreak: "break-word" }}>
                      {content.attorneyBio2}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* CTA + Phone */}
            <div className="pb-[32px] md:pb-[4.2415%]">
              <div className="flex flex-col sm:flex-row gap-[24px] sm:gap-[8.483%]">
                {/* CTA button */}
                <div className="w-full sm:w-auto">
                  <Link
                    to={content.meetCtaUrl || "/about-us"}
                    className="inline-flex items-center gap-[10px] no-underline transition-opacity hover:opacity-85"
                    style={{
                      backgroundColor: "rgb(238, 83, 14)",
                      border: "1px solid rgb(238, 83, 14)",
                      color: "rgb(255, 255, 255)",
                      fontSize: "clamp(14px, 2vw, 24px)",
                      lineHeight: 1.5,
                      padding: "12px 20px",
                    }}
                  >
                    {content.meetCtaText || "MEET THE ATTORNEY"}
                    <ArrowRight width={18} height={18} aria-hidden="true" style={{ flexShrink: 0 }} />
                  </Link>
                </div>

                {/* Phone block */}
                <div className="flex items-start gap-[12px]">
                  {content.phoneIconUrl && (
                    <img
                      decoding="async"
                      width={42}
                      height={42}
                      alt="Phone icon"
                      loading="lazy"
                      src={content.phoneIconUrl}
                      className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] mt-[6px] shrink-0"
                    />
                  )}
                  <div>
                    <h4 style={{ fontSize: "clamp(14px, 2vw, 24px)", paddingBottom: "6px", overflowWrap: "anywhere", wordBreak: "break-word" }}>
                      {content.callLabel || "Call For A Consultation"}
                    </h4>
                    {phoneNumber && (
                      <a
                        href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                        style={{
                          fontFamily: '"Crimson Text", serif',
                          fontSize: "clamp(19px, 4vw, 43px)",
                          lineHeight: 1.2,
                          textDecoration: "none",
                          color: "inherit",
                          overflowWrap: "anywhere",
                          wordBreak: "break-word",
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

          {/* Right: attorney photo */}
          {content.attorneyPhoto && (
            <div className="w-full lg:w-[29.6667%] py-0 lg:py-[2.855%]">
              <img
                decoding="async"
                width={568}
                height={787}
                alt={content.attorneyPhotoAlt}
                title={content.attorneyPhotoAlt}
                loading="lazy"
                src={content.attorneyPhoto}
                className="w-full max-w-[400px] mx-auto lg:max-w-full lg:mx-0 align-middle"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
