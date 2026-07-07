import Link from "next/link";
import Reveal from "./Reveal";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "building-resilient-cloud-infrastructure",
    title: "Building Resilient Cloud Infrastructure",
    excerpt: "Lessons from architecting fault-tolerant systems on AWS — from auto-scaling to disaster recovery planning.",
    date: "2026-06-15",
    readTime: "8 min read",
    tags: ["AWS", "Infrastructure"],
  },
  {
    slug: "why-community-matters-in-tech",
    title: "Why Community Matters in Tech",
    excerpt: "How running cloud workshops and mentoring aspiring engineers changed the way I approach software.",
    date: "2026-05-22",
    readTime: "5 min read",
    tags: ["Community", "Mentorship"],
  },
  {
    slug: "consistency-over-intensity",
    title: "Consistency Over Intensity",
    excerpt: "What bodybuilding taught me about engineering — progressive overload, tracking metrics, and showing up every day.",
    date: "2026-04-10",
    readTime: "6 min read",
    tags: ["Mindset", "Discipline"],
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> cat blog/latest
            </p>
            <h2 className="text-pixel-header">Blog</h2>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <article className="py-4 md:py-6 border-b border-[var(--color-border)] group">
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
                  <h3 className="text-lg md:text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h3>
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
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mt-6 text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors group"
          >
            View all posts
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
