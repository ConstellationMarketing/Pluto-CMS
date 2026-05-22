import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPreviewContent } from "@site/lib/cms/homePageTypes";
import { fetchRestRows } from "@site/lib/cms/publicFetch";

interface PostRow {
  slug: string;
  title: string | null;
  excerpt: string | null;
  featured_image: string | null;
}

const FALLBACK_IMAGES = [
  "https://design-pluto.netlify.app/images/blog-1.jpg",
  "https://design-pluto.netlify.app/images/blog-2.jpg",
  "https://design-pluto.netlify.app/images/blog-3.jpg",
];

interface Props {
  content: BlogPreviewContent;
}

export default function HomeBlogSection({ content }: Props) {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const count = content.postCount || 3;

  useEffect(() => {
    fetchRestRows<PostRow>(
      `posts?select=slug,title,excerpt,featured_image&status=eq.published&order=published_at.desc&limit=${count}`
    )
      .then((rows) => setPosts(rows))
      .catch(() => setPosts([]));
  }, [count]);

  // Use fetched posts or fall back to placeholder cards
  const cards = posts.length > 0
    ? posts.map((p, i) => ({
        href: `/blog/${p.slug}`,
        image: (p.featured_image && !p.featured_image.includes("placeholder")) ? p.featured_image : FALLBACK_IMAGES[i % 3],
        text: p.excerpt || p.title || "Read more",
      }))
    : FALLBACK_IMAGES.slice(0, count).map((img, i) => ({
        href: "/blog",
        image: img,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }));

  return (
    <section
      style={{
        backgroundColor: "rgb(236, 236, 236)",
        paddingBottom: "56px",
        paddingTop: "56px",
        position: "relative",
        fontFamily: "Outfit, Helvetica, Arial, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
      }}
    >
      {/* ── Heading ── */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          paddingBottom: "28px",
          paddingTop: "28px",
          width: "80%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "59.136px",
              fontWeight: 300,
              lineHeight: "59.136px",
              overflowWrap: "anywhere",
              paddingBottom: "10px",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {content.headingLight || "News and"}{" "}
            <strong style={{ display: "inline", fontWeight: 700 }}>
              {content.headingBold || "Updates From Our Blogs"}
            </strong>
          </h2>
        </div>
      </div>

      {/* ── Blog cards ── */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "2560px",
          paddingBottom: "28px",
          paddingTop: "28px",
          width: "90%",
        }}
      >
        <div style={{ display: "flex", gap: "3%" }}>
          {cards.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                cursor: "pointer",
                display: "block",
                overflowWrap: "anywhere",
                paddingTop: "300px",
                position: "relative",
                textDecoration: "none",
                width: "31.3333%",
                wordBreak: "break-word",
              }}
            >
              {/* White text box with teal right border */}
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRight: "8px solid rgb(29, 129, 128)",
                  cursor: "pointer",
                  overflowWrap: "anywhere",
                  paddingBottom: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "20px",
                  transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: "80%",
                  wordBreak: "break-word",
                }}
              >
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "22px",
                    lineHeight: "33px",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  {card.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── VIEW ALL button ── */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1080px",
          paddingBottom: "28px",
          paddingTop: "28px",
          width: "80%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Link
            to={content.viewAllUrl || "/blog"}
            style={{
              alignItems: "center",
              backgroundColor: "rgb(238, 83, 14)",
              border: "1px solid rgb(238, 83, 14)",
              color: "rgb(255, 255, 255)",
              cursor: "pointer",
              display: "inline-flex",
              fontSize: "24px",
              gap: "12px",
              lineHeight: "40.8px",
              paddingBottom: "15px",
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingTop: "15px",
              textDecoration: "none",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {content.viewAllText || "VIEW ALL BLOG POSTS"}
            <ArrowRight width={20} height={20} aria-hidden="true" style={{ color: "rgb(255,255,255)", flexShrink: 0 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
