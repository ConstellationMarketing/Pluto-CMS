import { Phone } from "lucide-react";
import type { PracticeAreaHeroContent } from "@site/lib/cms/practiceAreaPageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import CallBox from "@site/components/shared/CallBox";
import InnerPageHero from "@site/components/shared/InnerPageHero";

interface PracticeAreaHeroProps {
  content: PracticeAreaHeroContent;
}

export default function PracticeAreaHero({ content }: PracticeAreaHeroProps) {
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  return (
    <InnerPageHero
      backgroundImage={content.backgroundImage}
      tagline={content.tagline}
      h1Title={content.sectionLabel}
      description={content.description}
      rightContent={
        <CallBox
          icon={Phone}
          title={phoneLabel}
          subtitle={phoneDisplay}
          phone={phoneNumber}
        />
      }
    />
  );
}
