import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, Play, Sparkles } from 'lucide-react';

import { FlareBackground } from './FlareBackground';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // <section
    //   id="hero"
    //   className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black"
    // >
    //   {/* Background Video */}
    //   <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    //     <video
    //       ref={videoRef}
    //       autoPlay
    //       loop
    //       muted
    //       playsInline
    //       onLoadedData={() => setVideoLoaded(true)}
    //       className={`w-full h-full object-cover scale-105 transition-opacity duration-1000 ${videoLoaded ? 'opacity-85' : 'opacity-0'
    //         }`}
    //       src="/assets/hero-bg.mp4"
    //     />
    //     {/* Cinematic dark gradients to blend seamlessly and ensure pristine legibility */}
    //     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
    //     <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none" />
    //     {/* Bottom fade into black for the About section */}
    //     <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    //   </div>

    //   {/* Hero Content */}
    //   <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
    //     {/* Subtle pill badge */}


    //     {/* Headline: Archi Visuals in White, Appearing with a Fade */}
    //     <motion.h1
    //       initial={{ opacity: 0, scale: 0.94 }}
    //       animate={{ opacity: 1, scale: 1 }}
    //       transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
    //       className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
    //     >
    //       Archi Visuals
    //     </motion.h1>

    //     {/* Sub-headline */}
    //     <motion.p
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 1.0, delay: 0.8 }}
    //       className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300 font-light tracking-wide leading-relaxed"
    //     >
    //       We capture multi-million dollar properties with high-definition cinematography,
    //       immersive drone flights, and architectural storytelling that sells.
    //     </motion.p>

    //     {/* Hero Actions */}
    //     <motion.div
    //       initial={{ opacity: 0, y: 24 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.8, delay: 1.1 }}
    //       className="mt-9 flex flex-wrap items-center justify-center gap-4"
    //     >
    //       <button
    //         onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
    //         className="px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.45)] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] hover:scale-105"
    //       >
    //         Explore Portfolio
    //       </button>
    //       <button
    //         onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
    //         className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
    //       >
    //         Book A Shoot
    //       </button>
    //     </motion.div>
    //   </div>

    //   {/* Sound / Mute Toggle Button at Bottom Left */}


    //   {/* Scroll Down Hint */}
    //   <motion.button
    //     onClick={scrollToAbout}
    //     animate={{ y: [0, 8, 0] }}
    //     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    //     className="absolute bottom-8 z-20 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
    //     aria-label="Scroll down to About section"
    //   >
    //     <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Scroll</span>
    //     <ChevronDown size={18} className="text-red-500" />
    //   </motion.button>
    // </section>

    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Live WebGL Flare Background + Cinematic Overlays */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <FlareBackground
          initialMode={0}
          className="w-full h-full object-cover opacity-90"
        />
        {/* Cinematic dark gradients to blend seamlessly and ensure pristine legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none" />
        {/* Bottom fade into black for the About section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono tracking-widest uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Cinematic Real Estate Production</span>
        </motion.div>

        {/* Headline: Archi Visuals in White, Appearing with a Fade */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        >
          Archi Visuals
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300 font-light tracking-wide leading-relaxed"
        >
          We capture multi-million dollar properties with high-definition cinematography,
          immersive drone flights, and architectural storytelling that sells.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.45)] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] hover:scale-105"
          >
            Explore Portfolio
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            Book A Shoot
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 z-20 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down to About section"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Scroll</span>
        <ChevronDown size={18} className="text-red-500" />
      </motion.button>
    </section>
  );
};

