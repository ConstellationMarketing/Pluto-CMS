import type { HomePageContent } from "@site/lib/cms/homePageTypes";
import { defaultHomeContent } from "@site/lib/cms/homePageTypes";
import { Section, ArrayEditor, ImageField, RichTextField, HeadingField, Input, Label } from "./EditorShared";
import { Textarea } from "@/components/ui/textarea";

interface HomeEditorProps {
  content: HomePageContent;
  onChange: (c: HomePageContent) => void;
}

export default function HomeEditor({ content, onChange }: HomeEditorProps) {
  const update = <K extends keyof HomePageContent>(key: K, value: HomePageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <AboutFirmSectionEditor content={content} update={update} />
      <PracticeAreasIntroSection content={content} update={update} />
      <PracticeAreasItemsSection content={content} update={update} />
      <AwardsSection content={content} update={update} />
      <TestimonialsSection content={content} update={update} />
      <ProcessSection content={content} update={update} />
      <GoogleReviewsSection content={content} update={update} />
      <BlogPreviewSectionEditor content={content} update={update} />
      <FaqSectionEditor content={content} update={update} />
      <ContactSectionEditor content={content} update={update} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof HomePageContent>(key: K, value: HomePageContent[K]) => void;
type SectionProps = { content: HomePageContent; update: Updater };

function useHeadingTag(content: HomePageContent, update: Updater) {
  return {
    get: (key: string) => content.headingTags?.[key] ?? "h2",
    set: (key: string, tag: string) =>
      update("headingTags", { ...content.headingTags, [key]: tag }),
  };
}

/* ------------------------------------------------------------------ */
function HeroSection({ content, update }: SectionProps) {
  const hero = { ...defaultHomeContent.hero, ...(content.hero ?? {}) };
  const set = (patch: Partial<typeof hero>) => update("hero", { ...hero, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Hero Section">
      <div className="grid gap-4">
        <ImageField
          label="Background Image"
          value={hero.backgroundImage}
          onChange={(url) => set({ backgroundImage: url })}
          folder="hero"
        />
        <div>
          <Label>Overlay Opacity (0–1)</Label>
          <Input
            type="number"
            min="0"
            max="1"
            step="0.05"
            value={hero.backgroundOverlayOpacity ?? 0.4}
            onChange={(e) => set({ backgroundOverlayOpacity: parseFloat(e.target.value) || 0.4 })}
          />
        </div>

        <div>
          <Label>H1 Title — below accent bar</Label>
          <p className="text-xs text-gray-500 mb-1">Rendered as the &lt;h1&gt; below the accent line (e.g. "Trusted & Experienced Lawyers in Atlanta.")</p>
          <Input value={hero.h1Title} onChange={(e) => set({ h1Title: e.target.value })} placeholder="Trusted & Experienced Lawyers in Atlanta." />
        </div>

        <div className="space-y-2">
          <RichTextField
            label="Tagline — decorative text (p tag)"
            value={hero.taglineHtml}
            onChange={(html) => set({ taglineHtml: html })}
            placeholder="TRUSTED TESTED READY — use Bold for the main word"
          />
          <p className="text-xs text-gray-500">Rendered as large decorative text in the hero. Use <strong>Bold</strong> to emphasise the main word.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>CTA Button Text</Label>
            <Input value={hero.ctaText} onChange={(e) => set({ ctaText: e.target.value })} placeholder="SCHEDULE A CONSULTATION" />
          </div>
          <div>
            <Label>CTA Button URL</Label>
            <Input value={hero.ctaUrl} onChange={(e) => set({ ctaUrl: e.target.value })} placeholder="/contact" />
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
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AboutFirmSectionEditor({ content, update }: SectionProps) {
  const firm = { ...defaultHomeContent.aboutFirm, ...(content.aboutFirm ?? {}) };
  const set = (patch: Partial<typeof firm>) => update("aboutFirm", { ...firm, ...patch });

  return (
    <Section title="About Firm Section">
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
        <div>
          <Label>Badge Image Alt Text</Label>
          <Input value={firm.badgeImageAlt} onChange={(e) => set({ badgeImageAlt: e.target.value })} placeholder="Over 20 Years of Experience" />
        </div>
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
          <Label>Photo Alt Text</Label>
          <Input value={firm.photoAlt} onChange={(e) => set({ photoAlt: e.target.value })} placeholder="Constellation Law Attorneys" />
        </div>
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
          <Label>Sub-heading (h2 in right column)</Label>
          <Input value={firm.subHeading} onChange={(e) => set({ subHeading: e.target.value })} placeholder="Providing Legal Services Throughout Atlanta" />
        </div>
        <RichTextField
          label="Body Text"
          value={firm.bodyHtml}
          onChange={(html) => set({ bodyHtml: html })}
          placeholder="Enter the firm description..."
        />

        <hr className="my-2" />
        <p className="text-sm font-semibold text-gray-700">Attorney Sub-Section</p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Attorney Name (h2)</Label>
            <Input value={firm.attorneyName} onChange={(e) => set({ attorneyName: e.target.value })} placeholder="Meet Joanna Black" />
          </div>
          <div>
            <Label>Attorney Title (h3, italic)</Label>
            <Input value={firm.attorneyTitle} onChange={(e) => set({ attorneyTitle: e.target.value })} placeholder="A TRUSTED ATTORNEY" />
          </div>
        </div>
        <RichTextField
          label="Attorney Bio"
          value={firm.attorneyBioHtml}
          onChange={(html) => set({ attorneyBioHtml: html })}
          placeholder="Enter the attorney bio..."
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>CTA Button Text</Label>
            <Input value={firm.meetCtaText} onChange={(e) => set({ meetCtaText: e.target.value })} placeholder="MEET THE ATTORNEY" />
          </div>
          <div>
            <Label>CTA Button URL</Label>
            <Input value={firm.meetCtaUrl} onChange={(e) => set({ meetCtaUrl: e.target.value })} placeholder="/about-us" />
          </div>
        </div>
        <div>
          <Label>Call Label (above phone number)</Label>
          <Input value={firm.callLabel} onChange={(e) => set({ callLabel: e.target.value })} placeholder="Call For A Consultation" />
        </div>
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
        <ImageField
          label="Phone Icon"
          value={firm.phoneIconUrl}
          onChange={(url) => set({ phoneIconUrl: url })}
          folder="about"
        />
        <ImageField
          label="Attorney Photo"
          value={firm.attorneyPhoto}
          onChange={(url) => set({ attorneyPhoto: url })}
          altValue={firm.attorneyPhotoAlt}
          onAltChange={(attorneyPhotoAlt) => set({ attorneyPhotoAlt })}
          onSelectAsset={(asset) => set({ attorneyPhoto: asset.url, attorneyPhotoAlt: asset.suggestedAltText || firm.attorneyPhotoAlt })}
          folder="about"
        />
        <div>
          <Label>Attorney Photo Alt Text</Label>
          <Input value={firm.attorneyPhotoAlt} onChange={(e) => set({ attorneyPhotoAlt: e.target.value })} placeholder="Joanna Black, Attorney" />
        </div>
        <ImageField
          label="Background Decorative Image (bottom-left)"
          value={firm.bgDecorImage}
          onChange={(url) => set({ bgDecorImage: url })}
          folder="about"
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AboutSectionEditor({ content, update }: SectionProps) {
  const about = { ...defaultHomeContent.about, ...(content.about ?? {}) };
  const set = (patch: Partial<typeof about>) => update("about", { ...about, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="About Section" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={about.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("about.sectionLabel")}
          onTagChange={(t) => ht.set("about.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={about.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={about.description} onChange={(v) => set({ description: v })} />
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Contact Label</Label>
            <Input value={about.contactLabel} onChange={(e) => set({ contactLabel: e.target.value })} />
          </div>
          <div>
            <Label>Contact Text</Label>
            <Input value={about.contactText} onChange={(e) => set({ contactText: e.target.value })} />
          </div>
        </div>
        <ImageField
          label="Attorney Image"
          value={about.attorneyImage}
          onChange={(url) => set({ attorneyImage: url })}
          altValue={about.attorneyImageAlt}
          onAltChange={(attorneyImageAlt) => set({ attorneyImageAlt })}
          onSelectAsset={(asset) => set({
            attorneyImage: asset.url,
            attorneyImageAlt: asset.suggestedAltText || about.attorneyImageAlt,
          })}
          folder="team"
        />
        <div>
          <Label>Attorney Image Alt</Label>
          <Input value={about.attorneyImageAlt} onChange={(e) => set({ attorneyImageAlt: e.target.value })} />
        </div>

        <h4 className="font-medium mt-2">Features</h4>
        <ArrayEditor
          items={about.features}
          onChange={(items) => set({ features: items })}
          itemLabel="Feature"
          newItem={() => ({ number: String(about.features.length + 1), title: "", description: "" })}
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

        <h4 className="font-medium mt-2">Stats</h4>
        <ArrayEditor
          items={about.stats}
          onChange={(items) => set({ stats: items })}
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
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function PracticeAreasIntroSection({ content, update }: SectionProps) {
  const intro = { ...defaultHomeContent.practiceAreasIntro, ...(content.practiceAreasIntro ?? {}) };
  const set = (patch: Partial<typeof intro>) => update("practiceAreasIntro", { ...intro, ...patch });
  const ht = useHeadingTag(content, update);

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
          <Label>Section Label (small text below heading, e.g. "OUR PRACTICE AREAS")</Label>
          <Input value={intro.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="OUR PRACTICE AREAS" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Button Text Line 1</Label>
            <Input value={intro.buttonTextLine1 || ""} onChange={(e) => set({ buttonTextLine1: e.target.value })} placeholder="Discover" />
          </div>
          <div>
            <Label>Button Text Line 2</Label>
            <Input value={intro.buttonTextLine2 || ""} onChange={(e) => set({ buttonTextLine2: e.target.value })} placeholder="All Practice Areas" />
          </div>
        </div>
        <div>
          <Label>Button Link</Label>
          <Input value={intro.buttonLink} onChange={(e) => set({ buttonLink: e.target.value })} placeholder="/practice-areas/" />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function PracticeAreasItemsSection({ content, update }: SectionProps) {
  return (
    <Section title="Practice Areas Grid" defaultOpen={false}>
      <ArrayEditor
        items={content.practiceAreas ?? []}
        onChange={(items) => update("practiceAreas", items)}
        itemLabel="Practice Area"
        newItem={() => ({ title: "", image: "", imageAlt: "", link: "/practice-areas", learnMoreText: "LEARN MORE", featured: false })}
        renderItem={(item, _, upd) => (
          <div className="grid gap-3">
            <div>
              <Label>Title</Label>
              <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
            </div>
            <ImageField
              label="Image"
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
              <Input value={item.imageAlt} onChange={(e) => upd({ ...item, imageAlt: e.target.value })} placeholder="Describe the image" />
            </div>
            <div>
              <Label>Link</Label>
              <Input value={item.link} onChange={(e) => upd({ ...item, link: e.target.value })} />
            </div>
            <div>
              <Label>Button Text (default: LEARN MORE)</Label>
              <Input value={item.learnMoreText || ""} onChange={(e) => upd({ ...item, learnMoreText: e.target.value })} placeholder="LEARN MORE" />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id={`featured-${item.title}`}
                checked={item.featured ?? false}
                onChange={(e) => upd({ ...item, featured: e.target.checked })}
                className="h-4 w-4 cursor-pointer"
              />
              <Label htmlFor={`featured-${item.title}`} className="cursor-pointer">
                Featured card (teal gradient overlay — middle card style)
              </Label>
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AwardsSection({ content, update }: SectionProps) {
  const awards = { ...defaultHomeContent.awards, ...(content.awards ?? {}) };
  const set = (patch: Partial<typeof awards>) => update("awards", { ...awards, ...patch });
  const ht = useHeadingTag(content, update);

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
          items={awards.logos?.length ? awards.logos : defaultHomeContent.awards.logos}
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
          items={awards.features?.length ? awards.features : defaultHomeContent.awards.features}
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
function TestimonialsSection({ content, update }: SectionProps) {
  const t = {
    ...defaultHomeContent.testimonials,
    ...(content.testimonials ?? {}),
    items: content.testimonials?.items ?? defaultHomeContent.testimonials.items,
  };
  const set = (patch: Partial<typeof t>) => update("testimonials", { ...t, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Testimonials">
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
function ProcessSection({ content, update }: SectionProps) {
  const p = { ...defaultHomeContent.process, ...(content.process ?? {}) };
  const set = (patch: Partial<typeof p>) => update("process", { ...p, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Process Steps" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={p.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("process.sectionLabel")}
          onTagChange={(t) => ht.set("process.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle Line 1</Label>
          <Input value={p.headingLine1} onChange={(e) => set({ headingLine1: e.target.value })} />
        </div>
        <div>
          <Label>Subtitle Line 2</Label>
          <Input value={p.headingLine2} onChange={(e) => set({ headingLine2: e.target.value })} />
        </div>
        <ArrayEditor
          items={p.steps}
          onChange={(items) => set({ steps: items })}
          itemLabel="Step"
          newItem={() => ({ number: "", title: "", description: "" })}
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
function GoogleReviewsSection({ content, update }: SectionProps) {
  const r = { ...defaultHomeContent.googleReviews, ...(content.googleReviews ?? {}) };
  const set = (patch: Partial<typeof r>) => update("googleReviews", { ...r, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Google Reviews" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={r.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("googleReviews.sectionLabel")}
          onTagChange={(t) => ht.set("googleReviews.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={r.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={r.description} onChange={(v) => set({ description: v })} />
        <ArrayEditor
          items={r.reviews}
          onChange={(items) => set({ reviews: items })}
          itemLabel="Review"
          newItem={() => ({ text: "", author: "", ratingImage: "", ratingImageAlt: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Author</Label>
                <Input value={item.author} onChange={(e) => upd({ ...item, author: e.target.value })} />
              </div>
              <RichTextField label="Review Text" value={item.text} onChange={(v) => upd({ ...item, text: v })} />
              <ImageField
                label="Rating Image"
                value={item.ratingImage}
                onChange={(url) => upd({ ...item, ratingImage: url })}
                altValue={item.ratingImageAlt || ""}
                onAltChange={(ratingImageAlt) => upd({ ...item, ratingImageAlt })}
                onSelectAsset={(asset) => upd({
                  ...item,
                  ratingImage: asset.url,
                  ratingImageAlt: asset.suggestedAltText || item.ratingImageAlt || "",
                })}
                folder="logos"
              />
              <div>
                <Label>Rating Image Alt Text</Label>
                <Input value={item.ratingImageAlt || ""} onChange={(e) => upd({ ...item, ratingImageAlt: e.target.value })} placeholder="e.g. 5 star rating" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function BlogPreviewSectionEditor({ content, update }: SectionProps) {
  const blog = { ...defaultHomeContent.blogPreview, ...(content.blogPreview ?? {}) };
  const set = (patch: Partial<typeof blog>) => update("blogPreview", { ...blog, ...patch });

  return (
    <Section title="Blog Preview Section" defaultOpen={false}>
      <div className="grid gap-4">
        <RichTextField
          label="Heading"
          value={blog.headingHtml}
          onChange={(html) => set({ headingHtml: html })}
          placeholder="News and Updates From Our Blogs — use Bold for emphasis"
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>"View All" Button Text</Label>
            <Input value={blog.viewAllText} onChange={(e) => set({ viewAllText: e.target.value })} placeholder="VIEW ALL BLOG POSTS" />
          </div>
          <div>
            <Label>"View All" Button URL</Label>
            <Input value={blog.viewAllUrl} onChange={(e) => set({ viewAllUrl: e.target.value })} placeholder="/blog" />
          </div>
        </div>
        <div>
          <Label>Number of posts to show</Label>
          <Input
            type="number"
            min="1"
            max="6"
            value={blog.postCount}
            onChange={(e) => set({ postCount: parseInt(e.target.value) || 3 })}
          />
        </div>
        <p className="text-xs text-gray-500 italic">Posts are loaded automatically from the latest published blog posts.</p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function FaqSectionEditor({ content, update }: SectionProps) {
  const faq = { ...defaultHomeContent.faq, ...(content.faq ?? {}) };
  const set = (patch: Partial<typeof faq>) => update("faq", { ...faq, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="FAQ Section" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={faq.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("faq.heading")}
          onTagChange={(t) => ht.set("faq.heading", t)}
        />
        <RichTextField label="Description" value={faq.description} onChange={(v) => set({ description: v })} />
        <ImageField
          label="Video Thumbnail"
          value={faq.videoThumbnail}
          onChange={(url) => set({ videoThumbnail: url })}
          altValue={faq.videoThumbnailAlt || ""}
          onAltChange={(videoThumbnailAlt) => set({ videoThumbnailAlt })}
          onSelectAsset={(asset) => set({
            videoThumbnail: asset.url,
            videoThumbnailAlt: asset.suggestedAltText || faq.videoThumbnailAlt || "",
          })}
          folder="backgrounds"
        />
        <div>
          <Label>Video Thumbnail Alt Text</Label>
          <Input value={faq.videoThumbnailAlt || ""} onChange={(e) => set({ videoThumbnailAlt: e.target.value })} placeholder="Describe the thumbnail image" />
        </div>
        <div>
          <Label>Video URL</Label>
          <Input value={faq.videoUrl} onChange={(e) => set({ videoUrl: e.target.value })} />
        </div>
        <ArrayEditor
          items={faq.items}
          onChange={(items) => set({ items })}
          itemLabel="FAQ"
          newItem={() => ({ question: "", answer: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Question</Label>
                <Input value={item.question} onChange={(e) => upd({ ...item, question: e.target.value })} />
              </div>
              <RichTextField label="Answer" value={item.answer} onChange={(v) => upd({ ...item, answer: v })} />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ContactSectionEditor({ content, update }: SectionProps) {
  const c = { ...defaultHomeContent.contact, ...(content.contact ?? {}) };
  const set = (patch: Partial<typeof c>) => update("contact", { ...c, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Contact Section" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={c.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("contact.sectionLabel")}
          onTagChange={(t) => ht.set("contact.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={c.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={c.description} onChange={(v) => set({ description: v })} />
        <ImageField
          label="Section Image"
          value={c.image}
          onChange={(url) => set({ image: url })}
          altValue={c.imageAlt}
          onAltChange={(imageAlt) => set({ imageAlt })}
          onSelectAsset={(asset) => set({
            image: asset.url,
            imageAlt: asset.suggestedAltText || c.imageAlt,
          })}
          folder="team"
        />
        <div>
          <Label>Image Alt Text</Label>
          <Input value={c.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} placeholder="Describe the image" />
        </div>
        <ImageField
          label="Background Image"
          value={c.backgroundImage || ""}
          onChange={(url) => set({ backgroundImage: url })}
          altValue={c.backgroundImageAlt || ""}
          onAltChange={(backgroundImageAlt) => set({ backgroundImageAlt })}
          onSelectAsset={(asset) => set({
            backgroundImage: asset.url,
            backgroundImageAlt: asset.suggestedAltText || c.backgroundImageAlt || "",
          })}
          folder="backgrounds"
        />
        <div>
          <Label>Background Image Alt Text</Label>
          <Input value={c.backgroundImageAlt || ""} onChange={(e) => set({ backgroundImageAlt: e.target.value })} placeholder="Describe the background image" />
        </div>
        <p className="text-xs text-gray-500 italic">Phone and address are managed in Site Settings &gt; Contact Info</p>
        <div>
          <Label>Form Heading</Label>
          <Input value={c.formHeading} onChange={(e) => set({ formHeading: e.target.value })} />
        </div>
        <div>
          <Label>Availability Text</Label>
          <Input value={c.availabilityText || ""} onChange={(e) => set({ availabilityText: e.target.value })} placeholder="Our intake team is available 24 hours a day, seven days a week" />
        </div>
      </div>
    </Section>
  );
}
