export default function Navbar() {
  
   const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        color: "white",
        background: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 10,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <img
          src="/ExoKepler_LogoAlly.png"
          alt="ExoKeplerAlly Logo"
          style={{ width: "170px", height: "60px" }}
        />
      </div>

      {/* Navigation Links */}
      <ul
        style={{
          display: "flex",
          gap: "1.5rem",
          listStyle: "none",
          margin: 0,
        }}
      >
        <li
          style={{ cursor: "pointer" }}
          onClick={() => scrollToSection("hero")}
        >
          Home
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => scrollToSection("ia-form")}
        >
          Test Model
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => scrollToSection("documentation")}
        >
          Documentation
        </li>
      </ul>
    </nav>
  );
}