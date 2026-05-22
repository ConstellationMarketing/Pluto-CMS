import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { TestimonialsContent, PracticeAreasIntroContent } from "@site/lib/cms/homePageTypes";

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
        backgroundImage: `url(${content.backgroundImage || "https://design-pluto.netlify.app/images/testimonials-bg.jpg"})`,
        backgroundPosition: "50% 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        paddingTop: "56px",
        position: "relative",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
      }}
    >
      {/* ── Top: heading + sub-label + stars ── */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1080px",
          paddingBottom: "28px",
          paddingTop: "28px",
          width: "80%",
        }}
      >
        <div style={{ marginBottom: "2.75%" }}>
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "59.136px",
                fontWeight: 300,
                lineHeight: "59.136px",
                overflowWrap: "anywhere",
                paddingBottom: "10px",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              <strong style={{ display: "inline", fontWeight: 700 }}>
                {content.heading || "Client Reviews & Testimonials"}
              </strong>
            </h2>
            <p
              style={{
                color: "rgb(48, 48, 48)",
                fontFamily: '"Crimson Pro", Georgia, serif',
                fontSize: "32px",
                fontWeight: 300,
                lineHeight: "38.4px",
                overflowWrap: "anywhere",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {content.sectionLabel || "OUR CLIENTS STORIES"}
            </p>
          </div>
        </div>

        {/* Stars image */}
        <div style={{ textAlign: "center" }}>
          <img
            decoding="async"
            width={186}
            height={34}
            alt={content.starsImageAlt || "5 Star Rating"}
            loading="lazy"
            src={content.starsImage || "https://design-pluto.netlify.app/images/stars.png"}
            style={{ width: "186px", maxWidth: "100%", verticalAlign: "middle", display: "inline" }}
          />
        </div>
      </div>

      {/* ── Testimonial slider + VIEW ALL ── */}
      <div
        style={{
          marginBottom: "2.75%",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          width: "80%",
        }}
      >
        {/* Slider track (position:relative so dots can be absolute inside) */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ backgroundColor: "rgb(255, 255, 255)", paddingLeft: "6%", paddingRight: "6%" }}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                minHeight: "414.8px",
              }}
            >
              {/* Active testimonial */}
              <div
                style={{
                  paddingBottom: "50px",
                  paddingLeft: "8%",
                  paddingRight: "8%",
                  paddingTop: "50px",
                  textAlign: "center",
                  width: "100%",
                  transition: "opacity 0.5s",
                }}
              >
                {active?.itemHeading && (
                  <h2
                    style={{
                      fontSize: "48px",
                      fontWeight: 600,
                      lineHeight: "48px",
                      overflowWrap: "anywhere",
                      paddingBottom: "10px",
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    {active.itemHeading}
                  </h2>
                )}
                {active?.text && (
                  <div style={{ fontSize: "22px", lineHeight: "30.8px", marginBottom: "16px", textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "22px",
                        lineHeight: "30.8px",
                        overflowWrap: "anywhere",
                        textAlign: "center",
                        wordBreak: "break-word",
                      }}
                    >
                      {active.text}
                    </p>
                  </div>
                )}
                {active?.author && (
                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                    {active.authorUrl ? (
                      <a
                        href={active.authorUrl}
                        style={{
                          border: "1px solid rgb(0,0,0)",
                          borderRadius: "3px",
                          cursor: "pointer",
                          display: "inline-block",
                          fontFamily: '"Crimson Pro", Georgia, serif',
                          fontSize: "36px",
                          fontWeight: 700,
                          lineHeight: "61.2px",
                          overflowWrap: "anywhere",
                          paddingBottom: "10.8px",
                          paddingLeft: "36px",
                          paddingRight: "36px",
                          paddingTop: "10.8px",
                          textAlign: "center",
                          wordBreak: "break-word",
                          textDecoration: "none",
                          color: "inherit",
                          transition: "opacity 0.2s",
                        }}
                      >
                        {active.author}
                      </a>
                    ) : (
                      <span
                        style={{
                          border: "1px solid rgb(0,0,0)",
                          borderRadius: "3px",
                          display: "inline-block",
                          fontFamily: '"Crimson Pro", Georgia, serif',
                          fontSize: "36px",
                          fontWeight: 700,
                          lineHeight: "61.2px",
                          paddingBottom: "10.8px",
                          paddingLeft: "36px",
                          paddingRight: "36px",
                          paddingTop: "10.8px",
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

          {/* Dots — absolute at bottom of slider */}
          {total > 1 && (
            <div
              style={{
                bottom: "20px",
                left: "0",
                position: "absolute",
                textAlign: "center",
                width: "100%",
                zIndex: 10,
              }}
            >
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

        {/* VIEW ALL button */}
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Link
            to={content.viewAllUrl || "/testimonials"}
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
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {content.viewAllText || "VIEW ALL TESTIMONIALS"}
            <ArrowRight width={20} height={20} aria-hidden="true" style={{ color: "rgb(255,255,255)", flexShrink: 0 }} />
          </Link>
        </div>
      </div>

      {/* ── Practice Areas heading (bottom of section) ── */}
      {practiceAreasIntro && (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "335px",
            maxWidth: "1080px",
            paddingBottom: "56px",
            paddingTop: "28px",
            width: "80%",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "59.136px",
                fontWeight: 300,
                lineHeight: "59.136px",
                overflowWrap: "anywhere",
                paddingBottom: "10px",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {practiceAreasIntro.heading || "Types Of"}{" "}
              <strong style={{ display: "inline", fontWeight: 700 }}>
                {practiceAreasIntro.headingBold || "Cases We Handle"}
              </strong>
            </h2>
            <p
              style={{
                color: "rgb(48, 48, 48)",
                fontFamily: '"Crimson Pro", Georgia, serif',
                fontSize: "32px",
                fontWeight: 300,
                lineHeight: "38.4px",
                overflowWrap: "anywhere",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {practiceAreasIntro.sectionLabel || "OUR PRACTICE AREAS"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
