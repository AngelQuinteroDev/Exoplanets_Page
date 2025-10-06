import React, { useState } from "react";

export default function IAFormSection() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("⏳ Analyzing data...");
    try {
      const res = await fetch(
        "https://exokeplerally-production.up.railway.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (json.prediction === 1 || json.is_exoplanet)
        setResult("✅ Signs of an exoplanet detected!");
      else setResult("❌ No exoplanet detected in the given data.");
    } catch (err) {
      console.error(err);
      setResult("⚠️ Error processing prediction.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToParameters = () => {
    const section = document.getElementById("parameters-explanation");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="ia-form"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(40, 40, 40, 0.65)",
          padding: "2.5rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 text-center">
           <img 
    src="/Logo_Page.png" 
    alt="Logo" 
    style={{ width: "40px", height: "40px", objectFit: "contain" }} 
  />Test the AI Model
        </h2>
        <p className="text-base md:text-lg mb-6 text-gray-300 text-center">
          Enter the stellar system parameters below to analyze the possibility of an exoplanet.
        </p>

        {/* 🔘 New Button to Explanation Section */}
        <div className="flex justify-center mb-10">
          <button
            onClick={scrollToParameters}
            className="bg-transparent border border-blue-400 hover:bg-blue-500 hover:text-white text-blue-400 px-6 py-2 rounded-full font-medium transition-all"
          >
            Learn about the parameters ↓
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {fields.map((f) => (
            <div key={f.name} className="flex items-center gap-4">
              <label className="text-gray-300 text-sm w-48 flex-shrink-0">
                {f.label}{" "}
                <span className="text-gray-500 text-xs">({f.name})</span>
              </label>
              <input
                type="number"
                name={f.name}
                step="any"
                required
                value={formData[f.name] || ""}
                onChange={handleChange}
                className="p-2.5 rounded bg-gray-800 text-white flex-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-center mt-8">
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded shadow-md transition-all disabled:opacity-50 font-medium"
            >
              {loading ? "Analyzing..." : "Analyze Data"}
            </button>
          </div>
        </div>

        <div className="text-white text-lg mt-8 text-center font-semibold">
          {result}
        </div>
      </div>
    </section>
  );
}
