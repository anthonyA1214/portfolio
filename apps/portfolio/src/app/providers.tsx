import LenisProvider from "@/providers/lenis-provider"
import ThemeProvider from "@/providers/theme-provider"
import { Provider as WrapBalancerProvider } from "react-wrap-balancer"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <ThemeProvider>
        <WrapBalancerProvider>{children}</WrapBalancerProvider>
      </ThemeProvider>
    </LenisProvider>
  )
}
