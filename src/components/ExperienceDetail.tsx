import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

function ReturnToCoverTransition({ onReturn, containerRef }: { key?: React.Key; onReturn?: () => void, containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef as any,
    offset: ["start end", "end end"]
  });

  const slideUpY = useTransform(scrollYProgress, [0.4, 0.99], ["100vh", "0vh"]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.5], [1, 1.1]);

  useEffect(() => {
    let triggered = false;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.99 && !triggered) {
        triggered = true;
        if (onReturn) {
          onReturn();
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, onReturn]);

  return (
    <div ref={ref} className="h-[200vh] w-full relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#070707]">
        
        {/* Next experience text */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }} 
          className="absolute z-20 flex flex-col items-center justify-center text-white pointer-events-none"
        >
          <p className="text-sm font-bold tracking-widest uppercase opacity-40 mb-6">End of Experiences</p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-center px-4">
            Back to Cover
          </h2>
        </motion.div>

        {/* Slide up block to match cover */}
        <motion.div 
          style={{ y: slideUpY }}
          className="absolute inset-0 z-30 w-full h-screen overflow-hidden bg-[#070707] border-t border-white/10"
        />
      </div>
    </div>
  );
}

interface ExperienceDetailProps {
  exp: any;
  nextExp?: any;
  allExperiences?: any[];
  currentIndex?: number;
  onSelectExp?: (exp: any) => void;
  onNext?: () => void;
  onClose: () => void;
}

