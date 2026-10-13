import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experience } from "@/components/sections/Experience";
import { Fit } from "@/components/sections/Fit";
import { WorkHeader } from "@/components/sections/WorkHeader";
import { seoView, workHeaderView } from "@/lib/selectors";

export const metadata: Metadata = {
  title: `Work — ${seoView.siteName}`,
  description: workHeaderView.mappingLine ?? seoView.description,
  alternates: { canonical: "./" },
  openGraph: {
    title: `Work — ${seoView.siteName}`,
    description: workHeaderView.mappingLine ?? seoView.description,
    url: "./",
  },
};

/** Recruiter path moved off the homepage: identity → Experience → Fit → footer. */
export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" data-page="work">
        <WorkHeader />
        <Experience />
        <Fit />
      </main>
      <SiteFooter />
    </>
  );
}
