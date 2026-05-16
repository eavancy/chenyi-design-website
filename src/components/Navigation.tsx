import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDetailOpen(document.body.style.overflow === 'hidden');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    setDetailOpen(document.body.style.overflow === 'hidden');
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsOpen(false);
    }

    const expEl = document.getElementById('exp');
    const threshold = expEl ? expEl.offsetTop - 100 : 800;
    if (latest > previous && latest > threshold) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sectionIds = ['ambition', 'about', 'works', 'exp', 'contact'];
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'about', label: '关于我', enLabel: 'About' },
    { id: 'works', label: '工作项目', enLabel: 'Works' },
    { id: 'exp', label: '工作经历', enLabel: 'Experience' },
  ];

  if (detailOpen) return null;

  // For Experience and Contact, make text black. Works might be light background too?
  const isLightSection = activeSection === 'exp' || activeSection === 'contact';
  const textColorClass = isLightSection ? 'text-black' : 'text-white';
  const borderColorClass = isLightSection ? 'border-black/20' : 'border-white/20';
  const hoverBgClass = isLightSection ? 'hover:bg-black/10' : 'hover:bg-white/10';
  const activeBgClass = isLightSection ? 'bg-black/15' : 'bg-white/15';

  return (
    <>
      <motion.header 
        id="navbar-header" 
        initial={{ y: 0 }}
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-4 md:pt-6 lg:pt-8`}
      >
        <div className={`pointer-events-auto relative w-full px-4 sm:px-6 md:px-8 lg:px-12 mx-auto flex items-center justify-between transition-all duration-700 bg-transparent`}>

          {/* Left: EavanChen Logo & Links */}
          <div className="flex items-center justify-start flex-shrink-0">
            <a href="#hero" className={`hover:-translate-y-0.5 transition-transform flex items-center ${textColorClass}`}>
              <span className="font-[900] uppercase text-[18px] md:text-[20px] lg:text-[22px] tracking-tight">CHENYI</span>
              <span className="w-[1px] h-[16px] md:h-[18px] bg-current opacity-40 mx-[8px] md:mx-[12px]"></span>
              <span className="font-normal uppercase text-[12px] md:text-[14px] lg:text-[16px] tracking-wide">EAVAN</span>
            </a>
          </div>

          {/* Navigation Links (Center) */}
          <div className="hidden md:flex landscape:flex flex-1 justify-center max-w-[500px] mx-2">
            <nav className={`flex items-center gap-1 md:gap-2 lg:gap-2 ${textColorClass} rounded-full transition-all duration-700`}>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group relative px-3 sm:px-4 lg:px-6 py-1.5 md:py-2.5 rounded-full overflow-hidden cursor-pointer transition-colors ${activeSection === s.id ? activeBgClass : hoverBgClass}`}
                >
                  <div className="relative z-10 grid grid-cols-1 grid-rows-1 overflow-hidden">
                    <span className={`col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full opacity-100 group-hover:opacity-0 text-[12px] lg:text-[14px] font-medium whitespace-nowrap`}>
                      {s.label}
                    </span>
                    <span className={`col-start-1 row-start-1 text-[10px] lg:text-[12px] font-mono tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap`}>
                      {s.enLabel}
                    </span>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Contact & Download Button & Mobile Toggle */}
          <div className="flex items-center justify-end gap-2 lg:gap-3 flex-shrink-0">
            <a href="#contact" className={`hidden xl:flex items-center justify-center pr-5 lg:pr-6 pl-2 py-2 rounded-full bg-transparent ${textColorClass} ${borderColorClass} ${hoverBgClass} transition-all duration-400 ease-out flex-shrink-0 border`}>
              <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full overflow-hidden lg:mr-2.5 mr-2 bg-white flex-shrink-0">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffffff" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] lg:text-[13px] font-medium tracking-wide whitespace-nowrap">请联系我</span>
            </a>

            {/* Mobile Nav Toggle */}
            <button 
              className={`md:hidden landscape:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full z-50 transition-colors ${textColorClass} ${isLightSection ? 'bg-black/5' : 'bg-white/10'} ${borderColorClass} border ml-2`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={`bg-current h-[2px] w-5 transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`bg-current h-[2px] w-5 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`bg-current h-[2px] w-5 transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#EDEDED] flex flex-col items-center justify-center pointer-events-auto md:hidden"
          >
            <div className="flex flex-col items-center gap-12">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-black text-2xl font-medium tracking-widest flex flex-col items-center gap-2 group"
                >
                  <span className="transition-transform group-hover:scale-105">{s.label}</span>
                  <span className="text-sm font-mono text-gray-400 uppercase">{s.enLabel}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
