/**
 * Centralized skills data.
 * Categories drive the Skills page layout and constellation.
 *
 * status:
 *  - "mastered"     -> existing solid knowledge (use sparingly & honestly)
 *  - "proficient"   -> working knowledge, can ship production features
 *  - "learning"     -> currently learning
 *  - "future"       -> planned future specialization
 */

export type SkillStatus = "mastered" | "proficient" | "learning" | "future";

export interface Skill {
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  description: string;
  /** 0 - 100 weight for visualization radius (not a "mastery %" — it's visual emphasis) */
  weight: number;
  /** Relevant project IDs (matched against projects.ts) */
  relatedProjects?: string[];
}

export type SkillCategory =
  | "Programming Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "DevOps & Tools"
  | "AI & Machine Learning";

export interface SkillCategoryMeta {
  name: SkillCategory;
  description: string;
  accent: "blue" | "purple" | "cyan" | "gold";
}

export const skillCategories: SkillCategoryMeta[] = [
  {
    name: "Programming Languages",
    description: "Core languages used across software & AI work.",
    accent: "blue",
  },
  {
    name: "Frontend",
    description: "Interfaces, design systems & 3D experiences for the web.",
    accent: "cyan",
  },
  {
    name: "Backend",
    description: "APIs, services & server-side architecture.",
    accent: "purple",
  },
  {
    name: "Databases",
    description: "Relational & serverless data layers.",
    accent: "gold",
  },
  {
    name: "DevOps & Tools",
    description: "Tooling, deployment & developer workflow.",
    accent: "blue",
  },
  {
    name: "AI & Machine Learning",
    description: "Classical ML through modern agentic systems.",
    accent: "purple",
  },
];

