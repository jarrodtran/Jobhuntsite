import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experience } from "@/components/sections/Experience";
import { Fit } from "@/components/sections/Fit";
import { Hero } from "@/components/sections/Hero";
import { ProofBand } from "@/components/sections/ProofBand";

/**
 * Recruiter scan path (CoS / BizOps reposition), top to bottom:
 *   Hero (name, seat, edge, voice, ops-first proof, CTAs, employers)
 *   → Fit (primary summary + evidence; muted adjacent seats)
 *   → Experience (accordion with closed-row outcome preview)
 *   → Footer (email + LinkedIn)
 *
 * ProofBand stays in the tree but no-ops while `proofBand` is empty (dedupe).
 * Order here must match `sectionOrder` in src/lib/selectors.ts.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofBand />
        <Fit />
        <Experience />
      </main>
      <SiteFooter />
    </>
  );
}
