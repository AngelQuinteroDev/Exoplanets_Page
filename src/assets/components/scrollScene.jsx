import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Html } from "@react-three/drei";
import { Suspense, useRef } from "react";
import Satelite from "./satelite";
import Saturn from "./saturn";
import Sun from "./sun";
import Planet from "./planet";

function ScrollScene() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.2}>
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
    const sunRef = useRef();

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

        if (sunRef.current) {
      const localOffset = Math.min(Math.max((offset - 0.4) / 0.4, 0), 1);
      sunRef.current.position.set(
        Math.sin(localOffset * Math.PI) * 10,
        -5 - localOffset * 25,
        0
      );
      sunRef.current.rotation.y += 0.01;
    }
  });

  

  return (
    <>
      {/* Satélite (primera sección) */}
      <group ref={satRef} position={[0, 5, 0]}>
        <Satelite scale={0.7} />
      </group>

      {/* Planeta (más abajo) */}
      <mesh ref={planetRef} position={[0, -10, 0]}>
        <Saturn scale={0}/>

      </mesh>

      <mesh ref={sunRef} position={[0, 0, 0]}>
        <Sun scale={0}/>

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
<section
  style={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "3rem 1rem",
    background: "transparent",
  }}
>
  <div
    style={{
      flex: "1 1 500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
    }}
  >
    <img
      src="public/exoplanetas.jpeg"
      alt="Exoplanet visualization"
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    />
  </div>

  <div
    style={{
      flex: "1 1 500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
    }}
  >
    <div
      style={{
        backgroundColor: "rgba(40, 40, 40, 0.6)",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        maxWidth: "600px",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        🌌 Proyecto: IA para Detectar Exoplanetas
      </h1>
      <p className="text-base md:text-lg" style={{ lineHeight: "1.6", color: "#ddd" }}>
        Explora cómo la inteligencia artificial ayuda a descubrir nuevos mundos fuera del sistema solar.
      </p>
    </div>
  </div>
</section>

{/* 🚀 Sección 4 — Prueba el modelo IA */}
<section
  style={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem 1rem",
  }}
>
  <div
    style={{
      backgroundColor: "rgba(40, 40, 40, 0.7)",
      padding: "3rem 2rem",
      borderRadius: "1rem",
      maxWidth: "900px",
      width: "100%",
      textAlign: "center",
      boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
      backdropFilter: "blur(8px)",
    }}
  >
    <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
      🚀 Prueba el modelo de IA
    </h2>
    <p className="text-base md:text-lg mb-8 text-gray-300">
      Ingresa los parámetros del sistema estelar y descubre si podría tener un exoplaneta 🌍
    </p>

    {/* Formulario */}
    <form
      id="ia-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const datos = Object.fromEntries(formData.entries());

        // Mostrar loading
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "⏳ Analizando datos...";
        resultDiv.style.color = "#ffd700";

        try {
          // 🔗 Aquí conectas con tu API en Firebase o donde tengas tu modelo
          const res = await fetch(
            "https://us-central1-tu-proyecto.cloudfunctions.net/predecirExoplaneta",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(datos),
            }
          );

          const resultado = await res.json();
          if (resultado.prediccion === 1 || resultado.es_exoplaneta) {
            resultDiv.innerHTML = "✅ ¡Se detectan indicios de un exoplaneta!";
            resultDiv.style.color = "#4ade80";
          } else {
            resultDiv.innerHTML = "❌ No se detecta exoplaneta en los datos ingresados.";
            resultDiv.style.color = "#f87171";
          }
        } catch (error) {
          console.error(error);
          resultDiv.innerHTML = "⚠️ Error al procesar la predicción.";
          resultDiv.style.color = "#facc15";
        }
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* 🧩 Campos del modelo IA */}
      <div>
        <label className="block text-gray-300 mb-2">Período orbital (koi_period)</label>
        <input type="number" name="koi_period" step="any" required className="p-3 rounded bg-gray-800 text-white w-full" />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Impacto (koi_impact)</label>
        <input type="number" name="koi_impact" step="any" required className="p-3 rounded bg-gray-800 text-white w-full" />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Duración del tránsito (koi_duration)</label>
        <input type="number" name="koi_duration" step="any" required className="p-3 rounded bg-gray-800 text-white w-full" />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Profundidad del tránsito (koi_depth)</label>
        <input type="number" name="koi_depth" step="any" required className="p-3 rounded bg-gray-800 text-white w-full" />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Radio relativo (koi_ror)</label>
        <input type="number" name="koi_ror" step="any" required className="p-3 rounded bg-gray-800 text-white w-full" />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Temperatura (koi_teq)</label>
        <input type="number" name="koi_teq" step="any" required className="p-3 rounded bg-gray-800 text-white w-full" />
      </div>

      {/* Botón */}
      <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded shadow-md transition-all"
        >
          Analizar datos
        </button>
      </div>
    </form>

    {/* Resultado */}
    <div id="result" className="text-white text-lg mt-8 text-center font-semibold"></div>
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
      Ingresa los parámetros del sistema estelar y descubre si podría tener un exoplaneta.
    </p>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        // aquí luego conectaremos con la API
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Campos del modelo IA */}
      <input type="number" step="any" placeholder="koi_period" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_impact" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_duration" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_depth" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_ror" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_srho" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_prad" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_sma" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_teq" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_insol" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_dor" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_model_snr" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_steff" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_slogg" className="p-3 rounded bg-gray-800 text-white w-full" />
      <input type="number" step="any" placeholder="koi_srad" className="p-3 rounded bg-gray-800 text-white w-full" />

      <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded shadow-md transition-all"
        >
          Analizar datos
        </button>
      </div>
    </form>

    {/* Resultado (se mostrará cuando conectes con la API) */}
    <div id="result" className="text-white text-lg mt-4 text-center"></div>
  </div>
</section>
    </div>
  );
}

export default ScrollScene;
