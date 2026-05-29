import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import {
  DEFAULT_BLOG_SIDEBAR,
  loadBlogSidebarData,
  type BlogSidebarAwardImage,
} from "@site/lib/cms/publicLoaders";
import { getPreloadedBlogSidebar } from "@site/lib/preloadState";

let cachedSidebar = DEFAULT_BLOG_SIDEBAR;
let hasCachedSidebar = false;

export default function BlogSidebar() {
  const { pathname } = useLocation();
  const { phoneDisplay, phoneNumber } = useGlobalPhone();
  const preloadedSidebar = getPreloadedBlogSidebar(pathname);
  const initialSidebar = preloadedSidebar || (hasCachedSidebar ? cachedSidebar : DEFAULT_BLOG_SIDEBAR);

  if (preloadedSidebar && !hasCachedSidebar) {
    cachedSidebar = preloadedSidebar;
    hasCachedSidebar = true;
  }

  const [attorneyImage, setAttorneyImage] = useState(initialSidebar.attorneyImage);
  const [awardImages, setAwardImages] = useState<BlogSidebarAwardImage[]>(initialSidebar.awardImages);

  useEffect(() => {
    let isMounted = true;

    async function fetchSidebarSettings() {
      if (hasCachedSidebar) {
        if (isMounted) {
          setAttorneyImage(cachedSidebar.attorneyImage);
          setAwardImages(cachedSidebar.awardImages);
        }
        return;
      }

      try {
        const sidebar = await loadBlogSidebarData();
        cachedSidebar = sidebar;
        hasCachedSidebar = true;

        if (isMounted) {
          setAttorneyImage(sidebar.attorneyImage);
          setAwardImages(sidebar.awardImages);
        }
      } catch (err) {
        console.error("Error fetching sidebar settings:", err);
      }
    }

    fetchSidebarSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const telHref = phoneNumber ? `tel:${phoneNumber.replace(/\D/g, "")}` : "#";

  return (
    <aside className="space-y-4">
      {attorneyImage && (
        <div className="overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={attorneyImage}
            alt="Attorney"
            className="w-full h-auto object-cover"
            width={400}
            height={500}
          />
        </div>
      )}

      {/* Phone button */}
      <a
        href={telHref}
        className="inline-flex items-center justify-between gap-[10px] no-underline transition-opacity hover:opacity-85 w-full"
        style={{
          backgroundColor: "rgb(238, 83, 14)",
          border: "1px solid rgb(238, 83, 14)",
          color: "rgb(255, 255, 255)",
          fontSize: "clamp(14px, 2vw, 22px)",
          lineHeight: 1.5,
          padding: "12px 20px",
          fontFamily: "Outfit, Helvetica, Arial, sans-serif",
        }}
      >
        {phoneDisplay || "Call Now"}
        <ArrowRight width={18} height={18} aria-hidden="true" style={{ flexShrink: 0 }} />
      </a>

      {/* Schedule button */}
      <Link
        to="/contact/"
        className="inline-flex items-center justify-between gap-[10px] no-underline transition-opacity hover:opacity-85 w-full"
        style={{
          backgroundColor: "rgb(238, 83, 14)",
          border: "1px solid rgb(238, 83, 14)",
          color: "rgb(255, 255, 255)",
          fontSize: "clamp(14px, 2vw, 22px)",
          lineHeight: 1.5,
          padding: "12px 20px",
          fontFamily: "Outfit, Helvetica, Arial, sans-serif",
        }}
      >
        SCHEDULE A CONSULTATION
        <ArrowRight width={18} height={18} aria-hidden="true" style={{ flexShrink: 0 }} />
      </Link>

      {awardImages.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3
            className="text-lg font-semibold text-gray-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Awards & Recognition
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {awardImages.map((award, index) => (
              <div
                key={award.src || index}
                className="bg-white border border-gray-100 p-3 flex items-center justify-center"
              >
                <img
                  src={award.src}
                  alt={award.alt}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
