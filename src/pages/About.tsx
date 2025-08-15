import Container from "../components/Container";

export default function About() {
  return (
    <main className="bg-bg text-fg">
      {/* Intro */}
      <section className="border-b border-fg/10">
        <Container>
          <div className="py-14">
            <h1 className="heading text-3xl md:text-4xl">About VisionLab</h1>
            <p className="mt-3 max-w-2xl text-fg/70">
              Based in Addis Ababa and serving globally, VisionLab blends creative 3D craft, practical engineering, and applied AI.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Story */}
      <section className="py-14">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-6">
              <h2 className="heading text-2xl">Mission</h2>
              <p className="mt-3 text-fg/70">
                Elevate digital dimensions — delivering immersive visuals and intelligent systems that solve real problems.
              </p>

              <h2 className="heading mt-10 text-2xl">Why VisionLab</h2>
              <ul className="mt-3 space-y-2 text-sm text-fg/80">
                <li>• Craft — attention to detail in models, visuals, interactions</li>
                <li>• Precision — data-driven workflows, reliable delivery</li>
                <li>• Partnership — we co-design around real constraints</li>
              </ul>
            </div>
            <div className="md:col-span-5 lg:col-span-6">
              <div className="aspect-[16/10] rounded-2xl border border-fg/10 bg-muted-2" />
              <p className="mt-3 text-xs text-fg/60">Add team/footprint visuals here.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Optional: Team / Footprint */}
      <section className="border-t border-fg/10 bg-muted-1/40 py-14">
        <Container>
          <h2 className="heading text-2xl">Team Highlights</h2>
          <p className="mt-3 max-w-2xl text-fg/70">Small, focused, multi-disciplinary team with a global partner network.</p>
          {/* Add team cards later */}
        </Container>
      </section>
    </main>
  );
}
