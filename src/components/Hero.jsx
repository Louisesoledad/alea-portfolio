import profile from "../assets/profile.png"
import { Link } from "react-router-dom"

function Hero() {

  const skills = [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Canva",
  ]

  return (
    <section className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden bg-dark">

      {/* LEFT SPACE */}
      <div className="hidden lg:block lg:w-[15%] bg-dark"></div>

      {/* PURPLE SIDE */}
      <div className="relative w-full lg:w-[40%] min-h-[60vh] lg:min-h-screen flex items-center justify-center bg-gradient-to-b from-[#6b2d4f] via-[#3a2230] to-[#1f1f1f] overflow-hidden">

        {/* IMAGE */}
        <img
          src={profile}
          alt="profile"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[80%] sm:h-[85%] md:h-[90%] lg:h-[95%] scale-110 lg:scale-125 object-contain grayscale"
        />

        <div className="absolute inset-x-0 bottom-0 z-[1] h-[54%] bg-gradient-to-t from-black/80 via-black/38 to-transparent"></div>

        {/* TEXT */}
        <div className="absolute bottom-[9%] sm:bottom-[8%] md:bottom-[7%] lg:bottom-[10%] left-0 z-10 w-full flex justify-center px-3 sm:px-5">

          <h1 className="leading-none text-center w-full flex flex-col items-center">

            <span className="block font-brunson font-black text-transparent text-[clamp(4rem,11vw,6.5rem)] sm:text-[clamp(7rem,11vw,10.5rem)] lg:text-[clamp(5rem,6vw,7.2rem)] xl:text-[clamp(5.6rem,6.2vw,8rem)] tracking-[0.08em] leading-none text-center [-webkit-text-stroke:2.8px_white] drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
  VISUAL
</span>

            <span className="block -mt-1 sm:-mt-3 font-brunson text-white text-[clamp(3.5rem,12vw,5.8rem)] sm:text-[clamp(7rem,12vw,10.5rem)] lg:text-[clamp(5rem,6vw,7.2rem)] xl:text-[clamp(5.6rem,6.2vw,8rem)] font-medium leading-none text-center tracking-[0.08em] drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
  DESIGNER
</span>

          </h1>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[50%] bg-dark text-white flex items-center px-6 sm:px-10 md:px-16 lg:pl-24 lg:pr-20 py-20 lg:py-0 relative">

        {/* TEXT BLOCK */}
        <div className="relative max-w-xl z-10">

          {/* OUTLINE SQUARE */}
          <div className="hidden lg:block absolute -left-[160px] top-[-30px] w-44 h-44 border-[5px] border-[#853953] -z-10"></div>

          {/* SMALL TEXT */}
          <p className="text-sm sm:text-base uppercase tracking-[0.32em] text-[#d0a7b7] mb-6">
            Hi, I'm Alea
          </p>

          {/* TITLE */}
          <h2 className="text-[30px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-semibold leading-[1.2] mb-6 tracking-tight">
            Designing <span className="font-bold text-white">Visuals</span> That <span className="font-bold text-white">Stand Out</span>
          </h2>

          {/* PARAGRAPH */}
          <p className="text-gray-400 mb-8 text-[14px] sm:text-[15px] leading-[1.7] font-mont">
            I design clean, impactful visuals that help brands stand out and connect with their audience.
          </p>

          {/* BUTTON */}
          <Link
            to="/works"
            className="bg-primary px-8 py-3 text-sm font-bold font-mont hover:opacity-80 transition rounded-sm inline-block"
          >
            See my Works
          </Link>

        </div>

        {/* TOP RIGHT DOT GRID */}
        <div className="hidden md:grid absolute top-24 lg:top-36 right-10 lg:right-60 grid-cols-4 gap-3">
          {[...Array(12)].map((_, i) => {
            const col = i % 4

            return (
              <div
                key={i}
                className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white"
                style={{
                  opacity: 0.3 + col * 0.25,
                }}
              />
            )
          })}
        </div>

        {/* BOTTOM DOT GRID */}
        <div className="hidden md:grid absolute bottom-24 lg:bottom-32 left-8 lg:left-40 grid-cols-3 gap-3">
          {[...Array(12)].map((_, i) => {
            const row = Math.floor(i / 3)

            return (
              <div
                key={i}
                className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-white"
                style={{
                  opacity: 1 - row * 0.3,
                }}
              />
            )
          })}
        </div>

        {/* BIG SQUARE */}
        <div className="hidden lg:block absolute bottom-28 right-16 w-56 h-56 border-[5px] border-[#853953]"></div>

      </div>

      {/* SKILLS BAR */}
      <div className="absolute bottom-0 left-0 z-20 w-full bg-primary py-3 sm:py-4 overflow-hidden">

        <div className="marquee">
          <div className="track text-white/95 text-sm sm:text-base font-semibold font-mont tracking-wide">

            {[...Array(10)].map((_, i) => (
              skills.map((skill, index) => (
                <span key={`${i}-${index}`} className="mx-10 sm:mx-16 lg:mx-24">
                  {skill}
                </span>
              ))
            ))}

          </div>
        </div>

      </div>

    </section>
  )
}

export default Hero
