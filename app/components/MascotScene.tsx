"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const MASCOT_SVG = "/mascot/mascotte.svg";

/**
 * The mascot is built by extruding the real brand SVG's paths into 3D — no
 * modelling tool involved. Each path keeps its own fill colour, so the
 * character reads as Tutorly's mascot with genuine depth and thickness.
 *
 * Depth is assigned per-colour so the layers separate the way they do in the
 * artwork: the cap/gown (navy) sit back, the face pushes forward, and the gold
 * stars sit proudest of all.
 */
const DEPTH_BY_FILL: Record<string, number> = {
  "#042c44": 5, // cap, hair, gown, outlines
  "#084467": 6, // hair highlight
  "#f3cfbf": 9, // face — pushed forward so it catches the light
  "#f1b9a7": 8, // skin shadow
  "#de9379": 8, // facial features
  "#faabaa": 9, // blush
  "#fffffe": 9, // eye white
  "#ffbb04": 12, // stars — proudest layer
  "#ff9204": 11, // star shadow
};

function MascotModel() {
  const data = useLoader(SVGLoader, MASCOT_SVG);
  const group = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const out: { geometry: THREE.ExtrudeGeometry; color: string }[] = [];

    for (const path of data.paths) {
      const style = (path.userData as { style?: { fill?: string } } | undefined)
        ?.style;
      const fill = style?.fill;
      if (!fill || fill === "none") continue;

      const hex = new THREE.Color(fill).getHexString();
      const depth = DEPTH_BY_FILL[`#${hex}`] ?? 6;

      for (const shape of SVGLoader.createShapes(path)) {
        out.push({
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
    return out;
  }, [data]);

  // Centre the extruded artwork on its own bounding box so it orbits about its
  // middle rather than the SVG's top-left origin.
  const centre = useMemo(() => {
    const box = new THREE.Box3();
    for (const { geometry } of shapes) {
      geometry.computeBoundingBox();
      if (geometry.boundingBox) box.union(geometry.boundingBox);
    }
    return box.getCenter(new THREE.Vector3());
  }, [shapes]);

  // Idle turn, plus a soft lean toward the cursor. Never a full spin — the back
  // of the character doesn't exist in the source art, so we keep him front-on.
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    group.current.rotation.y = Math.sin(t * 0.35) * 0.18 + x * 0.32;
    group.current.rotation.x = -y * 0.18 + Math.sin(t * 0.5) * 0.04;
  });

  return (
    <group ref={group}>
      {/* SVG's Y axis points down; flip it, and scale to a sane world size. */}
      <group
        scale={[0.021, -0.021, 0.021]}
        position={[-centre.x * 0.021, centre.y * 0.021, 0]}
      >
        {shapes.map(({ geometry, color }, i) => (
          <mesh key={i} geometry={geometry} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={color}
              roughness={0.25}
              metalness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.15}
              reflectivity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function MascotScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 21], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 8, 10]} intensity={2.4} castShadow />
      <directionalLight position={[-8, 2, 4]} intensity={1} color="#00d4ff" />
      <pointLight position={[0, -6, 8]} intensity={1.6} color="#f0b753" />

      <Suspense fallback={null}>
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.7}>
          <MascotModel />
        </Float>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
