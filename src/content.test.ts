import { describe, expect, it } from "vitest";
import {
  experience,
  hero,
  proofBand,
  siteIndexable,
} from "@/content";
import { contentHasPlaceholders, seoView } from "@/lib/selectors";

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

  it("keeps the locked hero title and proof surfaces", () => {
    expect(hero.title).toBe("Manager, AI & Factory Strategy");
    expect(hero.proofChips).toEqual([
      { metric: "$260M", label: "annualized cost-down" },
      { metric: "10k+", label: "AI-native org" },
      { metric: "$2B→$10B", label: "Apple India revenue" },
    ]);
    expect(proofBand).toEqual([
      { metric: "$156M", label: "annual profit" },
      { metric: "3.2×", label: "Megapack scale" },
      { metric: "20+", label: "AI tools" },
    ]);
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

  it("locks tesla-ai bullets money-first with $550M as #2", () => {
    expect(byId("tesla-ai").bullets).toEqual([
      "Sequence a $23M / 50+ initiative portfolio: $260M annualized cost-down, $156M incremental annual profit; Megapack scale 3.2×.",
      "Mitigated $550M in projected tariff exposure by redesigning build plans and establishing FTZ / bonded-warehouse / product-changeover infrastructure.",
      "Lead AI enablement across Tesla Energy Manufacturing (10,000 employees): as-is to to-be to ship to hand-off to a sustaining team.",
      "Stand up an FDE team for custom AI buildouts (20+ tools, 1,000+ active users, ~$1.6M productivity).",
      "Own strategy on what we build, where we build it, and when we launch, plus regulatory and cost mitigation.",
    ]);
  });

  it("keeps tesla-4680 stage gates and adds logistics bullets", () => {
    expect(byId("tesla-4680").bullets).toEqual([
      "Advance Project Roadrunner from early battery-cell pilot toward a production-ready platform.",
      "Install stage gates, readiness reviews, supplier coordination, and cross-functional launch ownership across engineering, production, and supply chain.",
      "Sustained Model 3 / Model Y rates through demand surges and supply disruptions.",
      "Designed and launched a $3.5M/month Warehouse on Wheels logistics platform protecting battery and drivetrain flow.",
    ]);
  });

  it("holds banned figures and cities out of copy", () => {
    const copy = JSON.stringify({
      hero,
      proofBand,
      experience,
    });
    expect(copy).not.toMatch(/GWh|56%|26%/);
    expect(experience.every((row) => !row.location)).toBe(true);
    expect(hero.proofChips.some((chip) => chip.metric === "$550M")).toBe(false);
    expect(proofBand.some((chip) => chip.metric === "$550M")).toBe(false);
  });
});
