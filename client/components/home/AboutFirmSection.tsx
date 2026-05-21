export default function AboutFirmSection() {
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
        <div
          style={{
            alignItems: "center",
            display: "flex",
            marginBottom: "28px",
          }}
        >
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
              ABOUT OUR LAW FIRM
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
                Trusted Experienced
              </strong>{" "}
              Attorneys In Atlanta
            </h2>
          </div>

          {/* Right: badge */}
          <div style={{ width: "20.875%" }}>
            <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
              <img
                decoding="async"
                width={199}
                height={201}
                alt="Over 20 Years of Experience"
                loading="lazy"
                src="https://design-pluto.netlify.app/images/experience-badge.png"
                style={{ width: "199px", maxWidth: "100%", verticalAlign: "middle" }}
              />
            </div>
          </div>
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
          <div style={{ width: "48.5%" }}>
            <img
              decoding="async"
              width={948}
              height={746}
              alt="Constellation Law Attorneys"
              loading="lazy"
              src="https://design-pluto.netlify.app/images/about-photo.jpg"
              style={{ width: "100%", maxWidth: "100%", verticalAlign: "middle" }}
            />
          </div>

          {/* Right: text */}
          <div style={{ width: "48.5%" }}>
            {/* Teal accent bar */}
            <div
              style={{
                backgroundColor: "rgb(43, 166, 163)",
                height: "4px",
                marginBottom: "32px",
                width: "96px",
              }}
            />
            <div style={{ fontSize: "22px", lineHeight: "33px" }}>
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
                Providing Legal Services Throughout Atlanta
              </h2>
              <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", paddingBottom: "22px", wordBreak: "break-word" }}>
                We founded Constellation Law with a shared vision: to support our clients through the many challenges and transitions life brings.
              </p>
              <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", paddingBottom: "22px", wordBreak: "break-word" }}>
                No matter where our clients are in their journey, we are here to guide them forward with clarity and care.
              </p>
              <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", paddingBottom: "22px", wordBreak: "break-word" }}>
                While not every situation calls for legal intervention, when it does, the right approach can be truly life-changing. Whether facing personal, financial, or family-related matters, we help individuals understand their options and take confident steps toward resolution.
              </p>
              <p style={{ fontSize: "22px", lineHeight: "33px", overflowWrap: "anywhere", wordBreak: "break-word" }}>
                Many of our clients come to us during times of significant change—and we're here to help them move forward with peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
