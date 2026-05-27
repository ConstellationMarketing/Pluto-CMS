// Type definitions for structured Practice Areas page content
// Each section maps directly to a static component's data needs
import type { AwardsContent, TestimonialsContent, PracticeAreasIntroContent } from "./homePageTypes";
export type { AwardsContent, TestimonialsContent, PracticeAreasIntroContent };

export interface PracticeAreasVisualCardItem {
  title: string;
  image: string;
  imageAlt: string;
  link: string;
  learnMoreText?: string;
  featured?: boolean;
}

export interface PracticeAreasVisualGridContent {
  items: PracticeAreasVisualCardItem[];
}

export interface PracticeAreasHeroContent {
  sectionLabel: string; // "– Practice Areas" (H1)
  tagline: string; // plain text fallback
  taglineHtml?: string; // rich text tagline (takes priority)
  description: string; // Description paragraph
  phone: string;
  phoneLabel: string;
  backgroundImage?: string;
  backgroundOverlayOpacity?: number;
  accentBarColor?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface PracticeAreaGridItem {
  icon: string; // Lucide icon name
  title: string; // "Personal Injury"
  description: string; // Description text
  image: string; // Background image URL
  imageAlt: string; // Image alt text
  link: string; // Link to detail page
}

export interface PracticeAreasGridContent {
  heading: string; // "Our Areas of Practice"
  description: string; // Intro paragraph
  areas: PracticeAreaGridItem[];
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseContent {
  sectionLabel: string; // "– Why Choose Us"
  heading: string; // "Experience Across All Practice Areas"
  subtitle: string; // Subtitle text
  description: string; // Description paragraph
  image: string; // Section image (shared from About page)
  imageAlt: string; // Image alt text
  items: WhyChooseItem[];
}

export interface CTAContent {
  heading: string; // "Ready to Discuss Your Case?"
  description: string; // Subtitle text
  primaryButton: {
    label: string; // "Call Us 24/7"
    phone: string; // Phone number
  };
  secondaryButton: {
    label: string; // "Schedule Now"
    sublabel: string; // "Free Consultation"
    link: string; // Link URL
  };
}

// Complete Practice Areas page content structure
export interface PracticeAreasPageContent {
  hero: PracticeAreasHeroContent;
  visualGrid?: PracticeAreasVisualGridContent;
  awardsSection?: AwardsContent;
  testimonialsSection?: TestimonialsContent;
  practiceAreasIntroSection?: PracticeAreasIntroContent;
  grid: PracticeAreasGridContent;
  whyChoose: WhyChooseContent;
  cta: CTAContent;
  /** Maps heading keys (e.g. "grid.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - empty defaults, content comes exclusively from the CMS
export const defaultPracticeAreasContent: PracticeAreasPageContent = {
  hero: {
    sectionLabel: "",
    tagline: "",
    description: "",
    phone: "",
    phoneLabel: "",
  },
  visualGrid: {
    items: [
      { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-1.jpg", imageAlt: "Practice Area 1", link: "/practice-areas" },
      { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-2.jpg", imageAlt: "Practice Area 2", link: "/practice-areas", featured: true },
      { title: "Practice Area", image: "https://design-pluto.netlify.app/images/practice-3.jpg", imageAlt: "Practice Area 3", link: "/practice-areas" },
    ],
  },
  awardsSection: {
    sectionLabel: "",
    headingHtml: "",
    heading: "",
    headingBold: "",
    description: "",
    logos: [],
    features: [],
  },
  testimonialsSection: {
    sectionLabel: "",
    heading: "",
    starsImage: "",
    starsImageAlt: "",
    backgroundImage: "https://design-pluto.netlify.app/images/testimonials-bg.jpg",
    backgroundImageAlt: "",
    backgroundOverlayOpacity: 0,
    viewAllUrl: "",
    viewAllText: "",
    items: [],
  },
  practiceAreasIntroSection: {
    sectionLabel: "OUR PRACTICE AREAS",
    headingHtml: "",
    descriptionHtml: "",
    heading: "Types Of",
    headingBold: "Cases We Handle",
    buttonLink: "/practice-areas",
    buttonTextLine1: "",
    buttonTextLine2: "",
  },
  grid: {
    heading: "",
    description: "",
    areas: [],
  },
  whyChoose: {
    sectionLabel: "",
    heading: "",
    subtitle: "",
    image: "",
    imageAlt: "",
    description: "",
    items: [],
  },
  cta: {
    heading: "",
    description: "",
    primaryButton: {
      label: "",
      phone: "",
    },
    secondaryButton: {
      label: "",
      sublabel: "",
      link: "",
    },
  },
};
