import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10b981",
          borderRadius: 56,
          color: "white",
          fontSize: 160,
          fontWeight: 800,
          fontFamily: "Inter, system-ui",
          letterSpacing: -8,
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}
