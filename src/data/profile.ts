/**
 * Centralized profile data for Muhammad Kashif Latif.
 * Edit values here to update the entire portfolio.
 */

export const profile = {
  name: "Muhammad Kashif Latif",
  initials: "MKL",
  age: 20,
  location: "Pakistan",
  university: "Minhaj University Lahore",
  degree: "BS Computer Science",
  academicStage: "Fourth Semester (approx.)",
  tagline: "AI Engineer & Full Stack Developer",
  heroSubtitle:
    "BS Computer Science student building intelligent software, scalable web applications, automation systems, and AI-powered products.",
  positioning:
    "A fast-growing Computer Science student and developer building a strong intersection between software engineering, full-stack development, machine learning, and modern AI systems.",
  rotatingRoles: [
    "AI Engineer",
    "Full Stack Developer",
    "AI Automation Developer",
    "Generative AI Developer",
    "Agentic AI Enthusiast",
  ],
  focusAreas: [
    "Deep Learning",
    "LLMs",
    "Fine-Tuning",
    "AI Automation",
    "Generative AI",
    "Agentic AI",
    "Production AI Systems",
  ],
  quickIntro:
    "I'm a Computer Science student focused on Artificial Intelligence, Full Stack Development, Machine Learning, AI Automation, Generative AI, and Agentic Systems. I believe in building real-world projects over collecting certificates — practical depth is the foundation I'm constructing for a long-term career in AI engineering.",
  philosophy: "Learn deeply. Build practically. Ship consistently.",
  philosophyDetails: [
    "Real-world projects over passive learning",
    "Step-by-step progression from fundamentals to advanced systems",
    "Practical coding as the primary vehicle for understanding",
    "Technical depth rather than surface-level familiarity",
    "Beginner-to-advanced structured pathways",
    "Interview preparation as a continuous habit",
    "Continuous improvement through deliberate practice",
  ],
  personalStory: [
    "I'm highly ambitious and career-focused — I'd rather learn the difficult technical concept than take a shortcut around it. I enjoy building real-world projects and I believe practical experience is far more valuable than collecting random certificates.",
    "I'm constructing a strong technical foundation that spans software engineering and AI. My goal is to become a professional AI Engineer and Full Stack Developer, with a particular interest in AI automation, generative AI, and agentic systems.",
    "Long-term, I want to build intelligent products and potentially create technology businesses — software that solves real problems at scale, powered by the systems I'm learning to design today.",
  ],
  careerVision: [
    "Become a professional AI Engineer",
    "Become a strong Full Stack Developer",
    "Build production-grade AI systems",
    "Work deeply with Large Language Models",
    "Develop AI automation workflows",
    "Build Agentic AI applications",
    "Learn Machine Learning & Deep Learning professionally",
    "Secure a high-impact international software or AI engineering role",
    "Build AI-based products and businesses",
  ],
  currentFocus:
    "Currently focused on Deep Learning, LLMs, Fine-Tuning, AI Automation, Generative AI, Agentic AI, and Production AI Systems.",
} as const;

export type Profile = typeof profile;

/**
 * Centralized site configuration.
 * Edit values here to update contact / social URLs across the site.
 * Replace the placeholder values with your real ones.
 */
export const siteConfig = {
  name: profile.name,
  shortName: "MKL",
  url: "https://kashif-latif.dev",
  description: profile.heroSubtitle,
  ogImage: "/og-image.png",
  email: "kashif.latif2004@gmail.com",
  phone: "+92 314 4253900",
  social: {
    github: "https://github.com/kashif-Latif",
    githubUsername: "kashif-Latif",
    linkedin: "https://www.linkedin.com/in/m-kashif-latif-91070729a",
  },
  resumes: [
    {
      id: "ai-engineer",
      title: "AI Engineer Resume",
      description: "Focused on AI, ML, and automation roles — highlights deep learning, LLMs, and agentic AI work.",
      fileName: "Muhammad_Kashif_Latif_AI_Engineer_Resume.pdf",
      path: "/resumes/Muhammad_Kashif_Latif_AI_Engineer_Resume.pdf",
      accent: "blue" as const,
    },
    {
      id: "fullstack",
      title: "Full Stack Developer Resume",
      description: "Focused on software & web engineering — highlights React, Next.js, Node.js, Django, and databases.",
      fileName: "Muhammad_Kashif_Latif_FullStack_Developer_Resume.pdf",
      path: "/resumes/Muhammad_Kashif_Latif_FullStack_Developer_Resume.pdf",
      accent: "cyan" as const,
    },
    {
      id: "combined",
      title: "Combined Software + AI Resume",
      description: "The complete picture — both software engineering and AI work in one document. Best for hybrid roles.",
      fileName: "Muhammad_Kashif_Latif_Combined_Software_AI_Resume.pdf",
      path: "/resumes/Muhammad_Kashif_Latif_Combined_Software_AI_Resume.pdf",
      accent: "purple" as const,
    },
  ],
  githubStats: {
    repositories: "40+",
    contributions: "10,000+",
    stars: "100+",
    note: "Stats reflect activity across all public + private repositories.",
  },
  famousQuote: {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Build a Gmail compose URL that opens Gmail in the browser with the
 * "To" field pre-filled with the given email (and optional subject).
 *
 * Falls back to a standard mailto: link if Gmail is unavailable.
 *
 * Usage:
 *   <a href={gmailComposeUrl("kashif.latif2004@gmail.com", "Hello")}>Email me</a>
 */
export function gmailComposeUrl(email: string, subject?: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email,
  });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/**
 * Standard mailto: link — opens the user's default email client.
 */
export function mailtoUrl(email: string, subject?: string): string {
  if (subject) return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  return `mailto:${email}`;
}
