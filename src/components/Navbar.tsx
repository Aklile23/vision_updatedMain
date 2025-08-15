import React, { useEffect, useRef, useState } from "react";
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    const base = "relative px-4 py-2 text-sm font-medium tracking-tight transition-all duration-300 rounded-xl";
    const colorTop = isActive 
      ? "text-fg bg-fg/10" 
      : "text-fg/70 hover:text-fg hover:bg-fg/5";
    const colorScrolled = isActive 
      ? "text-bg bg-bg/20" 
      : "text-bg/80 hover:text-bg hover:bg-bg/15";
    return `${base} ${scrolled ? colorScrolled : colorTop}`;
  };

  const headerBase = "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out";
  const headerColors = scrolled
    ? "bg-fg/95 backdrop-blur-lg border-bg/10 shadow-lg shadow-fg/5"
    : "bg-bg/80 backdrop-blur-md border-fg/10";
  const header = `${headerBase} border-b ${headerColors}`;

  const navigationItems = [
    { to: "/solutions", label: "Solutions" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <header className={header}>
        <Container>
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-18"}`}>
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink
                to="/"
                className="flex items-center gap-3 group"
              >
                {/* Logo Image */}
                <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${scrolled ? "w-10 h-10" : "w-12 h-12"}`}>
                  <img
                    src="/images/logo_white.png"
                    alt="VisionLab Technologies"
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                    style={{
                      filter: scrolled ? 'invert(1) brightness(0.9)' : 'none'
                    }}
                  />
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                </div>

                {/* Brand Text */}
                <div className="flex flex-col">
                  <span className={`font-bold tracking-tight transition-all duration-300 ${scrolled ? "text-base text-bg" : "text-lg text-fg"}`}>
                    VisionLab
                  </span>
                  <span className={`text-xs tracking-wide transition-all duration-300 ${scrolled ? "text-bg/70" : "text-fg/60"}`}>
                    TECHNOLOGIES
                  </span>
                </div>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  className={linkClass}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                      scrolled ? "bg-bg/10" : "bg-fg/5"
                    }`}
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    initial={{ scale: 0.95, opacity: 0 }}
                  />
                </NavLink>
              ))}

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    [
                      "ml-2 px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden",
                      scrolled
                        ? isActive
                          ? "bg-bg text-fg shadow-lg"
                          : "bg-bg/20 text-bg border border-bg/30 hover:bg-bg hover:text-fg hover:shadow-lg"
                        : isActive
                        ? "bg-fg text-bg shadow-lg shadow-fg/25"
                        : "bg-fg/10 text-fg border border-fg/20 hover:bg-fg hover:text-bg hover:shadow-lg hover:shadow-fg/25",
                    ].join(" ")
                  }
                >
                  <span className="relative z-10">Contact</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </NavLink>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-xl transition-colors duration-300 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                    scrolled ? "bg-bg" : "bg-fg"
                  }`}
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={`block h-0.5 w-6 rounded-full mt-1.5 transition-all duration-300 ${
                    scrolled ? "bg-bg" : "bg-fg"
                  }`}
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    x: mobileMenuOpen ? 20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={`block h-0.5 w-6 rounded-full mt-1.5 transition-all duration-300 ${
                    scrolled ? "bg-bg" : "bg-fg"
                  }`}
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </Container>
      </header>

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

           {/* Animated grid background */}
           <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(var(--color-bg)_1px,transparent_1px),linear-gradient(90deg,var(--color-bg)_1px,transparent_1px)] [background-size:32px_32px]" />

           {/* Floating elements */}
           <motion.div
             className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-bg/20"
             animate={{
               rotate: [0, 360],
               scale: [1, 1.1, 1],
             }}
             transition={{
               duration: 8,
               repeat: Infinity,
               ease: "easeInOut"
             }}
           />
           <motion.div
             className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full border border-bg/15"
             animate={{
               rotate: [360, 0],
               scale: [1, 0.9, 1],
             }}
             transition={{
               duration: 6,
               repeat: Infinity,
               ease: "easeInOut"
             }}
           />

           {/* Menu Content */}
           <motion.div
             className="relative h-full flex flex-col items-center justify-center text-center px-6"
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.9, opacity: 0 }}
             transition={{ duration: 0.4, delay: 0.1 }}
           >
             {/* Logo in Menu */}
             <motion.div
               className="mb-16"
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.3 }}
             >
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl overflow-hidden">
                   <img
                     src="/logo.png"
                     alt="VisionLab Technologies"
                     className="w-full h-full object-contain"
                     style={{ filter: 'brightness(0) invert(1)' }}
                   />
                 </div>
                 <div className="text-left">
                   <div className="text-2xl font-bold text-bg">VisionLab</div>
                   <div className="text-sm text-bg/70 tracking-wider">TECHNOLOGIES</div>
                 </div>
               </div>
             </motion.div>

             {/* Navigation Links */}
             <motion.nav
               className="space-y-8 mb-16"
               variants={{
                 hidden: { opacity: 0 },
                 show: {
                   opacity: 1,
                   transition: {
                     staggerChildren: 0.15,
                     delayChildren: 0.4
                   }
                 }
               }}
               initial="hidden"
               animate="show"
             >
               {navigationItems.map((item, index) => (
                 <motion.div
                   key={item.to}
                   variants={{
                     hidden: { y: 50, opacity: 0 },
                     show: { y: 0, opacity: 1 }
                   }}
                   transition={{ duration: 0.6, ease: "easeOut" }}
                 >
                   <NavLink
                     to={item.to}
                     className={({ isActive }) =>
                       `block text-4xl font-light tracking-wide transition-all duration-300 relative group ${
                         isActive 
                           ? "text-bg font-medium" 
                           : "text-bg/80 hover:text-bg"
                       }`
                     }
                     onClick={() => setMobileMenuOpen(false)}
                   >
                     <span className="relative z-10">{item.label}</span>
                     {/* Number indicator */}
                     <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-lg text-bg/40 font-mono">
                       0{index + 1}
                     </span>
                     {/* Hover line */}
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
                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
                 <span className="text-xs text-bg/50 tracking-widest">ELEVATING DIGITAL DIMENSIONS</span>
                 <div className="w-6 h-px bg-bg/30" />
               </div>
             </motion.div>
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>

      {/* Add some CSS for smooth animations */}
      <style>{`
        @keyframes slideAccent {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
}