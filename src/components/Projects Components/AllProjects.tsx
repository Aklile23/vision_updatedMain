import React from "react";
import { useState } from "react";
import Container from "../Container";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion"

const AllProjects = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [, setHoveredProject] = useState<number | null>(null);

    const projects = [
        {
          id: 1,
          title: "Immersive Customizer",
          subtitle: "Standalone and Web based VR Solution",
          description: "Development of an interactive solution for real estate marketing and communication between buyers and developers. This tool enables buyers to view and edit the interior finishes of their future homes interactively, enhancing decision-making and satisfaction. The solution has also been successfully applied in warehouse customization projects.",
          tags: ["3D Visualization", "Real Estate", "Interactive"],
          category: "Immersive 3D",
          featured: true,
          technologies: ["WebGL", "React", "Three.js", "UI/UX"],
          impact: "Enhanced buyer satisfaction & reduced decision time",
          visual: "customizer",
          image: "/images/projects/ImmersiveCustomizer/1.png",
          status: "Done", 
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
          image: "/images/projects/AerialPhotogrammetry/1.png",
          status: "Done",
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
          image: "/images/projects/InteractiveVisuals/4.png",
          status: "Soon",
          caseStudyLink: "" 
        },
        {
          id: 4,
          title: "Virtual Assistant",
          subtitle: "Localized AI Intelligence",
          description: "Development of an interactive virtual assistant trained to provide accurate, localized information, catering to specific user needs and enhancing accessibility.",
          tags: ["AI", "NLP", "Assistant"],
          category: "AI Solutions",
          featured: true,
          technologies: ["Machine Learning", "NLP", "Voice Recognition"],
          impact: "Improved accessibility & user experience",
          visual: "ai-assistant",
          image: "/images/projects/VirtualAssistant/2.png",
          status: "Soon",
          caseStudyLink: "" 
        },
        {
          id: 5,
          title: "AR Scavenger Hunt Gadget",
          subtitle: "Location-Based AR Experiences",
          description: "An innovative AR-based scavenger hunting solution that enhances entertainment and engagement through interactive digital experiences.",
          tags: ["AR", "Mobile", "Gaming"],
          category: "Augmented Reality",
          featured: false,
          technologies: ["ARCore", "GPS", "Mobile Development"],
          impact: "Enhanced engagement through gamification",
          visual: "ar-hunt",
          image: "/images/projects/ComingSoon/ComingSoon.png",
          status: "Soon",
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
          image: "/images/projects/ComingSoon/ComingSoon.png",
          status: "Soon",
          caseStudyLink: ""  
        }
      ];
    
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

    const projectCardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: easeOut
          }
        }
    };

    const categories = ["All", "Immersive 3D", "Data Capture", "Augmented Reality", "AI Solutions"];
    const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="all-projects" className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading text-4xl md:text-5xl mb-6">All Projects</h2>
            <p className="text-lg text-fg/70 max-w-3xl mx-auto mb-12">
              Browse our complete portfolio by category to see the breadth of our capabilities.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-fg text-bg shadow-lg'
                      : 'bg-fg/10 text-fg hover:bg-fg/20 border border-fg/15'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                variants={projectCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                layout
                className="group relative overflow-hidden rounded-3xl border border-fg/10 bg-bg hover:border-fg/25 transition-all duration-500 
                          shadow-[0_8px_20px_rgba(0,0,0,0.1)]
                          hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.3s ease' }}
              >
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
                  }}
                />

                {/* Project Image/Visual */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-fg/5 to-fg/10 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-fg/45 border border-fg/20 font-medium text-white">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Number */}
                  <div className="absolute top-4 right-4">
                    <span className="text-2xl font-mono text-fg/40">
                      {String(project.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="relative p-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-fg/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-fg/60 mb-3">{project.subtitle}</p>
                    <p className="text-sm text-fg/70 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    {project.status === "Done" ? (
                      <>
                        <NavLink 
                          to="/contact" 
                          className="flex-1 text-center px-4 py-2 rounded-full bg-fg/10 text-fg hover:bg-fg hover:text-bg transition-all duration-300 text-sm font-medium"
                        >
                          Discuss
                        </NavLink>

                        <NavLink
                          to={project.caseStudyLink}
                          className="px-4 py-2 rounded-full border border-fg/20 text-fg hover:border-fg/40 hover:bg-fg/5 transition-all duration-300 text-sm"
                        >
                          Details
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink 
                          to="/contact" 
                          className="flex-1 text-center px-4 py-2 rounded-full bg-fg/10 text-fg hover:bg-fg hover:text-bg transition-all duration-300 text-sm font-medium"
                        >
                          Discuss
                        </NavLink>

                        <button 
                          disabled 
                          className="px-4 py-2 rounded-full border border-fg/20 text-fg/40 cursor-not-allowed text-sm"
                        >
                          Details
                        </button>
                      </>
                    )}
                  </div>

                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>
  );
}

export default AllProjects;
