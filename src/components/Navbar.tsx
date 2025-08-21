import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 4);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on mount/route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Header shell
  const headerBase =
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b";
  // Keep your translucency, but we’ll ensure nav items mask anything beneath on hover only
  const headerColors = scrolled
    ? "bg-fg/95 backdrop-blur-lg border-bg/10 shadow-lg shadow-fg/5"
    : "bg-bg/80 backdrop-blur-md border-fg/10";
  const header = `${headerBase} ${headerColors}`;

  const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/solutions", label: "Solutions" },
    { to: "/projects", label: "Projects" },
  ];

  return (
    <>
      <header className={header}>
        <Container>
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16" : "h-18"
            }`}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/" className="flex items-center gap-3 group">
                {/* Logo Image */}
                <div
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    scrolled ? "w-10 h-10" : "w-12 h-12"
                  }`}
                >
                  <img
                    src="/images/logo_white.png"
                    alt="VisionLab Technologies"
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                    style={{
                      filter: scrolled ? "invert(1) brightness(0.9)" : "none",
                    }}
                  />
                  {/* subtle sweep only on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-fg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                </div>

                {/* Brand Text */}
                <div className="flex flex-col">
                  <span
                    className={`font-bold tracking-tight transition-all duration-300 ${
                      scrolled ? "text-base text-bg" : "text-lg text-fg"
                    }`}
                  >
                    VisionLab
                  </span>
                  <span
                    className={`text-xs tracking-wide transition-all duration-300 ${
                      scrolled ? "text-bg/70" : "text-fg/60"
                    }`}
                  >
                    TECHNOLOGIES
                  </span>
                </div>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation — Modern Monochrome */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => {
                    const base =
                      "group relative px-4 py-2 text-sm font-medium tracking-tight rounded-md transition-colors";
                    const colors = scrolled
                      ? (isActive ? "text-bg" : "text-bg/70 hover:text-bg")
                      : (isActive ? "text-fg" : "text-fg/70 hover:text-fg");
                    return `${base} ${colors}`;
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.label}</span>

                      {isActive && (
                        <motion.div
                          layoutId="active-underline"
                          className={`absolute left-3 right-3 -bottom-1 h-[2px] rounded-full ${
                            scrolled ? "bg-bg/80" : "bg-fg/80"
                          }`}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}

                      {!isActive && (
                        <span
                          className={`absolute left-3 right-3 -bottom-1 h-[2px] rounded-full scale-x-0 origin-left transition-transform duration-300 ${
                            scrolled ? "bg-bg/50" : "bg-fg/50"
                          } group-hover:scale-x-100`}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              <NavLink
                to="/contact"
                className={({ isActive }) => {
                  const base =
                    "ml-3 relative px-4 py-2 text-sm font-semibold rounded-md transition-colors border";
                  const colors = scrolled
                    ? (isActive
                        ? "text-fg bg-bg border-bg/40"
                        : "text-bg border-bg/30 hover:bg-bg/10")
                    : (isActive
                        ? "text-bg bg-fg border-fg/40"
                        : "text-fg border-fg/20 hover:bg-fg/5");
                  return `${base} ${colors}`;
                }}
              >
                Contact
              </NavLink>
            </nav>

            {/* Mobile Menu Button — fixed hamburger + full X */}
            <motion.button
              className="md:hidden p-2 rounded-xl transition-colors duration-300 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6 overflow-visible flex items-center justify-center">
                {/* Top bar */}
                <motion.span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-0.5 w-8 rounded-full ${
                    scrolled ? "bg-bg" : "bg-fg"
                  }`}
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 0 : -6,        // hamburger offset
                  }}
                  transition={{ duration: 0.25 }}
                />
                {/* Middle bar */}
                <motion.span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-0.5 w-8 rounded-full ${
                    scrolled ? "bg-bg" : "bg-fg"
                  }`}
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,   // fades out on open
                  }}
                  transition={{ duration: 0.2 }}
                />
                {/* Bottom bar */}
                <motion.span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-0.5 w-8 rounded-full ${
                    scrolled ? "bg-bg" : "bg-fg"
                  }`}
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? 0 : 6,         // hamburger offset
                  }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </motion.button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Backdrop with blur */}
            <motion.div
              className="absolute inset-0 bg-fg/98 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(var(--color-bg)_1px,transparent_1px),linear-gradient(90deg,var(--color-bg)_1px,transparent_1px)] [background-size:32px_32px]" />

            {/* Floating elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-bg/15"
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full border border-bg/10"
              animate={{ rotate: [360, 0], scale: [1, 0.9, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Menu Content */}
            <motion.div
              className="relative h-full flex flex-col items-center justify-center text-center px-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Navigation Links */}
              <motion.nav
                className="space-y-8 mb-16"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      show: { y: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block text-4xl font-light tracking-wide transition-all duration-300 relative group ${
                          isActive ? "text-bg font-medium" : "text-bg/80 hover:text-bg"
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-lg text-bg/40 font-mono">
                        0{index + 1}
                      </span>
                      <span className="absolute left-0 bottom-2 h-px w-full bg-bg/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <NavLink
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-bg text-fg text-lg font-semibold rounded-2xl hover:bg-bg/90 transition-all duration-300 hover:shadow-2xl hover:shadow-bg/25 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Start Your Project</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </NavLink>
              </motion.div>

              {/* Bottom Info */}
              <motion.div
                className="absolute bottom-8 left-0 right-0 text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="flex items-center justify-center gap-6 text-sm text-bg/60">
                  <span>Since 2019</span>
                  <span className="w-1 h-1 bg-bg/40 rounded-full" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-6 h-px bg-bg/30" />
                  <span className="text-xs text-bg/50 tracking-widest">
                    ELEVATING DIGITAL DIMENSIONS
                  </span>
                  <div className="w-6 h-px bg-bg/30" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes slideAccent {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
}
