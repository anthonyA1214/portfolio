"use client"

import LenisProvider from "@/providers/lenis-provider"
import ThemeProvider from "@/providers/theme-provider"
import { Provider as WrapBalancerProvider } from "react-wrap-balancer"

import { setApiBaseUrl } from "@workspace/api-client"

setApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL!);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <ThemeProvider>
        <WrapBalancerProvider>{children}</WrapBalancerProvider>
      </ThemeProvider>
    </LenisProvider>
  )
}
