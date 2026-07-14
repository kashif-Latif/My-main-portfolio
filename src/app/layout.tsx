import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kashif-latif.dev"),
  title: {
    default: "Muhammad Kashif Latif — AI Engineer & Full Stack Developer",
    template: "%s — Muhammad Kashif Latif",
  },
  description:
    "BS Computer Science student building intelligent software, scalable web applications, automation systems, and AI-powered products. Focused on AI Engineering, Full Stack Development, Machine Learning, and Agentic AI.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "Generative AI",
    "AI Automation",
    "Agentic AI",
    "Python Developer",
    "JavaScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Django Developer",
    "Muhammad Kashif Latif",
  ],
  authors: [{ name: "Muhammad Kashif Latif" }],
  creator: "Muhammad Kashif Latif",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Muhammad Kashif Latif — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software, scalable web applications, automation systems, and AI-powered products. BS Computer Science student evolving into a professional AI & Full Stack Engineer.",
    url: "https://kashif-latif.dev",
    siteName: "Muhammad Kashif Latif — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Kashif Latif — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software, scalable web applications, and AI-powered products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://kashif-latif.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Kashif Latif",
  jobTitle: "AI Engineer & Full Stack Developer",
  description:
    "BS Computer Science student building intelligent software, scalable web applications, and AI-powered products.",
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Development",
    "Generative AI",
    "Agentic AI",
    "Python",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Django",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Minhaj University Lahore",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
