import About from "@/components/sections/about/about"
import Hero from "@/components/sections/hero/hero"
import Header from "@/components/sections/header/header"
import { ScrollProgress } from "@workspace/ui/components/scroll-progress"
import Footer from "@/components/sections/footer/footer"
import Skills from "@/components/sections/skills/skills"
import Projects from "@/components/sections/projects/project"
import Experience from "@/components/sections/experience/experience"
import Contact from "@/components/sections/contact/contact"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
