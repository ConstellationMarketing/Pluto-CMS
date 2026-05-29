import type { ContentBlock } from "@site/lib/blocks";
import RichText from "@site/components/shared/RichText";

interface CTABlockProps {
  block: Extract<ContentBlock, { type: "cta" }>;
}

export default function CTABlock({ block }: CTABlockProps) {
  return (
    <div className="bg-brand-accent py-[40px] md:py-[60px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
        <div className="text-center">
          <h2 className="font-playfair text-[36px] md:text-[48px] lg:text-[60px] leading-tight text-black pb-[15px]">
            {block.heading}
          </h2>
          <RichText
            html={block.description}
            className="font-outfit text-[18px] md:text-[22px] leading-[26px] md:leading-[32px] text-black/80"
          />
        </div>
      </div>
    </div>
  );
}
