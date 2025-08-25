import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.addEventListener("pageshow", (e: PageTransitionEvent) => {
  if ((e as any).persisted) {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
