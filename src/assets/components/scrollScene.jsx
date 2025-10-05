import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Html } from "@react-three/drei";
import { Suspense, useRef } from "react";
import Satelite from "./satelite";

function ScrollScene() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.15}>
            <Scroll>
              <ScrollObjects />
            </Scroll>
            <Scroll html>
              <ScrollText />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

function ScrollObjects() {
  const scroll = useScroll();
  const satRef = useRef();
  const planetRef = useRef();

  useFrame(() => {
    const offset = scroll.offset; // valor 0–1 en todo el scroll

    // 🛰️ SATÉLITE — aparece en la primera parte del scroll (0 → 0.4)
    if (satRef.current) {
      const localOffset = Math.min(Math.max((offset - 0) / 0.4, 0), 1); 
      satRef.current.position.set(2 * localOffset - 1, 3 - localOffset * 8, 0);
      satRef.current.rotation.y += 0.01;
    }

    // 🪐 PLANETA — aparece más abajo (por ejemplo entre 0.4 → 0.8)
    if (planetRef.current) {
      const localOffset = Math.min(Math.max((offset - 0.4) / 0.4, 0), 1);
      planetRef.current.position.set(
        Math.sin(localOffset * Math.PI) * 5,
        -5 - localOffset * 10,
        0
      );
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      {/* Satélite (primera sección) */}
      <group ref={satRef} position={[0, 5, 0]}>
        <Satelite scale={0.7} />
      </group>

      {/* Planeta (más abajo) */}
      <mesh ref={planetRef} position={[0, -1000, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#4c9fff"
          emissive="#1b2f80"
          emissiveIntensity={0.6}
        />
      </mesh>
    </>
  );
}


function ScrollText() {
  const sectionStyle = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "3rem 1rem",
  };

  const boxStyle = {
    backgroundColor: "rgba(40, 40, 40, 0.6)", // gris translúcido
    padding: "2rem",
    borderRadius: "1rem",
    maxWidth: "800px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
  };

  const textStyle = {
    lineHeight: "1.6",
    color: "#ddd",
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
        position: "relative",
        zIndex: 10, // para que quede encima del canvas 3D
      }}
    >
      {/* 🌌 Sección 1 */}
      <section style={sectionStyle}>
        <div style={boxStyle}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🌌 Proyecto: IA para Detectar Exoplanetas
          </h1>
          <p className="text-base md:text-lg" style={textStyle}>
            Explora cómo la inteligencia artificial ayuda a descubrir nuevos
            mundos fuera del sistema solar.
          </p>
        </div>
      </section>

      {/* 🎯 Sección 2 */}
      <section style={sectionStyle}>
        <div style={boxStyle}>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            🎯 Objetivos del Proyecto
          </h2>
          <p className="text-base md:text-lg" style={textStyle}>
            Nuestro modelo busca identificar señales en los datos de luz estelar
            que indiquen la presencia de exoplanetas.
          </p>
        </div>
      </section>

      {/* 🧠 Sección 3 */}
      <section style={sectionStyle}>
        <div style={boxStyle}>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            🧠 Cómo se hizo
          </h2>
          <p className="text-base md:text-lg" style={textStyle}>
            Entrenamos una red neuronal convolucional con datos del telescopio
            Kepler, procesando curvas de luz y clasificando patrones.
          </p>
        </div>
      </section>

            {/* 🧠 Sección 3 */}
      <section style={sectionStyle}>
        <div style={boxStyle}>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            🧠 Cómo se hizo
          </h2>
          <p className="text-base md:text-lg" style={textStyle}>
            Entrenamos una red neuronal convolucional con datos del telescopio
            Kepler, procesando curvas de luz y clasificando patrones.
          </p>
        </div>
      </section>


            {/* 🧠 Sección 3 */}
      <section style={sectionStyle}>
        <div style={boxStyle}>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            🧠 Cómo se hizo
          </h2>
          <p className="text-base md:text-lg" style={textStyle}>
            Entrenamos una red neuronal convolucional con datos del telescopio
            Kepler, procesando curvas de luz y clasificando patrones.
          </p>
        </div>
      </section>

      {/* 🚀 Sección 4 */}
      <section style={sectionStyle}>
        <div style={boxStyle}>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            🚀 Prueba el modelo
          </h2>
          <p className="text-base md:text-lg mb-6" style={textStyle}>
            Ingresa los parámetros de tu estrella y descubre si podría tener un
            exoplaneta orbitando.
          </p>
          <form className="flex flex-col md:flex-row items-center justify-center gap-3">
            <input
              type="number"
              placeholder="Periodo orbital (días)"
              className="p-3 rounded bg-gray-800 text-white w-64"
            />
            <input
              type="number"
              placeholder="Radio de la estrella"
              className="p-3 rounded bg-gray-800 text-white w-64"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">
              Analizar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ScrollScene;
