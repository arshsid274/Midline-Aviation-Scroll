"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

type NavLink = {
  label: string;
  href: string;
};

declare global {
  interface Window {
    __midlineSequenceComplete?: boolean;
  }
}

const PRIMARY_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS: NavLink[] = [
  { label: "Aircraft Charter", href: "/services/aircraft-charter" },
  { label: "Aircraft Management", href: "/services/aircraft-management" },
  { label: "Aircraft Sales", href: "/services/aircraft-sales" },
  { label: "Cargo Transportation", href: "/services/cargo-transportation" },
  { label: "MRO", href: "/services/mro" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [hasHomeSequenceCompleted, setHasHomeSequenceCompleted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.__midlineSequenceComplete);
  });

  useEffect(() => {
    if (pathname !== "/") return;

    const onSequenceComplete = () => setHasHomeSequenceCompleted(true);
    window.addEventListener("midline:sequence-complete", onSequenceComplete);
    return () => window.removeEventListener("midline:sequence-complete", onSequenceComplete);
  }, [pathname]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const isServicesActive = pathname.startsWith("/services");
  const isSequenceComplete = pathname !== "/" || hasHomeSequenceCompleted;

  const closeMenus = () => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const getLinkClassName = (isActive: boolean) =>
    clsx(
      "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors",
      isActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
    );

  return (
    <motion.header
      initial={false}
      animate={isSequenceComplete ? "visible" : "hidden"}
      variants={{
        hidden: { y: -120, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5",
        isSequenceComplete ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!isSequenceComplete}
    >
      <nav
        ref={navRef}
        aria-label="Primary"
        className="mx-auto w-full max-w-7xl rounded-2xl border border-white/20 bg-transparent px-3 py-2 sm:px-4"
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMenus}
            className="rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-white/85"
            aria-label="Go to Midline Airlines home page"
          >
            Midline Airlines
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {PRIMARY_LINKS.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  className={getLinkClassName(pathname === link.href)}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="relative">
              <button
                type="button"
                onClick={() => setIsServicesOpen((state) => !state)}
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                aria-controls="desktop-services-menu"
                className={getLinkClassName(isServicesActive)}
              >
                <span className="flex items-center gap-1">
                  Services
                  <ChevronDown
                    className={clsx(
                      "h-4 w-4 transition-transform",
                      isServicesOpen ? "rotate-180" : "rotate-0"
                    )}
                    aria-hidden="true"
                  />
                </span>
              </button>

              {isServicesOpen ? (
                <ul
                  id="desktop-services-menu"
                  role="menu"
                  aria-label="Services"
                  className="absolute right-0 mt-3 min-w-64 rounded-xl border border-white/15 bg-[#071432]/95 p-2 shadow-2xl backdrop-blur-xl"
                >
                  {SERVICE_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        role="menuitem"
                        href={link.href}
                        onClick={closeMenus}
                        className={clsx(
                          "block rounded-lg px-3 py-2 text-sm transition-colors",
                          pathname === link.href
                            ? "bg-white/15 text-white"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        )}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>

            {PRIMARY_LINKS.slice(2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  className={getLinkClassName(pathname === link.href)}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((state) => !state)}
            className="rounded-lg border border-white/20 p-2 text-white md:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div
            id="mobile-navigation-menu"
            className="mt-3 rounded-xl border border-white/15 bg-[#081835]/90 p-2 md:hidden"
          >
            <Link
              href="/"
              onClick={closeMenus}
              className={clsx(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === "/"
                  ? "bg-white/15 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
            >
              Home
            </Link>

            <Link
              href="/fleet"
              onClick={closeMenus}
              className={clsx(
                "mt-1 block rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === "/fleet"
                  ? "bg-white/15 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
            >
              Our Fleet
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileServicesOpen((state) => !state)}
              className={clsx(
                "mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                isServicesActive
                  ? "bg-white/15 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
              aria-expanded={isMobileServicesOpen}
              aria-controls="mobile-services-menu"
            >
              Services
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform",
                  isMobileServicesOpen ? "rotate-180" : "rotate-0"
                )}
                aria-hidden="true"
              />
            </button>

            {isMobileServicesOpen ? (
              <div id="mobile-services-menu" className="mt-1 space-y-1 rounded-lg bg-white/5 p-1">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className={clsx(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === link.href
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              href="/about"
              onClick={closeMenus}
              className={clsx(
                "mt-1 block rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === "/about"
                  ? "bg-white/15 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className={clsx(
                "mt-1 block rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === "/contact"
                  ? "bg-white/15 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
            >
              Contact
            </Link>
          </div>
        ) : null}
      </nav>
    </motion.header>
  );
};
