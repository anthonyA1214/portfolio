import type { Metadata } from "next"
import "@workspace/ui/globals.css"
import Providers from "@/app/providers"

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
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
