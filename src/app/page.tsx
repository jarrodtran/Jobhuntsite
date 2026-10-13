import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HomeIdentity } from "@/components/sections/HomeIdentity";
import { Now } from "@/components/sections/Now";
import { WritingList } from "@/components/sections/WritingList";

/** Publisher home: identity → Now → Writing (Substack) → footer. */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HomeIdentity />
        <Now />
        <WritingList />
      </main>
      <SiteFooter />
    </>
  );
}
