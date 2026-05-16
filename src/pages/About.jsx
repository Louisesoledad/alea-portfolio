import Navbar from "../components/Navbar"
import AboutSection from "../components/AboutSection"
import SkillsSection from "../components/SkillsSection"

function About() {
  return (
    <div className="bg-dark text-white min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* ABOUT CONTENT */}
      <main className="pt-24">
        <AboutSection />
        <SkillsSection />
      </main>

    </div>
  )
}

export default About