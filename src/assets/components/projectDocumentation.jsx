import React from "react";
import { FaGithub } from "react-icons/fa";

export default function ProjectDocumentation() {
  return (
    <section
      id="project-documentation"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
        backgroundColor: "rgba(20, 20, 20, 0.9)",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
         <img 
    src="/Logo_Page.png" 
    alt="Logo" 
    style={{ width: "40px", height: "40px", objectFit: "contain" }} 
  />Project Documentation
      </h2>

      {/* --- GitHub Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 w-full max-w-4xl">
        {/* Website Repository */}
        <a
          href="https://github.com/AngelQuinteroDev/Exoplanets_Page"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 transition-all rounded-2xl shadow-lg p-6 text-center border border-gray-700 hover:border-blue-400"
        >
          <FaGithub className="text-6xl text-white mb-4" />
          <h3 className="text-xl font-semibold text-white mb-1">
            Website Repository
          </h3>
          <p className="text-gray-400 text-sm">
            React + Vite front-end for the ExoKeplerAlly platform.
          </p>
        </a>

        {/* API Repository */}
        <a
          href="https://github.com/DasherPR/ExoKeplerAllY"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 transition-all rounded-2xl shadow-lg p-6 text-center border border-gray-700 hover:border-blue-400"
        >
          <FaGithub className="text-6xl text-white mb-4" />
          <h3 className="text-xl font-semibold text-white mb-1">
            API Repository
          </h3>
          <p className="text-gray-400 text-sm">
            Flask-based AI API hosted on Railway.
          </p>
        </a>
      </div>

      {/* --- YouTube Video --- */}
      <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-700">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ReTLw9cIA4Y?si=7Ln6d9T3s3aE2txR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </section>
  );
}
