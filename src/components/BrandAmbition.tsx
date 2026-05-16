import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const carouselImages = [
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260513225635859.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260513225635797.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260513225635836.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260513225635819.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260513225635880.jpg"
];

export default function BrandAmbition() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 1500); // 1.5 seconds per image
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="ambition" className="w-full relative z-20 bg-[#070707] text-white pt-24 md:pt-[15vh] pb-4">
      <div className="w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
        {/* Left: Typography (aligned with Navbar CHENYI) */}
        <div className="flex flex-col justify-start">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight text-[28px] sm:text-[36px] md:text-[40px] leading-[1.3] text-left break-keep"
          >
            “做一个「有野心」<br />「有温度」的设计师”
          </motion.h2>
        </div>

        {/* Right: Top text & Carousel */}
        <div className="flex flex-col justify-start w-full relative">
          {/* ( 2026 ) parallel to heading */}
          <div className="hidden md:flex font-mono text-[10px] md:text-[12px] uppercase tracking-widest opacity-80 mb-8 mt-4 md:mt-0 justify-start md:justify-end">
            <span>( 2026 )</span>
          </div>
          
          <div className="flex md:hidden font-mono text-[10px] uppercase tracking-widest opacity-80 mb-6">
            <span>( 2026 )</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[330px] aspect-[3/4] relative overflow-hidden rounded-sm mx-auto md:ml-0 md:mt-24"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={currentIndex}
                src={carouselImages[currentIndex]}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
