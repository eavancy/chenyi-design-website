import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section id="contact" ref={containerRef} className="relative w-full z-10 overflow-hidden bg-white text-black">
      {/* Background Image with Parallax & Fade Effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity, scale }}
      >
        <img 
          src="https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508202742042.jpg" 
          alt="Contact Background" 
          className="w-full h-full object-cover grayscale opacity-50"
          referrerPolicy="no-referrer"
        />
        {/* Light overlay to ensure text readability */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-white via-white/80 to-white/60" />
      </motion.div>

      <div className="py-32 md:py-48 px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24 relative z-10 w-full border-t border-black/5">
        <div className="w-full flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
            期待收到您的来信。
          </h2>
          <p className="text-black/60 text-lg md:text-xl leading-relaxed max-w-md mb-16">
            如果您想与我合作，或者只是想聊聊天，欢迎随时联系我。我们一起来做一些有温度的设计。
          </p>

          <a href="mailto:eavancy@sina.com" className="group flex flex-col items-start cursor-pointer w-max text-black">
             <span className="text-black/40 font-mono tracking-widest text-sm mb-2 uppercase">Don't be shy</span>
             <span className="text-6xl md:text-7xl group-hover:opacity-60 transition-opacity flex items-baseline gap-4 font-semibold tracking-tight">
               Say <span style={{ fontFamily: '"New York", "Times New Roman", serif' }} className="font-light italic">Hello</span>
               <svg className="w-8 h-8 md:w-10 md:h-10 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
             </span>
          </a>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-12 sm:gap-16 justify-between">
          <div className="flex flex-col gap-12 items-start">
            <div className="group flex flex-col items-start">
              <div className="text-black/40 text-sm mb-2 font-mono uppercase tracking-widest">邮箱</div>
              <a href="mailto:eavancy@sina.com" className="text-2xl md:text-3xl font-medium relative inline-block text-black">
                eavancy@sina.com
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="group flex flex-col items-start">
              <div className="text-black/40 text-sm mb-2 font-mono uppercase tracking-widest">电话</div>
              <a href="tel:18898361107" className="text-2xl md:text-3xl font-medium relative inline-block text-black">
                188-9836-1107
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          <div className="group flex flex-col items-start">
            <div className="text-black/40 text-sm mb-2 font-mono uppercase tracking-widest">微信</div>
            <div className="cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-white/50 backdrop-blur-sm w-48 h-48 flex items-center justify-center transition-transform hover:scale-105 duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] relative shadow-sm">
              <img 
                src="https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508202753527.jpg" 
                alt="WeChat QR Code" 
                className="w-full h-full object-cover mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
