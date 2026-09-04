# Portfolio — Fixed Build

Same site, same design, same content. Everything below is a repair, not a redesign.

## Deploy

```bash
npm install
npm run dev      # local
npm run build    # production build
```

On Vercel, set one environment variable (Project → Settings → Environment Variables):

```
NEXT_PUBLIC_SITE_URL = https://its-my-portfolio-io.vercel.app
```

When you buy a custom domain later, change only that value and redeploy.

---

## What was broken → what was done

### Critical

1. **Contact form never delivered anything.**
   `window.open()` ran after an `await`, so the browser had lost the
   user-gesture context and popup blockers silently killed the Gmail tab —
   while the UI showed "success". Fixed: the compose window opens
   synchronously inside the submit handler, and if a blocker still stops
   it, the visitor's own mail app opens via `mailto:` with the message
   pre-filled. The success text now describes what actually happened.
   *(src/components/portfolio/pages/contact-page.tsx)*

2. **Google was told to index a different domain.**
   The canonical URL and `og:url` pointed at `https://kashif-latif.dev`,
   which is not where the site is deployed — an instruction to search
   engines to drop this site in favour of one that doesn't exist. All URLs
   now come from `NEXT_PUBLIC_SITE_URL`. *(layout.tsx, data/profile.ts)*

3. **Stat cards rendered "0+" in the server HTML** directly under a
   heading claiming "40+ repositories, 10,000+ contributions" — visible to
   crawlers, slow connections, and link previews. Counters now render the
   real value first and animate only as an enhancement.
   *(home-page.tsx, github-page.tsx)*

4. **Social share cards were blank.** `siteConfig.ogImage` pointed at
   `/og-image.png`, a file that never existed. A real 1200×630 card is now
   generated at build time. *(src/app/opengraph-image.tsx)*

5. **GitHub data was frozen in time.** Stars, forks and "updated 2 days
   ago" were hardcoded strings that would read the same forever. A cached
   API route (`/api/github`, revalidated hourly, no token needed) now
   overlays live numbers; if GitHub is unreachable the static data simply
   remains. *(src/app/api/github/route.ts, github-page.tsx)*

### Performance

6. **Three.js (~1.2 MB) shipped in the initial bundle.** The hero scene is
   now lazy-loaded with `next/dynamic` (`ssr: false`); the existing CSS
   fallback shows instantly while it arrives. Initial JS drops by over a
   megabyte. *(home-page.tsx, 3d/hero-fallback.tsx)*

7. **978 KB profile photo, raw `<img>`, no dimensions** → 24 KB WebP
   through `next/image` with `fill` + `sizes`. Fixes the download weight
   and the layout shift in one move. *(public/profile.webp, home-page.tsx)*

8. **2.4 s forced loading screen on every visit.** Now 1.5 s (the letter
   animation completes at ~1.4 s, so nothing visual is lost) and it plays
   once per browser session — repeat visits and refreshes go straight to
   content. *(loading-screen.tsx)*

9. **Skill icons** from the CDN now carry `width/height`, `loading="lazy"`
   and `decoding="async"`.

### Correctness & code health

10. **Build safety switched back on.** `ignoreBuildErrors: true` and
    `reactStrictMode: false` removed — the project passes `tsc` with zero
    errors, so the gate is locked while green. Security headers added,
    `poweredByHeader` off. *(next.config.ts)*

11. **Router race fixed.** Programmatic navigation fired `hashchange`,
    which swapped the page instantly and skipped the exit animation, then
    the 220 ms timer scrolled late. Programmatic hash writes are now
    suppressed in the handler; back/forward still works and now also
    restores scroll + title. Unused `useRouter` import removed.
    *(use-app-router.tsx)*

12. **All 13 ESLint errors fixed** (`react-hooks/set-state-in-effect`).
    Media-query reads now use a proper `useReducedMotion` /
    `useSyncExternalStore` hook; remaining one-shot reads are deferred a
    frame with cleanup. `useReveal` no longer rebuilds its
    IntersectionObserver every render.

13. **Dead weight removed.**
    - 53 unused dependencies (70 → 17): prisma, next-auth, next-intl,
      @mdxeditor, dnd-kit, tanstack, zustand, zod, recharts,
      z-ai-web-dev-sdk, and more. `@types/node` (genuinely needed, was
      missing) added.
    - 44 unused shadcn components deleted; `command`, `dialog`, `toast`,
      `toaster` kept.
    - 808 lines of never-imported 3D components deleted
      (neural-engine, meta-earth, vector-field).
    - Scaffold artifacts deleted: `Caddyfile`, `scripts/retheme-*.py`
      (contained the generator's `/home/z/my-project` paths),
      `"Hello, world!"` API route, `src/lib/db.ts`, the broken
      Tailwind-v3 `tailwind.config.ts`, `*.space-z.ai` dev origin.
    - Package renamed from `nextjs_tailwind_shadcn_ts` to
      `kashif-latif-portfolio`; bun/tee/prisma scripts replaced with
      standard `next dev/build/start`.

### SEO plumbing

14. `app/sitemap.ts` added; `robots.txt` now declares the sitemap. The
    `keywords` meta tag was left out of new code — Google has ignored it
    since 2009.

---

## Known limitations (unchanged by request)

- **Hash routing** (`#/projects`) means search engines index one page.
  Real routes (`/projects/...`) are the single biggest SEO upgrade
  available and can be done later without touching the design.
- **Contact form** opens a compose window rather than sending server-side.
  Upgrading to a real `/api/contact` with Resend (free tier) takes ~30
  minutes when you're ready.
- The **Karkhana ERP and Grohub systems are still absent** from the
  projects data — they are stronger than anything currently listed.
  Adding them is a content edit in `src/data/projects.ts`.

## After deploying

1. Verify the site in **Google Search Console** and submit
   `/sitemap.xml`.
2. Share the URL in WhatsApp/LinkedIn once — you should now see a proper
   preview card instead of a blank box.
3. Send yourself a test message through the contact form.
