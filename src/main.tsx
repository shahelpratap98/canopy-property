import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages ship with markup already in #root, so hydrate those.
if (container.innerHTML.trim().length > 0) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
