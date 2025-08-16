import { useState, useRef, useEffect } from "react";
import Container from "../components/Container";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { easeOut } from "framer-motion"

export default function Solutions() {
  const [, setActiveSection] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
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

  const services = [
    {
      id: "immersive-3d",
      number: "01",
      title: "Immersive 3D Solutions",
      subtitle: "Bringing Ideas to Life Through Visual Innovation",
      description: "We create captivating 3D content that brings ideas to life, whether for entertainment, education, or business applications.",
      features: [
        {
          title: "3D Model Development",
          description: "From lifelike characters to precise engineering models, we tailor each creation to your artistic or BIM-specific needs. Our models merge creativity and accuracy, ensuring the best results for your projects.",
          icon: "◆",
          highlight: "Artistic & BIM-Ready Models"
        },
        {
          title: "VR, AR, and Projection Mapping",
          description: "Immerse your audience with dynamic environments and interactive experiences, transforming spaces into visually stunning canvases. Our AR solutions blend virtual elements seamlessly with the real world, redefining interaction.",
          icon: "◇",
          highlight: "Immersive Experiences"
        },
        {
          title: "Photogrammetry & Point Cloud Processing",
          description: "We specialize in converting photos and raw data into detailed, structured 3D models. These high-resolution outputs enhance workflows for applications such as design validation, construction, and simulation.",
          icon: "◐",
          highlight: "Precision Data Conversion"
        }
      ],
      gradient: "from-white/10 via-gray-400/20 to-white/5",
      accentColor: "white"
    },
    {
      id: "intelligent-building",
      number: "02",
      title: "Intelligent Building Systems",
      subtitle: "Smarter Projects Through Advanced Technology",
      description: "Our expertise in intelligent building systems ensures smarter, more efficient project outcomes through cutting-edge technology integration.",
      features: [
        {
          title: "Building Information Modeling (BIM)",
          description: "Using scan data and advanced tools, we develop actionable BIM models that enhance project management, lifecycle integration, and decision-making processes.",
          icon: "▲",
          highlight: "Actionable BIM Solutions"
        },
        {
          title: "AI-Powered Automation",
          description: "Our AI solutions streamline workflows, enabling predictive analytics and customized automation tools tailored to your industry's needs. From project planning to execution, we add intelligence to every step.",
          icon: "●",
          highlight: "Predictive Intelligence"
        },
        {
          title: "Facility Management Solutions",
          description: "Leveraging data-rich models, we enhance operations and maintenance processes, offering long-term value through detailed insights and efficient facility management.",
          icon: "■",
          highlight: "Data-Driven Operations"
        }
      ],
      gradient: "from-gray-400/10 via-white/20 to-gray-600/5",
      accentColor: "gray-400"
    },
    {
      id: "outsourcing-custom",
      number: "03",
      title: "Outsourcing & Custom Solutions",
      subtitle: "Flexible Partnership for Every Scale",
      description: "VisionLab provides flexible, cost-effective services for businesses of all sizes, whether as a standalone entity or an outsourcing partner.",
      features: [
        {
          title: "Building Information Modeling (BIM) Outsourcing",
          description: "Our primary outsourcing service involves creating, managing, and optimizing BIM models to help businesses streamline their construction and operational processes efficiently.",
          icon: "▼",
          highlight: "Full BIM Lifecycle Management"
        },
        {
          title: "Dedicated Teams",
          description: "Gain access to expert professionals for both short-term and long-term projects. We ensure high-quality deliverables tailored to your specific goals and timelines.",
          icon: "◈",
          highlight: "Expert Team Access"
        },
        {
          title: "Custom AI Development",
          description: "We design and deploy AI tools that cater to unique challenges, unlocking opportunities for automation, innovation, and growth.",
          icon: "⬢",
          highlight: "Bespoke AI Solutions"
        }
      ],
      gradient: "from-gray-600/10 via-white/20 to-gray-800/5",
      accentColor: "gray-600"
    }
  ];

  return (
    <main className="bg-black text-white overflow-hidden">
      <div 
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
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
            className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full border border-white"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full border border-white"
            animate={{
              scale: [1.2, 0.8, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:100px_100px] opacity-[0.02]" />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

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
                  Services Overview
                </span>
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/40" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
            >
              <span className="block">Transform</span>
              <span className="block text-white/70">Your Vision</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mb-12 leading-relaxed font-light"
            >
              VisionLab blends immersive 3D experiences, intelligent building systems, and custom AI solutions to turn ambitious ideas into exceptional, high-quality products.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                >
                  Start Your Project
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a 
                  href="#services" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 font-semibold text-lg"
                >
                  Explore Services
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 flex flex-wrap gap-4 text-sm"
            >
              {services.map((service, index) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  onClick={() => setActiveSection(index)}
                >
                  <span className="text-xs font-mono text-white/40">{service.number}</span>
                  <span className="group-hover:text-white/90">{service.title}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Services Sections */}
      <section id="services" className="relative">
        {services.map((service, serviceIndex) => (
          <div key={service.id} id={service.id} className={`relative ${serviceIndex % 2 === 1 ? 'bg-gray-900/20' : ''}`}>
            {/* Service Header */}
            <div className="border-b border-white/5">
              <Container>
                <motion.div 
                  className="py-20"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-10%" }}
                >
                  <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                      <div className="mb-6">
                        <motion.span 
                          className={`inline-block text-6xl md:text-8xl font-mono text-white/10 leading-none`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          {service.number}
                        </motion.span>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="heading text-4xl md:text-5xl mb-4">{service.title}</h2>
                        <h3 className="text-xl md:text-2xl text-white/60 mb-6 font-light">{service.subtitle}</h3>
                        <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                          {service.description}
                        </p>
                      </motion.div>
                    </div>

                    <div className="lg:col-span-5">
                      <motion.div
                        className={`relative aspect-square rounded-3xl bg-gradient-to-br ${service.gradient} border border-white/10 overflow-hidden`}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ 
                          transition: 'transform 0.3s ease',
                          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 50%)`
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          {/* Service Visual */}
                          <motion.div 
                            className="w-full h-full flex items-center justify-center"
                            animate={{ 
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 8, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <div className={`w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10`}>
                              <span className="text-4xl text-white">{service.features[0]?.icon}</span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Floating Elements */}
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="absolute w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                            style={{
                              left: `${20 + idx * 25}%`,
                              top: `${15 + idx * 20}%`,
                            }}
                            animate={{
                              y: [0, -10, 0],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              delay: idx * 0.5
                            }}
                          >
                            <span className="text-sm text-white">{feature.icon}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Container>
            </div>

            {/* Service Features */}
            <Container>
              <div className="py-20">
                <div className="grid gap-8 lg:gap-12">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      onHoverStart={() => setHoveredFeature(`${serviceIndex}-${featureIndex}`)}
                      onHoverEnd={() => setHoveredFeature(null)}
                    >
                      <div className="relative">
                        {/* Feature Card */}
                        <div 
                          className={`relative p-8 lg:p-12 rounded-3xl border transition-all duration-500 overflow-hidden ${
                            hoveredFeature === `${serviceIndex}-${featureIndex}` 
                              ? 'border-white/30 bg-white/[0.02] shadow-2xl shadow-white/10' 
                              : 'border-white/10 bg-white/[0.005] hover:bg-white/[0.01]'
                          }`}
                          style={{
                            transform: hoveredFeature === `${serviceIndex}-${featureIndex}` ? 'translateY(-4px)' : 'translateY(0)'
                          }}
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-[0.02]">
                            <div className="w-full h-full [background-image:radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] [background-size:40px_40px]" />
                          </div>

                          <div className="relative grid lg:grid-cols-12 gap-8 items-start">
                            {/* Feature Icon & Number */}
                            <div className="lg:col-span-2">
                              <div className="flex items-start gap-4 mb-4 lg:mb-0">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/20 flex items-center justify-center text-2xl text-white transform transition-transform group-hover:scale-110`}>
                                  {feature.icon}
                                </div>
                                <span className="text-4xl font-mono text-white/10 leading-none">
                                  {String(featureIndex + 1).padStart(2, '0')}
                                </span>
                              </div>
                            </div>

                            {/* Feature Content */}
                            <div className="lg:col-span-10">
                              <div className="mb-4">
                                <motion.div 
                                  className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/60 mb-3"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {feature.highlight}
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-white/90 transition-colors">
                                  {feature.title}
                                </h3>
                              </div>
                              
                              <p className="text-lg text-white/70 leading-relaxed mb-6">
                                {feature.description}
                              </p>

                              {/* Feature CTA */}
                              <motion.div
                                className="flex gap-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                <NavLink 
                                  to="/contact" 
                                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
                                >
                                  Discuss This Service
                                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </NavLink>
                                <NavLink 
                                  to="/projects" 
                                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                                >
                                  View Examples
                                </NavLink>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 border-t border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
        <div className="absolute inset-0 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:80px_80px] opacity-[0.01]" />
        
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
                ▲
              </div>
            </motion.div>

            <h2 className="heading text-4xl md:text-6xl mb-6">Ready to Transform Your Vision?</h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Let's discuss how our expertise can bring your next project to life. 
              From initial concept to final delivery, we're here to make it exceptional.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center z-50">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                >
                  Start Your Project
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/projects" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
                >
                  View Our Work
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