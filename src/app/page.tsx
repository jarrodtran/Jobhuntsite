import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HomeIdentity } from "@/components/sections/HomeIdentity";
import { WritingList } from "@/components/sections/WritingList";

/** Publisher home: identity + Now in one fold, then Writing → footer. */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" data-page="home">
        <HomeIdentity />
        <WritingList previewLimit={5} />
      </main>
      <SiteFooter />
    </>
  );
}
