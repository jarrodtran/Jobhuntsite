import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Roles } from "@/components/sections/Roles";

/**
 * Recruiter scan path, top to bottom:
 *   Hero (who, title, voice, proof, employers, CTAs)
 *   → Where I fit (roles, primary first)
 *   → Experience
 *   → Contact / Resume
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
        <Roles />
        <Experience />
      </main>
      <Contact />
    </>
  );
}
