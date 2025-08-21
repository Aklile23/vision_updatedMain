import Container from "../Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const HomeAbout = () => {

    const heroRef = useRef<HTMLDivElement>(null);

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
          }
        }
      };
      const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut" as const
          }
        }
      };
    
  return (
    <section className="relative border-y border-fg/10 bg-muted-1/30 py-20 overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-fg animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border border-fg animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-fg/[0.015] to-transparent" />
        
        <Container>
            <motion.div 
            className="max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            >
            {/* Header â€" simple, engineering-forward */}
            <motion.div className="text-center mb-16" variants={fadeInUp}>
            {/* Eyebrow (keep) */}
            <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-fg/40" />
                <span className="text-[13px] tracking-[0.22em] uppercase text-fg/70">Who We Are</span>
                <span className="h-px w-8 bg-fg/40" />
            </div>

            <h2 className="heading text-4xl md:text-5xl mb-6">
                Our Identity & Purpose
            </h2>
            <p className="text-xl md:text-2xl text-fg/70 max-w-3xl mx-auto leading-relaxed font-light">
                Based in Addis Ababa and serving a global clientele, we combine engineering precision
                with innovative thinking to deliver BIM, AI, and intelligent system solutions that
                stand the test of time.
            </p>
            </motion.div>

            {/* Scroll-Interactive Timeline */}
            <motion.div 
                className="relative mb-16"
                variants={fadeInUp}
            >
                <div className="text-center mb-10">
                <h3 className="text-2xl font-semibold mb-3">Our Evolution</h3>
                <p className="text-fg/70">From immersive experiences to intelligent automation</p>
                </div>

                <div className="relative min-h-[600px]" ref={heroRef}>
                {/* Desktop timeline line */}
                <motion.div
                    className="hidden md:block absolute left-1/2 -translate-x-px top-0 w-px bg-gradient-to-b from-fg/10 via-fg/40 to-fg/10"
                    style={{
                        height: useTransform(
                        useScroll({ target: heroRef, offset: ["start end", "end start"] }).scrollYProgress,
                        [0, 1],
                        ["20%", "100%"]
                        )
                    }}
                />
                
                {/* Mobile flowing timeline background */}
                <div className="md:hidden absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Animated flowing lines */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 600">
                            <defs>
                                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M20 50 Q30 100 25 150 Q20 200 30 250 Q40 300 25 350 Q10 400 25 450 Q40 500 30 550"
                                stroke="url(#flowGradient)"
                                strokeWidth="2"
                                fill="none"
                                className="text-fg"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M40 80 Q50 130 45 180 Q40 230 50 280 Q60 330 45 380 Q30 430 45 480 Q60 530 50 580"
                                stroke="url(#flowGradient)"
                                strokeWidth="1"
                                fill="none"
                                className="text-fg"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.6 }}
                                transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
                            />
                        </svg>
                        
                        {/* Floating particles */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-fg/40 rounded-full"
                                style={{
                                    left: `${15 + Math.random() * 30}%`,
                                    top: `${10 + i * 15}%`,
                                }}
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.2, 0.6, 0.2],
                                    scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
                <div className="space-y-8 md:space-y-12 relative z-10">
                    {[
                    {
                        period: "2019 - Foundation",
                        title: "VR/AR Innovation Begins",
                        content: "Started with cutting-edge VR and AR solutions, establishing our foundation in immersive digital experiences and interactive content creation.",
                        side: "left",
                        highlight: "VR/AR Focus",
                        progress: 0.2,
                        color: "from-blue-500/20 to-purple-500/20",
                        icon: ""
                    },
                    {
                        period: "2020-2022 - Expansion",
                        title: "BIM Integration", 
                        content: "Expanded into Building Information Modeling, combining our visual expertise with precise construction workflows and data-rich modeling.",
                        side: "right",
                        highlight: "BIM Systems",
                        progress: 0.5,
                        color: "from-green-500/20 to-emerald-500/20",
                        
                    },
                    {
                        period: "2023-Present - Intelligence",
                        title: "AI & Automation Era",
                        content: "Leading with AI-driven automation, predictive analytics, and intelligent systems while offering specialized outsourcing services to global clients.",
                        side: "left",
                        highlight: "AI-Powered",
                        progress: 0.8,
                        color: "from-orange-500/20 to-red-500/20",
                        
                    }
                    ].map((item, index) => {
                    const timelineRef = useRef<HTMLDivElement>(null);
                    const { scrollYProgress } = useScroll({
                        target: timelineRef,
                        offset: ["start 80%", "end 20%"]
                    });
                    
                    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.95]);
                    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.6]);
                    const nodeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]);
                    
                    return (
                        <motion.div 
                        key={item.period}
                        ref={timelineRef}
                        className={`relative
                            md:flex md:items-center md:gap-6
                            ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                        style={{ 
                            scale: window.innerWidth >= 768 ? scale : 1, 
                            opacity: window.innerWidth >= 768 ? opacity : 1
                        }}
                        >
                        {/* Desktop timeline node */}
                        <motion.div 
                            className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10"
                            style={{ scale: nodeScale }}
                        >
                            <div className="w-6 h-6 rounded-full border-2 border-fg/30 bg-bg relative">
                            <motion.div 
                                className="absolute inset-1 rounded-full bg-fg"
                                style={{
                                opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6])
                                }}
                            />
                            <motion.div 
                                className="absolute -inset-2 rounded-full border border-fg/20"
                                style={{
                                scale: useTransform(scrollYProgress, [0.4, 0.6], [1, 1.5]),
                                opacity: useTransform(scrollYProgress, [0.4, 0.6], [0.5, 0])
                                }}
                            />
                            </div>
                        </motion.div>

                        {/* Mobile timeline card with enhanced design */}
                        <motion.div
                            className={`w-full md:w-5/12 ${item.side === 'right' ? 'md:ml-auto' : 'md:mr-auto'}`}
                            initial={{ 
                                x: window.innerWidth < 768 ? (index % 2 === 0 ? -100 : 100) : 0, 
                                opacity: 0,
                                scale: 0.8
                            }}
                            whileInView={{ 
                                x: 0, 
                                opacity: 1,
                                scale: 1,
                                transition: { 
                                    delay: index * 0.2,
                                    duration: 0.8,
                                    ease: [0.23, 1, 0.32, 1],
                                    type: "spring",
                                    stiffness: 100
                                }
                            }}
                            viewport={{ once: true, margin: "-20%" }}
                            whileHover={{
                                y: -5,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            
                        >
                            {/* Mobile glowing background */}
                            <div className={`md:hidden absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-xl opacity-50`} />
                            
                            <div className="relative p-6 rounded-2xl border border-fg/10 bg-bg/80 backdrop-blur-sm group hover:border-fg/30 hover:bg-bg/90 transition-all duration-300 overflow-hidden">

                                {/* Mobile progress indicator */}
                                <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-fg/20 via-fg/60 to-fg/20 rounded-l-2xl">
                                    <motion.div 
                                        className="w-full bg-fg rounded-l-2xl"
                                        initial={{ height: "0%" }}
                                        whileInView={{ height: `${item.progress * 100}%` }}
                                        transition={{ delay: index * 0.3, duration: 1.5, ease: "easeOut" }}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 pl-4 md:pl-0">
                                    <span className="text-xs font-medium text-fg/60 tracking-wide">{item.period}</span>
                                </div>
                                
                                <h4 className="text-lg font-semibold mb-3 group-hover:text-fg transition-colors pl-4 md:pl-0">
                                    <span className="md:hidden mr-2">{item.icon}</span>
                                    {item.title}
                                </h4>
                                
                                <p className="text-sm text-fg/70 leading-relaxed group-hover:text-fg/90 transition-colors pl-4 md:pl-0">
                                    {item.content}
                                </p>

                                {/* Mobile connecting line to next item */}
                                {index < 2 && (
                                    <motion.div 
                                        className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-fg/40 to-transparent"
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                                    />
                                )}
                            </div>
                        </motion.div>
                        </motion.div>
                    );
                    })}
                </div>
                </div>
            </motion.div>

            {/* Mission statement */}
            <motion.div 
                className="relative p-8 rounded-3xl border border-fg/10 bg-gradient-to-br from-fg/5 to-transparent backdrop-blur-sm text-center"
                variants={fadeInUp}
            >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-fg/5 to-transparent opacity-50" />
                <div className="relative">
                <blockquote className="text-lg md:text-xl font-light text-fg/90 leading-relaxed italic mb-6">
                    "We don't just deliver services, we forge partnerships to create intelligent solutions that transform how you work, 
                    build, and innovate in the digital landscape."
                </blockquote>
                <div className="flex justify-center gap-4">
                    <NavLink 
                    to="/about" 
                    className="px-6 py-3 rounded-full border border-fg/20 text-sm hover:border-fg hover:bg-fg/5 transition-all duration-300"
                    >
                    Learn More About Us
                    </NavLink>
                    <NavLink 
                    to="/contact" 
                    className="px-6 py-3 rounded-full bg-fg text-bg text-sm hover:bg-fg/90 hover:shadow-lg transition-all duration-300"
                    >
                    Start Your Journey
                    </NavLink>
                </div>
                </div>
            </motion.div>
            </motion.div>
        </Container>
    </section>
  );
}

export default HomeAbout;