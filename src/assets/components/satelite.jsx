// src/components/PlanetModel.jsx
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";


export default function Satelite() {
  const planet = useGLTF("/Models/satelite.glb"); // Ruta de tu modelo
  const ref = useRef();



  return <primitive ref={ref} object={planet.scene} scale={5} position={[-8, -1, 6]} rotation={[Math.PI/4, 0, 0]} />;
}
