import type { AwardsContent } from "@site/lib/cms/homePageTypes";

interface Props {
  content?: AwardsContent;
  headingTag?: string;
}

const LOGO_WIDTHS: Record<number, number> = { 1: 199 };

export default function AwardsSection({ content }: Props) {
  if (!content) return null;

  const logos = content.logos?.length ? content.logos : [];
  const features = content.features?.length ? content.features : [];

  return (
    <section
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        paddingBottom: "56px",
        paddingTop: "56px",
        position: "relative",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
      }}
    >
      {/* ── Heading ── */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          paddingBottom: "28px",
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
            {content.heading || "Over The Years,"}
            <br />
            <strong style={{ display: "inline", fontWeight: 700 }}>
              {content.headingBold || "Our dedication to excellence and client care has earned recognition."}
            </strong>
          </h2>
        </div>
      </div>

      {/* ── Logos row (full width, 5 cols at 20%) ── */}
      {logos.length > 0 && (
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
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {logos.map((logo, i) => (
              <div
                key={i}
                style={{ display: "flex", justifyContent: "center", width: "20%" }}
              >
                <div style={{ textAlign: "center", width: i === 1 ? "50%" : "auto" }}>
                  <img
                    decoding="async"
                    width={i === 1 ? 199 : 240}
                    height={i === 1 ? 201 : 155}
                    alt={logo.alt}
                    loading="lazy"
                    src={logo.src}
                    style={{
                      display: "inline",
                      maxWidth: "100%",
                      verticalAlign: "middle",
                      width: i === 1 ? "199px" : "240px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Features row (3 cols, icons + titles) ── */}
      {features.length > 0 && (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "2560px",
            paddingBottom: "28px",
            paddingTop: "28px",
            width: "80%",
          }}
        >
          <div style={{ display: "flex", gap: "5.5%" }}>
            {features.map((feature, i) => (
              <div key={i} style={{ width: "29.6667%" }}>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "550px",
                    textAlign: "center",
                  }}
                >
                  {feature.icon && (
                    <div style={{ display: "inline-block", marginBottom: "32px", textAlign: "center" }}>
                      <img
                        decoding="async"
                        alt={feature.iconAlt || ""}
                        loading="lazy"
                        src={feature.icon}
                        style={{
                          display: "inline",
                          maxWidth: "100%",
                          verticalAlign: "middle",
                          width: "117px",
                        }}
                      />
                    </div>
                  )}
                  <h4
                    style={{
                      fontFamily: '"Crimson Pro", Georgia, serif',
                      fontSize: "36px",
                      fontWeight: 600,
                      lineHeight: "36px",
                      overflowWrap: "anywhere",
                      paddingBottom: "10px",
                      textAlign: "center",
                      textTransform: "uppercase",
                      wordBreak: "break-word",
                    }}
                  >
                    {feature.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
