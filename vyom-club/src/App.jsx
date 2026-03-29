import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Join from './pages/Join';
import AdminDashboard from './pages/AdminDashboard';
import ClickSpark from './components/ClickSpark';
import Galaxy from './components/Galaxy';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white relative">
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
          <Galaxy 
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>
        <ClickSpark
          sparkColor='#fff'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Navbar />
          <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/about" element={<About />} />
              <Route path="/join" element={<Join />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
        </ClickSpark>
      </div>
    </Router>
  );
}

export default App;
