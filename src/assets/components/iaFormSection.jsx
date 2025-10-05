import React, { useState } from "react";

export default function IAFormSection() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { label: "Período orbital", name: "koi_period" },
    { label: "Impacto del tránsito", name: "koi_impact" },
    { label: "Duración del tránsito", name: "koi_duration" },
    { label: "Profundidad del tránsito", name: "koi_depth" },
    { label: "Radio relativo (planeta/estrella)", name: "koi_ror" },
    { label: "Densidad estelar", name: "koi_srho" },
    { label: "Radio planetario", name: "koi_prad" },
    { label: "Semieje mayor", name: "koi_sma" },
    { label: "Temperatura de equilibrio", name: "koi_teq" },
    { label: "Flujo incidente", name: "koi_insol" },
    { label: "Relación distancia-radio", name: "koi_dor" },
    { label: "Relación señal-ruido", name: "koi_model_snr" },
    { label: "Temperatura efectiva estelar", name: "koi_steff" },
    { label: "Gravedad superficial estelar", name: "koi_slogg" },
    { label: "Radio estelar", name: "koi_srad" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("⏳ Analizando datos...");
    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        "https://us-central1-tu-proyecto.cloudfunctions.net/predecirExoplaneta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.prediccion === 1 || json.es_exoplaneta) {
        setResult("✅ ¡Se detectan indicios de un exoplaneta!");
      } else {
        setResult("❌ No se detecta exoplaneta en los datos ingresados.");
      }
    } catch (err) {
      console.error(err);
      setResult("⚠️ Error al procesar la predicción.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          backgroundColor: "rgba(40, 40, 40, 0.6)",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
          🚀 Prueba el modelo de IA
        </h2>
        <p className="text-base md:text-lg mb-6 text-gray-300">
          Ingresa los parámetros del sistema estelar para descubrir si podría contener un exoplaneta.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((f) => (
            <div key={f.name} className="text-left">
              <label className="block text-gray-200 text-sm mb-1 font-semibold">
                {f.label}
              </label>
              <p className="text-gray-400 text-xs mb-2 italic">{f.name}</p>
              <input
                name={f.name}
                type="number"
                step="any"
                required
                className="p-3 rounded bg-gray-800 text-white w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded shadow-md transition-all disabled:opacity-50"
            >
              {loading ? "Analizando..." : "Analizar datos"}
            </button>
          </div>
        </form>

        <div className="text-white text-lg mt-6 text-center font-semibold">
          {result}
        </div>
      </div>
    </section>
  );
}
