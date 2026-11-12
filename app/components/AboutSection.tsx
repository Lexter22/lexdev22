import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

/** Talks I've given at other schools. Add new ones to the top; photos are 16:9. */
const talks = [
  {
    image: "/public-speaking.jpeg",
    alt: "Lex speaking at the Asia Pacific College podium",
    width: 2048,
    height: 1150,
    where: "Asia Pacific College",
    title: "Getting hands-on with the AWS Console",
    body: "Tips for using the console well, especially cost management and finding open resources with Amazon Q.",
  },
  {
    image: "/uphsl1.jpg",
    alt: "Lex talking with attendees at the UPHSL Kiro workshop",
    width: 1366,
    height: 768,
    where: "AWS Student Builder Group, UPHSL",
    title: "Spec-driven development with Kiro",
    body: "Explained spec-driven development, then mentored and judged the projects attendees built during the workshop.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="chapter">
      <div className="container-site">
        <ChapterHeading
          index="01"
          path="about"
          title="About"
          intro="Beyond building, I teach. These are talks I've given on AWS and developer tooling at other schools."
        />

        {/* One column on phones, two side by side from tablet up. Nothing pins or overlaps. */}
        <ul className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
          {talks.map((t, i) => (
            <li key={t.title}>
              <Reveal delay={i * 0.08} y={16}>
                <img
                  src={t.image}
                  alt={t.alt}
                  width={t.width}
                  height={t.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="aspect-video w-full rounded-[6px] border border-[var(--color-border)] object-cover"
                />
                <p className="chapter-eyebrow mt-5 !mb-2">{t.where}</p>
                <h3 className="text-display text-lg text-[var(--color-text)] md:text-xl">{t.title}</h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[var(--color-muted)]">{t.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
