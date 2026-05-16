import profile from "../assets/ale.jpg"

function AboutSection() {
  return (
    <section className="relative bg-dark text-white min-h-screen flex items-center px-6 sm:px-8 md:px-[8%] lg:px-[12%] overflow-hidden py-24 md:py-0">

      {/* PURPLE STRIP */}
      <div className="absolute left-0 top-[52%] -translate-y-1/2 w-full h-[180px] sm:h-[220px] md:h-[280px] bg-gradient-to-r from-[#1f1f1f] via-[#3d2135] to-[#5a2a4d]"></div>

      {/* MAIN GRID */}
      <div className="relative grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-none mt-10 py-10">

          {/* DECORATIVE SQUARE */}
          <div className="hidden lg:block absolute -top-36 left-[480px] w-28 h-28 border-[5px] border-[#853953] -z-10"></div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-brunson tracking-[0.06em] mb-6 leading-tight">
  Creative <span className="text-transparent [-webkit-text-stroke:2px_white]">Mind</span> Behind the{" "}
  <span className="text-transparent [-webkit-text-stroke:2px_white]">Designs</span>
</h2>

          <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
            I’m Alea, a passionate visual designer focused on creating bold and modern designs that communicate clearly and effectively.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
            I enjoy turning ideas into visually engaging experiences whether it’s branding, social media graphics, or digital content. My goal is to help brands stand out through clean, creative, and purposeful design.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center -mt-0 md:-mt-10 lg:-mt-16">

          {/* IMAGE */}
          <img
            src={profile}
            alt="profile"
            className="relative z-0 w-[260px] sm:w-[320px] md:w-[380px] h-[420px] sm:h-[520px] md:h-[580px] object-cover grayscale"
          />

          {/* FRAME */}
          <div className="absolute top-8 left-1/2 -translate-x-[42%] w-[260px] sm:w-[320px] md:w-[380px] h-[420px] sm:h-[520px] md:h-[580px] border-[5px] border-[#853953] z-10"></div>

          {/* DOTS TOP RIGHT */}
          <div className="absolute top-.95 md:-top-2 right-5 sm:right-8 md:right-16 lg:right-28 grid grid-cols-4 gap-2 sm:gap-3 z-10">
            {[...Array(12)].map((_, i) => {
              const col = i % 4

              return (
                <div
                  key={i}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"
                  style={{
                    opacity: 0.3 + col * 0.25,
                  }}
                ></div>
              )
            })}
          </div>

        </div>

      </div>

      {/* TOP LEFT DOTS */}
      <div className="hidden lg:grid absolute top-36 left-[320px] grid grid-cols-3 gap-3">
        {[...Array(12)].map((_, i) => {
          const row = Math.floor(i / 3)

          return (
            <div
              key={i}
              className="w-4 h-4 bg-white rounded-full"
              style={{
                opacity: 0.3 + (3 - row) * 0.2,
              }}
            ></div>
          )
        })}
      </div>

      {/* BOTTOM DOTS */}
      <div className="hidden md:grid absolute bottom-40 right-1/2 grid grid-cols-4 gap-3">
        {[...Array(12)].map((_, i) => {
          const row = Math.floor(i / 4)

          return (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              style={{
                opacity: 0.3 + (2 - row) * 0.25,
              }}
            ></div>
          )
        })}
      </div>

      {/* BOTTOM SQUARE */}
      <div className="hidden lg:block absolute bottom-10 left-10 md:left-20 w-40 md:w-56 h-40 md:h-56 border-[5px] border-[#853953]"></div>

    </section>
  )
}

export default AboutSection
