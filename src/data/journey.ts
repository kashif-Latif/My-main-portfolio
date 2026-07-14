/**
 * AI Journey / Learning Roadmap data.
 * Drives the cinematic scroll-timeline on the Journey page.
 */

export type JourneyStageStatus = "complete" | "active" | "future";

export interface JourneyStage {
  id: string;
  index: number;
  title: string;
  status: JourneyStageStatus;
  subtitle: string;
  description: string;
  items: string[];
  accent: "blue" | "purple" | "cyan" | "gold";
}

export const journeyStages: JourneyStage[] = [
  {
    id: "foundation",
    index: 1,
    title: "Foundation",
    status: "complete",
    subtitle: "Programming fundamentals",
    description:
      "Where everything started — the bedrock of programming literacy. Languages, syntax, control flow and the mental models that everything else builds on.",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "Programming fundamentals",
      "C",
      "C++",
      "Java",
      "Python",
    ],
    accent: "blue",
  },
  {
    id: "web-development",
    index: 2,
    title: "Web Development",
    status: "complete",
    subtitle: "Full-stack web foundations",
    description:
      "Building real, deployable web apps — from Node.js and Django backends to React/Next.js frontends, databases and authentication.",
    items: [
      "Node.js",
      "Express.js",
      "Django",
      "Django REST Framework",
      "React",
      "Next.js",
      "REST APIs",
      "Databases",
      "Authentication",
      "Deployment",
    ],
    accent: "cyan",
  },
  {
    id: "machine-learning",
    index: 3,
    title: "Machine Learning",
    status: "complete",
    subtitle: "Classical ML",
    description:
      "Hands-on classical ML — preparing data, training models and evaluating them honestly across multiple algorithm families.",
    items: [
      "Python for AI",
      "Data preparation",
      "Classical ML",
      "Random Forest",
      "Decision Trees",
      "Logistic Regression",
      "Naive Bayes",
      "SVM",
    ],
    accent: "purple",
  },
  {
    id: "deep-learning",
    index: 4,
    title: "Deep Learning",
    status: "active",
    subtitle: "Currently learning",
    description:
      "Stepping into neural networks — architectures, training dynamics and the intuitions that separate deep learning from classical ML.",
    items: [
      "Neural Networks",
      "Deep Learning concepts",
      "Model training",
    ],
    accent: "blue",
  },
  {
    id: "generative-ai",
    index: 5,
    title: "Generative AI",
    status: "active",
    subtitle: "Current & future focus",
    description:
      "Working with large language models — from prompt engineering through fine-tuning toward building real generative AI applications.",
    items: [
      "LLMs",
      "Prompt Engineering",
      "Fine-Tuning",
      "AI applications",
    ],
    accent: "purple",
  },
  {
    id: "ai-automation",
    index: 6,
    title: "AI Automation",
    status: "future",
    subtitle: "Production AI focus",
    description:
      "Turning AI capabilities into intelligent automated workflows — API integration, automation pipelines and production AI systems.",
    items: [
      "Intelligent workflows",
      "API integration",
      "Automation",
      "Production AI systems",
    ],
    accent: "cyan",
  },
  {
    id: "agentic-ai",
    index: 7,
    title: "Agentic AI",
    status: "future",
    subtitle: "Long-term focus",
    description:
      "The frontier — AI agents that use tools, reason across multiple steps and execute tasks autonomously, eventually coordinating as multi-agent systems.",
    items: [
      "AI agents",
      "Tool-using systems",
      "Multi-step reasoning workflows",
      "Autonomous task execution",
      "Multi-agent systems",
    ],
    accent: "gold",
  },
];

export const currentlyExploring = [
  "Neural network architectures",
  "LLM fine-tuning techniques",
  "AI automation workflows",
  "Agentic AI design patterns",
  "Production-grade ML pipelines",
];
