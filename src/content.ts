export type Audience =
  | "big-tech"
  | "ai-startup"
  | "defense"
  | "robotics"
  | "venture";

export type Profile = {
  name: string;
  primaryTitle: string;
  positioning: string;
  location: string;
  email: string;
  linkedin: string;
  resumePdf: string;
  employers: string[];
  github?: string;
  availability?: string;
  clearance?: string;
};

export type Role = {
  id: string;
  label: string;
  primary: boolean;
  fit: string;
  audiences: Audience[];
};

export type ProofPoint = {
  metric: string;
  label: string;
};

export type Highlight = {
  outcome: string;
  scope: string;
  how: string;
  audiences: Audience[];
};

export type Experience = {
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  scopeLine: string;
  bullets: string[];
  url?: string;
};

export type Site = {
  title: string;
  description: string;
  origin: string;
  basePath: string;
};

// Edit this file to replace TODOs with real copy. Optional fields (github,
// availability, clearance) stay omitted unless they help the hunt.

export const profile: Profile = {
  name: "Jarrod Tran",
  primaryTitle: "AI Strategy and Operations Leader",
  positioning:
    "I turn AI from a pilot into operating cadence for executive teams.",
  location: "TODO: City, ST",
  email: "todo@example.com",
  linkedin: "https://www.linkedin.com/in/todo",
  resumePdf: "/resume.pdf",
  employers: [
    "[TODO] Company One",
    "[TODO] Company Two",
    "[TODO] Company Three",
  ],
};

export const roles: Role[] = [
  {
    id: "ai-enablement",
    label: "AI Enablement Strategy and Ops",
    primary: true,
    fit: "TODO: one sentence on why this is the primary slot.",
    audiences: ["ai-startup", "big-tech", "defense", "robotics"],
  },
  {
    id: "bizops",
    label: "Business Operations",
    primary: false,
    fit: "TODO: one sentence on bizops fit.",
    audiences: ["big-tech", "ai-startup"],
  },
  {
    id: "cos",
    label: "Chief of Staff",
    primary: false,
    fit: "TODO: one sentence on chief-of-staff fit.",
    audiences: ["ai-startup", "defense", "robotics"],
  },
  {
    id: "vc",
    label: "VC Platform",
    primary: false,
    fit: "TODO: one sentence on venture platform/ops fit.",
    audiences: ["venture"],
  },
];

export const targetingLine = `Also a fit for: ${roles
  .filter((role) => !role.primary)
  .map((role) => role.label)
  .join(", ")}.`;

export const proof: ProofPoint[] = [
  {
    metric: "XX%",
    label:
      "TODO: scope and result (e.g. 400 sellers adopted; turnaround down 35%)",
  },
  {
    metric: "$X.XM",
    label: "TODO: budget, P&L, or savings owned, plus the business result",
  },
  {
    metric: "N",
    label: "TODO: org, market, or program scale plus the outcome",
  },
];

export const highlights: Highlight[] = [
  {
    outcome:
      "TODO: outcome with a number (e.g. Cut proposal cycle time 35% for 400 sellers).",
    scope: "TODO: reported to [role]; N people; $X budget; timeframe.",
    how: "TODO: one line on how — the operating move, not the task list.",
    audiences: ["ai-startup", "big-tech"],
  },
  {
    outcome: "TODO: second outcome with a number.",
    scope: "TODO: reporting line, org size, budget, timeframe.",
    how: "TODO: one line on how.",
    audiences: ["defense", "robotics"],
  },
  {
    outcome: "TODO: third outcome with a number.",
    scope: "TODO: reporting line, org size, budget, timeframe.",
    how: "TODO: one line on how.",
    audiences: ["venture", "ai-startup"],
  },
];

export const experience: Experience[] = [
  {
    company: "[TODO] Most recent company",
    title: "[TODO] Title",
    start: "2023",
    end: "Present",
    location: "[TODO] City",
    scopeLine: "TODO: reported to CEO; 4 reports; $12M plan",
    bullets: [
      "TODO: outcome-led bullet first (number + result).",
      "TODO: second bullet, still outcome-first.",
    ],
  },
  {
    company: "[TODO] Prior company",
    title: "[TODO] Title",
    start: "2020",
    end: "2023",
    location: "[TODO] City",
    scopeLine: "TODO: reporting line; team size; budget or mandate",
    bullets: [
      "TODO: outcome-led bullet first.",
      "TODO: second bullet.",
    ],
  },
];

export const site: Site = {
  title: `${profile.name} — ${profile.primaryTitle}`,
  description: profile.positioning,
  origin: "https://jarrodtran.github.io",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};
