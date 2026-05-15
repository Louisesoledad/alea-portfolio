import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Work from "./pages/Works"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import JarvisAssistant from "./components/JarvisAssistant"

function App() {
  return (
    <>
    <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Work />} />
      </Routes>

      <Footer /> {/* ✅ ADD HERE */}
      <JarvisAssistant />
    </>
  )
}

export default App