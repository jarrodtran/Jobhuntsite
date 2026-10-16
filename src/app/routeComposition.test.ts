import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readApp(relative: string): string {
  return readFileSync(path.join(repoRoot, "src/app", relative), "utf8");
}

/** Recruiter homepage from b92c4066460c (#32), before publisher pivot #39. */
const RECRUITER_HOME_B92C406 = `import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experience } from "@/components/sections/Experience";
import { Fit } from "@/components/sections/Fit";
import { Hero } from "@/components/sections/Hero";
import { ProofBand } from "@/components/sections/ProofBand";

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
`;

function importsModule(source: string, specifier: string): boolean {
  const escaped = specifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`from\\s+['"]${escaped}['"]`).test(source);
}

function publisherHomeViolations(source: string): string[] {
  const violations: string[] = [];
  if (!importsModule(source, "@/components/sections/HomeIdentity")) {
    violations.push("missing HomeIdentity");
  }
  if (!importsModule(source, "@/components/sections/WritingList")) {
    violations.push("missing WritingList");
  }
  if (importsModule(source, "@/components/sections/Hero")) {
    violations.push("imports Hero; use HomeIdentity on / and WorkHeader on /work");
  }
  if (importsModule(source, "@/components/sections/ProofBand")) {
    violations.push("imports ProofBand");
  }
  if (importsModule(source, "@/components/ui/ProofChips")) {
    violations.push("imports ProofChips");
  }
  if (importsModule(source, "@/components/ui/EmployerRow")) {
    violations.push("imports EmployerRow");
  }
  return violations;
}

describe("live route composition", () => {
  it("rejects the #32 recruiter homepage that mounted Hero on /", () => {
    const violations = publisherHomeViolations(RECRUITER_HOME_B92C406);
    expect(violations).toContain("missing HomeIdentity");
    expect(violations).toContain(
      "imports Hero; use HomeIdentity on / and WorkHeader on /work",
    );
    expect(violations).toContain("imports ProofBand");
  });

  it("keeps / as HomeIdentity + WritingList without Hero", () => {
    expect(publisherHomeViolations(readApp("page.tsx"))).toEqual([]);
    expect(readApp("page.tsx")).toMatch(/data-page="home"/);
  });

  it("keeps /work as WorkHeader + Experience + Fit", () => {
    const source = readApp("work/page.tsx");
    expect(importsModule(source, "@/components/sections/WorkHeader")).toBe(true);
    expect(importsModule(source, "@/components/sections/Experience")).toBe(true);
    expect(importsModule(source, "@/components/sections/Fit")).toBe(true);
    expect(importsModule(source, "@/components/sections/Hero")).toBe(false);
    expect(source).toMatch(/data-page="work"/);
  });

  it("keeps /writing as WritingList", () => {
    const source = readApp("writing/page.tsx");
    expect(importsModule(source, "@/components/sections/WritingList")).toBe(true);
    expect(importsModule(source, "@/components/sections/Hero")).toBe(false);
    expect(source).toMatch(/data-page="writing"/);
  });
});
