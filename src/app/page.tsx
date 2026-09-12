import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experience } from "@/components/sections/Experience";
import { Fit } from "@/components/sections/Fit";
import { Hero } from "@/components/sections/Hero";
import { ProofBand } from "@/components/sections/ProofBand";

/**
 * Recruiter scan path: Hero → Experience → Fit → Footer.
 * Order here must match `sectionOrder` in src/lib/selectors.ts.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofBand />
        <Experience />
        <Fit />
      </main>
      <SiteFooter />
    </>
  );
}
