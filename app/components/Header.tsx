"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#beyond-coding", label: "Beyond Coding" },
  { href: "#articles", label: "Articles" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const mobileNavRef = useRef<HTMLElement>(null);
  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const restoreMenuFocusRef = useRef(true);

  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 20);
    });
  }, [scrollY]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const nav = mobileNavRef.current;
    const pageMain = document.querySelector<HTMLElement>("main");
    const pageFooter = document.querySelector<HTMLElement>("footer");
    const homeLink = homeLinkRef.current;
    const menuButton = menuButtonRef.current;
    const firstLink = nav?.querySelector<HTMLAnchorElement>("a[href]");

    if (pageMain) pageMain.inert = true;
    if (pageFooter) pageFooter.inert = true;
    if (homeLink) homeLink.inert = true;

    const focusFrame = window.requestAnimationFrame(() => firstLink?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreMenuFocusRef.current = true;
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !nav) return;

      const focusable: HTMLElement[] = [
        ...nav.querySelectorAll<HTMLAnchorElement>("a[href]"),
        menuButton,
      ].filter(
        (element): element is HTMLButtonElement | HTMLAnchorElement =>
          element !== null,
      );

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (pageMain) pageMain.inert = false;
      if (pageFooter) pageFooter.inert = false;
      if (homeLink) homeLink.inert = false;

      if (restoreMenuFocusRef.current) {
        menuButton?.focus();
      }
      restoreMenuFocusRef.current = true;
    };
  }, [open]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setActive(e.target.id); break; }
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px -40% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const closeMenu = (restoreFocus = true) => {
    restoreMenuFocusRef.current = restoreFocus;
    setOpen(false);
  };

  const navLinkClass = (href: string) =>
    `relative px-6 py-3 text-sm transition-colors duration-200 md:px-3 md:py-2 md:text-[12px] font-[family-name:var(--font-mono)] group ${
      active === href.slice(1)
        ? "text-[var(--color-accent)]"
        : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
    }`;

  const navLinkLabel = (href: string, label: string) => (
    <>
      <span
        aria-hidden="true"
        className={`text-[var(--color-accent)] mr-1 transition-opacity duration-200 ${
          active === href.slice(1)
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        &gt;
      </span>
      {label}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-property: color, background-color, border-color, opacity, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 0.3s ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex items-center justify-between h-14 md:h-[56px]">
        <a
          ref={homeLinkRef}
          href="#top"
          className="flex min-w-11 h-11 items-center gap-2.5 group"
          aria-label="John Lexter B. Reyes home"
        >
          <span className="text-[12px] font-[family-name:var(--font-mono)] font-semibold tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-accent)]">
            Lex
          </span>
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          <nav
            className="hidden md:flex md:items-center md:gap-1"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
                aria-current={active === link.href.slice(1) ? "location" : undefined}
              >
                {navLinkLabel(link.href, link.label)}
              </a>
            ))}
          </nav>

        {open && (
          <nav
            ref={mobileNavRef}
            id="mobile-navigation"
            className="fixed top-0 left-0 right-0 z-40 flex flex-col items-center gap-1 bg-[var(--bg)]/98 md:hidden pt-20 sm:pt-24 pb-8 px-6 sm:px-8"
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => closeMenu(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm transition-all duration-200 font-[family-name:var(--font-mono)] group rounded-lg ${
                  active === link.href.slice(1)
                    ? "bg-[var(--color-surface-alt)] text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-alt)]/50"
                }`}
                aria-current={active === link.href.slice(1) ? "location" : undefined}
              >
                <span className="text-[var(--color-accent)] mr-1 group-hover:opacity-100 opacity-0 transition-opacity">
                  &gt;
                </span>
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2 z-50">
          <button
            ref={menuButtonRef}
            onClick={() => {
              if (open) closeMenu();
              else {
                restoreMenuFocusRef.current = true;
                setOpen(true);
              }
            }}
            className="flex items-center justify-center w-11 h-11 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-200 md:hidden cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        </div>
      </div>
    </header>
  );
}
