"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const MASCOT_SVG = "/mascot/mascotte.svg";

/**
 * The mascot is extruded straight from the brand SVG — no modelling tool. Each
 * path keeps its own fill, and depth is assigned per-colour so the layers
 * separate the way they do in the artwork: cap and gown sit back, the face
 * pushes forward, the gold stars sit proudest.
 */
const DEPTH_BY_FILL: Record<string, number> = {
  "#042c44": 5,
  "#084467": 6,
  "#f3cfbf": 9,
  "#f1b9a7": 8,
  "#de9379": 8,
  "#faabaa": 9,
  "#fffffe": 9,
  "#ffbb04": 12,
  "#ff9204": 11,
};

/** The star golds — these get the emissive pulse in activation mode. */
const STAR_FILLS = new Set(["#ffbb04", "#ff9204"]);

function MascotModel({ hovered }: { hovered: boolean }) {
  const data = useLoader(SVGLoader, MASCOT_SVG);
  const group = useRef<THREE.Group>(null);
  /** Accumulated sway phase — advancing it slower is what "slows the spin"
      smoothly, with no jump the way scaling elapsedTime would. */
  const phase = useRef(0);
  const starMats = useRef(new Set<THREE.MeshPhysicalMaterial>());

  const { shapes, centre } = useMemo(() => {
    const shapes: {
      geometry: THREE.ExtrudeGeometry;
      color: string;
      star: boolean;
    }[] = [];

    for (const path of data.paths) {
      const style = (path.userData as { style?: { fill?: string } } | undefined)
        ?.style;
      const fill = style?.fill;
      if (!fill || fill === "none") continue;

      const hex = `#${new THREE.Color(fill).getHexString()}`;
      const depth = DEPTH_BY_FILL[hex] ?? 6;

      for (const shape of SVGLoader.createShapes(path)) {
        shapes.push({
          geometry: new THREE.ExtrudeGeometry(shape, {
            depth,
            bevelEnabled: true,
            bevelThickness: 1.6,
            bevelSize: 1.1,
            bevelSegments: 4,
            curveSegments: 12,
          }),
          color: fill,
          star: STAR_FILLS.has(hex),
        });
      }
    }

    const box = new THREE.Box3();
    for (const { geometry } of shapes) {
      geometry.computeBoundingBox();
      if (geometry.boundingBox) box.union(geometry.boundingBox);
    }

    return { shapes, centre: box.getCenter(new THREE.Vector3()) };
  }, [data]);

  // Idle drift, a soft lean toward the cursor, and a friendly lift on hover.
  // Never a full spin — the back of the character doesn't exist in the art.
  useFrame((state, delta) => {
    if (!group.current) return;
    phase.current += delta * (hovered ? 0.35 : 1);
    const t = phase.current;
    const { x, y } = state.pointer;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t * 0.35) * 0.16 + x * 0.35,
      0.06
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.18 + Math.sin(t * 0.5) * 0.04,
      0.06
    );

    const target = hovered ? 1.06 : 1;
    const s = THREE.MathUtils.lerp(group.current.scale.x, target, 0.12);
    group.current.scale.setScalar(s);

    // Stars breathe with light while activated, fade dark when idle.
    const glow = hovered
      ? 0.55 + Math.sin(state.clock.elapsedTime * 3.4) * 0.3
      : 0;
    for (const m of starMats.current) {
      m.emissiveIntensity = THREE.MathUtils.lerp(m.emissiveIntensity, glow, 0.1);
    }
  });

  const k = 0.02;

  return (
    <group ref={group}>
      {/* SVG's Y axis points down — flip it, and centre on the bounding box. */}
      <group scale={[k, -k, k]} position={[-centre.x * k, centre.y * k, 0]}>
        {shapes.map(({ geometry, color, star }, i) => (
          <mesh key={i} geometry={geometry} castShadow receiveShadow>
            {/* Flat brand colours with a glossy coat — the artwork's own palette,
                not a material that recolours it. */}
            <meshPhysicalMaterial
              ref={
                star
                  ? (m: THREE.MeshPhysicalMaterial | null) => {
                      if (m) starMats.current.add(m);
                    }
                  : undefined
              }
              color={color}
              emissive={star ? "#ffbb04" : "#000000"}
              emissiveIntensity={0}
              roughness={0.35}
              metalness={0}
              clearcoat={0.9}
              clearcoatRoughness={0.25}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * A loose ring of gold motes around the mascot. Kept mounted and faded via
 * opacity so activation never pops — it breathes in.
 */
function Particles({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffbb04",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  );
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 10, 10), []);

  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, () => {
        const a = Math.random() * Math.PI * 2;
        const r = 5.5 + Math.random() * 3;
        return {
          position: [
            Math.cos(a) * r,
            Math.sin(a) * r * 0.8,
            (Math.random() - 0.5) * 3,
          ] as [number, number, number],
          scale: 0.07 + Math.random() * 0.12,
        };
      }),
    []
  );

  useFrame((_, delta) => {
    material.opacity = THREE.MathUtils.lerp(
      material.opacity,
      active ? 0.85 : 0,
      0.08
    );
    if (group.current) {
      group.current.visible = material.opacity > 0.01;
      group.current.rotation.z += delta * (active ? 0.25 : 0.05);
    }
  });

  return (
    <group ref={group}>
      {motes.map(({ position, scale }, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={material}
          position={position}
          scale={scale}
        />
      ))}
    </group>
  );
}

/**
 * Eases the camera to its target instead of re-creating it. Changing <Canvas>'s
 * `camera` prop would tear down the WebGL context and remount the whole scene —
 * which is what made the mascot visibly reload mid-flight.
 */
function CameraRig({ distance }: { distance: number }) {
  useFrame((state) => {
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      distance,
      0.08
    );
  });
  return null;
}

export default function MascotScene({
  hovered = false,
  distance = 21,
  shadow = true,
}: {
  hovered?: boolean;
  /** Dolly the camera — hover eases it slightly closer. */
  distance?: number;
  shadow?: boolean;
}) {
  const [ready, setReady] = useState(false);

  return (
    <Canvas
      // Set once. Never derive from props, or the canvas remounts.
      camera={{ position: [0, 0, 21], fov: 42 }}
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true }}
      onCreated={() => setReady(true)}
      style={{
        background: "transparent",
        opacity: ready ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <CameraRig distance={distance} />
      {/* Soft, neutral key light so the brand colours stay true, with a warm
          gold fill and a cool rim to give the extrusion its edges. */}
      <ambientLight intensity={1.1} />
      <directionalLight
        position={[5, 8, 12]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-7, 4, 6]} intensity={0.7} color="#ffffff" />
      <pointLight position={[4, -4, 8]} intensity={1.2} color="#f0b753" />

      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.7}>
          <MascotModel hovered={hovered} />
        </Float>
        <Particles active={hovered} />
        {/* Kept mounted and faded rather than removed — unmounting mid-frame
            causes a visible hitch. */}
        <ContactShadows
          position={[0, -5.4, 0]}
          opacity={shadow ? 0.28 : 0}
          scale={20}
          blur={3}
          far={6}
          color="#042c44"
        />
        <Environment preset="city" environmentIntensity={0.35} />
      </Suspense>
    </Canvas>
  );
}
