"use client";

import { HeroFallback } from "./hero-fallback";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerspectiveCamera } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/* ============================================================
 * 3D Hero Scene — Floating AI Core
 *
 * Same visual design as before: glowing icosahedron core, orbiting
 * nodes wired back to it, particle field, drifting fragments, mouse
 * and scroll parallax, breathing camera.
 *
 * PERFORMANCE REWRITE — the previous version cost ~50 fps on a
 * throttled desktop and made the whole page feel laggy. Four causes,
 * in order of how much they cost:
 *
 *  1. The connector lines rebuilt their geometry EVERY FRAME:
 *     `setFromPoints([new Vector3(), mesh.position.clone()])` allocated
 *     ~27 objects per frame and forced a fresh GPU buffer upload each
 *     time. Now the positions are written straight into one Float32Array
 *     per line with `needsUpdate = true` — zero allocation, no realloc.
 *
 *  2. It rendered at the display's full refresh rate. This is a slow
 *     ambient graphic; nothing in it benefits from 60 fps. The canvas is
 *     now `frameloop="demand"` driven by a fixed-rate limiter, so it
 *     renders 30x/s on desktop and 24x/s on mobile. Roughly halves both
 *     CPU and GPU cost and is visually indistinguishable.
 *
 *  3. `dpr` went up to 2, i.e. 4x the fragments on a retina screen, with
 *     MSAA on top. For a soft translucent graphic that buys nothing.
 *     Capped at 1.5 (1 on mobile), antialias off.
 *
 *  4. `meshStandardMaterial` + three lights meant full PBR shading on
 *     every pixel of the core. The look is a translucent faceted shell —
 *     `meshBasicMaterial` reproduces it, so the lights are gone too.
 *
 * Plus a watchdog: if the device still can't hold the target rate, the
 * canvas unmounts itself and the CSS fallback takes over. Nobody gets a
 * janky page just because their phone is slow.
 * ========================================================== */

type Palette = {
  core: string;
  wire: string;
  glow: string;
  nodes: [string, string, string];
  lines: [string, string];
  particles: [string, string, string];
  particleOpacity: number;
  lineOpacity: number;
};

const PALETTES: Record<"light" | "dark", Palette> = {
  // Deeper, more saturated: has to hold up against a cream page.
  light: {
    core: "#C77C18",
    wire: "#A96410",
    glow: "#D89A3A",
    nodes: ["#B5670E", "#A14522", "#9C7A10"],
    lines: ["#B5670E", "#A14522"],
    particles: ["#B5670E", "#A14522", "#9C7A10"],
    particleOpacity: 0.55,
    lineOpacity: 0.22,
  },
  // Brighter: reads as light against the espresso ground.
  dark: {
    core: "#F0A83F",
    wire: "#FFC163",
    glow: "#F08A3C",
    nodes: ["#FFC163", "#F0813A", "#FFD866"],
    lines: ["#FFC163", "#F0813A"],
    particles: ["#FFC163", "#F0813A", "#FFD866"],
    particleOpacity: 0.8,
    lineOpacity: 0.22,
  },
};

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IS_MOBILE =
  typeof window !== "undefined" &&
  (window.matchMedia("(max-width: 768px)").matches ||
    /Mobi|Android/i.test(navigator.userAgent));

/** One quality tier per device class — every count lives here. */
const TIER = IS_MOBILE
  ? { dpr: 1, nodes: 5, particles: 160, fragments: 3, sphereSegs: 8 }
  : { dpr: 1.5, nodes: 8, particles: 320, fragments: 5, sphereSegs: 10 };

/* Frame-rate ladder. We START at 60 and only step down if the device
 * demonstrably can't hold it.
 *
 * The previous version pinned everything to a flat 30 fps. That was safe but
 * wrong for THIS scene: the core rotates continuously, and continuous rotation
 * is exactly the motion where 30 fps reads as steppy. Capable machines should
 * get the smooth version; only slow ones pay. Below the last rung the scene
 * gives up and hands over to the CSS fallback. */
