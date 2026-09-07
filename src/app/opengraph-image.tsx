import { ImageResponse } from "next/og";
import { intro } from "@/content/site";

export const alt = intro.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#fafaf7",
          color: "#1a1916",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 999,
            background: "#1f4a3a",
            color: "#fafaf7",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontFamily: "Georgia, serif",
          }}
        >
          JT
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 64,
            fontFamily: "Georgia, serif",
            letterSpacing: -1,
          }}
        >
          {intro.greeting}
        </div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#5c574f" }}>
          jarrodtran.com
        </div>
      </div>
    ),
    { ...size },
  );
}
