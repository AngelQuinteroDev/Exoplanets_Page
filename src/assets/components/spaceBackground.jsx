// src/components/SpaceBackground.jsx
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

// 🌌 Estrellas
function Stars({ count = 6000 }) {
  const ref = useRef();

  // Posiciones aleatorias
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 200;
    }
    return arr;
  }, [count]);

  // Rotación lenta
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0002;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        color="white"
        size={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// 🌌 Skybox
function Skybox() {
  const [cubeTexture] = useLoader(THREE.CubeTextureLoader, [
    [
      "/cubemap/px.png",
      "/cubemap/nx.png",
      "/cubemap/py.png",
      "/cubemap/ny.png",
      "/cubemap/pz.png",
      "/cubemap/nz.png",
    ],
  ]);

  return <primitive attach="background" object={cubeTexture} />;
}

// ☄️ Cometa
function Comet() {
  const ref = useRef();

  const [x, y, z] = useMemo(
    () => [
      (Math.random() - 0.5) * 100,
      Math.random() * 40,
      (Math.random() - 0.5) * 100,
    ],
    []
  );

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += 0.05;
      ref.current.position.y -= 0.02;
      if (ref.current.position.x > 60) ref.current.position.x = -60;
    }
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="#00bfff" />
    </mesh>
  );
}

// 🌠 Fondo espacial principal
export default function SpaceBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.3} />
        <Skybox />
        <Stars count={6000} />
        <Comet />
      </Canvas>
    </div>
  );
}
