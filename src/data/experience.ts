/**
 * Professional experience & education.
 *
 * Single source of truth — the About page, the Home page strip and the
 * JSON-LD in layout.tsx all read from here. Add a role at the top of
 * `workExperience` and every surface updates.
 */

import { AccentColor } from "@/lib/accents";

export interface WorkEntry {
  id: string;
  company: string;
  role: string;
  /** Displayed in the period pill, e.g. "2026 — Present". */
  period: string;
  /** Short duration label, e.g. "6 months". */
  duration: string;
  location: string;
  current: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
  accent: AccentColor;
}

export interface EducationEntry {
  id: string;
  institution: string;
  qualification: string;
  /** Displayed in the period pill. */
  period: string;
  note: string;
  accent: AccentColor;
}

export const workExperience: WorkEntry[] = [
  {
    id: "grohub",
    company: "Gro Hub Solutions",
    role: "Full Stack Developer",
    period: "2026 — Present",
    duration: "6 months",
    location: "Lahore, Pakistan",
    current: true,
    summary:
      "Building the AI and internal software layer for a multi-company retail and manufacturing group — three Shopify storefronts, a garment factory, and eight shops running as a single operating unit.",
    highlights: [
      "Built and shipped AI sales chatbots for three Shopify storefronts — Trenzee Cosmetics, Little Minors and TopShop.",
      "Automated the operations around those stores so the bots handle customer conversations end to end.",
      "Currently building the group-wide ERP covering the factory, the HUB department, FS Trader and eight retail shops under one unit.",
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Python",
      "Supabase",
      "PostgreSQL",
      "Shopify API",
      "LLM APIs",
      "Automation",
    ],
    accent: "amber",
  },
];

export const education: EducationEntry[] = [
  {
    id: "minhaj",
    institution: "Minhaj University Lahore",
    qualification: "BS Computer Science",
    period: "4th Sem.",
    note: "In progress — software engineering, data structures & systems fundamentals.",
    accent: "rust",
  },
];

/** Total professional experience, for the hero and stat rows. */
export const experienceSummary = {
  label: "6 months",
  role: "Full Stack Developer",
  company: "Gro Hub Solutions",
} as const;
