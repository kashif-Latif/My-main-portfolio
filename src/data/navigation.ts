/**
 * Centralized navigation configuration.
 * Each route corresponds to a "page" rendered by the in-app router.
 */

export type RouteId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "journey"
  | "github"
  | "contact";

export interface NavItem {
  id: RouteId;
  label: string;
  shortLabel?: string;
  description: string;
  /** Optional icon name from lucide-react */
  icon: string;
}

export const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    description: "Cinematic introduction & current focus",
    icon: "Home",
  },
  {
    id: "about",
    label: "About",
    shortLabel: "About",
    description: "Story, vision & learning philosophy",
    icon: "User",
  },
  {
    id: "skills",
    label: "Skills",
    shortLabel: "Skills",
    description: "Interactive technology constellation",
    icon: "Cpu",
  },
  {
    id: "projects",
    label: "Projects",
    shortLabel: "Work",
    description: "Featured builds & case studies",
    icon: "FolderGit2",
  },
  {
    id: "journey",
    label: "Journey",
    shortLabel: "Journey",
    description: "From web foundations to agentic AI",
    icon: "Route",
  },
  {
    id: "github",
    label: "GitHub",
    shortLabel: "Code",
    description: "Developer activity & achievements",
    icon: "Github",
  },
  {
    id: "contact",
    label: "Contact",
    shortLabel: "Contact",
    description: "Let's build something intelligent",
    icon: "Send",
  },
];

export const routeOrder: RouteId[] = navItems.map((n) => n.id);

export function getNav(id: RouteId): NavItem {
  return navItems.find((n) => n.id === id) ?? navItems[0];
}
