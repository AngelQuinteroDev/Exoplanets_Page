import Navbar from './assets/components/navbar'
import Scene from './assets/components/scene'
import Footer from './assets/components/footer'
import Satelite from './assets/components/satelite'
import HeroSection from './assets/components/heroSection'
import StarsBackground from './assets/components/starsBackground'
import SpaceBackground from './assets/components/spaceBackground'
import ScrollScene from './assets/components/scrollScene'

function App() {
  return (
    <div 
    
    style={{ overflow: 'hidden', minHeight: '100vh}', position: 'relative' }}>
      <SpaceBackground />
      <Navbar />
        <ScrollScene />
      <Footer />
    </div>
  )
}

export default App
