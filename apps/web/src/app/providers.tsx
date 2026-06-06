import LenisProvider from "@/providers/lenis-provider"
import ThemeProvider from "@/providers/theme-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LenisProvider>
  )
}
