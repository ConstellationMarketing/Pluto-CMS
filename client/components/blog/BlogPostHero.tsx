import { Calendar as CalendarIcon, Tag, ArrowRight } from "lucide-react";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

interface BlogPostHeroProps {
  title: string;
  categoryName?: string | null;
  publishedDate: string;
  featuredImage?: string | null;
}

export default function BlogPostHero({
  title,
  categoryName,
  publishedDate,
  featuredImage,
}: BlogPostHeroProps) {
  const { phoneDisplay, phoneNumber } = useGlobalPhone();

  const formattedDate = new Date(publishedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const bgStyle: React.CSSProperties = featuredImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${featuredImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundColor: "rgb(6, 29, 27)" };

  return (
    <section
      className="relative flex items-center justify-center w-full min-h-[350px] md:min-h-[480px] lg:min-h-[580px] pt-[90px] pb-[48px]"
      style={bgStyle}
    >
      <div className="max-w-[1280px] mx-auto px-[16px] md:px-[32px] w-full">
        {/* Category + Date metadata */}
        <div className="flex items-center gap-3 mb-[20px] md:mb-[28px]">
          {categoryName && (
            <span className="inline-flex items-center gap-1.5 bg-[#2ba6a3] text-white font-outfit font-semibold px-[12px] py-[6px] text-[12px] uppercase tracking-wide">
              <Tag className="h-3 w-3" />
              {categoryName}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-outfit text-[14px] text-white/70">
            <CalendarIcon className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
        </div>

        {/* Title as large tagline text */}
        <h1
          className="mb-[24px] md:mb-[32px] font-outfit text-[32px] sm:text-[44px] md:text-[56px] lg:text-[68px] font-light leading-tight text-white max-w-[900px]"
        >
          {title}
        </h1>

        {/* CTA Button */}
        <a
          href={`tel:${phoneNumber.replace(/\D/g, "")}`}
          className="inline-flex items-center gap-[8px] md:gap-[12px] bg-[#ee530e] text-white font-outfit font-semibold text-[14px] md:text-[18px] px-[20px] md:px-[32px] py-[12px] md:py-[16px] mb-[24px] md:mb-[32px] hover:opacity-90 transition-opacity no-underline"
        >
          {phoneDisplay}
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Accent bar */}
        <div className="h-[4px] w-[96px]" style={{ backgroundColor: "#2ba6a3" }} />
      </div>
    </section>
  );
}
