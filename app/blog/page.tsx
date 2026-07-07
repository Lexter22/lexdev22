import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const posts = [
  {
    slug: "building-resilient-cloud-infrastructure",
    title: "Building Resilient Cloud Infrastructure",
    excerpt: "Lessons from architecting fault-tolerant systems on AWS — from auto-scaling to disaster recovery planning.",
    date: "2026-06-15",
    readTime: "8 min read",
    tags: ["AWS", "Infrastructure"],
    featured: true,
  },
  {
    slug: "why-community-matters-in-tech",
    title: "Why Community Matters in Tech",
    excerpt: "How running cloud workshops and mentoring aspiring engineers changed the way I approach software.",
    date: "2026-05-22",
    readTime: "5 min read",
    tags: ["Community", "Mentorship"],
    featured: false,
  },
  {
    slug: "consistency-over-intensity",
    title: "Consistency Over Intensity",
    excerpt: "What bodybuilding taught me about engineering — progressive overload, tracking metrics, and showing up every day.",
    date: "2026-04-10",
    readTime: "6 min read",
    tags: ["Mindset", "Discipline"],
    featured: false,
  },
];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen" style={{ paddingTop: "64px" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,700px)] h-auto opacity-[0.015]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="var(--green)"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M20 20 L100 20 L70 80 L130 80 L100 140 L30 140 L60 80 L0 80 Z" />
        </svg>
      </div>

      <div className="container-site py-8 md:py-14 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          cd ..
        </Link>

        <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
          <span className="text-[var(--color-accent)]">$</span> ls blog/
        </p>
        <h1 className="text-pixel-header mb-3">Blog</h1>
        <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[600px] mb-10">
          Thoughts on cloud infrastructure, community building, and the discipline behind both.
        </p>

        {featured && (
          <article className="border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.02] p-5 md:p-7 mb-8 group">
            <span className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--color-accent)] font-semibold tracking-wider uppercase mb-3 block">
              Latest Post
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[11px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  {featured.date}
                </span>
                <span className="text-[var(--color-border-strong)]">/</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={11} />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[650px]">
                {featured.excerpt}
              </p>
              <div className="flex gap-2 mt-1">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--color-accent)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        )}

        <div className="border-t border-[var(--color-border)]">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="py-5 md:py-7 border-b border-[var(--color-border)] group"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 text-[11px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    {post.date}
                  </span>
                  <span className="text-[var(--color-border-strong)]">/</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[650px]">
                  {post.excerpt}
                </p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
