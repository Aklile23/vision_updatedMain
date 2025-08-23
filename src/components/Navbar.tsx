import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ticking = useRef(false);

  // In your mobile menu useEffect
useEffect(() => {
  console.groupCollapsed("[Navbar] mobileMenuOpen effect");
  console.info("mobileMenuOpen =", mobileMenuOpen);

  // Lock or unlock body scroll
  document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";

  // Dispatch event to ScrollManager - IMPORTANT: dispatch every time
  const detail = { overlayOpen: mobileMenuOpen };
  console.info("dispatch app:overlay-change", detail);
  window.dispatchEvent(new CustomEvent("app:overlay-change", { detail }));

  // Cleanup
  return () => {
    console.info("cleanup -> unset body overflow");
    document.body.style.overflow = "unset";
    console.groupEnd();
  };
}, [mobileMenuOpen]);

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

  useEffect(() => {
    console.groupCollapsed("[Navbar] mobileMenuOpen effect");
    console.info("[Navbar] mobileMenuOpen =", mobileMenuOpen);
  
    // Lock or unlock body scroll
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    console.info("[Navbar] body.style.overflow ->", document.body.style.overflow);
  
    // Dispatch event to ScrollManager
    const detail = { overlayOpen: mobileMenuOpen };
    console.info("[Navbar] dispatch app:overlay-change", detail);
    window.dispatchEvent(new CustomEvent("app:overlay-change", { detail }));
  
    // Cleanup
    return () => {
      console.info("[Navbar] cleanup -> unset body overflow");
      document.body.style.overflow = "unset";
      console.groupEnd();
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
              <NavLink to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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

            {/* Desktop Navigation - Replace your existing desktop nav with this */}
            <nav className="hidden md:flex items-center">
              {/* Main Navigation Container */}
              <div className="relative flex items-center">
                {/* Navigation Background Pill */}
                <motion.div
                  className={`
                    absolute inset-0 rounded-2xl transition-all duration-500 ease-out
                    ${scrolled 
                      ? "bg-bg/10 border border-bg/20 shadow-lg shadow-bg/5" 
                      : "bg-fg/5 border border-fg/10 shadow-lg shadow-fg/5"
                    }
                  `}
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                  layoutId="nav-background"
                />

                {/* Navigation Items */}
                <div className="relative flex items-center px-8 py-2 gap-5 text-base">
                  {navigationItems.map((item, ) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="group relative"
                    >
                      {({ isActive }) => (
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Active Background */}
                          {isActive && (
                            <motion.div
                              className={`
                                absolute inset-0 rounded-xl
                                ${scrolled 
                                  ? "bg-bg/20 shadow-lg shadow-bg/10 border border-bg/30" 
                                  : "bg-fg/15 shadow-lg shadow-fg/10 border border-fg/20"
                                }
                              `}
                              layoutId="active-nav-pill"
                              style={{
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                              }}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}

                          {/* Hover Glow Effect */}
                          <div
                            className={`
                              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none
                              ${scrolled 
                                ? "bg-bg/8 shadow-md shadow-bg/5" 
                                : "bg-fg/8 shadow-md shadow-fg/5"
                              }
                            `}
                            style={{
                              background: scrolled
                                ? "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.12), transparent 60%)"
                                : "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.08), transparent 60%)"
                            }}
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = ((e.clientX - rect.left) / rect.width) * 100;
                              const y = ((e.clientY - rect.top) / rect.height) * 100;
                              e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                              e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                            }}
                          />

                          {/* Main Content */}
                          <div className="relative px-4 py-2.5 flex items-center gap-2">

                            {/* Label */}
                            <span
                              className={`
                                text-[14px] font-medium tracking-tight transition-all duration-300
                                ${scrolled 
                                  ? (isActive ? "text-bg" : "text-bg/80 group-hover:text-bg")
                                  : (isActive ? "text-fg" : "text-fg/80 group-hover:text-fg")
                                }
                              `}
                            >
                              {item.label}
                            </span>

                            {/* Active Indicator */}
                            {isActive && (
                              <motion.div
                                className={`
                                  w-1.5 h-1.5 rounded-full ml-1
                                  ${scrolled ? "bg-bg" : "bg-fg"}
                                `}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                  scale: [0, 1.2, 1], 
                                  opacity: [0, 1, 0.8] 
                                }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                          </div>

                          {/* Micro-interaction: Subtle slide on hover */}
                          <motion.div
                            className={`
                              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                              ${scrolled 
                                ? "bg-gradient-to-r from-transparent via-bg/5 to-transparent" 
                                : "bg-gradient-to-r from-transparent via-fg/5 to-transparent"
                              }
                            `}
                            animate={isActive ? {} : {
                              x: ["-100%", "100%"]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                            style={{
                              opacity: 0,
                              transform: "translateX(-100%)"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = "1";
                              e.currentTarget.style.transform = "translateX(100%)";
                              e.currentTarget.style.transition = "transform 0.8s ease-out";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = "0";
                              e.currentTarget.style.transform = "translateX(-100%)";
                              e.currentTarget.style.transition = "transform 0.4s ease-in, opacity 0.3s ease-out";
                            }}
                          />
                        </motion.div>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Contact CTA - Elevated Design */}
              <div className="ml-6">
                <NavLink
                  to="/contact"
                  className="group relative"
                >
                  {({ isActive }) => (
                    <motion.div
                      className="relative overflow-hidden"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Main Button */}
                      <div
                        className={`
                          relative px-6 py-3 rounded-2xl font-semibold text-sm tracking-tight
                          transition-all duration-500 ease-out border-2
                          ${scrolled
                            ? (isActive
                                ? "bg-bg text-fg shadow-2xl shadow-bg/25 border-bg/50"
                                : "bg-bg/90 text-fg hover:bg-bg border-bg/30 hover:border-bg/60 hover:shadow-2xl hover:shadow-bg/20")
                            : (isActive
                                ? "bg-fg text-bg shadow-2xl shadow-fg/25 border-fg/50"
                                : "bg-fg/90 text-bg hover:bg-fg border-fg/30 hover:border-fg/60 hover:shadow-2xl hover:shadow-fg/20")
                          }
                        `}
                        style={{
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }}
                      >
                        {/* Animated Background Gradient */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                          style={{
                            background: scrolled
                              ? "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))"
                              : "conic-gradient(from 0deg at 50% 50%, rgba(0,0,0,0.05), rgba(0,0,0,0.15), rgba(0,0,0,0.05), rgba(0,0,0,0.02), rgba(0,0,0,0.05))"
                          }}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Content with Enhanced Icon Animation */}
                        <span className="relative z-10 flex items-center gap-2.5">
                          <span>Contact</span>
                          <svg 
                            className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-12" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>

                        {/* Sparkle Effect on Hover */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`
                                absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100
                                ${scrolled ? "bg-fg/60" : "bg-bg/60"}
                              `}
                              style={{
                                left: `${20 + i * 20}%`,
                                top: `${30 + (i % 2) * 40}%`
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 2
                              }}
                            />
                          ))}
                        </div>

                        {/* Active State Pulse */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: scrolled
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.1)"
                            }}
                            animate={{ 
                              scale: [1, 1.02, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        {/* Enhanced Glow Effect */}
                        <motion.div
                          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: scrolled
                              ? "conic-gradient(from 0deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05), rgba(255,255,255,0.2))"
                              : "conic-gradient(from 0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.02), rgba(0,0,0,0.15))",
                            filter: "blur(8px)"
                          }}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </NavLink>
              </div>
            </nav>

            {/* Mobile Menu Button — fixed hamburger + full X */}
            <motion.button
              className="md:hidden p-2 rounded-xl transition-colors duration-300 relative"
              // In your mobile menu button onClick
onClick={() => {
  const newState = !mobileMenuOpen;
  setMobileMenuOpen(newState);
  
  // Toggle body class for extra safety
  if (newState) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
}}
              
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
            className="fixed inset-0 z-40 md:hidden overflow-y-auto overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            onScroll={(e) => {
              const el = e.currentTarget;
              console.debug("[NavbarOverlay] onScroll", {
                scrollTop: el.scrollTop,
                scrollHeight: el.scrollHeight,
                clientHeight: el.clientHeight,
              });
            }}
            onTouchStart={(e) => {
              console.debug("[NavbarOverlay] onTouchStart", {
                touches: e.touches.length,
                target: (e.target as HTMLElement)?.tagName,
              });
            }}
            onTouchMove={(e) => {
              console.debug("[NavbarOverlay] onTouchMove", {
                touches: e.touches.length,
                scrollTop: (e.currentTarget as HTMLElement).scrollTop,
              });
            }}
            onTouchEnd={() => console.debug("[NavbarOverlay] onTouchEnd")}
            
          >
            {/* Multi-layered backdrop with sophisticated blur */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Primary backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-fg via-fg/95 to-fg/90" 
                    style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }} />
              
              {/* Subtle overlay pattern */}
              <div className="absolute inset-0 opacity-[0.02]" 
                    style={{ 
                      backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-bg) 1px, transparent 1px),
                                      radial-gradient(circle at 75% 75%, var(--color-bg) 1px, transparent 1px)`,
                      backgroundSize: '60px 60px',
                      backgroundPosition: '0 0, 30px 30px'
                    }} />
              
              {/* Animated gradient orbs */}
              <motion.div
                className="absolute top-20 -right-20 w-80 h-80 rounded-full opacity-5"
                style={{ 
                  background: 'radial-gradient(circle, var(--color-bg) 0%, transparent 70%)',
                  filter: 'blur(60px)'
                }}
                animate={{ 
                  x: [0, -40, 0],
                  y: [0, 60, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-32 -left-16 w-64 h-64 rounded-full opacity-5"
                style={{ 
                  background: 'radial-gradient(circle, var(--color-bg) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
                animate={{ 
                  x: [0, 30, 0],
                  y: [0, -40, 0],
                  scale: [1, 0.8, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </motion.div>

            {/* Main content container with enhanced layout */}
            <motion.div
              className="relative h-full flex flex-col pointer-events-auto overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Header section - minimal */}
              <motion.div 
                className="pt-24 px-8 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-bg/80 text-xl   tracking-[0.3em] font-medium">MENU</div>
              </motion.div>

              {/* Navigation section - elevated cards design */}
              <div className="flex-1 flex items-center justify-center px-6 py-8">
                <motion.nav
                  className="w-full max-w-sm space-y-4"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.to}
                      variants={{
                        hidden: { y: 30, opacity: 0, scale: 0.95 },
                        show: { y: 0, opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group block w-full"
                      >
                        {({ isActive }) => (
                          <motion.div
                            className={`
                              relative overflow-hidden rounded-2xl p-6 transition-all duration-500
                              ${isActive 
                                ? "bg-bg/15 shadow-2xl shadow-bg/10 border-2 border-bg/20" 
                                : "bg-bg/5 hover:bg-bg/10 border-2 border-bg/5 hover:border-bg/15 hover:shadow-xl hover:shadow-bg/5"
                              }
                            `}
                            style={{
                              backdropFilter: "blur(20px)",
                              WebkitBackdropFilter: "blur(20px)",
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Card background gradient */}
                            <div className={`
                              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              ${isActive ? "opacity-30" : ""}
                            `}
                            style={{
                              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                                          rgba(255,255,255,0.08), transparent 60%)`
                            }}
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = ((e.clientX - rect.left) / rect.width) * 100;
                              const y = ((e.clientY - rect.top) / rect.height) * 100;
                              e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                              e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                            }}
                            />

                            <div className="relative flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {/* Index number */}
                                <div className={`
                                  w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold
                                  transition-all duration-300
                                  ${isActive 
                                    ? "bg-bg/20 text-bg" 
                                    : "bg-bg/10 text-bg/60 group-hover:bg-bg/15 group-hover:text-bg/80"
                                  }
                                `}>
                                  {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Label */}
                                <div>
                                  <div className={`
                                    text-2xl font-light tracking-wide transition-all duration-300
                                    ${isActive 
                                      ? "text-bg font-medium" 
                                      : "text-bg/80 group-hover:text-bg"
                                    }
                                  `}>
                                    {item.label}
                                  </div>
                                  <div className="text-bg/40 text-sm tracking-wider">
                                    {item.to === '/' ? 'HOME PAGE' : 
                                      item.to === '/about' ? 'ABOUT US' :
                                      item.to === '/solutions' ? 'OUR SOLUTIONS' :
                                      item.to === '/projects' ? 'OUR WORK' : 'PAGE'}
                                  </div>
                                </div>
                              </div>

                              {/* Arrow indicator */}
                              <motion.div
                                className={`
                                  transition-all duration-300
                                  ${isActive ? "text-bg" : "text-bg/40 group-hover:text-bg/60"}
                                `}
                                animate={{
                                  x: isActive ? [0, 4, 0] : 0,
                                  rotate: isActive ? [0, 12, 0] : 0
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" 
                                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </motion.div>
                            </div>

                            {/* Active state indicator */}
                            {isActive && (
                              <motion.div
                                className="absolute left-6 right-6 bottom-2 h-0.5 bg-bg/30 rounded-full"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{ originX: 0 }}
                              />
                            )}

                            {/* Hover shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-bg/8 to-transparent opacity-0 group-hover:opacity-100"
                              animate={isActive ? {} : {
                                x: ["-100%", "200%"]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                repeatDelay: 4,
                                ease: "easeInOut"
                              }}
                              style={{ transform: "translateX(-100%)" }}
                            />
                          </motion.div>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Contact CTA - Enhanced */}
                  <motion.div
                    variants={{
                      hidden: { y: 30, opacity: 0, scale: 0.95 },
                      show: { y: 0, opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="pt-4"
                  >
                    <NavLink
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group block w-full"
                    >
                      {({ isActive }) => (
                        <motion.div
                          className={`
                            relative overflow-hidden rounded-2xl p-6 transition-all duration-500
                            ${isActive
                              ? "bg-bg text-fg shadow-2xl shadow-bg/20 border-2 border-bg/30"
                              : "bg-bg/90 text-fg hover:bg-bg border-2 border-bg/20 hover:border-bg/40 hover:shadow-2xl hover:shadow-bg/15"
                            }
                          `}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                          }}
                        >
                          {/* Animated gradient background */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{
                              background: "conic-gradient(from 0deg at 50% 50%, rgba(0,0,0,0.05), rgba(0,0,0,0.15), rgba(0,0,0,0.05), rgba(0,0,0,0.02), rgba(0,0,0,0.05))"
                            }}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />

                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-xl bg-fg/10 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-2xl font-semibold tracking-wide">Get in Touch</div>
                                <div className="text-fg/60 text-sm tracking-wider">START YOUR PROJECT</div>
                              </div>
                            </div>

                            <motion.div
                              className="flex items-center gap-2"
                              animate={{
                                x: [0, 4, 0],
                                rotate: [0, 12, 0]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <svg className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300" 
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.div>
                          </div>

                          {/* Sparkle effects */}
                          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-fg/40 rounded-full opacity-0 group-hover:opacity-100"
                                style={{
                                  left: `${15 + i * 12}%`,
                                  top: `${20 + (i % 3) * 20}%`
                                }}
                                animate={{
                                  scale: [0, 1, 0],
                                  rotate: [0, 180, 360],
                                  opacity: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 1.2,
                                  delay: i * 0.15,
                                  repeat: Infinity,
                                  repeatDelay: 3
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </NavLink>
                  </motion.div>
                </motion.nav>
              </div>

              {/* Footer section - refined */}
              <motion.div
                className="px-8 pb-8 pt-4 border-t border-bg/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-6 text-sm text-bg/50">
                    <span>Est. 2019</span>
                    <motion.div 
                      className="w-1 h-1 bg-bg/30 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span>Addis Ababa, ET</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-bg/20 to-transparent flex-1 max-w-16"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                    <span className="text-xs text-bg/40 tracking-[0.2em] font-light">
                      ELEVATING DIGITAL DIMENSIONS
                    </span>
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-bg/20 to-transparent flex-1 max-w-16"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 1.1 }}
                    />
                  </div>
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
