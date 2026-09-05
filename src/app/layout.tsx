import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { seoView } from "@/lib/selectors";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

/**
 * All metadata is derived from content: <title> and OG title come from
 * hero.name + hero.title, descriptions from hero.voiceLine. Image URLs are
 * absolute and basePath-prefixed so they resolve under /Jobhuntsite.
 * Indexing is gated by `siteIndexable` and the absence of TODO_COPY.
 */
export const metadata: Metadata = {
  metadataBase: seoView.siteUrl,
  title: seoView.title,
  description: seoView.description,
  robots: seoView.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    title: seoView.title,
    description: seoView.description,
    url: "./",
    siteName: seoView.siteName,
    images: [
      {
        url: seoView.ogImage.url,
        width: seoView.ogImage.width,
        height: seoView.ogImage.height,
        alt: seoView.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoView.title,
    description: seoView.description,
    images: [seoView.ogImage.url],
  },
  icons: {
    icon: [
      { url: seoView.icons.ico, sizes: "32x32" },
      { url: seoView.icons.svg, type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={seoView.lang} className={fraunces.variable} id="top">
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
        >
          {seoView.skipToContent}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoView.jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
