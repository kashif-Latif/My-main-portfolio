import { ImageResponse } from "next/og";

// The old code referenced /og-image.png — a file that never existed —
// so every LinkedIn/WhatsApp/Twitter share rendered a blank card.
// This generates a real 1200x630 card at build time. No design tools,
// no external fonts, nothing to fetch.

export const alt = "Muhammad Kashif Latif — AI Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Satori (the renderer behind ImageResponse) has no access to the stylesheet,
 * so these hex values are the one place the palette is duplicated. They mirror
 * the cream theme in globals.css — update both together. */
const CREAM = "#F1F0E2";
const INK = "#241C15";
const AMBER = "#F5A524";
const MUTED = "#6F6355";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: CREAM,
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: AMBER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: INK,
            }}
          >
            MKL
          </div>
          <div style={{ fontSize: 26, color: MUTED }}>Portfolio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Muhammad&nbsp;
            <span style={{ color: AMBER }}>Kashif Latif</span>
          </div>
          <div style={{ fontSize: 32, color: INK }}>
            AI Engineer &amp; Full Stack Developer
          </div>
          <div style={{ fontSize: 24, color: MUTED, maxWidth: 900, lineHeight: 1.45 }}>
            Building intelligent software, scalable web applications, and
            AI-powered products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 22,
            color: MUTED,
            borderTop: `1px solid ${MUTED}33`,
            paddingTop: 24,
          }}
        >
          <div>github.com/kashif-Latif</div>
          <div>Lahore, Pakistan</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
