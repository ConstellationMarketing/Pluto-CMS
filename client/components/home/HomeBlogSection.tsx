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
      }}
    >
      {/* Heading */}
      <div className="mx-auto w-[90%] md:w-[80%] max-w-[2560px] py-[28px] text-center">
        <h2
          style={{
            fontSize: "clamp(26px, 5vw, 59.136px)",
            fontWeight: 300,
            lineHeight: 1.05,
            overflowWrap: "anywhere",
            paddingBottom: "10px",
            wordBreak: "break-word",
          }}
        >
          {content.headingLight || "News and"}{" "}
          <strong style={{ fontWeight: 700 }}>
            {content.headingBold || "Updates From Our Blogs"}
          </strong>
        </h2>
      </div>

      {/* Blog cards */}
      <div className="mx-auto w-[95%] md:w-[90%] max-w-[2560px] py-[28px]">
        <div className="flex flex-col sm:flex-row gap-[24px] sm:gap-[3%]">
          {cards.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              className="w-full sm:w-[31.3333%] block no-underline"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                paddingTop: "clamp(180px, 28vw, 300px)",
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRight: "8px solid rgb(29, 129, 128)",
                  padding: "16px 20px",
                  width: "85%",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(14px, 1.8vw, 22px)",
                    lineHeight: 1.5,
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    color: "rgb(0, 0, 0)",
                    margin: 0,
                  }}
                >
                  {card.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* VIEW ALL */}
      <div className="mx-auto w-[90%] md:w-[80%] max-w-[1080px] py-[28px] text-center">
        <Link
          to={content.viewAllUrl || "/blog"}
          className="inline-flex items-center gap-[10px] no-underline transition-opacity hover:opacity-85"
          style={{
            backgroundColor: "rgb(238, 83, 14)",
            border: "1px solid rgb(238, 83, 14)",
            color: "rgb(255, 255, 255)",
            fontSize: "clamp(14px, 2vw, 24px)",
            lineHeight: 1.5,
            padding: "12px 24px",
          }}
        >
          {content.viewAllText || "VIEW ALL BLOG POSTS"}
          <ArrowRight width={18} height={18} aria-hidden="true" style={{ flexShrink: 0 }} />
        </Link>
      </div>
    </section>
  );
}
