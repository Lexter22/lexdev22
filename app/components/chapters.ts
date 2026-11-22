/** The page's story, in reading order. The header, the rail and every section heading use this list. */
/** `label` is the story name (rail, headings); `nav` is the plain name used in the header menu. */
export type Chapter = { id: string; n: string; label: string; nav: string; image?: string };

export const chapters: Chapter[] = [
  { id: "top", n: "00", label: "Intro", nav: "Intro" },
  { id: "projects", n: "01", label: "Build", nav: "Projects", image: "/projects/intellisched.jpg" },
  { id: "experience", n: "02", label: "Engineer", nav: "Experience" },
  { id: "lead", n: "03", label: "Lead", nav: "Leadership", image: "/scd-south-group.webp" },
  { id: "community", n: "04", label: "Share", nav: "Community", image: "/public-speaking.jpeg" },
  { id: "education", n: "05", label: "Beyond the code", nav: "Skills" },
  { id: "contact", n: "06", label: "Connect", nav: "Contact" },
];

export const chapter = (id: string) => chapters.find((c) => c.id === id)!;
