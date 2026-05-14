import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Trading Core — CFA Prep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Loads the brand logo PNG from `public/logo.png` and returns a base64 data URI
 * suitable for use in `<img src>` inside an `ImageResponse`. ImageResponse runs
 * on the Node.js runtime here, so reading from disk is fine.
 */
async function logoDataUri(): Promise<string> {
  const buf = await readFile(join(process.cwd(), "public", "logo.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function OgImage() {
  const logo = await logoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #064e3b 100%)",
          color: "white",
          fontFamily: "Inter, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 32,
          }}
        >
          <img
            src={logo}
            alt="Trading Core"
            width={72}
            height={72}
            style={{ borderRadius: 18 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>
              Trading Core
            </span>
            <span
              style={{
                fontSize: 16,
                color: "#9ca3af",
                letterSpacing: 4,
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              CFA Prep
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            textAlign: "center",
            maxWidth: 980,
          }}
        >
          Your best CFA buddy — powered by AI
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 26,
            color: "#9ca3af",
            lineHeight: 1.4,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Massive question bank. Personalized study plans. Real exam-style mocks. Free to start.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            padding: "12px 28px",
            borderRadius: 999,
            background: "rgba(16,185,129,0.18)",
            color: "#10b981",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          tradingcore.com.br — no credit card needed
        </div>
      </div>
    ),
    { ...size },
  );
}
