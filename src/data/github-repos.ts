/**
 * Real GitHub repositories for Muhammad Kashif Latif.
 * Sourced from github.com/kashif-Latif — 22 public repos.
 */

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
  /** Optional live demo URL */
  demo?: string;
  /** Highlight as a featured repo */
  featured?: boolean;
}

export const githubRepos: GithubRepo[] = [
  {
    name: "Comcat-University",
    description:
      "COMCAT University — a comprehensive university management portal with role-based access for Administrators, Teachers, and Students. Handles all aspects of academic administration.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 8,
    forks: 2,
    updatedAt: "2 days ago",
    url: "https://github.com/kashif-Latif/Comcat-University",
    demo: "https://comcat-cms.vercel.app/",
    featured: true,
  },
  {
    name: "wallet-API",
    description:
      "TypeScript wallet API service (MIT licensed). Clean REST design for managing wallet operations securely.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 5,
    forks: 1,
    updatedAt: "2 weeks ago",
    url: "https://github.com/kashif-Latif/wallet-API",
    demo: "https://wallet-api-olive.vercel.app/",
  },
  {
    name: "AI-Dish-craft",
    description:
      "AI-powered dish recommendation system. Takes user input, matches preferences using logic/similarity scoring, and displays recommended items. Built as AI Project 3 (Recommendation Logic).",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 7,
    forks: 1,
    updatedAt: "3 weeks ago",
    url: "https://github.com/kashif-Latif/AI-Dish-craft",
    demo: "https://ai-dish-craft.vercel.app/",
    featured: true,
  },
  {
    name: "Employee-Attrition-Prediction",
    description:
      "AI model that predicts whether an employee is likely to leave a company. Uses classification ML on HR data to surface attrition risk with feature importance analysis.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 6,
    forks: 1,
    updatedAt: "Jun 6",
    url: "https://github.com/kashif-Latif/Employee-Attrition-Prediction",
  },
  {
    name: "kashif-Latif",
    description:
      "Profile repository — README with bio, languages, tools, and contact information for Muhammad Kashif Latif.",
    language: "Markdown",
    languageColor: "#083fa1",
    stars: 3,
    forks: 0,
    updatedAt: "Jun 2",
    url: "https://github.com/kashif-Latif/kashif-Latif",
  },
  {
    name: "Basic_rule_based-chatbot-",
    description:
      "A simple command-line rule-based AI chatbot created for Artificial Intelligence Project 1. Demonstrates rule matching and conversation flow.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 0,
    updatedAt: "Jun 2",
    url: "https://github.com/kashif-Latif/Basic_rule_based-chatbot-",
  },
  {
    name: "NexWalk",
    description:
      "Modern TypeScript web application showcasing clean architecture and developer experience patterns.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 5,
    forks: 1,
    updatedAt: "May 17",
    url: "https://github.com/kashif-Latif/NexWalk",
    demo: "https://nex-walk.vercel.app/",
  },
  {
    name: "Trust-advisor-client-project-",
    description:
      "Trust Mark Real Estate Advisor — a client-facing website presenting property listings, investment deals, and company information in an elegant, professional manner.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 6,
    forks: 1,
    updatedAt: "May 14",
    url: "https://github.com/kashif-Latif/Trust-advisor-client-project-",
    demo: "https://trust-mark-estate.vercel.app/",
    featured: true,
  },
  {
    name: "Lumina-luxe-",
    description:
      "Lumina Luxe — an e-commerce website with 800+ items in the inventory. Proper portals for both admin and user sides with a fantastic, friendly UI.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 9,
    forks: 2,
    updatedAt: "May 8",
    url: "https://github.com/kashif-Latif/Lumina-luxe-",
    demo: "https://lumina-luxe-store.vercel.app/",
    featured: true,
  },
  {
    name: "Gym-API",
    description:
      "'Sigma-themed' minimalist fitness ecosystem supporting AI coaching, structured training plans, and deep scheduling. Comprehensive backend API.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 4,
    forks: 0,
    updatedAt: "May 2",
    url: "https://github.com/kashif-Latif/Gym-API",
  },
  {
    name: "gpt_clone",
    description:
      "ChatGPT-style conversational AI clone built with TypeScript. Features streaming responses, conversation history, and a clean chat UI.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 7,
    forks: 1,
    updatedAt: "Mar 26",
    url: "https://github.com/kashif-Latif/gpt_clone",
    demo: "https://my-gpt-clone.vercel.app/",
    featured: true,
  },
  {
    name: "to-list-app",
    description:
      "A simple, interactive To-Do List web app built with HTML, CSS, JavaScript, and Bootstrap 5. Manages daily tasks with browser-based local storage.",
    language: "HTML",
    languageColor: "#e34c26",
    stars: 2,
    forks: 0,
    updatedAt: "Feb 28",
    url: "https://github.com/kashif-Latif/to-list-app",
  },
  {
    name: "Basic-clock-using-JS",
    description:
      "A basic digital clock built with vanilla JavaScript. Demonstrates DOM manipulation and setInterval timing.",
    language: "HTML",
    languageColor: "#e34c26",
    stars: 2,
    forks: 0,
    updatedAt: "Feb 20",
    url: "https://github.com/kashif-Latif/Basic-clock-using-JS",
  },
  {
    name: "JS-Basics",
    description:
      "JavaScript basics course — covered the fundamentals of the whole JavaScript language including variables, functions, objects, and DOM.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 2,
    forks: 0,
    updatedAt: "Feb 19",
    url: "https://github.com/kashif-Latif/JS-Basics",
  },
  {
    name: "K-Means-Clustering-Model",
    description:
      "Applies K-Means clustering to daily stock market data to uncover hidden behavioral patterns in price movements and trading volume. Each trading day is treated as an observation.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 5,
    forks: 1,
    updatedAt: "Dec 23, 2025",
    url: "https://github.com/kashif-Latif/K-Means-Clustering-Model",
  },
  {
    name: "Linear-reagression-Model",
    description:
      "Predicts monthly electricity bill (PKR) using Linear Regression and visualizes results with Matplotlib. Takes real household inputs and predicts electricity cost.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 1,
    updatedAt: "Dec 23, 2025",
    url: "https://github.com/kashif-Latif/Linear-reagression-Model",
  },
  {
    name: "Classify-decision-tree",
    description:
      "Predicts monthly electricity bill (PKR) using a Decision Tree Regressor based on household appliance usage, with automatic performance visualization.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 1,
    updatedAt: "Dec 23, 2025",
    url: "https://github.com/kashif-Latif/Classify-decision-tree",
  },
  {
    name: "CSS-full-course-",
    description:
      "CSS full course — learned modern CSS including flexbox, grid, animations, responsive design, and best practices.",
    language: "HTML",
    languageColor: "#e34c26",
    stars: 2,
    forks: 0,
    updatedAt: "Dec 23, 2025",
    url: "https://github.com/kashif-Latif/CSS-full-course-",
  },
  {
    name: "kashif-1st-portfolio",
    description:
      "My first portfolio website — built with vanilla JavaScript. A milestone project that started my web development journey.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 3,
    forks: 0,
    updatedAt: "Dec 19, 2025",
    url: "https://github.com/kashif-Latif/kashif-1st-portfolio",
    demo: "https://kashifportfolio-io.vercel.app/",
  },
  {
    name: "Classification_SVM_model-AI",
    description:
      "Machine learning project using Support Vector Machine (SVM) to predict whether a student will PASS or FAIL based on study habits and previous exam performance.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 0,
    updatedAt: "Dec 13, 2025",
    url: "https://github.com/kashif-Latif/Classification_SVM_model-AI",
  },
  {
    name: "Advance-chatroom-using-Python",
    description:
      "Real-time chat application built with Python sockets featuring text chat, private messaging, file sharing, audio calls, and video calls — all in one system.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 6,
    forks: 1,
    updatedAt: "Dec 13, 2025",
    url: "https://github.com/kashif-Latif/Advance-chatroom-using-Python",
  },
  {
    name: "classification_logestic-Customer-Purchase-AI",
    description:
      "Implements a Logistic Regression model using scikit-learn to predict whether a customer is likely to make a purchase (buy = 1) based on demographic and behavioral features.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 0,
    updatedAt: "Dec 13, 2025",
    url: "https://github.com/kashif-Latif/classification_logestic-Customer-Purchase-AI",
  },
  {
    name: "CLassification_Radom-forest_heart-Disease-AI",
    description:
      "Random Forest classification model that predicts heart disease risk based on patient health features. Ensemble method for medical risk prediction.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 0,
    updatedAt: "Dec 6, 2025",
    url: "https://github.com/kashif-Latif/CLassification_Radom-forest_heart-Disease-AI",
  },
  {
    name: "Classification_naive-Base-Model-AI",
    description:
      "Text classification script using Naive Bayes and bag-of-words vectorization to classify emails (or any text) into categories. Strong, interpretable NLP baseline.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 0,
    updatedAt: "Dec 6, 2025",
    url: "https://github.com/kashif-Latif/Classification_naive-Base-Model-AI",
  },
  {
    name: "Multi-User-Chatroom",
    description:
      "Multi-User Chatroom with authentication and GUI built using only Python. Python GUI programming with socket-based real-time communication.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 3,
    forks: 1,
    updatedAt: "Oct 1, 2025",
    url: "https://github.com/kashif-Latif/Multi-User-Chatroom",
  },
  {
    name: "HTML-Full-Course",
    description:
      "Learned the basics of HTML including how to create web pages, add text, images, links, lists, and forms. Built simple web pages using proper structure and tags.",
    language: "HTML",
    languageColor: "#e34c26",
    stars: 2,
    forks: 0,
    updatedAt: "Sep 17, 2025",
    url: "https://github.com/kashif-Latif/HTML-Full-Course",
  },
];
