import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { viewportChrome } from "@/lib/chrome";
import { seoView } from "@/lib/selectors";
import "./globals.css";

export const viewport: Viewport = viewportChrome;

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
    <html lang={seoView.lang} className={GeistSans.variable} id="top">
      <body className="bg-bg text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-bg focus:px-3 focus:py-2"
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
