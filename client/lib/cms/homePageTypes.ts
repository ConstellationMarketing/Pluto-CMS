// Type definitions for structured homepage content
// Each section maps directly to a static component's data needs

export interface HeroContent {
  backgroundImage: string;
  backgroundOverlayOpacity: number; // 0-1, default 0.4
  taglineWord1: string; // e.g. "TRUSTED" (light 96px)
  taglineWord2: string; // e.g. "TESTED" (bold 128px)
  taglineWord3: string; // e.g. "READY" (light 96px)
  ctaText: string;
  ctaUrl: string;
  accentBarColor: string; // teal line above h1, default #2ba6a3
  h1Title: string;
  headline: string;
  highlightedText: string;
  phone: string;
  phoneLabel: string;
}

export interface AboutFirmContent {
  sectionLabel: string;       // "ABOUT OUR LAW FIRM"
  headingBold: string;        // "Trusted Experienced" (bold part)
  headingLight: string;       // "Attorneys In Atlanta" (light part)
  badgeImage: string;
  badgeImageAlt: string;
  photo: string;
  photoAlt: string;
  accentBarColor: string;
  subHeading: string;         // "Providing Legal Services Throughout Atlanta"
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  // Attorney sub-section
  attorneyName: string;       // "Meet Joanna Black"
  attorneyTitle: string;      // "A TRUSTED ATTORNEY"
  attorneyBio1: string;
  attorneyBio2: string;
  meetCtaText: string;        // "MEET THE ATTORNEY"
  meetCtaUrl: string;
  callLabel: string;          // "Call For A Consultation"
  phoneIconUrl: string;
  attorneyPhoto: string;
  attorneyPhotoAlt: string;
  bgDecorImage: string;       // bottom-left decorative background image
}

export interface PartnerLogo {
  src: string;
  alt: string;
}

export interface AboutFeature {
  number: string;
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  contactLabel: string;
  contactText: string;
  attorneyImage: string;
  attorneyImageAlt: string;
  features: AboutFeature[];
  stats: AboutStat[];
}

export interface PracticeAreaItem {
  title: string;
  image: string;
  imageAlt: string;
  link: string;
  learnMoreText?: string;  // default "LEARN MORE"
  featured?: boolean;      // featured card gets teal gradient overlay (middle card style)
}

export interface PracticeAreasIntroContent {
  sectionLabel: string;
  heading: string;       // light part, e.g. "Types Of"
  headingBold: string;   // bold part, e.g. "Cases We Handle"
  buttonLink: string;
  buttonTextLine1: string;
  buttonTextLine2: string;
}

export interface AwardsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  logos: Array<{ src: string; alt: string }>;
}

