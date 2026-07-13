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

function MascotModel({ hovered }: { hovered: boolean }) {
  const data = useLoader(SVGLoader, MASCOT_SVG);
  const group = useRef<THREE.Group>(null);

  const { shapes, centre } = useMemo(() => {
    const shapes: { geometry: THREE.ExtrudeGeometry; color: string }[] = [];

    for (const path of data.paths) {
      const style = (path.userData as { style?: { fill?: string } } | undefined)
        ?.style;
      const fill = style?.fill;
      if (!fill || fill === "none") continue;

      const depth = DEPTH_BY_FILL[`#${new THREE.Color(fill).getHexString()}`] ?? 6;

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
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
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
  });

  const k = 0.02;

  return (
    <group ref={group}>
      {/* SVG's Y axis points down — flip it, and centre on the bounding box. */}
      <group scale={[k, -k, k]} position={[-centre.x * k, centre.y * k, 0]}>
        {shapes.map(({ geometry, color }, i) => (
          <mesh key={i} geometry={geometry} castShadow receiveShadow>
            {/* Flat brand colours with a glossy coat — the artwork's own palette,
                not a material that recolours it. */}
            <meshPhysicalMaterial
              color={color}
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

export default function MascotScene({
  hovered = false,
  distance = 21,
  shadow = true,
}: {
  hovered?: boolean;
  /** Pull the camera in when the scene renders small (the docked companion). */
  distance?: number;
  shadow?: boolean;
}) {
  const [ready, setReady] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, distance], fov: 42 }}
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
        {shadow && (
          <ContactShadows
            position={[0, -5.4, 0]}
            opacity={0.28}
            scale={20}
            blur={3}
            far={6}
            color="#042c44"
          />
        )}
        <Environment preset="city" environmentIntensity={0.35} />
      </Suspense>
    </Canvas>
  );
}
