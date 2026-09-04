import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://its-my-portfolio-io.vercel.app";

// The site is currently a single-route app (sections live behind #/hashes,
// which search engines don't index as separate pages). When real routes
// are added later (/projects, /about, ...), list them here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