const FPS_LADDER = [60, 40, 30, 24] as const;

/* ---------- Adaptive frame-rate controller ----------
 * Drives `frameloop="demand"` at the current target, watches how well the
 * device actually keeps up, and steps down the ladder when it can't. */
function AdaptiveFrameRate({ onSlow }: { onSlow: () => void }) {
  const invalidate = useThree((s) => s.invalidate);

  const rung = React.useRef(0);
  const targetFps = React.useRef<number>(FPS_LADDER[0]);
  const samples = React.useRef<number[]>([]);
  const lastRender = React.useRef(0);
  const measuring = React.useRef(false);
  const settled = React.useRef(false);

  /* Don't judge the device during the first second and a half. Chunk parse,
   * hydration and shader compilation all land there, and measuring through
   * them would demote a perfectly capable machine on load-time noise alone. */
  React.useEffect(() => {
    const t = setTimeout(() => {
      measuring.current = true;
    }, 900);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      // 2ms tolerance, otherwise rAF jitter makes a 60fps target miss every
      // other frame and settle at 30.
      if (t - last >= 1000 / targetFps.current - 2) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [invalidate]);

  useFrame(() => {
    const now = performance.now();

    if (settled.current || !measuring.current) {
      lastRender.current = now;
      return;
    }

    const dt = now - lastRender.current;
    lastRender.current = now;
    if (dt <= 0 || dt > 1000) return; // tab was backgrounded — not a real sample

    samples.current.push(dt);
    if (samples.current.length < 30) return;

    const sorted = samples.current.slice().sort((a, b) => a - b);
    const median = sorted[sorted.length >> 1];
    samples.current.length = 0;

    // Holding the target comfortably? Stop measuring; the cost of the check
    // itself is not worth paying forever.
    if (median <= (1000 / targetFps.current) * 1.45) {
      settled.current = true;
      return;
    }

    /* Jump straight to the rung this device can actually hold rather than
     * stepping down one at a time. Stepping meant up to three measurement
     * windows of visible jank before settling; this converges in one. */
    const achievableFps = 1000 / median;
    let next = rung.current;
    while (
      next < FPS_LADDER.length - 1 &&
      FPS_LADDER[next] > achievableFps * 1.1
    ) {
      next += 1;
    }

    if (next === rung.current) {
      // Already on the lowest useful rung and still missing it — hand over
      // to the CSS fallback rather than serving a stuttering canvas.
      settled.current = true;
      onSlow();
      return;
    }

    rung.current = next;
    targetFps.current = FPS_LADDER[next];
  });

  return null;
}

/* ---------- Core ---------- */
function Core({
  mouse,
  scroll,
  palette,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
  palette: Palette;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const wireRef = React.useRef<THREE.Mesh>(null);
  const innerRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current || !innerRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x = t * 0.15 + mouse.current.y * 0.2;
    meshRef.current.rotation.y = t * 0.2 + mouse.current.x * 0.3;

    wireRef.current.rotation.x = -t * 0.1 + mouse.current.y * 0.15;
    wireRef.current.rotation.y = -t * 0.15 + mouse.current.x * 0.2;

    innerRef.current.rotation.x = t * 0.3;
    innerRef.current.rotation.y = t * 0.4;

    const pulse = 1 + Math.sin(t * 0.8) * 0.04;
    const scale = pulse - scroll.current * 0.4;
    meshRef.current.scale.setScalar(Math.max(0.4, scale));
    wireRef.current.scale.setScalar(Math.max(0.5, scale * 1.08));
    innerRef.current.scale.setScalar(Math.max(0.3, scale * 0.7));

    meshRef.current.position.y = -scroll.current * 0.6 + mouse.current.y * 0.15;
    wireRef.current.position.y = -scroll.current * 0.5 + mouse.current.y * 0.1;
    innerRef.current.position.y = -scroll.current * 0.7;
  });

  return (
    <group>
      {/* Translucent faceted shell. Basic, not standard: no lights to run. */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color={palette.core} transparent opacity={0.22} />
      </mesh>

      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.55} />
      </mesh>

      <mesh ref={innerRef}>
        <sphereGeometry args={[0.5, 20, 16]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* ---------- Orbiting nodes + connector lines ---------- */
function OrbitSystem({
  mouse,
  palette,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  palette: Palette;
}) {
  const groupRef = React.useRef<THREE.Group>(null);

  const nodes = React.useMemo(() => {
    const count = TIER.nodes;
    return Array.from({ length: count }).map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.0 + (i % 3) * 0.3;
      return {
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ),
        speed: 0.15 + (i % 4) * 0.05,
        size: 0.04 + (i % 3) * 0.02,
        color: palette.nodes[i % 3],
      };
    });
  }, [palette]);

  /* Each line owns ONE Float32Array for its two endpoints. The frame loop
   * writes into it directly instead of rebuilding the geometry, which is
   * what made the old version allocate on every single frame. */
  const lines = React.useMemo(
    () =>
      nodes.map((_, i) => {
        const array = new Float32Array(6);
        const geometry = new THREE.BufferGeometry();
        const attribute = new THREE.BufferAttribute(array, 3);
        geometry.setAttribute("position", attribute);
        // The endpoints move every frame, so a recomputed bounding sphere
        // would be stale and the line could be culled mid-flight.
        geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);

        const material = new THREE.LineBasicMaterial({
          color: palette.lines[i % 2],
          transparent: true,
          opacity: palette.lineOpacity,
        });

        const object = new THREE.Line(geometry, material);
        object.frustumCulled = false;
        return { array, attribute, object };
      }),
    [nodes, palette]
  );

  // Per-frame writes go through a ref: mutable state by design, and it keeps
  // the frame loop free of anything the compiler must treat as render-derived.
  const linesRef = React.useRef(lines);
  React.useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  // three.js objects are not collected with the React tree.
  React.useEffect(
    () => () => {
      lines.forEach((l) => {
        l.object.geometry.dispose();
        (l.object.material as THREE.Material).dispose();
      });
    },
    [lines]
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;

    group.rotation.y = t * 0.05 + mouse.current.x * 0.25;
    group.rotation.x = mouse.current.y * 0.15;

    for (let i = 0; i < nodes.length; i++) {
      const mesh = group.children[i] as THREE.Mesh | undefined;
      if (!mesh?.position) continue;
      const node = nodes[i];

      const orbitT = t * node.speed;
      const x = node.position.x + Math.cos(orbitT) * 0.3;
      const y = node.position.y + Math.sin(orbitT * 1.3) * 0.3;
      const z = node.position.z + Math.sin(orbitT) * 0.3;
      mesh.position.set(x, y, z);

      // Write the far endpoint straight into the existing GPU buffer.
      const line = linesRef.current[i];
      line.array[3] = x;
      line.array[4] = y;
      line.array[5] = z;
      line.attribute.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i}>
          <sphereGeometry args={[node.size, TIER.sphereSegs, TIER.sphereSegs]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
      {lines.map((l, i) => (
        <primitive key={`line-${i}`} object={l.object} />
      ))}
    </group>
  );
}

