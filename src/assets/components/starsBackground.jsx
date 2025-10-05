// src/components/StarBackground.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";

function AnimatedStars() {
  const group = useRef();

  // Movimiento suave con el mouse
  useFrame(({ mouse }) => {
    if (group.current) {
      group.current.rotation.x = mouse.y * 0.2;
      group.current.rotation.y = mouse.x * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
    </group>
  );
}

export default function StarBackground() {
  return (
    <Canvas className="fixed top-0 left-0 w-full h-full -z-10">
      <AnimatedStars />
    </Canvas>
  );
}
