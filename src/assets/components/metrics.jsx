import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from "recharts";

export default function ModelMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exokeplerally-production.up.railway.app/metrics")
      .then((res) => res.json())
      .then((data) => {
        // Redondear los valores a 4 decimales
        const formatted = Object.entries(data).map(([key, value]) => ({
          name: key.replace("_", " ").toUpperCase(),
          value: parseFloat((value * 100).toFixed(2)), // Pasar a porcentaje
          fill: getColor(key),
        }));
        setMetrics(formatted);
      })
      .catch((err) => console.error("Error fetching metrics:", err))
      .finally(() => setLoading(false));
  }, []);

  // Colores personalizados según la métrica
  const getColor = (key) => {
    switch (key) {
      case "accuracy":
        return "#00C49F";
      case "f1_score":
        return "#0088FE";
      case "precision":
        return "#FFBB28";
      case "recall":
        return "#FF8042";
      default:
        return "#8884d8";
    }
  };

  return (
    <section
      id="model-metrics"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0a 30%, #1a1a1a 100%)",
        padding: "4rem 1rem",
        color: "white",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
        📊 Model Performance Metrics
      </h2>

      {loading ? (
        <p className="text-gray-400 text-lg animate-pulse">
          Loading model metrics...
        </p>
      ) : (
        <>
          {/* --- Chart Section --- */}
          <div className="w-full max-w-4xl h-[400px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="90%"
                barSize={25}
                data={metrics}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={10}
                />
                <Legend
                  iconSize={16}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  formatter={(value) => <span style={{ color: "#fff" }}>{value}</span>}
                />
                <Tooltip
                  formatter={(val) => [`${val}%`, "Value"]}
                  contentStyle={{ backgroundColor: "#222", borderRadius: "10px" }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* --- Numeric Summary --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-center">
            {metrics.map((m) => (
              <div
                key={m.name}
                className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-5 shadow-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {m.name}
                </h3>
                <p className="text-3xl font-bold text-blue-400">{m.value}%</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
