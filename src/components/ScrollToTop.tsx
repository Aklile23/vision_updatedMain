import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"

  useEffect(() => {
    // If navigating to an in-page anchor, let the browser handle it.
    if (hash) return;

    // Preserve scroll on back/forward (POP) so browser restores position.
    if (navType === "POP") return;

    // Otherwise, jump to the top.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, navType]);

  return null;
};

export default ScrollToTop;
