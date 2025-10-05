// src/components/PlanetModel.jsx
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";


export default function Saturn() {
  const planet = useGLTF("/Models/saturno.glb"); // Ruta de tu modelo
  const ref = useRef();



  return <primitive ref={ref} object={planet.scene} scale={0.03} position={[0, -40, 6]} rotation={[Math.PI/3, 0, Math.PI/3]} />;
}
