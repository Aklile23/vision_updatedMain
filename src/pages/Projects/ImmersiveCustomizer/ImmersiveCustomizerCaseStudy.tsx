import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Container from "../../../components/Container";
import { useState, useRef } from "react";

export default function ImmersiveCustomizerCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const tiltTickingRef = useRef(false);

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

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      tiltTickingRef.current = false;
    });
  };

  const handleMouseLeave = (e: { currentTarget: any }) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const sections = [
    { id: "overview", label: "Overview", icon: "◆" },
    { id: "challenge", label: "Challenge", icon: "◇" },
    { id: "solution", label: "Solution", icon: "◈" },
    { id: "process", label: "Process", icon: "✧" },
    { id: "results", label: "Results", icon: "◉" }
  ];

  const outcomes = [
    { k: "Decision time", v: "↓ 35%", icon: "↓" },
    { k: "Buyer satisfaction", v: "↑ 24%", icon: "↑" },
    { k: "Revisions", v: "↓ 40%", icon: "↓" },
  ];

  const processSteps = [
    {
      title: "Discovery & Scope",
      description: "Stakeholder interviews, KPIs, content inventory, and constraints.",
      duration: "2-3 weeks",
      deliverables: ["User Research", "Technical Requirements", "Project Roadmap"]
    },
    {
      title: "Design & Prototyping", 
      description: "UX flows, UI system, rapid WebGL prototypes for material swaps and lighting.",
      duration: "4-5 weeks",
      deliverables: ["UI/UX Design", "Interactive Prototypes", "Technical Specs"]
    },
    {
      title: "Build",
      description: "React + Three.js implementation with reusable scene components.",
      duration: "8-10 weeks",
      deliverables: ["Core Application", "3D Scene Engine", "Material System"]
    },
    {
      title: "Test & Iterate",
      description: "Qualitative sessions + analytics instrumentation for usage patterns.",
      duration: "3-4 weeks",
      deliverables: ["User Testing", "Performance Optimization", "Bug Fixes"]
    },
    {
      title: "Launch & Handoff",
      description: "Deployment, docs, and enablement for sales and support teams.",
      duration: "2-3 weeks",
      deliverables: ["Production Deploy", "Documentation", "Team Training"]
    }
  ];

  return (
    <main className="bg-bg text-fg min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
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

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
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
                  Immersive
                  <span className="block text-fg/70">Customizer</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-fg/70 leading-relaxed mb-8 max-w-2xl"
                >
                  An immersive, configurable environment for real-estates to present
                  multiple design alternatives and let buyers test finishes, layouts, and materials
                  in real time improving communication, market reach, and decision confidence.
                </motion.p>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  {["Immersive 3D", "Web-Based & VR", "React", "Three.js / WebGL", "UI/UX"].map(
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
                    href="https://your-demo-link.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-fg text-bg
                              font-semibold shadow-xl hover:bg-fg/90 hover:shadow-2xl
                              transition-all duration-300"
                  >
                    <span>Try It Yourself</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* Interactive Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative"
              >
                <div
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 shadow-2xl"
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  {/* Interactive spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)"
                    }}
                  />

                  {/* Video/Image Content */}
                  <div className="absolute inset-0">
                    <video
                      src="/videos/projects/IC/Immersive_Customizer.mp4"
                      controls
                      className="w-full h-full object-cover"
                      poster="/images/projects/ImmersiveCustomizer/1.png"
                      controlsList="nodownload"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Key Outcomes */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Key Outcomes</h2>
            <p className="text-fg/70 max-w-2xl mx-auto">Measurable improvements across critical business metrics</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.k}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.3s ease' }}
              >
                <div className="relative rounded-2xl border border-fg/10 bg-bg shadow-md p-8 hover:border-fg/20 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Interactive spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.05), transparent 40%)"
                    }}
                  />

                  <div className="relative z-10 text-center">
                    <div className="text-3xl mb-3 text-fg/60">{outcome.icon}</div>
                    <div className="text-sm text-fg/60 mb-2">{outcome.k}</div>
                    <div className="text-3xl md:text-4xl font-bold">{outcome.v}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-fg/10 py-4">
        <Container>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-fg text-bg shadow-lg'
                    : 'bg-fg/10 text-fg hover:bg-fg/15 border border-fg/15'
                }`}
              >
                <span>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

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
                      Traditional plan reviews and static renders slow decisions and create gaps between
                      buyers and developers. Teams need a collaborative way to explore material
                      combinations and alternatives without long back-and-forth cycles.
                    </p>
                    <div className="pt-4 border-t border-fg/10">
                      <h4 className="font-semibold mb-2 text-fg">Key Pain Points</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Long decision cycles
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Communication barriers
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Limited visualization options
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
                      A browser-based and VR-ready customizer that embeds your concept or final 3D model
                      in an immersive scene. Clients explore, compare presets, and switch finishes and
                      layouts in real time, while cost and selection data sync behind the scenes for
                      accurate decisions.
                    </p>
                    <div className="pt-4 border-t border-fg/10">
                      <h4 className="font-semibold mb-2 text-fg">Key Features</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Real-time 3D visualization
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          VR & web accessibility
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Dynamic cost calculation
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

      {/* How It Works */}
      <section id="solution" className="py-16 md:py-24 bg-gradient-to-b from-transparent via-fg/[0.02] to-transparent">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">How It Works</h2>
            <p className="text-lg text-fg/70 max-w-3xl mx-auto">
              A comprehensive workflow from concept to deployment
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.3s ease' }}
              >
                <div className="relative rounded-3xl border border-fg/10 bg-bg p-8 md:p-12 shadow-md overflow-hidden">
                  {/* Interactive spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
                    }}
                  />

                  <div className="relative z-10">
                    <p className="text-lg text-fg/80 leading-relaxed mb-8">
                      Developers/designers provide a concept 3D model or a finished design to embed into
                      the immersive environment. Optional furniture libraries and curated finishing
                      scenarios can be attached. A materials dataset—including unit prices—enables accurate
                      cost computation and optimization during customization.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: "Model Integration", desc: "Embed concept or finished architectural models", icon: "◻" },
                        { title: "Asset Libraries", desc: "Add furniture libraries & finishing scenarios", icon: "◧" },
                        { title: "Cost Analytics", desc: "Use material datasets with unit pricing for accuracy", icon: "◨" },
                        { title: "Cloud Deployment", desc: "Deploy to cloud and integrate with existing systems", icon: "◢" },
                        { title: "Multi-Platform", desc: "Access via desktop browser or VR headset", icon: "◣" },
                        { title: "Real-time Changes", desc: "Clients make live changes to layout and materials", icon: "◤" }
                      ].map((feature, i) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-fg/5 transition-colors"
                        >
                          <span className="text-2xl text-fg/60">{feature.icon}</span>
                          <div>
                            <h4 className="font-semibold mb-1">{feature.title}</h4>
                            <p className="text-sm text-fg/70">{feature.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Access Modes */}
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
              <div className="relative rounded-3xl border border-fg/10 bg-bg p-8 shadow-md h-full overflow-hidden">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-fg/10 border border-fg/20 flex items-center justify-center mb-6">
                    <span className="text-lg">◈</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-6">Access Modes</h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl border border-fg/10 hover:border-fg/20 transition-colors">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                        Web Platform
                      </h4>
                      <p className="text-sm text-fg/70 leading-relaxed">
                        Open in a desktop browser, or through a VR headset's browser for immersion.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-fg/10 hover:border-fg/20 transition-colors">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                        Standalone VR App
                      </h4>
                      <p className="text-sm text-fg/70 leading-relaxed">
                        Install on a headset for a seamless showroom-like experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Process Timeline */}
      <section id="process" className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">Development Process</h2>
            <p className="text-lg text-fg/70 max-w-3xl mx-auto">
              Our structured approach to delivering exceptional results
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fg/20 via-fg/40 to-fg/20 md:transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    i % 2 === 1 ? 'md:text-right' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-fg rounded-full border-4 border-bg shadow-lg md:transform md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-8 md:ml-0 ${i % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                    <motion.div
                      className="group relative"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={{ transition: 'transform 0.3s ease' }}
                    >
                      <div className="relative rounded-2xl border border-fg/10 bg-bg p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Interactive spotlight */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: "radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.05), transparent 40%)"
                          }}
                        />

                        <div className="relative z-10">
                          <div className={`flex items-center gap-3 mb-4 ${i % 2 === 1 ? 'md:justify-end' : ''}`}>
                            <div className="w-8 h-8 rounded-lg bg-fg/10 border border-fg/20 flex items-center justify-center">
                              <span className="text-sm font-bold">{i + 1}</span>
                            </div>
                            <span className="text-xs px-3 py-1 rounded-full bg-fg/10 text-fg/70">{step.duration}</span>
                          </div>
                          
                          <h4 className={`text-xl font-semibold mb-3 ${i % 2 === 1 ? 'md:text-right' : ''}`}>{step.title}</h4>
                          <p className={`text-fg/70 leading-relaxed mb-4 ${i % 2 === 1 ? 'md:text-right' : ''}`}>{step.description}</p>
                          
                          <div className={i % 2 === 1 ? 'md:text-right' : ''}>
                            <h5 className="text-sm font-semibold text-fg/60 mb-2">Key Deliverables</h5>
                            <div className={`flex flex-wrap gap-2 ${i % 2 === 1 ? 'md:justify-end' : ''}`}>
                              {step.deliverables.map((deliverable, j) => (
                                <span
                                  key={j}
                                  className="text-xs px-2 py-1 rounded bg-fg/5 text-fg/70 border border-fg/10"
                                >
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Step number (desktop) */}
                  <div className={`hidden md:block ${i % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className={`flex ${i % 2 === 1 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                      <span className="text-6xl font-mono text-fg/10">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Market Impact */}
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
                    Market Impact
                  </span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                Global Reach &
                <span className="block text-fg/70">New Revenue Streams</span>
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◎</span>
                    Expanded Market Reach
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    By removing geographical barriers, the Immersive Customizer expands reach to global
                    buyers—including diaspora communities—who can collaborate virtually, personalize their
                    homes remotely, and move forward faster with clarity and confidence.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◈</span>
                    Embedded Analytics
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    As clients customize, embedded analytics reveal cost implications in context—helping
                    them balance design and budget with confidence.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◉</span>
                    Revenue Opportunities
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    Integrate upsell paths for complementary items like finishes and furniture within the
                    experience, creating a complete ecosystem for buyers and additional margin for
                    developers.
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
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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
                  {/* Central hub */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-fg/20 border-2 border-fg/40 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-2xl">◈</span>
                  </motion.div>

                  {/* Orbiting elements representing global reach */}
                  {[
                    { angle: 0, delay: 0, icon: "◎", label: "Global" },
                    { angle: 60, delay: 1, icon: "◢", label: "Mobile" },
                    { angle: 120, delay: 2, icon: "◣", label: "VR" },
                    { angle: 180, delay: 3, icon: "◉", label: "Revenue" },
                    { angle: 240, delay: 4, icon: "◧", label: "Analytics" },
                    { angle: 300, delay: 5, icon: "◨", label: "Customize" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-12 h-12 rounded-full bg-fg/10 border border-fg/30 flex items-center justify-center text-lg text-fg/70"
                      style={{ top: '50%', left: '50%', marginTop: '-24px', marginLeft: '-24px' }}
                      animate={{
                        x: Math.cos((item.angle * Math.PI) / 180) * 100,
                        y: Math.sin((item.angle * Math.PI) / 180) * 100,
                        rotate: 360
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="100"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      fill="none"
                      animate={{ strokeDashoffset: [0, -32] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>

                {/* Floating stats */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-bg/80 backdrop-blur rounded-lg p-2 border border-fg/20">
                      <div className="text-lg font-bold">15+</div>
                      <div className="text-xs text-fg/60">Countries</div>
                    </div>
                    <div className="bg-bg/80 backdrop-blur rounded-lg p-2 border border-fg/20">
                      <div className="text-lg font-bold">24/7</div>
                      <div className="text-xs text-fg/60">Access</div>
                    </div>
                    <div className="bg-bg/80 backdrop-blur rounded-lg p-2 border border-fg/20">
                      <div className="text-lg font-bold">∞</div>
                      <div className="text-xs text-fg/60">Scale</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Project Gallery</h2>
            <p className="text-lg text-fg/70">Visual highlights from the development process</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.3s ease' }}
              >
                <div className="relative aspect-[4/3] rounded-2xl border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Interactive spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)"
                    }}
                  />

                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-fg/20 border border-fg/30 flex items-center justify-center">
                        <span className="text-lg text-fg/60">◎</span>
                      </div>
                      <span className="text-sm text-fg/60 font-medium">Screenshot {i + 1}</span>
                    </div>
                  </div>

                  {/* Image overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
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
                      Start Your Project
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