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

## The safety net

`PerfWatchdog` samples frame intervals for the first ~40 rendered frames
(skipping the first 8, which include shader compile). If the median frame is
more than 2.2× the target budget, the canvas unmounts itself and the pure-CSS
`HeroFallback` takes over. Nobody gets a janky page because their device is
slow.

The scene also stops rendering entirely when the hero scrolls out of view or
the tab is hidden (`IntersectionObserver` + `visibilitychange`).

## If you need to tune it

Everything lives in one object at the top of `src/components/3d/hero-scene.tsx`:

```ts
const TIER = IS_MOBILE
  ? { fps: 24, dpr: 1,   nodes: 5, particles: 160, fragments: 3, sphereSegs: 8 }
  : { fps: 30, dpr: 1.5, nodes: 8, particles: 320, fragments: 5, sphereSegs: 10 };
```

## Rule of thumb

In a `useFrame` / `requestAnimationFrame` body, allocating anything — an
object, an array, a clone — is the thing to look for first. It runs 60 times a
second; the garbage collector pays for all of it, and in three.js it usually
drags a GPU buffer upload along with it.
