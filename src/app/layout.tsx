import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// One source of truth for the public URL. The old code hardcoded
// https://kashif-latif.dev here — a domain this site is NOT deployed on —
// which told Google to index a page that doesn't exist instead of this one.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://its-my-portfolio-io.vercel.app";

/* PERF: the fonts are VARIABLE and VENDORED (src/app/fonts).
 *
 *  - Variable: one file covers every weight 200-800. The old setup pulled ten
 *    static files across two families; these two total ~75 KB.
 *  - Vendored instead of next/font/google: the build no longer has to reach
 *    fonts.googleapis.com, so it succeeds on any machine, in CI, and behind a
 *    firewall. Runtime is identical — next/font self-hosts either way — but
 *    the build stops depending on a third party being up.
 *  - `adjustFontFallback` derives a metric-matched system fallback, so the
 *    swap from fallback to webfont causes no layout shift.
 */
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "sans-serif"],
});

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
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
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F0E2" },
    { media: "(prefers-color-scheme: dark)", color: "#241C15" },
  ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${inter.variable} font-body antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
