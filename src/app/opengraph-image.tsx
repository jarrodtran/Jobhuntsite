import { ImageResponse } from "next/og";
import { intro, origin } from "@/content/site";

const host = new URL(origin).host;

export const alt = `${intro.name} — ${host}`;
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
          background: "#fafaf7",
          color: "#1a1916",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 10,
            width: "100%",
            background: "#1f4a3a",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "72px 80px 80px",
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
              letterSpacing: -1.5,
              lineHeight: 1.1,
            }}
          >
            {intro.name}
          </div>
          <div
            style={{
              marginTop: 20,
              width: 72,
              height: 2,
              background: "#e6e2d9",
            }}
          />
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              color: "#5c574f",
              letterSpacing: 0.2,
            }}
          >
            {host}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
