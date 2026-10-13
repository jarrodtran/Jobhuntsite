import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WritingList } from "@/components/sections/WritingList";

/** Full Writing index from the same Substack JSON as the homepage. */
export default function WritingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pt-8">
        <WritingList />
      </main>
      <SiteFooter />
    </>
  );
}
