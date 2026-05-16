import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from 'motion/react';

function NextProjectTransition({ nextProject, onNext, containerRef }: { key?: React.Key; nextProject: any, onNext?: () => void, containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef as any,
    offset: ["start end", "end end"]
  });

  // Phase 1: Expand (0.1 -> 0.45)
  const width = useTransform(scrollYProgress, [0.1, 0.45], ["30%", "100%"]);
  const height = useTransform(scrollYProgress, [0.1, 0.45], ["40%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.45], ["24px", "0px"]);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.45], [1.5, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.45], [1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.45], [1, 1.1]);

  // Phase 2: Hold (0.45 -> 0.65)
  // Phase 3: Slide up hero cover (0.65 -> 0.99)
  const slideUpY = useTransform(scrollYProgress, [0.65, 0.99], ["100vh", "0vh"]);
  const shadowOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 0.8]);

  useEffect(() => {
    let triggered = false;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.99 && !triggered) {
        triggered = true;
        if (onNext) {
          onNext();
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, onNext]);

  return (
    <div ref={ref} className="h-[400vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        
        {/* Stage 1: The expanding center box & text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            style={{ opacity: textOpacity, scale: textScale }} 
            className="absolute z-20 flex flex-col items-center justify-center text-white pointer-events-none"
          >
            <p className="text-sm font-bold tracking-widest uppercase opacity-40 mb-6">Next Project</p>
            <h2 className="text-4xl md:text-8xl lg:text-9xl font-medium tracking-tight text-center px-4">
              {nextProject.detail?.title ? nextProject.detail.title : nextProject.name.split(' ')[0]}
            </h2>
          </motion.div>

          <motion.div 
            style={{ width, height, borderRadius }}
            className="relative overflow-hidden flex items-center justify-center z-10 bg-[#111] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <motion.img 
              style={{ scale: imgScale }}
              src={nextProject.detail?.heroImg || nextProject.bgImg} 
              className="w-full h-full object-cover" 
              alt={nextProject.name}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
        </div>

        {/* Stage 3: The slide-up cover of the new project */}
        <motion.div
           style={{ opacity: shadowOpacity }}
           className="absolute inset-0 bg-black/80 z-20 pointer-events-none"
        />

        <motion.div 
          style={{ y: slideUpY }}
          className="absolute inset-0 z-30 w-full h-screen overflow-hidden bg-black px-8 md:px-12 lg:px-20"
        >
          {nextProject.detail?.heroImg && (
            <div className="absolute inset-0 z-0 origin-top">
              <img 
                src={nextProject.detail.heroImg} 
                className="w-full h-full object-cover"
                alt={nextProject.name}
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div 
            className={`w-full max-w-7xl mx-auto px-6 md:px-8 z-10 h-full flex pt-32 pb-24 relative ${!nextProject.detail?.heroImg ? 'items-center justify-center text-center' : 'items-center justify-start'}`}
          >
            <div className={`flex flex-col gap-10 w-full ${nextProject.detail?.heroImg ? 'md:w-[45%]' : ''}`}>
              <div className="flex flex-col gap-2 md:gap-4">
                <h1 className={`text-[32px] md:text-[42px] leading-[1.1] font-medium tracking-tight text-white drop-shadow-lg opacity-100 translate-y-0`}>
                  {nextProject.detail ? nextProject.detail.title : nextProject.name.split(' ')[0]}
                </h1>
                {nextProject.detail?.subtitle && (
                  <p className={`text-[24px] md:text-[32px] leading-[1.1] font-medium tracking-tight text-white/80 mt-1 md:mt-2 opacity-100 translate-y-0`}>
                    {nextProject.detail.subtitle}
                  </p>
                )}
                {!nextProject.detail?.subtitle && (
                  <p className="text-xl md:text-2xl font-light text-white drop-shadow-xl mt-2 opacity-100 translate-y-0">
                    {nextProject.name.split(' ').slice(1).join(' ')}
                  </p>
                )}
              </div>
              
              {nextProject.detail?.infos ? (
                <div className="flex flex-col gap-8 w-full mt-4">
                  {nextProject.detail.infos.map((info: any, i: number) => (
                    <div key={i} className="flex flex-col gap-2 opacity-100 translate-y-0">
                      <span className="text-base md:text-[17px] text-white drop-shadow-xl">{info.label}</span>
                      <span className="text-base md:text-[17px] text-white font-light leading-relaxed drop-shadow-xl max-w-sm">{info.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-base md:text-lg font-light tracking-wide mt-2 text-white drop-shadow-xl opacity-100 translate-y-0">
                  {nextProject.desc}
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

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
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
        
        {/* Next project text */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }} 
          className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <p className="text-sm font-bold tracking-widest uppercase opacity-40 mb-6">End of Projects</p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-center px-4">
            Back to Works
          </h2>
        </motion.div>

        {/* Slide up black block to match works cover */}
        <motion.div 
          style={{ y: slideUpY }}
          className="absolute inset-0 z-30 w-full h-screen overflow-hidden bg-black border-t border-white/10"
        />
      </div>
    </div>
  );
}

function AnimatedImage({ 
  imgSrc, 
  idx, 
  setActiveIndex, 
  containerRef 
}: { 
  key?: React.Key;
  imgSrc: string; 
  idx: number; 
  setActiveIndex: (idx: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(ref, { root: containerRef as any, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(idx);
    }
  }, [isInView, idx, setActiveIndex]);

  return (
    <motion.div 
      id={`section-img-${idx}`}
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, root: containerRef as any, margin: "-5%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full relative overflow-hidden"
    >
      <img 
        src={imgSrc} 
        alt={`Content image ${idx + 1}`} 
        className="w-full h-auto object-cover" 
        referrerPolicy="no-referrer" 
      />
    </motion.div>
  );
}

interface ProjectDetailProps {
  project: {
    id: number;
    name: string;
    desc: string;
    bg?: string;
    bgImg?: string;
    detail?: {
      heroImg?: string;
      title: string;
      subtitle: string;
      infos: { label: string; value: string }[];
      contentImgs?: string[];
    };
  };
  onClose: () => void;
  nextProject?: any;
  onNext?: () => void;
}

export default function ProjectDetail({ project, onClose, nextProject, onNext }: ProjectDetailProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);

  // Reset scroll and state when project changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    setActiveIndex(-1);
    setIsScrolled(false);
  }, [project.id]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsScrolled(latest > 0.05);
  });

  const scrollToImage = (idx: number) => {
    const el = document.getElementById(`section-img-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#070707] text-white flex flex-col"
    >
      {/* Left Progress Bar indicator */}
      <div className="fixed left-0 top-0 bottom-0 w-[2px] bg-white/10 z-[60] hidden md:block">
        <motion.div 
          className="w-full bg-white origin-top"
          style={{ height: "100%", scaleY: scrollYProgress }}
        />
      </div>

      {/* Right Mini Map Navigation */}
      {project.detail?.contentImgs && project.detail.contentImgs.length > 0 && (
        <div 
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col gap-2 max-h-[80vh] overflow-y-auto pointer-events-auto items-end pr-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {project.detail.contentImgs.map((imgSrc, idx) => (
            <div 
              key={idx}
              onClick={() => scrollToImage(idx)}
              className={`w-20 h-12 relative cursor-pointer overflow-hidden border transition-all duration-300 flex-shrink-0 ${
                activeIndex === idx ? 'border-white opacity-100 scale-[1.1] shadow-[0_0_15px_rgba(255,255,255,0.1)] mr-1' : 'border-transparent opacity-40 hover:opacity-100'
              }`}
            >
              <img 
                src={imgSrc} 
                alt={`Thumb ${idx + 1}`} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      )}

      {/* Detail Header */}
      <header className={`absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none ${!project.detail?.heroImg ? '!text-white' : ''}`}>
        <button 
          onClick={onClose}
          className={`group grid grid-cols-1 grid-rows-1 overflow-hidden cursor-pointer pointer-events-auto ${project.detail?.heroImg ? 'mix-blend-difference' : ''}`}
        >
          <span className={`col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full opacity-100 group-hover:opacity-0 text-[18px] md:text-[20px] font-medium flex items-center py-2 pr-4 text-white`}>
            - 后退
          </span>
          <span className={`col-start-1 row-start-1 text-[14px] md:text-[16px] font-mono tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center py-2 pr-4 text-white/80`}>
            - BACK
          </span>
        </button>
        <div className={`pointer-events-auto relative flex items-center justify-end h-8 min-w-[120px] ${project.detail?.heroImg ? 'mix-blend-difference' : ''}`}>
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] absolute right-0 font-bold text-[18px] md:text-[20px] tracking-wide text-[#F29600] ${isScrolled ? '-translate-y-4 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
            EavanChen
          </div>
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] absolute right-0 font-mono text-[14px] md:text-[14px] tracking-widest uppercase ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none whitespace-nowrap'} text-white/50`}>
            {project.name}
          </div>
        </div>
      </header>

      {/* Scrollable Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto w-full h-full relative"
      >
        {/* Detail Hero */}
        <div className="h-auto md:h-screen w-full flex flex-col justify-start md:justify-center relative overflow-hidden md:px-12 lg:px-20">
          {project.detail?.heroImg && (
            <motion.div 
              style={{ y: heroY }}
              className="w-full aspect-video md:absolute md:inset-0 md:aspect-auto md:z-0 origin-top bg-white/5"
            >
              <img 
                src={project.detail.heroImg} 
                className="w-full h-full object-cover"
                alt={project.name}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}

          <motion.div 
            style={{ y: heroY }}
            className={`w-full max-w-7xl mx-auto px-6 md:px-8 z-10 md:h-full flex pt-12 md:pt-32 pb-16 md:pb-24 ${!project.detail?.heroImg ? 'items-center justify-center text-center' : 'items-start md:items-center justify-start'}`}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
            }}
          >
            <div className={`flex flex-col gap-10 w-full ${project.detail?.heroImg ? 'md:w-[45%]' : ''}`}>
              <div className="flex flex-col gap-2 md:gap-4">
                <motion.h1 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                  className="text-[32px] md:text-[42px] leading-[1.1] font-medium tracking-tight text-white drop-shadow-lg"
                >
                  {project.detail ? project.detail.title : project.name.split(' ')[0]}
                </motion.h1>
                {project.detail?.subtitle && (
                  <motion.p 
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                    className="text-[24px] md:text-[32px] leading-[1.1] font-medium tracking-tight text-white drop-shadow-lg mt-1 md:mt-2"
                  >
                    {project.detail.subtitle}
                  </motion.p>
                )}
                {!project.detail?.subtitle && (
                  <motion.p 
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                    className="text-xl md:text-2xl font-light text-white drop-shadow-xl mt-2"
                  >
                    {project.name.split(' ').slice(1).join(' ')}
                  </motion.p>
                )}
              </div>
              
              {project.detail?.infos ? (
                <div className="flex flex-col gap-8 w-full mt-4">
                  {project.detail.infos.map((info, i) => (
                    <motion.div 
                      key={i} 
                      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-base md:text-[17px] text-white drop-shadow-xl">{info.label}</span>
                      <span className="text-base md:text-[17px] text-white font-light leading-relaxed drop-shadow-xl max-w-sm">{info.value}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
                  className="text-base md:text-lg font-light tracking-wide mt-2 text-white drop-shadow-xl"
                >
                  {project.desc}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content Blocks (Gray Rectangles as requested) */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pb-32 pt-16 flex flex-col gap-8 md:gap-16">
          {project.detail?.contentImgs ? (
            project.detail.contentImgs.map((imgSrc, idx) => (
              <AnimatedImage key={idx} imgSrc={imgSrc} idx={idx} setActiveIndex={setActiveIndex} containerRef={containerRef} />
            ))
          ) : (
            <>
              <div className="w-full aspect-[16/9] bg-white/5 rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">Image Placeholder 1</div>
              </div>

              <div className="w-full aspect-[16/9] bg-white/5 rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">Image Placeholder 2</div>
              </div>

              <div className="w-full aspect-[16/9] bg-white/5 rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">Image Placeholder 3</div>
              </div>
              
              <div className="w-full aspect-[21/9] bg-white/5 rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">Image Placeholder 4</div>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        {nextProject ? (
          <NextProjectTransition key={`next-${nextProject.id}`} nextProject={nextProject} onNext={onNext} containerRef={containerRef} />
        ) : (
          <div className="mt-24">
            <ReturnToCoverTransition key="return-cover" onReturn={onClose} containerRef={containerRef} />
          </div>
        )}

      </div>
    </motion.div>
  );
}
