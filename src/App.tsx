import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Work } from './components/Work';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MediaModal } from './components/MediaModal';

export const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      {/* Fixed Navigation Menu throughout the whole webpage */}
      <Navbar />

      {/* Main Flow */}
      <main>
        {/* 1. Hero Section with Video Background & Fade-In Text */}
        <Hero />

        {/* 2. About Section with Scroll-Driven Text Color Change (Dark -> Red) */}
        <About />

        {/* 3. Stats Section with Animated Number Increase */}
        <Stats />

        {/* 4. Work Section with Draggable Carousel, Angled Cards & Custom Cursor */}
        <Work onSelectProperty={(prop) => setSelectedProperty(prop)} />

        {/* 5. Testimonial Section with Scrubber Track & Depth Blur Focus */}
        <Testimonials />

        {/* 6. Contact Us Section with Dual Buttons */}
        <Contact />
      </main>

      {/* 7. Footer Section with Name, Tagline & Social Logos */}
      <Footer />

      {/* Interactive Lightbox / Property Media Modal */}
      <MediaModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
};

export default App;

