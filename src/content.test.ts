import { describe, expect, it } from "vitest";
import {
  contact,
  experience,
  fitLead,
  hero,
  proofBand,
  roles,
  sections,
  siteIndexable,
} from "@/content";
import {
  contentHasPlaceholders,
  experienceView,
  footerView,
  heroView,
  navView,
  seoView,
} from "@/lib/selectors";

const byId = (id: string) => {
  const entry = experience.find((row) => row.id === id);
  if (!entry) {
    throw new Error(`Missing experience id "${id}"`);
  }
  return entry;
};

describe("Copy enrich lock", () => {
  it("flips the ship gate so the site can index", () => {
    expect(siteIndexable).toBe(true);
    expect(contentHasPlaceholders).toBe(false);
    expect(seoView.indexable).toBe(true);
  });

  it("keeps the Tesla title and files StratOps on the fold", () => {
    expect(hero.title).toBe("Manager, AI & Factory Strategy");
    expect(hero.searchTitle).toBe(
      "Strategy & Operations, Technical Program Manager",
    );
    expect(hero.mappingLine).toMatch(/Strategy & Operations/);
    expect(hero.mappingLine).toMatch(/Technical Program Manager/);
    expect(hero.mappingLine).toMatch(
      /across Tesla Energy manufacturing \(10k employees\)/,
    );
    expect(hero.mappingLine).toMatch(/I run AI adoption/);
    expect(hero.mappingLine).not.toMatch(/Running AI adoption/);
    expect(hero.mappingLine).not.toMatch(/manufacturing scale/);
    expect(hero.mappingLine).not.toMatch(/Targeting/);
    expect(hero.voiceLine).toBe("");
    expect(hero.proofChips).toEqual([
      { metric: "10k+", label: "employees, AI enablement" },
      { metric: "$260M", label: "led NPI cost-down" },
      { metric: "20+", label: "AI tools shipped" },
    ]);
    expect(proofBand).toEqual([]);
    expect(contact.location).toBe("Houston");
  });

  it("puts Houston · open to relocate on the CTA line and in JSON-LD, city only in the footer", () => {
    expect(contact.relocation).toBe("open to relocate");
    expect(heroView.location).toBe("Houston · open to relocate");
    expect(footerView.location).toBe("Houston");
    expect(seoView.jsonLd.description).toBe(
      `${hero.mappingLine} Houston · open to relocate.`,
    );
    expect(seoView.jsonLd.homeLocation).toEqual({
      "@type": "Place",
      name: "Houston",
    });
    const copy = JSON.stringify({ hero, fitLead, roles, experience, contact });
    expect(copy).not.toMatch(
      /Bay Area|Seattle|Austin|Fremont|Palo Alto|Mountain View|Redmond|remote/i,
    );
  });

  it("files worksFor and alumniOf in JSON-LD from the experience list", () => {
    expect(seoView.jsonLd.worksFor).toEqual({
      "@type": "Organization",
      name: "Tesla",
    });
    expect(seoView.jsonLd.alumniOf).toEqual([
      {
        "@type": "Organization",
        name: "Waymo",
        parentOrganization: { "@type": "Organization", name: "Alphabet" },
      },
      { "@type": "Organization", name: "Apple" },
      { "@type": "Organization", name: "Amazon" },
      { "@type": "CollegeOrUniversity", name: "University at Buffalo" },
    ]);
  });

  it("labels the nav entry Where I fit", () => {
    expect(sections.roles.navLabel).toBe("Where I fit");
    expect(navView.links.map((link) => link.label)).toEqual([
      "Experience",
      "Where I fit",
      "Contact",
    ]);
  });

  it("puts Tesla, AI adoption, and Strategy & Operations in the snippet", () => {
    expect(seoView.title).toBe(
      "Jarrod Tran — Strategy & Operations, Technical Program Manager",
    );
    expect(seoView.description).toBe(hero.mappingLine);
    expect(seoView.description).toMatch(/Tesla/);
    expect(seoView.description).toMatch(/AI adoption/);
    expect(seoView.description).toMatch(/Strategy & Operations/);
    expect(seoView.description).toMatch(/Technical Program Manager/);
  });

  it("opens the resume in a new tab instead of downloading it", () => {
    expect(heroView.primaryCta.download).toBe(false);
    expect(heroView.primaryCta.newTab).toBe(true);
    expect(heroView.primaryCta.href).toBe("/resume.pdf");
  });

  it("uses month-precision dates", () => {
    expect(byId("tesla-ai")).toMatchObject({
      start: "Aug 2023",
      end: "Present",
    });
    expect(byId("waymo")).toMatchObject({
      start: "Oct 2022",
      end: "May 2023",
    });
    expect(byId("apple-india")).toMatchObject({
      start: "Jun 2021",
      end: "Jun 2022",
    });
    expect(byId("tesla-4680")).toMatchObject({
      start: "Jun 2018",
      end: "Jun 2021",
    });
    expect(byId("amazon")).toMatchObject({
      start: "Mar 2017",
      end: "Apr 2018",
    });
  });

  it("leads tesla-ai with enablement, a forward-deployed team, then attributed cost-down", () => {
    expect(byId("tesla-ai").bullets).toEqual([
      "Lead AI enablement across Tesla Energy Manufacturing (10,000 employees). Assess, build, ship, then hand off to a sustaining team.",
      "Built a forward-deployed applied AI team for custom buildouts (20+ tools, 1,000+ active users, ~$1.6M productivity). Hiring manager for that team.",
      "Lead a 12-month NPI cost-down across materials, labor, and supplier contracts: $260M annualized cost-down, $156M incremental annual profit, on a $23M / 50+ initiative book. Megapack scale 3.2×.",
      "Mitigated $550M in projected tariff exposure by redesigning build plans and establishing FTZ / bonded-warehouse / product-changeover infrastructure.",
      "Own what we build, where we build it, and when we launch, plus regulatory and cost mitigation.",
    ]);
    expect(byId("tesla-ai").bullets[1]).toMatch(/Hiring manager for that team/);
  });

  it("puts Jarrod's scope facts on the Tesla row, numbers as he gave them", () => {
    expect(byId("tesla-ai").scopeLine).toBe(
      "10 direct reports. All production planning for the $2.5B per quarter Megapack program. AI enablement for all of Energy Manufacturing (10k employees), which supports a ~$4B per quarter Energy division.",
    );
    expect(byId("tesla-ai").scopeLine).not.toMatch(/~\$2\.5B/);
    expect(byId("tesla-ai").scopeLine).not.toMatch(/Director|Senior|Staff|L\d|M\d/);
  });

  it("files Waymo as an Alphabet stint and says why he went back to Tesla", () => {
    expect(byId("waymo").company).toBe("Waymo");
    expect(byId("waymo").parentCompany).toBe("Alphabet");
    expect(
      experienceView.rows.find((row) => row.id === "waymo")?.company,
    ).toBe("Waymo (Alphabet)");
    expect(hero.employers).toContain("Waymo");
    expect(hero.employers).not.toContain("Waymo (Alphabet)");
    expect(byId("waymo").bullets.at(-1)).toBe(
      "Returned to Tesla in Aug 2023 to lead AI and factory strategy for Energy Manufacturing.",
    );
    expect(byId("waymo").bullets[0]).not.toMatch(/executable operating system/);
    expect(byId("waymo").scopeLine).not.toMatch(/cadence/);
    expect(byId("apple-india").bullets[0]).not.toMatch(/zero-to-one|exacting/);
    expect(byId("apple-india").scopeLine).toMatch(/standing start/);
  });

  it("keeps tesla-4680 stage gates and adds logistics bullets", () => {
    expect(byId("tesla-4680").bullets).toEqual([
      "Advanced Project Roadrunner from an early battery-cell pilot to a production-ready platform.",
      "Put in stage gates, readiness reviews, and supplier coordination, with launch owned across engineering, production, and supply chain.",
      "Sustained Model 3 / Model Y rates through demand surges and supply disruptions.",
      "Designed and launched a $3.5M/month Warehouse on Wheels logistics platform protecting battery and drivetrain flow.",
    ]);
  });

  it("renders Fit as a filing sentence plus AI and StratOps lanes", () => {
    expect(roles.map((role) => role.id)).toEqual(["ai-enablement", "bizops"]);
    expect(roles.some((role) => role.primary)).toBe(true);
    expect(roles.find((role) => role.primary)?.label).toBe("AI adoption");
    expect(roles.find((role) => role.primary)?.summary).toMatch(
      /forward-deployed applied AI team/,
    );
    expect(roles.find((role) => role.primary)?.summary).not.toMatch(
      /pilot graveyard/,
    );
    expect(roles.find((role) => role.id === "bizops")?.experienceIds).toEqual([
      "tesla-ai",
      "waymo",
      "apple-india",
      "tesla-4680",
    ]);
    expect(fitLead).toMatch(/Manager, AI & Factory Strategy/);
    expect(fitLead).toMatch(/Technical Program Manager/);
    expect(fitLead).toMatch(/I do Strategy & Operations/);
    expect(fitLead).not.toMatch(/That means/);
    expect(fitLead).not.toMatch(/Houston/);
    expect(fitLead).not.toMatch(/reloc/i);
    expect(roles.find((role) => role.id === "bizops")?.summary).toMatch(
      /I work on hardware and new product introduction/,
    );
    expect(roles.find((role) => role.id === "bizops")?.summary).toMatch(
      /Before that I did the iPhone India launch at Apple/,
    );
    expect(roles.find((role) => role.id === "bizops")?.summary).toMatch(
      /At Waymo I set up annual planning, OKRs, and business reviews/,
    );
    expect(roles.find((role) => role.id === "bizops")?.summary).not.toMatch(
      /operating cadence/,
    );
    expect(contact.education).toMatch(/University at Buffalo/);
    expect(contact.school).toBe("University at Buffalo");
  });

  it("holds banned figures out of copy and keeps cities off experience rows", () => {
    const copy = JSON.stringify({
      hero,
      proofBand,
      fitLead,
      experience,
      roles,
    });
    expect(copy).not.toMatch(/GWh|56%|26%/);
    expect(experience.every((row) => !row.location)).toBe(true);
    expect(hero.proofChips.some((chip) => chip.metric === "$550M")).toBe(false);
    expect(proofBand.some((chip) => chip.metric === "$550M")).toBe(false);
    expect(copy).not.toMatch(/AI-native org/);
    expect(copy).not.toMatch(/\bFDE\b/);
    expect(copy).not.toMatch(/Targeting/);
    expect(copy).not.toMatch(/pilot graveyard/);
    expect(copy).not.toMatch(/as-is to to-be/);
    expect(copy).not.toMatch(/That means/);
    expect(copy).not.toMatch(/executable operating system/);
    expect(copy).not.toMatch(/zero-to-one/);
    expect(copy).not.toMatch(/exacting/);
    expect(copy).not.toMatch(/VC Platform|Chief of Staff|Director/);
    const fitCopy = JSON.stringify({ fitLead, roles });
    expect(fitCopy).not.toMatch(/Enablement plus custom buildouts/);
    expect(fitCopy).not.toMatch(/executable operating cadence/);
    expect(fitCopy).not.toMatch(/VC Platform/);
    expect(fitCopy).not.toMatch(/Chief of Staff/);
  });
});
