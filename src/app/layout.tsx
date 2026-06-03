import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import Providers from "@/components/lenis-provider";
import Header from "@/components/sections/header/header";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anthony Amiluddin",
  description: "Personal portfolio website for Anthony Amiluddin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {/*footer*/}
          </div>
        </Providers>
      </body>
    </html>
  );
}
