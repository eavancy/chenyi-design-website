import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import ExperienceDetail from './ExperienceDetail';
import Lanyard from './lanyard/Lanyard';

const experiences = [
  {
    company: "深圳心泉智慧文化传播有限公司",
    date: "2024.06-2025.12",
    role: "品牌视觉设计师",
    desc: "专注疗愈与高端珠宝赛道品牌视觉全案设计，融合 AIGC 搭建标准化视觉内容体系，实现助力品牌营收千万级增长。",
    background: "疗愈教育企业规模全网矩阵粉丝 2000W+获得福布斯影响力教育人物，业务覆盖疗愈教育、高端SPA、原创珠宝、行业展会全产业链。",
    responsibilities: [
      "品牌全案视觉搭建：负责旗下珠宝、SPA衍生品牌从0到1视觉识别体系搭建、策划和定位。",
      "搭建私域商城：珠宝板块全链路视觉体系，融合AIGC产出标准化产品视觉、场景化营销设计。",
      "博览会空间视觉规划：主导整体视觉基调提案与展区设计，协同搭建方推进落地，完成从方案到施工全流程把控。",
      "产品开发/拍摄：协同产品经理深入供应链珠宝材料溯源与开发，主导产品视觉拍摄及商业表现。",
      "AIGC 内容体系搭建参与孵化 2000W+ 粉丝 IP 矩阵，通过 AIGC 优化内容生产流程。"
    ],
    achievements: [
      "「灵泉珠宝」、「玉言珠宝」及「泉疗愈 SPA」品牌的视觉识别系统，以“东方美学”表达，在疗愈赛道高端溢价能力，支撑全产业链品牌矩阵协同发展。",
      "搭建私域商城珠宝板块,优化视觉动线与转化链路，AIGC产出标准化营销素材，打通“引流-体验-复购”闭环，推动私域年营收增长1000W+。",
      "担任第二届国际疗愈博览会视觉空间7500㎡规划设计、展区设计与落地交付，提升品牌曝光与洽谈效率，100 + 品牌参展、5万 + 观众到场，以及广东卫视报道。",
      "协同产品经理开发原创珠宝80+款，主导产品视觉定位与产品摄影，落地全系列视觉，多款成为私域爆款。",
      "主理人 IP 矩阵孵化，结合水晶知识科普，以 AIGC 搭建标准化视觉内容体系，提升内容产出效率及高质量，助力课程板块全年营收突破1亿元。",
      "通过「AIGC + 拍摄」，搭建产品高复用性视觉，将产品视觉交付周期缩短 40%，大幅降低拍摄与后期制作成本。"
    ]
  },
  {
    company: "广西厨房故事餐饮管理有限公司",
    date: "2022.01-2024.03",
    role: "品牌设计师&西餐厅经理",
    desc: "统筹 15 人管理团队负责品牌视觉重塑与全盘经营。通过成本控制与全链路运营优化，实现业务逆势增长。",
    background: "",
    responsibilities: [
      "品牌年轻化重塑：主导西餐厅向“现代极简”风格焕新，优化空间美学、交互触点及感官体验。",
      "数字化营销：把控抖音/美团等平台投流视觉与内容策略，构建“种草-转化”流量闭环。",
      "标准化运营：制定服务 SOP 与视觉标准手册，统筹供应链采购、人才培养与成本管理。",
      "活动全案执行：主导门店主题活动策划、视觉定调及大型场景搭建，统筹达人与第三方资源。"
    ],
    achievements: [
      "疫情逆势增长：成功推行“线上外卖/私域送餐”模式，通过高品质和服务，实现单店月均外卖营收增长 30%。",
      "客群结构优化：通过视觉驱动营销，成功实现受众年轻化，18-35 岁核心客群比例提升 50%。",
      "商业转化提升：优化线上动线与物料视觉呈现，推动到店转化率增长 30%。",
      "降本增效显著：通过整合物料设计与制作链路，活动营销成本降低 20%，并获公司年度优秀团队认可。"
    ]
  },
  {
    company: "广西厨房故事餐饮管理有限公司",
    date: "2020.06-2022.01",
    role: "品牌设计师",
    desc: "广西厨房故事公司是一家本土餐饮企业，旗下多家餐厅，独具特色获得广大食客青睐。主导餐饮品牌 VI 体系搭建。",
    background: "广西厨房故事公司是一家本土餐饮企业，旗下多家餐厅，独具特色获得广大食客青睐、推崇。",
    responsibilities: [
      "品牌视觉识别系统（VI）构建：塑造多品牌视觉形象并制定标准化手册，确保多店面输出的统一性与专业度。",
      "全渠道内容资产设计：根据餐厅阶段性营销目标，设计并制作菜单、包装、海报及小程序等数字化视觉资产，建立品牌内容素材库。",
      "信息流广告与短视频视觉：深度参与广告投放策略，分析受众偏好，设计并拍摄高转化率的信息流广告及短视频素材。"
    ],
    achievements: [
      "品牌知名度跨越：建立起系统化的企业视觉形象，通过一致性的高品质输出，助力品牌整体曝光度提升60%。",
      "爆款视觉产出：主导拍摄并设计的短视频视觉内容，单条视频播放量突破 10w+，有效提升品牌美誉度与市场存在感。",
      "标准化赋能：输出多套成熟的包装及宣传物料设计模板，大幅缩减了后期新店开业及日常促销的视觉交付周期。"
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lanyardContainerRef = useRef<HTMLDivElement>(null);
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const isLanyardInView = useInView(lanyardContainerRef, { once: true, margin: "-20%" });

  return (
    <section id="exp" ref={containerRef} className="py-24 md:py-32 w-full relative z-10 bg-white text-black">
      <div className="w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start relative">
        {/* Left Col (Aligns with ABOUT ME and includes Lanyard) */}
        <div className="md:sticky md:top-24 flex flex-col h-auto md:h-[500px] z-10 w-full">
          <div className="relative z-10 pointer-events-none mb-4">
            <div className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest opacity-80 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#3B82F6]"></span>
              <span>( EXPERIENCE )</span>
            </div>
          </div>
          
          <div ref={lanyardContainerRef} className="hidden md:block absolute -top-[220px] left-0 w-[120%] h-[800px] -ml-8 pointer-events-none md:pointer-events-auto z-0">
            {isLanyardInView && <Lanyard position={[0, -2.5, 26]} transparent={true} />}
          </div>
        </div>

        {/* Right Col (Experience List) */}
        <div className="flex flex-col gap-16 md:gap-20 max-w-2xl text-[15px] md:text-[16px] leading-[1.8]">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col cursor-pointer group"
              onClick={() => setSelectedExp(exp)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-4 mb-4 border-b border-black/10 pb-4 group-hover:border-black/30 transition-colors">
                <h3 className="font-semibold text-lg md:text-xl text-black group-hover:text-blue-600 transition-colors">{exp.company}</h3>
                <span className="text-black/40 font-mono text-sm md:text-[15px] tracking-wide">{exp.date}</span>
              </div>
              <div className="text-[15px] md:text-[16px] font-medium text-black mb-3">{exp.role}</div>
              <p className="text-black/70 leading-[1.8] text-justify group-hover:text-black/90 transition-colors">
                {exp.desc}
              </p>
              <div className="pt-4 overflow-hidden">
                <span className="text-[12px] font-medium tracking-widest uppercase flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-blue-600">
                  Read More
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedExp && (
          <ExperienceDetail 
            exp={selectedExp}
            allExperiences={experiences}
            currentIndex={experiences.findIndex(e => e === selectedExp)}
            onClose={() => setSelectedExp(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
