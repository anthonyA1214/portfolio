"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const SmoothScroll = ({ children }: PropsWithChildren) => {
  const lenis = useLenis();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }

    const handleScrollToTop = () => {
      if (lenis) {
        lenis.start();
        window.scrollTo(0, 0);
      }
    };

    handleScrollToTop();
  }, [pathname, searchParams, lenis]);

  return (
    <ReactLenis className="h-full" options={{ lerp: 0.1 }} root>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