/* ---------- Particle field ---------- */
function ParticleField({ palette }: { palette: Palette }) {
  const pointsRef = React.useRef<THREE.Points>(null);

  const { positions, colors } = React.useMemo(() => {
    const count = TIER.particles;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const swatches = palette.particles.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = swatches[Math.floor(Math.random() * swatches.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [palette]);

  // Two property writes per frame — the buffers never change.
  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = t * 0.01;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={IS_MOBILE ? 0.032 : 0.024}
        vertexColors
        transparent
        opacity={palette.particleOpacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Drifting fragments ---------- */
function CodeFragments({ palette }: { palette: Palette }) {
  const groupRef = React.useRef<THREE.Group>(null);

  const fragments = React.useMemo(
    () =>
      Array.from({ length: TIER.fragments }).map(() => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3 - 1,
        ] as [number, number, number],
        scale: 0.6 + Math.random() * 0.6,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < fragments.length; i++) {
      const child = group.children[i];
      if (!child) continue;
      const f = fragments[i];
      child.position.y = f.position[1] + Math.sin(t * f.speed + f.phase) * 0.2;
      child.position.x = f.position[0] + Math.cos(t * f.speed * 0.7 + f.phase) * 0.15;
      child.rotation.z = Math.sin(t * 0.3 + f.phase) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {fragments.map((f, i) => (
        <group key={i} position={f.position} scale={f.scale}>
          <mesh>
            <planeGeometry args={[0.5, 0.2]} />
            <meshBasicMaterial
              color={palette.nodes[i % 2]}
              transparent
              opacity={0.22}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- Camera rig: breathing zoom + slow revolution ---------- */
function CameraRig({
  mouse,
  scroll,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
}) {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const breath = Math.sin(t * 0.4) * 0.5 + 0.5;
    const baseZ = 4.5 + breath * 3.0;

    const orbitAngle = t * 0.08;
    const orbitX = Math.cos(orbitAngle) * 0.6;
    const orbitY = Math.sin(orbitAngle) * 0.3;

    /* eslint-disable react-hooks/immutability */
    camera.position.x = orbitX + mouse.current.x * 0.5;
    camera.position.y = orbitY + mouse.current.y * 0.4;
    camera.position.z = baseZ + scroll.current * 2.0;
    camera.lookAt(0, 0, 0);
    /* eslint-enable react-hooks/immutability */
  });

  return null;
}

/* ---------- Scene ---------- */
function Scene({
  mouse,
  scroll,
  palette,
  onSlow,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
  palette: Palette;
  onSlow: () => void;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <AdaptiveFrameRate onSlow={onSlow} />
      <CameraRig mouse={mouse} scroll={scroll} />

      {/* No lights: every material here is unlit by design. */}
      <Core mouse={mouse} scroll={scroll} palette={palette} />
      <OrbitSystem mouse={mouse} palette={palette} />
      <ParticleField palette={palette} />
      <CodeFragments palette={palette} />
    </>
  );
}

/* ---------- Public component ---------- */
export function HeroScene({ onSlow }: { onSlow: () => void }) {
  const mouse = React.useRef({ x: 0, y: 0 });
  const scroll = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(true);

  const { resolvedTheme } = useTheme();
  const palette = PALETTES[resolvedTheme === "dark" ? "dark" : "light"];

  // Pointer parallax is a desktop affordance; skip the listener on touch.
  React.useEffect(() => {
    if (REDUCED_MOTION || IS_MOBILE) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop rendering entirely when the hero is off screen or the tab is hidden.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { threshold: 0 }
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) setVisible(false);
      else {
        const rect = el.getBoundingClientRect();
        setVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {visible && (
        <Canvas
          dpr={[1, TIER.dpr]}
          frameloop="demand"
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "default",
            stencil: false,
            depth: true,
          }}
        >
          <AdaptiveDpr pixelated />
          <Scene mouse={mouse} scroll={scroll} palette={palette} onSlow={onSlow} />
        </Canvas>
      )}
    </div>
  );
}

/* ---------- Wrapper: WebGL detection + automatic downgrade ---------- */
export function HeroSceneWithFallback() {
  const [mode, setMode] = React.useState<"probing" | "webgl" | "fallback">("probing");

  React.useEffect(() => {
    // Deferred one frame so first paint happens before any canvas work.
    const raf = requestAnimationFrame(() => {
      if (REDUCED_MOTION) {
        setMode("fallback");
        return;
      }
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        setMode(gl ? "webgl" : "fallback");
      } catch {
        setMode("fallback");
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const downgrade = React.useCallback(() => setMode("fallback"), []);

  if (mode !== "webgl") return <HeroFallback />;
  return <HeroScene onSlow={downgrade} />;
}
