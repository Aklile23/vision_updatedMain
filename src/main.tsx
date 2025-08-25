import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Disable native scroll restoration globally
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Handle bfcache restores (iOS/Android Safari, etc.)
window.addEventListener('pageshow', (e: PageTransitionEvent) => {
  // Safari exposes `persisted` on PageTransitionEvent
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
);
