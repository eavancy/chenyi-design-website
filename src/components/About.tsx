import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="w-full relative z-20 bg-[#070707] text-white pt-16 pb-12 md:pb-16">
      {/* Top divider */}
      <div className="w-full px-6 md:px-12 mb-12">
        <div className="w-full h-[1px] bg-white/20"></div>
      </div>

      <div className="w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start mb-16 md:mb-24">
        {/* Left Col (Aligns with CHENYI and "做一个...") */}
        <div className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest opacity-80 flex items-center gap-3">
          <span className="w-2 h-2 bg-blue-500"></span>
          <span>( ABOUT ME )</span>
        </div>

        {/* Right Col (Aligns with Image) */}
        <div className="flex flex-col gap-8 md:gap-10 max-w-2xl text-[15px] md:text-[16px] leading-[1.8] text-white/90 text-justify">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            做一个“有野心”“有温度”的设计师，不做自嗨型设计，始终以视觉服务品牌商业目标，具备较强的审美能力与系统化品牌视觉思维。
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            拥有团队统筹及项目全流程把控经验，善于将AIGC与业务、产品结合，参与问题拆解，能够判断视觉方案的可行性并推动落地，在保证视觉品质的同时，实现转化提升与成本优化。
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            科班出身，审美与美术基础扎实，对视觉趋势与用户偏好敏感。懂摄影、懂内容传播逻辑，快速抓取行业热点适配品牌需求，能够将 AI 工具与实际业务结合，高效解决问题。
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <a href="#contact" className="inline-flex items-center justify-center pl-1.5 pr-6 py-1.5 rounded-full bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-400 font-medium tracking-wide text-[13px]">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-gray-200 flex-shrink-0">
                {/* Avatar Placeholder */}
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=f3f4f6" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              请联系我
            </a>
          </motion.div>
        </div>
      </div>

      {/* Strategic Services Screen */}
      <div className="w-full min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-16 md:pt-20 pb-8 md:pb-12 mt-8 md:mt-12">
        {/* Middle Top Area: DESIGN and SCROLL DOWN */}
        <div className="w-full flex justify-between items-center opacity-80 shrink-0">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-blue-500"></span>
            <span>( DESIGN )</span>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            <span>SCROLL DOWN</span>
          </motion.div>
        </div>

        {/* Center Large Text with plenty of whitespace */}
        <div className="w-full flex-1 flex justify-center items-center text-center overflow-hidden py-10 md:py-20 lg:py-24 shrink-0">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: '"New York", "Times New Roman", serif' }}
            className="font-[900] tracking-tight text-[32px] sm:text-[40px] md:text-[42px] lg:text-[5vw] xl:text-[64px] leading-[1.1] uppercase flex justify-center text-center max-w-5xl md:max-w-6xl break-words"
          >
            Strategic Services for Brand and Digital Growth
          </motion.h2>
        </div>

        {/* Services Grid below pushed down to bottom */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-8 shrink-0 mt-auto border-none">
          {[
            { id: 1, title: '品牌策划', text: '明确品牌定位，制定沟通策略与增长路径。', img: 'https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260514235434214.png' },
            { id: 2, title: '视觉设计', text: '搭建品牌视觉体系，塑造有记忆点的品牌形象。', img: 'https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260514235434167.png' },
            { id: 3, title: '创意指导', text: '统筹创意方向，保障品牌表达的一致性与张力。', img: 'https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260514235434200.png' },
            { id: 4, title: 'AI 赋能', text: '运用 AI 工具，提升创意效率与规模化传播效果。', img: 'https://cdn.jsdmirror.com/gh/eavancy/portfolio/eavanportfolio20260514235434185.png' }
          ].map((item, index) => (
            <motion.div 
              key={item.id} 
              className="flex flex-col pb-0 md:pb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={item.img} alt={item.title} className="w-20 h-20 object-contain mb-6 md:mb-8" />
              <h3 className="text-[15px] md:text-[16px] font-bold tracking-wide mb-3 flex items-center gap-2">
                <span className="font-mono text-[14px]">({item.id})</span> {item.title}
              </h3>
              <p className="text-[14px] xl:text-[15px] leading-[1.8] text-white/70 whitespace-nowrap overflow-visible">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
