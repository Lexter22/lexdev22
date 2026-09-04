"use client";

import Reveal from "./Reveal";

const awsRole = {
  role: "Founding Lead",
  organization: "AWS Student Builder Group · PUP Biñan",
  dates: "November 2025 — Present",
  description:
    "Founded PUP Biñan's chapter and lead its learning programs, hands-on workshops, speaker coordination, and member support as part of AWS's global student community. The program was renamed from AWS Cloud Club to AWS Student Builder Group in April 2026; the work continued under the Lead title.",
};

const badges = [
  {
    src: "/aws-cloud-club-captain-gold-level.png",
    alt: "AWS Cloud Clubs Gold Captain badge",
    title: "Gold Captain",
    featured: true,
  },
  {
    src: "/aws-cloud-club-captain.png",
    alt: "AWS Cloud Clubs Captain badge",
    title: "Captain",
    featured: false,
  },
  {
    src: "/aws-sbg-surge-badge.png",
    alt: "AWS Student Builder Group Surge badge",
    title: "SBG Surge",
    featured: false,
  },
];

const professionalExperience = {
  role: "Junior Software Engineer",
  organization: "Dewise Solutions Philippines",
  location: "Hybrid · Mandaluyong City, Philippines",
  dates: "December 2025 — April 2026",
  description:
    "Developed and maintained web applications using .NET, collaborated with cross-functional teams, implemented responsive interfaces, and improved application performance.",
};

const education = {
  program: "BS Information Technology",
  focus: "Major in Software Engineering",
  dates: "Ongoing",
};

const credentials = [
  {
    title: "Foundational C# Microsoft Certification",
    issuer: "FreeCodeCamp",
    year: "2025",
  },
  {
    title: "SQL Associate",
    issuer: "SQL, data analysis and database management",
    year: "2025",
  },
  {
    title: "The Legend of Python",
    issuer: "Programming, data structures and algorithms",
    year: "2025",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6 md:mb-8">
            <p className="mb-1 text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)]">
              <span className="text-[var(--color-accent)]">$</span> cat experience.log
            </p>
            <h2 className="text-pixel-header">Experience</h2>
            <p className="mt-3 max-w-[620px] text-sm leading-relaxed text-[var(--color-muted)] md:text-[15px]">
              Leadership, professional work, and the education behind both.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <article className="relative overflow-hidden border border-[#00ff41]/40 bg-[var(--bg-alt)] shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-y-0 left-0 w-1 bg-[#00ff41]" />

            <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-[10px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-[0.2em] text-[#00ff41]">
                  Current leadership · {awsRole.dates}
                </p>

                <h3 className="mt-5 font-[family-name:var(--font-pixel)] text-[clamp(1.35rem,4vw,2.2rem)] leading-[1.35] text-[var(--color-text)]">
                  {awsRole.role}
                </h3>

                <p className="mt-4 text-[12px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider text-[#00ff41]">
                  {awsRole.organization}
                </p>

                <p className="mt-6 max-w-[760px] text-sm leading-7 text-[var(--color-muted)] md:text-[15px]">
                  {awsRole.description}
                </p>
              </div>

              <aside className="border-t border-[#00ff41]/25 bg-[#00ff41]/[0.025] p-5 sm:p-6 lg:border-l lg:border-t-0" aria-label="AWS leadership badges">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-light)]">
                    Program badges
                  </p>
                  <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[#00ff41]">
                    Gold highlighted
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {badges.map((badge) => (
                    <figure
                      key={badge.title}
                      className={`min-w-0 border p-2 text-center ${
                        badge.featured
                          ? "border-[#00ff41]/55 bg-[#00ff41]/[0.06]"
                          : "border-[var(--color-border)] bg-black/10"
                      }`}
                    >
                      <div className="flex aspect-square items-center justify-center overflow-hidden">
                        <img
                          src={badge.src}
                          alt={badge.alt}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className={`mt-2 text-[9px] font-[family-name:var(--font-mono)] font-semibold uppercase leading-snug tracking-wide ${badge.featured ? "text-[#00ff41]" : "text-[var(--color-muted-light)]"}`}>
                        {badge.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-[var(--color-muted-light)]">
                  Gold Captain recognizes leadership and sustained contribution to the university cloud community.
                </p>
              </aside>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <div id="professional-experience" className="mt-10 scroll-mt-24">
            <p className="text-[10px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-light)]">
              Professional experience
            </p>
            <article className="mt-4 grid gap-4 border-y border-[var(--color-border)] py-6 md:grid-cols-[190px_1fr] md:gap-8 md:py-8">
              <p className="text-[11px] font-[family-name:var(--font-mono)] uppercase leading-relaxed tracking-wider text-[var(--color-muted-light)]">
                {professionalExperience.dates}
              </p>
              <div>
                <h3 className="text-display text-xl text-[var(--color-text)] md:text-2xl">
                  {professionalExperience.role}
                </h3>
                <p className="mt-2 text-[12px] font-[family-name:var(--font-mono)] leading-relaxed text-[var(--color-muted-light)]">
                  {professionalExperience.organization} · {professionalExperience.location}
                </p>
                <p className="mt-4 max-w-[720px] text-sm leading-7 text-[var(--color-muted)]">
                  {professionalExperience.description}
                </p>
              </div>
            </article>
          </div>
        </Reveal>

        <div id="education-credentials" className="mt-8 grid scroll-mt-24 border-y border-[var(--color-border)] lg:grid-cols-2">
          <Reveal className="border-b border-[var(--color-border)] p-5 sm:p-6 lg:border-b-0 lg:border-r" delay={0.1}>
            <p className="text-[10px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-light)]">
              Education
            </p>
            <p className="mt-5 text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[#00ff41]">
              {education.dates}
            </p>
            <h3 className="mt-2 text-display text-xl text-[var(--color-text)] md:text-2xl">
              {education.program}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{education.focus}</p>
          </Reveal>

          <Reveal className="p-5 sm:p-6" delay={0.12}>
            <p className="text-[10px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-light)]">
              Credentials
            </p>
            <div className="mt-4 divide-y divide-[var(--color-border)]">
              {credentials.map((credential) => (
                <div key={credential.title} className="grid grid-cols-[1fr_auto] gap-4 py-3 first:pt-0 last:pb-0">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-text)]">{credential.title}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-muted-light)]">{credential.issuer}</p>
                  </div>
                  <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]">{credential.year}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
