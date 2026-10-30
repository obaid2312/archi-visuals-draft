import React, { useState } from 'react';
import { Phone, Mail, Check, Copy, ArrowUpRight, Send, Clock, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    propertyType: 'Luxury Residential Estate',
    location: '',
    message: '',
  });

  const phoneNumber = "+64 21 892 4110";
  const emailAddress = "hello@archivisuals.co.nz";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ef4444', '#ffffff', '#b91c1c'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ef4444', '#ffffff', '#22c55e'],
    });
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        propertyType: 'Luxury Residential Estate',
        location: '',
        message: '',
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black py-28 md:py-36 px-6 md:px-12 border-t border-neutral-900"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
            <Sparkles size={13} className="text-red-500" />
            <span>LET'S TALK PRODUCTIONS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            Elevate Your Next Listing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            Ready to give your architectural masterpiece the cinema treatment it deserves? 
            Reach out directly or book an on-site production consult.
          </p>

          {/* Two Primary Action Buttons as requested */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Button 1: Displays Phone Number with Click-to-Call & Copy action */}
            <div className="relative group">
              <a
                href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base sm:text-lg border border-neutral-700 hover:border-red-500/70 transition-all duration-300 shadow-xl hover:scale-105"
              >
                <div className="w-9 h-9 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <span className="font-mono tracking-wider">{phoneNumber}</span>
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCopyPhone();
                }}
                className="absolute -top-3 -right-2 px-2.5 py-1 rounded-full bg-neutral-800 text-[10px] font-mono border border-white/20 text-neutral-300 hover:text-white flex items-center gap-1 shadow-lg backdrop-blur-md"
                title="Copy phone number"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Button 2: Email Us Button */}
            <a
              href={`mailto:${emailAddress}?subject=Real Estate Video Production Inquiry - Archi Visuals`}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-base sm:text-lg transition-all duration-300 shadow-[0_0_35px_rgba(239,68,68,0.45)] hover:shadow-[0_0_50px_rgba(239,68,68,0.7)] hover:scale-105 group"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Mail size={18} />
              </div>
              <span className="tracking-wide">Email Us</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Direct Fast Inquiry Form & Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16 bg-neutral-950/70 border border-neutral-900 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          {/* Left Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Production Headquarters
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                Serving New Zealand nationwide and internationally for bespoke luxury architectural and resort developments.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 text-sm text-neutral-300">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-red-500 flex-shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Auckland & Queenstown Studios</p>
                    <p className="text-neutral-400 text-xs">Auckland CBD & Frankton, Queenstown</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-sm text-neutral-300">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-red-500 flex-shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Turnaround Speed</p>
                    <p className="text-neutral-400 text-xs">Standard delivery 48-72 hours with priority rush available</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-sm text-neutral-300">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-red-500 flex-shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{emailAddress}</p>
                    <p className="text-neutral-400 text-xs">Responses within 2 business hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-900">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Camera Arsenal
              </span>
              <p className="text-xs text-neutral-400">
                RED V-Raptor 8K • Sony FX6 • DJI Inspire 3 Cinema RAW • Custom FPV Pro Drones
              </p>
            </div>
          </div>

          {/* Right Direct Form */}
          <div className="lg:col-span-7">
            {formSubmitted ? (
              <div className="h-full min-h-[320px] rounded-2xl bg-neutral-900/50 border border-emerald-500/30 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Check size={28} />
                </div>
                <h4 className="font-display text-2xl font-bold text-white mb-2">
                  Inquiry Received
                </h4>
                <p className="text-sm text-neutral-400 max-w-md">
                  Thank you! Our executive producer will review your property details and contact you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="liam@luxuryrealty.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Property Category
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white focus:outline-none focus:border-red-500 transition-colors text-sm"
                    >
                      <option>Luxury Residential Estate</option>
                      <option>Waterfront / Penthouse</option>
                      <option>Architectural Development</option>
                      <option>Commercial / Resort</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Property Location / Address
                    </label>
                    <input
                      type="text"
                      placeholder="Wanaka / Auckland / Queenstown"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Production Scope & Timeline
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the property features, desired shoot dates, and deliverables (drone, twilight film, vertical reels)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 group"
                >
                  <span>Submit Production Brief</span>
                  <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

