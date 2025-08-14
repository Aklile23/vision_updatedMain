import React, { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

export default function ScrollManager() {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 2.0,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    lenisRef.current = lenis;

    // Drive Lenis with GSAP's ticker so both share a clock
    const update = (time: number) => {
      lenis.raf(time * 1000); // gsap gives seconds; lenis expects ms
      ScrollTrigger.update(); // keep ST in sync each tick
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Keep ST aware of Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    const scroller = document.documentElement;

    // IMPORTANT: read from lenis.scroll; set with { immediate: true } during refresh
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (value != null) {
          // @ts-ignore lenis accepts number | Element
          lenis.scrollTo(value, { immediate: true });
        }
        // @ts-ignore 'scroll' is public on Lenis instance
        return (lenis as any).scroll || window.scrollY || window.pageYOffset || 0;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: "transform", // consistent, avoids first-frame pin glitches
      // fixedMarkers: true, // uncomment if you use ST markers
    });

    ScrollTrigger.defaults({ scroller });

    // Double-refresh after mount to ensure correct start/end
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 0);
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(update);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to hash / top on route change and refresh triggers
  useLayoutEffect(() => {
    const lenis = lenisRef.current;
    requestAnimationFrame(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          // @ts-ignore lenis accepts Element
          lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: "smooth", block: "start" });
          ScrollTrigger.refresh();
          return;
        }
      }
      lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
      ScrollTrigger.refresh();
    });
  }, [pathname, hash]);

  return null;
}
