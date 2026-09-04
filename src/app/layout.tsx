import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { profile, site } from "@/content";
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
  robots: { index: false, follow: false },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "./",
    siteName: profile.name,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.primaryTitle}`,
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
  name: profile.name,
  jobTitle: profile.primaryTitle,
  email: `mailto:${profile.email}`,
  url: siteUrl.href,
  sameAs: [
    profile.linkedin,
    ...(profile.github ? [profile.github] : []),
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
