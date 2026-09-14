# Performance — what was slow and why

The page felt laggy on both desktop and mobile. Rather than guess, the fix
started with attribution: measure scroll FPS, then re-measure with each
suspect disabled. The delta says what actually costs frames.

## The measurement

Chrome DevTools Protocol CPU throttling + a `requestAnimationFrame` interval
recorder during a steady programmatic scroll. Variants: remove the WebGL
canvas, remove the fixed background blobs, kill all `backdrop-filter`, kill all
`box-shadow`, kill all CSS animations.

### Before

| variant | desktop @4× | mobile @6× |
|---|---|---|
| as shipped | **8.2 fps** | **32.1 fps** |
| canvas removed | 59.5 fps | 60 fps |
| blobs removed | 11.1 | 37.7 |
| no backdrop-filter | 9.5 | 36.0 |
| no box-shadow | 9.8 | 34.1 |
| no CSS animations | 10.6 | 34.0 |

One suspect accounted for essentially all of it: **the three.js hero scene**.
Everything that *looked* expensive — blurs, shadows, glassmorphism — was noise.

### After

| | desktop @4× | desktop unthrottled | mobile @6× |
|---|---|---|---|
| as shipped | **35.1 fps** | **59 fps** | **60 fps** |
| janky frames (>50 ms) | 3 (was 33) | 0 | 0 (was 2) |

Note: this was measured in a container with **no GPU**, so WebGL ran through
SwiftShader (software rasterisation). The throttled desktop figure therefore
overstates GPU cost badly; unthrottled it reaches 59 fps, and real hardware
does the shading on the GPU.

## What was wrong in the scene

**1. The connector lines rebuilt their geometry every frame.** This was the
big one:

```js
lineGeometries[i].setFromPoints([new Vector3(0,0,0), mesh.position.clone()]);
```

Nine lines × 3 allocations × 60 fps ≈ 1,600 objects per second, and
`setFromPoints` re-creates the attribute array and forces a fresh GPU buffer
upload each time. Now each line owns one `Float32Array(6)` created once; the
frame loop writes three numbers into it and sets `needsUpdate = true`. Zero
allocation, no reallocation.

**2. It rendered at the display refresh rate.** This is a slow ambient
graphic — nothing in it benefits from 60 fps. The canvas is now
`frameloop="demand"` driven by a fixed-rate limiter: 30 fps desktop, 24 fps
mobile. Roughly halves both CPU and GPU cost and is visually indistinguishable,
because the animation is driven by `clock.elapsedTime` rather than a frame
counter — it stays time-correct at any rate.

**3. `dpr` went up to 2, with MSAA on top.** On a retina screen that is 4× the
fragments for a soft translucent graphic that gains nothing from either.
Capped at 1.5 (1 on mobile), `antialias: false`.

**4. `meshStandardMaterial` + three lights** meant full PBR shading on every
pixel of the core. The look is a translucent faceted shell; `meshBasicMaterial`
reproduces it, so the lights are gone too.

Counts also dropped: 600 → 320 particles (160 mobile), 9 → 8 nodes (5 mobile).

## Secondary costs (only visible once the canvas got cheap)

- **The rotating "hire me" seal** spins an `<svg>` containing a `<textPath>`.
  Rotating that re-rasterises curved text every frame. `will-change: transform`
  promotes it to its own layer so only the layer transform animates.
- **Blurred background blobs.** Each was already a `radial-gradient` fading to
  transparent, with `blur-3xl` stacked on top — redundant, and a `filter` on a
  `position: fixed` element makes the browser re-rasterise it on scroll. The
  blur is gone; they look the same.

## Why the 3D takes a moment to appear

Measured from navigationStart:

| stage | desktop, fast net | mid phone, Fast 3G |
|---|---|---|
| first paint (CSS fallback visible) | 396 ms | 1168 ms |
| three.js chunk finished downloading | 581 ms | 4393 ms |
| loading screen finished | 2382 ms | 4933 ms |
| 3D canvas mounted & drawing | 2382 ms | 4933 ms |

Two different causes depending on where you are:

**On desktop the 3D is ready at ~0.6 s — the wait is the intro animation.**
`LoadingScreen` runs for 1500 ms plus a 400 ms fade. The canvas mounts the
instant it clears. It only plays once per browser session (`sessionStorage`),
so refreshes go straight in, and there's a Skip button. To change it, edit
`totalDuration` in `src/components/portfolio/loading-screen.tsx`.

**On a phone over 3G the download is the real cost.** three.js is ~875 KB raw
/ ~231 KB gzipped, which is about 3.2 s of Fast-3G. Nothing is blocked while it
happens — the CSS fallback is on screen from 1.2 s — but the swap to WebGL
can't happen sooner than the bytes arrive.

The hero is never empty at any point: `HeroFallback` (pure CSS + inline SVG,
no JS) paints at first paint and stays until WebGL is genuinely ready.

### Not downloading it at all

`src/components/3d/hero-visual.tsx` decides *before* the dynamic import fires.
On Data Saver, a 2G-class link, or `prefers-reduced-motion`, the three.js chunk
is never requested and the CSS fallback is the final state. Verified: with
Save-Data on, 0 KB of three.js crosses the wire.

That gate has to live outside `hero-scene.tsx` — a check written inside that
module only runs after the module has downloaded, by which point the bandwidth
is already spent.

## Resolution — why mobile looked like 144p

The first performance pass pinned mobile to `dpr: 1`. On a phone with a 3x
screen that renders the scene at **a third** of the display resolution and
lets the browser upscale it. `AdaptiveDpr pixelated` made it worse by
switching the upscale to nearest-neighbour, so it was blocky as well as soft.

