import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientFX() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<HTMLDivElement[]>([]);

  const setRing = (i: number) => (el: HTMLDivElement | null) => {
    if (el) ringRefs.current[i] = el;
  };

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // blobs: very slow drifting + scale breathing
      [blob1.current, blob2.current].forEach((b, idx) => {
        if (!b) return;
        gsap.to(b, {
          x: idx === 0 ? 40 : -50,
          y: idx === 0 ? -30 : 35,
          scale: idx === 0 ? 1.05 : 1.08,
          rotate: idx === 0 ? 8 : -6,
          duration: 16,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // rings: gentle float with slight rotation, each desynced
      ringRefs.current.forEach((r, i) => {
        gsap.to(r, {
          y: i % 2 ? 8 : -10,
          rotate: i % 2 ? 4 : -3,
          duration: 7 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* gradient blobs */}
      <div
        ref={blob1}
        className="absolute left-[10%] top-[12%] h-[34vmax] w-[34vmax] rounded-full blur-3xl opacity-[0.08]"
        style={{ background: "radial-gradient(closest-side, #000 0%, transparent 70%)", willChange: "transform" }}
      />
      <div
        ref={blob2}
        className="absolute right-[8%] bottom-[10%] h-[38vmax] w-[38vmax] rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "radial-gradient(closest-side, #000 0%, transparent 70%)", willChange: "transform" }}
      />

      {/* floating rings */}
      <div ref={setRing(0)} className="absolute left-[18%] top-[40%] aspect-square w-40 rounded-full border border-fg/10" style={{ willChange: "transform" }} />
      <div ref={setRing(1)} className="absolute right-[22%] top-[22%] aspect-square w-28 rounded-full border border-fg/10" style={{ willChange: "transform" }} />
      <div ref={setRing(2)} className="absolute right-[15%] bottom-[20%] aspect-square w-48 rounded-full border border-fg/10" style={{ willChange: "transform" }} />
    </div>
  );
}
