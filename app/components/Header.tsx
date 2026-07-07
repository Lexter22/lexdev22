"use client";

import { useEffect, useState } from "react";
import { Menu, X, Moon } from "lucide-react";
import { useDarkPassenger } from "./DarkPassengerProvider";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#beyond-coding", label: "Beyond Coding" },
  { href: "#certifications", label: "Certifications" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { active: darkPassenger, toggle: toggleDarkPassenger } = useDarkPassenger();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex items-center justify-between h-14 md:h-[56px]">
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="LexDev22 home">
          <span className="flex items-center justify-center w-8 h-8 overflow-hidden border border-[var(--color-border-strong)]">
            <img
              src="/profile.png"
              alt="LexDev22"
              className="w-full h-full object-cover"
              style={{ filter: "none" }}
            />
          </span>
        </a>

        <nav
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-[var(--bg)]/98 transition-opacity duration-300 md:static md:flex-row md:bg-transparent md:gap-1 md:opacity-100 md:pointer-events-auto ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
          }`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`relative px-6 py-3 text-sm transition-colors duration-200 md:px-3 md:py-2 md:text-[11px] font-[family-name:var(--font-mono)] group ${
                active === link.href.slice(1)
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              }`}
            >
              <span
                className={`text-[var(--color-accent)] mr-1 transition-opacity duration-200 ${
                  active === link.href.slice(1)
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                &gt;
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 z-50">
          <button
            onClick={toggleDarkPassenger}
            className="flex items-center justify-center w-8 h-8 transition-colors duration-200 cursor-pointer"
            aria-label={darkPassenger ? "Disable dark passenger" : "Enable dark passenger"}
            title={darkPassenger ? "Dark Passenger active" : "Toggle Dark Passenger"}
          >
            <Moon
              size={14}
              className={
                darkPassenger
                  ? "text-[var(--color-accent-red)]"
                  : "text-[var(--color-muted)] hover:text-[var(--green)]"
              }
            />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-8 h-8 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-200 md:hidden cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
