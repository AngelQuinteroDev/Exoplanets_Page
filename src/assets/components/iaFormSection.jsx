import React, { useState } from "react";

export default function IAFormSection() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { label: "Orbital period", name: "koi_period" },
    { label: "Transit impact", name: "koi_impact" },
    { label: "Transit duration", name: "koi_duration" },
    { label: "Transit depth", name: "koi_depth" },
    { label: "Planet/star radius ratio", name: "koi_ror" },
    { label: "Stellar density", name: "koi_srho" },
    { label: "Planet radius", name: "koi_prad" },
    { label: "Semi-major axis", name: "koi_sma" },
    { label: "Equilibrium temperature", name: "koi_teq" },
    { label: "Incident flux", name: "koi_insol" },
    { label: "Distance-radius ratio", name: "koi_dor" },
    { label: "Signal-to-noise ratio", name: "koi_model_snr" },
    { label: "Stellar effective temperature", name: "koi_steff" },
    { label: "Stellar surface gravity", name: "koi_slogg" },
    { label: "Stellar radius", name: "koi_srad" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("⏳ Analyzing data...");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        "https://us-central1-your-project.cloudfunctions.net/predictExoplanet",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.prediction === 1 || json.is_exoplanet) {
        setResult("✅ Signs of an exoplanet detected!");
      } else {
        setResult("❌ No exoplanet detected in the given data.");
      }
    } catch (err) {
      console.error(err);
      setResult("⚠️ Error processing prediction.");
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
          🚀 Test the AI Model
        </h2>
        <p className="text-base md:text-lg mb-6 text-gray-300">
          Enter the stellar system parameters to see if it could contain an exoplanet.
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
              {loading ? "Analyzing..." : "Analyze data"}
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
