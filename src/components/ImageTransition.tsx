import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ImageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // fade in as you scroll past it, reaching full opacity near the middle/end
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={containerRef} className="w-full h-[60vh] md:h-[80vh] relative z-10 overflow-hidden flex items-center justify-center pointer-events-none">
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity, scale }}
      >
        <img 
          src="https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508202742042.jpg" 
          alt="Segment" 
          className="w-full h-full object-cover"
        />
        {/* Smooth gradient fading into the white background */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-1/3 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
