"use client";

import Reveal from "./Reveal";
import { ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-8 sm:py-10 md:py-14">
      <div className="container-site">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="max-w-[600px]">
              <h2 className="text-pixel-header text-wrap balance">
                Let's build something
              </h2>
              <p className="mt-4 sm:mt-6 text-[var(--color-muted)] text-sm sm:text-base leading-relaxed">
                Open to open-source contributions and side projects. If you're
                shipping something, I'd love to hear about it.
              </p>

              <div className="mt-8 sm:mt-10 md:mt-12">
                <a
                  href="https://linkedin.com/in/johnlexterreyes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-5 sm:py-6 border border-[var(--color-accent)] bg-[var(--color-accent)] text-[#000] text-[13px] sm:text-sm font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.97] transition-colors"
                >
                  Connect with me
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src="/workshop1.jpg"
                alt="Lex working"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-sm border border-[var(--color-border)] opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
