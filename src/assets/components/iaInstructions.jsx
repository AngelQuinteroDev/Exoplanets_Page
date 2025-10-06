import React, { useState } from "react";

/* 📄 IA Model Instructions with Accordion */
export default function IAInstructions() {
  const fields = [
    {
      name: "koi_period",
      title: "Orbital Period (koi_period)",
      description:
        "Time elapsed between consecutive planetary transits. The orbital period of the planet, i.e., how much time passes between one transit and the next.",
    },
    {
      name: "koi_impact",
      title: "Transit Impact (koi_impact)",
      description:
        "How centered or off-centered the planet’s shadow is when it crosses the star. The transit’s 'path offset' — how close the planet passes to the center of the star from our line of sight.",
    },
    {
      name: "koi_duration",
      title: "Transit Duration (koi_duration)",
      description:
        "Duration is measured from the first contact between the planet and star until the last contact. Calculated using a Mandel-Agol model on the Kepler light curve.",
    },
    {
      name: "koi_depth",
      title: "Transit Depth (koi_depth)",
      description:
        "The fraction of stellar flux lost at the minimum of the planetary transit. Indicates how much light disappears when the planet blocks the star.",
    },
    {
      name: "koi_ror",
      title: "Planet/Star Radius Ratio (koi_ror)",
      description: "The planet radius divided by the stellar radius.",
    },
    {
      name: "koi_srho",
      title: "Stellar Density (koi_srho)",
      description:
        "Fitted stellar density derived directly from the transit’s shape, depending on period, depth, and duration.",
    },
    {
      name: "koi_prad",
      title: "Planet Radius (koi_prad)",
      description:
        "Actual size of the planet, calculated from the planet-star radius ratio and the stellar radius.",
    },
    {
      name: "koi_sma",
      title: "Semi-Major Axis (koi_sma)",
      description:
        "Average distance between the planet and the star. Derived from Kepler's third law using orbital period and stellar mass.",
    },
    {
      name: "koi_teq",
      title: "Equilibrium Temperature (koi_teq)",
      description:
        "Estimated temperature of the planet assuming energy balance, Bond albedo of 0.3, blackbody approximation, and uniform heat distribution.",
    },
    {
      name: "koi_insol",
      title: "Incident Flux (koi_insol)",
      description:
        "Amount of stellar energy the planet receives relative to Earth, depends on stellar radius, temperature, and semi-major axis.",
    },
    {
      name: "koi_dor",
      title: "Distance-Radius Ratio (koi_dor)",
      description:
        "Distance between planet and star at mid-transit divided by stellar radius. Assumes zero orbital eccentricity.",
    },
    {
      name: "koi_model_snr",
      title: "Signal-to-Noise Ratio (koi_model_snr)",
      description:
        "Transit depth normalized by the mean uncertainty in the flux during the transits. Measures how clearly the planet signal stands out from noise.",
    },
    {
      name: "koi_steff",
      title: "Stellar Effective Temperature (koi_steff)",
      description: "Photospheric (surface) temperature of the star.",
    },
    {
      name: "koi_slogg",
      title: "Stellar Surface Gravity (koi_slogg)",
      description: "Base-10 logarithm of the acceleration due to gravity at the surface of the star.",
    },
    {
      name: "koi_srad",
      title: "Stellar Radius (koi_srad)",
      description: "Photospheric radius of the star.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="ia-instructions"
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "3rem 1rem",
        background: "linear-gradient(135deg, #2c2c3a, #1f1f2e)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "900px", textAlign: "center", marginBottom: "3rem" }}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">🚀 How to Use the AI Model</h2>
        <p style={{ color: "#ccc", fontSize: "1.1rem" }}>
          Enter the stellar system parameters in the form below. Click on each field to learn what it represents and how the AI model uses it to predict whether a candidate is an exoplanet.
        </p>
      </div>

      <div style={{ maxWidth: "900px", width: "100%" }}>
        {fields.map((field, index) => (
          <div
            key={field.name}
            style={{
              marginBottom: "1rem",
              borderRadius: "0.5rem",
              background: "rgba(40,40,40,0.7)",
              cursor: "pointer",
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
            onClick={() => toggleIndex(index)}
          >
            <div
              style={{
                padding: "1rem 1.5rem",
                fontWeight: "600",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {field.title}
              <span style={{ fontSize: "1.2rem" }}>{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <div style={{ padding: "0 1.5rem 1rem 1.5rem", color: "#ccc" }}>
                {field.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
