import type { AwardsContent } from "@site/lib/cms/homePageTypes";

interface Props {
  content?: AwardsContent;
  headingTag?: string;
}

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
      }}
    >
      {/* Heading */}
      <div className="mx-auto w-[90%] md:w-[80%] max-w-[2560px] py-[28px] text-center">
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
          {content.heading || "Over The Years,"}
          <br />
          <strong style={{ fontWeight: 700 }}>
            {content.headingBold || "Our dedication to excellence and client care has earned recognition."}
          </strong>
        </h2>
      </div>

      {/* Logos row */}
      {logos.length > 0 && (
        <div className="mx-auto w-full max-w-[2560px] py-[28px]">
          <div className="flex flex-wrap justify-center items-center gap-y-[24px]">
            {logos.map((logo, i) => (
              <div key={i} className="flex justify-center w-1/2 sm:w-1/3 md:w-1/5">
                <img
                  decoding="async"
                  alt={logo.alt}
                  loading="lazy"
                  src={logo.src}
                  className="inline max-w-full align-middle w-[100px] sm:w-[140px] md:w-[180px] lg:w-[200px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features row */}
      {features.length > 0 && (
        <div className="mx-auto w-[90%] md:w-[80%] max-w-[2560px] py-[28px]">
          <div className="flex flex-col sm:flex-row gap-[32px] sm:gap-[5.5%]">
            {features.map((feature, i) => (
              <div key={i} className="w-full sm:w-[29.6667%] text-center">
                {feature.icon && (
                  <div className="inline-block mb-[24px]">
                    <img
                      decoding="async"
                      alt={feature.iconAlt || ""}
                      loading="lazy"
                      src={feature.icon}
                      className="inline max-w-full align-middle w-[80px] md:w-[100px] lg:w-[117px]"
                    />
                  </div>
                )}
                <h4
                  style={{
                    fontFamily: '"Crimson Pro", Georgia, serif',
                    fontSize: "clamp(20px, 3vw, 36px)",
                    fontWeight: 600,
                    lineHeight: 1.1,
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
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
