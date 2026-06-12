import About from "@/components/sections/about/about"
import Hero from "@/components/sections/hero/hero"
import Header from "@/components/sections/header/header"
import { ScrollProgress } from "@workspace/ui/components/scroll-progress"
import Footer from "@/components/sections/footer/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <About />
        <About />
        <About />
        <ScrollProgress />
      </main>
      <Footer />
    </div>
  )
}
