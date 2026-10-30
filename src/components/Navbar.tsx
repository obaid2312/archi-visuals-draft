import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', index: '01' },
    { label: 'Work', href: '#work', index: '02' },
    { label: 'Contact', href: '#contact', index: '03' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Left Brand Logo (Fixed) */}
      <header className="fixed top-6 left-6 md:top-8 md:left-10 z-50 pointer-events-auto">
        <a 
          href="#" 
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          aria-label="Archi Visuals Home"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden bg-black/80 border border-white/20 shadow-2xl flex items-center justify-center p-1.5 backdrop-blur-md">
            <img 
              src="/assets/logo.jpg" 
              alt="Archi Visuals Logo" 
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
          <span className="font-display text-sm md:text-base font-bold tracking-widest uppercase text-white/90 drop-shadow-md hidden sm:inline-block">
            Archi Visuals
          </span>
        </a>
      </header>

      {/* Fixed Top Right Menu Button Throughout Entire Webpage */}
      <nav 
        aria-label="Main Navigation"
        className="fixed top-6 right-6 md:top-8 md:right-10 z-50 pointer-events-auto"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 shadow-2xl backdrop-blur-xl border ${
            isOpen
              ? 'bg-red-600 text-white border-red-500 scale-105'
              : scrolled
              ? 'bg-neutral-900/90 text-white border-white/20 hover:border-red-500/60 hover:bg-neutral-800'
              : 'bg-black/60 text-white border-white/20 hover:border-white/50 hover:bg-black/80'
          }`}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="text-xs font-semibold tracking-widest uppercase font-mono">
            {isOpen ? 'CLOSE' : 'MENU'}
          </span>
          <div className="w-5 h-5 flex items-center justify-center">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </div>
        </button>

        {/* 3 Option Menu Dropdown / Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-14 right-0 w-64 md:w-72 bg-neutral-950/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl p-4 overflow-hidden"
            >
              <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 px-3 py-1 mb-2 border-b border-white/10 flex justify-between items-center">
                <span>Navigation</span>
                <span className="text-red-500 font-bold">3 Options</span>
              </div>

              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-neutral-200 hover:text-white hover:bg-neutral-900/90 hover:border-l-4 hover:border-red-500 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-neutral-500 group-hover:text-red-400 transition-colors">
                        {item.index}
                      </span>
                      <span className="font-display text-base font-semibold tracking-wide">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight 
                      size={16} 
                      className="text-neutral-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
                    />
                  </button>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 px-3 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="text-neutral-400">Archi Visuals</span>
                <span className="text-red-400/90 font-mono">Real Estate Film</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

