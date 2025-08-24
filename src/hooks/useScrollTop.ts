// src/hooks/useScrollTop.ts
import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useScrollTop() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);

  // Stop browser from restoring old scroll positions (prod issue)
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const samePath = prevPath.current === pathname;
    prevPath.current = pathname;

    // If you want in-page anchors to still work on the same route, keep this block:
    if (samePath && hash) {
      const id = hash.startsWith("#") ? hash.slice(1) : hash;
      const el = document.getElementById(decodeURIComponent(id));
      if (el) {
        // anchor scroll can be smooth
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // New route (or no hash): go to top immediately
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
}
