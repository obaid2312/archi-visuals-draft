import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Film, Eye, Sparkles, Compass } from 'lucide-react';

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  // Interpolates between light dark (#3f3f46) and red (#ef4444)
  const color = useTransform(progress, range, ['#3f3f46', '#ef4444']);
  const opacity = useTransform(progress, range, [0.5, 1]);

  return (
    <motion.span
      style={{ color, opacity }}
      className="inline-block mr-[0.28em] mb-1 transition-colors duration-100 font-semibold"
    >
      {children}
    </motion.span>
  );
};

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.9'],
  });

  const paragraphText =
    "More than just capturing spaces, we are Archi Visuals. We are a specialized architectural and luxury real estate video production studio.";

  const words = paragraphText.split(' ');
  const totalWords = words.length;
  const startProgress = 0.05;
  const endProgress = 0.65;
  const span = endProgress - startProgress;

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-black text-white py-28 md:py-40 px-6 md:px-12 flex flex-col items-center justify-center border-t border-white/5"
    >
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-10">
          <Sparkles size={13} className="text-red-500" />
          <span>ABOUT ARCHI VISUALS</span>
        </div>

        {/* Scroll-Driven Scrub Text */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-center leading-[1.25] tracking-tight max-w-4xl">
          {words.map((word, i) => {
            const start = startProgress + (i / totalWords) * span;
            const end = Math.min(1, start + (1 / totalWords) * span * 2.0);
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </div>

        {/* Architectural Pillars / Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {[
            {
              icon: Film,
              title: "Cinematic 4K/6K",
              desc: "Color-graded RED & Sony FX cinema camera workflows.",
            },
            {
              icon: Compass,
              title: "FPV Aerials",
              desc: "Custom indoor and outdoor licensed drone flights.",
            },
            {
              icon: Eye,
              title: "Architectural Focus",
              desc: "Highlighting texture, proportions, and lighting design.",
            },
            {
              icon: Sparkles,
              title: "Rapid Turnaround",
              desc: "48-72hr delivery for fast-moving property marketing.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-900 hover:border-red-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 mb-4">
                  <Icon size={20} />
                </div>
                <h2 className="text-base font-bold font-display text-white mb-1.5">
                  {item.title}
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

