import type { PracticeAreasPageContent, PracticeAreasVisualGridContent, AwardsContent } from "@site/lib/cms/practiceAreasPageTypes";
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
      <GridSection content={content} update={update} />
      <GlobalSectionInfo sectionTitle="Why Choose Us" managedIn="About Us" />
      <GlobalSectionInfo sectionTitle="Call to Action" managedIn="About Us" />
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
function GridSection({ content, update }: SectionProps) {
  const grid = content.grid;
  const set = (patch: Partial<typeof grid>) => update("grid", { ...grid, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Practice Areas Grid" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={grid.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("grid.heading")}
          onTagChange={(t) => ht.set("grid.heading", t)}
        />
        <RichTextField label="Description" value={grid.description} onChange={(v) => set({ description: v })} />
        <ArrayEditor
          items={grid.areas}
          onChange={(items) => set({ areas: items })}
          itemLabel="Practice Area"
          newItem={() => ({ icon: "FileText", title: "", description: "", image: "", imageAlt: "", link: "/practice-areas" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Icon</Label>
                  <Input value={item.icon} onChange={(e) => upd({ ...item, icon: e.target.value })} placeholder="Lucide icon name" />
                </div>
                <div className="col-span-3">
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Description" value={item.description} onChange={(v) => upd({ ...item, description: v })} />
              <ImageField
                label="Background Image"
                value={item.image}
                onChange={(url) => upd({ ...item, image: url })}
                altValue={item.imageAlt}
                onAltChange={(imageAlt) => upd({ ...item, imageAlt })}
                onSelectAsset={(asset) => upd({
                  ...item,
                  image: asset.url,
                  imageAlt: asset.suggestedAltText || item.imageAlt,
                })}
                folder="practice-areas"
              />
              <div>
                <Label>Image Alt Text</Label>
                <Input value={item.imageAlt} onChange={(e) => upd({ ...item, imageAlt: e.target.value })} placeholder="Describe the background image" />
              </div>
              <div>
                <Label>Link</Label>
                <Input value={item.link} onChange={(e) => upd({ ...item, link: e.target.value })} />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}
