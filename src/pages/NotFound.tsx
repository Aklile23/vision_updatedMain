
import Container from "../components/Container";
import { NavLink } from "react-router-dom";
import { useScrollTop } from "../hooks/useScrollTop";

export default function NotFound() {

  useScrollTop();
  
  return (
    <main className="bg-bg text-fg">
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <h1 className="heading text-5xl">404</h1>
            <p className="mt-3 text-fg/70">The page you’re looking for doesn’t exist.</p>
            <NavLink to="/" className="mt-6 inline-block rounded-full border border-fg px-5 py-3 text-sm hover:bg-fg hover:text-bg">
              Back to Home
            </NavLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