export interface TestimonialItem {
  itemHeading: string;   // e.g. "4.8 Star Review Rating on Google"
  text: string;
  author: string;
  authorUrl?: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface TestimonialsContent {
  sectionLabel: string;  // e.g. "OUR CLIENTS STORIES"
  heading: string;       // e.g. "Client Reviews & Testimonials" (bold via strong)
  starsImage: string;    // global 5-star image below heading
  starsImageAlt?: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  viewAllUrl: string;
  viewAllText: string;
  items: TestimonialItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  steps: ProcessStep[];
}

export interface GoogleReviewItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface GoogleReviewsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  reviews: GoogleReviewItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  description: string;
  videoThumbnail: string;
  videoThumbnailAlt?: string;
  videoUrl: string;
  items: FaqItem[];
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  address: string;
  formHeading: string;
  availabilityText: string;
  image: string;
  imageAlt: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

// Complete homepage content structure
export interface HomePageContent {
  hero: HeroContent;
  partnerLogos: PartnerLogo[];
  aboutFirm: AboutFirmContent;
  about: AboutContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  awards: AwardsContent;
  testimonials: TestimonialsContent;
  process: ProcessContent;
  googleReviews: GoogleReviewsContent;
  faq: FaqContent;
  contact: ContactContent;
  /** Maps heading keys (e.g. "about.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - empty defaults, content comes exclusively from the CMS
export const defaultHomeContent: HomePageContent = {
  hero: {
    backgroundImage: "",
    backgroundOverlayOpacity: 0.4,
    taglineWord1: "TRUSTED",
    taglineWord2: "TESTED",
    taglineWord3: "READY",
    ctaText: "",
    ctaUrl: "/contact",
    accentBarColor: "#2ba6a3",
    h1Title: "",
    headline: "",
    highlightedText: "",
    phone: "",
    phoneLabel: "",
  },
  partnerLogos: [],
  aboutFirm: {
    sectionLabel: "ABOUT OUR LAW FIRM",
    headingBold: "Trusted Experienced",
    headingLight: "Attorneys In Atlanta",
    badgeImage: "https://design-pluto.netlify.app/images/experience-badge.png",
    badgeImageAlt: "Over 20 Years of Experience",
    photo: "https://design-pluto.netlify.app/images/about-photo.jpg",
    photoAlt: "Constellation Law Attorneys",
    accentBarColor: "#2ba6a3",
    subHeading: "Providing Legal Services Throughout Atlanta",
    paragraph1: "We founded Constellation Law with a shared vision: to support our clients through the many challenges and transitions life brings.",
    paragraph2: "No matter where our clients are in their journey, we are here to guide them forward with clarity and care.",
    paragraph3: "While not every situation calls for legal intervention, when it does, the right approach can be truly life-changing. Whether facing personal, financial, or family-related matters, we help individuals understand their options and take confident steps toward resolution.",
    paragraph4: "Many of our clients come to us during times of significant change—and we're here to help them move forward with peace of mind.",
    attorneyName: "Meet Joanna Black",
    attorneyTitle: "A TRUSTED ATTORNEY",
    attorneyBio1: "As your attorney, my goal is to provide legal solutions tailored to your unique needs and circumstances. I work closely with you to fully understand your situation—whether it involves your personal, financial, or professional life. Based on this assessment, I present thoughtful, strategic options designed to serve your best interests.",
    attorneyBio2: "With the knowledge and experience to guide you through every step, I help you choose the path that offers clarity, security, and confidence for the future. My commitment is to ensure you have a solid plan in place—one that protects what matters most.",
    meetCtaText: "MEET THE ATTORNEY",
    meetCtaUrl: "/about-us",
    callLabel: "Call For A Consultation",
    phoneIconUrl: "https://design-pluto.netlify.app/images/phone-icon.png",
    attorneyPhoto: "https://design-pluto.netlify.app/images/attorney-photo.jpg",
    attorneyPhotoAlt: "Joanna Black, Attorney",
    bgDecorImage: "https://design-pluto.netlify.app/images/rectangle-143.png",
  },
  about: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    contactLabel: "",
    contactText: "",
    attorneyImage: "",
    attorneyImageAlt: "",
    features: [],
    stats: [],
  },
  practiceAreasIntro: {
    sectionLabel: "OUR PRACTICE AREAS",
    heading: "Types Of",
    headingBold: "Cases We Handle",
    buttonLink: "/practice-areas",
    buttonTextLine1: "",
    buttonTextLine2: "",
  },
  practiceAreas: [],
  awards: {
    sectionLabel: "",
    heading: "",
    description: "",
    logos: [],
  },
  testimonials: {
    sectionLabel: "OUR CLIENTS STORIES",
    heading: "Client Reviews & Testimonials",
    starsImage: "https://design-pluto.netlify.app/images/stars.png",
    starsImageAlt: "5 Star Rating",
    backgroundImage: "https://design-pluto.netlify.app/images/testimonials-bg.jpg",
    backgroundImageAlt: "",
    viewAllUrl: "/testimonials",
    viewAllText: "VIEW ALL TESTIMONIALS",
    items: [
      {
        itemHeading: "4.8 Star Review Rating on Google",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Client Name",
        authorUrl: "",
        ratingImage: "",
        ratingImageAlt: "",
      },
      {
        itemHeading: "4.8 Star Review Rating on Google",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
        author: "Client Name",
        authorUrl: "",
        ratingImage: "",
        ratingImageAlt: "",
      },
      {
        itemHeading: "4.8 Star Review Rating on Google",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: "Client Name",
        authorUrl: "",
        ratingImage: "",
        ratingImageAlt: "",
      },
    ],
  },
  process: {
    sectionLabel: "",
    headingLine1: "",
    headingLine2: "",
    steps: [],
  },
  googleReviews: {
    sectionLabel: "",
    heading: "",
    description: "",
    reviews: [],
  },
  faq: {
    heading: "",
    description: "",
    videoThumbnail: "",
    videoThumbnailAlt: "",
    videoUrl: "",
    items: [],
  },
  contact: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    address: "",
    formHeading: "",
    availabilityText: "",
    image: "",
    imageAlt: "",
    backgroundImage: "",
    backgroundImageAlt: "",
  },
};
