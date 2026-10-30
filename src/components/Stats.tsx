import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatItemProps {
  end: number;
  decimals?: number;
  prefix?: string;
  prefixColor?: string;
  suffix: string;
  suffixColor?: string;
  label: string;
  duration?: number;
}

const StatCounter: React.FC<StatItemProps> = ({
  end,
  decimals = 0,
  prefix = '',
  prefixColor = '#e94646',
  suffix,
  suffixColor = '#e94646',
  label,
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutQuad = (t: number) => t * (2 - t);

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      const current = easedProgress * end;
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, end, duration]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center py-6 px-4 sm:px-6">
      {/* Number Row matching attached screenshot exactly */}
      <div className="font-stats text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight text-white flex items-center justify-center leading-none">
        {prefix && (
          <span style={{ color: prefixColor }} className="mr-0.5 font-bold">
            {prefix}
          </span>
        )}
        <span className="text-white">
          {formattedCount}
        </span>
        <span style={{ color: suffixColor }} className="ml-0.5 font-bold">
          {suffix}
        </span>
      </div>

      {/* Label underneath */}
      <p className="mt-4 text-xs sm:text-sm md:text-base text-[#9ca3af] font-normal tracking-wide">
        {label}
      </p>
    </div>
  );
};

interface StatData {
  end: number;
  decimals: number;
  prefix?: string;
  prefixColor?: string;
  suffix: string;
  suffixColor?: string;
  label: string;
}

export const Stats: React.FC = () => {
  const stats: StatData[] = [
    {
      end: 5,
      suffix: '+',
      suffixColor: '#e94646',
      label: 'Years In The Game',
      decimals: 0,
    },
    {
      end: 3000,
      suffix: '+',
      suffixColor: '#e94646',
      label: 'Properties Filmed',
      decimals: 0,
    },
    {
      end: 40,
      suffix: '+',
      suffixColor: '#e94646',
      label: 'Agents Trust Us',
      decimals: 0,
    },
    {
      end: 2.8,
      prefix: '$',
      prefixColor: '#e94646',
      suffix: 'B+',
      suffixColor: '#e94646',
      label: 'Property Marketed',
      decimals: 1,
    },
  ];

  return (
    <section 
      id="stats"
      className="font-stats-section relative w-full bg-black py-20 md:py-28 px-4 sm:px-8 md:px-12 border-y border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800/80">
          {stats.map((stat, idx) => (
            <StatCounter
              key={idx}
              end={stat.end}
              decimals={stat.decimals}
              prefix={stat.prefix}
              prefixColor={stat.prefixColor}
              suffix={stat.suffix}
              suffixColor={stat.suffixColor}
              label={stat.label}
              duration={2200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
