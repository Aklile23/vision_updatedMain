
import Container from "../components/Container";
import { NavLink } from "react-router-dom";

const PROJECTS = [
  { title: "Immersive Customizer", desc: "Interactive finishes for real estate & warehouses.", tags: ["Immersive 3D"] },
  { title: "Aerial Photogrammetry", desc: "Drone-to-3D for construction & heritage.", tags: ["Photogrammetry"] },
  { title: "Interactive Visuals", desc: "Motion replication with real-time viewer movement.", tags: ["Immersive 3D"] },
  { title: "AR Scavenger Hunt Gadget", desc: "Location-aware gamified experiences.", tags: ["AR"] },
  { title: "Virtual Assistant", desc: "Localized, accurate, interactive knowledge.", tags: ["AI"] },
  { title: "Process Automation", desc: "Workflow automation for efficiency.", tags: ["AI"] },
];

export default function Projects() {
  return (
    <main className="bg-bg text-fg">
      <section className="border-b border-fg/10">
        <Container>
          <div className="py-14">
            <h1 className="heading text-3xl md:text-4xl">Projects</h1>
            <p className="mt-3 max-w-2xl text-fg/70">
              A selection of work across immersive 3D, intelligent systems, and custom AI.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <article key={p.title} className="overflow-hidden rounded-2xl border border-fg/10">
                <div className="aspect-[16/10] bg-muted-2" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-fg/70">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-fg/70">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-fg/10 px-2 py-1">{t}</span>
                    ))}
                  </div>
                  {/* Later: link to detail page */}
                  {/* <NavLink to={`/projects/${slug}`} className="mt-4 inline-block text-sm underline">View case study</NavLink> */}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="rounded-2xl border border-fg/10 p-8 text-center">
            <h3 className="heading text-xl">Have a project in mind?</h3>
            <p className="mt-2 text-fg/70">Let’s scope it together and find the fastest path to value.</p>
            <NavLink to="/contact" className="mt-5 inline-block rounded-full bg-fg px-5 py-3 text-sm text-bg hover:opacity-90">
              Start a conversation
            </NavLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
