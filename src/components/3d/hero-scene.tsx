"use client";

import { HeroFallback } from "./hero-fallback";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerspectiveCamera } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/* ============================================================
 * 3D Hero Scene — Floating AI Core
 *
 * Design intent (unchanged from the original):
 *  - Central glowing icosahedron (the "intelligence core")
 *  - Orbiting nodes representing connected systems
 *  - Thin lines connecting core <-> nodes
 *  - Subtle particle field for depth
 *  - Floating code fragments
 *  - Reacts subtly to mouse + scroll
 *
 * Theming:
 *  Colours are no longer baked into the materials. A single amber ramp is
 *  swapped per theme, because a value that reads well on the espresso ground
 *  disappears on cream — the light set is darker and more saturated so the
 *  geometry keeps its contrast against the paper background.
 *
 * Performance:
 *  - Procedural geometry only (no GLTF)
 *  - Adaptive DPR + event throttling
 *  - Pauses when tab hidden or offscreen
 *  - Reduced-motion fallback handled by the wrapper
 * ========================================================== */

type Palette = {
  core: string;
  wire: string;
  glow: string;
  nodes: [string, string, string];
  lines: [string, string];
  particles: [string, string, string];
  light: string;
  fill: string;
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
    light: "#E0A53F",
    fill: "#C0752A",
    particleOpacity: 0.55,
    lineOpacity: 0.22,
  },
  // Brighter, emissive: reads as light against the espresso ground.
  dark: {
    core: "#F0A83F",
    wire: "#FFC163",
    glow: "#F08A3C",
    nodes: ["#FFC163", "#F0813A", "#FFD866"],
    lines: ["#FFC163", "#F0813A"],
    particles: ["#FFC163", "#F0813A", "#FFD866"],
    light: "#FFC163",
    fill: "#F0813A",
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
      {/* Solid translucent core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshStandardMaterial
          color={palette.core}
          emissive={palette.core}
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.55} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.35} />
      </mesh>

      <pointLight color={palette.light} intensity={2.5} distance={6} decay={2} />
    </group>
  );
}

/* ---------- Orbiting nodes + connecting lines ---------- */
function OrbitSystem({
  mouse,
  palette,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  palette: Palette;
}) {
  const groupRef = React.useRef<THREE.Group>(null);

  const nodes = React.useMemo(() => {
    const count = IS_MOBILE ? 6 : 9;
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

  const lineMaterials = React.useMemo(
    () =>
      nodes.map(
        (_, i) =>
          new THREE.LineBasicMaterial({
            color: palette.lines[i % 2],
            transparent: true,
            opacity: palette.lineOpacity,
          })
      ),
    [nodes, palette]
  );

  const lineGeometries = React.useMemo(
    () =>
      nodes.map(() =>
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, 0),
        ])
      ),
    [nodes]
  );

  // three.js objects are not garbage collected with the React tree.
  React.useEffect(
    () => () => {
      lineMaterials.forEach((m) => m.dispose());
      lineGeometries.forEach((g) => g.dispose());
    },
    [lineMaterials, lineGeometries]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.rotation.y = t * 0.05 + mouse.current.x * 0.25;
    groupRef.current.rotation.x = mouse.current.y * 0.15;

    groupRef.current.children.forEach((child, i) => {
      if (i >= nodes.length) return;
      const node = nodes[i];
      const mesh = child as THREE.Mesh;
      if (!mesh.position) return;

      const orbitT = t * node.speed;
      const orbitRadius = 0.3;
      mesh.position.x = node.position.x + Math.cos(orbitT) * orbitRadius;
      mesh.position.y = node.position.y + Math.sin(orbitT * 1.3) * orbitRadius;
      mesh.position.z = node.position.z + Math.sin(orbitT) * orbitRadius;

      lineGeometries[i].setFromPoints([new THREE.Vector3(0, 0, 0), mesh.position.clone()]);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
      {lineGeometries.map((geo, i) => (
        // @ts-expect-error - three's Line constructor accepts (geometry, material)
        <line key={`line-${i}`} geometry={geo} material={lineMaterials[i]} />
      ))}
    </group>
  );
}

/* ---------- Particle field ---------- */
function ParticleField({ palette }: { palette: Palette }) {
  const pointsRef = React.useRef<THREE.Points>(null);

  const { positions, colors } = React.useMemo(() => {
    const count = IS_MOBILE ? 250 : 600;
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

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = t * 0.01;
  });

  return (
    <points ref={pointsRef}>
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
        size={IS_MOBILE ? 0.028 : 0.022}
        vertexColors
        transparent
        opacity={palette.particleOpacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Floating code fragments ---------- */
function CodeFragments({ palette }: { palette: Palette }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const fragments = React.useMemo(() => {
    const count = IS_MOBILE ? 4 : 7;
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3 - 1,
      ] as [number, number, number],
      scale: 0.6 + Math.random() * 0.6,
      speed: 0.3 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (i >= fragments.length) return;
      const f = fragments[i];
      child.position.y = f.position[1] + Math.sin(t * f.speed + f.phase) * 0.2;
      child.position.x = f.position[0] + Math.cos(t * f.speed * 0.7 + f.phase) * 0.15;
      child.rotation.z = Math.sin(t * 0.3 + f.phase) * 0.1;
    });
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

/* ---------- Scene wrapper ---------- */
function Scene({
  mouse,
  scroll,
  palette,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
  palette: Palette;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <CameraRig mouse={mouse} scroll={scroll} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={0.65} color={palette.light} />
      <directionalLight position={[-5, -3, -5]} intensity={0.35} color={palette.fill} />

      <Core mouse={mouse} scroll={scroll} palette={palette} />
      <OrbitSystem mouse={mouse} palette={palette} />
      <ParticleField palette={palette} />
      <CodeFragments palette={palette} />
    </>
  );
}

/* ---------- CameraRig — breathing zoom + slow revolution ---------- */
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
    const orbitRadius = 0.6;
    const orbitX = Math.cos(orbitAngle) * orbitRadius;
    const orbitY = Math.sin(orbitAngle) * orbitRadius * 0.5;

    const scrollOffset = scroll.current * 2.0;
    const mouseX = mouse.current.x * 0.5;
    const mouseY = mouse.current.y * 0.4;

    /* eslint-disable react-hooks/immutability */
    camera.position.x = orbitX + mouseX;
    camera.position.y = orbitY + mouseY;
    camera.position.z = baseZ + scrollOffset;
    camera.lookAt(0, 0, 0);
    /* eslint-enable react-hooks/immutability */
  });

  return null;
}

/* ---------- Public component with viewport + reduced motion guards ---------- */
export function HeroScene() {
  const mouse = React.useRef({ x: 0, y: 0 });
  const scroll = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = React.useState(true);

  const { resolvedTheme } = useTheme();
  const palette = PALETTES[resolvedTheme === "dark" ? "dark" : "light"];

  React.useEffect(() => {
    if (REDUCED_MOTION) return;
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

  // Stop rendering when offscreen or the tab is hidden — no wasted GPU/battery.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShouldRender(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) setShouldRender(false);
      else {
        const rect = el.getBoundingClientRect();
        setShouldRender(rect.top < window.innerHeight && rect.bottom > 0);
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
      {shouldRender && (
        <Canvas
          dpr={[1, IS_MOBILE ? 1.5 : 2]}
          gl={{
            antialias: !IS_MOBILE,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          frameloop={REDUCED_MOTION ? "demand" : "always"}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Scene mouse={mouse} scroll={scroll} palette={palette} />
        </Canvas>
      )}
    </div>
  );
}

/* ---------- Wrapper with WebGL detection ---------- */
export function HeroSceneWithFallback() {
  const [supportsWebGL, setSupportsWebGL] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Probe deferred one frame: keeps the effect body free of synchronous
    // setState and lets first paint happen before any canvas/context work.
    const raf = requestAnimationFrame(() => {
      if (REDUCED_MOTION) {
        setSupportsWebGL(false);
        return;
      }
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        setSupportsWebGL(!!gl);
      } catch {
        setSupportsWebGL(false);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!supportsWebGL) {
    return <HeroFallback />;
  }
  return <HeroScene />;
}
