import ProjectsHero from "../components/Projects Components/ProjectsHero";
import FeaturedProjects from "../components/Projects Components/FeaturedProjects";
import AllProjects from "../components/Projects Components/AllProjects";
import CTA from "../components/Projects Components/CTA";

export default function Projects() {
  return (
    <main className="bg-bg text-fg overflow-hidden">
      <ProjectsHero />
      <FeaturedProjects />
      <AllProjects />
      <CTA />
    </main>
  );
}