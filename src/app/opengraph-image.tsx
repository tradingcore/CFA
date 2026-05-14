import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Trading Core — CFA Prep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            T
          </div>
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
