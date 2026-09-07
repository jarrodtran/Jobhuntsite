import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/SkipLink";
import { intro, origin } from "@/content/site";
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

  return {
    metadataBase: new URL(origin),
    title: {
      default: intro.name,
      template: `%s · ${intro.name}`,
    },
    description: intro.tagline,
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
      description: intro.tagline,
      url: "/",
      siteName: intro.name,
    },
    twitter: {
      card: "summary_large_image",
      title: intro.name,
      description: intro.tagline,
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
          <SkipLink />
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
