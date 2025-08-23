import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer"; // type + plugin

gsap.registerPlugin(ScrollTrigger, Observer);
// DO NOT call ScrollTrigger.normalizeScroll(true) here globally.

export default function ScrollManager() {
  const lenisRef = useRef<Lenis | null>(null);
  const overlayOpenRef = useRef(false);

  // ScrollTrigger.normalizeScroll(true) returns an Observer (or undefined).
  const normalizerRef = useRef<Observer | null>(null);

  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    console.groupCollapsed("[ScrollManager] mount");

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    console.info("[ScrollManager] prefersReducedMotion:", prefersReduced);

    // Create Lenis
    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 2.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    lenisRef.current = lenis;
    console.info("[ScrollManager] Lenis created");

    // Drive Lenis with GSAP's ticker
    const update = (time: number) => {
      lenis.raf(time * 1000); // gsap gives seconds; lenis expects ms
      ScrollTrigger.update();
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    console.info("[ScrollManager] GSAP ticker wired");

    // Keep ST aware of Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    const scroller = document.documentElement;

    // Proxy root scrolling through Lenis
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (value != null) {
          console.debug("[ScrollManager] scrollerProxy.set scrollTop ->", value);
         
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
    console.info("[ScrollManager] scrollerProxy registered & defaults set");

    // Create the ScrollTrigger normalizer and keep a handle so we can toggle it
    normalizerRef.current = ScrollTrigger.normalizeScroll(true) || null;
    console.info("[ScrollManager] normalizeScroll created");

    // Double refresh after mount
    requestAnimationFrame(() => {
      console.info("[ScrollManager] first ST.refresh()");
      ScrollTrigger.refresh();
      setTimeout(() => {
        console.info("[ScrollManager] second ST.refresh()");
        ScrollTrigger.refresh();
      }, 0);
    });

    const onLoad = () => {
      console.info("[ScrollManager] window.load -> ST.refresh()");
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad);

    // Pause/Resume handlers for overlays (e.g., mobile menu)
    const pauseSmoothScroll = () => {
      if (overlayOpenRef.current) return;
      overlayOpenRef.current = true;
      console.warn(
        "[ScrollManager] pauseSmoothScroll(): stopping Lenis & disabling ST + normalizer"
      );
      lenis.stop();
      ScrollTrigger.getAll().forEach((st) => st.disable(true));
      normalizerRef.current?.disable();
    };

    const resumeSmoothScroll = () => {
      if (!overlayOpenRef.current) return;
      overlayOpenRef.current = false;
      console.warn(
        "[ScrollManager] resumeSmoothScroll(): enabling ST + normalizer & starting Lenis"
      );
      ScrollTrigger.getAll().forEach((st) => st.enable());
      normalizerRef.current?.enable();
      lenis.start();
      console.info("[ScrollManager] ST.refresh() after resume");
      ScrollTrigger.refresh();
    };

    const onOverlayToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail as { overlayOpen: boolean } | undefined;
      console.info("[ScrollManager] app:overlay-change", detail);
      if (!detail) return;
      detail.overlayOpen ? pauseSmoothScroll() : resumeSmoothScroll();
    };

    window.addEventListener("app:overlay-change", onOverlayToggle);
    console.info("[ScrollManager] listening for app:overlay-change");
    console.groupEnd();

    return () => {
      console.groupCollapsed("[ScrollManager] cleanup");
      window.removeEventListener("load", onLoad);
      window.removeEventListener("app:overlay-change", onOverlayToggle);
      gsap.ticker.remove(update);
      console.info("[ScrollManager] killing all ScrollTriggers");
      ScrollTrigger.getAll().forEach((st) => st.kill());
      console.info("[ScrollManager] destroying Lenis");
      lenis.destroy();
      lenisRef.current = null;
      normalizerRef.current?.kill();
      normalizerRef.current = null;
      console.groupEnd();
    };
  }, []);

  // Scroll to hash / top on route change and refresh triggers
  useLayoutEffect(() => {
    const lenis = lenisRef.current;
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
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          console.info("[ScrollManager] scrolling to hash element", hash);
          // @ts-expect-error Lenis accepts Element
          lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: "smooth", block: "start" });
          console.info("[ScrollManager] ST.refresh() after hash scroll");
          ScrollTrigger.refresh();
          console.groupEnd();
          return;
        }
      }
      console.info("[ScrollManager] scrolling to top");
      lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
      console.info("[ScrollManager] ST.refresh() after top scroll");
      ScrollTrigger.refresh();
      console.groupEnd();
    });
  }, [pathname, hash]);

  return null;
}
