import Hero from "../components/Hero"
import AboutSection from "../components/AboutSection"
import SkillsSection from "../components/SkillsSection"
import WorkSection from "../components/WorkSection"
import ContactSection from "../components/ContactSection"

function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <WorkSection />
      <ContactSection /> 
    </main>
  )
}

export default Home