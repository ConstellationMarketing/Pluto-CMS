import { useState } from "react";
import { Link } from "react-router-dom";
import type { PracticeAreaItem } from "@site/lib/cms/homePageTypes";

interface Props {
  areas?: PracticeAreaItem[];
}

const DEFAULT_AREAS: PracticeAreaItem[] = [
  { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-1.jpg", imageAlt: "Practice Area 1", link: "/practice-areas" },
  { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-2.jpg", imageAlt: "Practice Area 2", link: "/practice-areas" },
  { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-3.jpg", imageAlt: "Practice Area 3", link: "/practice-areas" },
];

export default function PracticeAreasGrid({ areas }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = areas && areas.length > 0 ? areas : DEFAULT_AREAS;

  return (
    <section
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        backgroundImage: "linear-gradient(rgb(225, 225, 225) 39%, rgb(255, 255, 255) 39%)",
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        paddingTop: "56px",
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
          paddingBottom: "28px",
          paddingTop: "28px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "3%" }}>
          {items.map((area, index) => {
            // If item has explicit featured flag use it, otherwise apply pattern: index % 3 === 1 gets teal gradient
            const isTeal = area.featured ?? (index % 3 === 1);
            const isOffset = !isTeal;
            const isHovered = hovered === index;

            const bgImage = isTeal
              ? `linear-gradient(0deg, rgb(36,166,183) 0%, rgb(42,178,184) 0%, rgba(36,166,183,0) 100%), url(${area.image})`
              : `url(${area.image})`;

            return (
              <div
                key={index}
                style={{
                  paddingTop: isOffset ? "100px" : "0",
                  width: "31.3333%",
                }}
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
                    minHeight: "485px",
                    overflow: "hidden",
                    paddingBottom: "50px",
                    paddingTop: "300px",
                    position: "relative",
                    textDecoration: "none",
                  }}
                >
                  {/* Orange hover overlay */}
                  <div
                    style={{
                      backgroundColor: "rgba(238, 83, 14, 0.6)",
                      bottom: "0",
                      left: "0",
                      opacity: isHovered ? 1 : 0,
                      position: "absolute",
                      right: "0",
                      top: "0",
                      transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: 0,
                    }}
                  />

                  {/* Text content */}
                  <div
                    style={{
                      color: "rgb(255, 255, 255)",
                      position: "relative",
                      textAlign: "center",
                      zIndex: 10,
                    }}
                  >
                    <h3
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: '"Crimson Pro", Georgia, serif',
                        fontSize: "64px",
                        fontWeight: 300,
                        lineHeight: "64px",
                        overflowWrap: "anywhere",
                        paddingBottom: "10px",
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
                        fontSize: "24px",
                        fontWeight: 300,
                        lineHeight: "36px",
                        overflowWrap: "anywhere",
                        textAlign: "center",
                        wordBreak: "break-word",
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
