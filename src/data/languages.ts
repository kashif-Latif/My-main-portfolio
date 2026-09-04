/**
 * Languages & Tools — based on actual GitHub profile README.
 * Each entry includes a devicon URL for the tech logo.
 */

export interface TechItem {
  name: string;
  /** Devicon class name (e.g. "javascript") used to fetch the icon */
  icon: string;
  category: "Language" | "Framework" | "Database" | "Tool" | "Platform";
}

export const languagesAndTools: TechItem[] = [
  // Languages
  { name: "JavaScript", icon: "javascript", category: "Language" },
  { name: "TypeScript", icon: "typescript", category: "Language" },
  { name: "Python", icon: "python", category: "Language" },
  { name: "Java", icon: "java", category: "Language" },
  { name: "C++", icon: "cplusplus", category: "Language" },
  { name: "HTML5", icon: "html5", category: "Language" },
  { name: "CSS", icon: "css3", category: "Language" },

  // Frameworks
  { name: "React", icon: "react", category: "Framework" },
  { name: "Next.js", icon: "nextjs", category: "Framework" },
  { name: "Node.js", icon: "nodejs", category: "Framework" },
  { name: "Django", icon: "django", category: "Framework" },
  { name: "Express", icon: "express", category: "Framework" },
  { name: "FastAPI", icon: "fastapi", category: "Framework" },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "Framework" },
  { name: "Bootstrap", icon: "bootstrap", category: "Framework" },

  // Databases
  { name: "MongoDB", icon: "mongodb", category: "Database" },
  { name: "MySQL", icon: "mysql", category: "Database" },
  { name: "Firebase", icon: "firebase", category: "Database" },
  { name: "Oracle", icon: "oracle", category: "Database" },

  // AI / Data
  { name: "NumPy", icon: "numpy", category: "Tool" },
  { name: "Pandas", icon: "pandas", category: "Tool" },

  // Tools
  { name: "VS Code", icon: "vscode", category: "Tool" },
  { name: "Git", icon: "git", category: "Tool" },
  { name: "Figma", icon: "figma", category: "Tool" },
  { name: "Qt", icon: "qt", category: "Tool" },
  { name: "WordPress", icon: "wordpress", category: "Tool" },
  { name: "Arduino", icon: "arduino", category: "Tool" },
  { name: "Android Studio", icon: "androidstudio", category: "Tool" },

  // Platforms
  { name: "AWS", icon: "amazonwebservices", category: "Platform" },
  { name: "LinkedIn", icon: "linkedin", category: "Platform" },
];

export const techCategoryOrder: TechItem["category"][] = [
  "Language",
  "Framework",
  "Database",
  "Tool",
  "Platform",
];

export function getTechByCategory(cat: TechItem["category"]): TechItem[] {
  return languagesAndTools.filter((t) => t.category === cat);
}