export const skills: Skill[] = [
  // ===== Programming Languages =====
  { name: "Python", category: "Programming Languages", status: "proficient", weight: 90, description: "Primary language for AI/ML, automation & backend work.", relatedProjects: ["ml-predictions", "ai-chatbot"] },
  { name: "JavaScript", category: "Programming Languages", status: "proficient", weight: 88, description: "Core language for web — frontend & Node.js backend.", relatedProjects: ["nextbox", "university-lms", "portfolio"] },
  { name: "C", category: "Programming Languages", status: "proficient", weight: 70, description: "Systems fundamentals, embedded work & memory awareness." },
  { name: "C++", category: "Programming Languages", status: "proficient", weight: 65, description: "OOP, performance-critical thinking & data structures." },
  { name: "Java", category: "Programming Languages", status: "proficient", weight: 60, description: "OOP, structured programming & academic foundations." },

  // ===== Frontend =====
  { name: "HTML", category: "Frontend", status: "mastered", weight: 90, description: "Semantic structure & accessibility foundations." },
  { name: "CSS", category: "Frontend", status: "mastered", weight: 85, description: "Modern layout, animations & responsive design." },
  { name: "React", category: "Frontend", status: "proficient", weight: 85, description: "Component architecture, hooks & state management.", relatedProjects: ["nextbox", "university-lms", "portfolio"] },
  { name: "Next.js", category: "Frontend", status: "proficient", weight: 85, description: "App Router, RSC, SEO & full-stack patterns.", relatedProjects: ["nextbox", "portfolio"] },
  { name: "Tailwind CSS", category: "Frontend", status: "mastered", weight: 90, description: "Utility-first styling & design tokens.", relatedProjects: ["nextbox", "portfolio"] },
  { name: "Three.js", category: "Frontend", status: "learning", weight: 60, description: "Low-level WebGL abstraction for 3D scenes.", relatedProjects: ["portfolio"] },
  { name: "React Three Fiber", category: "Frontend", status: "learning", weight: 55, description: "Declarative Three.js for React.", relatedProjects: ["portfolio"] },

  // ===== Backend =====
  { name: "Node.js", category: "Backend", status: "proficient", weight: 82, description: "JavaScript runtime for APIs & services.", relatedProjects: ["nextbox", "university-lms"] },
  { name: "Express.js", category: "Backend", status: "proficient", weight: 78, description: "Minimal Node.js framework for REST APIs." },
  { name: "Django", category: "Backend", status: "proficient", weight: 75, description: "Batteries-included Python web framework.", relatedProjects: ["university-lms"] },
  { name: "Django REST Framework", category: "Backend", status: "proficient", weight: 70, description: "DRF for building RESTful APIs in Django." },
  { name: "REST APIs", category: "Backend", status: "proficient", weight: 82, description: "Designing, building & consuming RESTful services.", relatedProjects: ["nextbox", "university-lms", "api-webapps"] },

  // ===== Databases =====
  { name: "SQL", category: "Databases", status: "proficient", weight: 80, description: "Relational query language fundamentals." },
  { name: "MySQL", category: "Databases", status: "proficient", weight: 75, description: "Open-source relational database." },
  { name: "PostgreSQL", category: "Databases", status: "learning", weight: 65, description: "Advanced relational database with rich types." },
  { name: "Supabase", category: "Databases", status: "learning", weight: 60, description: "Serverless Postgres with auth & realtime." },
  { name: "Prisma", category: "Databases", status: "proficient", weight: 70, description: "Type-safe ORM for Node.js & TypeScript.", relatedProjects: ["nextbox"] },

  // ===== DevOps & Tools =====
  { name: "Git", category: "DevOps & Tools", status: "proficient", weight: 88, description: "Version control & collaborative workflows." },
  { name: "GitHub", category: "DevOps & Tools", status: "proficient", weight: 88, description: "Pull requests, issues & code review." },
  { name: "Linux", category: "DevOps & Tools", status: "proficient", weight: 78, description: "Daily-driver shell & server environments." },
  { name: "Docker", category: "DevOps & Tools", status: "learning", weight: 55, description: "Containerization for reproducible environments." },
  { name: "Vercel", category: "DevOps & Tools", status: "proficient", weight: 75, description: "Edge deployment for Next.js & frontend apps." },
  { name: "VS Code", category: "DevOps & Tools", status: "mastered", weight: 92, description: "Primary editor with deep keybinding muscle memory." },

  // ===== AI & Machine Learning =====
  { name: "Python for AI", category: "AI & Machine Learning", status: "proficient", weight: 85, description: "NumPy, pandas, scikit-learn workflows." },
  { name: "ML Fundamentals", category: "AI & Machine Learning", status: "proficient", weight: 78, description: "Supervised learning, evaluation & pipelines." },
  { name: "Random Forest", category: "AI & Machine Learning", status: "proficient", weight: 72, description: "Ensemble tree methods — used in practical projects.", relatedProjects: ["ml-predictions"] },
  { name: "Decision Trees", category: "AI & Machine Learning", status: "proficient", weight: 75, description: "Tree-based classification & regression.", relatedProjects: ["ml-predictions"] },
  { name: "Logistic Regression", category: "AI & Machine Learning", status: "proficient", weight: 75, description: "Linear classification baseline.", relatedProjects: ["ml-predictions"] },
  { name: "Naive Bayes", category: "AI & Machine Learning", status: "proficient", weight: 70, description: "Probabilistic classifier for text & beyond.", relatedProjects: ["ml-predictions"] },
  { name: "Support Vector Machines", category: "AI & Machine Learning", status: "proficient", weight: 70, description: "Margin-based classification.", relatedProjects: ["ml-predictions"] },
  { name: "Neural Networks", category: "AI & Machine Learning", status: "learning", weight: 60, description: "Forward & backpropagation, architectures." },
  { name: "Deep Learning", category: "AI & Machine Learning", status: "learning", weight: 55, description: "Multi-layer networks & training dynamics." },
  { name: "LLMs", category: "AI & Machine Learning", status: "learning", weight: 55, description: "Large Language Model architectures & usage." },
  { name: "Fine-Tuning", category: "AI & Machine Learning", status: "learning", weight: 45, description: "Adapting pretrained models to specific tasks." },
  { name: "Prompt Engineering", category: "AI & Machine Learning", status: "proficient", weight: 70, description: "Designing prompts for reliable LLM behaviour." },
  { name: "AI Automation", category: "AI & Machine Learning", status: "learning", weight: 55, description: "Building intelligent automated workflows." },
  { name: "Generative AI", category: "AI & Machine Learning", status: "learning", weight: 55, description: "Producing text, code & media with AI models." },
  { name: "Agentic AI", category: "AI & Machine Learning", status: "future", weight: 45, description: "Tool-using autonomous agents & multi-step reasoning." },
];

export const statusMeta: Record<
  SkillStatus,
  { label: string; description: string; accent: "blue" | "purple" | "cyan" | "gold" }
> = {
  mastered: {
    label: "Solid",
    description: "Established working knowledge — can ship confidently.",
    accent: "cyan",
  },
  proficient: {
    label: "Proficient",
    description: "Working knowledge — actively used in projects.",
    accent: "blue",
  },
  learning: {
    label: "Learning",
    description: "Currently studying & experimenting.",
    accent: "purple",
  },
  future: {
    label: "Future",
    description: "Planned specialization area.",
    accent: "gold",
  },
};

export function getSkillsByCategory(cat: SkillCategory): Skill[] {
  return skills.filter((s) => s.category === cat);
}
