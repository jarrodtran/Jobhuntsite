import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experience } from "@/components/sections/Experience";
import { Fit } from "@/components/sections/Fit";
import { Hero } from "@/components/sections/Hero";

/**
 * Recruiter scan path (FE Designer IA), top to bottom:
 *   Hero (name, title, voice, chips, CTAs, employers)
 *   → Experience (primary scan path; accordion rows)
 *   → Fit (one compact row of role chips)
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
        <Experience />
        <Fit />
      </main>
      <SiteFooter />
    </>
  );
}
