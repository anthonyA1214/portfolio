import Header from "@/components/sections/header/header"
import { ScrollProgress } from "@workspace/ui/components/scroll-progress"
import Footer from "@/components/sections/footer/footer"

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        {children}
        <ScrollProgress />
      </main>
      <Footer />
    </div>
  )
}
