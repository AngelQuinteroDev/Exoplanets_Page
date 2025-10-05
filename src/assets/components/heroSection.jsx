// src/components/HeroSection.jsx
export default function heroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center h-screen text-white">
      <h1 className="text-6xl font-bold mb-4">Explora el Universo con IA</h1>
      <p className="text-lg max-w-2xl">
        Descubre cómo la inteligencia artificial identifica exoplanetas y expande nuestro conocimiento del cosmos.
      </p>
      <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition">
        Comenzar
      </button>
    </section>
  );
}
