import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { intro, origin } from "@/content/site";
import { isPlaceholder } from "@/lib/format";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const indexable = await isIndexable();
  const description = isPlaceholder(intro.tagline)
    ? "The personal site of Jarrod Tran."
    : intro.tagline;
  await logRemainingPlaceholders();

  return {
    metadataBase: new URL(origin),
    title: {
      default: intro.name,
      template: `%s · ${intro.name}`,
    },
    description,
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
      <body className="bg-bg text-ink">
        <Providers>
          <a
            href="#main"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-3 focus-visible:z-50 focus-visible:bg-bg focus-visible:px-3 focus-visible:py-2"
          >
            Skip to content
          </a>
          <div className="mx-auto w-full max-w-[48rem] px-5 sm:px-8">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
