  import { useRef } from 'react'
  import { useFrame } from '@react-three/fiber'

  export default function Planet() {
    const ref = useRef()

    useFrame(() => {
      ref.current.rotation.y += 0.005
    })

    return (
      <mesh ref={ref}>
        
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#2f80ed" metalness={0.4} roughness={0.3} />
      </mesh>
    )
  }
