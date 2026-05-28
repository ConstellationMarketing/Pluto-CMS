import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import AboutFirmSection from "@site/components/home/AboutFirmSection";
import AttorneySection from "@site/components/home/AttorneySection";
import HomeBlogSection from "@site/components/home/HomeBlogSection";
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
        className="relative flex items-center justify-center w-full min-h-screen pt-[80px] pb-[10px]"
        style={{
          backgroundImage: heroContent.backgroundImage
            ? `linear-gradient(rgba(0,0,0,${heroContent.backgroundOverlayOpacity ?? 0.4}), rgba(0,0,0,${heroContent.backgroundOverlayOpacity ?? 0.4})), url(${heroContent.backgroundImage})`
            : "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[32px] w-full">
          {/* Two-column grid - right col empty as per layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-center">
            {/* Left column */}
            <div>
              {/* Tagline — decorative, rendered as p */}
              {heroContent.taglineHtml ? (
                <p
                  className="mb-[24px] md:mb-[32px] leading-none font-outfit text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-light text-white
                    [&_p]:block [&_p]:leading-none [&_p]:m-0
                    [&_strong]:font-semibold [&_strong]:text-[56px] [&_strong]:sm:text-[80px] [&_strong]:md:text-[100px] [&_strong]:lg:text-[128px]"
                  style={{ paddingTop: "5rem" }}
                  dangerouslySetInnerHTML={{ __html: heroContent.taglineHtml }}
                />
              ) : (
                <p className="mb-[24px] md:mb-[32px] leading-none" style={{ paddingTop: "5rem" }}>
                  <span className="block font-outfit text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-light leading-none text-white">
                    {heroContent.taglineWord1 || "TRUSTED"}
                  </span>
                  <span className="block font-outfit text-[56px] sm:text-[80px] md:text-[100px] lg:text-[128px] font-semibold leading-none text-white">
                    {heroContent.taglineWord2 || "TESTED"}
                  </span>
                  <span className="block font-outfit text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-light leading-none text-white">
                    {heroContent.taglineWord3 || "READY"}
                  </span>
                </p>
              )}

              {/* CTA Button - always shown with default text */}
              <a
                href={heroContent.ctaUrl || "/contact"}
                className="inline-flex items-center gap-[8px] md:gap-[12px] bg-[#ee530e] text-white font-outfit font-semibold text-[14px] md:text-[18px] px-[20px] md:px-[32px] py-[12px] md:py-[16px] mb-[24px] md:mb-[32px] hover:opacity-90 transition-opacity"
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
                  <h1
                    className="text-white font-light text-[20px] md:text-[28px] lg:text-[36px] leading-tight md:leading-[40px] m-0"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {heroContent.h1Title}
                  </h1>
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
      <AboutFirmSection content={content.aboutFirm} />

      {/* Attorney Section */}
      <AttorneySection content={content.aboutFirm} />

      {/* Client Reviews & Testimonials + Practice Areas heading */}
      <TestimonialsSection
        content={content.testimonials}
        practiceAreasIntro={content.practiceAreasIntro}
      />

      {/* Practice Areas Grid */}
      <PracticeAreasGrid areas={content.practiceAreas} />

      {/* Awards & Membership Section */}
      <AwardsSection content={content.awards} headingTag={content.headingTags?.["awards.sectionLabel"]} />

      {/* Blog Preview Section */}
      <HomeBlogSection content={content.blogPreview} />

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
