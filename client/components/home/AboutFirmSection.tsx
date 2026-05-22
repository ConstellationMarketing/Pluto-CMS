import type { AboutFirmContent } from "@site/lib/cms/homePageTypes";

interface Props {
  content: AboutFirmContent;
}

export default function AboutFirmSection({ content }: Props) {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: "rgb(239, 240, 235)",
        paddingTop: "56px",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Top: Label + Heading + Badge */}
      <div className="mx-auto w-[90%] max-w-[2560px] py-[28px]">
        <div className="flex flex-col md:flex-row md:items-center mb-[28px] gap-[24px]">
          {/* Left: label + h2 */}
          <div className="w-full md:w-[73.625%] md:mr-[5.5%]">
            <p
              style={{
                color: "rgb(48, 48, 48)",
                fontFamily: '"Crimson Pro", Georgia, serif',
                fontSize: "clamp(18px, 3vw, 32px)",
                fontWeight: 300,
                lineHeight: 1.3,
                marginBottom: "8px",
              }}
            >
              {content.sectionLabel}
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 59.136px)",
                fontWeight: 300,
                lineHeight: 1.05,
                paddingBottom: "10px",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              <strong style={{ fontWeight: 700 }}>{content.headingBold}</strong>{" "}
              {content.headingLight}
            </h2>
          </div>

          {/* Right: badge */}
          {content.badgeImage && (
            <div className="w-full md:w-[20.875%] text-center">
              <img
                decoding="async"
                width={199}
                height={201}
                alt={content.badgeImageAlt}
                loading="lazy"
                src={content.badgeImage}
                className="inline-block max-w-full w-[120px] md:w-[160px] lg:w-[199px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Photo + Text */}
      <div className="mx-auto w-[90%] max-w-[2560px] pt-[28px] pb-[56px]">
        <div className="flex flex-col md:flex-row gap-[32px] md:gap-[3%]">
          {/* Left: photo */}
          {content.photo && (
            <div className="w-full md:w-[48.5%]">
              <img
                decoding="async"
                width={948}
                height={746}
                alt={content.photoAlt}
                loading="lazy"
                src={content.photo}
                className="w-full max-w-full align-middle"
              />
            </div>
          )}

          {/* Right: text */}
          <div className={content.photo ? "w-full md:w-[48.5%]" : "w-full"}>
            <div
              className="h-[4px] w-[96px] mb-[24px] md:mb-[32px]"
              style={{ backgroundColor: content.accentBarColor || "rgb(43, 166, 163)" }}
            />
            {content.subHeading && (
              <h2
                style={{
                  fontSize: "clamp(22px, 4vw, 48px)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  marginBottom: "16px",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {content.subHeading}
              </h2>
            )}
            {[content.paragraph1, content.paragraph2, content.paragraph3, content.paragraph4]
              .filter(Boolean)
              .map((p, i, arr) => (
                <p
                  key={i}
                  style={{
                    fontSize: "clamp(15px, 1.8vw, 22px)",
                    lineHeight: 1.6,
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    paddingBottom: i < arr.length - 1 ? "20px" : 0,
                  }}
                >
                  {p}
                </p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
