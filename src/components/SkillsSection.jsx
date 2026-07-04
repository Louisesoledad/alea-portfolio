const skills = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Canva",
  "Branding",
  "Typography",
  "Social Media Design",
  "Layout Design",
]

function SkillsSection() {
  return (
    <section className="relative bg-dark text-white min-h-screen flex items-center px-6 sm:px-8 md:px-[8%] lg:px-[12%] overflow-hidden py-24 md:py-28 lg:py-0">

      {/* PURPLE STRIP */}
      <div className="absolute left-0 top-[54%] -translate-y-1/2 w-full h-[220px] sm:h-[260px] md:h-[320px] bg-gradient-to-r from-[#1f1f1f] via-[#3d2135] to-[#853953]"></div>

      {/* LARGE BACK FRAME */}
      <div className="hidden lg:block absolute top-20 right-[8%] w-44 h-44 border-[5px] border-[#853953] opacity-90"></div>

      {/* BOTTOM FRAME */}
      <div className="hidden lg:block absolute bottom-14 left-10 md:left-20 w-40 md:w-56 h-40 md:h-56 border-[5px] border-[#853953]"></div>

      {/* TOP LEFT DOTS */}
      <div className="hidden lg:grid absolute top-32 left-[10%] grid-cols-4 gap-3">
        {[...Array(16)].map((_, i) => {
          const row = Math.floor(i / 4)

          return (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-white"
              style={{
                opacity: 0.2 + (3 - row) * 0.18,
              }}
            />
          )
        })}
      </div>

      {/* RIGHT DOTS */}
      <div className="hidden md:grid absolute right-6 lg:right-[13%] bottom-28 grid-cols-4 gap-3">
        {[...Array(20)].map((_, i) => {
          const col = i % 4

          return (
            <div
              key={i}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white"
              style={{
                opacity: 0.18 + col * 0.2,
              }}
            />
          )
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full">

        <div className="relative max-w-3xl mb-12 sm:mb-14 lg:mb-16">



          <p className="text-[#d0a7b7] text-xs sm:text-sm tracking-[0.35em] uppercase mb-4">
            Technical Expertise
          </p>

          <h2 className="font-brunson text-[44px] sm:text-[58px] md:text-[72px] lg:text-[86px] leading-none tracking-[0.08em]">
  Creative
  <span className="block text-transparent [-webkit-text-stroke:1.5px_white]">
    Skillset
  </span>
</h2>

          <p className="text-gray-300 max-w-xl mt-6 text-sm sm:text-base leading-relaxed">
            A focused mix of design tools and visual systems for building clean, memorable brand experiences.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill}
              className="group relative min-h-[170px] sm:min-h-[190px] border border-white/10 bg-[#1f1f1f]/80 backdrop-blur-sm px-6 py-6 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#853953] hover:bg-white/[0.07] hover:shadow-[0_24px_60px_rgba(133,57,83,0.22)]"
            >

              <div className="absolute inset-x-0 top-0 h-1 bg-[#853953] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>

              <div className="absolute -right-10 -bottom-10 w-28 h-28 border border-[#853953]/40 transition-all duration-500 group-hover:right-4 group-hover:bottom-4"></div>

              <div className="relative z-10 h-full flex flex-col justify-between gap-10">
                <span className="text-white/30 text-xs tracking-[0.35em]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="w-10 h-px bg-white/30 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-[#d0a7b7]"></div>

                  <h3 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight">
                    {skill}
                  </h3>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default SkillsSection
