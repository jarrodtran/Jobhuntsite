import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experience } from "@/components/sections/Experience";
import { Fit } from "@/components/sections/Fit";
import { Hero } from "@/components/sections/Hero";
import { ProofBand } from "@/components/sections/ProofBand";

/**
 * Recruiter scan path (FE Designer IA), top to bottom:
 *   Hero (name, title, voice, $260M figure block, CTAs, employers)
 *   → Proof strip (secondary metrics between hairlines; not a nav section)
 *   → Experience (primary scan path; accordion rows)
 *   → Fit (one line of role text links)
 *   → Footer (email + LinkedIn)
 *
 * Order here must match `sectionOrder` in src/lib/selectors.ts, which drives
 * the header nav.
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
