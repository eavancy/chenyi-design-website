import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const ALL_PHOTOS = [
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519194132204.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519194132219.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519194132236.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195138200.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195138185.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519221146950.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519194132177.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519194132145.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519194132290.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195138227.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195138212.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519194132188.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195138239.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195138255.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195138273.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195720878.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212417849.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529200.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529193.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529195.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195720919.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195720906.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195720932.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195720895.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519195720946.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212324043.JPG",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212417840.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212417841.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212417845.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212417844.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212417842.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212417848.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529196.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529194.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529199.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529197.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212645167.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212645168.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529202.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529201.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212529198.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212645172.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212645171.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212645175.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212645174.jpg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212645176.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736263.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736264.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736265.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736266.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736268.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736262.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736267.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736269.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831125.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736270.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212736271.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831124.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831129.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831126.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831132.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831133.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831130.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212831131.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212913472.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212913473.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212913474.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212913475.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212913477.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948882.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948883.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212913479.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948886.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948885.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948884.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948891.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948890.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948889.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519212948888.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023518.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023519.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023520.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023525.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023523.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023522.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023526.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023527.jpeg",
  "https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260519213023528.jpeg",
];

const DOUBLED_PHOTOS = [...ALL_PHOTOS, ...ALL_PHOTOS, ...ALL_PHOTOS]; // Ensure we have enough for a few repetitions

// Inject text blocks periodically
const GRID_ITEMS: any[] = [];
DOUBLED_PHOTOS.forEach((src, i) => {
  if (i === 2) {
    GRID_ITEMS.push({ id: `text-block-1`, type: 'text', isFirst: true });
  } else if (i > 2 && (i - 2) % 18 === 0) {
    GRID_ITEMS.push({ id: `text-block-${i}`, type: 'text', isFirst: false });
  }
  GRID_ITEMS.push({ id: `img-${i}`, type: 'img', src });
});

function GridImageItem({ item, idx }: { item: any, idx: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [colSpanClass, setColSpanClass] = useState('col-span-1');
  const [rowSpan, setRowSpan] = useState(10); 

  const calculateSize = () => {
    if (!imgRef.current || !containerRef.current) return;
    const img = imgRef.current;
    if (!img.naturalWidth) return;

    const isHoriz = img.naturalWidth > img.naturalHeight;
    setColSpanClass(isHoriz ? 'col-span-2' : 'col-span-1');

    requestAnimationFrame(() => {
      if (!containerRef.current || !imgRef.current) return;
      const width = containerRef.current.clientWidth;
      const gapY = window.innerWidth >= 768 ? 16 : 8; 
      const height = (img.naturalHeight / img.naturalWidth) * width;
      setRowSpan(Math.ceil(height + gapY));
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => calculateSize());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: (idx % 10) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full ${colSpanClass} group opacity-0`}
    >
      <div className="absolute left-0 right-0 top-0 bottom-2 md:bottom-4 bg-[#f0f0f0] overflow-hidden shadow-sm">
        <img 
          ref={imgRef}
          src={item.src} 
          alt={`Photography`} 
          loading="lazy"
          onLoad={(e) => {
             const t = e.target as HTMLImageElement;
             t.style.opacity = '1';
             calculateSize();
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-105" 
          style={{ opacity: 0 }}
        />
      </div>
    </motion.div>
  );
}

function CoreTextBlock({ item, onClose, isExpanded }: { item: any, onClose: () => void, isExpanded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rowSpan, setRowSpan] = useState(200);

  const calculateSize = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = (4 / 3) * width; // 3:4 aspect ratio
    const gapY = window.innerWidth >= 768 ? 16 : 8;
    setRowSpan(Math.ceil(height + gapY));
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => calculateSize());
    observer.observe(containerRef.current);
    calculateSize();
    return () => observer.disconnect();
  }, []);

  const content = (
    <>
      <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-white italic mb-6">
        Chen <br/>Yi
      </h2>
      <p className="text-white text-[11px] md:text-xs font-medium tracking-wide uppercase leading-relaxed max-w-[240px]">
        我是陈毅，一名视觉创作者及摄影师，用镜头捕捉光影与情感，专注人像与自然摄影的独立摄影师。
      </p>
      <a href="#about" onClick={(e) => { e.stopPropagation(); onClose(); }} className="mt-8 text-[10px] md:text-xs font-bold tracking-widest uppercase border-b border-white/30 pb-1 w-fit hover:border-white transition-colors relative z-10 text-white">
        PROFILE ↗
      </a>
    </>
  );

  if (item.isFirst) {
    return (
      <div ref={containerRef} style={{ gridRowEnd: `span ${rowSpan}` }} className="col-span-1 relative w-full">
         <motion.div 
           layout
           transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
           className={`bg-[#002FA7] shadow-sm flex flex-col justify-center p-6 md:p-8 overflow-hidden ${
             isExpanded 
               ? "fixed inset-0 z-[160] items-center text-center" 
               : "absolute left-0 right-0 top-0 bottom-2 md:bottom-4 z-10"
           }`}
         >
           <motion.div layout="position" className={isExpanded ? "scale-125 md:scale-150" : ""}>
             {content}
           </motion.div>
         </motion.div>
      </div>
    );
  }

  // Not first block
  return (
    <motion.div 
      ref={containerRef} 
      style={{ gridRowEnd: `span ${rowSpan}` }} 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-1 relative w-full"
    >
      <div className="absolute left-0 right-0 top-0 bottom-2 md:bottom-4 flex flex-col justify-center bg-[#002FA7] text-white p-6 md:p-8 shadow-sm overflow-hidden">
        {content}
      </div>
    </motion.div>
  );
}

export default function Photography({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsExpanded(true);
      // Trigger the shrink animation shortly after mounting
      const timer = setTimeout(() => setIsExpanded(false), 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setIsExpanded(true);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-white text-black overflow-y-auto"
        >
          {/* Close Button Overlay */}
          <button 
            onClick={onClose}
            className="fixed top-6 right-6 md:top-8 md:right-10 z-[110] flex items-center justify-center w-12 h-12 rounded-full bg-black/5 hover:bg-black/10 transition-colors backdrop-blur-md"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L13 1M1 1L13 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Masonry Grid */}
          <div className="w-full px-2 md:px-4 py-2 md:py-4 relative z-[101]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-0 auto-rows-[1px] grid-flow-dense pb-24">
              {GRID_ITEMS.map((item, i) => {
                if (item.type === 'text') {
                  return <CoreTextBlock key={item.id} item={item} idx={i} onClose={onClose} isExpanded={isExpanded && item.isFirst} />;
                }
                return <GridImageItem key={item.id} item={item} idx={i} />;
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
