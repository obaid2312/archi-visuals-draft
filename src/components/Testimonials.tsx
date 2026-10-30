import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  stats: string;
}

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start centered
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "DANIEL CARTER",
      role: "Principal Broker",
      company: "Christie's International Real Estate",
      avatar: "/assets/avatars/user4.jpg",
      quote:
        "The video Archi Visuals produced for our $9.2M waterfront listing generated three overseas offers within 72 hours. Their cinematic lighting, subtle pacing, and music selection set a completely new standard for luxury marketing in our market.",
      stats: "$9.2M Listing Sold in 7 Days",
    },
    {
      id: 2,
      name: "EMMA WILSON",
      role: "Luxury Property Advisor",
      company: "Ray White Elite Prestige",
      avatar: "/assets/avatars/user3.jpg",
      quote:
        "Every video feels like a feature film. The attention to architectural details, natural transitions from twilight to interior lighting, and the breathtaking FPV drone flights make buyers fall in love before even setting foot on the property.",
      stats: "320% Increase in Inquiries",
    },
    {
      id: 3,
      name: "OLIVIA BENNETT",
      role: "Managing Director",
      company: "Bennett & Co. Luxury Real Estate",
      avatar: "/assets/avatars/user1.jpg",
      quote:
        "Stunning composition, natural colors, and unforgettable moments. Archi Visuals brings spaces to life with emotion and precision. They deliver both 4K cinematic landscape films and high-converting vertical reels within 48 hours without fail.",
      stats: "Record Suburb Price Set",
    },
    {
      id: 4,
      name: "MICHAEL ANDERSON",
      role: "Lead Architect",
      company: "Anderson Studio Architecture",
      avatar: "/assets/avatars/user2.jpg",
      quote:
        "As architects, we are notoriously particular about how our buildings are portrayed. Archi Visuals understands spatial geometry, cantilevers, and light flow better than any videographer I've ever collaborated with in 15 years.",
      stats: "Design Excellence Award Winner",
    },
    {
      id: 5,
      name: "SOPHIA VANCE",
      role: "Director of Marketing",
      company: "Sotheby's International Realty",
      avatar: "/assets/avatars/user5.jpg",
      quote:
        "Archi Visuals is our secret weapon for multi-million dollar listings. Their visual narrative creates immediate emotional connection and perceived value. Our vendors are consistently stunned by the final films.",
      stats: "Over $140M Marketed with Archi",
    },
  ];

  // Total ticks for the audio-style scrubber bar
  const totalTicks = 84;
  const progressRatio = currentIndex / (testimonials.length - 1);
  const activeTickIndex = Math.round(progressRatio * (totalTicks - 1));

  // Auto advance every 5.5s unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleTickClick = (index: number) => {
    const targetTestimonial = Math.round((index / (totalTicks - 1)) * (testimonials.length - 1));
    setCurrentIndex(targetTestimonial);
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#0a0a0c] py-28 md:py-36 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-neutral-900"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-400 block mb-2 font-semibold">
            TESTIMONIALS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Trusted By Top Realtors & Architects
          </h2>
        </div>

        {/* Audio Scrubber Ticks Track (Exact inspiration recreation) */}
        <div className="w-full max-w-3xl my-8 px-4 flex flex-col items-center">
          <div 
            className="w-full h-10 flex items-center justify-between cursor-pointer group py-2"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const targetIdx = Math.round(ratio * (testimonials.length - 1));
              setCurrentIndex(targetIdx);
            }}
          >
            {Array.from({ length: totalTicks }).map((_, i) => {
              const isActive = Math.abs(i - activeTickIndex) <= 1;
              const isCenter = i === activeTickIndex;
              const isNear = Math.abs(i - activeTickIndex) <= 3;

              return (
                <div
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTickClick(i);
                  }}
                  className={`transition-all duration-200 rounded-full ${
                    isCenter
                      ? 'w-[3px] h-8 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]'
                      : isActive
                      ? 'w-[2px] h-6 bg-red-400/80'
                      : isNear
                      ? 'w-[1.5px] h-4 bg-neutral-500'
                      : 'w-[1.5px] h-2.5 bg-neutral-800 hover:bg-neutral-600'
                  }`}
                />
              );
            })}
          </div>
          <div className="flex justify-between w-full text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">
            <span>01 // PROVEN TRACK RECORD</span>
            <span className="text-red-400 font-bold">CLIENT {currentIndex + 1} OF {testimonials.length}</span>
            <span>TOP PRODUCER VERIFIED</span>
          </div>
        </div>

        {/* Testimonials Carousel with Center Focus & Adjacent Depth Blur */}
        <div className="relative w-full max-w-6xl mt-4 min-h-[380px] flex items-center justify-center overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-center">
            {[-1, 0, 1].map((offset) => {
              const itemIndex =
                (currentIndex + offset + testimonials.length) % testimonials.length;
              const item = testimonials[itemIndex];
              const isCurrent = offset === 0;

              return (
                <motion.div
                  key={`${item.id}-${offset}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isCurrent ? 1 : 0.45,
                    scale: isCurrent ? 1 : 0.92,
                    filter: isCurrent ? 'blur(0px)' : 'blur(3px)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onClick={() => {
                    if (!isCurrent) {
                      setCurrentIndex(itemIndex);
                    }
                  }}
                  className={`p-7 sm:p-8 rounded-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-neutral-900/95 border-2 border-red-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-20 scale-100 ring-1 ring-red-500/30'
                      : 'bg-neutral-950/60 border border-neutral-800/60 hover:opacity-75 z-10 hidden md:flex'
                  }`}
                  style={{ minHeight: '340px' }}
                >
                  <div>
                    {/* Header: Avatar, Name, Role */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shadow-lg"
                        />
                        {isCurrent && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px]">
                            ★
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold tracking-wide text-white uppercase">
                          {item.name}
                        </h3>
                        <p className="text-xs text-red-400 font-mono tracking-tight">
                          {item.role}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-red-400/90 font-semibold">
                      {item.stats}
                    </span>
                    <div className="flex gap-1 text-red-500">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} size={13} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="p-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-red-500/50 transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === dotIdx
                    ? 'w-8 bg-red-500'
                    : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="p-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-red-500/50 transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

