import Link from "next/link";
import Reveal from "./Reveal";
import { Calendar, Clock, ExternalLink } from "lucide-react";

const featuredArticle = {
  title: "I Couldn't Articulate Clearly, So I Built This",
  excerpt:
    "When words failed me, I turned to building. Here's how the struggle to communicate led to creating something meaningful.",
  date: "2026-07-10",
  readTime: "6 min read",
  tags: ["Building", "Communication"],
  url: "https://builder.aws.com/content/3D741qzraId1EC9xYFet80pZPGk/i-couldnt-articulate-clearly-so-i-built-this",
};

export default function BlogSection() {
  return (
    <section id="articles" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> cat
              articles/latest
            </p>
            <h2 className="text-pixel-header">Articles</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[520px] mb-6">
            I write about building things, learning in public, and the
            intersections between tech and life.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={featuredArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-[var(--color-border-strong)] bg-[var(--color-accent)]/[0.02] p-5 md:p-7 group hover:bg-[var(--color-accent)]/[0.05] transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[12px] font-[family-name:var(--font-mono)] text-[var(--color-accent)] font-semibold tracking-wider uppercase">
                Featured Article
              </span>
              <ExternalLink
                size={11}
                className="text-[var(--color-accent)] opacity-60"
              />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mb-3">
              {featuredArticle.title}
            </h3>

            <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[650px] mb-4">
              {featuredArticle.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[12px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {featuredArticle.date}
              </span>
              <span className="text-[var(--color-border-strong)]">/</span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {featuredArticle.readTime}
              </span>
              <span className="text-[var(--color-border-strong)]">/</span>
              {featuredArticle.tags.map((tag) => (
                <span key={tag} className="text-[var(--color-accent)]">
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
