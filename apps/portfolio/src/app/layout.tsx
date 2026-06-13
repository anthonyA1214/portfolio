import type { Metadata } from "next"
import { Satisfy, Bricolage_Grotesque } from "next/font/google"
import "@workspace/ui/globals.css"
import Providers from "@/app/providers"

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
      className="scrollbar-thin h-full antialiased"
      suppressHydrationWarning
    >
      <body
        className={`${bricolageGrotesque.className} ${satisfy.variable} flex min-h-full flex-col`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
