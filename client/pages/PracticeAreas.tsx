import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import PracticeAreaCard from "@site/components/practice/PracticeAreaCard";
import PracticeAreasGrid from "@site/components/home/PracticeAreasGrid";
import AwardsSection from "@site/components/home/AwardsSection";
import TestimonialsSection from "@site/components/home/TestimonialsSection";
import {
  Scale,
  Car,
  Briefcase,
  Users,
  Home,
  DollarSign,
  FileText,
  Heart,
  Shield,
  TrendingUp,
  Stethoscope,
  Building,
  type LucideIcon,
} from "lucide-react";
import { usePracticeAreasContent } from "@site/hooks/usePracticeAreasContent";
import InnerPageHero from "@site/components/shared/InnerPageHero";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { Loader2 } from "lucide-react";

// Icon mapping for practice areas
const iconMap: Record<string, LucideIcon> = {
  Car,
  Stethoscope,
  Briefcase,
  Heart,
  Building,
  Shield,
  Scale,
  FileText,
  Users,
  Home,
  DollarSign,
  TrendingUp,
};

export default function PracticeAreas() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = usePracticeAreasContent();

  // Map practice areas from CMS content with icon components
  const practiceAreas = content.grid.areas.map((area) => ({
    icon: iconMap[area.icon] || Scale,
    title: area.title,
    description: area.description,
    image: area.image,
    imageAlt: area.imageAlt,
    link: area.link,
  }));

  // Map why choose items from CMS content
  const whyChooseOurPractice = content.whyChoose.items;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo
        title={title || "Practice Areas"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero Section */}
      <InnerPageHero
        backgroundImage={content.hero.backgroundImage}
        overlayOpacity={content.hero.backgroundOverlayOpacity}
        taglineHtml={content.hero.taglineHtml}
        tagline={content.hero.tagline}
        h1Title={content.hero.sectionLabel}
        description={content.hero.description}
        accentBarColor={content.hero.accentBarColor}
        ctaText={content.hero.ctaText}
        ctaUrl={content.hero.ctaUrl}
      />

      {/* Visual Cards Grid — homepage style, independent CMS data */}
      {content.visualGrid && content.visualGrid.items.length > 0 && (
        <PracticeAreasGrid areas={content.visualGrid.items} />
      )}

      {/* Awards & Memberships — independent CMS data */}
      {content.awardsSection && (content.awardsSection.headingHtml || content.awardsSection.heading || (content.awardsSection.logos?.length ?? 0) > 0) && (
        <AwardsSection content={content.awardsSection} />
      )}

      {/* Testimonials — independent CMS data */}
      {content.testimonialsSection && (content.testimonialsSection.heading || (content.testimonialsSection.items?.length ?? 0) > 0) && (
        <TestimonialsSection
          content={content.testimonialsSection}
          practiceAreasIntro={content.practiceAreasIntroSection}
        />
      )}

    </Layout>
  );
}
