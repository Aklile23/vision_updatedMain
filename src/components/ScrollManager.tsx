import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

export default function ScrollManager() {
  const lenisRef = useRef<Lenis | null>(null);
  const overlayOpenRef = useRef(false);
  const normalizerRef = useRef<Observer | null>(null);
  const updateRef = useRef<((time: number) => void) | null>(null);

  const { pathname, hash } = useLocation();

  // Initialize Lenis and setup
  const initSmoothScroll = () => {
    if (lenisRef.current) return;

    console.info("[ScrollManager] Initializing smooth scroll");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 2.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    lenisRef.current = lenis;

    // Drive Lenis with GSAP's ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };
    updateRef.current = update;
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const scroller = document.documentElement;
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (value != null) {
          lenis.scrollTo(value, { immediate: true });
        }
        return (lenis as any).scroll || window.scrollY || window.pageYOffset || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    ScrollTrigger.defaults({ scroller });
    if ((ScrollTrigger as any).clearScrollMemory) {
      (ScrollTrigger as any).clearScrollMemory();
    }
    
    normalizerRef.current = ScrollTrigger.normalizeScroll(true) || null;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 0);
    });
  };

  // Destroy Lenis and cleanup
  const destroySmoothScroll = () => {
    console.info("[ScrollManager] Destroying smooth scroll");

    if (updateRef.current) {
      gsap.ticker.remove(updateRef.current);
      updateRef.current = null;
    }

    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    ScrollTrigger.getAll().forEach((st) => st.kill());
    if (normalizerRef.current) {
      normalizerRef.current.kill();
      normalizerRef.current = null;
    }

    // Restore native scrolling
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };

  useLayoutEffect(() => {
    console.groupCollapsed("[ScrollManager] mount");

    // Initial setup
    initSmoothScroll();

    const onLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad);

    // Overlay change handler
    const onOverlayToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail as { overlayOpen: boolean } | undefined;
      console.info("[ScrollManager] app:overlay-change", detail);
      
      if (!detail) return;

      overlayOpenRef.current = detail.overlayOpen;

      if (detail.overlayOpen) {
        // Mobile menu opened - destroy smooth scroll
        destroySmoothScroll();
      } else {
        // Mobile menu closed - reinitialize smooth scroll
        // ScrollManager.tsx, inside onOverlayToggle when overlay closes:
        setTimeout(() => {
          if (!overlayOpenRef.current) {
            initSmoothScroll();
            // Reset scroll again to kill native restore
            requestAnimationFrame(() => {
              lenisRef.current?.scrollTo(0, { immediate: true });
              window.scrollTo(0, 0);
            });
            // FIRST-TOUCH GUARD (mobile): if the browser tries to restore on first touch, re-zero.
            const killFirstTouchSnap = () => {
              lenisRef.current?.scrollTo(0, { immediate: true });
              window.scrollTo(0, 0);
            };
            window.addEventListener("touchstart", killFirstTouchSnap, { once: true, passive: true });
            // Safety removal in case user doesn't touch soon
            setTimeout(() => {
              window.removeEventListener("touchstart", killFirstTouchSnap);
            }, 1200);

            setTimeout(() => ScrollTrigger.refresh(), 100);
          }
        }, 50);

      }
    };

    window.addEventListener("app:overlay-change", onOverlayToggle);
    console.info("[ScrollManager] listening for app:overlay-change");
    console.groupEnd();

    return () => {
      console.groupCollapsed("[ScrollManager] cleanup");
      window.removeEventListener("load", onLoad);
      window.removeEventListener("app:overlay-change", onOverlayToggle);
      
      // Cleanup everything
      if (updateRef.current) {
        gsap.ticker.remove(updateRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (normalizerRef.current) {
        normalizerRef.current.kill();
      }
      console.groupEnd();
    };
  }, []);

  // Scroll to hash / top on route change and refresh triggers
  useLayoutEffect(() => {
    console.groupCollapsed("[ScrollManager] route change");
    console.info("[ScrollManager] pathname:", pathname, "hash:", hash);
    console.info("[ScrollManager] overlayOpenRef:", overlayOpenRef.current);

    // If an overlay is open, don't do any programmatic scrolls
    if (overlayOpenRef.current) {
      console.warn("[ScrollManager] overlay open -> skip programmatic scroll");
      console.groupEnd();
      return;
    }

    requestAnimationFrame(() => {
      // inside the "[ScrollManager] route change" useLayoutEffect
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          if (lenisRef.current) {
            // @ts-expect-error Lenis accepts Element
            lenisRef.current.scrollTo(el, { immediate: true }); // ⬅ make it immediate
          } else {
            el.scrollIntoView({ behavior: "auto", block: "start" }); // ⬅ no smooth
          }
        }
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true }); // ⬅ force top, immediate
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // ⬅ no smooth
        }
      }


      // Refresh ScrollTrigger after scroll
      setTimeout(() => {
        ScrollTrigger.refresh();
        console.info("[ScrollManager] ST.refresh() after scroll");
        console.groupEnd();
      }, 100);
    });
  }, [pathname, hash]);

  return null;
}