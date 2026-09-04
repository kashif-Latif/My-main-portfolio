import { ImageResponse } from "next/og";

// The old code referenced /og-image.png — a file that never existed —
// so every LinkedIn/WhatsApp/Twitter share rendered a blank card.
// This generates a real 1200x630 card at build time. No design tools,
// no external fonts, nothing to fetch.

export const alt = "Muhammad Kashif Latif — AI Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #07090b 0%, #0d1420 55%, #101b2e 100%)",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            MKL
          </div>
          <div style={{ fontSize: 26, color: "#93a4bd" }}>Portfolio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            Muhammad Kashif Latif
          </div>
          <div style={{ fontSize: 32, color: "#7dd3fc" }}>
            AI Engineer &amp; Full Stack Developer
          </div>
          <div style={{ fontSize: 24, color: "#93a4bd", maxWidth: 900, lineHeight: 1.45 }}>
            Building intelligent software, scalable web applications, and
            AI-powered products.
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#64748b" }}>
          <div>github.com/kashif-Latif</div>
          <div>Lahore, Pakistan</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
