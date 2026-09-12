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
 * Locked (do not edit without Jarrod): hero.title, hero.searchTitle,
 * hero.mappingLine, hero.proofChips, roles, experience, contact.
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
  title: "Manager, AI & Factory Strategy",
  searchTitle: "Strategy & Operations, Technical Program Manager",
  mappingLine:
    "Strategy & Operations and Technical Program Manager. Currently running AI adoption at Tesla Energy manufacturing scale.",
  voiceLine: "",
  proofChips: [
    { metric: "10k+", label: "employees, AI enablement" },
    { metric: "$260M", label: "led NPI cost-down" },
    { metric: "20+", label: "AI tools shipped" },
  ],
  employers: ["Tesla", "Waymo", "Apple", "Amazon"],
};

/**
 * Secondary proof strip under the hero. Hidden when empty. 20+ AI tools
 * moved into the hero chips so this strip does not delay Experience.
 */
export const proofBand: ProofBand = [];

export const roles: Role[] = [
  {
    id: "ai-enablement",
    label: "AI Enablement",
    primary: true,
    summary:
      "I run AI adoption in large manufacturing orgs: as-is to to-be, ship, then hand off to a sustaining team. Enablement plus custom buildouts.",
    evidence: [
      "AI enablement across Tesla Energy Manufacturing for 10,000 employees, with successor hand-off.",
      "Forward-deployed applied AI team for custom buildouts: 20+ tools, 1,000+ active users, ~$1.6M productivity.",
    ],
    audiences: ["ai-startup", "big-tech", "defense", "robotics"],
    experienceIds: ["tesla-ai"],
  },
  {
    id: "bizops",
    label: "Strategy & Operations",
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
];

export const experience: ExperienceEntry[] = [
  {
    id: "tesla-ai",
    company: "Tesla",
    title: "Manager, AI & Factory Strategy",
    start: "Aug 2023",
    end: "Present",
    scopeLine:
      "Energy Manufacturing. AI enablement for 10k employees. Lead a forward-deployed applied AI team as hiring manager.",
    bullets: [
      "Lead AI enablement across Tesla Energy Manufacturing (10,000 employees): as-is to to-be to ship to hand-off to a sustaining team.",
      "Stand up a forward-deployed applied AI team for custom buildouts (20+ tools, 1,000+ active users, ~$1.6M productivity). Hiring manager for that team.",
      "Lead a 12-month NPI cost-down across materials, labor, and supplier contracts: $260M annualized cost-down, $156M incremental annual profit, on a $23M / 50+ initiative book. Megapack scale 3.2×.",
      "Mitigated $550M in projected tariff exposure by redesigning build plans and establishing FTZ / bonded-warehouse / product-changeover infrastructure.",
      "Own strategy on what we build, where we build it, and when we launch, plus regulatory and cost mitigation.",
    ],
    url: "https://www.tesla.com/megapack",
  },
  {
    id: "waymo",
    company: "Waymo",
    title: "Strategy & Operations Manager",
    start: "Oct 2022",
    end: "May 2023",
    scopeLine:
      "Installed Eng Ops cadence across hardware, software, fleet, product, and legal, then returned to Tesla.",
    bullets: [
      "Translate org priorities into an executable operating system across hardware, software, fleet, product, and legal.",
      "Build annual planning, OKRs, resource plans, business reviews, and decision milestones so bottlenecks surface without ad-hoc reporting.",
    ],
  },
  {
    id: "apple-india",
    company: "Apple",
    title: "Strategic Operations Program Manager",
    start: "Jun 2021",
    end: "Jun 2022",
    scopeLine:
      "iPhone India. $2B to $10B revenue ramp. Operating system for site, supplier, line, and demand.",
    bullets: [
      "Drive the zero-to-one operating system for iPhone manufacturing in India under exacting quality, regulatory, and timing requirements.",
      "The ramp that operating system ran: revenue $2B to $10B, units 4.3M to 16.9M, exports expanded from 6 to 40+ countries.",
    ],
  },
  {
    id: "tesla-4680",
    company: "Tesla",
    title: "Program Manager, Special Projects",
    start: "Jun 2018",
    end: "Jun 2021",
    scopeLine:
      "Took 4680 / Roadrunner from cell pilot to production-ready. Warehouse on Wheels at $3.5M/month.",
    bullets: [
      "Advance Project Roadrunner from early battery-cell pilot toward a production-ready platform.",
      "Install stage gates, readiness reviews, supplier coordination, and cross-functional launch ownership across engineering, production, and supply chain.",
      "Sustained Model 3 / Model Y rates through demand surges and supply disruptions.",
      "Designed and launched a $3.5M/month Warehouse on Wheels logistics platform protecting battery and drivetrain flow.",
    ],
  },
  {
    id: "amazon",
    company: "Amazon",
    title: "Operations Area Manager",
    start: "Mar 2017",
    end: "Apr 2018",
    scopeLine: "High-volume fulfillment. Frontline ops leadership, 100+ associates.",
    bullets: [
      "Led a team of 100+ associates in a high-volume fulfillment center.",
    ],
  },
];

export const contact: Contact = {
  email: "jarrodtran@outlook.com",
  linkedin: "https://www.linkedin.com/in/jarrodtran/",
  resumePdf: "/resume.pdf",
  location: "Houston",
  education:
    "B.S. Business Administration, Finance, University at Buffalo, cum laude",
};

export const site: Site = {
  origin: "https://jarrodtran.com",
  lang: "en",
  // Eng refreshes the asset; dimensions must match the file.
  ogImage: { path: "/og.png", width: 1200, height: 630 },
};

/**
 * Recruiter scan path, top to bottom: Hero → Experience → Fit → Footer.
 * Object order here is render order and nav order. `navLabel` is omitted for
 * the hero (the header wordmark links to top).
 */
export const sections: Record<SectionId, SectionMeta> = {
  hero: { id: "hero", heading: hero.name },
  experience: {
    id: "experience",
    heading: "Experience",
    navLabel: "Experience",
  },
  roles: { id: "roles", heading: "Where I fit", navLabel: "Fit" },
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
  experience: {
    dateRangeSeparator: "–",
  },
};

/**
 * Ship gate, independent of TODO_COPY. Flip to true only when Jarrod locks
 * metrics/title AND the real resume.pdf is in public/. Robots stays
 * `noindex, nofollow` until both this is true and no placeholders remain.
 */
export const siteIndexable = true;
