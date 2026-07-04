import { useEffect, useState } from "react"
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi"

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
  {
    title: "Social Media Design",
    category: "Social Media",
    scope: "Digital Content",
    description: "Campaign-ready visuals for posts, stories, and branded content systems.",
    images: socialMedia,
  },
  {
    title: "Branding Project",
    category: "Brand Identity",
    scope: "Visual System",
    description: "Logo-driven identity work with clean layouts, premium color, and brand consistency.",
    images: branding,
  },
  {
    title: "Website Mockup",
    category: "Web Design",
    scope: "Interface Study",
    description: "Modern digital layouts built around hierarchy, contrast, and polished presentation.",
    images: website,
  },
  {
    title: "Poster Design",
    category: "Print Design",
    scope: "Editorial Layout",
    description: "Bold poster compositions with strong type, imagery, and visual rhythm.",
    images: poster,
  },
]

function WorkSection() {
  const [open, setOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)

  useEffect(() => {
    if (hoveredIndex === null) return

    const currentImages = projects[hoveredIndex].images
    if (currentImages.length <= 1) return

    const interval = setInterval(() => {
      setImageIndex((prev) => {
        setPrevIndex(prev)
        return (prev + 1) % currentImages.length
      })
    }, 900)

    return () => clearInterval(interval)
  }, [hoveredIndex])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }

      if (!currentProject) return

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % currentProject.images.length)
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? currentProject.images.length - 1 : prev - 1
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentProject])

  const openProject = (project) => {
    setCurrentProject(project)
    setCurrentIndex(0)
    setOpen(true)
  }

  const next = () => {
    if (!currentProject) return

    setCurrentIndex((prev) =>
      (prev + 1) % currentProject.images.length
    )
  }

  const prev = () => {
    if (!currentProject) return

    setCurrentIndex((current) =>
      current === 0 ? currentProject.images.length - 1 : current - 1
    )
  }

  return (
    <section className="relative bg-dark text-white min-h-screen flex items-center px-6 sm:px-8 md:px-[8%] lg:px-[12%] overflow-hidden py-24 md:py-28 lg:py-32">

      <div className="absolute left-0 top-[52%] -translate-y-1/2 w-full h-[240px] sm:h-[300px] md:h-[360px] bg-gradient-to-r from-[#1f1f1f] via-[#3d2135] to-[#853953]"></div>

      <div className="hidden lg:block absolute top-24 right-[9%] w-44 h-44 border-[5px] border-[#853953]"></div>
      <div className="hidden lg:block absolute bottom-16 left-10 md:left-20 w-44 md:w-60 h-44 md:h-60 border-[5px] border-[#853953]"></div>

      <div className="hidden xl:grid absolute top-36 left-[8%] grid-cols-4 gap-3">
        {[...Array(16)].map((_, i) => {
          const row = Math.floor(i / 4)

          return (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-white"
              style={{ opacity: 0.2 + (3 - row) * 0.18 }}
            />
          )
        })}
      </div>

      <div className="hidden md:grid absolute right-6 lg:right-[12%] bottom-28 grid-cols-5 gap-3">
        {[...Array(25)].map((_, i) => {
          const col = i % 5

          return (
            <div
              key={i}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white"
              style={{ opacity: 0.16 + col * 0.16 }}
            />
          )
        })}
      </div>

      <div className="relative z-10 w-full">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-end mb-12 md:mb-16">
          <div className="relative max-w-3xl">
            <p className="text-[#d0a7b7] text-xs sm:text-sm tracking-[0.35em] uppercase mb-4">
              Selected Projects
            </p>

            <h2 className="font-brunson text-[44px] sm:text-[58px] md:text-[76px] lg:text-[90px] leading-none tracking-[0.08em]">
  Design
  <span className="block text-transparent [-webkit-text-stroke:1.5px_white]">
    Showcase
  </span>
</h2>
          </div>

          <div className="relative max-w-xl lg:justify-self-end">
            <div className="hidden lg:block absolute -top-10 -left-10 w-28 h-28 border-[5px] border-[#853953] -z-10"></div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              A curated view of visual design work across brand identity, social media, web mockups, and print layouts.
            </p>

            <div className="mt-7 grid grid-cols-3 border-y border-white/10 divide-x divide-white/10">
              {["Brand", "Digital", "Print"].map((item) => (
                <div key={item} className="py-4 px-3 text-center">
                  <span className="block text-xs sm:text-sm font-bold uppercase tracking-[0.22em] leading-none">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => openProject(project)}
              onMouseEnter={() => {
                setHoveredIndex(index)
                setImageIndex(0)
                setPrevIndex(0)
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative text-left h-[390px] sm:h-[460px] lg:h-[540px] overflow-hidden border border-white/10 bg-[#111111] cursor-pointer transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#853953] hover:shadow-[0_28px_80px_rgba(0,0,0,0.55),0_0_45px_rgba(133,57,83,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#853953]"
            >
              {hoveredIndex === index && (
                <img
                  src={project.images[prevIndex]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-[5px] opacity-0 transition-all duration-700"
                />
              )}

              <img
                src={
                  hoveredIndex === index
                    ? project.images[imageIndex]
                    : project.images[0]
                }
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover blur-[5px] grayscale-[45%] transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:blur-[2px] group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/5 transition-opacity duration-700 group-hover:from-black/90 group-hover:via-black/35"></div>
              <div className="absolute inset-0 bg-[#853953]/0 mix-blend-color transition-all duration-700 group-hover:bg-[#853953]/20"></div>
              <div className="absolute inset-4 border border-white/10 transition-all duration-700 group-hover:inset-5 group-hover:border-[#d0a7b7]/45"></div>
              <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#853953] transition-transform duration-700 group-hover:scale-x-100"></div>

              <div className="absolute left-6 right-6 top-6 z-10 flex items-start justify-between gap-6">
                <span className="text-[10px] tracking-[0.4em] text-white/45 transition-colors duration-500 group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="border border-[#d0a7b7]/45 bg-black/45 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.32em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 group-hover:border-[#d0a7b7] group-hover:bg-[#853953]/80 group-hover:text-white">
                  {project.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-7 lg:p-8">
                <div className="mb-5 h-px w-10 bg-white/35 transition-all duration-500 group-hover:w-20 group-hover:bg-[#d0a7b7]"></div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/45 transition-colors duration-500 group-hover:text-white/70">
                  {project.scope}
                </p>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>

                <div className="mt-6 flex items-center gap-3 text-white/55 transition-colors duration-500 group-hover:text-white">
                  <span className="text-[10px] uppercase tracking-[0.35em]">
                    View Project
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center border border-white/15 transition-all duration-500 group-hover:border-[#d0a7b7]/60 group-hover:bg-[#853953]">
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-10">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close project gallery"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:border-[#d0a7b7]/60 hover:bg-[#853953] hover:text-white"
          >
            <FiX aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous project image"
            className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:border-[#d0a7b7]/60 hover:bg-[#853953] hover:text-white md:flex"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next project image"
            className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:border-[#d0a7b7]/60 hover:bg-[#853953] hover:text-white md:flex"
          >
            <FiChevronRight aria-hidden="true" />
          </button>

          <div className="relative z-10 w-full max-w-7xl h-[92vh] rounded-2xl border border-white/10 bg-[#111111]/95 p-3 sm:p-5 overflow-hidden">
  <div className="grid h-full gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="relative flex h-full min-h-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <img
  src={currentProject.images[currentIndex]}
  alt={`${currentProject.title} ${currentIndex + 1}`}
  className="h-full w-full object-contain rounded-lg shadow-[0_32px_90px_rgba(0,0,0,0.75)]"
/>
            </div>
            

            <aside className="h-full overflow-y-auto rounded-xl border border-white/10 bg-[#1f1f1f]/85 p-4 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#d0a7b7]">
                {currentProject.category}
              </p>

              <h3 className="mt-4 text-2xl sm:text-3xl font-bold leading-tight">
                {currentProject.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                {currentProject.description}
              </p>

              <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/45">
                <span>{String(currentIndex + 1).padStart(2, "0")}</span>
                <span className="h-px w-10 bg-white/20"></span>
                <span>{String(currentProject.images.length).padStart(2, "0")}</span>
              </div>

              <div className="mt-6 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:max-h-[340px] lg:overflow-y-auto lg:overflow-x-hidden">
                {currentProject.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(idx)
                    }}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border transition-all duration-500 sm:h-24 sm:w-24 lg:h-24 lg:w-full ${
                      currentIndex === idx
                        ? "border-[#d0a7b7] opacity-100"
                        : "border-white/10 opacity-45 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${currentProject.title} thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3 md:hidden">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous project image"
                  className="flex h-11 flex-1 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d0a7b7]/60 hover:bg-[#853953] hover:text-white"
                >
                  <FiChevronLeft aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next project image"
                  className="flex h-11 flex-1 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:border-[#d0a7b7]/60 hover:bg-[#853953] hover:text-white"
                >
                  <FiChevronRight aria-hidden="true" />
                </button>
              </div>
                        </aside>
          </div>
        </div>
      </div>
      )}
    </section>
  )
}

export default WorkSection