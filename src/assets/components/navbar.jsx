export default function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        color: 'white',
        background: 'rgba(0, 0, 0, 0.6)',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 10,
        backdropFilter: 'blur(10px)'
      }}
    >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>🌌 ExoAI Explorer</h1>
      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0 }}>
        <li style={{ cursor: 'pointer' }}>Inicio</li>
        <li style={{ cursor: 'pointer' }}>Cómo funciona</li>
        <li style={{ cursor: 'pointer' }}>Nuestro equipo</li>
      </ul>
    </nav>
  )
}
