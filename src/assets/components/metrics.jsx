import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

export default function ModelMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exokeplerally-production.up.railway.app/metrics")
      .then((res) => res.json())
      .then((data) => {
        const formatted = Object.entries(data).map(([key, value]) => ({
          name: key.replace(/_/g, " ").toUpperCase(),
          value: parseFloat((value * 100).toFixed(2)),
          rawValue: value,
          fill: getColor(key),
        }));
        setMetrics(formatted);
      })
      .catch((err) => console.error("Error fetching metrics:", err))
      .finally(() => setLoading(false));
  }, []);

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

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col gap-2 text-sm">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              style={{ backgroundColor: entry.color }}
              className="w-4 h-4 rounded"
            />
            <span className="text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
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
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        📊 Model Performance Metrics
      </h2>

      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-lg">Loading model metrics...</p>
        </div>
      ) : (
        <>
          {/* Gráficos lado a lado */}
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Radial Bar Chart */}
            <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Radial Performance View
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="100%"
                  barSize={18}
                  data={metrics}
                  startAngle={180}
                  endAngle={-180}
                >
                  <RadialBar
                    minAngle={15}
                    background={{ fill: "#2a2a2a" }}
                    clockWise
                    dataKey="value"
                    cornerRadius={8}
                  />
                  <Legend
                    iconSize={12}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    content={<CustomLegend />}
                  />
                  <Tooltip
                    formatter={(val) => [`${val}%`, "Score"]}
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: "10px",
                      border: "1px solid #444",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Comparative View
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#aaa", fontSize: 12 }}
                    angle={-20}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tick={{ fill: "#aaa" }}
                    domain={[0, 100]}
                    label={{
                      value: "Percentage (%)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#aaa",
                    }}
                  />
                  <Tooltip
                    formatter={(val) => [`${val}%`, "Score"]}
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: "10px",
                      border: "1px solid #444",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {metrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cards de métricas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
            {metrics.map((m, idx) => (
              <div
                key={m.name}
                className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-gray-600 hover:scale-105 transform"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-300">
                    {m.name}
                  </h3>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: m.fill }}
                  />
                </div>
                <p
                  className="text-4xl font-bold mb-2"
                  style={{ color: m.fill }}
                >
                  {m.value}%
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${m.value}%`,
                      backgroundColor: m.fill,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}