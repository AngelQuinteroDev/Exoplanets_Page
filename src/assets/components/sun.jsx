import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ----------------- SHADER DEL SOL -----------------
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;

  float noise(vec2 p) {
    return sin(p.x * 10.0 + time * 0.5) * sin(p.y * 10.0 + time * 0.5);
  }

  void main() {
    float n = noise(vUv * 3.0);
    float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);

    vec3 color = vec3(1.0, 0.5 + 0.5 * n, 0.0) * (1.0 + 0.3 * n);
    color += vec3(1.0, 0.8, 0.3) * intensity;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ----------------- SHADER DE LA ATMÓSFERA -----------------
const atmosphereVertex = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = `
  uniform float time;
  varying vec3 vNormal;

  void main() {
    float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    float flicker = sin(time * 2.0) * 0.1 + 0.9;
    vec3 color = vec3(1.0, 0.7, 0.1) * intensity * flicker;
    gl_FragColor = vec4(color, 0.2);
  }
`;

export default function Sun() {
  const sunRef = useRef();
  const haloRef = useRef();

  const uniforms = useRef({
    time: { value: 0 },
  });

  const haloUniforms = useRef({
    time: { value: 0 },
  });

  useFrame((_, delta) => {
    // Rotación del sol y animación de shaders
    sunRef.current.rotation.y += delta * 0.2;
    uniforms.current.time.value += delta;
    haloUniforms.current.time.value += delta;
  });

  return (
    <group>
      {/* 🌞 Sol principal */}
      <mesh ref={sunRef} position={[0, -50, 6]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          uniforms={uniforms.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* 🌤 Halo atmosférico */}
      <mesh ref={haloRef} position={[0, -50, 6]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <shaderMaterial
          uniforms={haloUniforms.current}
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
        />
      </mesh>

      {/* 💡 Luz del sol */}
      <pointLight position={[0, 0, 0]} intensity={6} color="#ffcc66" distance={5} />
    </group>
  );
}
