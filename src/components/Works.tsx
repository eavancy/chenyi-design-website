import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'motion/react';
import ProjectDetail from './ProjectDetail';

const projects = [
  { 
    id: 1, 
    name: "灵泉珠宝 Lingquan Jewellery", 
    desc: "品牌全案设计 / 视觉系统", 
    bg: "#1E2220", 
    bgImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235163.jpg",
    detail: {
      heroImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657363.jpg",
      title: "灵泉Jewellery",
      subtitle: "Brand Design",
      infos: [
        { label: "Project Scope", value: "Completed independently" },
        { label: "Project Period", value: "Jul 2024 – Jan 2025" }
      ],
      contentImgs: [
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235163.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657339.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657353.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657363.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657375.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657389.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657401.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657416.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657427.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657439.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657453.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220657466.jpg"
      ]
    }
  },
  { 
    id: 2, 
    name: "玉言珠宝 Yuyan Jewellery", 
    desc: "品牌全案设计 / 视觉系统", 
    bg: "#2A2725", 
    bgImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260510161043986.jpg",
    detail: {
      heroImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235224.jpg",
      title: "玉言JEWELLERY",
      subtitle: "Brand Design",
      infos: [
        { label: "Project Scope", value: "Completed independently" },
        { label: "Project Period", value: "Dec 2024 – Mar 2025" }
      ],
      contentImgs: [
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220904859.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220904875.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220904888.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220904900.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920451.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920480.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920493.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920506.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920523.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920535.jpg",
      ]
    }
  },
  { 
    id: 3, 
    name: "灵泉小程序 Lingquan Applet", 
    desc: "视觉设计 / 用户体验",  
    bg: "#22272A", 
    bgImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235180.jpg",
    detail: {
      heroImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235180.jpg",
      title: "灵泉小程序",
      subtitle: "Visual Design",
      infos: [
        { label: "Project Scope", value: "Completed independently" },
        { label: "Project Period", value: "Jan 2025 – May 2025" }
      ],
      contentImgs: [
       "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260510001056504.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920559.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920569.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920582.jpg",
      ]
    }
  },
  { 
    id: 4, 
    name: "泉疗愈SPA Quan-Heal SPA", 
    desc: "品牌全案设计 / 视觉系统", 
    bg: "#23292F", 
    bgImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260510161542753.jpg",
    detail: {
      heroImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235191.jpg",
      title: "泉疗愈SPA",
      subtitle: "Brand Design",
      infos: [
        { label: "Project Scope", value: "Completed independently" },
        { label: "Project Period", value: "Aug 2024 – Nov 2024" }
      ],
      contentImgs: [
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920606.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920621.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920631.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920642.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920654.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920665.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920678.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920690.jpg"
      ]
    }
  },
  { 
    id: 5, 
    name: "泉愈博览会 Quan-Heal Expo", 
    desc: "空间视觉 / 场馆规划",    
    bg: "#2B2427", 
    bgImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508212518731.jpg",
    detail: {
      heroImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508212518731.jpg",
      title: "泉疗愈博览会",
      subtitle: "Visual Design",
      infos: [
        { label: "Project Scope", value: "Completed as a team" },
        { label: "Project Period", value: "Aug 2025 – Nov 2025" }
      ],
      contentImgs: [
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235208.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920854.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920867.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920878.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920888.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920901.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920914.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920925.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920939.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920951.jpg"
      ]
    }
  },
  { 
    id: 6, 
    name: "厨房故事西餐厅 Kitchen Story", 
    desc: "品牌调性升级 / 商业策略推广", 
    bg: "#292A26", 
    bgImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508212802409.jpeg",
    detail: {
      heroImg: "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508212802409.jpeg",
      title: "厨房故事西餐厅",
      subtitle: "Visual Design",
      infos: [
        { label: "Project Scope", value: "Completed independently" },
        { label: "Project Period", value: "Jul 2022 – Oct 2023" }
      ],
      contentImgs: [
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260508204235140.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920713.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920724.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920737.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920747.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920760.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920772.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920784.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920796.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920806.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920819.jpg",
        "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260509220920830.jpg"
      ]
    }
  },
];

