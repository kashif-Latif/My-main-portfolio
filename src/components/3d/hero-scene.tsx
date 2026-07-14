"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
 * 3D Hero Scene — Floating AI Core
 *
 * Design intent:
 *  - Central glowing icosahedron (the "intelligence core")
 *  - Orbiting nodes representing connected systems
 *  - Thin lines connecting core <-> nodes
 *  - Subtle particle field for depth
 *  - Floating code fragments
 *  - Reacts subtly to mouse + scroll
 *
 * Performance:
 *  - Procedural geometry only (no GLTF)
 *  - Instanced particles
 *  - Adaptive DPR + event throttling
 *  - Pauses when tab hidden or offscreen
 *  - Reduced-motion fallback handled by parent
 * ============================================================ */

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
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const wireRef = React.useRef<THREE.Mesh>(null);
  const innerRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current || !innerRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle rotation
    meshRef.current.rotation.x = t * 0.15 + mouse.current.y * 0.2;
    meshRef.current.rotation.y = t * 0.2 + mouse.current.x * 0.3;

    wireRef.current.rotation.x = -t * 0.1 + mouse.current.y * 0.15;
    wireRef.current.rotation.y = -t * 0.15 + mouse.current.x * 0.2;

    innerRef.current.rotation.x = t * 0.3;
    innerRef.current.rotation.y = t * 0.4;

    // Subtle scale pulse + scroll parallax
    const pulse = 1 + Math.sin(t * 0.8) * 0.04;
    const scale = pulse - scroll.current * 0.4;
    meshRef.current.scale.setScalar(Math.max(0.4, scale));
    wireRef.current.scale.setScalar(Math.max(0.5, scale * 1.08));
    innerRef.current.scale.setScalar(Math.max(0.3, scale * 0.7));

    // Parallax drift
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
          color="#3a6df0"
          emissive="#3a6df0"
          emissiveIntensity={0.5}
          transparent
          opacity={0.18}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial
          color="#6fa8ff"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial
          color="#9b8cff"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Point light inside the core */}
      <pointLight color="#6fa8ff" intensity={2.5} distance={6} decay={2} />
    </group>
  );
}

/* ---------- Orbiting nodes + connecting lines ---------- */
function OrbitSystem({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const lineRefs = React.useRef<THREE.Line[]>([]);

  // Generate fixed positions for orbiting nodes
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
        color: i % 3 === 0 ? "#6fa8ff" : i % 3 === 1 ? "#9b8cff" : "#5fd9e8",
      };
    });
  }, []);

  // Pre-compute line geometries that we'll update each frame
  const lineMaterials = React.useMemo(
    () =>
      nodes.map(
        (_, i) =>
          new THREE.LineBasicMaterial({
            color: i % 2 === 0 ? "#6fa8ff" : "#9b8cff",
            transparent: true,
            opacity: 0.18,
          })
      ),
    [nodes]
  );

  const lineGeometries = React.useMemo(
    () => nodes.map(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)])),
    [nodes]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.rotation.y = t * 0.05 + mouse.current.x * 0.25;
    groupRef.current.rotation.x = mouse.current.y * 0.15;

    // Update each node + its line
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

      // Update line geometry: from origin to node
      const points = [new THREE.Vector3(0, 0, 0), mesh.position.clone()];
      lineGeometries[i].setFromPoints(points);
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

