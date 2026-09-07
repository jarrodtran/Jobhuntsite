import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { intro, origin } from "@/content/site";
import { publicText } from "@/lib/format";
import { isIndexable, logRemainingPlaceholders } from "@/lib/indexable";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const indexable = await isIndexable();
  await logRemainingPlaceholders();
  const description = publicText(intro.tagline, intro.name);

  return {
    metadataBase: new URL(origin),
    title: {
      default: intro.name,
      template: `%s · ${intro.name}`,
    },
    description,
    applicationName: intro.name,
    authors: [{ name: intro.name, url: origin }],
    creator: intro.name,
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      title: intro.name,
      description,
      url: "/",
      siteName: intro.name,
    },
    twitter: {
      card: "summary_large_image",
      title: intro.name,
      description,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-ink antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-bg focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <div className="mx-auto w-full max-w-[42rem] px-5 sm:px-6">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
