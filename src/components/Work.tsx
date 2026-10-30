import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Hand, ArrowLeft, ArrowRight, Play, Maximize2, MapPin } from 'lucide-react';

interface PropertyItem {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  rotation: number;
  duration: string;
  aspect: string;
}

interface WorkProps {
  onSelectProperty?: (property: PropertyItem) => void;
}

export const Work: React.FC<WorkProps> = ({ onSelectProperty }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragConstraint, setDragConstraint] = useState(0);

  // Mouse tracking for custom DRAG cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for cursor follower
  const springX = useSpring(mouseX, { stiffness: 450, damping: 32 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32 });

  const properties: PropertyItem[] = [
    {
      id: 1,
      title: "Wanaka Alpine Sanctuary",
      location: "Wanaka, New Zealand",
      category: "Cinematic Film + Drone",
      image: "/assets/properties/prop1.jpg",
      rotation: -5,
      duration: "02:45 min",
      aspect: "4K HDR",
    },
    {
      id: 2,
      title: "The Horizon Penthouse",
      location: "Auckland Waterfront",
      category: "Architectural Walkthrough",
      image: "/assets/properties/prop2.jpg",
      rotation: 1.5,
      duration: "01:50 min",
      aspect: "6K Cinema",
    },
    {
      id: 3,
      title: "Queenstown Lumina Estate",
      location: "Queenstown Lakes",
      category: "Twilight Showcase",
      image: "/assets/properties/prop3.jpg",
      rotation: 6,
      duration: "03:10 min",
      aspect: "4K DCI",
    },
    {
      id: 4,
      title: "Matakana Vineyard Pavilion",
      location: "Matakana Coast",
      category: "Lifestyle Narrative",
      image: "/assets/properties/prop4.jpg",
      rotation: -4,
      duration: "02:15 min",
      aspect: "4K HDR",
    },
    {
      id: 5,
      title: "Hawke's Bay Coastal Manor",
      location: "Hawke's Bay",
      category: "FPV Aerial Tour",
      image: "/assets/properties/prop5.jpg",
      rotation: 4.5,
      duration: "02:30 min",
      aspect: "4K Ultra",
    },
    {
      id: 6,
      title: "Southern Alps Monolith",
      location: "Southern Alps",
      category: "Architectural Showcase",
      image: "/assets/properties/prop6.jpg",
      rotation: -6,
      duration: "02:55 min",
      aspect: "6K RAW",
    },
  ];

  // Calculate drag boundaries
  useEffect(() => {
    const updateConstraints = () => {
      if (sliderRef.current && containerRef.current) {
        const scrollWidth = sliderRef.current.scrollWidth;
        const offsetWidth = containerRef.current.offsetWidth;
        setDragConstraint(-(scrollWidth - offsetWidth + 120));
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      className="relative w-full bg-[#070708] py-28 md:py-36 overflow-hidden select-none custom-drag-area border-t border-neutral-900"
    >
      {/* Huge Faint Background Typography: "COLLECTION" / "PORTFOLIO" */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center pointer-events-none z-0"
      >
        <span className="font-condensed text-[18vw] sm:text-[17vw] font-bold text-white/[0.035] tracking-wider uppercase block select-none whitespace-nowrap">
          COLLECTION
        </span>
      </div>

      {/* Custom Following Cursor Pill: < 🖐 DRAG > */}
      {isHovered && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className={`pointer-events-none absolute z-30 hidden md:flex flex-col items-center justify-center rounded-full bg-neutral-950/90 text-white border border-white/25 shadow-2xl backdrop-blur-xl transition-transform duration-150 ${
            isDragging ? 'w-24 h-24 scale-95 border-red-500 bg-red-950/80' : 'w-20 h-20 scale-100'
          }`}
        >
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="text-[10px] font-mono">&lt;</span>
            <Hand size={18} className={isDragging ? 'text-red-400' : 'text-white'} />
            <span className="text-[10px] font-mono">&gt;</span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase font-mono mt-0.5 text-neutral-200">
            DRAG
          </span>
        </motion.div>
      )}

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>SELECTED RELEASES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Featured Properties
          </h2>
          <p className="mt-2 text-sm md:text-base text-neutral-400 max-w-lg">
            Drag horizontally to explore high-end architectural productions filmed across premier locations.
          </p>
        </div>

        {/* Drag Hint & Navigation Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
            DRAG OR SCROLL
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
                }
              }}
              aria-label="Previous property"
              className="p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
                }
              }}
              aria-label="Next property"
              className="p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Draggable Property Cards Rail */}
      <div className="relative z-10 w-full px-6 md:px-12 overflow-x-auto scrollbar-none py-8">
        <motion.div
          ref={sliderRef}
          drag="x"
          dragConstraints={{ right: 0, left: dragConstraint }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="flex gap-8 md:gap-12 cursor-grab active:cursor-grabbing w-max pr-12"
        >
          {properties.map((prop) => (
            <motion.div
              key={prop.id}
              style={{ rotate: `${prop.rotation}deg` }}
              whileHover={{ 
                scale: 1.04, 
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.35, ease: 'easeOut' }
              }}
              onClick={() => onSelectProperty && onSelectProperty(prop)}
              className="relative w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0 group rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 cursor-pointer"
            >
              {/* Property Image */}
              <div className="relative h-[380px] sm:h-[420px] md:h-[460px] w-full overflow-hidden bg-neutral-950">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-neutral-300 border border-white/10">
                    {prop.aspect}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-red-600 group-hover:border-red-500 transition-colors">
                    <Play size={14} className="ml-0.5" />
                  </div>
                </div>

                {/* Bottom Property Meta */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold block mb-1">
                    {prop.category}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-red-100 transition-colors">
                    {prop.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                    <MapPin size={13} className="text-red-500" />
                    <span>{prop.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

