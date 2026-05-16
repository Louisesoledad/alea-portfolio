import { useEffect, useState } from "react"
import { FiArrowUp } from "react-icons/fi"
import { useLocation } from "react-router-dom"

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [pathname, hash])

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-24 right-5 sm:bottom-28 sm:right-8 z-50 flex h-12 w-12 items-center justify-center border border-[#853953] bg-[#1f1f1f]/90 text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#853953] hover:shadow-[0_18px_45px_rgba(133,57,83,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d0a7b7] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FiArrowUp aria-hidden="true" className="text-lg" />
    </button>
  )
}

export default ScrollToTop
