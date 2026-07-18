"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
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

/**
 * The SVG's skin tones read washed-out under the scene lights. Warm the base
 * a touch and, more importantly, SPREAD the ramp: the shading tones sit well
 * below the base and the blush well above, so ears, nose and cheeks keep
 * their definition instead of melting into one flat tone.
 */
const COLOR_OVERRIDE: Record<string, string> = {
  "#f3cfbf": "#f1bda9", // base skin — warmer than the artwork, lighter than before
  "#f1b9a7": "#e39b85", // mid shading — clearly below the base
  "#de9379": "#cf7d61", // deep shading (inner ear, nose) — anchors the ramp
  "#faabaa": "#f79598", // cheek blush — more saturated so it pops again
};

function MascotModel({ hovered }: { hovered: boolean }) {
  const data = useLoader(SVGLoader, MASCOT_SVG);
  const group = useRef<THREE.Group>(null);
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
          color: COLOR_OVERRIDE[hex] ?? fill,
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

  // He always faces forward — no cursor tracking. Hovering only wakes the
  // glow and gives him a small friendly lift; the personality comes from the
  // stars and motes, not from the character swivelling to follow the mouse.
  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      0,
      0.06
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      0,
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
          gold fill and a cool rim to give the extrusion its edges. These lights
          carry the whole scene on their own — no external HDR environment, which
          on mobile would fail to fetch from the drei CDN and leave the mascot
          rendering as a flat black silhouette. */}
      <ambientLight intensity={1.6} />
      <hemisphereLight args={["#ffffff", "#dfe7ee", 0.9]} />
      <directionalLight
        position={[5, 8, 12]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-7, 4, 6]} intensity={0.8} color="#ffffff" />
      <pointLight position={[4, -4, 8]} intensity={1.3} color="#f0b753" />
      <pointLight position={[-4, 2, 6]} intensity={0.6} color="#ffffff" />

      <Suspense fallback={null}>
        {/* Bob only: rotationIntensity 0 keeps him square to the camera. */}
        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.7}>
          <MascotModel hovered={hovered} />
        </Float>
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
      </Suspense>
    </Canvas>
  );
}
