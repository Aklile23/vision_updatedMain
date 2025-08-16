import { useState, useRef, useEffect } from "react";
import Container from "../components/Container";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { easeOut } from "framer-motion"

export default function About() {
  const [, setHoveredExpertise] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOverCard, setIsOverCard] = useState(false);
  
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

  // Interactive card effects
  const handleMouseMove = (e: { currentTarget: any; clientX: number; clientY: number; }) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: { currentTarget: any; }) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const expertiseAreas = [
    {
      id: "artistic-engineering",
      title: "Artistic & Engineering Models",
      description: "We deliver high-quality 3D spaces and characters, blending artistry with engineering precision.",
      icon: "◆",
      bgColor: "bg-white",
      textColor: "text-white",
      details: [
        "Lifelike character development",
        "Precision engineering models", 
        "Architectural visualization",
        "BIM-ready 3D assets"
      ]
    },
    {
      id: "immersive-experiences",
      title: "Immersive Experiences",
      description: "From Virtual Reality to Augmented Reality and projection solutions, we create unforgettable digital environments.",
      icon: "◇",
      bgColor: "bg-black",
      textColor: "text-white",
      details: [
        "Virtual Reality experiences",
        "Augmented Reality applications",
        "Projection mapping solutions",
        "Interactive digital environments"
      ]
    },
    {
      id: "ai-integration",
      title: "AI Integration",
      description: "Our cutting-edge AI technologies drive automation and innovation across diverse industries.",
      icon: "◈",
      bgColor: "bg-white",
      textColor: "text-white",
      details: [
        "Process automation",
        "Predictive analytics",
        "Custom AI solutions",
        "Industry-specific innovation"
      ]
    }
  ];

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* Global Mouse Light Effect */}
      <div 
        className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-300 ${
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
      <section ref={heroRef} className="relative min-h-screen flex items-center border-b border-white/10">
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
                  About VisionLab
                </span>
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/40" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
            >
              <span className="block text-white">Your Gateway</span>
              <span className="block text-white/70">to Digital Innovation</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/70 max-w-4xl mb-12 leading-relaxed font-light"
            >
              As pioneers in state-of-the-art digital content, we bridge the gap between creative design and technological excellence. Based in Addis Ababa, Ethiopia, we proudly serve a global clientele with a commitment to quality, precision, and innovation.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                >
                  Partner With Us
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/projects" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 font-semibold text-lg"
                >
                  View Our Work
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NavLink>
              </motion.div>
            </motion.div>

            {/* Location & Global Reach */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-2">🇪🇹</div>
                <div className="text-sm text-white/60 uppercase tracking-wide">Based in Addis Ababa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-2">🌍</div>
                <div className="text-sm text-white/60 uppercase tracking-wide">Global Reach</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-2xl md:text-3xl font-bold mb-2">💡</div>
                <div className="text-sm text-white/60 uppercase tracking-wide">Innovation First</div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Mission Statement */}
<section className="py-24 bg-black">
 <Container>
   <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8 }}
     viewport={{ once: true }}
     className="flex justify-center"
   >
     <motion.div
       className="group relative max-w-4xl w-full"
       data-disable-global-light
       onMouseMove={handleMouseMove}
       onMouseLeave={handleMouseLeave}
       style={{ transition: 'transform 0.3s ease' }}
       whileHover={{ scale: 1.02 }}
     >
       <div className="relative p-12 md:p-16 rounded-3xl bg-white text-black border border-gray-200 overflow-hidden shadow-2xl">
         {/* Interactive spotlight */}
         <div
           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{
             background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 0, 0, 0.05), transparent 40%)"
           }}
         />

         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-[0.02]">
           <div className="w-full h-full [background-image:radial-gradient(circle_at_50%_50%,black_1px,transparent_1px)] [background-size:40px_40px]" />
         </div>

         {/* Floating Decorative Elements */}
         <motion.div 
           className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-black/10 flex items-center justify-center"
           animate={{
             rotate: [0, 360],
             scale: [1, 1.1, 1]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         >
           <span className="text-2xl">✦</span>
         </motion.div>

         <motion.div 
           className="absolute bottom-8 left-8 w-12 h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center"
           animate={{
             y: [0, -10, 0],
             opacity: [0.7, 1, 0.7]
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         >
           <span className="text-lg">◆</span>
         </motion.div>

         {/* Content */}
         <div className="relative z-10 text-center">
           <motion.div
             className="mb-8"
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
           >
             <div className="inline-flex items-center gap-4 mb-6">
               <span className="h-px w-12 bg-gradient-to-r from-transparent to-black/40" />
               <span className="text-sm tracking-[0.3em] uppercase text-black/60 font-medium">
                 Our Mission
               </span>
               <span className="h-px w-12 bg-gradient-to-l from-transparent to-black/40" />
             </div>
           </motion.div>
           
           <motion.h2 
             className="heading text-3xl md:text-4xl lg:text-5xl mb-8 text-black leading-tight"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.3 }}
             viewport={{ once: true }}
           >
             Creativity and Technology Converge
           </motion.h2>
           
           <motion.p 
             className="text-lg md:text-xl text-black/70 leading-relaxed max-w-3xl mx-auto"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             viewport={{ once: true }}
           >
             At VisionLab, creativity and technology converge to transform ideas into tangible solutions. Our mission is to be your trusted partner in navigating the digital landscape and achieving unparalleled results.
           </motion.p>

           {/* Mission Highlights */}
           <motion.div 
             className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             viewport={{ once: true }}
           >
             {[
               { icon: "🎯", title: "Transform Ideas", desc: "Into tangible solutions" },
               { icon: "🤝", title: "Trusted Partner", desc: "In digital innovation" },
               { icon: "🚀", title: "Unparalleled Results", desc: "Through excellence" }
             ].map((item, index) => (
               <motion.div
                 key={index}
                 className="p-4 rounded-xl bg-black/5 border border-black/10 hover:bg-black/10 transition-all duration-300"
                 whileHover={{ scale: 1.05, y: -2 }}
               >
                 <div className="text-2xl mb-2">{item.icon}</div>
                 <h4 className="font-semibold text-black mb-1">{item.title}</h4>
                 <p className="text-sm text-black/60">{item.desc}</p>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </div>
     </motion.div>
   </motion.div>
 </Container>
</section>

      {/* Areas of Expertise */}
      <section className="py-24 bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl md:text-5xl mb-6 text-white">Areas of Expertise</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Our comprehensive expertise spans across three core domains, each designed to deliver exceptional digital solutions that transform your vision into reality.
            </p>
          </motion.div>

          <div className="grid gap-12">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                onHoverStart={() => setHoveredExpertise(area.id)}
                onHoverEnd={() => setHoveredExpertise(null)}
              >
                {/* Content */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-6' : ''} ${area.textColor}`}>
                  <div className="mb-6">
                    <motion.span 
                      className={`inline-block text-6xl font-mono ${area.textColor === 'text-black' ? 'text-black/10' : 'text-white/10'} leading-none mb-4`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    
                    <h3 className={`heading text-3xl md:text-4xl mb-3 ${area.textColor}`}>{area.title}</h3>
                    <p className={`text-lg ${area.textColor === 'text-black' ? 'text-black/70' : 'text-white/70'} leading-relaxed mb-8`}>
                      {area.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="mb-8">
                    <h5 className={`text-sm font-semibold ${area.textColor === 'text-black' ? 'text-black/80' : 'text-white/80'} mb-4 uppercase tracking-wide`}>Key Capabilities</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {area.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          className={`flex items-center gap-3 p-3 rounded-lg ${area.textColor === 'text-black' ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'} border`}
                          whileHover={{ 
                            scale: 1.02, 
                            backgroundColor: area.textColor === 'text-black' ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className={`${area.textColor === 'text-black' ? 'text-black/40' : 'text-white/40'} text-sm`}>•</span>
                          <span className={`text-sm ${area.textColor === 'text-black' ? 'text-black/70' : 'text-white/70'}`}>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-4">
                    <NavLink 
                      to="/solutions" 
                      className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                        area.textColor === 'text-black'
                          ? 'bg-black/10 text-black hover:bg-black hover:text-white'
                          : 'bg-white/10 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      Learn More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </NavLink>
                    <NavLink 
                      to="/contact" 
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                        area.textColor === 'text-black'
                          ? 'border-black/20 text-black hover:border-black/40 hover:bg-black/5'
                          : 'border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                      }`}
                    >
                      Discuss Project
                    </NavLink>
                  </div>
                </div>

                {/* Visual */}
                <motion.div 
                  className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`group relative aspect-square rounded-3xl border overflow-hidden ${
                      area.bgColor === 'bg-white' ? 'bg-white border-black/15' : 'bg-black border-white/15'
                    }`}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ transition: 'transform 0.3s ease' }}
                  >
                    {/* Interactive spotlight */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
                          area.bgColor === 'bg-white' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'
                        }, transparent 40%)`
                      }}
                    />

                    {/* Visual Content */}
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <motion.div 
                        className="w-full h-full flex items-center justify-center"
                        animate={{ 
                          rotate: [0, 2, -2, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ 
                          duration: 6, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="relative w-40 h-40">
                          <div className={`w-full h-full rounded-full border-2 flex items-center justify-center ${
                            area.bgColor === 'bg-white' 
                              ? 'border-black/20 bg-black/10' 
                              : 'border-white/20 bg-white/10'
                          }`}>
                            <span className={`text-4xl ${
                              area.bgColor === 'bg-white' ? 'text-black/40' : 'text-white/40'
                            }`}>{area.icon}</span>
                          </div>
                          
                          {/* Floating elements */}
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-8 h-8 rounded-full border flex items-center justify-center ${
                                area.bgColor === 'bg-white'
                                  ? 'bg-black/10 border-black/15'
                                  : 'bg-white/10 border-white/15'
                              }`}
                              style={{
                                left: `${20 + i * 25}%`,
                                top: `${15 + i * 20}%`,
                              }}
                              animate={{
                                y: [0, -10, 0],
                                opacity: [0.6, 1, 0.6]
                              }}
                              transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                delay: i * 0.5
                              }}
                            >
                              <span className={`text-xs ${
                                area.bgColor === 'bg-white' ? 'text-black/60' : 'text-white/60'
                              }`}>{area.icon}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Area number badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-semibold ${
                        area.bgColor === 'bg-white'
                          ? 'bg-black/10 border-black/20 text-black'
                          : 'bg-white/10 border-white/20 text-white'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose VisionLab */}
      <section className="py-24 bg-white text-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl md:text-5xl mb-6 text-black">Why Choose VisionLab</h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in every project we deliver, combining global standards with local expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Craft", description: "Attention to detail in models, visuals, interactions", icon: "◆" },
              { title: "Precision", description: "Data-driven workflows, reliable delivery", icon: "◇" },
              { title: "Partnership", description: "We co-design around real constraints", icon: "◈" }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl border border-black/10 bg-white/50 hover:border-black/20 hover:bg-black/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black/10 flex items-center justify-center text-2xl text-black/60">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">{value.title}</h3>
                <p className="text-black/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black border-t border-white/10">
        <Container>
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-white/20 flex items-center justify-center text-3xl">
                🚀
              </div>
            </motion.div>

            <h2 className="heading text-4xl md:text-6xl mb-6 text-white">Ready to Transform Your Vision?</h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Let's discuss how VisionLab can be your trusted partner in navigating the digital landscape and achieving unparalleled results.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                >
                  Start Partnership
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/solutions" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
                >
                  Explore Services
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}