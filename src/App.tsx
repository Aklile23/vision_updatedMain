import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
// import ScrollManager from "./components/ScrollManager";

import ImmersiveCustomizerCaseStudy from "./pages/Projects/ImmersiveCustomizer/ImmersiveCustomizerCaseStudy";

export default function App() {
  return (
    <BrowserRouter>
      {/* <ScrollManager /> */}
      <Routes>
        <Route element={<Layout />}>
          {/* Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          {/* Projects */}
          <Route path="/projects/IC-CaseStudy" element={<ImmersiveCustomizerCaseStudy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
