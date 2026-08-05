import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppButton';
import Home from './pages/Home';
import Services from './pages/Services';
import CategoryPage from './pages/CategoryPage';
import ServicePage from './pages/ServicePage';
import About from './pages/About';
import Contact from './pages/Contact';
import { metaFor } from './seo';

/** Keeps <title>/description in sync on client-side navigation.
 *  The prerendered HTML already carries the correct tags for first paint. */
function useRouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metaFor(pathname);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default function App() {
  useRouteMeta();

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-paper text-ink"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-canopy-deep focus:px-5 focus:py-2.5 focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:categorySlug" element={<CategoryPage />} />
          <Route path="/services/:categorySlug/:serviceSlug" element={<ServicePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
