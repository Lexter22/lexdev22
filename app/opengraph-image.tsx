import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "John Lexter B. Reyes, Software Engineer: Backend, Cloud and QA Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card shown when the site link is shared (LinkedIn, Messenger, Discord, X). */
export default async function Image() {
  const portrait = await readFile(join(process.cwd(), "assets/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 80px",
          background: "#111c27",
          color: "#dfe8ed",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 26, color: "#398bfa" }}>$ whoami</div>
          <div style={{ marginTop: 24, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>John Lexter</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, color: "#398bfa" }}>B. Reyes</div>
          <div style={{ marginTop: 36, fontSize: 30 }}>Software Engineer</div>
          <div style={{ marginTop: 8, fontSize: 26, color: "#7892a5" }}>Backend · Cloud · QA Automation</div>
          <div style={{ marginTop: 40, fontSize: 22, color: "#7892a5" }}>lexdev22.vercel.app</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          width={380}
          height={380}
          alt=""
          style={{ borderRadius: 12, border: "2px solid #2b3b49", objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
