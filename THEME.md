# Theme system

The whole site is driven by CSS custom properties in `src/app/globals.css`.
No component contains a raw colour value. Change a token, everything follows.

## Where the palette lives

```
src/app/globals.css
  @theme inline { ... }   ← exposes every token to Tailwind as a utility
  :root       { ... }     ← LIGHT ("cream") — the flagship theme
  .dark       { ... }     ← DARK ("espresso")
  .panel      { ... }     ← always-dark surfaces, on either theme
```

`@theme inline` is what turns a variable into a class. Because `--color-brand`
is declared there, Tailwind generates `bg-brand`, `text-brand`, `border-brand`
and opacity variants like `bg-brand/20` automatically. Add a token in both
places and it's usable everywhere.

## The tokens

| Token | Use |
|---|---|
| `--background` / `--foreground` | page ground and body text |
| `--card` | raised surfaces (white on cream, espresso on dark) |
| `--brand` / `--brand-deep` | the amber, and its pressed/hover state |
| `--ink` / `--cream` | **theme-independent** constants — use these for anything that is the same colour in both themes (e.g. text on an amber button) |
| `--line` / `--line-strong` | hairlines. Replaces the old `border-white/[0.06]`, which was invisible on a light ground |
| `--surface` / `--surface-2` | subtle fills. Replaces the old `bg-white/[0.02]` |
| `--a1 … --a4` | the 4-step accent ramp: amber, rust, golden, sand |
| `--panel*` | the always-dark surfaces: nav pill, marquee, dark feature bands |

### Why `--a1..--a4` and not just `--brand`

An accent that reads well on cream is too dark to read on espresso, and vice
versa. The ramp is defined **twice** — darker and more saturated in `:root`,
brighter in `.dark` — so accent text keeps its contrast on both grounds.
`.panel` re-points the ramp at the bright values because a panel is dark
regardless of which theme is active.

Never hardcode an accent. Go through `src/lib/accents.ts`:

```ts
import { accentTextClass, accentBorderClass, accentBgClass } from "@/lib/accents";
<span className={accentTextClass[project.accent]} />
```

Those maps are typed `Record<AccentColor, string>` on purpose. A loose
`Record<string, string>` lets a renamed accent resolve to `undefined` at
runtime with no compile error — that bug already happened once here.

## Adding a new accent

1. Add `--a5` to `:root`, `.dark` and `.panel` in `globals.css`.
2. Add `--color-a5: var(--a5);` inside `@theme inline`.
3. Add the key to `AccentColor` and to every map in `src/lib/accents.ts`.

TypeScript will then point you at every call site that needs updating.

## Component utilities

| Class | What it does |
|---|---|
| `.card-surface` | the standard card recipe — background, hairline, shadow |
| `.card-surface-hover` | the lift on hover |
| `.panel` | always-dark surface; also re-points the accent ramp |
| `.chamfer` + `.chamfer-tr\|tl\|br\|bl` | the clipped corner. Drawn as a triangle of page-ground over a rounded card, so radius, border and shadow all survive. Set `--chamfer-size` to resize (default 34px) and `--chamfer-color` if the card sits on something other than `--background` |
| `.text-grad-brand` / `-warm` / `-deep` | gradient display text |
| `.marquee-track` | the scrolling band; pure `transform`, runs on the compositor |

## Fonts

`Plus Jakarta Sans` (display) and `Inter` (body) are **variable** fonts,
vendored in `src/app/fonts/` and loaded through `next/font/local`.

They are not pulled from `next/font/google` deliberately: that makes the build
reach `fonts.googleapis.com` at build time, so it fails on a machine without
internet or behind a firewall. Runtime behaviour is identical — `next/font`
self-hosts either way — but the build no longer depends on a third party.
Both files together are ~75 KB and cover every weight from 200 to 800.

## Dark mode

`next-themes` with `attribute="class"`, `defaultTheme="light"`, `enableSystem`.
The toggle is `src/components/portfolio/theme-toggle.tsx`.

It reads "have we hydrated yet?" through `useSyncExternalStore` rather than a
mount effect — same result, no setState-in-effect cascade, and it satisfies the
React compiler lint rule.
