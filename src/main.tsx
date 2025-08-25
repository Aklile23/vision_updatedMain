import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// DEBUG: lifecycle + bfcache
console.info("[main] scrollRestoration =", (history as any).scrollRestoration);
window.addEventListener("pageshow", (e: any) => {
  console.groupCollapsed("[main] pageshow");
  console.log("persisted:", !!e.persisted);
  console.log("scrollY:", window.scrollY);
  console.groupEnd();
});
window.addEventListener("pagehide", (e: any) => {
  console.groupCollapsed("[main] pagehide");
  console.log("persisted:", !!e.persisted);
  console.log("scrollY:", window.scrollY);
  console.groupEnd();
});
window.addEventListener("popstate", () => {
  console.info("[main] popstate: scrollY=", window.scrollY);
});
document.addEventListener("visibilitychange", () => {
  console.info("[main] visibility:", document.visibilityState, "scrollY:", window.scrollY);
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
