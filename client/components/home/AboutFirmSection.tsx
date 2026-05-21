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
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
      }}
    >
      {/* Top: Label + Heading + Badge */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          paddingBottom: "28px",
          paddingTop: "28px",
          width: "90%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", marginBottom: "28px" }}>
          {/* Left: label + h2 */}
          <div style={{ marginRight: "5.5%", width: "73.625%" }}>
            <p
              style={{
                color: "rgb(48, 48, 48)",
                fontFamily: '"Crimson Pro", Georgia, serif',
                fontSize: "32px",
                fontWeight: 300,
                lineHeight: "38.4px",
                marginBottom: "8px",
              }}
            >
              {content.sectionLabel}
            </p>
            <h2
              style={{
                fontSize: "59.136px",
                fontWeight: 300,
                lineHeight: "59.136px",
                overflowWrap: "anywhere",
                paddingBottom: "10px",
                wordBreak: "break-word",
              }}
            >
              <strong style={{ display: "inline", fontWeight: 700 }}>
                {content.headingBold}
              </strong>{" "}
              {content.headingLight}
            </h2>
          </div>

          {/* Right: badge */}
          {content.badgeImage && (
            <div style={{ width: "20.875%" }}>
              <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                <img
                  decoding="async"
                  width={199}
                  height={201}
                  alt={content.badgeImageAlt}
                  loading="lazy"
                  src={content.badgeImage}
                  style={{ width: "199px", maxWidth: "100%", verticalAlign: "middle" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Photo + Text */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          paddingBottom: "56px",
          paddingTop: "28px",
          width: "90%",
        }}
      >
        <div style={{ display: "flex", gap: "3%" }}>
          {/* Left: photo */}
          {content.photo && (
            <div style={{ width: "48.5%" }}>
              <img
                decoding="async"
                width={948}
                height={746}
                alt={content.photoAlt}
                loading="lazy"
                src={content.photo}
                style={{ width: "100%", maxWidth: "100%", verticalAlign: "middle" }}
              />
            </div>
          )}

          {/* Right: text */}
          <div style={{ width: content.photo ? "48.5%" : "100%" }}>
            <div
              style={{
                backgroundColor: content.accentBarColor || "rgb(43, 166, 163)",
                height: "4px",
                marginBottom: "32px",
                width: "96px",
              }}
            />
            <div style={{ fontSize: "22px", lineHeight: "33px" }}>
              {content.subHeading && (
                <h2
                  style={{
                    fontSize: "48px",
                    fontWeight: 300,
                    lineHeight: "52.8px",
                    marginBottom: "16px",
                    overflowWrap: "anywhere",
                    paddingBottom: "10px",
                    wordBreak: "break-word",
                  }}
                >
                  {content.subHeading}
                </h2>
              )}
              {content.paragraph1 && (
                <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", paddingBottom: "22px", wordBreak: "break-word" }}>
                  {content.paragraph1}
                </p>
              )}
              {content.paragraph2 && (
                <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", paddingBottom: "22px", wordBreak: "break-word" }}>
                  {content.paragraph2}
                </p>
              )}
              {content.paragraph3 && (
                <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", paddingBottom: "22px", wordBreak: "break-word" }}>
                  {content.paragraph3}
                </p>
              )}
              {content.paragraph4 && (
                <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", wordBreak: "break-word" }}>
                  {content.paragraph4}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
