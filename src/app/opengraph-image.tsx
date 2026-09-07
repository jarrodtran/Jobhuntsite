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
          alignItems: "center",
          padding: "72px 88px",
          background: "#ffffff",
          color: "#101010",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 190,
            height: 390,
            paddingTop: 10,
            justifyContent: "flex-end",
            borderRight: "2px solid #dddddd",
            color: "#616161",
            fontSize: 20,
            fontFamily: "Arial, sans-serif",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span style={{ marginRight: 28 }}>Personal record</span>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            width: 780,
            height: 390,
            paddingLeft: 54,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 18,
              left: -14,
              width: 28,
              height: 2,
              background: "#173d2f",
            }}
          />
          <div
            style={{
              fontSize: 76,
              fontFamily: "Georgia, serif",
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {intro.greeting}
          </div>
          <div style={{ marginTop: 32, fontSize: 24, color: "#616161" }}>
            jarrodtran.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
