//utils/navigation.js

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useNavigationEvent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      // Clear any problematic states here
      window.scrollTo(0, 0);
    };

    handleRouteChange();
  }, [pathname, searchParams]);
}
