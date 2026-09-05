/**
 * Single source of truth for every word on the site. Copy owns this file.
 *
 * Components never import this file directly; they read render-ready views
 * from `src/lib/selectors.ts`, which in turn reads only from here. Prose,
 * metrics, titles, and ordering changes should never require touching
 * `src/components`.
 *
 * Field shapes live in `src/lib/schema.ts` (Eng-owned). Optional fields such as
 * `location` may be omitted or left blank; the UI hides blank fields rather
 * than rendering empty labels.
 *
 * Placeholders are prefixed with `TODO_COPY:` and produced by the `todo()`
 * helper below. While any placeholder remains, the site stays `noindex`.
 *
 * Reposition (CoS / BizOps primary): hero.seat, hero.edge, hero.voiceLine,
 * hero.proofChips, roles primary flags, and experience bullet order may move
 * with Jarrod's approval. Do not invent metrics — use TODO_COPY for gaps.
 */

import type {
  Contact,
  ExperienceEntry,
  Hero,
  ProofBand,
  Role,
  SectionId,
  SectionMeta,
  Site,
  UiStrings,
} from "@/lib/schema";

export const TODO_COPY = "TODO_COPY";

/** Mark a string as placeholder copy. `hint` tells Copy what belongs here. */
export const todo = (hint: string): string => `${TODO_COPY}: ${hint}`;

export const hero: Hero = {
  name: "Jarrod Tran",
  seat: "Chief of Staff / Business Operations",
  edge: "AI enablement as the operating edge",
  voiceLine:
    "I turn ambiguous executive mandates into operating cadence leadership can run.",
  // Ops/portfolio first; AI org scale is the differentiator, not the lead.
  proofChips: [
    { metric: "$260M", label: "annualized cost-down" },
    { metric: "$156M", label: "incremental annual profit" },
    { metric: "10k+", label: "AI-native org enabled" },
  ],
  employers: ["Tesla", "Waymo", "Apple", "Amazon"],
};

/**
 * Secondary proof strip under the hero. Empty on purpose: Tesla numbers now
 * live once in the hero chips and again only inside Experience bullets.
 * Re-populate only with non-overlapping proof.
 */
export const proofBand: ProofBand = [];

