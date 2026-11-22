import { ArrowUpRight } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import ScrollImage from "./ScrollImage";

/** Chapter 03, Lead: AWS Student Community Day South Summit 2026. Each fact appears once. */
const event = {
  title: "AWS Student Community Day: South Summit 2026",
  meta: "Event Director · October 7, 2026 · Biñan People's Center Auditorium",
  summary: "A Cloud × AI summit for student builders. I led the event and brought in the sponsors that supported it.",
  numbers: [
    { value: "200", label: "Attendees" },
    { value: "80", label: "Volunteers led" },
  ],
  photo: {
    src: "/scd-south-group.webp",
    alt: "Attendees and organizers posing together on stage in front of the South Summit 2026 screen",
    width: 2962,
    height: 1664,
  },
  links: [
    { label: "Read my write-up", href: "https://builder.aws.com/comment/3L0QScWPOqVpGjSxtVK5TTJyINU" },
    { label: "Event website", href: "https://aws.scd-south.cloud/" },
  ],
};

const badge = {
  src: "/aws-sbg-zenith-badge.png",
  alt: "AWS Student Builder Group Zenith badge",
  href: "https://www.credly.com/org/aws-community/badge/aws-sbg-zenith-badge",
};

export default function LeadSection() {
  return (
    <section id="lead" className="chapter">
      <div className="container-site">
        <ChapterHeading id="lead" title={event.title} intro={event.meta} />

        {/* Scroll-driven: the frame opens and the photo settles as it comes into view */}
        <ScrollImage
          src={event.photo.src}
          alt={event.photo.alt}
          width={event.photo.width}
          height={event.photo.height}
          className="aspect-[16/10] w-full rounded-[8px] border border-[var(--color-border)] sm:aspect-[21/9]"
        />

        <Reveal y={12} className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="flex items-center gap-6 lg:col-span-5">
            <dl className="flex gap-8">
              {event.numbers.map((n) => (
                <div key={n.label} className="flex flex-col">
                  <dt className="label order-2 mt-2">{n.label}</dt>
                  <dd className="order-1 font-[family-name:var(--font-pixel)] text-[clamp(1.75rem,5vw,2.75rem)] leading-none text-[var(--accent)]">
                    {n.value}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 transition-transform hover:-translate-y-0.5 lg:ml-4"
            >
              <img src={badge.src} alt={badge.alt} width={96} height={96} loading="lazy" className="h-20 w-20 rounded-[6px] sm:h-24 sm:w-24" />
              <span className="sr-only">Zenith badge on Credly (opens in a new tab)</span>
            </a>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-[60ch] text-[15px] leading-relaxed text-[var(--color-text)]">{event.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6">
              {event.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] hover:underline"
                  >
                    {l.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
