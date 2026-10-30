import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, MapPin, Calendar, Film, CheckCircle2, ArrowRight } from 'lucide-react';

interface PropertyItem {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  duration: string;
  aspect: string;
}

interface MediaModalProps {
  property: PropertyItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-neutral-800 text-white/80 hover:text-white border border-white/10 transition-colors"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>

          {/* Media Player / Image */}
          <div className="w-full md:w-3/5 bg-black relative flex items-center justify-center min-h-[300px] md:min-h-[460px] overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
              src="/assets/sample-video.mp4"
              poster={property.image}
            />
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-mono uppercase tracking-wider font-semibold">
                4K Cinema Sample
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-neutral-900/90">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold block mb-1">
                {property.category}
              </span>
              <h3 className="font-display text-2xl font-black text-white">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-2 mb-6">
                <MapPin size={13} className="text-red-500" />
                <span>{property.location}</span>
              </div>

              <div className="space-y-3 py-4 border-y border-neutral-800 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-500 font-mono">Format</span>
                  <span className="font-semibold text-white">{property.aspect} ProRes 422HQ</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-500 font-mono">Camera Package</span>
                  <span className="font-semibold text-white">Sony FX6 + DJI Inspire 3</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-500 font-mono">Color Grading</span>
                  <span className="font-semibold text-white">DaVinci Resolve Rec.709</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-500 font-mono">Audio</span>
                  <span className="font-semibold text-white">Licensed Spatial Score</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <button
                onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2"
              >
                <span>Book This Production Style</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

