import { useState, useRef, useEffect } from "react";
import Container from "../components/Container";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { easeOut } from "framer-motion"

export default function About() {
  const [, setHoveredService] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOverCard, setIsOverCard] = useState(false);

  // add this near your other refs/state
const tiltTickingRef = useRef(false);

  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check if mouse is over a card with data-disable-global-light
      const target = e.target as HTMLElement;
      const isOverDisabledElement = target.closest('[data-disable-global-light]');
      setIsOverCard(!!isOverDisabledElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  // REPLACE your current handlers with these
const handleMouseMove = (e: { currentTarget: any; clientX: number; clientY: number }) => {
  const card = e.currentTarget;
  if (tiltTickingRef.current) return;
  tiltTickingRef.current = true;

  requestAnimationFrame(() => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    // IMPORTANT: tilt only — no scale
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    tiltTickingRef.current = false;
  });
};

const handleMouseLeave = (e: { currentTarget: any }) => {
  const card = e.currentTarget;
  // reset to flat, no scale
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
};


  const services = [
    {
      id: "immersive-3d",
      title: "Immersive 3D Solutions",
      description: "VR, AR, and Projection Mapping experiences that bring ideas to life",
      icon: "◆",
      gradient: "from-white/10 via-gray-400/20 to-white/5"
    },
    {
      id: "intelligent-building",
      title: "Intelligent Building Systems", 
      description: "BIM and AI-powered automation for smarter project outcomes",
      icon: "◇",
      gradient: "from-gray-400/10 via-white/20 to-gray-600/5"
    },
    {
      id: "custom-solutions",
      title: "Custom Solutions",
      description: "Bespoke AI development and dedicated team services",
      icon: "◈",
      gradient: "from-gray-600/10 via-white/20 to-gray-800/5"
    }
  ];

  const values = [
    { 
      title: "Innovation First", 
      description: "Pushing boundaries with emerging technologies", 
      icon: "◆" 
    },
    { 
      title: "Human-Centered", 
      description: "Technology that advances humanity", 
      icon: "◇ " 
    },
    { 
      title: "Excellence", 
      description: "Uncompromising quality in every solution", 
      icon: "◈ " 
    },
    { 
      title: "Future-Focused", 
      description: "Building tomorrow's solutions today", 
      icon: "✧ " 
    }
  ];

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* Global Mouse Light Effect */}
      <div 
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
          isOverCard ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.08) 25%, 
            rgba(255, 255, 255, 0.04) 50%, 
            transparent 70%)`
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center border-b border-white/10 lg:py-46 py-35">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <motion.div 
            className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full border border-white"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full border border-white"
            animate={{
              scale: [1.1, 0.9, 1.1],
              rotate: [180, 270, 360],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:80px_80px] opacity-[0.02]" />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.04]" />

        <Container>
          <motion.div 
            className="relative z-10 max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/40" />
                <span className="text-sm tracking-[0.3em] uppercase text-white/60 font-medium">
                  Our Story
                </span>
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/40" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
            >
              <span className="block text-white">VisionLab</span>
              <span className="block text-white/70">Since 2019</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/70 max-w-4xl mb-12 leading-relaxed font-light"
            >
              Welcome to VisionLab, where innovation meets imagination. We specialize in crafting exceptional immersive and interactive 3D content that redefines boundaries in artistry, engineering, and technology. As pioneers in state of the art digital content, we bridge the gap between creative design and technological excellence. 
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/solutions" 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                >
                  Explore Our Solutions
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/contact" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 font-semibold text-lg"
                >
                  Partner With Us
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Company Origin Story */}
      <section className="py-24 bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
            onMouseEnter={() => setIsOverCard(true)}
            onMouseLeave={() => setIsOverCard(false)}
          >
            <motion.div
              className="group relative max-w-5xl w-full"
              data-disable-global-light
              onMouseMove={handleMouseMove}
              onMouseLeave={(e) => {
                handleMouseLeave(e);
                setIsOverCard(false);
              }}
              style={{ transition: 'transform 0.3s ease' }}
             
            >
              <div className="relative rounded-3xl bg-white text-black overflow-hidden border border-black/10 shadow-xl">

          {/* Hover accent border */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              padding: 1,
              background:
                "conic-gradient(from 120deg at 50% 50%, rgba(0,0,0,0.15), rgba(0,0,0,0.02), rgba(0,0,0,0.15))",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              borderRadius: "1.5rem",
            }}
          />

          {/* Content */}
          <div className="p-10 md:p-14">
            {/* Eyebrow label */}
            <div className="mb-5 flex items-center gap-4">
              <span className="text-[11px] tracking-[0.3em] uppercase text-black/50">
                Our Vision
              </span>
              <span className="h-px flex-1 bg-black/10" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.05] font-semibold text-black">
              Pushing Boundaries in Emerging Technology
            </h2>

            {/* Underline accent */}
            <div className="mt-4 h-[3px] w-28 bg-black/80" />

            {/* Capability chips */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-black/5 text-black/70">VR</span>
              <span className="px-3 py-1 rounded-full bg-black/5 text-black/70">AR</span>
              <span className="px-3 py-1 rounded-full bg-black/5 text-black/70">Computer Vision</span>
              <span className="px-3 py-1 rounded-full bg-black/5 text-black/70">AI + BIM</span>
            </div>

            {/* Body */}
            <div className="mt-8 space-y-6 text-lg md:text-xl text-black/70 leading-relaxed">
              <p>
                Founded in 2019, VisionLab was born from a vision to bridge the gap between cutting edge technology and real world applications. We saw the immense potential of emerging technologies like VR, AR, and computer vision to transform how people interact with digital experiences.
              </p>
              <p>
                What started as a small team of passionate engineers in Addis Ababa has grown into a company dedicated to pushing the boundaries of what's possible. We believe technology should serve humanity, not the other way around.
              </p>
              <p>
                Our journey is driven by curiosity, innovation, and the belief that the future belongs to those bold enough to build it today.
              </p>
            </div>

            {/* Footer — clean */}
            <div className="mt-10 flex items-center justify-end gap-2 text-sm text-black/50">
              <span className="inline-block h-2 w-2 rounded-full bg-black/30" />
              <span>Global Perspective</span>
            </div>
          </div>

          {/* Spotlight effect (still tied to tilt) */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.06), transparent 45%)",
            }}
          />
          </div>

            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Our Services - Minimal Section */}
      <section className="py-16 bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading text-3xl md:text-4xl mb-4 text-white">Our Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
                onHoverStart={() => setHoveredService(service.id)}
                onHoverEnd={() => setHoveredService(null)}
              >
                <div
                  className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  {/* Interactive spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.05), transparent 40%)`
                    }}
                  />

                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/20 flex items-center justify-center text-2xl text-white`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white/90 transition-colors">{service.title}</h3>
                    <p className="text-white/70 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <NavLink 
              to="/solutions" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              View All Solutions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
          </motion.div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="mb-8"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-white/20 flex items-center justify-center text-3xl text-white">
                ✦
              </div>
            </motion.div>

            <h2 className="heading text-4xl md:text-5xl mb-8 text-white">Our Mission</h2>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12">
              At VisionLab, we strive to create technology experiences that <strong className="text-white">advance humanity</strong> and make the world <strong className="text-white">smarter, better and more connected</strong>.
            </p>

            {/* Mission Values */}
            <div className="grid md:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  {/* Interactive spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 40%)`
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="font-semibold mb-2 text-white group-hover:text-white/90 transition-colors">{value.title}</h4>
                    <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Team & Culture - Redesigned */}
      <section className="py-24 bg-black border-t border-white/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
                  <span className="text-sm tracking-[0.3em] uppercase text-white/60 font-medium">
                    Our Team
                  </span>
                </div>
              </div>

              <h2 className="heading text-4xl md:text-5xl mb-8 text-white leading-tight">
                Where Innovation
                <span className="block text-white/70">Meets Expertise</span>
              </h2>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Our multidisciplinary team brings together deep technical expertise in emerging technologies with creative vision and real-world experience. Based in Addis Ababa, we serve clients globally with solutions that push the boundaries of what's possible.
              </p>
              
              {/* Team specialties */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-sm text-white">◆</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">3D & Immersive Tech Specialists</h4>
                    <p className="text-sm text-white/60">VR/AR development, 3D modeling, spatial computing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-sm text-white">◇</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">AI & Computer Vision Engineers</h4>
                    <p className="text-sm text-white/60">Machine learning, computer vision, intelligent systems</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-sm text-white">◈</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">BIM & Architecture Tech</h4>
                    <p className="text-sm text-white/60">Building information modeling, construction tech</p>
                  </div>
                </div>
              </div>

              {/* Culture stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white mb-1">25+</div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Years</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white mb-1">6+</div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white mb-1">Global</div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Reach</div>
                </div>
              </div>
            </div>

            {/* Interactive visualization */}
            <motion.div
              className="group relative aspect-square rounded-3xl overflow-hidden"
              data-disable-global-light
              onMouseMove={handleMouseMove}
              onMouseLeave={(e) => {
                handleMouseLeave(e);
                setIsOverCard(false);
              }}
              onMouseEnter={() => setIsOverCard(true)}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl">
                
                {/* Hover accent border */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{
                    padding: 1,
                    background: "conic-gradient(from 120deg at 50% 50%, rgba(255,255,255,0.2), rgba(255,255,255,0.05), rgba(255,255,255,0.2))",
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Interactive network visualization */}
                <div className="absolute inset-0 p-8">
                  {/* Central node */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-white text-xl">✦</span>
                  </motion.div>

                  {/* Orbiting nodes representing team specialties */}
                  {[
                    { angle: 0, delay: 0, icon: "◆", label: "3D/VR" },
                    { angle: 72, delay: 0.8, icon: "◇", label: "AI/CV" },
                    { angle: 144, delay: 1.6, icon: "◈", label: "BIM" },
                    { angle: 216, delay: 2.4, icon: "✧", label: "Design" },
                    { angle: 288, delay: 3.2, icon: "◉", label: "Strategy" }
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white text-sm"
                      style={{
                        top: '50%',
                        left: '50%',
                        marginTop: '-20px',
                        marginLeft: '-20px',
                      }}
                      animate={{
                        x: [
                          Math.cos((node.angle * Math.PI) / 180) * 80,
                          Math.cos(((node.angle + 360) * Math.PI) / 180) * 80
                        ],
                        y: [
                          Math.sin((node.angle * Math.PI) / 180) * 80,
                          Math.sin(((node.angle + 360) * Math.PI) / 180) * 80
                        ],
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        delay: node.delay,
                        ease: "linear"
                      }}
                    >
                      {node.icon}
                    </motion.div>
                  ))}

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.line
                        key={i}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + Math.cos((i * 72 * Math.PI) / 180) * 25}%`}
                        y2={`${50 + Math.sin((i * 72 * Math.PI) / 180) * 25}%`}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        animate={{
                          opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.6
                        }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Spotlight effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                  style={{
                    background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 40%)`
                  }}
                />

                {/* Label */}
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <p className="text-sm text-white/60">Collaborative Innovation Network</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black border-t border-white/10">
        <Container>
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="group relative rounded-3xl bg-white text-black p-12 md:p-16 shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Subtle spotlight effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.05), transparent 40%)"
                }}
              />

              {/* Decorative floating element */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-black/10 flex items-center justify-center"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-3xl">✦</span>
              </motion.div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="heading text-4xl md:text-5xl mb-6">Ready for the Future?</h2>
                <p className="text-lg md:text-xl text-black/70 mb-10 leading-relaxed">
                  Join us on the journey towards tomorrow. Let's create technology experiences that advance humanity together.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <NavLink 
                    to="/contact" 
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-black text-white font-semibold text-lg hover:bg-black/90 hover:shadow-xl transition-all duration-300"
                  >
                    Start Your Journey
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NavLink>

                  <NavLink 
                    to="/projects" 
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-black/20 text-black hover:border-black/40 hover:bg-black/5 transition-all duration-300 font-semibold text-lg"
                  >
                    See Our Work
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}