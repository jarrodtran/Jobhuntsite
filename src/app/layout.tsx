import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import {
  contact,
  contentHasPlaceholders,
  hero,
  site,
  siteIndexable,
} from "@/content";
import { hasText } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const siteUrl = new URL(`${site.origin}${site.basePath || ""}/`);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: site.title,
  description: site.description,
  // Indexable only when the ship gate is open AND no TODO_COPY remains.
  robots:
    siteIndexable && !contentHasPlaceholders
      ? { index: true, follow: true }
      : { index: false, follow: false },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "./",
    siteName: hero.name,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${hero.name} — ${hero.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: new URL("favicon.ico", siteUrl), sizes: "32x32" },
      { url: new URL("favicon.svg", siteUrl), type: "image/svg+xml" },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: hero.name,
  jobTitle: hero.title,
  email: `mailto:${contact.email}`,
  url: siteUrl.href,
  sameAs: [
    contact.linkedin,
    ...(hasText(contact.github) ? [contact.github] : []),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable} id="top">
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