export const roles: Role[] = [
  {
    id: "cos",
    label: "Chief of Staff",
    primary: true,
    summary:
      "I scale and launch hard programs under ambiguity, then install the hand-off so the work sticks with a sustaining owner.",
    evidence: [
      "Translate org priorities into an operating system across hardware, software, fleet, product, and legal at Waymo.",
      "Advance 4680 / Project Roadrunner from cell pilot to production-ready platform with stage gates and cross-functional launch ownership.",
    ],
    audiences: ["ai-startup", "defense", "robotics", "big-tech"],
    experienceIds: ["waymo", "tesla-4680", "tesla-ai"],
  },
  {
    id: "bizops",
    label: "Business Operations",
    primary: false,
    summary:
      "I turn capacity, cost, and launch choices into one executable operating cadence so leadership can move without ad-hoc reporting.",
    evidence: [
      "Sequenced a $23M / 50+ initiative portfolio: $260M annualized cost-down, $156M incremental annual profit; Megapack scale 3.2×.",
      "Built Waymo engineering-ops cadence: annual planning, OKRs, resource plans, and decision milestones.",
    ],
    audiences: ["big-tech", "ai-startup"],
    experienceIds: ["tesla-ai", "waymo", "apple-india"],
  },
  {
    id: "ai-enablement",
    label: "AI Enablement",
    primary: false,
    summary:
      "I make large manufacturing orgs AI-native: as-is to to-be, ship, then hand off to a sustaining team. Enablement plus custom buildouts, not a pilot graveyard.",
    evidence: [
      "AI enablement across Tesla Energy Manufacturing for 10,000 employees, with successor hand-off.",
      "FDE team for custom AI buildouts: 20+ tools, 1,000+ active users, ~$1.6M productivity.",
    ],
    audiences: ["ai-startup", "big-tech", "defense", "robotics"],
    experienceIds: ["tesla-ai"],
  },
  {
    id: "vc",
    label: "VC Platform",
    primary: false,
    // Hidden until Jarrod supplies non-Tesla platform / founder evidence.
    hidden: true,
    summary:
      "I bring operator systems for portfolio companies: ground truth, clear decisions, and follow-through on launches and scale.",
    evidence: [
      "Zero-to-one iPhone India launch system: revenue $2B→$10B, units 4.3M→16.9M, exports 6 to 40+ countries.",
      todo("VC Platform: add portfolio, founder, or platform proof beyond Apple launch ops"),
    ],
    audiences: ["venture"],
    experienceIds: ["apple-india", "tesla-ai", "waymo"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "tesla-ai",
    company: "Tesla",
    title: "Manager, AI & Factory Strategy",
    start: "2023",
    end: "Present",
    scopeLine:
      "Energy Manufacturing — AI enablement for 10k+ employees; global planning; FDE for custom buildouts",
    bullets: [
      // Portfolio / cadence first for CoS-BizOps readers; AI enablement second.
      "Sequence a $23M / 50+ initiative portfolio: $260M annualized cost-down, $156M incremental annual profit; Megapack scale 3.2×.",
      "Lead AI enablement across Tesla Energy Manufacturing (10,000 employees): as-is to to-be to ship to hand-off to a sustaining team.",
      "Stand up an FDE team for custom AI buildouts (20+ tools, 1,000+ active users, ~$1.6M productivity).",
      "Own strategy on what we build, where we build it, and when we launch, plus regulatory and cost mitigation.",
      // Ownership qualifier — do not invent; Jarrod fills.
      todo(
        "Tesla $260M / $156M / 3.2×: clarify personal vs team vs org ownership and realized vs annualized",
      ),
    ],
    url: "https://www.tesla.com/megapack",
  },
  {
    id: "waymo",
    company: "Waymo",
    title: "Strategy & Operations Manager",
    start: "2022",
    end: "2023",
    scopeLine:
      "Engineering operations — annual planning, OKRs, resource plans, and leadership cadence",
    bullets: [
      "Translate org priorities into an executable operating system across hardware, software, fleet, product, and legal.",
      "Build annual planning, OKRs, resource plans, business reviews, and decision milestones so bottlenecks surface without ad-hoc reporting.",
      todo(
        "Waymo: add outcome metrics if available (decision latency, org size supported, exec audience)",
      ),
    ],
  },
  {
    id: "apple-india",
    company: "Apple",
    title: "Strategic Operations Program Manager",
    start: "2021",
    end: "2022",
    scopeLine:
      "iPhone India launch — site, supplier, line, regulation, and demand readiness",
    bullets: [
      "Drive the zero-to-one operating system for iPhone manufacturing in India under exacting quality, regulatory, and timing requirements.",
      "Ship the ramp: revenue $2B→$10B, units 4.3M→16.9M, exports expanded from 6 to 40+ countries.",
      todo(
        "Apple $2B→$10B: clarify personal vs program vs market ownership if challenged",
      ),
    ],
  },
  {
    id: "tesla-4680",
    company: "Tesla",
    title: "Program Manager, Special Projects",
    start: "2018",
    end: "2021",
    scopeLine:
      "4680 / Project Roadrunner — stage gates and launch readiness for an emerging cell platform",
    bullets: [
      "Advance Project Roadrunner from early battery-cell pilot toward a production-ready platform.",
      "Install stage gates, readiness reviews, supplier coordination, and cross-functional launch ownership across engineering, production, and supply chain.",
      todo(
        "4680 / Roadrunner: add yield, readiness %, or launch milestone if defensible",
      ),
    ],
  },
  {
    id: "amazon",
    company: "Amazon",
    title: "Operations Area Manager",
    start: "2017",
    end: "2018",
    scopeLine: "High-volume fulfillment — frontline ops leadership",
    compact: true,
    bullets: [
      "Led a team of 100+ associates in a high-volume fulfillment center.",
    ],
  },
];

export const contact: Contact = {
  email: "jarrodtran@outlook.com",
  linkedin: "https://www.linkedin.com/in/jarrodtran/",
  resumePdf: "/resume.pdf",
  // todo("Confirm public email vs Outlook; add location / availability / clearance if targeting defense"),
};

export const site: Site = {
  origin: "https://jarrodtran.github.io",
  lang: "en",
  // Eng refreshes the asset; dimensions must match the file.
  ogImage: { path: "/og.png", width: 1200, height: 630 },
};

/**
 * Recruiter scan path, top to bottom (FE Designer IA): Hero → Fit →
 * Experience → Footer. Object order here is render order and nav order.
 * `navLabel` is omitted for the hero (the header wordmark links to top).
 */
export const sections: Record<SectionId, SectionMeta> = {
  hero: { id: "hero", heading: hero.name },
  roles: { id: "roles", heading: "Where I fit", navLabel: "Fit" },
  experience: {
    id: "experience",
    heading: "Experience",
    navLabel: "Experience",
  },
  contact: { id: "contact", heading: "Contact", navLabel: "Contact" },
};

export const ui: UiStrings = {
  skipToContent: "Skip to content",
  cta: {
    resume: "Resume",
    linkedin: "LinkedIn",
  },
  hero: {
    proofChipsLabel: "Proof points",
    employersLabel: "Employers",
  },
  proofBand: {
    label: "More proof points",
  },
  roles: {
    primaryBadge: "Primary target",
    alsoLabel: "Also a fit for",
  },
  experience: {
    dateRangeSeparator: "–",
  },
};

/**
 * Ship gate, independent of TODO_COPY. Flip to true only when Jarrod locks
 * seat + metrics + claim language AND the real resume.pdf is in public/.
 * Robots stays `noindex, nofollow` until both this is true and no placeholders
 * remain.
 */
export const siteIndexable = false;
