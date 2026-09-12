import { describe, expect, it } from "vitest";
import {
  contact,
  experience,
  hero,
  proofBand,
  roles,
  siteIndexable,
} from "@/content";
import { contentHasPlaceholders, heroView, seoView } from "@/lib/selectors";

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
    expect(hero.mappingLine).toMatch(/Strategy & Operations/);
    expect(hero.mappingLine).toMatch(/TPM/);
    expect(hero.mappingLine).toMatch(/Tesla/);
    expect(hero.proofChips).toEqual([
      { metric: "10k+", label: "employees, AI enablement" },
      { metric: "$260M", label: "led NPI cost-down" },
      { metric: "20+", label: "AI tools shipped" },
    ]);
    expect(proofBand).toEqual([]);
    expect(contact.location).toBe("Houston");
  });

  it("puts Tesla, AI enablement, and Strategy & Operations in the snippet", () => {
    expect(seoView.description).toBe(hero.mappingLine);
    expect(seoView.description).toMatch(/Tesla/);
    expect(seoView.description).toMatch(/AI enablement/);
    expect(seoView.description).toMatch(/Strategy & Operations/);
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

  it("leads tesla-ai with enablement, FDE hiring, then attributed cost-down", () => {
    expect(byId("tesla-ai").bullets).toEqual([
      "Lead AI enablement across Tesla Energy Manufacturing (10,000 employees): as-is to to-be to ship to hand-off to a sustaining team.",
      "Stand up an FDE team for custom AI buildouts (20+ tools, 1,000+ active users, ~$1.6M productivity). Hiring manager for that team, including an AI PM and an industrial engineer.",
      "Lead a 12-month NPI cost-down across materials, labor, and supplier contracts: $260M annualized cost-down, $156M incremental annual profit, on a $23M / 50+ initiative book. Megapack scale 3.2×.",
      "Mitigated $550M in projected tariff exposure by redesigning build plans and establishing FTZ / bonded-warehouse / product-changeover infrastructure.",
      "Own strategy on what we build, where we build it, and when we launch, plus regulatory and cost mitigation.",
    ]);
    expect(byId("tesla-ai").scopeLine).toMatch(/FDE/);
    expect(byId("tesla-ai").scopeLine).toMatch(/hiring/i);
  });

  it("keeps tesla-4680 stage gates and adds logistics bullets", () => {
    expect(byId("tesla-4680").bullets).toEqual([
      "Advance Project Roadrunner from early battery-cell pilot toward a production-ready platform.",
      "Install stage gates, readiness reviews, supplier coordination, and cross-functional launch ownership across engineering, production, and supply chain.",
      "Sustained Model 3 / Model Y rates through demand surges and supply disruptions.",
      "Designed and launched a $3.5M/month Warehouse on Wheels logistics platform protecting battery and drivetrain flow.",
    ]);
  });

  it("renders Fit as an AI thesis plus one StratOps lane", () => {
    expect(roles.map((role) => role.id)).toEqual(["ai-enablement", "bizops"]);
    expect(roles.some((role) => role.primary)).toBe(true);
    expect(roles.find((role) => role.primary)?.summary).toMatch(
      /as-is to to-be, ship, then hand off/,
    );
    expect(contact.education).toMatch(/University at Buffalo/);
  });

  it("holds banned figures out of copy and keeps cities off experience rows", () => {
    const copy = JSON.stringify({
      hero,
      proofBand,
      experience,
    });
    expect(copy).not.toMatch(/GWh|56%|26%/);
    expect(experience.every((row) => !row.location)).toBe(true);
    expect(hero.proofChips.some((chip) => chip.metric === "$550M")).toBe(false);
    expect(proofBand.some((chip) => chip.metric === "$550M")).toBe(false);
    expect(copy).not.toMatch(/AI-native org/);
  });
});
