import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Linkedin, 
  Facebook, 
  ArrowUp, 
  Video,
  Mail,
  Phone
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/archivisualsnz',
      handle: '@archivisualsnz',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@archivisualsnz',
      handle: 'Archi Visuals NZ',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/archivisuals',
      handle: 'Archi Visuals',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/archivisuals',
      handle: 'Archi Visuals NZ',
    },
    {
      name: 'Vimeo',
      icon: Video,
      url: 'https://vimeo.com/archivisuals',
      handle: 'archivisuals',
    },
  ];

  return (
    <footer className="relative w-full bg-[#050506] text-white pt-20 pb-12 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          {/* Brand & Tagline Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 p-2 shadow-xl flex items-center justify-center">
                  <img
                    src="/assets/logo.jpg"
                    alt="Archi Visuals Logo"
                    className="w-full h-full object-contain filter brightness-110"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-black uppercase tracking-wider text-white">
                    Archi Visuals
                  </h2>
                  <span className="text-[11px] font-mono tracking-widest text-red-500 uppercase block">
                    Real Estate Video Production
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-display text-xl sm:text-2xl font-light text-neutral-300 tracking-tight leading-snug max-w-md">
                Into Every Frame, Architectural Elegance.
              </p>
              <p className="mt-2 text-sm text-neutral-400 font-light max-w-md">
                Witness premier real estate developments through the lens of Archi Visuals.
              </p>
            </div>

            {/* Social Media Logos Section */}
            <div className="mt-8">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3 font-semibold">
                Connect With Us
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-red-600 text-neutral-400 hover:text-white border border-neutral-800 hover:border-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                      aria-label={social.name}
                      title={`${social.name} (${social.handle})`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white mb-5 font-mono">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400 font-normal">
              <li>
                <a
                  href="#about"
                  className="hover:text-red-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  About Studio
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="hover:text-red-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Featured Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#stats"
                  className="hover:text-red-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Track Record & Stats
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-red-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Client Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-red-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Contact & Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white mb-5 font-mono">
              Direct Contact
            </h3>
            <div className="space-y-4 text-sm text-neutral-300">
              <a 
                href="mailto:hello@archivisuals.co.nz"
                className="flex items-center gap-3 text-neutral-300 hover:text-red-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-red-400 group-hover:bg-neutral-800 transition-colors">
                  <Mail size={15} />
                </div>
                <span>hello@archivisuals.co.nz</span>
              </a>

              <a 
                href="tel:+64218924110"
                className="flex items-center gap-3 text-neutral-300 hover:text-red-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-red-400 group-hover:bg-neutral-800 transition-colors">
                  <Phone size={15} />
                </div>
                <span className="font-mono">+64 21 892 4110</span>
              </a>

              <div className="pt-4 text-xs text-neutral-400 leading-relaxed">
                Available for luxury residential, high-rise commercial, architectural portfolios, and developer presale campaigns.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 Archi Visuals. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors flex items-center gap-1.5 ml-2"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

