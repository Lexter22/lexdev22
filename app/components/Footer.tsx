import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerLinks = [
  { label: "About me", href: "#about" },
  { label: "Selected work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8 sm:py-10 md:py-14">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-10 md:mb-12">
          <div className="space-y-3 sm:space-y-4">
            <img
              src="/profile.png"
              alt="Lex"
              width={80}
              height={80}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-sm border border-[var(--color-border)]"
              loading="lazy"
            />
            <p className="text-sm sm:text-base leading-relaxed text-[var(--color-muted)] max-w-[260px]">
              Development, data, and community. Built with curiosity. Based in
              Biñan, Laguna · Philippines.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs sm:text-sm text-[var(--color-muted-light)] font-[family-name:var(--font-mono)]">
              © {new Date().getFullYear()} Lex. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-[var(--color-muted-light)] font-[family-name:var(--font-mono)]">
              Personal portfolio · Development &amp; QA roles identified per
              project.
            </p>
          </div>
          <div className="flex flex-col items-end sm:items-center gap-1">
            <Link
              href="#top"
              className="text-xs sm:text-sm text-[var(--color-muted-light)] font-[family-name:var(--font-mono)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
            >
              Back to top <ArrowRight size={12} className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
