import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experience } from "@/components/sections/Experience";
import { Fit } from "@/components/sections/Fit";
import { WorkHeader } from "@/components/sections/WorkHeader";

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
