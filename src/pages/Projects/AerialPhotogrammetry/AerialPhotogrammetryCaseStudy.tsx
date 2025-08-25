import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Container from "../../../components/Container";
import { useRef, useState } from "react";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { Video, MapPin, Layers3, BarChart3 } from "lucide-react";

export default function AerialPhotogrammetryCaseStudy() {

  useScrollTop();

  const tiltTickingRef = useRef(false);
  const [, setIsImageLoaded] = useState(false);

  // Camera/Drone icon for aerial photogrammetry
  const CameraIcon = ({ className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      className={`w-7 h-8 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    if (tiltTickingRef.current) return;
    tiltTickingRef.current = true;

    requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      tiltTickingRef.current = false;
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <main className="bg-bg text-fg min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-30 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-fg/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-fg/[0.03] rounded-full blur-3xl" />
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Back Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <NavLink
                to="/projects"
                className="inline-flex items-center gap-3 text-fg/60 hover:text-fg transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-fg/20 flex items-center justify-center group-hover:border-fg/40 transition-colors">
                  <span className="text-sm">←</span>
                </div>
                <span className="text-sm font-medium">Back to Projects</span>
              </NavLink>
            </motion.div>

            {/* Header Content */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-fg/40" />
                  <span className="text-sm tracking-[0.3em] uppercase text-fg/60 font-medium">
                    Case Study
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
              >
                Aerial
                <span className="block text-fg/70">Photogrammetry</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-fg/70 leading-relaxed mb-8 max-w-4xl"
              >
                Harness drone footage captured from multiple angles and geo-referenced markers to 
                generate highly accurate 3D spatial data of real-world sites giving developers and project managers reliable 
                geospatial intelligence for planning, design, and day to day project management.
              </motion.p>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {["Drone Mapping", "Geo-Referenced 3D", "Digital Twins", "Spatial Data Extraction"].map(
                  (tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="px-4 py-2 text-sm rounded-full bg-fg/10 text-fg/80 border border-fg/15 hover:bg-fg/15 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  )
                )}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href="/projects/AerialPhotogrammetryDemo/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-fg text-bg
                            font-semibold shadow-xl hover:bg-fg/90 hover:shadow-2xl
                            transition-all duration-300"
                >
                  <span>View Sample Case</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Large Image Showcase */}
            <div
              className="group relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 shadow-2xl"
              style={{ transition: 'transform 0.3s ease' }}
              
            >
              {/* Interactive spotlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)"
                }}
              />

              {/* Image Content */}
              <div className="absolute inset-0">
                <img
                  src="/images/projects/AerialPhotogrammetry/1.png" // Replace with your actual image path
                  alt="Aerial Photogrammetry Sample"
                  className="w-full h-full object-cover"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
              
              {/* Gradient overlays for better text contrast */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </Container>
      </section>

      <div className="divider" />

      {/* Challenge & Solution */}
      <section id="challenge" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative rounded-3xl border border-fg/10 bg-bg p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-fg/10 border border-fg/20 flex items-center justify-center mb-6">
                    <span className="text-xl">!</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6">The Challenge</h3>
                  <div className="space-y-4 text-fg/80 leading-relaxed">
                    <p>
                      Traditional spatial data collection can be slow, labor intensive, and 
                      costly. Often yielding incomplete or outdated site information. 
                      Teams need rapid, precise geospatial context they can trust for 
                      decisions across planning, design, and construction.
                    </p>
                    <div className="pt-4 border-t border-fg/10">
                      <h4 className="font-semibold mb-2 text-fg">Key Pain Points</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                            High time and labor requirements
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                            Gaps in site accuracy and coverage
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Delays that impact planning and oversight
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative rounded-3xl border border-fg/10 bg-bg p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-fg/10 border border-fg/20 flex items-center justify-center mb-6">
                    <span className="text-xl">✓</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold mb-6">Our Solution</h3>
                  <div className="space-y-4 text-fg/80 leading-relaxed">
                    <p>
                      We turn readily collected drone footage into a highly accurate, geo-referenced 3D model of the site. 
                      By pairing imagery with precise GPS markers and advanced image processing, 
                      the workflow dramatically reduces the effort required to obtain reliable spatial data for critical decisions.
                    </p>
                    <div className="pt-4 border-t border-fg/10">
                      <h4 className="font-semibold mb-2 text-fg">Key Features</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Multi-angle drone capture with precise GPS markers
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Geo-referenced 3D spatial data and site models
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Faster, more efficient data collection versus manual surveys
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      
      {/* How it works       */}
      <section id="solution" className="py-16 md:py-24 bg-black text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">How It Works</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              We process client-provided drone footage into geo-referenced, accurate 3D spatial data.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content (now styled like your Deliverables tiles) */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: "transform 0.3s ease" }}
              >
                <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 shadow-md overflow-hidden backdrop-blur-sm">
                  {/* Spotlight effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)",
                    }}
                  />

                  <div className="relative z-10 space-y-6">
                    {[
                      {
                        step: "01",
                        title: "Footage Input",
                        desc: "Clients provide drone footage captured from multiple angles around the site.",
                        icon: Video,
                      },
                      {
                        step: "02",
                        title: "Geo-Referencing",
                        desc: "Reference markers with GPS coordinates anchor and validate spatial accuracy.",
                        icon: MapPin,
                      },
                      {
                        step: "03",
                        title: "Data Extraction",
                        desc: "Photogrammetry workflows convert footage into orthomosaics, 3D models, and elevation datasets.",
                        icon: Layers3,
                      },
                      {
                        step: "04",
                        title: "Outputs",
                        desc: "Deliverables are reliable spatial datasets that support planning, design, and project oversight.",
                        icon: BarChart3,
                      },
                    ].map(({ step, title, desc, icon: Icon }, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="p-4 md:p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/5"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon box (black/white style) */}
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              {/* Step number pill */}
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80 tracking-wide">
                                {step}
                              </span>
                              <h4 className="font-semibold text-white">{title}</h4>
                            </div>
                            <p className="text-sm text-white/70 mt-2">{desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-md h-full overflow-hidden backdrop-blur-sm">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <span className="text-lg text-white">◈</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-6 text-white">Deliverables</h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/5">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                        <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                        3D Spatial Models
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Highly accurate 3D reconstructions of real-world sites generated from client-provided drone footage.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/5">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                        <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                        Detailed Spatial Data
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Extracted, geo-referenced datasets that improve accuracy and efficiency in project planning and management.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/5">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                        <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                          Site Assessment Outputs
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Reliable information to support progress tracking, design reviews, and overall project oversight.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>


      {/*  Applications */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-fg/[0.02] to-transparent">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-fg/40" />
                  <span className="text-sm tracking-[0.3em] uppercase text-fg/60 font-medium">
                    Applications
                  </span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                Construction &
                <span className="block text-fg/70">Infrastructure Solutions</span>
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◎</span>
                    Construction Progress Tracking
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    Use accurate 3D spatial models generated from 
                    client-provided drone footage to document site 
                    changes over time, compare against plans, and identify potential delays early.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◈</span>
                    Site Assessment & Condition Documentation
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    Transform footage anchored by geo-referenced markers 
                    into reliable spatial data to capture current site conditions, 
                    supporting inspections, audits, and evidence-based decisions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◉</span>
                    Planning & Design Review
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    Leverage high-accuracy 3D site models to validate assumptions, 
                    check fit against real-world context, and reduce rework before and during execution.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Data Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative"
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative aspect-square rounded-3xl border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 overflow-hidden shadow-xl">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)"
                  }}
                />

                {/* Data Visualization */}
                <div className="absolute inset-0 p-8">
                  {/* Construction site representation */}
                  <div className="absolute inset-4 rounded-2xl border-2 border-dashed border-fg/30 bg-fg/5">
                    {/* Site structures */}
                    <div className="absolute top-4 left-4 w-8 h-6 bg-fg/20 rounded-sm"></div>
                    <div className="absolute top-4 right-6 w-6 h-8 bg-fg/20 rounded-sm"></div>
                    <div className="absolute bottom-6 left-6 w-10 h-4 bg-fg/20 rounded-sm"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-6 bg-fg/20 rounded-sm"></div>
                  </div>

                  {/* Drone flight path */}
                  <motion.div
                    className="absolute w-6 h-6 rounded-full bg-fg/60 border-2 border-fg/80 flex items-center justify-center"
                    animate={{
                      x: [50, 200, 200, 50, 50],
                      y: [50, 50, 150, 150, 50]
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <CameraIcon className="w-3 h-3 text-white" />
                  </motion.div>

                  {/* Survey grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    {/* Vertical grid lines */}
                    {Array.from({length: 5}).map((_, i) => (
                      <motion.line
                        key={`v-${i}`}
                        x1={`${20 + i * 15}%`}
                        y1="20%"
                        x2={`${20 + i * 15}%`}
                        y2="80%"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: i * 0.2 }}
                      />
                    ))}
                    {/* Horizontal grid lines */}
                    {Array.from({length: 4}).map((_, i) => (
                      <motion.line
                        key={`h-${i}`}
                        x1="20%"
                        y1={`${30 + i * 15}%`}
                        x2="80%"
                        y2={`${30 + i * 15}%`}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: i * 0.2 + 1 }}
                      />
                    ))}
                  </svg>

                  {/* Data points appearing */}
                  {[
                    { x: 25, y: 35, delay: 2 },
                    { x: 45, y: 45, delay: 2.5 },
                    { x: 65, y: 40, delay: 3 },
                    { x: 35, y: 60, delay: 3.5 },
                    { x: 55, y: 65, delay: 4 },
                    { x: 75, y: 55, delay: 4.5 }
                  ].map((point, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-fg/60 rounded-full"
                      style={{ 
                        left: `${point.x}%`, 
                        top: `${point.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: point.delay, duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="group relative rounded-3xl bg-black text-white p-12 md:p-20 shadow-2xl overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              {/* Interactive spotlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)"
                }}
              />

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]" />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-white/20 flex items-center justify-center"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl text-white/70">◈</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center"
                animate={{ rotate: [360, 0], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-xl text-white/70">◉</span>
              </motion.div>

              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
                  Ready to Transform
                  <span className="block text-white/80">Your Vision?</span>
                </h3>
                
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Let's scope your project together and find the fastest path to value. Whether it's 3D
                  visualization, AI automation, or custom solutions, we're here to bring your ideas to life.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <NavLink
                      to="/contact"
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 hover:shadow-xl transition-all duration-300"
                    >
                      Discuss This Project
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </NavLink>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <NavLink
                      to="/projects"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
                    >
                      View More Projects
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4 4m4-4l-4-4" />
                      </svg>
                    </NavLink>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}