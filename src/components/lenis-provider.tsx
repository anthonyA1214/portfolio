import { ThemeProvider } from "next-themes";
import LenisProvider from "./smooth-scroll";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LenisProvider>
  );
}
