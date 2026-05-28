import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { TestimonialsContent, PracticeAreasIntroContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";

interface Props {
  content: TestimonialsContent;
  practiceAreasIntro?: PracticeAreasIntroContent;
}

export default function TestimonialsSection({ content, practiceAreasIntro }: Props) {
  const items = content?.items ?? [];
  const total = items.length;
  const [activeSlide, setActiveSlide] = useState(0);
  const goTo = (i: number) => setActiveSlide((i + total) % Math.max(total, 1));
  const active = items[activeSlide] ?? null;

  return (
    <section
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        backgroundImage: (content.backgroundOverlayOpacity ?? 0) > 0
          ? `linear-gradient(rgba(0,0,0,${content.backgroundOverlayOpacity}), rgba(0,0,0,${content.backgroundOverlayOpacity})), url(${content.backgroundImage || "https://design-pluto.netlify.app/images/testimonials-bg.jpg"})`
          : `url(${content.backgroundImage || "https://design-pluto.netlify.app/images/testimonials-bg.jpg"})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: "56px",
        paddingBottom: "40px",
        position: "relative",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Heading + label + stars */}
      <div className="mx-auto w-[90%] md:w-[80%] max-w-[1080px] py-[28px]">
        <div className="mb-[24px] text-center">
          <h2
            style={{
              fontSize: "clamp(26px, 5vw, 59.136px)",
              fontWeight: 300,
              lineHeight: 1.05,
              overflowWrap: "anywhere",
              paddingBottom: "10px",
              wordBreak: "break-word",
            }}
          >
            <strong style={{ fontWeight: 700 }}>
              {content.heading || "Client Reviews & Testimonials"}
            </strong>
          </h2>
          <p
            style={{
              color: "rgb(48, 48, 48)",
              fontFamily: '"Crimson Pro", Georgia, serif',
              fontSize: "clamp(16px, 2.5vw, 32px)",
              fontWeight: 300,
              lineHeight: 1.3,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {content.sectionLabel || "OUR CLIENTS STORIES"}
          </p>
        </div>
        <div className="text-center">
          <img
            decoding="async"
            width={186}
            height={34}
            alt={content.starsImageAlt || "5 Star Rating"}
            loading="lazy"
            src={content.starsImage || "https://design-pluto.netlify.app/images/stars.png"}
            className="inline w-[140px] md:w-[186px] max-w-full align-middle"
          />
        </div>
      </div>

      {/* Testimonial slider */}
      <div className="mx-auto w-[90%] md:w-[80%] max-w-[2560px] mb-[24px]">
        <div className="overflow-hidden relative">
          <div style={{ backgroundColor: "rgb(255, 255, 255)" }} className="px-[4%] md:px-[6%]">
            <div className="flex items-center justify-center min-h-[280px] md:min-h-[414px]">
              <div className="py-[32px] md:py-[50px] px-[4%] md:px-[8%] text-center w-full pb-[60px]">
                {active?.itemHeading && (
                  <h2
                    style={{
                      fontSize: "clamp(20px, 3.5vw, 48px)",
                      fontWeight: 600,
                      lineHeight: 1.1,
                      overflowWrap: "anywhere",
                      paddingBottom: "10px",
                      wordBreak: "break-word",
                    }}
                  >
                    {active.itemHeading}
                  </h2>
                )}
                {active?.text && (
                  <RichText
                    html={active.text}
                    style={{
                      fontSize: "clamp(14px, 1.8vw, 22px)",
                      lineHeight: 1.6,
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      marginBottom: "16px",
                    }}
                  />
                )}
                {active?.author && (
                  <div className="mt-[20px]">
                    {active.authorUrl ? (
                      <a
                        href={active.authorUrl}
                        style={{
                          display: "inline-block",
                          fontFamily: '"Crimson Pro", Georgia, serif',
                          fontSize: "clamp(18px, 2.5vw, 36px)",
                          fontWeight: 700,
                          lineHeight: 1.5,
                          textDecoration: "none",
                          color: "inherit",
                          border: "1px solid rgb(0, 0, 0)",
                          borderRadius: "6px",
                          padding: "8px 20px",
                        }}
                      >
                        {active.author}
                      </a>
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          fontFamily: '"Crimson Pro", Georgia, serif',
                          fontSize: "clamp(18px, 2.5vw, 36px)",
                          fontWeight: 700,
                          lineHeight: 1.5,
                          border: "1px solid rgb(0, 0, 0)",
                          borderRadius: "6px",
                          padding: "8px 20px",
                        }}
                      >
                        {active.author}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dots */}
          {total > 1 && (
            <div className="absolute bottom-[12px] left-0 w-full text-center z-10">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  style={{
                    backgroundColor: "rgb(29, 129, 128)",
                    border: "1px solid rgb(226, 232, 240)",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    display: "inline-block",
                    height: "7px",
                    marginRight: i < total - 1 ? "10px" : "0",
                    opacity: i === activeSlide ? 1 : 0.5,
                    transition: "opacity 0.2s",
                    width: "7px",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* VIEW ALL */}
        <div className="mt-[24px] md:mt-[32px] text-center">
          <Link
            to={content.viewAllUrl || "/testimonials"}
            className="inline-flex items-center gap-[10px] no-underline transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "rgb(238, 83, 14)",
              border: "1px solid rgb(238, 83, 14)",
              color: "rgb(255, 255, 255)",
              fontSize: "clamp(14px, 2vw, 24px)",
              lineHeight: 1.5,
              padding: "12px 24px",
            }}
          >
            {content.viewAllText || "VIEW ALL TESTIMONIALS"}
            <ArrowRight width={18} height={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Link>
        </div>
      </div>

      {/* Practice Areas heading */}
      {practiceAreasIntro && (
        <div className="mx-auto w-[90%] md:w-[80%] max-w-[1080px] pt-[40px] md:pt-[80px] lg:pt-[335px] pb-[56px]">
          <div className="text-center">
            {practiceAreasIntro.headingHtml?.replace(/<[^>]+>/g, "").trim() ? (
              <h2
                style={{
                  fontSize: "clamp(26px, 5vw, 59.136px)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  overflowWrap: "anywhere",
                  paddingBottom: "10px",
                  wordBreak: "break-word",
                }}
                className="[&_strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: practiceAreasIntro.headingHtml }}
              />
            ) : (
              <h2
                style={{
                  fontSize: "clamp(26px, 5vw, 59.136px)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  overflowWrap: "anywhere",
                  paddingBottom: "10px",
                  wordBreak: "break-word",
                }}
              >
                {practiceAreasIntro.heading || "Types Of"}{" "}
                <strong style={{ fontWeight: 700 }}>
                  {practiceAreasIntro.headingBold || "Cases We Handle"}
                </strong>
              </h2>
            )}
            {(practiceAreasIntro.sectionLabel || true) && (
              <p
                style={{
                  color: "rgb(48, 48, 48)",
                  fontFamily: '"Crimson Pro", Georgia, serif',
                  fontSize: "clamp(16px, 2.5vw, 32px)",
                  fontWeight: 300,
                  lineHeight: 1.3,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {practiceAreasIntro.sectionLabel || "OUR PRACTICE AREAS"}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