It now renders at the screen's real density, capped at 2:

```ts
const MAX_DPR = Math.min(window.devicePixelRatio || 1, 2);
```

A 390x844 phone at dpr 3 now gets a **780x1688** canvas instead of 390x844 —
4x the pixels. Past dpr 2 the extra fragments cost fill rate linearly and buy
nothing the eye can resolve, which is why 2 is the ceiling. MSAA is enabled
only when `MAX_DPR < 2`; above that the supersampling already smooths edges and
MSAA on top is pure cost.

Geometry counts went back up on mobile too (7 nodes, 260 particles, 12-segment
spheres). Those are *vertex* cost, which is negligible — it was never where the
frames went.

## Adaptive quality — what degrades, and in what order

The ladder degrades **frame rate first and resolution last**:

```ts
const QUALITY_LADDER = [
  { fps: 60, dprScale: 1    },   // sharp + smooth
  { fps: 40, dprScale: 1    },   // sharp, slightly less smooth
  { fps: 30, dprScale: 1    },   // sharp, cinematic
  { fps: 30, dprScale: 0.8  },   // first softening
  { fps: 24, dprScale: 0.65 },
  { fps: 24, dprScale: 0.5  },   // last resort — still 3D
];
```

That order is the whole design. Dropping a slow ambient rotation from 60 to 40
fps is barely perceptible; dropping resolution is *immediately* obvious as
blur. So every bit of headroom is spent on sharpness and smoothness is given
away first. Even the bottom rung (dpr 1 at MAX_DPR 2) is what the scene used to
ship at for every phone — so losing the canvas entirely is genuinely the final
option, not the second one.

Three rules keep it from demoting a device that's actually fine:

- **It decides on p75, not the median.** The median says "the typical frame is
  fine" and settles happily while a quarter of frames land 80 ms late — which
  is exactly what the eye reads as stutter.
- **Two consecutive bad windows.** One slow window happens on perfectly capable
  hardware: an image decode, a long scroll, a GC pause, another tab waking up.
  The ladder never climbs back, so demoting on a single blip would cost a good
  device its sharpness permanently.
- **It waits 900 ms before judging at all**, so chunk parse and shader
  compilation can't demote a fast machine.

Inside the full-resolution region it jumps straight to the rung the device can
hold. Below it, it steps one tier at a time and re-measures — halving the
resolution changes what's achievable, so the fps just measured no longer
predicts the next rung.

## Software WebGL

A WebGL context alone doesn't mean the machine can render. With no usable GPU —
some low-end Androids, locked-down desktops, VMs, acceleration disabled —
Chrome silently falls back to **SwiftShader** and rasterises every pixel on the
CPU. It "works" and it is never smooth.

`hero-visual.tsx` probes `WEBGL_debug_renderer_info` on a throwaway 1x1 context
*before* the dynamic import. Software renderer → CSS fallback, and three.js is
never downloaded.

This also matters for reading the numbers in this document: they were measured
in a container with no GPU, so everything above ran through SwiftShader. Those
figures overstate GPU cost badly and understate what real hardware does.

Verified across all three paths:

| device | three.js | canvas |
|---|---|---|
| software renderer | **not downloaded** | CSS fallback |
| phone, dpr 3, real GPU | downloaded | **780x1688 @ dpr 2** |
| desktop, dpr 2, real GPU | downloaded | **2880x1800 @ dpr 2** |

## Adaptive frame rate

The first pass pinned the scene to a flat 30 fps. That was safe but wrong for
this scene specifically: the core rotates *continuously*, and continuous
rotation is the exact motion where 30 fps reads as steppy. It looked like lag
even though the numbers were fine.

It now starts at 60 and steps down only when the device demonstrably can't
hold it:

```ts
const FPS_LADDER = [60, 40, 30, 24];
```

It waits 900 ms before judging (so chunk parse and shader compile can't demote
a fast machine), samples 30 rendered frames, and jumps **straight to the rung
the device can actually hold** rather than stepping down one at a time — one
measurement window instead of three, so there's no drawn-out stutter while it
decides. Below the last rung it hands over to the CSS fallback.

Measured: 60 fps on unthrottled desktop, stepping to 40 under 4x CPU
throttling, 30 on a throttled phone. The canvas is never falsely downgraded.

## The safety net

If the device can't hold even the lowest rung of the ladder, the canvas
unmounts itself and the pure-CSS `HeroFallback` takes over. Nobody gets a janky
page because their device is slow.

The scene also stops rendering entirely when the hero scrolls out of view or
the tab is hidden (`IntersectionObserver` + `visibilitychange`).

## If you need to tune it

Everything lives in one object at the top of `src/components/3d/hero-scene.tsx`:

```ts
const MAX_DPR = Math.min(window.devicePixelRatio || 1, 2);

const TIER = IS_MOBILE
  ? { nodes: 7, particles: 260, fragments: 4, sphereSegs: 12, particleSize: 0.026 }
  : { nodes: 8, particles: 320, fragments: 5, sphereSegs: 14, particleSize: 0.024 };

const QUALITY_LADDER = [ /* fps + dprScale, see above */ ];
```

The intro length is `totalDuration` in `loading-screen.tsx`; the
slow-connection cut-off is `TOO_SLOW` in `hero-visual.tsx`.

## Rule of thumb

In a `useFrame` / `requestAnimationFrame` body, allocating anything — an
object, an array, a clone — is the thing to look for first. It runs 60 times a
second; the garbage collector pays for all of it, and in three.js it usually
drags a GPU buffer upload along with it.
