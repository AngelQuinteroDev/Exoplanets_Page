import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Html } from "@react-three/drei";
import { Suspense, useRef } from "react";
import Satelite from "./satelite";
import Saturn from "./saturn";
import Sun from "./sun";
import IAFormSection from "./iaFormSection";  
import Planet from "./planet";

function ScrollScene() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <ScrollControls pages={10} damping={0.2}>
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
{/* 🌌 Hero Section / Intro */}
<section
id = "hero"

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
  {/* 🪐 Caja de texto a la izquierda */}
  <div
    style={{
      flex: "1 1 500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      order: 1,
    }}
  >
    <div
      style={{
        backgroundColor: "rgba(40, 40, 40, 0.65)",
        padding: "2.5rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        maxWidth: "600px",
        textAlign: "left",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
        ExoKeplerAlly:
        <br />
        <span className="text-blue-400">
          Unlocking the universe, one exoplanet at a time.
        </span>
      </h1>

      <p
        className="text-base md:text-lg"
        style={{
          lineHeight: "1.8",
          color: "#ddd",
          marginTop: "1rem",
        }}
      >
        Thousands of exoplanets have been identified manually, slowly.  
        Now, with <strong>ExoKeplerAlly</strong>, we wield the power of{" "}
        <span className="text-blue-300">artificial intelligence</span>,{" "}
        NASA’s <strong>Kepler datasets</strong>, and{" "}
        <span className="text-blue-300">web design</span> to accelerate this
        search — transforming raw data into discoveries.
      </p>
      <button
  onClick={() => {
    const element = document.getElementById("ia-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }}
  style={{
    marginTop: "2rem",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.75rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
>
  🚀 Test model
</button>
    </div>
  </div>

  {/* 🌠 Imagen a la derecha */}
  <div
    style={{
      flex: "1 1 500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      order: 2,
    }}
  >
    <img
      src="/exoplanetas.jpeg"
      alt="Exoplanet visualization"
      style={{
        width: "100%",
        maxWidth: "520px",
        borderRadius: "1rem",
        boxShadow: "0 6px 25px rgba(0,0,0,0.5)",
        objectFit: "cover",
      }}
    />
  </div>
</section>









{/* 📝 Project Summary Section */}
<section
  style={{
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    padding: "3rem 1rem",
    background: "transparent",
  }}
>
  {/* Texto */}
  <div
    style={{
      flex: "1 1 500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      order: 2,
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
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <img 
    src="/Logo_Page.png" 
    alt="Logo" 
    style={{ width: "40px", height: "40px", objectFit: "contain" }} 
  />
   Project Summary
      </h2>
      <p className="text-base md:text-lg" style={{ lineHeight: "1.6", color: "#ddd" }}>
        <strong>What did we develop?</strong> <br />
        ExoKeplerAlly is a web platform powered by our own AI model that analyzes NASA’s open-source Kepler exoplanet dataset to classify whether a celestial candidate can be confirmed as an exoplanet or identified as a false positive.
      </p>
    </div>
  </div>

  {/* Imagen */}
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
      src="/Kepler_Telescope.avif"
      alt="Exoplanet AI visualization"
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    />
  </div>
</section>












{/* 🌟 Section: How does it address the challenge? */}
<section
  style={{
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    marginLeft: "2rem",
    padding: "",
    background: "linear-gradient(135deg, rgba(31,31,46,0.8), rgba(44,44,58,0.8))", // efecto visual distinto
  }}
>
  {/* Imagen a la izquierda */}
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
      src="/LightCurves.webp"
      alt="Automation process illustration"
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "1rem",
        boxShadow: "0 6px 25px rgba(0,0,0,0.5)",
      }}
    />
  </div>

  {/* Texto a la derecha */}
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
        backgroundColor: "rgba(50, 50, 60, 0.7)",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
        maxWidth: "600px",
      }}
    >
<h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
  <img 
    src="/Logo_Page.png" 
    alt="Logo" 
    style={{ width: "40px", height: "40px", objectFit: "contain" }} 
  />
  How does it address the challenge?
</h2>
      <p className="text-base md:text-lg" style={{ lineHeight: "1.6", color: "#ddd" }}>
        Our platform automates what was once a manual human process. It classifies exoplanet candidates. Users, regardless of their experience in astronomy, can explore the tool, understand the parameters, and test whether something is an exoplanet, using both known candidates and new data.
      </p>
    </div>
  </div>
</section>







{/* 🌟 Section: Why is it important? */}
<section
  style={{
width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    marginLeft: "2rem",
    padding: "",
    background: "linear-gradient(135deg, rgba(31,31,46,0.8), rgba(44,44,58,0.8))", // gradiente inverso
  }}
>
  {/* Texto a la izquierda */}
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
        backgroundColor: "rgba(50, 50, 60, 0.7)",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
        maxWidth: "600px",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <img 
    src="/Logo_Page.png" 
    alt="Logo" 
    style={{ width: "40px", height: "40px", objectFit: "contain" }} 
  />
        Why is it important?
      </h2>
      <p className="text-base md:text-lg" style={{ lineHeight: "1.6", color: "#ddd" }}>
        Every new exoplanet confirmed brings us closer to answering one of humanity’s oldest questions: Are we alone in the universe? By merging AI, open data, and intuitive design, our project lowers the barrier to participation in astronomical discovery and empowers the global community to contribute to space science.
      </p>
    </div>
  </div>

  {/* Imagen a la derecha */}
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
      src="/kepler-186-452.avif"
      alt="Global contribution illustration"
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "1rem",
        boxShadow: "0 6px 25px rgba(0,0,0,0.5)",
      }}
    />
  </div>
</section>


 <IAFormSection/>


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



    {/* Resultado */}
    <div id="result" className="text-white text-lg mt-8 text-center font-semibold"></div>
  </div>
</section>




{/* 👥 Our Crew Section */}
<section
  id="our-crew"
  style={{
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem 1rem",
    background: "linear-gradient(135deg, #1f1f2e, #2c2c3a)",
    color: "white",
  }}
>
  {/* Título */}
  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
    <h2 className="text-4xl md:text-5xl font-bold mb-2">Our Crew</h2>
    <p className="text-base md:text-lg" style={{ maxWidth: "700px", margin: "0 auto", color: "#ccc" }}>
      Behind ExoKeplerAlly is a multidisciplinary team of engineering students who share a common passion for space and see it as the direction of humanity’s future.
    </p>
  </div>

  {/* Contenedor de miembros */}
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "1.5rem",
      maxWidth: "1000px",
      width: "100%",
    }}
  >
    {/* Miembro */}
    {[
      {
        name: "Sofía Orozco Pastran",
        role: "Mechatronics Engineering Student",
        linkedin: "#",
      },
      {
        name: "Camilo Andrés Pineda Rugeles",
        role: "Mechatronics Engineering Student",
        linkedin: "#",
      },
      {
        name: "Ángel Gabriel Quintero Morales",
        role: "Multimedia Engineering Student",
        linkedin: "#",
      },
      {
        name: "David Camilo Vega Mariño",
        role: "Mechatronics Engineering Student",
        linkedin: "#",
      },
    ].map((member, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "rgba(40, 40, 40, 0.65)",
          padding: "1.5rem",
          borderRadius: "1rem",
          flex: "1 1 250px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        {/* Placeholder para foto */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#555",
            marginBottom: "1rem",
          }}
        >
          {/* Aquí puedes poner <img src="ruta.jpg" /> si tienes fotos */}
        </div>
        <h3 className="font-bold text-lg">{member.name}</h3>
        <p style={{ color: "#ccc", marginBottom: "0.5rem" }}>{member.role}</p>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          LinkedIn
        </a>
      </div>
    ))}
  </div>

  {/* Mensaje final */}
  <p
    style={{
      marginTop: "2rem",
      textAlign: "center",
      maxWidth: "700px",
      color: "#bbb",
    }}
  >
    Together, we aim to accelerate humanity’s search for new worlds — and maybe, one day, new homes.
  </p>
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
