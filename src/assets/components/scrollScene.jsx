import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import Satelite from "./satelite";
import Saturn from "./saturn";
import Sun from "./sun";
import IAFormSection from "./iaFormSection";
import IAInstructions from "./iaInstructions";
import ProjectDocumentation from "./projectDocumentation";
import ModelMetrics from "./metrics";

function ScrollScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = maxScroll > 0 ? currentScroll / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <ScrollObjects scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "1100vh",
          width: "100%",
        }}
      >
        <ScrollText />
      </div>
    </>
  );
}

function ScrollObjects({ scrollProgress }) {
  const satRef = useRef();
  const planetRef = useRef();
  const sunRef = useRef();

  useFrame(() => {
    if (satRef.current) {
      const localOffset = Math.min(Math.max((scrollProgress - 0) / 0.4, 0), 1);
      satRef.current.position.set(2 * localOffset - 1, 3 - localOffset * 8, 0);
      satRef.current.rotation.y += 0.01;
    }

    if (planetRef.current) {
      const localOffset = Math.min(Math.max((scrollProgress - 0.4) / 0.4, 0), 1);
      planetRef.current.position.set(
        Math.sin(localOffset * Math.PI) * 5,
        -5 - localOffset * 10,
        0
      );
      planetRef.current.rotation.y += 0.01;
    }

    if (sunRef.current) {
      const localOffset = Math.min(Math.max((scrollProgress - 0.4) / 0.4, 0), 1);
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
      <group ref={satRef} position={[0, 5, 0]}>
        <Satelite scale={0.7} />
      </group>
      <mesh ref={planetRef} position={[0, -10, 0]}>
        <Saturn scale={0} />
      </mesh>
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <Sun scale={0} />
      </mesh>
    </>
  );
}

function ScrollText() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <section
        id="hero"
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(40, 40, 40, 0.8)",
            padding: "3rem",
            borderRadius: "1rem",
            maxWidth: "800px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "4rem", color: "white", marginBottom: "1rem" }}>
            ExoKeplerAlly
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#60a5fa", marginBottom: "2rem" }}>
            Unlocking the universe, one exoplanet at a time.
          </p>
          <p style={{ fontSize: "1.1rem", color: "#ddd", lineHeight: "1.8" }}>
            Thousands of exoplanets have been identified manually, slowly. Now, with{" "}
            <strong>ExoKeplerAlly</strong>, we wield the power of artificial intelligence,
            NASA's Kepler datasets, and web design to accelerate this search.
          </p>
        </div>
      </section>

      <IAFormSection />
      <ModelMetrics />
      <IAInstructions />
      <ProjectDocumentation />
    </div>
  );
}

export default ScrollScene;