export default function ExperienceDetail({ exp, allExperiences = [], currentIndex = 0, onClose }: ExperienceDetailProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Scroll to selected experience when opened
  useEffect(() => {
    if (currentIndex >= 0) {
      setTimeout(() => {
        const el = document.getElementById(`exp-${currentIndex}`);
        if (el && containerRef.current) {
          const topPosition = el.offsetTop;
          containerRef.current.scrollTo({ top: topPosition });
        }
      }, 50); // slight delay to allow rendering
    }
  }, [currentIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#070707] text-white flex flex-col"
    >
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none">
        <button 
          onClick={onClose}
          className="group grid grid-cols-1 grid-rows-1 overflow-hidden cursor-pointer pointer-events-auto"
        >
          <span className="col-start-1 row-start-1 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full opacity-100 group-hover:opacity-0 text-[18px] md:text-[20px] font-medium flex items-center py-2 pr-4">
            - 后 退
          </span>
          <span className="col-start-1 row-start-1 text-white/50 text-[14px] md:text-[16px] font-mono tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center py-2 pr-4">
            - BACK
          </span>
        </button>
        <div className="font-mono uppercase text-[14px] tracking-wide text-white opacity-80 pointer-events-auto">
          工作经历
        </div>
      </header>

      {/* Left Progress Bar indicator */}
      <div className="fixed left-0 top-0 bottom-0 w-[2px] bg-white/10 z-[60] hidden md:block">
        <motion.div 
          className="w-full bg-white origin-top"
          style={{ height: "100%", scaleY: scrollYProgress }}
        />
      </div>

      {/* Right Thumbnail Minimap */}
      <div className="fixed right-8 xl:right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col z-50 h-[60vh] w-24 opacity-40 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-full flex-1 flex flex-col gap-6 opacity-50 pt-4 pb-4 overflow-hidden">
          {allExperiences.map((e, idx) => (
            <div key={idx} className="flex flex-col gap-1.5 shrink-0">
              <div className="h-1 w-1/4 bg-white/60 mb-2 rounded-sm" />
              <div className="h-1.5 w-3/4 bg-white/80 mb-1 rounded-sm" />
              <div className="h-1 w-2/4 bg-white/80 mb-4 rounded-sm" />

              {e.background && (
                <div className="mb-2">
                  <div className="h-[2px] w-[90%] bg-white/30 mb-0.5 rounded-sm" />
                  <div className="h-[2px] w-[80%] bg-white/30 rounded-sm" />
                </div>
              )}
              {e.responsibilities?.length > 0 && (
                <div className="mb-2 flex gap-1 items-start">
                  <div className="h-[2px] w-[2px] bg-white/40 mt-0.5 rounded-sm shrink-0" />
                  <div className="flex-1">
                    <div className="h-[2px] w-full bg-white/30 mb-0.5 rounded-sm" />
                    <div className="h-[2px] w-[85%] bg-white/30 rounded-sm" />
                  </div>
                </div>
              )}
              {e.achievements?.length > 0 && (
                <div className="mb-2 flex gap-1 items-start">
                  <div className="h-[2px] w-[2px] bg-white/40 mt-0.5 rounded-sm shrink-0" />
                  <div className="flex-1">
                    <div className="h-[2px] w-full bg-white/30 mb-0.5 rounded-sm" />
                    <div className="h-[2px] w-[90%] bg-white/30 rounded-sm" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Viewport Highlight Box */}
        <motion.div 
          className="absolute left-[-8px] right-[-8px] border border-white/60 bg-white/5 pointer-events-none rounded-md z-10 box-border"
          style={{
            top: useTransform(scrollYProgress, [0, 1], ["0%", "85%"]),
            height: "15%" // Approximation of viewport
          }}
        />
      </div>

      {/* Scrollable Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto w-full h-full relative scroll-smooth"
      >
        <div className="w-full relative px-6 md:px-12 lg:px-32 xl:px-48 flex flex-col">
          {allExperiences.map((currentExp, index) => (
            <div 
              key={index} 
              id={`exp-${index}`}
              className={index > 0 ? "pt-32" : ""}
            >
              <div className="max-w-4xl mx-auto pt-48 pb-16 md:pb-32 border-b border-white/10 text-left">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.1 }}
                  className="text-white/50 font-mono tracking-widest uppercase text-base md:text-xl mb-6 relative z-10"
                >
                  {currentExp.date}
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8 leading-[1.1]"
                >
                  {currentExp.company}
                </motion.h1>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80"
                >
                  {currentExp.role}
                </motion.h2>
              </div>

              <div className="max-w-4xl mx-auto py-16 md:py-24 flex flex-col gap-24 min-h-[50vh] text-left">
                
                {/* Background / Info */}
                {currentExp.background && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ delay: 0.1 }}
                    className="w-full"
                  >
                    <h3 className="text-sm font-mono tracking-widest uppercase text-white/50 mb-10 flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-white/20"></span>
                      行业背景
                    </h3>
                    <p className="text-lg md:text-2xl font-light leading-relaxed text-white/90">
                      {currentExp.background}
                    </p>
                  </motion.div>
                )}

                {/* Content List Block */}
                <div className="w-full flex flex-col gap-24">
                  
                  {/* Responsibilities */}
                  {currentExp.responsibilities && currentExp.responsibilities.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-sm font-mono tracking-widest uppercase text-white/50 mb-10 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-white/20"></span>
                        职责范围
                      </h3>
                      <div className="flex flex-col gap-8">
                        {currentExp.responsibilities.map((res: string, i: number) => (
                          <div key={i} className="flex gap-6 group">
                            <span className="text-white/30 font-mono mt-1 text-sm">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                            <p className="text-xl md:text-2xl font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                              {res}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Achievements */}
                  {currentExp.achievements && currentExp.achievements.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-sm font-mono tracking-widest uppercase text-white/50 mb-10 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-white/20"></span>
                        工作成果
                      </h3>
                      <div className="flex flex-col gap-8">
                        {currentExp.achievements.map((ach: string, i: number) => (
                          <div key={i} className="flex gap-6 group">
                            <span className="text-white/30 font-mono mt-1 text-sm">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                            <p className="text-xl md:text-2xl font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                              {ach}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Return To Cover */}
        <div className="mt-24">
          <ReturnToCoverTransition key="return-cover" onReturn={onClose} containerRef={containerRef} />
        </div>

      </div>
    </motion.div>
  );
}
