import { Phone } from "lucide-react";
import CallBox from "@site/components/shared/CallBox";
import InnerPageHero from "@site/components/shared/InnerPageHero";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import type { BlogHeroData } from "@site/lib/cms/publicLoaders";

interface BlogHeroProps {
  hero: BlogHeroData;
}

export default function BlogHero({ hero }: BlogHeroProps) {
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  return (
    <InnerPageHero
      backgroundImage={hero.backgroundImage}
      tagline={hero.subtitle}
      h1Title={hero.title}
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
