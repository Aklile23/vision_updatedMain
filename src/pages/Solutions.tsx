import React from "react";
import Container from "../components/Container";
import { NavLink } from "react-router-dom";

export default function Solutions() {
  return (
    <main className="bg-bg text-fg">
      {/* Intro */}
      <section className="border-b border-fg/10">
        <Container>
          <div className="py-40">
            <h1 className="heading text-3xl md:text-4xl">Solutions</h1>
            <p className="mt-3 max-w-2xl text-fg/70">
              VisionLab blends immersive 3D, intelligent building systems, and custom AI to turn ideas into usable, high-quality products.
            </p>
            <div className="mt-5 flex gap-3 text-sm">
              <a href="#immersive-3d" className="underline">Immersive 3D</a>
              <a href="#ibs" className="underline">Intelligent Building Systems</a>
              <a href="#outsourcing" className="underline">Outsourcing & Custom</a>
            </div>
          </div>
        </Container>
      </section>

      {/* Immersive 3D */}
      <section id="immersive-3d" className="border-b border-fg/10 bg-muted-1/40">
        <Container>
          <div className="grid gap-8 py-14 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-6">
              <h2 className="heading text-2xl">Immersive 3D Solutions</h2>
              <p className="mt-3 max-w-xl text-fg/70">
                Custom 3D models, interactive content, and photogrammetry for artistic and technical outcomes.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-fg/80">
                <li>• Bespoke 3D model development (artistic & BIM-ready)</li>
                <li>• VR/AR & interactive experiences</li>
                <li>• Photogrammetry & point cloud processing</li>
              </ul>
              <NavLink to="/contact" className="mt-6 inline-block rounded-full border border-fg px-4 py-2 text-sm hover:bg-fg hover:text-bg">
                Book a demo
              </NavLink>
            </div>
            <div className="md:col-span-5 lg:col-span-6">
              <div className="aspect-[16/10] rounded-2xl border border-fg/10 bg-muted-2" />
            </div>
          </div>
        </Container>
      </section>

      {/* Intelligent Building Systems */}
      <section id="ibs" className="border-b border-fg/10">
        <Container>
          <div className="grid gap-8 py-14 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-6">
              <h2 className="heading text-2xl">Intelligent Building Systems</h2>
              <p className="mt-3 max-w-xl text-fg/70">
                BIM authoring, AI-powered automation, and facility tools for smarter projects.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-fg/80">
                <li>• BIM from scans & design data</li>
                <li>• AI workflows & predictive tools</li>
                <li>• Facility management integrations</li>
              </ul>
              <NavLink to="/contact" className="mt-6 inline-block rounded-full border border-fg px-4 py-2 text-sm hover:bg-fg hover:text-bg">
                Discuss your project
              </NavLink>
            </div>
            <div className="md:col-span-5 lg:col-span-6">
              <div className="aspect-[16/10] rounded-2xl border border-fg/10 bg-muted-2" />
            </div>
          </div>
        </Container>
      </section>

      {/* Outsourcing & Custom */}
      <section id="outsourcing" className="border-b border-fg/10 bg-muted-1/40">
        <Container>
          <div className="grid gap-8 py-14 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-6">
              <h2 className="heading text-2xl">Outsourcing & Custom Solutions</h2>
              <p className="mt-3 max-w-xl text-fg/70">
                Flexible engagement models: BIM outsourcing, dedicated teams, and bespoke AI tools.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-fg/80">
                <li>• BIM outsourcing (production to QA)</li>
                <li>• Dedicated teams for ongoing work</li>
                <li>• Custom AI development</li>
              </ul>
              <NavLink to="/contact" className="mt-6 inline-block rounded-full border border-fg px-4 py-2 text-sm hover:bg-fg hover:text-bg">
                Get a proposal
              </NavLink>
            </div>
            <div className="md:col-span-5 lg:col-span-6">
              <div className="aspect-[16/10] rounded-2xl border border-fg/10 bg-muted-2" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
