import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WritingList } from "@/components/sections/WritingList";
import { seoView, writingView } from "@/lib/selectors";

const writingTitle = `${writingView.heading} — ${seoView.siteName}`;
const writingDescription = `Notes and essays by ${seoView.siteName}.`;

export const metadata: Metadata = {
  title: writingTitle,
  description: writingDescription,
  alternates: { canonical: "./" },
  openGraph: {
    title: writingTitle,
    description: writingDescription,
    url: "./",
  },
};

/** Full Writing index from the same Substack JSON as the homepage. */
export default function WritingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" data-page="writing">
        <WritingList asPage />
      </main>
      <SiteFooter />
    </>
  );
}
