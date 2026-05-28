import type { PracticeAreasPageContent, PracticeAreasVisualGridContent, AwardsContent, TestimonialsContent, PracticeAreasIntroContent } from "@site/lib/cms/practiceAreasPageTypes";
import { Section, ArrayEditor, ImageField, GlobalSectionInfo, RichTextField, HeadingField, Input, Label, Textarea } from "./EditorShared";

interface PracticeAreasEditorProps {
  content: PracticeAreasPageContent;
  onChange: (c: PracticeAreasPageContent) => void;
}

export default function PracticeAreasEditor({ content, onChange }: PracticeAreasEditorProps) {
  const update = <K extends keyof PracticeAreasPageContent>(key: K, value: PracticeAreasPageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <VisualGridSection content={content} update={update} />
      <AwardsSectionEditor content={content} update={update} />
      <TestimonialsSectionEditor content={content} update={update} />
      <PracticeAreasIntroEditor content={content} update={update} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof PracticeAreasPageContent>(key: K, value: PracticeAreasPageContent[K]) => void;
type SectionProps = { content: PracticeAreasPageContent; update: Updater };

function useHeadingTag(content: PracticeAreasPageContent, update: Updater) {
  return {
    get: (key: string) => content.headingTags?.[key] ?? "h2",
    set: (key: string, tag: string) =>
      update("headingTags", { ...content.headingTags, [key]: tag }),
  };
}

/* ------------------------------------------------------------------ */
function HeroSection({ content, update }: SectionProps) {
  const hero = content.hero;
  const set = (patch: Partial<typeof hero>) => update("hero", { ...hero, ...patch });

  return (
    <Section title="Hero Section">
      <div className="grid gap-4">
        <ImageField
          label="Background Image"
          value={hero.backgroundImage ?? ""}
          onChange={(v) => set({ backgroundImage: v })}
        />
        <div>
          <Label>Overlay Opacity (0–1)</Label>
          <Input
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={hero.backgroundOverlayOpacity ?? 0.55}
            onChange={(e) => set({ backgroundOverlayOpacity: parseFloat(e.target.value) || 0.55 })}
          />
        </div>
        <div>
          <Label>H1 Title — below accent bar</Label>
          <p className="text-xs text-gray-500 mb-1">Rendered as the &lt;h1&gt; below the accent line.</p>
          <Input value={hero.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="Practice Areas" />
        </div>
        <div className="space-y-2">
          <RichTextField
            label="Tagline — decorative text"
            value={hero.taglineHtml ?? ""}
            onChange={(html) => set({ taglineHtml: html })}
            placeholder="Use Bold to emphasise the key word"
          />
          <p className="text-xs text-gray-500">Rendered as large decorative text. Use <strong>Bold</strong> to emphasise the main word.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>CTA Button Text</Label>
            <Input value={hero.ctaText ?? ""} onChange={(e) => set({ ctaText: e.target.value })} placeholder="SCHEDULE A CONSULTATION" />
          </div>
          <div>
            <Label>CTA Button URL</Label>
            <Input value={hero.ctaUrl ?? ""} onChange={(e) => set({ ctaUrl: e.target.value })} placeholder="/contact/" />
          </div>
        </div>
        <div>
          <Label>Accent Bar Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={hero.accentBarColor || "#2ba6a3"}
              onChange={(e) => set({ accentBarColor: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded border border-input p-0.5"
            />
            <Input
              value={hero.accentBarColor || "#2ba6a3"}
              onChange={(e) => set({ accentBarColor: e.target.value })}
              placeholder="#2ba6a3"
              className="font-mono text-sm"
            />
          </div>
        </div>
        <RichTextField label="Description — text below H1" value={hero.description} onChange={(v) => set({ description: v })} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AwardsSectionEditor({ content, update }: SectionProps) {
  const awards: AwardsContent = {
    sectionLabel: "", headingHtml: "", heading: "", headingBold: "", description: "", logos: [], features: [],
    ...(content.awardsSection ?? {}),
  };
  const set = (patch: Partial<AwardsContent>) => update("awardsSection", { ...awards, ...patch });

  return (
    <Section title="Awards & Memberships" defaultOpen={false}>
      <div className="grid gap-4">
        <RichTextField
          label="Heading"
          value={awards.headingHtml}
          onChange={(html) => set({ headingHtml: html })}
          placeholder="Over The Years, Our dedication to excellence... — use Bold for emphasis"
        />

        <h4 className="font-medium pt-2">Award Logos</h4>
        <ArrayEditor
          items={awards.logos ?? []}
          onChange={(items) => set({ logos: items })}
          itemLabel="Logo"
          newItem={() => ({ src: "", alt: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <ImageField
                label="Logo Image"
                value={item.src}
                onChange={(url) => upd({ ...item, src: url })}
                altValue={item.alt}
                onAltChange={(alt) => upd({ ...item, alt })}
                onSelectAsset={(asset) => upd({ ...item, src: asset.url, alt: asset.suggestedAltText || item.alt })}
                folder="awards"
              />
              <div>
                <Label>Alt Text</Label>
                <Input value={item.alt} onChange={(e) => upd({ ...item, alt: e.target.value })} />
              </div>
            </div>
          )}
        />

        <h4 className="font-medium pt-2">Feature Columns (icon + title)</h4>
        <ArrayEditor
          items={awards.features ?? []}
          onChange={(items) => set({ features: items })}
          itemLabel="Feature"
          newItem={() => ({ icon: "", iconAlt: "", title: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <ImageField
                label="Icon Image"
                value={item.icon}
                onChange={(url) => upd({ ...item, icon: url })}
                folder="awards"
              />
              <div>
                <Label>Icon Alt Text</Label>
                <Input value={item.iconAlt || ""} onChange={(e) => upd({ ...item, iconAlt: e.target.value })} />
              </div>
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="SOLUTIONS-FOCUSED REPRESENTATION" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function VisualGridSection({ content, update }: SectionProps) {
  const vg: PracticeAreasVisualGridContent = content.visualGrid ?? { items: [] };
  const set = (patch: Partial<PracticeAreasVisualGridContent>) => update("visualGrid", { ...vg, ...patch });

  return (
    <Section title="Visual Cards Grid (Homepage-style)" defaultOpen={false}>
      <p className="text-xs text-gray-500 mb-3">Image cards with teal/orange overlay — same layout as homepage Practice Areas section.</p>
      <ArrayEditor
        items={vg.items}
        onChange={(items) => set({ items })}
        itemLabel="Card"
        newItem={() => ({ title: "", image: "", imageAlt: "", link: "/practice-areas", learnMoreText: "LEARN MORE", featured: false })}
        renderItem={(item, _, upd) => (
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="Personal Injury" />
              </div>
              <div>
                <Label>Link</Label>
                <Input value={item.link} onChange={(e) => upd({ ...item, link: e.target.value })} placeholder="/practice-areas/personal-injury/" />
              </div>
            </div>
            <ImageField
              label="Background Image"
              value={item.image}
              onChange={(url) => upd({ ...item, image: url })}
              altValue={item.imageAlt}
              onAltChange={(imageAlt) => upd({ ...item, imageAlt })}
              folder="practice-areas"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Learn More Text</Label>
                <Input value={item.learnMoreText ?? "LEARN MORE"} onChange={(e) => upd({ ...item, learnMoreText: e.target.value })} placeholder="LEARN MORE" />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id={`featured-${_}`}
                  checked={item.featured ?? false}
                  onChange={(e) => upd({ ...item, featured: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor={`featured-${_}`}>Featured (teal gradient)</Label>
              </div>
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function TestimonialsSectionEditor({ content, update }: SectionProps) {
  const t: TestimonialsContent = {
    sectionLabel: "", heading: "", starsImage: "", starsImageAlt: "",
    backgroundImage: "https://design-pluto.netlify.app/images/testimonials-bg.jpg",
    backgroundImageAlt: "", backgroundOverlayOpacity: 0, viewAllUrl: "", viewAllText: "", items: [],
    ...(content.testimonialsSection ?? {}),
  };
  const set = (patch: Partial<TestimonialsContent>) => update("testimonialsSection", { ...t, ...patch });

  return (
    <Section title="Testimonials" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Main Heading</Label>
          <Input value={t.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="Client Reviews & Testimonials" />
        </div>
        <div>
          <Label>Sub-label</Label>
          <Input value={t.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="OUR CLIENTS STORIES" />
        </div>
        <ImageField
          label="Stars Image"
          value={t.starsImage || ""}
          onChange={(url) => set({ starsImage: url })}
          altValue={t.starsImageAlt || ""}
          onAltChange={(starsImageAlt) => set({ starsImageAlt })}
          folder="logos"
        />
        <ImageField
          label="Section Background Image"
          value={t.backgroundImage}
          onChange={(url) => set({ backgroundImage: url })}
          altValue={t.backgroundImageAlt || ""}
          onAltChange={(backgroundImageAlt) => set({ backgroundImageAlt })}
          folder="backgrounds"
        />
        <div>
          <Label>Background Overlay Opacity (0–1)</Label>
          <Input
            type="number" min={0} max={1} step={0.05}
            value={t.backgroundOverlayOpacity ?? 0}
            onChange={(e) => set({ backgroundOverlayOpacity: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>"View All" Button Text</Label>
            <Input value={t.viewAllText || ""} onChange={(e) => set({ viewAllText: e.target.value })} placeholder="VIEW ALL TESTIMONIALS" />
          </div>
          <div>
            <Label>"View All" Button URL</Label>
            <Input value={t.viewAllUrl || ""} onChange={(e) => set({ viewAllUrl: e.target.value })} placeholder="/testimonials" />
          </div>
        </div>
        <ArrayEditor
          items={t.items}
          onChange={(items) => set({ items })}
          itemLabel="Testimonial"
          newItem={() => ({ itemHeading: "", text: "", author: "", authorUrl: "", ratingImage: "", ratingImageAlt: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Testimonial Heading</Label>
                <Input value={item.itemHeading || ""} onChange={(e) => upd({ ...item, itemHeading: e.target.value })} placeholder="4.8 Star Review Rating on Google" />
              </div>
              <RichTextField label="Review Text" value={item.text} onChange={(html) => upd({ ...item, text: html })} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Author Name</Label>
                  <Input value={item.author} onChange={(e) => upd({ ...item, author: e.target.value })} />
                </div>
                <div>
                  <Label>Author URL (optional)</Label>
                  <Input value={item.authorUrl || ""} onChange={(e) => upd({ ...item, authorUrl: e.target.value })} placeholder="https://..." />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function PracticeAreasIntroEditor({ content, update }: SectionProps) {
  const intro: PracticeAreasIntroContent = {
    sectionLabel: "OUR PRACTICE AREAS", headingHtml: "", descriptionHtml: "",
    heading: "Types Of", headingBold: "Cases We Handle",
    buttonLink: "/practice-areas", buttonTextLine1: "", buttonTextLine2: "",
    ...(content.practiceAreasIntroSection ?? {}),
  };
  const set = (patch: Partial<PracticeAreasIntroContent>) => update("practiceAreasIntroSection", { ...intro, ...patch });
  return (
    <Section title="Practice Areas Intro" defaultOpen={false}>
      <div className="grid gap-4">
        <RichTextField
          label="Heading"
          value={intro.headingHtml}
          onChange={(html) => set({ headingHtml: html })}
          placeholder="Types Of Cases We Handle — use Bold for emphasis"
        />
        <div>
          <Label>Section Label</Label>
          <Input value={intro.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="OUR PRACTICE AREAS" />
        </div>
        <RichTextField
          label="Description"
          value={intro.descriptionHtml}
          onChange={(html) => set({ descriptionHtml: html })}
          placeholder="Add a description paragraph below the heading..."
        />
      </div>
    </Section>
  );
}
