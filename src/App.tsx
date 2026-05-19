import { useState } from 'react';
import { motion, useScroll, useTransform, MotionConfig } from 'motion/react';
import Hero from './components/Hero';
import BrandAmbition from './components/BrandAmbition';
import About from './components/About';
import Works from './components/Works';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Photography from './components/Photography';

export default function App() {
  const { scrollY } = useScroll();
  const [showPhotography, setShowPhotography] = useState(false);
  
  const backgroundColor = useTransform(
    scrollY, 
    [0, 600], 
    ['#002FA7', '#070707']
  );

  return (
    // Spring physics configuration for the whole app
    <MotionConfig transition={{ type: "spring", stiffness: 170, damping: 26 }}>
      <motion.div 
        style={{ backgroundColor }} 
        className="min-h-screen text-white w-full"
      >
        <Navigation setShowPhotography={setShowPhotography} />
        <Hero scrollY={scrollY} />
        
        <div className="w-full relative z-20">
          <BrandAmbition />
          <About />
        </div>

        <Works />
        <Experience />
        <Contact />
        
        <footer className="w-full relative z-10 bg-white text-black">
          <div className="w-full px-6 md:px-12 py-12 text-sm text-black/40 font-mono uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} Eavan Design. All rights reserved.
          </div>
        </footer>
      </motion.div>

      <Photography isOpen={showPhotography} onClose={() => setShowPhotography(false)} />
    </MotionConfig>
  );
}
