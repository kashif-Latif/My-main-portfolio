"use client";

import * as React from "react";
import { Github, Linkedin, Mail, ArrowUp, Phone } from "lucide-react";
import { profile, siteConfig, gmailComposeUrl } from "@/data/profile";
import { navItems, RouteId } from "@/data/navigation";
import { useAppRouter } from "@/hooks/use-app-router";

export function Footer() {
  const { navigate } = useAppRouter();
  const year = new Date().getFullYear();

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto border-t border-white/[0.06] bg-background/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Famous quote banner */}
        <div className="mb-10 flex flex-col items-center gap-2 border-b border-white/[0.06] pb-8 text-center">
          <blockquote className="max-w-3xl font-display text-lg sm:text-xl italic text-muted-foreground leading-relaxed">
            &ldquo;{siteConfig.famousQuote.text}&rdquo;
          </blockquote>
          <cite className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
            &mdash; {siteConfig.famousQuote.author}
          </cite>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-2.5 group w-fit"
              aria-label="Go to home"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-[oklch(0.62_0.18_250_/_20%)] to-[oklch(0.55_0.22_295_/_20%)] font-display text-sm font-semibold tracking-wider text-white">
                MKL
              </span>
              <span className="font-display text-sm font-medium tracking-tight">
                {profile.name}
              </span>
            </button>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              {profile.positioning}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/[0.16] transition-all"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/[0.16] transition-all"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={gmailComposeUrl(siteConfig.email, "Portfolio enquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/[0.16] transition-all"
                aria-label="Send email via Gmail"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/[0.16] transition-all"
                aria-label="Call phone"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.id as RouteId)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Get in touch
            </h3>
            <a
              href={gmailComposeUrl(siteConfig.email, "Portfolio enquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
            >
              {siteConfig.email}
            </a>
            <p className="text-sm text-muted-foreground">
              {profile.location}
            </p>
            <button
              onClick={() => navigate("contact")}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-medium text-foreground hover:bg-white/[0.06] transition-colors"
            >
              Start a conversation
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.04] pt-6">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. Built with Next.js, Three.js & Framer Motion.
          </p>
          <button
            onClick={goTop}
            className="group flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto"
            aria-label="Back to top"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.06] bg-white/[0.02] group-hover:border-white/[0.16] transition-colors">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