const Noise = () => (
  <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.35] mix-blend-overlay">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if ((window as any).isAutoScrolling) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Only enforce strict snapping when the user is deep inside the Works section
      // This prevents snapping interference with the rest of the page
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        document.documentElement.style.scrollSnapType = 'y mandatory';
      } else {
        document.documentElement.style.scrollSnapType = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollSnapType = '';
    };
  }, []);

  // Update active index based on scroll position
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let index = Math.floor(latest * projects.length);
    if (index < 0) {
      index = 0;
    }
    if (index >= projects.length) {
      index = projects.length - 1;
    }
    if (index !== activeIndex) {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    }
  });

  const handleScrollTo = (index: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
      const targetLatest = (index + 0.1) / projects.length;
      const targetScrollY = containerTop + targetLatest * scrollDistance;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  return (
    <section id="works" className="relative w-full bg-black text-white" ref={containerRef}>
      {/* 
        Scrollable track height:
        6 projects = 600vh. This allows 1 viewport height of scroll per project.
      */}
      {/* Mobile Layout: 6 Stacked Projects with Horizontal Covers */}
      <div className="md:hidden flex flex-col w-full px-6 py-24 gap-16 relative z-10 bg-[#070707]">
        <div className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest opacity-80 flex items-center gap-3 mb-4">
          <span className="w-2 h-2 bg-[#3B82F6]"></span>
          ( SELECTED WORKS )
        </div>
        {projects.map((project, idx) => (
          <div key={project.id} className="w-full flex flex-col cursor-pointer group" onClick={() => setSelectedProject(project)}>
            <div className="w-full aspect-video overflow-hidden relative bg-white/5 rounded-lg">
              {project.bgImg && (
                <img 
                  src={project.bgImg} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="pt-6 flex flex-col items-start gap-2">
              <div className="w-full h-[1px] bg-white/20 mb-2"></div>
              <div className="flex w-full items-baseline justify-between mb-1">
                <span className="font-mono text-xs tracking-widest uppercase opacity-60">0{idx + 1}</span>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">{project.detail?.subtitle || "Design"}</span>
              </div>
              <h3 className="text-[22px] font-medium tracking-tight">
                {project.name}
              </h3>
              <p className="text-[14px] opacity-70 leading-relaxed">
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block h-[600vh] w-full relative">
        
        {/* Snap Points */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col z-0">
          {projects.map((p) => (
            <div key={p.id} className="h-screen w-full snap-start" style={{ scrollSnapStop: 'always' }} />
          ))}
        </div>

        {/* Sticky viewport container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-auto">
          
          {/* Background Layer: Switching images cleanly without long overlapping crossfades */}
          <div className="absolute inset-0 z-0 bg-black overflow-hidden cursor-pointer" onClick={() => setSelectedProject(projects[activeIndex])}>
                <AnimatePresence custom={direction}>
              <motion.div 
                key={activeIndex}
                custom={direction}
                variants={{
                  initial: (dir: number) => ({
                    y: dir > 0 ? '100%' : '-100%',
                  }),
                  animate: {
                    y: '0%',
                  },
                  exit: (dir: number) => ({
                    y: dir > 0 ? '-100%' : '100%',
                  })
                }}
                className="absolute inset-0 w-full h-full"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: projects[activeIndex]?.bg || '#000' }}
              >
                {projects[activeIndex]?.bgImg && (
                  <img 
                    src={projects[activeIndex]?.bgImg} 
                    alt={projects[activeIndex]?.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <Noise />
          </div>

          {/* Dark Overlay for Text Readability - Removed as requested */}

          {/* Content Layer */}
          <div className="relative z-20 w-full px-6 md:px-12 mx-auto h-full flex flex-col justify-center gap-12 md:flex-row md:items-center md:justify-between py-24 md:py-0 pointer-events-none">
            
            {/* Left Content (Progressive Disclosure) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center h-full relative z-30">
              <AnimatePresence mode="wait" custom={direction}>
                 <motion.div
                   key={activeIndex}
                   custom={direction}
                   variants={{
                     initial: (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
                     animate: { opacity: 1, y: 0 },
                     exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40 })
                   }}
                   initial="initial"
                   animate="animate"
                   exit="exit"
                   transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                 >
                    <div className="text-white/60 font-mono tracking-widest text-xs md:text-sm mb-6 uppercase md:hidden">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </div>
                    
                    <h2 
                      className="text-5xl md:text-7xl font-semibold tracking-tight mb-3 md:mb-4 cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto w-fit"
                      onClick={() => setSelectedProject(projects[activeIndex])}
                    >
                      {projects[activeIndex]?.name?.split(' ')[0]}
                    </h2>
                    
                    <h3 
                      className="text-xl md:text-3xl font-light opacity-80 mb-8 md:mb-10 cursor-pointer hover:opacity-100 transition-opacity pointer-events-auto w-fit"
                      onClick={() => setSelectedProject(projects[activeIndex])}
                    >
                      {projects[activeIndex]?.name?.split(' ').slice(1).join(' ')}
                    </h3>
                    
                    <div className="h-[2px] w-8 md:w-12 bg-white/40 mb-6 md:mb-8 pointer-events-auto" />
                    
                    <p className="text-lg md:text-xl font-medium max-w-md opacity-90 mb-10 pointer-events-auto">
                      {projects[activeIndex]?.desc}
                    </p>

                    <button 
                      onClick={() => setSelectedProject(projects[activeIndex])}
                      className="group flex items-center justify-center gap-3 w-fit px-8 py-3.5 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-500 ease-out mt-4 md:mt-0 pointer-events-auto"
                    >
                      <span className="text-sm font-bold tracking-widest uppercase relative top-[1px]">View Project</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-black transition-colors" />
                    </button>
                 </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Vertical Stepper (Desktop Only) */}
            <div className="hidden md:flex w-full md:w-1/3 flex-col justify-center items-end relative z-30 pointer-events-auto">
               <div className="relative pl-8 flex flex-col gap-2 w-full max-w-[240px]">
                  
                  {/* The Active Cursor (Line) */}
                  <motion.div 
                    className="absolute left-0 w-[4px] bg-white transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      top: `${activeIndex * (32 + 8)}px`, // h-8=32px + gap-2=8px = 40px per step
                      height: '32px'
                    }}
                  />
                  
                  {/* Step List */}
                  {projects.map((p, i) => (
                    <div 
                      key={p.id} 
                      onClick={() => handleScrollTo(i)}
                      className="group h-8 flex items-center justify-between w-full transition-all duration-500 ease-out whitespace-nowrap cursor-pointer"
                      style={{ 
                        transform: activeIndex === i ? 'translateX(8px)' : 'translateX(0)',
                      }}
                    >
                      <span 
                        className={`text-lg tracking-wider transition-colors duration-500 text-left ${
                          activeIndex === i ? 'text-white font-medium' : 'text-white/30 font-light group-hover:text-white/60'
                        }`}
                      >
                        {p.name.split(' ')[0]}
                      </span>
                      <span 
                        className={`font-mono text-sm tracking-widest transition-colors duration-500 text-right ml-4 ${
                          activeIndex === i ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                        }`}
                      >
                        0{i + 1}
                      </span>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            nextProject={projects[(projects.findIndex(p => p.id === selectedProject.id) + 1) % projects.length]}
            onNext={() => {
              const nextIdx = (projects.findIndex(p => p.id === selectedProject.id) + 1) % projects.length;
              setSelectedProject(projects[nextIdx]);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
