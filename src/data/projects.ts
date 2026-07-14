/**
 * Centralized project data — based on actual GitHub repositories.
 * Live demo links are wired up where available.
 */

export type ProjectCategory =
  | "AI"
  | "Machine Learning"
  | "Full Stack"
  | "Backend"
  | "Embedded Systems"
  | "Web"
  | "Automation";

export type ProjectStatus =
  | "shipped"
  | "in-progress"
  | "experimental"
  | "planned";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  challenges: string[];
  learnings: string[];
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  role: string;
  featured: boolean;
  github?: string;
  demo?: string;
  gallery?: string[];
  video?: string;
  weight: number;
}

export const projectCategories: ProjectCategory[] = [
  "AI",
  "Machine Learning",
  "Full Stack",
  "Backend",
  "Embedded Systems",
  "Web",
  "Automation",
];

export const projects: Project[] = [
  // ===== FLAGSHIP: Face Recognition =====
  {
    id: "face-recognition-access",
    title: "Face Recognition Smart Access Control System",
    tagline: "Edge AI for physical access — ESP32-CAM + face recognition.",
    description:
      "A smart access control system that uses real-time face recognition on an ESP32-CAM to identify authorized users and grant or deny physical access via a servo-driven lock. The system surfaces status on an OLED display and provides audible feedback through LEDs and a buzzer.",
    problem:
      "Traditional keyed and RFID access systems don't verify identity — only possession. The goal was a low-cost, offline-capable access controller that recognizes a person's face before unlocking.",
    solution:
      "Built an embedded pipeline on the ESP32-CAM that initializes the camera, enrolls faces through the CameraWebServer flow, runs face recognition on-device, and actuates a servo motor to release the lock on a match. Status, errors and enrollment feedback are surfaced on an OLED display, with LEDs and a buzzer providing immediate feedback.",
    challenges: [
      "Configuring ESP32 board packages and FTDI connections for reliable flashing",
      "Initializing the camera module and resolving driver/pointer issues",
      "Stabilizing face enrollment under variable lighting conditions",
      "Mapping recognition output to physical actuation with debouncing",
      "Debugging the full hardware-software loop end-to-end",
    ],
    learnings: [
      "ESP32 toolchain, board packages & flashing workflows",
      "Camera initialization and CameraWebServer usage",
      "Hardware debugging methodology under constrained resources",
      "Integrating ML inference with physical actuation",
      "Designing user feedback loops for embedded systems",
    ],
    stack: [
      "ESP32-CAM",
      "Arduino",
      "C/C++",
      "Servo Motor",
      "OLED Display",
      "CameraWebServer",
      "Wi-Fi",
      "Face Recognition",
    ],
    category: "Embedded Systems",
    status: "shipped",
    role: "Sole developer — hardware, firmware & integration",
    featured: true,
    weight: 100,
  },

  // ===== COMCAT UNIVERSITY (flagship full-stack) =====
  {
    id: "comcat-university",
    title: "COMCAT University",
    tagline: "Comprehensive university management portal with role-based access.",
    description:
      "A full-featured university management portal designed to handle all aspects of academic administration. Features role-based access for Administrators, Teachers, and Students — covering courses, enrollment, grading, attendance, and reporting.",
    problem:
      "Universities need a single, structured system to manage students, teachers, courses, and academic workflows — most existing tools are fragmented or too rigid.",
    solution:
      "Designed a TypeScript-based portal with role-based access control, course management, enrollment, grading, attendance tracking, and reporting. Built with a clean architecture that separates concerns across admin, teacher, and student surfaces.",
    challenges: [
      "Designing a normalized schema for students, teachers, courses & enrollments",
      "Role-based access control across three distinct user types",
      "Building intuitive admin and teacher workflows",
      "Ensuring data integrity across academic periods",
    ],
    learnings: [
      "Full-stack TypeScript architecture",
      "Role-based authorization patterns",
      "Complex domain modeling for academic systems",
      "Admin dashboard UX design",
    ],
    stack: ["TypeScript", "React", "Node.js", "REST APIs", "Database"],
    category: "Full Stack",
    status: "shipped",
    role: "Sole developer",
    featured: true,
    weight: 95,
    github: "https://github.com/kashif-Latif/Comcat-University",
    demo: "https://comcat-cms.vercel.app/",
  },

  // ===== LUMINA LUXE (e-commerce flagship) =====
  {
    id: "lumina-luxe",
    title: "Lumina Luxe — E-Commerce Store",
    tagline: "Premium e-commerce with 800+ items, admin & user portals.",
    description:
      "An e-commerce website with 800+ items in the inventory, featuring dedicated portals for both admin and user sides with a fantastic, friendly UI. Includes product catalog, cart, checkout, and inventory management.",
    problem:
      "Most e-commerce demos are toy stores with 5-10 products. The goal was a real-scale store with hundreds of items and proper admin tooling.",
    solution:
      "Built a TypeScript e-commerce platform with 800+ products, full admin portal for inventory management, and a polished user-facing storefront with cart, checkout, and order tracking.",
    challenges: [
      "Managing 800+ product entries with performant filtering",
      "Building an admin portal that doesn't compromise on UX",
      "Cart and checkout state integrity",
      "Image optimization at scale",
    ],
    learnings: [
      "Large-catalog data modeling",
      "Admin dashboard design patterns",
      "E-commerce UX best practices",
      "Performance optimization for big catalogs",
    ],
    stack: ["TypeScript", "React", "Node.js", "Tailwind CSS", "Database"],
    category: "Full Stack",
    status: "shipped",
    role: "Sole developer",
    featured: true,
    weight: 92,
    github: "https://github.com/kashif-Latif/Lumina-luxe-",
    demo: "https://lumina-luxe-store.vercel.app/",
  },

  // ===== AI DISH CRAFT =====
  {
    id: "ai-dish-craft",
    title: "AI Dish Craft",
    tagline: "AI-powered dish recommendation using similarity matching.",
    description:
      "An AI-powered recommendation system that takes user input, matches preferences using logic/similarity, and displays recommended dishes. Built as Project 3 (AI Recommendation Logic) — takes user preferences and surfaces intelligent matches.",
    problem:
      "Food recommendation systems need to balance user preferences, dietary constraints, and similarity scoring — not just keyword matching.",
    solution:
      "Implemented a recommendation engine that takes user input (tastes, dietary needs, cuisine preferences), computes similarity scores against a dish database, and returns ranked recommendations.",
    challenges: [
      "Designing a similarity scoring algorithm",
      "Handling ambiguous user preferences",
      "Ranking recommendations meaningfully",
    ],
    learnings: [
      "Recommendation system fundamentals",
      "Similarity scoring techniques",
      "User preference modeling",
    ],
    stack: ["JavaScript", "AI Logic", "Similarity Matching"],
    category: "AI",
    status: "shipped",
    role: "Sole developer",
    featured: true,
    weight: 88,
    github: "https://github.com/kashif-Latif/AI-Dish-craft",
    demo: "https://ai-dish-craft.vercel.app/",
  },

  // ===== TRUST MARK REAL ESTATE =====
  {
    id: "trust-mark-estate",
    title: "Trust Mark Real Estate Advisor",
    tagline: "Client-facing website for property listings & investment deals.",
    description:
      "A client-facing website designed to present property listings, investment deals, and company information in an elegant and professional manner. Built for Trust Mark Real Estate.",
    problem:
      "Real estate businesses need a polished, trustworthy online presence that surfaces properties and investment opportunities clearly.",
    solution:
      "Built a TypeScript-based real estate portal with property listings, investment deal showcases, and company information pages — designed for elegance and conversion.",
    challenges: [
      "Presenting property media elegantly",
      "Designing for trust and conversion",
      "Organizing large property catalogs",
    ],
    learnings: [
      "Client-facing UX design",
      "Real estate domain modeling",
      "Professional branding execution",
    ],
    stack: ["TypeScript", "React", "Tailwind CSS"],
    category: "Web",
    status: "shipped",
    role: "Sole developer",
    featured: true,
    weight: 80,
    github: "https://github.com/kashif-Latif/Trust-advisor-client-project-",
    demo: "https://trust-mark-estate.vercel.app/",
  },

  // ===== NEXWALK =====
  {
    id: "nexwalk",
    title: "NexWalk",
    tagline: "Modern TypeScript web application.",
    description:
      "A TypeScript-based web application showcasing modern frontend patterns and clean architecture.",
    problem:
      "Exploring modern TypeScript web application patterns with a focus on clean architecture and developer experience.",
    solution:
      "Built a TypeScript web app with modern tooling, focused on maintainability and clean code structure.",
    challenges: [
      "Modern TypeScript patterns",
      "Clean architecture enforcement",
    ],
    learnings: [
      "TypeScript best practices",
      "Modern build tooling",
    ],
    stack: ["TypeScript", "React"],
    category: "Web",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 70,
    github: "https://github.com/kashif-Latif/NexWalk",
    demo: "https://nex-walk.vercel.app/",
  },

  // ===== MY GPT CLONE =====
  {
    id: "gpt-clone",
    title: "My GPT Clone",
    tagline: "Conversational AI assistant inspired by ChatGPT.",
    description:
      "A TypeScript-built ChatGPT-style conversational AI assistant. Features a clean chat interface with streaming responses and contextual conversation management.",
    problem:
      "Building a usable ChatGPT-style clone requires more than a prompt box — it needs conversation management, streaming, and a polished UX.",
    solution:
      "Implemented a TypeScript chat application with streaming responses, conversation history, and a clean, responsive UI.",
    challenges: [
      "Streaming response handling",
      "Conversation context management",
      "Building a snappy chat UX",
    ],
    learnings: [
      "LLM API integration",
      "Streaming UX patterns",
      "Chat interface design",
    ],
    stack: ["TypeScript", "React", "LLM API"],
    category: "AI",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 75,
    github: "https://github.com/kashif-Latif/gpt_clone",
    demo: "https://my-gpt-clone.vercel.app/",
  },

  // ===== WALLET API =====
  {
    id: "wallet-api",
    title: "Wallet API",
    tagline: "TypeScript wallet API service (MIT licensed).",
    description:
      "A TypeScript-based wallet API service, MIT licensed. Designed as a backend service for managing wallet operations with clean API design.",
    problem:
      "Wallet operations need a clean, secure, and well-structured API surface.",
    solution:
      "Built a TypeScript wallet API with proper REST design, MIT licensed for open use.",
    challenges: [
      "Secure API design for financial operations",
      "Clean REST contract",
    ],
    learnings: [
      "REST API design",
      "Backend security patterns",
      "Open-source licensing",
    ],
    stack: ["TypeScript", "Node.js", "REST API"],
    category: "Backend",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 65,
    github: "https://github.com/kashif-Latif/wallet-API",
    demo: "https://wallet-api-olive.vercel.app/",
  },

  // ===== GYM API (Sigma-themed) =====
  {
    id: "gym-api",
    title: "Gym API — Sigma Fitness Ecosystem",
    tagline: "Minimalist fitness ecosystem with AI coaching & scheduling.",
    description:
      "A 'Sigma-themed' minimalist fitness ecosystem that supports AI coaching, structured training plans, and deep scheduling. Designed as a comprehensive backend API for fitness applications.",
    problem:
      "Fitness apps need a backend that can handle AI coaching, training plans, and complex scheduling in one coherent system.",
    solution:
      "Built a TypeScript fitness API with AI coaching endpoints, structured training plan management, and deep scheduling capabilities.",
    challenges: [
      "Modeling training plans and schedules",
      "Integrating AI coaching into the API surface",
      "Keeping the API minimalist yet capable",
    ],
    learnings: [
      "Domain-driven API design",
      "AI integration in backend services",
      "Scheduling system modeling",
    ],
    stack: ["TypeScript", "Node.js", "AI", "REST API"],
    category: "Backend",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 68,
    github: "https://github.com/kashif-Latif/Gym-API",
  },

  // ===== EMPLOYEE ATTRITION PREDICTION =====
  {
    id: "employee-attrition",
    title: "Employee Attrition Prediction",
    tagline: "AI model that predicts whether an employee will leave.",
    description:
      "An AI model that predicts whether an employee is likely to leave a company. Uses classification ML on HR data to surface attrition risk.",
    problem:
      "Employee turnover is costly — predicting attrition early lets companies intervene.",
    solution:
      "Built a Python ML classification model trained on HR data to predict attrition likelihood, with feature importance analysis.",
    challenges: [
      "Handling class imbalance in attrition data",
      "Feature engineering from HR records",
      "Interpretable predictions for HR teams",
    ],
    learnings: [
      "Classification model training",
      "Handling imbalanced datasets",
      "Feature importance analysis",
    ],
    stack: ["Python", "scikit-learn", "pandas", "NumPy"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 72,
    github: "https://github.com/kashif-Latif/Employee-Attrition-Prediction",
  },

  // ===== K-MEANS CLUSTERING =====
  {
    id: "kmeans-clustering",
    title: "K-Means Clustering — Stock Market Patterns",
    tagline: "Uncovering hidden behavioral patterns in stock market data.",
    description:
      "Applies K-Means clustering to daily stock market data to uncover hidden behavioral patterns in price movements and trading volume. Instead of tracking individual companies, each trading day is treated as an observation.",
    problem:
      "Stock market behavior is noisy — finding hidden patterns requires unsupervised techniques rather than prediction.",
    solution:
      "Applied K-Means clustering to daily stock market observations, surfacing distinct behavioral regimes in price and volume.",
    challenges: [
      "Feature selection for market data",
      "Choosing the right K",
      "Interpreting cluster meaning",
    ],
    learnings: [
      "Unsupervised learning techniques",
      "K-Means clustering in practice",
      "Financial data analysis",
    ],
    stack: ["Python", "scikit-learn", "pandas", "Matplotlib"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 70,
    github: "https://github.com/kashif-Latif/K-Means-Clustering-Model",
  },

  // ===== LINEAR REGRESSION =====
  {
    id: "linear-regression",
    title: "Linear Regression — Electricity Bill Predictor",
    tagline: "Predict monthly electricity bill (PKR) using Linear Regression.",
    description:
      "Predicts monthly electricity bill (PKR) using Linear Regression and visualizes results with Matplotlib. Takes real household inputs, predicts electricity cost, and plots performance graphs.",
    problem:
      "Households can't easily forecast their electricity costs — a simple predictor helps with budgeting.",
    solution:
      "Built a Python Linear Regression model that takes household appliance usage as input and predicts the monthly bill in PKR, with Matplotlib visualizations.",
    challenges: [
      "Collecting clean household usage data",
      "Choosing relevant features",
      "Visualizing model performance",
    ],
    learnings: [
      "Linear Regression fundamentals",
      "Feature engineering",
      "Matplotlib visualization",
    ],
    stack: ["Python", "scikit-learn", "Matplotlib", "pandas"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 65,
    github: "https://github.com/kashif-Latif/Linear-reagression-Model",
  },

  // ===== DECISION TREE =====
  {
    id: "decision-tree",
    title: "Decision Tree — Electricity Bill Classifier",
    tagline: "Decision Tree Regressor for electricity cost estimation.",
    description:
      "Predicts monthly electricity bill (PKR) using a Decision Tree Regressor based on household appliance usage, with automatic performance visualization.",
    problem:
      "Linear models can miss non-linear relationships in household energy usage — decision trees capture those.",
    solution:
      "Built a Python Decision Tree Regressor for electricity bill prediction, with automatic graph updates.",
    challenges: [
      "Tree depth tuning",
      "Avoiding overfitting",
    ],
    learnings: [
      "Decision Tree intuition",
      "Tree pruning concepts",
      "Model comparison",
    ],
    stack: ["Python", "scikit-learn", "Matplotlib"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 62,
    github: "https://github.com/kashif-Latif/Classify-decision-tree",
  },

  // ===== SVM CLASSIFIER =====
  {
    id: "svm-classifier",
    title: "SVM — Student Pass/Fail Predictor",
    tagline: "SVM model to predict student pass/fail outcomes.",
    description:
      "A simple machine learning project using Support Vector Machine (SVM) to predict whether a student will PASS or FAIL based on study habits and previous exam performance.",
    problem:
      "Identifying at-risk students early enables intervention.",
    solution:
      "Built a Python SVM classifier trained on study habits and exam history to predict pass/fail outcomes.",
    challenges: [
      "Feature selection from study habits",
      "SVM kernel choice",
    ],
    learnings: [
      "SVM fundamentals",
      "Kernel selection",
      "Educational data modeling",
    ],
    stack: ["Python", "scikit-learn", "pandas"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 60,
    github: "https://github.com/kashif-Latif/Classification_SVM_model-AI",
  },

  // ===== LOGISTIC REGRESSION =====
  {
    id: "logistic-regression",
    title: "Logistic Regression — Customer Purchase Prediction",
    tagline: "Logistic Regression to predict customer purchase behavior.",
    description:
      "Implements a Logistic Regression model using scikit-learn to predict whether a customer is likely to make a purchase (buy = 1) based on demographic and behavioral features.",
    problem:
      "Predicting purchase intent helps businesses target marketing effectively.",
    solution:
      "Built a Python Logistic Regression model on customer demographic and behavioral features to predict purchase likelihood.",
    challenges: [
      "Feature scaling",
      "Threshold tuning for business use",
    ],
    learnings: [
      "Logistic Regression intuition",
      "Probability calibration",
      "Business-focused model evaluation",
    ],
    stack: ["Python", "scikit-learn", "pandas"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 60,
    github: "https://github.com/kashif-Latif/classification_logestic-Customer-Purchase-AI",
  },

  // ===== RANDOM FOREST =====
  {
    id: "random-forest",
    title: "Random Forest — Heart Disease Prediction",
    tagline: "Random Forest classifier for heart disease risk.",
    description:
      "A Random Forest classification model that predicts heart disease risk based on patient health features.",
    problem:
      "Heart disease risk prediction can support early medical intervention.",
    solution:
      "Built a Python Random Forest classifier on patient health features to predict heart disease risk.",
    challenges: [
      "Handling medical feature correlations",
      "Random Forest hyperparameter tuning",
    ],
    learnings: [
      "Ensemble methods",
      "Random Forest intuition",
      "Medical data handling",
    ],
    stack: ["Python", "scikit-learn", "pandas"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 60,
    github: "https://github.com/kashif-Latif/CLassification_Radom-forest_heart-Disease-AI",
  },

  // ===== NAIVE BAYES =====
  {
    id: "naive-bayes",
    title: "Naive Bayes — Text Classification",
    tagline: "Naive Bayes email/text classifier with bag-of-words.",
    description:
      "A simple text-classification script that uses Naive Bayes and bag-of-words vectorization to classify emails (or any text) into categories.",
    problem:
      "Text classification is a foundational NLP task — Naive Bayes is a strong, interpretable baseline.",
    solution:
      "Built a Python Naive Bayes text classifier with bag-of-words vectorization for email categorization.",
    challenges: [
      "Text preprocessing",
      "Bag-of-words feature extraction",
    ],
    learnings: [
      "Naive Bayes fundamentals",
      "Text vectorization",
      "NLP basics",
    ],
    stack: ["Python", "scikit-learn"],
    category: "Machine Learning",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 58,
    github: "https://github.com/kashif-Latif/Classification_naive-Base-Model-AI",
  },

  // ===== RULE-BASED CHATBOT =====
  {
    id: "rule-based-chatbot",
    title: "Basic Rule-Based Chatbot",
    tagline: "Command-line rule-based AI chatbot (AI Project 1).",
    description:
      "A simple command-line rule-based AI chatbot created for Artificial Intelligence Project 1. Demonstrates foundational AI conversation patterns using rule matching.",
    problem:
      "Building a first AI chatbot to understand rule-based conversation systems before moving to LLMs.",
    solution:
      "Implemented a Python command-line chatbot with rule-based response matching.",
    challenges: [
      "Designing rule patterns",
      "Handling unknown inputs gracefully",
    ],
    learnings: [
      "Rule-based AI fundamentals",
      "Conversation flow design",
      "Command-line UX",
    ],
    stack: ["Python"],
    category: "AI",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 55,
    github: "https://github.com/kashif-Latif/Basic_rule_based-chatbot-",
  },

  // ===== ADVANCE CHATROOM =====
  {
    id: "advance-chatroom",
    title: "Advanced Chatroom — Python Sockets",
    tagline: "Real-time chat with private messaging, file share, audio & video.",
    description:
      "A real-time chat application built with Python sockets featuring text chat, private messaging, file sharing, audio calls, and video calls — all in one system.",
    problem:
      "Most chat tutorials only cover text. The goal was a complete real-time communication system.",
    solution:
      "Built a Python sockets-based chatroom supporting text, private messaging, file sharing, audio calls, and video calls.",
    challenges: [
      "Real-time socket programming",
      "Audio/video stream handling",
      "Multi-client concurrency",
    ],
    learnings: [
      "Python sockets",
      "Real-time communication patterns",
      "Multimedia stream handling",
    ],
    stack: ["Python", "Sockets", "Threading"],
    category: "Backend",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 68,
    github: "https://github.com/kashif-Latif/Advance-chatroom-using-Python",
  },

  // ===== MULTI-USER CHATROOM =====
  {
    id: "multi-user-chatroom",
    title: "Multi-User Chatroom with GUI",
    tagline: "Python chatroom with authentication and GUI.",
    description:
      "A multi-user chatroom with authentication and GUI built using only Python.",
    problem:
      "Adding authentication and a GUI to a chatroom is a natural next step beyond command-line chat.",
    solution:
      "Built a Python multi-user chatroom with user authentication and a graphical interface.",
    challenges: [
      "GUI integration with sockets",
      "Authentication flow",
    ],
    learnings: [
      "Python GUI programming",
      "Auth implementation",
      "Multi-user state management",
    ],
    stack: ["Python", "GUI", "Sockets"],
    category: "Backend",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 55,
    github: "https://github.com/kashif-Latif/Multi-User-Chatroom",
  },

  // ===== TO-DO LIST APP =====
  {
    id: "todo-list-app",
    title: "To-Do List App",
    tagline: "Interactive to-do list with local storage.",
    description:
      "A simple and interactive To-Do List web application built using HTML, CSS, JavaScript, and Bootstrap 5. Allows users to manage daily tasks efficiently with browser-based local storage.",
    problem:
      "A foundational CRUD app for practicing DOM manipulation and local storage.",
    solution:
      "Built an HTML/CSS/JS to-do list with Bootstrap 5 and browser local storage for persistence.",
    challenges: [
      "Local storage state management",
      "Bootstrap integration",
    ],
    learnings: [
      "DOM manipulation",
      "Local storage API",
      "Bootstrap 5",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap 5"],
    category: "Web",
    status: "shipped",
    role: "Sole developer",
    featured: false,
    weight: 45,
    github: "https://github.com/kashif-Latif/to-list-app",
  },

  // ===== PORTFOLIO (this site) =====
  {
    id: "portfolio",
    title: "3D Portfolio Website",
    tagline: "This site — a 3D, cinematic developer portfolio.",
    description:
      "A premium, production-ready portfolio built with Next.js, TypeScript, Tailwind CSS and React Three Fiber — featuring a lightweight interactive 3D hero, smooth page transitions, an interactive skills constellation, and a cinematic AI journey timeline.",
    problem:
      "Recruiters, collaborators and clients form a first impression in seconds. The portfolio needs to communicate ambition, technical depth and AI focus immediately — without sacrificing performance.",
    solution:
      "Designed a dark, editorial-grade portfolio with carefully controlled 3D, centralized content data files, accessible navigation, and a state-based router that simulates multi-page navigation while staying within a single route.",
    challenges: [
      "Balancing 3D polish with sub-second load times",
      "Keeping animations smooth on low-end devices",
      "Designing reusable, type-safe content structures",
    ],
    learnings: [
      "React Three Fiber performance optimization",
      "Framer Motion page transitions",
      "Designing content-first component architectures",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "React Three Fiber", "Framer Motion"],
    category: "Web",
    status: "shipped",
    role: "Sole developer — design, code & content",
    featured: false,
    weight: 50,
    demo: "https://kashifportfolio-io.vercel.app/",
  },
];

export function getFeaturedProjects(limit = 4): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const statusMeta: Record<ProjectStatus, { label: string; accent: "blue" | "purple" | "cyan" | "gold" }> = {
  shipped: { label: "Shipped", accent: "cyan" },
  "in-progress": { label: "In Progress", accent: "blue" },
  experimental: { label: "Experimental", accent: "purple" },
  planned: { label: "Planned", accent: "gold" },
};
