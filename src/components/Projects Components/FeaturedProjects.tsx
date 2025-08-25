import React from "react";
import Container from "../Container";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";


const FeaturedProjects = () => {
  
    const handleMouseMove: React.MouseEventHandler<HTMLElement> = (e) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
  
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
  
      const rotateX = (y - cy) / 10;
      const rotateY = (cx - x) / 10;
  
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    };
  
    const handleMouseLeave: React.MouseEventHandler<HTMLElement> = (e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    const projects = [
        {
          id: 1,
          title: "Immersive Customizer",
          subtitle: "Interactive Real Estate Solutions",
          description: "Development of an interactive solution for real estate marketing and communication between buyers and developers. This tool enables buyers to view and edit the interior finishes of their future homes interactively, enhancing decision-making and satisfaction. The solution has also been successfully applied in warehouse customization projects.",
          tags: ["3D Visualization", "Real Estate", "Interactive"],
          category: "Immersive 3D",
          featured: true,
          technologies: ["C#", "Unity", "React", "Unreal"],
          impact: "Enhanced buyer satisfaction & reduced decision time, accessible anywhere, anytime",
          visual: "customizer",
          caseStudyLink: "/projects/IC-CaseStudy" 
        },
        {
          id: 2,
          title: "Aerial Photogrammetry",
          subtitle: "3D Geospatial Reconstruction",
          description: "Creation of 3D geospatial models of construction sites using drone photography. These reconstructed spaces facilitate the management of large-scale housing construction and infrastructural projects. This process has also been employed in the 3D reconstruction of historic sites, such as the Shaikh Hussain Mosque.",
          tags: ["Photogrammetry", "Drones", "Heritage"],
          category: "Data Capture",
          featured: true,
          technologies: ["Drone Technology", "Point Clouds", "3D Reconstruction"],
          impact: "Accurate site documentation & heritage preservation",
          visual: "photogrammetry",
          caseStudyLink: "/projects/AP-CaseStudy" 
        },
        {
          id: 3,
          title: "Interactive Visuals",
          subtitle: "Real-time Motion Replication",
          description: "Development of motion replication content, where a character mimics the real-time movements of a viewer. This technology adds an engaging, immersive layer to digital experiences.",
          tags: ["Motion Capture", "Real-time", "Interactive"],
          category: "Immersive 3D",
          featured: false,
          technologies: ["Computer Vision", "WebRTC", "Animation"],
          impact: "Immersive user engagement & interaction",
          visual: "motion",
          caseStudyLink: "" 
        },
        {
          id: 4,
          title: "AR Scavenger Hunt Gadget",
          subtitle: "Location-Based AR Experiences",
          description: "An innovative AR-based scavenger hunting solution that enhances entertainment and engagement through interactive digital experiences.",
          tags: ["AR", "Mobile", "Gaming"],
          category: "Augmented Reality",
          featured: false,
          technologies: ["ARCore", "GPS", "Mobile Development"],
          impact: "Enhanced engagement through gamification",
          visual: "ar-hunt",
          caseStudyLink: "" 
        },
        {
          id: 5,
          title: "Virtual Assistant",
          subtitle: "Localized AI Intelligence",
          description: "Development of an interactive virtual assistant trained to provide accurate, localized information, catering to specific user needs and enhancing accessibility.",
          tags: ["AI", "NLP", "Assistant"],
          category: "AI Solutions",
          featured: true,
          technologies: ["Machine Learning", "NLP", "Voice Recognition"],
          impact: "Improved accessibility & user experience",
          visual: "ai-assistant",
          caseStudyLink: "" 
        },
        {
          id: 6,
          title: "Process Automation",
          subtitle: "Workflow Optimization Systems",
          description: "Automation solutions designed to optimize workflows, reduce manual intervention, and enhance operational efficiency across various industries.",
          tags: ["Automation", "Workflow", "Efficiency"],
          category: "AI Solutions",
          featured: false,
          technologies: ["RPA", "API Integration", "Data Analytics"],
          impact: "Reduced manual work & increased efficiency",
          visual: "automation",
          caseStudyLink: "" 
        }
    ];

    const featuredProjects = projects.filter(project => project.featured);
    return (
        <section id="featured" className="py-14 bg-gradient-to-b from-bg via-muted-1/10 to-bg relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-fg/[0.02] rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-fg/[0.03] rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-fg/[0.05] rounded-full" />
            </div>

            <Container>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-20 relative z-10"
            >
                <h2 className="heading text-3xl md:text-5xl mb-6">
                <span className="block">Featured Projects</span>
                </h2>
                <p className="text-xl text-fg/70 max-w-3xl mx-auto leading-relaxed">
                Breakthrough solutions that showcase our expertise across cutting-edge technologies and innovative problem-solving approaches.
                </p>
            </motion.div>

            <div className="space-y-32">
                {featuredProjects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="relative"
                >
                    {/* Project Container */}
                    <div className={`grid lg:grid-cols-2 gap-16 lg:gap-20 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                    }`}>
                    
                    {/* Visual Side */}
                    <motion.div 
                        className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div
                        className="group relative aspect-[4/3] rounded-3xl overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ transition: 'transform 0.4s ease' }}
                        >
                        {/* Main Visual Container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fg/10 via-fg/5 to-transparent border border-fg/15">
                            {/* Interactive spotlight */}
                            <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                                background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 50%)"
                            }}
                            />

                            {/* Project Visual */}
                            <div className="absolute inset-0 flex items-center justify-center p-16">
                            <motion.div 
                                className="relative w-full h-full max-w-sm"
                                animate={{ 
                                rotateX: [0, 5, -5, 0],
                                rotateY: [0, -5, 5, 0],
                                }}
                                transition={{ 
                                duration: 8, 
                                repeat: Infinity,
                                ease: "easeInOut"
                                }}
                            >
                                {project.visual === "customizer" && (
                                <div className="relative w-full h-full">
                                    {/* 3D Room Visualization */}
                                    <motion.div 
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    >
                                    <svg className="w-full h-full text-fg/40" viewBox="0 0 200 200" fill="none">
                                        {/* Room structure */}
                                        <path d="M20 160 L20 40 L100 20 L180 40 L180 160 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
                                        <path d="M20 160 L100 140 L180 160" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15"/>
                                        <path d="M20 40 L100 20 L100 140 L20 160" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.08"/>
                                        
                                        {/* Furniture elements */}
                                        <rect x="40" y="120" width="30" height="25" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
                                        <rect x="120" y="110" width="40" height="35" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.25"/>
                                        
                                        {/* Interactive points */}
                                        <motion.circle 
                                        cx="55" cy="125" r="3" fill="currentColor"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                        />
                                        <motion.circle 
                                        cx="140" cy="120" r="3" fill="currentColor"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        />
                                    </svg>
                                    </motion.div>
                                    
                                    {/* Floating UI Elements */}
                                    <motion.div 
                                    className="absolute top-4 right-4 w-16 h-12 bg-fg/20 rounded-lg border border-fg/30 flex items-center justify-center"
                                    animate={{ y: [-2, 2, -2] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    >
                                    <span className="text-xs text-fg/60">UI</span>
                                    </motion.div>
                                </div>
                                )}

                                {project.visual === "photogrammetry" && (
                                <div className="relative w-full h-full">
                                    <svg className="w-full h-full text-fg/40" viewBox="0 0 200 200" fill="none">
                                    {/* Point cloud representation */}
                                    <motion.g
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    >
                                        {[...Array(40)].map((_, i) => {
                                        const angle = (i / 40) * 2 * Math.PI;
                                        const radius = 50 + Math.sin(angle * 3) * 20;
                                        const x = 100 + Math.cos(angle) * radius;
                                        const y = 100 + Math.sin(angle) * radius;
                                        return (
                                            <motion.circle
                                            key={i}
                                            cx={x}
                                            cy={y}
                                            r="1.5"
                                            fill="currentColor"
                                            opacity={0.4 + Math.sin(angle * 2) * 0.3}
                                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                                            />
                                        );
                                        })}
                                    </motion.g>
                                    
                                    {/* Drone path */}
                                    <motion.circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                        fill="none"
                                        opacity="0.3"
                                        animate={{ strokeDashoffset: [0, -32] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    />
                                    
                                    {/* Drone */}
                                    <motion.g
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                        style={{ transformOrigin: "100px 100px" }}
                                    >
                                        <rect x="95" y="20" width="10" height="6" fill="currentColor" rx="2"/>
                                        <circle cx="100" cy="20" r="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
                                    </motion.g>
                                    </svg>
                                </div>
                                )}

                                {project.visual === "ai-assistant" && (
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Central AI Core */}
                                    <motion.div 
                                        className="relative w-24 h-24 rounded-full border-2 border-fg/30 flex items-center justify-center"
                                        animate={{ 
                                        boxShadow: ["0 0 20px rgba(255,255,255,0.1)", "0 0 40px rgba(255,255,255,0.2)", "0 0 20px rgba(255,255,255,0.1)"]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <motion.div 
                                        className="w-12 h-12 rounded-full bg-fg/20 flex items-center justify-center"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        >
                                        <span className="text-lg">🤖</span>
                                        </motion.div>
                                    </motion.div>

                                    {/* Orbiting Data Points */}
                                    {[...Array(8)].map((_, i) => {
                                        const angle = (i / 8) * 2 * Math.PI;
                                        const radius = 80;
                                        return (
                                        <motion.div
                                            key={i}
                                            className="absolute w-3 h-3 rounded-full bg-fg/40"
                                            style={{
                                            left: "50%",
                                            top: "50%",
                                            }}
                                            animate={{
                                            x: Math.cos(angle) * radius,
                                            y: Math.sin(angle) * radius,
                                            rotate: 360,
                                            }}
                                            transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: i * 0.2,
                                            }}
                                        />
                                        );
                                    })}

                                    {/* Neural Network Lines */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                                        <motion.path
                                        d="M60 60 Q100 80 140 60 M60 140 Q100 120 140 140 M60 100 Q100 100 140 100"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.2"
                                        strokeDasharray="4 4"
                                        animate={{ strokeDashoffset: [0, -16] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        />
                                    </svg>
                                    </div>
                                </div>
                                )}
                            </motion.div>
                            </div>

                            {/* Floating Stats */}
                            <motion.div 
                            className="absolute bottom-6 left-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            >
                            <div className="bg-bg/90 backdrop-blur border border-fg/20 rounded-xl px-4 py-2">
                                <div className="text-sm font-semibold">{project.category}</div>
                                <div className="text-xs text-fg/60">Project #{String(project.id).padStart(2, '0')}</div>
                            </div>
                            </motion.div>
                        </div>

                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-fg/20 rounded-tr-3xl" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-fg/20 rounded-bl-3xl" />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className={`relative z-10 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        {/* Project Header */}
                        <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl font-mono text-fg/30">
                            {String(project.id).padStart(2, '0')}
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-fg/30 to-transparent" />
                        </div>
                        
                        <h3 className="heading text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-xl md:text-2xl text-fg/60 font-light mb-6">
                            {project.subtitle}
                        </p>
                        </motion.div>

                        {/* Description */}
                        <motion.div 
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        >
                        <p className="text-lg leading-relaxed text-fg/80 mb-6">
                            {project.description}
                        </p>

                        {/* Impact Highlight */}
                        <div className="bg-gradient-to-r from-fg/5 to-transparent border-l-4 border-fg/30 pl-6 py-4">
                            <h5 className="text-sm font-bold text-fg/70 mb-2 uppercase tracking-wide">Key Impact</h5>
                            <p className="text-fg/80 font-medium">{project.impact}</p>
                        </div>
                        </motion.div>

                        {/* Technologies */}
                        <motion.div 
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        >
                        <h5 className="text-sm font-bold text-fg/70 mb-4 uppercase tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 bg-fg/40 rounded-full" />
                            Technology Stack
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                            {project.technologies.map((tech, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-fg/5 border border-fg/10 hover:bg-fg/10 hover:border-fg/20 transition-all duration-300"
                                whileHover={{ scale: 1.02, x: 5 }}
                            >
                                <div className="w-2 h-2 bg-fg/50 rounded-full" />
                                <span className="text-sm font-medium text-fg/80">{tech}</span>
                            </motion.div>
                            ))}
                        </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div 
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink 
                            to="/contact" 
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-fg text-bg font-semibold text-lg hover:bg-fg/90 hover:shadow-xl hover:shadow-fg/20 transition-all duration-300 min-w-[200px]"
                            >
                            Discuss Project
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            </NavLink>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink 
                                to={project.caseStudyLink}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-fg/20 text-fg hover:border-fg/40 hover:bg-fg/10 transition-all duration-300 font-semibold text-lg min-w-[160px]">
                            Case Study
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            </NavLink>
                        </motion.div>
                        </motion.div>
                    </div>
                    </div>

                    {/* Project Separator */}
                    {index < featuredProjects.length - 1 && (
                    <motion.div 
                        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="w-3 h-3 bg-fg/20 rounded-full animate-pulse" />
                    </motion.div>
                    )}
                </motion.div>
                ))}
            </div>
            </Container>
        </section>
    );
}

export default FeaturedProjects;
