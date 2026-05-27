import InnerPageHero from "@site/components/shared/InnerPageHero";
import type { BlogHeroData } from "@site/lib/cms/publicLoaders";

interface BlogHeroProps {
  hero: BlogHeroData;
}

export default function BlogHero({ hero }: BlogHeroProps) {
  return (
    <InnerPageHero
      backgroundImage={hero.backgroundImage}
      tagline={hero.subtitle}
      h1Title={hero.title}
    />
  );
}
