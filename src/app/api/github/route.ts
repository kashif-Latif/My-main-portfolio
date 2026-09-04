import { NextResponse } from "next/server";
import { siteConfig } from "@/data/profile";

/**
 * Live GitHub repo data, cached for one hour.
 *
 * WHY THIS EXISTS: the old site hardcoded stars, forks and relative
 * timestamps ("2 days ago") in src/data/github-repos.ts. Those strings
 * never changed — the site would still claim "updated 2 days ago" years
 * later, and any recruiter cross-checking GitHub would see the mismatch.
 *
 * This route fetches the real numbers server-side. Next.js caches the
 * upstream call for 3600s, so GitHub sees at most ~1 request per hour
 * regardless of traffic — comfortably inside the unauthenticated rate
 * limit, no token required. If GitHub is unreachable, the client keeps
 * the static data it already rendered, so nothing ever breaks.
 */

export const revalidate = 3600;

interface GithubApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  html_url: string;
  fork: boolean;
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.social.githubUsername}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, reason: `github responded ${res.status}` },
        { status: 200 }
      );
    }

    const repos = (await res.json()) as GithubApiRepo[];

    const data = repos
      .filter((r) => !r.fork)
      .map((r) => ({
        name: r.name,
        description: r.description ?? "",
        language: r.language ?? "Other",
        stars: r.stargazers_count,
        forks: r.forks_count,
        pushedAt: r.pushed_at,
        url: r.html_url,
      }));

    return NextResponse.json({ ok: true, repos: data });
  } catch {
    // Network failure — tell the client to keep its static fallback.
    return NextResponse.json({ ok: false, reason: "fetch failed" }, { status: 200 });
  }
}