/* ---------- Particle field (instanced) ---------- */
function ParticleField() {
  const pointsRef = React.useRef<THREE.Points>(null);

  const { positions, colors } = React.useMemo(() => {
    const count = IS_MOBILE ? 250 : 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#6fa8ff"),
      new THREE.Color("#9b8cff"),
      new THREE.Color("#5fd9e8"),
    ];
    for (let i = 0; i < count; i++) {
      // Spread in a spherical shell
      const r = 3.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

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
        size={IS_MOBILE ? 0.025 : 0.018}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Floating code fragments ---------- */
function CodeFragments() {
  const groupRef = React.useRef<THREE.Group>(null);
  const fragments = React.useMemo(() => {
    const labels = ["{ }", "</>", "()", "[]", "=>", "ai", "ml", "fn"];
    const count = IS_MOBILE ? 4 : 7;
    return Array.from({ length: count }).map((_, i) => ({
      label: labels[i % labels.length],
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
          {/* Tiny plane with a code symbol — using a simple mesh */}
          <mesh>
            <planeGeometry args={[0.5, 0.2]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#6fa8ff" : "#9b8cff"}
              transparent
              opacity={0.25}
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
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}) {
  const { gl } = useThree();

  React.useEffect(() => {
    gl.setClearColor(new THREE.Color("#0a0a14"), 0);
  }, [gl]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

      {/* Camera rig — creates the zoom in/out breathing + slow revolution */}
      <CameraRig mouse={mouse} scroll={scroll} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#6fa8ff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#9b8cff" />

      <Core mouse={mouse} scroll={scroll} />
      <OrbitSystem mouse={mouse} />
      <ParticleField />
      <CodeFragments />
    </>
  );
}

/* ---------- CameraRig — zoom in/out breathing + slow orbital revolution ---------- */
function CameraRig({
  mouse,
  scroll,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Breathing zoom: camera dollies in and out over ~8s cycle
    // Range: z = 4.5 (zoomed in) to z = 7.5 (zoomed out)
    const breathCycle = t * 0.4; // slow cycle
    const breath = Math.sin(breathCycle) * 0.5 + 0.5; // 0 to 1
    const baseZ = 4.5 + breath * 3.0; // 4.5 to 7.5

    // Slow orbital revolution: camera moves in a small circle around the scene
    // This makes the whole scene feel like it's revolving
    const orbitAngle = t * 0.08; // very slow revolution
    const orbitRadius = 0.6;
    const orbitX = Math.cos(orbitAngle) * orbitRadius;
    const orbitY = Math.sin(orbitAngle) * orbitRadius * 0.5;

    // Apply scroll parallax (push camera back as user scrolls down)
    const scrollOffset = scroll.current * 2.0;

    // Apply mouse parallax (subtle)
    const mouseX = mouse.current.x * 0.5;
    const mouseY = mouse.current.y * 0.4;

    /* eslint-disable react-hooks/immutability */
    camera.position.x = orbitX + mouseX;
    camera.position.y = orbitY + mouseY;
    camera.position.z = baseZ + scrollOffset;

    // Camera always looks at the center
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

  // Track mouse
  React.useEffect(() => {
    if (REDUCED_MOTION) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Track scroll
  React.useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pause when offscreen or tab hidden
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
        // Re-check viewport visibility
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
          <Scene mouse={mouse} scroll={scroll} />
        </Canvas>
      )}
    </div>
  );
}

/* ---------- Fallback (when WebGL unavailable or reduced motion) ---------- */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Animated gradient orbs */}
      <div
        className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.18 250 / 40%) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-[40%] top-[40%] h-[30vmin] w-[30vmin] rounded-full opacity-40 blur-3xl animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 295 / 40%) 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute left-[60%] top-[60%] h-[25vmin] w-[25vmin] rounded-full opacity-30 blur-3xl animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.15 195 / 40%) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* Static grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Central geometric SVG */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
      >
        <circle cx="140" cy="140" r="60" stroke="oklch(0.7 0.18 250 / 40%)" strokeWidth="1" />
        <circle cx="140" cy="140" r="90" stroke="oklch(0.65 0.2 295 / 30%)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="140" cy="140" r="120" stroke="oklch(0.72 0.15 195 / 25%)" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="140" cy="140" r="12" fill="oklch(0.7 0.18 250 / 60%)" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 140 + Math.cos(angle) * 90;
          const y = 140 + Math.sin(angle) * 90;
          return (
            <g key={i}>
              <line
                x1="140"
                y1="140"
                x2={x}
                y2={y}
                stroke="oklch(0.7 0.18 250 / 15%)"
                strokeWidth="0.5"
              />
              <circle cx={x} cy={y} r="3" fill="oklch(0.7 0.18 250 / 70%)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------- Wrapper with WebGL detection ---------- */
export function HeroSceneWithFallback() {
  const [supportsWebGL, setSupportsWebGL] = React.useState<boolean | null>(null);

  React.useEffect(() => {
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
  }, []);

  if (supportsWebGL === null) {
    return <HeroFallback />;
  }
  if (!supportsWebGL) {
    return <HeroFallback />;
  }
  return <HeroScene />;
}
