import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 4); // flip to black as soon as we move
        ticking.current = false;
      });
    };
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    const base = "relative px-3 py-2 text-sm tracking-tight transition-colors";
    // colors depend on scrolled state
    const colorTop = isActive ? "text-fg" : "text-fg/60 hover:text-fg";
    const colorScrolled = isActive ? "text-bg" : "text-bg/70 hover:text-bg";
    return `${base} ${scrolled ? colorScrolled : colorTop}`;
  };

  const headerBase =
    "sticky top-0 z-50 transition-[background-color,backdrop-filter,color,border,box-shadow] duration-300";
  const headerColors = scrolled
    ? "bg-fg/95 text-bg border-transparent shadow-sm"
    : "bg-bg/80 text-fg border-fg/10 backdrop-blur";
  const header = `${headerBase} border-b ${headerColors}`;

  return (
    <header className={header}>
      <Container>
        <div className={`flex items-center justify-between transition-[height] ${scrolled ? "h-14" : "h-16"}`}>
          {/* Brand */}
          <NavLink
            to="/"
            className={`text-base font-semibold tracking-tight transition-opacity ${scrolled ? "opacity-95" : "opacity-100"}`}
          >
            VisionLab
          </NavLink>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <NavLink to="/solutions" className={linkClass}>
              <Underline active={scrolled} />
              Solutions
            </NavLink>
            <NavLink to="/projects" className={linkClass}>
              <Underline active={scrolled} />
              Projects
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              <Underline active={scrolled} />
              About
            </NavLink>

            {/* CTA button */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                [
                  "ml-1 rounded-full px-3 py-2 text-sm transition-colors",
                  scrolled
                    ? isActive
                      ? "bg-bg text-fg"
                      : "border border-bg/20 text-bg hover:bg-bg hover:text-fg"
                    : isActive
                    ? "bg-fg text-bg"
                    : "border border-fg/10 text-fg hover:bg-fg hover:text-bg",
                ].join(" ")
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}

/** Tiny underline that fades in on hover; color adapts to scroll mode */
function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-x-3 bottom-[6px] h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
        active ? "bg-bg/40" : "bg-fg/40"
      }`}
    />
  );
}
