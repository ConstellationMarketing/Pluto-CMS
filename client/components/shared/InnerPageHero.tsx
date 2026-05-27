import { ArrowRight } from "lucide-react";
import RichText from "./RichText";

interface InnerPageHeroProps {
  backgroundImage?: string;
  overlayOpacity?: number;
  /** Large decorative tagline — plain text */
  tagline?: string;
  /** Large decorative tagline — raw HTML (takes priority over tagline) */
  taglineHtml?: string;
  /** Page title rendered as H1, shown below accent bar */
  h1Title?: string;
  /** Optional description HTML rendered below the H1 */
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  accentBarColor?: string;
  /** Content rendered in the right column (e.g. CallBox). Omit for centered layout. */
  rightContent?: React.ReactNode;
}

export default function InnerPageHero({
  backgroundImage,
  overlayOpacity = 0.55,
  tagline,
  taglineHtml,
  h1Title,
  description,
  ctaText = "SCHEDULE A CONSULTATION",
  ctaUrl = "/contact/",
  accentBarColor = "#2ba6a3",
  rightContent,
}: InnerPageHeroProps) {
  const bgStyle: React.CSSProperties = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundColor: "rgb(6, 29, 27)" };

  const hasTagline = taglineHtml || tagline;
  const twoCol = !!rightContent;

  return (
    <section
      className="relative flex items-center justify-center w-full min-h-[350px] md:min-h-[480px] lg:min-h-[580px] pt-[90px] pb-[48px]"
      style={bgStyle}
    >
      <div className="max-w-[1280px] mx-auto px-[16px] md:px-[32px] w-full">
        <div
          className={`grid grid-cols-1 gap-[48px] items-center ${twoCol ? "lg:grid-cols-2" : ""}`}
        >
          {/* Left column — content */}
          <div>
            {/* Tagline */}
            {hasTagline && (
              <>
                {taglineHtml ? (
                  <p
                    className="mb-[24px] md:mb-[32px] leading-none font-outfit text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-light text-white
                      [&_p]:block [&_p]:leading-none [&_p]:m-0
                      [&_strong]:font-semibold [&_strong]:text-[44px] [&_strong]:sm:text-[60px] [&_strong]:md:text-[72px] [&_strong]:lg:text-[88px]"
                    dangerouslySetInnerHTML={{ __html: taglineHtml }}
                  />
                ) : (
                  <p className="mb-[24px] md:mb-[32px] font-outfit text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-light leading-tight text-white">
                    {tagline}
                  </p>
                )}
              </>
            )}

            {/* CTA Button */}
            <a
              href={ctaUrl}
              className="inline-flex items-center gap-[8px] md:gap-[12px] bg-[#ee530e] text-white font-outfit font-semibold text-[14px] md:text-[18px] px-[20px] md:px-[32px] py-[12px] md:py-[16px] mb-[24px] md:mb-[32px] hover:opacity-90 transition-opacity no-underline"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Accent bar + H1 title */}
            {h1Title && (
              <div className="mb-[20px]">
                <div
                  className="h-[4px] w-[96px] mb-[16px]"
                  style={{ backgroundColor: accentBarColor }}
                />
                <h1
                  className="text-white font-light text-[20px] md:text-[28px] lg:text-[36px] leading-tight m-0"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {h1Title}
                </h1>
              </div>
            )}

            {/* Description */}
            {description && (
              <RichText
                html={description}
                className="font-outfit text-[15px] md:text-[17px] leading-[26px] text-white/85 mt-[12px]"
              />
            )}
          </div>

          {/* Right column */}
          {twoCol && (
            <div className="flex items-center justify-start lg:justify-center">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
