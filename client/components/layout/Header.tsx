import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";
import NavDropdown from "./NavDropdown";

export default function Header() {
  const { settings } = useSiteSettings();

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt =
    settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";

  const ctaText = settings.headerCtaText?.trim() || "";
  const ctaUrl = settings.headerCtaUrl?.trim() || "/contact";
  const ctaBgColor = settings.headerCtaBgColor?.trim() || "#ee530e";
  const ctaTextColor = settings.headerCtaTextColor?.trim() || "#ffffff";
  const ctaBorderColor = settings.headerCtaBorderColor?.trim() || "";

  const phoneNumber = settings.phoneNumber?.trim() || "";
  const phoneDisplay = settings.phoneDisplay?.trim() || "";
  const headerPhoneLabel = settings.headerPhoneLabel?.trim() || "";
  const headerPhoneIconUrl = settings.headerPhoneIconUrl?.trim() || "";

  const navItems = [...(settings.navigationItems ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="px-[32px] py-[16px] w-full">
        <div className="flex items-center justify-between gap-[32px]">
          {/* Logo */}
          <div>
            <Link to="/">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className="h-[48px] w-auto max-w-full object-contain"
                />
              ) : (
                <span className="font-outfit text-white text-[24px] leading-none">
                  {settings.siteName || " "}
                </span>
              )}
            </Link>
          </div>

          {/* Center: Phone section + Navigation */}
          <div className="hidden lg:flex flex-col flex-1 gap-[8px] items-center justify-center">
            {/* Phone section - Desktop - HORIZONTAL CENTERED */}
            {(headerPhoneLabel || phoneNumber) && (
              <div className="flex items-center gap-[12px] text-white justify-center">
                {headerPhoneLabel && (
                  <p className="font-outfit text-[18px] font-light text-white">{headerPhoneLabel}</p>
                )}
                {phoneNumber && phoneDisplay && (
                  <a
                    href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                    className="font-outfit text-[24px] font-light text-white hover:opacity-80 transition-opacity"
                  >
                    {phoneDisplay}
                  </a>
                )}
                {headerPhoneIconUrl && (
                  <img
                    src={headerPhoneIconUrl}
                    alt="Phone"
                    className="h-[32px] w-auto"
                  />
                )}
              </div>
            )}

            {/* Navigation - CENTERED BELOW */}
            <nav className="flex items-center justify-center gap-[24px]">
              <ul className="flex gap-[24px]">
                {navItems.map((item) => {
                  const hasChildren =
                    item.children && item.children.length > 0;

                  return (
                    <li key={item.href} className="flex items-center">
                      {hasChildren ? (
                        <NavDropdown item={item} />
                      ) : (
                        <Link
                          to={item.href}
                          target={
                            item.openInNewTab ? "_blank" : undefined
                          }
                          rel={
                            item.openInNewTab
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="font-outfit text-[18px] text-white font-light hover:opacity-80 transition-opacity"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* CTA Button - Desktop */}
          {ctaText && (
            <Link
              to={ctaUrl}
              style={{
                backgroundColor: ctaBgColor,
                color: ctaTextColor,
                border: ctaBorderColor ? `2px solid ${ctaBorderColor}` : "none",
              }}
              className="hidden lg:inline-block font-outfit font-semibold text-[18px] px-[32px] py-[16px] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {ctaText}
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-none">
              <nav className="flex flex-col gap-4 mt-8">
                {headerPhoneLabel && phoneNumber && (
                  <div className="flex flex-col gap-1 pb-4 border-b border-white/20">
                    <p className="font-outfit text-[14px] text-white">
                      {headerPhoneLabel}
                    </p>
                    <a
                      href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                      className="font-outfit text-[20px] font-light text-white hover:opacity-80"
                    >
                      {phoneDisplay}
                    </a>
                  </div>
                )}
                {navItems.map((item) => {
                  const hasChildren =
                    item.children && item.children.length > 0;

                  return (
                    <MobileNavItem
                      key={item.href}
                      item={item}
                      hasChildren={hasChildren}
                    />
                  );
                })}
                {ctaText && (
                  <Link
                    to={ctaUrl}
                    className="inline-block bg-[#ee530e] text-white font-outfit font-semibold text-[18px] px-[32px] py-[16px] hover:opacity-90 transition-opacity text-center w-full mt-4"
                  >
                    {ctaText}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ── Mobile nav item with collapsible children ── */

interface MobileNavItemProps {
  item: {
    label: string;
    href: string;
    openInNewTab?: boolean;
    children?: MobileNavItemProps["item"][];
  };
  hasChildren?: boolean;
}

function MobileNavItem({
  item,
  hasChildren,
}: MobileNavItemProps) {
  const [expanded, setExpanded] = useState(false);

  if (!hasChildren) {
    return (
      <Link
        to={item.href}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className="font-outfit text-[18px] text-white py-[10px] border-b border-white/20 hover:opacity-80 transition-opacity block"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center border-b border-white/20">
        <Link
          to={item.href}
          className="font-outfit text-[18px] text-white py-[10px] hover:opacity-80 transition-opacity flex-1"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-white/70 hover:text-white p-2 mr-2 transition-colors"
          aria-label={expanded ? "Collapse submenu" : "Expand submenu"}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div className={`pl-4 py-1 ${expanded ? "block" : "hidden"}`}>
        {item.children!.map((child, idx) => (
          <div key={idx}>
            <Link
              to={child.href}
              target={child.openInNewTab ? "_blank" : undefined}
              rel={child.openInNewTab ? "noopener noreferrer" : undefined}
              className="block font-outfit text-[16px] text-white/80 py-[8px] hover:text-white transition-colors"
            >
              {child.label}
            </Link>
            {child.children && child.children.length > 0 && (
              <div className="pl-4 pb-1">
                {child.children.map((grandchild, grandchildIdx) => (
                  <Link
                    key={grandchildIdx}
                    to={grandchild.href}
                    target={grandchild.openInNewTab ? "_blank" : undefined}
                    rel={grandchild.openInNewTab ? "noopener noreferrer" : undefined}
                    className="block font-outfit text-[15px] text-white/60 py-[6px] hover:text-white transition-colors"
                  >
                    {grandchild.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
