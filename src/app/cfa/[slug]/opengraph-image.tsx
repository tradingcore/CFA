import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "Trading Core CFA Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function logoDataUri(): Promise<string> {
  const buf = await readFile(join(process.cwd(), "public", "logo.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function OgImage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? "Trading Core";
  const description = post?.frontmatter.description ?? "";
  const level = post?.frontmatter.level;
  const logo = await logoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #064e3b 100%)",
          color: "white",
          fontFamily: "Inter, system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={logo}
            alt="Trading Core"
            width={56}
            height={56}
            style={{ borderRadius: 14 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
              Trading Core
            </span>
            <span
              style={{
                fontSize: 13,
                color: "#9ca3af",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              CFA Prep
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {level && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "rgba(16,185,129,0.18)",
                color: "#10b981",
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              CFA Level {level}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 70 ? 52 : 64,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "#9ca3af",
                lineHeight: 1.4,
                maxWidth: 980,
              }}
            >
              {description.length > 140
                ? description.slice(0, 140) + "…"
                : description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6b7280",
            fontSize: 18,
          }}
        >
          <span>tradingcore.com.br/cfa</span>
          <span style={{ color: "#10b981", fontWeight: 600 }}>
            Free to start →
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
