import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Planet from './planet'
import Satelite from './satelite'

export default function Scene() {
  return (


    <div style={{ width: '100%', height: '60vh' }}>
      <Canvas 

        className="absolute top-0 left-0 w-full h-full"
      
      camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Planet />
        <Satelite />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
