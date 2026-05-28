import { useState } from "react";
import { Link } from "react-router-dom";
import type { PracticeAreaItem, PracticeAreasIntroContent } from "@site/lib/cms/homePageTypes";

interface Props {
  areas?: PracticeAreaItem[];
  intro?: PracticeAreasIntroContent;
}

const DEFAULT_AREAS: PracticeAreaItem[] = [
  { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-1.jpg", imageAlt: "Practice Area 1", link: "/practice-areas" },
  { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-2.jpg", imageAlt: "Practice Area 2", link: "/practice-areas" },
  { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-3.jpg", imageAlt: "Practice Area 3", link: "/practice-areas" },
];

export default function PracticeAreasGrid({ areas, intro }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = areas && areas.length > 0 ? areas : DEFAULT_AREAS;

  return (
    <section
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        backgroundImage: "linear-gradient(rgb(225, 225, 225) 39%, rgb(255, 255, 255) 39%)",
        backgroundSize: "cover",
        paddingTop: "56px",
        position: "relative",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
      }}
    >
      {intro && (
        <div className="mx-auto w-[90%] md:w-[80%] max-w-[2560px] text-center pb-[32px]">
          {intro.headingHtml?.replace(/<[^>]+>/g, "").trim() ? (
            <h2
              style={{ fontSize: "clamp(26px, 5vw, 59.136px)", fontWeight: 300, lineHeight: 1.05, overflowWrap: "anywhere", paddingBottom: "10px", wordBreak: "break-word" }}
              className="[&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: intro.headingHtml }}
            />
          ) : (
            <h2 style={{ fontSize: "clamp(26px, 5vw, 59.136px)", fontWeight: 300, lineHeight: 1.05, overflowWrap: "anywhere", paddingBottom: "10px", wordBreak: "break-word" }}>
              {intro.heading || "Types Of"}{" "}
              <strong style={{ fontWeight: 700 }}>{intro.headingBold || "Cases We Handle"}</strong>
            </h2>
          )}
          <p style={{ color: "rgb(48, 48, 48)", fontFamily: '"Crimson Pro", Georgia, serif', fontSize: "clamp(16px, 2.5vw, 32px)", fontWeight: 300, lineHeight: 1.3, marginBottom: "16px" }}>
            {intro.sectionLabel || "OUR PRACTICE AREAS"}
          </p>
          {intro.descriptionHtml ? (
            <div
              style={{ color: "rgb(80, 80, 80)", fontSize: "clamp(15px, 1.8vw, 20px)", lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: intro.descriptionHtml }}
            />
          ) : (
            <p style={{ color: "rgb(80, 80, 80)", fontSize: "clamp(15px, 1.8vw, 20px)", lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          )}
        </div>
      )}
      <div className="mx-auto w-full max-w-[2560px] py-[28px]">
        <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[3%] px-[16px] sm:px-0">
          {items.map((area, index) => {
            const isTeal = area.featured ?? (index % 3 === 1);
            const isOffset = !isTeal;
            const isHovered = hovered === index;

            const bgImage = isTeal
              ? `linear-gradient(0deg, rgb(36,166,183) 0%, rgb(42,178,184) 0%, rgba(36,166,183,0) 100%), url(${area.image})`
              : `url(${area.image})`;

            return (
              <div
                key={index}
                className={`w-full sm:w-[31.3333%] ${isOffset ? "sm:pt-[clamp(0px,8vw,100px)]" : ""}`}
              >
                <Link
                  to={area.link}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    backgroundImage: bgImage,
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    cursor: "pointer",
                    display: "block",
                    minHeight: "clamp(200px, 40vw, 485px)",
                    overflow: "hidden",
                    paddingBottom: "32px",
                    paddingTop: "clamp(60px, 22vw, 300px)",
                    position: "relative",
                    textDecoration: "none",
                  }}
                >
                  {/* Orange hover overlay */}
                  <div
                    style={{
                      backgroundColor: "rgba(238, 83, 14, 0.6)",
                      bottom: 0, left: 0, right: 0, top: 0,
                      opacity: isHovered ? 1 : 0,
                      position: "absolute",
                      transition: "opacity 0.3s",
                      zIndex: 0,
                    }}
                  />
                  <div className="relative text-center z-10">
                    <h3
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: '"Crimson Pro", Georgia, serif',
                        fontSize: "clamp(28px, 5vw, 64px)",
                        fontWeight: 300,
                        lineHeight: 1.1,
                        overflowWrap: "anywhere",
                        paddingBottom: "8px",
                        textAlign: "center",
                        textTransform: "uppercase",
                        wordBreak: "break-word",
                      }}
                    >
                      {area.title}
                    </h3>
                    <p
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontSize: "clamp(13px, 2vw, 24px)",
                        fontWeight: 300,
                        lineHeight: 1.5,
                        textAlign: "center",
                      }}
                    >
                      {area.learnMoreText || "LEARN MORE"}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
