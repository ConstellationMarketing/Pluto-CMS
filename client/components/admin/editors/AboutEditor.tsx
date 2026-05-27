import type { AboutPageContent } from "@site/lib/cms/aboutPageTypes";
import { defaultAboutContent } from "@site/lib/cms/aboutPageTypes";
import { Section, ArrayEditor, ImageField, RichTextField, HeadingField, Input, Label, Textarea } from "./EditorShared";

interface AboutEditorProps {
  content: AboutPageContent;
  onChange: (c: AboutPageContent) => void;
}

export default function AboutEditor({ content, onChange }: AboutEditorProps) {
  const update = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <FirmIntroSection content={content} update={update} />
      <AwardsSectionEditor content={content} update={update} />
      <TestimonialsSectionEditor content={content} update={update} />
      <PracticeAreasIntroEditor content={content} update={update} />
      <StorySection content={content} update={update} />
      <MissionVisionSection content={content} update={update} />
      <TeamSection content={content} update={update} />
      <ValuesSection content={content} update={update} />
      <StatsSection content={content} update={update} />
      <WhyChooseUsSection content={content} update={update} />
      <CTASection content={content} update={update} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) => void;
type SectionProps = { content: AboutPageContent; update: Updater };

function useHeadingTag(content: AboutPageContent, update: Updater) {
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
  const ht = useHeadingTag(content, update);

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
          <Input value={hero.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="About Our Firm" />
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
function FirmIntroSection({ content, update }: SectionProps) {
  const firm = { ...defaultAboutContent.firmIntro!, ...(content.firmIntro ?? {}) };
  const set = (patch: Partial<typeof firm>) => update("firmIntro", { ...firm, ...patch });

  return (
    <Section title="About Firm Section" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label (small text above heading)</Label>
          <Input value={firm.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="ABOUT OUR LAW FIRM" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Heading — Bold Part</Label>
            <Input value={firm.headingBold} onChange={(e) => set({ headingBold: e.target.value })} placeholder="Trusted Experienced" />
          </div>
          <div>
            <Label>Heading — Light Part</Label>
            <Input value={firm.headingLight} onChange={(e) => set({ headingLight: e.target.value })} placeholder="Attorneys In Atlanta" />
          </div>
        </div>
        <ImageField
          label="Experience Badge Image"
          value={firm.badgeImage}
          onChange={(url) => set({ badgeImage: url })}
          altValue={firm.badgeImageAlt}
          onAltChange={(badgeImageAlt) => set({ badgeImageAlt })}
          onSelectAsset={(asset) => set({ badgeImage: asset.url, badgeImageAlt: asset.suggestedAltText || firm.badgeImageAlt })}
          folder="about"
        />
        <ImageField
          label="About Photo"
          value={firm.photo}
          onChange={(url) => set({ photo: url })}
          altValue={firm.photoAlt}
          onAltChange={(photoAlt) => set({ photoAlt })}
          onSelectAsset={(asset) => set({ photo: asset.url, photoAlt: asset.suggestedAltText || firm.photoAlt })}
          folder="about"
        />
        <div>
          <Label>Accent Bar Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={firm.accentBarColor || "#2ba6a3"}
              onChange={(e) => set({ accentBarColor: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded border border-input p-0.5"
            />
            <Input value={firm.accentBarColor} onChange={(e) => set({ accentBarColor: e.target.value })} placeholder="#2ba6a3" className="font-mono text-sm" />
          </div>
        </div>
        <div>
          <Label>Sub-heading</Label>
          <Input value={firm.subHeading} onChange={(e) => set({ subHeading: e.target.value })} placeholder="Providing Legal Services Throughout Atlanta" />
        </div>
        <RichTextField
          label="Body Text"
          value={firm.bodyHtml}
          onChange={(html) => set({ bodyHtml: html })}
          placeholder="Enter the firm description..."
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AwardsSectionEditor({ content, update }: SectionProps) {
  const def = defaultAboutContent.awardsSection!;
  const awards = { ...def, ...(content.awardsSection ?? {}) };
  const set = (patch: Partial<typeof awards>) => update("awardsSection", { ...awards, ...patch });

  return (
    <Section title="Awards & Memberships" defaultOpen={false}>
      <div className="grid gap-4">
        <RichTextField
          label="Heading"
          value={awards.headingHtml}
          onChange={(html) => set({ headingHtml: html })}
          placeholder="Over The Years, Our dedication to excellence... — use Bold for emphasis"
        />

        <h4 className="font-medium pt-2">Award Logos (full-width row)</h4>
        <ArrayEditor
          items={awards.logos?.length ? awards.logos : []}
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
          items={awards.features?.length ? awards.features : []}
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
                <Label>Title (uppercase)</Label>
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
function TestimonialsSectionEditor({ content, update }: SectionProps) {
  const def = defaultAboutContent.testimonialsSection!;
  const t = { ...def, ...(content.testimonialsSection ?? {}) };
  const set = (patch: Partial<typeof t>) => update("testimonialsSection", { ...t, ...patch });

  return (
    <Section title="Testimonials" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Main Heading</Label>
          <Input value={t.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="Client Reviews & Testimonials" />
        </div>
        <div>
          <Label>Sub-label (e.g. "OUR CLIENTS STORIES")</Label>
          <Input value={t.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="OUR CLIENTS STORIES" />
        </div>
        <ImageField
          label="Stars Image (5-star rating image below heading)"
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
          <Label>Background Overlay Opacity (0–1, 0 = no overlay)</Label>
          <Input
            type="number"
            min={0}
            max={1}
            step={0.05}
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
                <Label>Testimonial Heading (e.g. "4.8 Star Review Rating on Google")</Label>
                <Input value={item.itemHeading || ""} onChange={(e) => upd({ ...item, itemHeading: e.target.value })} placeholder="4.8 Star Review Rating on Google" />
              </div>
              <RichTextField
                label="Review Text"
                value={item.text}
                onChange={(html) => upd({ ...item, text: html })}
                placeholder="Enter the review text..."
              />
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
  const def = defaultAboutContent.practiceAreasIntroSection!;
  const intro = { ...def, ...(content.practiceAreasIntroSection ?? {}) };
  const set = (patch: Partial<typeof intro>) => update("practiceAreasIntroSection", { ...intro, ...patch });

  return (
    <Section title="Practice Areas Intro (inside Testimonials)" defaultOpen={false}>
      <div className="grid gap-4">
        <RichTextField
          label="Heading"
          value={intro.headingHtml}
          onChange={(html) => set({ headingHtml: html })}
          placeholder="Types Of Cases We Handle — use Bold for emphasis"
        />
        <div>
          <Label>Section Label (small text below heading, e.g. "OUR PRACTICE AREAS")</Label>
          <Input value={intro.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="OUR PRACTICE AREAS" />
        </div>
        <div>
          <Label>Button Link</Label>
          <Input value={intro.buttonLink} onChange={(e) => set({ buttonLink: e.target.value })} placeholder="/practice-areas" />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function StorySection({ content, update }: SectionProps) {
  const story = content.story;
  const set = (patch: Partial<typeof story>) => update("story", { ...story, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Our Story" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={story.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("story.sectionLabel")}
          onTagChange={(t) => ht.set("story.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={story.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <ImageField
          label="Image"
          value={story.image}
          onChange={(url) => set({ image: url })}
          altValue={story.imageAlt}
          onAltChange={(imageAlt) => set({ imageAlt })}
          onSelectAsset={(asset) => set({
            image: asset.url,
            imageAlt: asset.suggestedAltText || story.imageAlt,
          })}
          folder="team"
        />
        <div>
          <Label>Image Alt Text</Label>
          <Input value={story.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} />
        </div>
        <h4 className="font-medium mt-2">Paragraphs</h4>
        <ArrayEditor
          items={story.paragraphs.map((text, i) => ({ id: String(i), text }))}
          onChange={(items) => set({ paragraphs: items.map((it) => it.text) })}
          itemLabel="Paragraph"
          newItem={() => ({ id: String(Date.now()), text: "" })}
          renderItem={(item, _, upd) => (
            <RichTextField label="" value={item.text} onChange={(v) => upd({ ...item, text: v })} />
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function MissionVisionSection({ content, update }: SectionProps) {
  const mv = content.missionVision;
  const set = (patch: Partial<typeof mv>) => update("missionVision", { ...mv, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Mission & Vision" defaultOpen={false}>
      <div className="grid gap-4">
        <h4 className="font-medium">Mission</h4>
        <HeadingField
          label="Heading"
          value={mv.mission.heading}
          onChange={(v) => set({ mission: { ...mv.mission, heading: v } })}
          tag={ht.get("mission.heading")}
          onTagChange={(t) => ht.set("mission.heading", t)}
        />
        <RichTextField label="Text" value={mv.mission.text} onChange={(v) => set({ mission: { ...mv.mission, text: v } })} />
        <hr />
        <h4 className="font-medium">Vision</h4>
        <HeadingField
          label="Heading"
          value={mv.vision.heading}
          onChange={(v) => set({ vision: { ...mv.vision, heading: v } })}
          tag={ht.get("vision.heading")}
          onTagChange={(t) => ht.set("vision.heading", t)}
        />
        <RichTextField label="Text" value={mv.vision.text} onChange={(v) => set({ vision: { ...mv.vision, text: v } })} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function TeamSection({ content, update }: SectionProps) {
  const team = content.team;
  const set = (patch: Partial<typeof team>) => update("team", { ...team, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Team Members" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={team.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("team.sectionLabel")}
          onTagChange={(t) => ht.set("team.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={team.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <ArrayEditor
          items={team.members}
          onChange={(items) => set({ members: items })}
          itemLabel="Member"
          newItem={() => ({ name: "", title: "", bio: "", image: "", imageAlt: "", specialties: [] })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Name</Label>
                  <Input value={item.name} onChange={(e) => upd({ ...item, name: e.target.value })} />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Bio" value={item.bio} onChange={(v) => upd({ ...item, bio: v })} />
              <ImageField
                label="Photo"
                value={item.image}
                onChange={(url) => upd({ ...item, image: url })}
                altValue={item.imageAlt}
                onAltChange={(imageAlt) => upd({ ...item, imageAlt })}
                onSelectAsset={(asset) => upd({
                  ...item,
                  image: asset.url,
                  imageAlt: asset.suggestedAltText || item.imageAlt,
                })}
                folder="team"
              />
              <div>
                <Label>Photo Alt Text</Label>
                <Input value={item.imageAlt} onChange={(e) => upd({ ...item, imageAlt: e.target.value })} placeholder="Describe the photo" />
              </div>
              <div>
                <Label>Specialties (comma-separated)</Label>
                <Input
                  value={item.specialties.join(", ")}
                  onChange={(e) => upd({ ...item, specialties: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ValuesSection({ content, update }: SectionProps) {
  const values = content.values;
  const set = (patch: Partial<typeof values>) => update("values", { ...values, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Our Values" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={values.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("values.sectionLabel")}
          onTagChange={(t) => ht.set("values.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={values.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={values.subtitle} onChange={(e) => set({ subtitle: e.target.value })} />
        </div>
        <ArrayEditor
          items={values.items}
          onChange={(items) => set({ items })}
          itemLabel="Value"
          newItem={() => ({ icon: "Star", title: "", description: "" })}
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
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function StatsSection({ content, update }: SectionProps) {
  return (
    <Section title="Stats" defaultOpen={false}>
      <ArrayEditor
        items={content.stats.stats}
        onChange={(items) => update("stats", { stats: items })}
        itemLabel="Stat"
        newItem={() => ({ value: "", label: "" })}
        renderItem={(item, _, upd) => (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Value</Label>
              <Input value={item.value} onChange={(e) => upd({ ...item, value: e.target.value })} />
            </div>
            <div>
              <Label>Label</Label>
              <Input value={item.label} onChange={(e) => upd({ ...item, label: e.target.value })} />
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function WhyChooseUsSection({ content, update }: SectionProps) {
  const wcu = content.whyChooseUs;
  const set = (patch: Partial<typeof wcu>) => update("whyChooseUs", { ...wcu, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Why Choose Us" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={wcu.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("whyChooseUs.sectionLabel")}
          onTagChange={(t) => ht.set("whyChooseUs.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={wcu.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={wcu.description} onChange={(v) => set({ description: v })} />
        <ImageField
          label="Section Image"
          value={wcu.image}
          onChange={(url) => set({ image: url })}
          altValue={wcu.imageAlt}
          onAltChange={(imageAlt) => set({ imageAlt })}
          onSelectAsset={(asset) => set({
            image: asset.url,
            imageAlt: asset.suggestedAltText || wcu.imageAlt,
          })}
          folder="about"
        />
        <div>
          <Label>Image Alt Text</Label>
          <Input value={wcu.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} />
        </div>
        <ArrayEditor
          items={wcu.items}
          onChange={(items) => set({ items })}
          itemLabel="Item"
          newItem={() => ({ number: String(wcu.items.length + 1), title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Number</Label>
                  <Input value={item.number} onChange={(e) => upd({ ...item, number: e.target.value })} />
                </div>
                <div className="col-span-3">
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Description" value={item.description} onChange={(v) => upd({ ...item, description: v })} />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function CTASection({ content, update }: SectionProps) {
  const cta = content.cta;
  const set = (patch: Partial<typeof cta>) => update("cta", { ...cta, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Call to Action" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={cta.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("cta.heading")}
          onTagChange={(t) => ht.set("cta.heading", t)}
        />
        <RichTextField label="Description" value={cta.description} onChange={(v) => set({ description: v })} />
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
        <hr />
        <h4 className="font-medium">Secondary Button</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Label</Label>
            <Input value={cta.secondaryButton.label} onChange={(e) => set({ secondaryButton: { ...cta.secondaryButton, label: e.target.value } })} />
          </div>
          <div>
            <Label>Sublabel</Label>
            <Input value={cta.secondaryButton.sublabel} onChange={(e) => set({ secondaryButton: { ...cta.secondaryButton, sublabel: e.target.value } })} />
          </div>
          <div>
            <Label>Link</Label>
            <Input value={cta.secondaryButton.link} onChange={(e) => set({ secondaryButton: { ...cta.secondaryButton, link: e.target.value } })} />
          </div>
        </div>
      </div>
    </Section>
  );
}
