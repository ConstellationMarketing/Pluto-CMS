import type { PracticeAreaHeroContent } from "@site/lib/cms/practiceAreaPageTypes";
import InnerPageHero from "@site/components/shared/InnerPageHero";

interface PracticeAreaHeroProps {
  content: PracticeAreaHeroContent;
}

export default function PracticeAreaHero({ content }: PracticeAreaHeroProps) {
  return (
    <InnerPageHero
      backgroundImage={content.backgroundImage}
      tagline={content.tagline}
      h1Title={content.sectionLabel}
      description={content.description}
    />
  );
}
