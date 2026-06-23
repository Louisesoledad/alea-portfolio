import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import Home from "./pages/Home"
import About from "./pages/About"
import Work from "./pages/Works"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import JarvisAssistant from "./components/JarvisAssistant"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [loaderLeaving, setLoaderLeaving] = useState(false)

  useEffect(() => {
    document.body.classList.add("is-loading-screen")

    const leaveTimer = window.setTimeout(() => {
      setLoaderLeaving(true)
    }, 2400)

    const removeTimer = window.setTimeout(() => {
      setShowLoader(false)
      document.body.classList.remove("is-loading-screen")
    }, 3100)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
      document.body.classList.remove("is-loading-screen")
    }
  }, [])

  return (
    <>
      {showLoader && <LoadingScreen isLeaving={loaderLeaving} />}
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
