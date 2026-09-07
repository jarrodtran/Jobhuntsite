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
          background: "#f4f3ee",
          backgroundImage:
            "radial-gradient(80% 60% at 0% 0%, rgba(31, 74, 58, 0.1), transparent 58%)",
          color: "#151412",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 999,
            background: "#1f4a3a",
            color: "#f4f3ee",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontFamily: "Georgia, serif",
            boxShadow: "inset 0 0 0 1.5px rgba(244, 243, 238, 0.2)",
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
        <div style={{ marginTop: 16, fontSize: 28, color: "#534e46" }}>
          jarrodtran.com
        </div>
      </div>
    ),
    { ...size },
  );
}
