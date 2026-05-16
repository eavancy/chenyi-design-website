import { useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

const words = ["brand design", "peace & love."];

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[index];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, 100);
    }

    if (!isDeleting && text === currentWord) {
      clearTimeout(timer);
      const waitTime = index === 0 ? 800 : 1000;
      timer = setTimeout(() => setIsDeleting(true), waitTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  const isPeaceAndLove = index === 1;
  const isFullyTyped = isPeaceAndLove && text === words[1] && !isDeleting;

  return (
    <span className="flex items-center">
      <span className="relative pr-1">
        {/* Base Text or Base Gradient (blue->purple->orange) */}
        <span 
          className={`transition-opacity duration-1000 ${isPeaceAndLove ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500' : 'text-inherit'}`}
        >
          {text}
        </span>
        {/* Yellow/Orange/Red/Purple Gradient overlay (fades in when fully typed) */}
        {isPeaceAndLove && (
          <span 
            className={`absolute left-0 top-0 text-transparent bg-clip-text bg-[linear-gradient(to_right,#facc15,#f97316,#ef4444,#a855f7)] transition-opacity duration-[1500ms] ease-in-out ${isFullyTyped ? 'opacity-100' : 'opacity-0'}`}
            style={{ whiteSpace: 'nowrap' }}
            aria-hidden="true"
          >
            {text}
          </span>
        )}
      </span>
      <span className="font-sans font-light animate-[pulse_1s_ease-in-out_infinite] opacity-50 -ml-1 inline-block -translate-y-[2px]">|</span>
    </span>
  );
}

export default function Hero({ scrollY }: { scrollY: MotionValue<number> }) {
  // Text color transitions from white to black as user scrolls down
  const color = useTransform(scrollY, [0, 600], ['#FFFFFF', '#000000']);
  const imageOpacity = useTransform(scrollY, [0, 600], [0.8, 0]);

  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      id="hero"
      className="h-[100svh] w-full flex flex-col text-left relative z-10 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 z-0 w-full h-full overflow-hidden"
        style={{ opacity: imageOpacity }}
      >
        <motion.img 
          src="https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260512001849769.jpg"
          alt="Hero Background Mobile"
          className="w-[100%] h-[100%] object-cover max-w-none md:hidden"
          referrerPolicy="no-referrer"
        />
        <motion.img 
          src="https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260512003216337.jpg"
          alt="Hero Background Desktop"
          className="w-[100%] h-[100%] object-cover max-w-none hidden md:block"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#002FA7]/40 mix-blend-multiply" />
      </motion.div>

      {/* <div className="w-full flex-1" /> removed to prevent layout issues */}

      <div className="w-full relative z-10 pointer-events-none flex flex-col flex-1 pt-24 pb-4 md:pb-8">
        <motion.div style={{ color }} className="w-full h-full flex flex-col justify-between">
          
          {/* Middle Info Bar - Flex based for responsiveness */}
          <div className="w-full flex-1 flex flex-col justify-center pointer-events-auto px-6 md:px-12 min-h-0">
            <div className="w-full h-[1px] bg-white/20 mb-4 md:mb-6"></div>
            
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center text-[12px] md:text-[14px] gap-6 md:gap-0 relative">
              <div className="font-mono uppercase tracking-widest opacity-80 z-20 shrink-0">
                <p>LOCAL TIME</p>
                <p>{timeStr}</p>
              </div>
              
              <div className="font-sans font-medium leading-relaxed text-left opacity-90 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 w-full md:w-auto shrink-0">
                 我的设计能驱动增长、建立<br className="hidden md:block" />信任的品牌系统与视觉体验。
              </div>

              <div className="font-sans font-medium leading-relaxed opacity-80 text-left md:text-right z-20 shrink-0">
                (品牌策划, 视觉设计, 创意指导)
              </div>
            </div>
          </div>

          {/* Bottom Title */}
          <div className="w-full px-6 md:px-12 shrink-0 pointer-events-none mt-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: '"New York", "Times New Roman", serif' }}
              className="font-[900] tracking-tight w-full flex flex-col"
            >
              {/* Mobile Layout (5 lines, unified size) */}
              <div className="w-full flex md:hidden landscape:hidden flex-col text-[8.5vw] sm:text-[8vw] leading-[1.0] text-inherit mt-2">
                <span className="uppercase whitespace-nowrap">BUILDING TRUST</span>
                <span className="uppercase whitespace-nowrap">DRIVING</span>
                <span className="uppercase whitespace-nowrap">GROWTH</span>
                <span className="uppercase whitespace-nowrap">THROUGH</span>
                <span className="italic tracking-[-0.02em] uppercase mt-1 whitespace-nowrap text-inherit">
                  <TypewriterText />
                </span>
              </div>

              {/* Desktop/Tablet Layout */}
              <div className="hidden md:flex landscape:flex w-full flex-col text-inherit text-left">
                <div className="w-full uppercase whitespace-nowrap text-[4.5vw] lg:text-[5.5vw] xl:text-[80px] leading-[0.85] mb-2">
                  BUILDING TRUST DRIVING
                </div>
                
                <div className="w-full flex items-center justify-start text-[4.5vw] lg:text-[5.5vw] xl:text-[80px] leading-[0.85]">
                  <span className="mr-2 sm:mr-3 lg:mr-5 uppercase whitespace-nowrap">GROWTH THROUGH</span>
                  <span className="italic tracking-[-0.02em] uppercase text-inherit whitespace-nowrap">
                    <TypewriterText />
                  </span>
                </div>
              </div>
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
