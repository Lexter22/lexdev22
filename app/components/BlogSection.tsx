import { ArrowUpRight } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

const articles = [
  {
    title: "I Couldn't Articulate Clearly, So I Built This",
    excerpt:
      "When words failed me, I turned to building. Here's how the struggle to communicate led to creating something meaningful.",
    date: "Jul 10, 2026",
    readTime: "6 min read",
    source: "AWS Builder Center",
    tags: ["Building", "Communication"],
    url: "https://builder.aws.com/content/3D741qzraId1EC9xYFet80pZPGk/i-couldnt-articulate-clearly-so-i-built-this",
  },
];

export default function BlogSection() {
  return (
    <section id="articles" className="chapter tone-amber">
      <div className="container-site">
        <ChapterHeading
          index="06"
          path="articles"
          title="Articles"
          intro="Writing about building things and learning in public."
        />

        <ul className="border-t border-[var(--color-border)]">
          {articles.map((a) => (
            <li key={a.url}>
              <Reveal y={16}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 border-b border-[var(--color-border)] px-1 py-6 hover:bg-[var(--bg-alt)] sm:px-4 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:gap-6"
                >
                  <div className="text-[12px] text-[var(--color-muted-light)]">
                    <p className="font-semibold text-[var(--tone)]">{a.date}</p>
                    <p className="mt-0.5">{a.readTime}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-[var(--color-text)] md:text-xl">{a.title}</h3>
                    <p className="mb-3 max-w-[64ch] text-sm leading-relaxed text-[var(--color-muted)]">{a.excerpt}</p>
                    <p className="text-[12px] text-[var(--color-muted-light)]">
                      {a.source} · {a.tags.map((t) => `#${t}`).join(" ")}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 self-start text-[12px] font-semibold text-[var(--tone)]">
                    Read
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
