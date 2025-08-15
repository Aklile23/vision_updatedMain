import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-fg/10 py-10 text-sm text-fg/60">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} VisionLab. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-fg">LinkedIn</a>
            <a href="#" className="hover:text-fg">Instagram</a>
            <a href="#" className="hover:text-fg">Twitter</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
