/** The page's story, in reading order. The header, the rail and every section heading use this list. */
/** `label` is the story name (rail, headings); `nav` is the plain name used in the header menu. */
export type Chapter = { id: string; n: string; label: string; nav: string; image?: string };

export const chapters: Chapter[] = [
  { id: "top", n: "00", label: "Intro", nav: "Intro" },
  { id: "projects", n: "01", label: "Build", nav: "Projects", image: "/projects/intellisched.jpg" },
  { id: "education", n: "02", label: "Education & Skills", nav: "Education" },
  { id: "experience", n: "03", label: "Engineer", nav: "Experience" },
  { id: "lead", n: "04", label: "Lead", nav: "Leadership", image: "/scd-south-group.webp" },
  { id: "community", n: "05", label: "Beyond the code", nav: "Speaking", image: "/public-speaking.jpeg" },
  { id: "contact", n: "06", label: "Connect", nav: "Contact" },
];

export const chapter = (id: string) => chapters.find((c) => c.id === id)!;
