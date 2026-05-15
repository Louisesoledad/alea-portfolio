import { useState, useEffect } from "react"

// 🔥 AUTO LOAD IMAGES
const socialMedia = Object.values(
  import.meta.glob("../assets/social-media/*", { eager: true })
).map((img) => img.default).sort()

const branding = Object.values(
  import.meta.glob("../assets/branding/*", { eager: true })
).map((img) => img.default).sort()

const website = Object.values(
  import.meta.glob("../assets/website/*", { eager: true })
).map((img) => img.default).sort()

const poster = Object.values(
  import.meta.glob("../assets/poster/*", { eager: true })
).map((img) => img.default).sort()

const projects = [
  { title: "Social Media Design", images: socialMedia },
  { title: "Branding Project", images: branding },
  { title: "Website Mockup", images: website },
  { title: "Poster Design", images: poster },
]

function WorkSection() {
  const [open, setOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 🔥 HOVER STATES
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)

  // 🔥 SLIDESHOW
  useEffect(() => {
    if (hoveredIndex === null) return

    const interval = setInterval(() => {
      setPrevIndex(imageIndex)
      setImageIndex((prev) =>
        (prev + 1) % projects[hoveredIndex].images.length
      )
    }, 800)

    return () => clearInterval(interval)
  }, [hoveredIndex, imageIndex])

  const next = () =>
    setCurrentIndex((prev) =>
      (prev + 1) % currentProject.images.length
    )

  const prev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? currentProject.images.length - 1 : prev - 1
    )

  // 🔥 KEYBOARD NAVIGATION
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false)
      if (!currentProject) return
      
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % currentProject.images.length)
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => prev === 0 ? currentProject.images.length - 1 : prev - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentProject])

  return (
    <div className="relative bg-[#1f1f1f] py-20 overflow-hidden">

      {/* 🔥 STRIPE */}
      <div className="absolute left-1/2 -translate-x-1/2 w-screen top-[55%] -translate-y-1/2 h-[28%] md:h-[40%] bg-[#5a2a4d]/90 z-[1]"></div>

      <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6">

        {/* ── HEADER ── */}
        <div className="relative text-center mb-14 md:mb-16 text-white">

          {/* LEFT DOTS */}
          <div className="hidden xl:grid grid-cols-12 gap-2 w-[370px] absolute left-[-240px] top-1/2 -translate-y-[85%]">
            {[...Array(36)].map((_, i) => {
              const col = i % 12
              const opacity = 0.2 + (col / 11) * 0.8
              return (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-white"
                  style={{ opacity }}
                />
              )
            })}
          </div>

          {/* RIGHT DOTS */}
          <div className="hidden xl:grid grid-cols-12 gap-2 w-[370px] absolute right-[-240px] top-1/2 -translate-y-[85%]">
            {[...Array(36)].map((_, i) => {
              const col = i % 12
              const opacity = 1 - (col / 11) * 0.8
              return (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-white"
                  style={{ opacity }}
                />
              )
            })}
          </div>

          {/* TITLE */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.1em] md:tracking-[0.15em] uppercase leading-none">
            DESIGN{" "}
            <span className="text-transparent stroke-text">
              SHOWCASE
            </span>
          </h2>

          {/* SUBTITLE */}
          <p className="text-gray-400 mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            A collection of my recent design projects and creative work.
          </p>
        </div>

        {/* ── CARD GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentProject(project)
                setCurrentIndex(0)
                setOpen(true)
              }}
              onMouseEnter={() => {
                setHoveredIndex(index)
                setImageIndex(0)
                setPrevIndex(0)
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative rounded-[28px] h-[360px] sm:h-[430px] md:h-[520px] lg:h-[580px] overflow-hidden cursor-pointer border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-700 ease-out"
            >

              {/* ── PREVIOUS IMAGE ── */}
              {hoveredIndex === index && (
                <img
                  src={project.images[prevIndex]}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                />
              )}

              {/* ── CURRENT IMAGE ── */}
              <img
                src={
                  hoveredIndex === index
                    ? project.images[imageIndex]
                    : project.images[0]
                }
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-[1.07] transition-transform duration-700 ease-out"
              />

              {/* ── OVERLAY ── */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/70 group-hover:via-black/10 transition-all duration-700" />

              {/* ── VIGNETTE ── */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

              {/* ── GLOW ── */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[28px]"
                style={{
                  boxShadow: "inset 0 0 60px rgba(255, 255, 255, 0.05)",
                }}
              />

              {/* ── NUMBER ── */}
              <div className="absolute top-5 left-5 md:top-6 md:left-6 z-20">
                <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.35em] text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* ── CONTENT ── */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-7">

                <div className="w-8 h-px bg-white/30 mb-4 group-hover:w-14 group-hover:bg-white/60 transition-all duration-500" />

                <p className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-white/45 mb-2 group-hover:text-white/65 transition-colors duration-500">
                  {["Social Media", "Branding", "Web Design", "Print & Poster"][index]}
                </p>

                <h3 className="text-xl sm:text-2xl md:text-[1.6rem] font-bold tracking-[0.08em] uppercase text-white leading-tight group-hover:-translate-y-0.5 group-hover:tracking-[0.12em] transition-all duration-500">
                  {project.title}
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white/75 transition-all duration-500">
                    View Project
                  </span>

                  <span className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/20 text-white/40 text-xs group-hover:border-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-500">
                    →
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ── MODAL ── */}
      {open && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-[6px]"
            style={{ background: "rgba(10,10,12,0.92)" }}
            onClick={() => setOpen(false)}
          />

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 text-base"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-10 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 text-2xl"
          >
            ‹
          </button>

          {/* IMAGE & THUMBNAILS */}
          <div className="relative z-10 flex flex-col items-center gap-4 md:gap-5 w-full mt-2">
            
            {/* MAIN IMAGE */}
            <div className="relative flex justify-center w-full">
              <img
                src={currentProject.images[currentIndex]}
                className="max-h-[60vh] md:max-h-[65vh] max-w-[92vw] md:max-w-[88vw] object-contain rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-opacity duration-300"
              />
            </div>

            {/* THUMBNAILS GALLERY AREA */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[92vw] md:max-w-[80vw]">
              
              {/* COUNTER */}
              <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-xs tracking-[0.4em] mb-1">
                <span>{String(currentIndex + 1).padStart(2, "0")}</span>
                <span className="w-8 h-px bg-white/20 inline-block" />
                <span>{String(currentProject.images.length).padStart(2, "0")}</span>
              </div>

              {/* THUMBNAILS ROW */}
              <div className="flex gap-3 overflow-x-auto py-2 px-4 snap-x max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {currentProject.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-500 snap-center cursor-pointer
                      ${currentIndex === idx 
                        ? "ring-2 ring-white opacity-100 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] z-10" 
                        : "ring-1 ring-white/10 opacity-40 hover:opacity-80 hover:ring-white/40 hover:scale-100 z-0 scale-95"
                      }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-3 md:right-10 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 text-2xl"
          >
            ›
          </button>

        </div>
      )}
    </div>
  )
}

export default WorkSection