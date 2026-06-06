import type { Metadata } from "next"
import { Satisfy, Bricolage_Grotesque } from "next/font/google"
import "@workspace/ui/globals.css"
import Providers from "@/app/providers"
import Header from "@/components/sections/header/header"
import { ScrollProgress } from "@workspace/ui/components/scroll-progress"
import Footer from "@/components/sections/footer/footer"

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
})

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Anthony Amiluddin",
  description: "Personal portfolio website for Anthony Amiluddin",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-hide h-full antialiased"
      suppressHydrationWarning
    >
      <body
        className={`${bricolageGrotesque.className} ${satisfy.variable} flex min-h-full flex-col`}
      >
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">
              {children}
              <ScrollProgress />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
