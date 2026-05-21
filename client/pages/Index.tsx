import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import AboutFirmSection from "@site/components/home/AboutFirmSection";
import AboutSection from "@site/components/home/AboutSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import PracticeAreasGrid from "@site/components/home/PracticeAreasGrid";
import AwardsSection from "@site/components/home/AwardsSection";
import TestimonialsSection from "@site/components/home/TestimonialsSection";
import ProcessSection from "@site/components/home/ProcessSection";
import GoogleReviewsSection from "@site/components/home/GoogleReviewsSection";
import FaqSection from "@site/components/home/FaqSection";
import ContactUsSection from "@site/components/home/ContactUsSection";
import { useHomeContent } from "@site/hooks/useHomeContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Loader2, ArrowRight } from "lucide-react";

export default function Index() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useHomeContent();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  // Use CMS content for hero and partner logos
  const heroContent = content.hero;
  const partnerLogos = content.partnerLogos;

  return (
    <Layout>
      <Seo
        title={title || "Home"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center w-full min-h-[1225px] pt-[80px]"
        style={{
          backgroundImage: heroContent.backgroundImage
            ? `linear-gradient(rgba(0,0,0,${heroContent.backgroundOverlayOpacity ?? 0.4}), rgba(0,0,0,${heroContent.backgroundOverlayOpacity ?? 0.4})), url(${heroContent.backgroundImage})`
            : "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-[32px] w-full">
          {/* Two-column grid - right col empty as per layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-center">
            {/* Left column */}
            <div>
              {/* Tagline: TRUSTED TESTED READY - H1 */}
              <h1 className="mb-[32px] leading-none">
                <span className="block font-outfit text-[96px] font-light leading-[96px] text-white">
                  {heroContent.taglineWord1 || "TRUSTED"}
                </span>
                <span className="block font-outfit text-[128px] font-semibold leading-[128px] text-white">
                  {heroContent.taglineWord2 || "TESTED"}
                </span>
                <span className="block font-outfit text-[96px] font-light leading-[96px] text-white">
                  {heroContent.taglineWord3 || "READY"}
                </span>
              </h1>

              {/* CTA Button - always shown with default text */}
              <a
                href={heroContent.ctaUrl || "/contact"}
                className="inline-flex items-center gap-[12px] bg-[#ee530e] text-white font-outfit font-semibold text-[18px] px-[32px] py-[16px] mb-[32px] hover:opacity-90 transition-opacity"
              >
                {heroContent.ctaText || "SCHEDULE A CONSULTATION"}
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Accent bar + H1 */}
              <div className="mb-[32px]">
                <div
                  className="h-[4px] w-[96px] mb-[16px]"
                  style={{ backgroundColor: heroContent.accentBarColor || "#2ba6a3" }}
                />
                {heroContent.h1Title && (
                  <p
                    className="text-white font-light text-[36px] leading-[40px]"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {heroContent.h1Title}
                  </p>
                )}
              </div>
            </div>

            {/* Right column - empty as per layout */}
            <div />
          </div>
        </div>
      </section>

      {/* Divider Section */}
      <section className="relative w-full pt-[28px]" style={{ backgroundColor: "rgb(239, 240, 235)" }}>
        <div className="w-full">
          <div className="flex justify-end" style={{ marginTop: "-40px" }}>
            <img
              alt=""
              loading="lazy"
              src="https://design-pluto.netlify.app/images/divider.png"
              className="h-[17px] w-[1111px] max-w-full"
            />
          </div>
        </div>
      </section>

      {/* About Firm Section */}
      <AboutFirmSection />

      {/* Contact Form Section - below hero */}
      <div className="max-w-[2560px] mx-auto w-[95%] py-[40px]">
        <ContactForm />
      </div>

      {/* Partner Badges Section - Bottom of Hero */}
      {partnerLogos.length > 0 && (
        <div className="bg-brand-dark py-[20px] md:py-[30px]">
          <div className="max-w-[2560px] mx-auto w-[95%]">
            <div className="bg-brand-card border border-brand-border py-[10px] px-0 flex flex-nowrap justify-center overflow-hidden">
              {partnerLogos.map((logo, index) => (
                <div
                  key={index}
                  className="px-[8px] sm:px-[15px] md:px-[30px] py-2 flex items-center justify-center flex-shrink"
                >
                  <div className="text-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[190px] max-w-full inline-block"
                      width={190}
                      height={123}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Us Section */}
      <AboutSection content={content.about} headingTag={content.headingTags?.["about.sectionLabel"]} />

      {/* Practice Areas Section */}
      <PracticeAreasSection content={content.practiceAreasIntro} />

      {/* Practice Areas Grid */}
      <PracticeAreasGrid areas={content.practiceAreas} />

      {/* Awards & Membership Section */}
      <AwardsSection content={content.awards} headingTag={content.headingTags?.["awards.sectionLabel"]} />

      {/* Testimonials Section */}
      <TestimonialsSection content={content.testimonials} headingTag={content.headingTags?.["testimonials.sectionLabel"]} />

      {/* Process Section */}
      <ProcessSection content={content.process} headingTags={content.headingTags} />

      {/* Google Reviews Section */}
      <GoogleReviewsSection content={content.googleReviews} headingTag={content.headingTags?.["googleReviews.sectionLabel"]} />

      {/* FAQ Section */}
      <FaqSection content={content.faq} />

      {/* Contact Us Section */}
      <ContactUsSection content={content.contact} headingTag={content.headingTags?.["contact.sectionLabel"]} />
    </Layout>
  );
}
