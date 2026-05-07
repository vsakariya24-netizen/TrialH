import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { 
  Target, Eye, Award, Zap, ShieldCheck, 
  Settings, ChevronRight, Boxes, 
  RefreshCw, AlertTriangle, Factory, 
  MapPin, Users, TrendingUp, Landmark,
  Scale, Gauge, CheckCircle2, Microscope, 
  Truck, Timer, BarChart3, Binary, HardHat,
  FileCheck, Database, ClipboardCheck,
  History, Repeat, XCircle, CheckCircle, ArrowRight,
  Globe, Briefcase, Rocket, Quote, MoveRight, Layers, Building2
} from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// --- ADVANCED ANIMATION UTILITIES (UPGRADED) ---
const FadeInView = ({ children, direction = "up", delay = 0, blur = true }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const yOffset = direction === "up" ? 60 : direction === "down" ? -60 : 0;
  const xOffset = direction === "left" ? 60 : direction === "right" ? -60 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset, filter: blur ? 'blur(20px)' : 'none' }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, filter: blur ? 'blur(0px)' : 'none' } : {}}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const RollingNumber = ({ value, suffix = "", prefix = "" }: { value: string | number, suffix?: string, prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value.toString());
      const duration = 2500;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplay(end);
          clearInterval(timer);
        } else { setDisplay(start); }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-['Space_Mono'] bg-clip-text text-transparent bg-gradient-to-b from-white via-amber-200 to-amber-600 drop-shadow-sm">
      {prefix}{display.toLocaleString(undefined, { minimumFractionDigits: value.toString().includes('.') ? 2 : 0, maximumFractionDigits: 2 })}{suffix}
    </span>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);

  return (
    <HelmetProvider>
      <div ref={containerRef} className="bg-[#050505] min-h-screen text-[#E2E4E9] font-['Barlow'] overflow-x-hidden selection:bg-amber-500 selection:text-black">
        <Helmet>
          <title>The DFPL Story | Durable Fastener Pvt. Ltd.</title>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@100;300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        </Helmet>

        {/* --- GLOBAL UI ELEMENTS --- */}
        <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 z-[100] origin-left shadow-[0_0_15px_rgba(245,158,11,0.6)]" style={{ scaleX }} />
        
        {/* Substantive Noise Overlay for Premium Matte Finish */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        {/* --- DYNAMIC INDUSTRIAL GRID & LIGHTING --- */}
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-screen" 
             style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)' }} />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-amber-500/10 blur-[180px] pointer-events-none z-[1] rounded-[100%] mix-blend-screen" />

        {/* --- HERO: THE MACHINE --- */}
        <section className="relative h-[100dvh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
          <motion.div style={{ y: bgY, opacity: heroOpacity }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
             <h1 className="text-[24vw] font-['Bebas_Neue'] whitespace-nowrap text-white/[0.015] select-none tracking-tighter mix-blend-lighten">DURABLE</h1>
          </motion.div>

          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="max-w-[1400px] mx-auto w-full z-10 relative mt-12">
            <FadeInView>
              <div className="flex items-center gap-6 mb-10 lg:mb-14 opacity-80">
                <span className="w-24 h-[1px] bg-gradient-to-r from-amber-500 to-transparent shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <span className="font-['Space_Mono'] text-amber-500 text-xs md:text-sm tracking-[0.4em] uppercase font-bold">Est. 2018 // Industrial Excellence</span>
              </div>
              <h1 className="text-[clamp(3rem,8vw,7rem)] font-['Bebas_Neue'] leading-[0.85] uppercase tracking-tighter mb-10 drop-shadow-2xl flex flex-col">
                <span className="text-white">Engineering</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 inline-block drop-shadow-[0_0_60px_rgba(245,158,11,0.4)] pb-2 -mt-2">Integrity.</span>
                <span className="text-transparent border-text opacity-40 block mt-2">Built To Last.</span>
              </h1>
            </FadeInView>

            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 xl:col-span-6">
                <FadeInView delay={0.4}>
                  <p className="text-xl md:text-2xl font-light leading-[1.4] text-slate-300 border-l-[3px] border-amber-500/80 pl-8 md:pl-10 relative bg-gradient-to-r from-amber-500/5 to-transparent py-4 backdrop-blur-sm shadow-[inset_1px_0_0_rgba(245,158,11,0.5)]">
                    <span className="absolute -left-[1.5px] top-0 w-[3px] h-1/2 bg-amber-400 blur-[4px]" />
                    Defining the future of fasteners through <span className="text-white font-semibold">system-driven reliability</span> and unyielding industrial grit.
                  </p>
                </FadeInView>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 2, ease: [0.16, 1, 0.3, 1] }}
             className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-3 font-['Space_Mono'] text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.3em]">
            <span className="flex items-center gap-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Lat: 22.3039° N
            </span>
            <span className="pl-6 opacity-70">Long: 70.8022° E</span>
          </motion.div>
        </section>

        {/* --- 01 THE GENESIS: ARCHITECTURAL VIEW --- */}
        <section className="py-24 md:py-40 px-6 relative z-10 border-t border-white/[0.04] bg-gradient-to-b from-zinc-950/90 to-[#050505] backdrop-blur-[100px]">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-5 relative">
              <div className="sticky top-40">
                <FadeInView direction="right">
                  <div className="inline-flex items-center gap-3 font-['Space_Mono'] text-amber-500 text-xs tracking-[0.3em] uppercase mb-10 bg-amber-500/[0.08] px-5 py-2.5 rounded-full border border-amber-500/20 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)]">
                    <span className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> 01 // THE GENESIS
                  </div>
                  <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-14 text-white tracking-tight">
                    Who <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 italic pr-4">We Are.</span>
                  </h2>
                  <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/[0.08] aspect-square bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] max-w-sm">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.15),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-1000 ease-out" />
                    <div className="absolute inset-0 flex items-center justify-center grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-[0.16,1,0.3,1]">
                      <Factory size={120} strokeWidth={0.5} className="text-white group-hover:text-amber-500 drop-shadow-[0_0_40px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]" />
                    </div>
                  </div>
                </FadeInView>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-12 md:space-y-16 pt-10 lg:pt-32">
              <FadeInView delay={0.2}>
                <div className="space-y-10">
                  <div className="p-8 md:p-12 bg-gradient-to-br from-zinc-900/90 to-[#080808] backdrop-blur-3xl border border-white/[0.06] rounded-[2rem] relative shadow-[0_30px_100px_rgba(0,0,0,0.5)] group hover:border-white/[0.12] transition-colors duration-700 ease-out">
                    <div className="absolute -top-4 -left-2 md:-left-6 px-6 py-2.5 bg-amber-500 text-black font-bold text-xs uppercase tracking-[0.2em] rounded shadow-[0_10px_30px_rgba(245,158,11,0.3)]">Founded 29th Aug 2018</div>
                    <p className="text-lg md:text-xl font-light text-slate-200 leading-[1.6]">
                      Durable Fastener Pvt. Ltd. (DFPL) was founded by <span className="text-white font-semibold italic underline decoration-amber-500/50 hover:decoration-amber-500 transition-colors duration-300 underline-offset-8">Mr. Vipul Sakariya</span> with a singular, unyielding purpose: to bridge the gap between heavy-duty manufacturing and professional, system-driven service.
                    </p>
                  </div>
                  <p className="text-base md:text-lg font-light text-slate-400 pl-8 md:pl-10 border-l-[2px] border-amber-500/30 leading-[1.7]">
                    Operating from Rajkot — India’s industrial nerve center — we have engineered a company built on reliable systems and a deep commitment to customer satisfaction. We don't just supply fasteners; we engineer the integrity of your structures.
                  </p>
                </div>
              </FadeInView>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {[
                  { icon: <MapPin size={28} />, title: "The Factory", sub: "Ravki Makhavad, Rajkot, Gujarat", label: "LOG_COORD: RAJKOT_GUJ_IND" },
                  { icon: <Globe size={28} />, title: "Global Presence", sub: "Surat Branch & Warehouse Serving Pan-India", label: "LOG_DIST: PAN_INDIA" }
                ].map((item, idx) => (
                  <FadeInView key={idx} delay={0.1 * idx}>
                    <div className="p-8 rounded-[1.5rem] border border-white/[0.05] bg-[#0a0a0a]/50 hover:bg-[#111]/80 backdrop-blur-xl transition-all duration-700 group relative overflow-hidden shadow-xl">
                      <div className="absolute top-0 right-0 p-4 font-['Space_Mono'] text-[9px] text-zinc-600 bg-white/[0.02] rounded-bl-2xl border-b border-l border-white/[0.02]">{item.label}</div>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-transparent group-hover:from-amber-500/[0.03] transition-colors duration-700 ease-out" />
                      <div className="w-14 h-14 rounded-xl bg-white/[0.03] flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-amber-500/10 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-700 ease-[0.16,1,0.3,1] relative z-10 border border-white/[0.05]">{item.icon}</div>
                      <h4 className="text-2xl md:text-3xl font-['Bebas_Neue'] mb-3 tracking-wide text-white group-hover:text-amber-400 transition-colors duration-500 relative z-10">{item.title}</h4>
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-500 group-hover:text-slate-300 transition-colors duration-500 leading-relaxed relative z-10">{item.sub}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 02 THE STORY: CINEMATIC QUOTE --- */}
        <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-[#020202]">
          {/* Ambient Quote Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0,transparent_60%)] pointer-events-none mix-blend-screen" />
          <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.015] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] pointer-events-none" strokeWidth={0.5} />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <FadeInView>
              <div className="font-['Space_Mono'] text-amber-500 text-xs mb-10 uppercase tracking-[0.3em] flex justify-center lg:justify-start">02 // THE ORIGIN</div>
              <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-20 text-center lg:text-left drop-shadow-2xl tracking-tight">
                The Story <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 italic pr-4">Behind DFPL.</span>
              </h2>
            </FadeInView>

            <div className="grid lg:grid-cols-12 gap-16 md:gap-20 items-center">
              <div className="lg:col-span-8">
                <FadeInView>
                  <div className="relative mb-16 group pl-8 md:pl-10">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-500 via-amber-700 to-transparent rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                    <p className="text-xl md:text-2xl font-light text-slate-200 italic leading-[1.5] relative z-10">
                      Before founding DFPL, <span className="font-semibold text-amber-500 not-italic">Mr. Vipul Sakariya</span> witnessed firsthand the friction of poor workplace systems and the lack of accountability in the industry.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/80 border border-white/[0.04] backdrop-blur-3xl relative overflow-hidden group hover:bg-[#111]/90 hover:border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-700">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-[0.16,1,0.3,1]" />
                      <h4 className="text-amber-500 font-['Bebas_Neue'] text-2xl md:text-3xl mb-5 tracking-widest uppercase">The Market Gap</h4>
                      <p className="text-slate-400 text-sm md:text-base leading-[1.6] font-light">Manufacturers in Rajkot produced quality fasteners but lacked structured sales and QC. Mr. Sakariya saw them as <span className="text-white font-medium">precision-engineered mechanical products</span>, not just hardware.</p>
                    </div>
                    <div className="p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/80 border border-white/[0.04] backdrop-blur-3xl relative overflow-hidden group hover:bg-[#111]/90 hover:border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-700">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/40 to-white/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 delay-100 ease-[0.16,1,0.3,1]" />
                      <h4 className="text-white font-['Bebas_Neue'] text-2xl md:text-3xl mb-5 tracking-widest uppercase">The Dual Purpose</h4>
                      <p className="text-slate-400 text-sm md:text-base leading-[1.6] font-light">Built to ensure neither employees nor customers faced systemic failures. The goal: <span className="text-white font-medium">one-day dispatch system</span> backed by rigorous QC.</p>
                    </div>
                  </div>
                </FadeInView>
              </div>
              <div className="lg:col-span-4">
                <FadeInView direction="left" delay={0.3}>
                   <div className="relative group">
                     <div className="absolute inset-0 bg-amber-500 blur-[80px] opacity-20 group-hover:opacity-30 rounded-[2.5rem] transition-opacity duration-1000" />
                     <div className="p-10 md:p-12 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-black rounded-[2.5rem] shadow-[0_40px_100px_rgba(245,158,11,0.3)] transform md:rotate-3 group-hover:rotate-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] relative z-10 border border-amber-300">
                        <Quote className="text-black/10 absolute top-8 left-8" size={80} />
                        <p className="text-xl md:text-2xl font-bold italic leading-[1.4] mb-8 relative z-10 pt-4 text-black/90">
                          "What we sell is not just a product — we sell a service. The screw is just the beginning."
                        </p>
                        <div className="h-2 w-16 bg-black/30 rounded-full" />
                     </div>
                   </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* --- 03 EVOLUTION: THE CRITICAL FAIL --- */}
        <section className="py-24 md:py-40 px-6 bg-[#000000] border-y border-white/[0.03] relative overflow-hidden">
          {/* Subtle Red Warning Glow */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/5 blur-[150px] pointer-events-none rounded-full mix-blend-screen" />

          <div className="max-w-[1400px] mx-auto relative z-10">
             <div className="grid lg:grid-cols-12 gap-16 md:gap-20">
               <div className="lg:col-span-5">
                 <FadeInView>
                   <div className="font-['Space_Mono'] text-amber-500 text-xs mb-10 tracking-[0.3em] uppercase">03 // THE EVOLUTION</div>
                   <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-12 tracking-tight">The Early <br/><span className="text-amber-500 italic pr-4">Journey.</span></h2>
                   
                   {/* Terminal Style Glitch Card */}
                   <div className="p-8 md:p-12 rounded-[2rem] bg-[#050505] border border-red-500/20 relative group shadow-[0_20px_80px_rgba(239,68,68,0.08)] overflow-hidden transition-colors duration-700 hover:border-red-500/40">
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(239,68,68,0.02)_50%)] bg-[length:100%_4px] group-hover:bg-[length:100%_2px] transition-all duration-700" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
                      <div className="absolute top-0 right-0 px-4 py-2 font-['Space_Mono'] text-[9px] bg-red-500/[0.08] text-red-400 border-b border-l border-red-500/20 rounded-bl-2xl tracking-[0.2em]">CRITICAL_LOG_2019</div>
                      
                      <div className="relative z-10">
                        <AlertTriangle className="text-red-500 mb-8 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]" size={48} />
                        <h4 className="text-2xl md:text-3xl font-['Bebas_Neue'] mb-4 text-white tracking-widest">The ₹8 Lakh Rejection</h4>
                        <p className="text-slate-400 text-sm md:text-base mb-8 leading-[1.6] font-light">
                          A major 5,000kg order failed due to head-cutting. Investigation revealed: plywood density increases in winter.
                        </p>
                        <div className="flex items-center gap-3 text-emerald-400 font-bold text-xs uppercase tracking-[0.1em] bg-emerald-500/10 w-fit px-4 py-2.5 rounded-lg border border-emerald-500/30 shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]">
                          <CheckCircle size={16} /> Pivot: Season-Aware QC
                        </div>
                      </div>
                   </div>
                 </FadeInView>
               </div>
               
               <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-0">
                 <FadeInView delay={0.2}>
                   <p className="text-xl md:text-2xl font-light text-slate-300 mb-16 leading-[1.5]">
                     This moment shifted our focus to <span className="text-white italic font-medium relative inline-block"><span className="relative z-10 px-1">application engineering.</span><span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-3 bg-amber-500/30 -z-10 rounded-sm"></span></span> We analyzed international standards to build a system that accounts for material science and variables.
                   </p>
                   
                   {/* Bento Grid for Breakthroughs */}
                   <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      <div className="p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/80 border border-white/[0.04] hover:border-amber-500/40 hover:bg-[#111] transition-all duration-700 ease-[0.16,1,0.3,1] group shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                        <History className="text-amber-500 mb-6 w-10 h-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 ease-[0.16,1,0.3,1] drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
                        <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-2">Breakthrough 01</div>
                        <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-white tracking-tight leading-none mb-4">120 Cartons</div>
                        <div className="text-[10px] font-['Space_Mono'] text-amber-500/80 tracking-widest bg-amber-500/10 w-fit px-3 py-1.5 rounded-md border border-amber-500/20">VALUED AT ₹5 LAKH</div>
                      </div>
                      <div className="p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/80 border border-white/[0.04] hover:border-amber-500/40 hover:bg-[#111] transition-all duration-700 ease-[0.16,1,0.3,1] group shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                        <TrendingUp className="text-amber-500 mb-6 w-10 h-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 ease-[0.16,1,0.3,1] drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
                        <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-2">Breakthrough 02</div>
                        <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-white tracking-tight leading-none mb-4">200 Cartons</div>
                        <div className="text-[10px] font-['Space_Mono'] text-amber-500/80 tracking-widest bg-amber-500/10 w-fit px-3 py-1.5 rounded-md border border-amber-500/20">VALUED AT ₹12 LAKH</div>
                      </div>
                      <div className="sm:col-span-2 p-8 md:p-12 rounded-[2rem] bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black flex items-center justify-between shadow-[0_20px_60px_rgba(245,158,11,0.25)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10">
                           <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-80 mix-blend-overlay">Elite Early Partners</div>
                           <div className="text-3xl md:text-4xl font-['Bebas_Neue'] leading-none tracking-wide text-black/90">Bhumi Associates & <br className="md:hidden"/>Ramdev Hardware</div>
                        </div>
                        <Award size={90} className="opacity-[0.15] hidden sm:block mix-blend-overlay absolute right-10 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]" />
                      </div>
                   </div>
                 </FadeInView>
               </div>
             </div>
          </div>
        </section>

        {/* --- 04 SYSTEMS: THE DASHBOARD GRID --- */}
        <section className="py-24 md:py-40 px-6 bg-[#040404] relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
          
          <div className="max-w-[1400px] mx-auto">
            <FadeInView>
              <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase text-center">04 // TRANSFORMATION</div>
              <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-20 text-center text-white drop-shadow-2xl tracking-tighter">
                From Resilience <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 italic">To Systems.</span>
              </h2>
            </FadeInView>
            
            <div className="grid lg:grid-cols-12 gap-12 md:gap-16 mb-24 items-center">
               <div className="lg:col-span-7">
                  <FadeInView>
                    <p className="text-xl md:text-2xl font-light text-slate-300 leading-[1.5]">
                      The 2020 lockdown was our <span className="text-white italic font-medium">Strategic Clarity</span> phase. We dismantled legacy operations and rebuilt around one truth: the market needed <span className="text-amber-500 font-semibold underline decoration-amber-500/40 hover:decoration-amber-500 transition-colors duration-300 underline-offset-8">Speed and Reliability</span> above all else.
                    </p>
                  </FadeInView>
               </div>
               <div className="lg:col-span-5">
                  <FadeInView delay={0.2} direction="left">
                    <div className="p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/[0.06] relative shadow-[0_30px_80px_rgba(0,0,0,0.6)] group overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                      <Quote className="absolute top-6 right-6 text-white/[0.02] group-hover:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]" size={80} />
                      <p className="relative z-10 italic text-lg md:text-xl text-slate-300 leading-[1.6] font-light">
                        "We didn't just wait for the world to open; we prepared our systems to be the fastest to respond."
                      </p>
                    </div>
                  </FadeInView>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: "Quality Control", icon: <ShieldCheck />, desc: "QC at every stage—wire, heading, threading, heat treat—ensuring international standard compliance." },
                { title: "Inventory & Dispatch", icon: <RefreshCw />, desc: "Real-time management via pro software. Floor stock matches system records for 1-day dispatch." },
                { title: "Compliance & Ethics", icon: <Scale />, desc: "Strict adherence to regulations and financial systems since 2021. Built for multi-decade growth." }
              ].map((item, i) => (
                <FadeInView key={i} delay={0.1 * i}>
                  <div className="h-full p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/40 border border-white/[0.04] hover:border-amber-500/30 hover:bg-[#111]/80 backdrop-blur-xl transition-all duration-700 ease-[0.16,1,0.3,1] group relative overflow-hidden flex flex-col justify-between shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-transparent group-hover:from-amber-500/[0.04] transition-colors duration-700" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-xl bg-[#111] border border-white/[0.05] text-amber-500 mb-8 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-amber-500/20 group-hover:border-amber-500/30 transition-all duration-700 ease-[0.16,1,0.3,1] shadow-lg">{React.cloneElement(item.icon as React.ReactElement, { size: 28, strokeWidth: 1.5 })}</div>
                      <h4 className="text-2xl md:text-3xl font-['Bebas_Neue'] mb-4 tracking-widest uppercase text-white group-hover:text-amber-400 transition-colors duration-500">{item.title}</h4>
                    </div>
                    <p className="text-[10px] md:text-[11px] text-slate-400 leading-[1.8] uppercase tracking-[0.1em] mt-5 relative z-10">{item.desc}</p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* --- 05 NUMBERS: THE STATS HUB --- */}
        <section className="py-24 md:py-40 bg-zinc-950 relative overflow-hidden border-y border-white/[0.03]">
          {/* Subtle Graphic Element */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0,transparent_50%)] pointer-events-none mix-blend-screen" />

          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <FadeInView>
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-10 mb-20 gap-6">
                <h2 className="text-5xl md:text-6xl font-['Bebas_Neue'] uppercase leading-none tracking-tight">Our Numbers <br/><span className="text-amber-500">Speak.</span></h2>
                <div className="font-['Space_Mono'] text-[10px] text-zinc-500 uppercase tracking-[0.2em] bg-white/[0.02] px-5 py-2.5 rounded-full border border-white/[0.05]">Real-Time Performance Metrics</div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-y-20">
                {[
                  { l: "On-Time Dispatch", v: 95, s: "%", i: <Truck size={20} strokeWidth={1.5}/> },
                  { l: "Order Accuracy", v: 99, s: "%", i: <CheckCircle2 size={20} strokeWidth={1.5}/> },
                  { l: "Repeat Customers", v: 92, s: "%", i: <Users size={20} strokeWidth={1.5}/> },
                  { l: "Avg Response", v: "45", s: "m", i: <Timer size={20} strokeWidth={1.5}/> },
                  { l: "Rejection Rate", v: 1.20, s: "%", i: <XCircle size={20} strokeWidth={1.5}/> },
                  { l: "Turnover Cr", v: 5.12, p: "₹", i: <TrendingUp size={20} strokeWidth={1.5}/> },
                ].map((stat, i) => (
                  <div key={i} className="group relative">
                    <div className="flex items-center gap-3 text-zinc-500 mb-6 group-hover:text-amber-500 transition-colors duration-500">
                      <div className="p-2.5 rounded-lg bg-white/[0.03] group-hover:bg-amber-500/10 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-500 border border-transparent group-hover:border-amber-500/20">{stat.i}</div>
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em]">{stat.l}</span>
                    </div>
                    <div className="text-5xl md:text-6xl font-['Bebas_Neue'] text-white drop-shadow-lg tracking-tight group-hover:scale-105 transform origin-left transition-transform duration-700 ease-[0.16,1,0.3,1]">
                      <RollingNumber value={stat.v} suffix={stat.s} prefix={stat.p} />
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
          <div className="absolute -bottom-16 md:-bottom-32 right-0 text-[10rem] md:text-[15rem] font-['Bebas_Neue'] text-white/[0.015] select-none uppercase pointer-events-none leading-none tracking-tighter mix-blend-lighten">PERFORMANCE</div>
        </section>

        {/* --- 06 THE PROTOCOL: SCHEMATIC FLOW --- */}
        <section className="py-24 md:py-40 px-6 bg-[#020202]">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 md:gap-20 relative">
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <FadeInView direction="right">
                <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">05 // THE PROTOCOL</div>
                <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-10 text-white tracking-tight">Precision <br/><span className="text-amber-500 italic pr-4">Dispatch.</span></h2>
                <p className="text-lg md:text-xl text-slate-400 mb-12 leading-[1.6] font-light">
                   In 8 years, we have achieved a <span className="text-white font-medium bg-white/[0.05] border border-white/[0.1] px-2 py-1 rounded-md shadow-inner">0% error rate</span> in material accuracy. We never miss a deadline.
                </p>
                <div className="p-8 md:p-10 rounded-[2rem] bg-amber-500/[0.03] border border-amber-500/20 text-base md:text-lg text-amber-100/90 italic font-light leading-[1.6] shadow-[0_20px_40px_rgba(245,158,11,0.05)] backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-colors duration-700">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                  <Quote className="text-amber-500/20 mb-5 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" size={32} />
                  "If wrong material is sent, DFPL covers 100% of replacement costs. If a delay occurs, we deliver before the deadline with 2 buffer days."
                </div>
              </FadeInView>
            </div>
            
            <div className="lg:col-span-7 relative">
              {/* Connecting Line with Gradient Mask */}
              <div className="absolute left-[39px] md:left-[47px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-amber-500 via-zinc-800 to-transparent hidden sm:block opacity-60" />
              
              <div className="space-y-5 md:space-y-8">
                {[
                  { s: "01", t: "Engineering Flow", d: "Wire → Heading → Threading → Stock → Heat Treat → Plating → Packing → Dispatch.", i: <Settings /> },
                  { s: "02", t: "Verification Trigger", d: "Order/PI is printed and handed to the packing floor before a single box moves.", i: <FileCheck /> },
                  { s: "03", t: "Mandatory QC Sign-off", d: "Size, grade, and quantity are verified against the PI. Sign-off is non-negotiable.", i: <ClipboardCheck /> },
                  { s: "04", t: "Third-Party Cross-Check", d: "Dedicated validator audits the shipment independently before billing.", i: <Users /> },
                  { s: "05", t: "Final Confirmation", d: "Billing team verifies physical stock. LR and transport details shared instantly.", i: <Truck /> },
                ].map((step, i) => (
                  <FadeInView key={i} delay={0.1 * i} direction="left">
                    <div className="group flex flex-col sm:flex-row gap-5 md:gap-8 p-6 md:p-8 rounded-[2rem] bg-[#0a0a0a]/50 border border-white/[0.04] hover:bg-[#111]/80 hover:border-amber-500/30 transition-all duration-700 ease-[0.16,1,0.3,1] relative backdrop-blur-xl shadow-lg hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[#050505] border border-white/[0.08] flex items-center justify-center text-3xl md:text-4xl font-['Bebas_Neue'] text-amber-500/30 group-hover:text-amber-500 group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-700 ease-[0.16,1,0.3,1] z-10 relative">
                        {step.s}
                        <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-[2px] bg-gradient-to-r from-amber-500 to-transparent hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-xl md:text-2xl font-['Bebas_Neue'] mb-3 tracking-widest uppercase text-white group-hover:text-amber-400 transition-colors duration-500 flex items-center gap-3">
                          {step.t}
                        </h4>
                        <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.1em] leading-[1.6]">{step.d}</p>
                      </div>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 07 THE ADVANTAGE: COMPARISON --- */}
        <section className="py-24 md:py-40 px-6 bg-[#040404] border-y border-white/[0.03] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-emerald-500/[0.03] via-transparent to-red-500/[0.03] blur-[100px] pointer-events-none mix-blend-screen" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
             <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
                <FadeInView>
                  <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">06 // THE ADVANTAGE</div>
                  <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-none uppercase mb-12 drop-shadow-2xl tracking-tight">Why Choose <br/><span className="text-amber-500 italic">DFPL.</span></h2>
                  <div className="inline-flex items-center gap-3 py-4 px-8 md:py-5 md:px-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-xs shadow-[0_15px_30px_rgba(245,158,11,0.3)] hover:scale-105 hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)] transition-all duration-700 ease-[0.16,1,0.3,1]">
                    <Zap size={16} className="animate-pulse" /> Delivering 10x value for every Rupee
                  </div>
                </FadeInView>
                
                <FadeInView delay={0.2} direction="left">
                  <div className="grid gap-px bg-white/[0.05] border border-white/[0.08] overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                     <div className="bg-[#0a0a0a]/90 p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.05] blur-[50px] rounded-full group-hover:bg-emerald-500/[0.08] transition-colors duration-1000" />
                        <h4 className="text-white font-['Bebas_Neue'] text-2xl md:text-3xl mb-10 flex items-center gap-4 relative z-10 tracking-widest">
                          <CheckCircle className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" size={28} strokeWidth={2} /> The DFPL Standard
                        </h4>
                        <ul className="space-y-6 relative z-10">
                          {["360° Continuous Daily Improvement", "Unified Quality, Packing & Service", "Zero-Exception QC Stage-wise", "Advanced R&D for New Tech"].map((li, i) => (
                            <li key={i} className="flex items-center gap-5 text-sm md:text-base text-slate-200 font-medium">
                               <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.6)]" /> {li}
                            </li>
                          ))}
                        </ul>
                     </div>
                     <div className="bg-[#050505]/95 p-8 md:p-12 relative group transition-all duration-700">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-900/[0.05] blur-[50px] rounded-full group-hover:bg-red-900/[0.1] transition-colors duration-1000" />
                        <h4 className="text-zinc-500 group-hover:text-zinc-300 font-['Bebas_Neue'] text-2xl md:text-3xl mb-10 flex items-center gap-4 transition-colors duration-500 relative z-10 tracking-widest">
                          <XCircle className="text-red-900/50 group-hover:text-red-500 transition-colors duration-500" size={28} strokeWidth={2} /> Market Gaps
                        </h4>
                        <ul className="space-y-6 italic text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500 relative z-10">
                          {["No structured QC systems", "Fragmented service & poor reach", "Engineering treated as hardware", "Stagnant product development"].map((li, i) => (
                            <li key={i} className="flex items-center gap-5 text-sm md:text-base font-light">
                               <span className="w-2.5 h-2.5 bg-zinc-800 group-hover:bg-red-900/50 transition-colors duration-500 rounded-sm shrink-0" /> {li}
                            </li>
                          ))}
                        </ul>
                     </div>
                  </div>
                </FadeInView>
             </div>
          </div>
        </section>

        {/* --- 08 CAPABILITIES: SPEC SHEET --- */}
        <section className="py-24 md:py-40 px-6 bg-[#020202]">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 md:gap-20 items-center">
            <div className="lg:col-span-5">
              <FadeInView>
                <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">07 // CAPABILITIES</div>
                <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-none uppercase mb-16 tracking-tight">Scale & <br/><span className="text-amber-500 italic pr-4">Service.</span></h2>
                <div className="space-y-2">
                  {[
                    { l: "MAX ORDER CAPACITY", v: "3,000 Cartons / 100 Tons" },
                    { l: "CUSTOM PRODUCTION", v: "1,000 Cartons / 25–30 Tons" },
                    { l: "TRANSACTION RANGE", v: "₹1 Lakh – ₹1 Crore" },
                    { l: "MONTHLY THROUGHPUT", v: "30 – 150 Orders" },
                  ].map((cap, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/[0.06] py-6 group hover:border-amber-500/50 transition-colors duration-500 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="text-[9px] md:text-[10px] font-['Space_Mono'] text-zinc-500 group-hover:text-amber-400 transition-colors duration-500 mb-2 sm:mb-0 tracking-[0.15em] relative z-10">{cap.l}</span>
                      <span className="text-2xl md:text-3xl font-['Bebas_Neue'] text-white group-hover:tracking-wide transition-all duration-500 ease-[0.16,1,0.3,1] relative z-10">{cap.v}</span>
                    </div>
                  ))}
                </div>
              </FadeInView>
            </div>
            
            <div className="lg:col-span-7">
               <FadeInView delay={0.2} direction="left">
                 <div className="bg-[#0a0a0a]/80 p-10 md:p-16 rounded-[2.5rem] border border-white/[0.04] relative overflow-hidden backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] group">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute top-0 left-10 md:left-16 w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                    <h4 className="text-3xl md:text-4xl font-['Bebas_Neue'] tracking-[0.1em] mb-12 border-l-4 border-amber-500/50 pl-6 uppercase text-white relative z-10">Industries We Serve</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 relative z-10">
                      {[
                        { t: "OEM Mfrs", i: <Factory /> },
                        { t: "Wholesale", i: <Briefcase /> },
                        { t: "Turnkey", i: <Settings /> },
                        { t: "PEB Structs", i: <Building2 /> },
                        { t: "POP Agencies", i: <Layers /> },
                        { t: "Construction", i: <HardHat /> },
                      ].map((ind, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-4 group/icon cursor-default">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-zinc-500 group-hover/icon:bg-gradient-to-br group-hover/icon:from-amber-400 group-hover/icon:to-amber-600 group-hover/icon:text-black group-hover/icon:border-amber-400 group-hover/icon:shadow-[0_10px_30px_rgba(245,158,11,0.4)] group-hover/icon:-translate-y-1 transition-all duration-500 ease-[0.16,1,0.3,1]">
                             {React.cloneElement(ind.i as React.ReactElement, { size: 28, strokeWidth: 1.5 })}
                          </div>
                          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-zinc-500 group-hover/icon:text-white uppercase transition-colors duration-300">{ind.t}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-16 pt-8 border-t border-white/[0.06] text-[10px] md:text-xs text-amber-500/80 uppercase tracking-[0.2em] font-['Space_Mono'] text-center relative z-10">
                      Structural backbone for India's growing infrastructure.
                    </div>
                 </div>
               </FadeInView>
            </div>
          </div>
        </section> 

        {/* --- 09 GEOGRAPHY & 10 TEAM: MAP CARDS --- */}
        <section className="py-24 md:py-40 bg-[#000000] border-t border-white/[0.03]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-32 md:mb-48">
              {[
                { l: "Factory Unit", loc: "Ravki Makhavad, Rajkot", i: <Factory /> },
                { l: "Head Office", loc: "Rajkot, Gujarat", i: <MapPin /> },
                { l: "Branch & Warehouse", loc: "Surat, Gujarat", i: <Boxes /> },
              ].map((site, i) => (
                <FadeInView key={i} delay={0.1 * i}>
                  <div className="p-10 md:p-12 rounded-[2.5rem] bg-[#0a0a0a]/50 border border-white/[0.04] hover:border-amber-500/30 hover:bg-[#111]/80 backdrop-blur-2xl transition-all duration-700 ease-[0.16,1,0.3,1] h-full group relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-xl">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
                    <div className="absolute -right-8 -bottom-8 text-white/[0.01] group-hover:text-amber-500/[0.03] group-hover:scale-110 transition-all duration-1000 ease-out">
                       {React.cloneElement(site.i as React.ReactElement, { size: 200 })}
                    </div>
                    <div className="text-amber-500 mb-12 w-16 h-16 flex items-center justify-center bg-amber-500/[0.08] rounded-xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black group-hover:shadow-[0_10px_20px_rgba(245,158,11,0.3)] transition-all duration-700 ease-[0.16,1,0.3,1] relative z-10 border border-amber-500/20">
                       {React.cloneElement(site.i as React.ReactElement, { size: 28, strokeWidth: 1.5 })}
                    </div>
                    <div className="relative z-10">
                       <div className="text-[9px] md:text-[10px] font-bold text-zinc-500 group-hover:text-amber-400 mb-3 uppercase tracking-[0.2em] transition-colors duration-500">{site.l}</div>
                       <div className="text-3xl md:text-4xl font-['Bebas_Neue'] text-white leading-[1.1]">{site.loc}</div>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <FadeInView>
                <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">08 // HUMAN CAPITAL</div>
                <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] leading-none uppercase mb-12 tracking-tight">The Power Of <br/><span className="text-amber-500 italic pr-4">Ownership.</span></h2>
                <div className="space-y-8 md:space-y-10 text-lg md:text-xl font-light text-slate-300 leading-[1.5]">
                  <p>DFPL operates with a professional force of <span className="text-white font-semibold underline decoration-amber-500/50 hover:decoration-amber-500 transition-colors duration-300 underline-offset-8">25 experts</span>. We have eliminated the "single point of failure" by empowering every member to own their process.</p>
                  <p className="border-l-[2px] border-white/10 pl-6 text-slate-400 py-2 text-base md:text-lg">Our commitment: meaningful employment with <span className="text-white italic">Professionalism, Respect, and Absolute Fairness.</span></p>
                </div>
              </FadeInView>
              
              <div className="relative flex justify-center lg:justify-end">
                <FadeInView direction="left">
                  <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-[3rem] bg-gradient-to-br from-[#111] to-black border border-white/[0.06] flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out" />
                    <Users size={140} className="text-white/[0.015] group-hover:text-amber-500/[0.05] group-hover:scale-125 transition-all duration-1000 ease-[0.16,1,0.3,1] absolute" strokeWidth={0.5} />
                    <div className="text-[8rem] md:text-[12rem] font-['Bebas_Neue'] leading-none text-white z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-amber-500 transition-all duration-1000 drop-shadow-xl tracking-tighter">25</div>
                    <div className="font-['Space_Mono'] text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-amber-500 uppercase -mt-4 relative z-20 font-bold bg-black/60 px-5 py-2 rounded-full backdrop-blur-xl border border-amber-500/20">Active Professionals</div>
                  </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* --- 11 ROADMAP: FINANCIAL TICKER --- */}
        <section className="py-24 md:py-40 bg-[#040404] border-y border-white/[0.03] relative">
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
          
          <div className="max-w-[1400px] mx-auto px-6">
            <FadeInView>
              <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] text-center uppercase mb-20 md:mb-28 tracking-tighter drop-shadow-xl">Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 italic pr-2">Roadmap.</span></h2>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
                {/* Connecting Line Desktop */}
                <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/[0.04] -z-10 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.02)]" />
                
                {[
                  { y: "2025-26", v: "₹5.12 Cr", l: "CURRENT TURNOVER", s: "Active", c: "border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]", glow: "from-emerald-500/5" },
                  { y: "2026-27", v: "₹10 Cr", l: "SCALING TARGET", s: "Projected", c: "border-amber-500 text-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]", glow: "from-amber-500/5" },
                  { y: "2030", v: "₹30 Cr", l: "SME IPO VISION", s: "Vision", c: "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]", glow: "from-blue-500/5" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-[2rem] bg-[#0a0a0a]/80 backdrop-blur-3xl p-8 md:p-12 group hover:bg-[#111] transition-all duration-700 ease-[0.16,1,0.3,1] relative overflow-hidden border border-white/[0.05] shadow-xl hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]`}>
                    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${item.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`} />
                    <div className="absolute -top-4 -right-4 text-4xl md:text-6xl font-['Bebas_Neue'] text-white/[0.02] group-hover:text-white/[0.06] transition-colors duration-700 pointer-events-none leading-none">{item.y}</div>
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="text-[9px] md:text-[10px] font-bold text-zinc-500 mb-6 tracking-[0.2em] uppercase">{item.l}</div>
                      <div className="text-4xl md:text-5xl font-['Bebas_Neue'] mb-8 text-white group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] drop-shadow-md">{item.v}</div>
                      <div className={`inline-block px-5 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border ${item.c} backdrop-blur-sm`}>
                        {item.s}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* --- 12/13 MISSION & VALUES: PHILOSOPHY --- */}
        <section className="py-24 md:py-40 px-6 bg-[#020202]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 mb-32 md:mb-48">
              <FadeInView>
                <div className="p-10 md:p-14 rounded-[2.5rem] bg-[#0a0a0a]/60 border border-white/[0.04] h-full relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="font-['Space_Mono'] text-amber-500 text-[10px] mb-8 uppercase tracking-[0.2em] relative z-10">09 // MISSION</div>
                  <h3 className="text-5xl md:text-6xl font-['Bebas_Neue'] mb-10 uppercase tracking-tight leading-[0.9] text-white relative z-10">To Give The <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 pr-2">Best.</span></h3>
                  <p className="text-lg md:text-xl font-light text-slate-300 leading-[1.5] italic border-l-[2px] border-white/10 pl-6 relative z-10">
                    Improve every single day, across every department and every person in the organization.
                  </p>
                </div>
              </FadeInView>
              <FadeInView delay={0.2}>
                <div className="p-10 md:p-14 rounded-[2.5rem] bg-[#0a0a0a]/60 border border-white/[0.04] h-full relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                  <div className="absolute top-0 right-0 w-2 h-full bg-white/20" />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="font-['Space_Mono'] text-amber-500 text-[10px] mb-8 uppercase tracking-[0.2em] relative z-10">10 // VISION</div>
                  <h3 className="text-5xl md:text-6xl font-['Bebas_Neue'] mb-10 uppercase tracking-tight leading-[0.9] text-white relative z-10">IPO Bound <br/><span className="text-white italic pr-2 opacity-40">2030.</span></h3>
                  <p className="text-lg md:text-xl font-light text-slate-300 leading-[1.5] relative z-10">
                    DFPL aims to list on SME IPO by 2030 and Graduate to Main Board by 2036. Building India's most trusted fastener brand.
                  </p>
                </div>
              </FadeInView>
            </div>

            <FadeInView>
              <div className="text-center mb-16 md:mb-20">
                <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.5em] text-zinc-500 uppercase border border-zinc-800 rounded-full px-8 py-3 bg-white/[0.02] backdrop-blur-sm">Our Core Architecture</span>
              </div>
              {/* Modern Bento Grid for Values */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {[
                  { t: "Quality First", d: "Zero compromise.", i: <ShieldCheck />, span: "col-span-2 md:col-span-1 lg:col-span-1" },
                  { t: "Absolute Ethics", d: "Words are sacred.", i: <Scale />, span: "col-span-1" },
                  { t: "10x Value", d: "Exceed investment.", i: <Zap />, span: "col-span-1" },
                  { t: "Human Touch", d: "People before profit.", i: <Users />, span: "col-span-1" },
                  { t: "Sacred Brand", d: "Protect the trust.", i: <Award />, span: "col-span-2 md:col-span-1 lg:col-span-1" },
                ].map((val, i) => (
                  <div key={i} className={`rounded-[2rem] bg-[#0a0a0a]/60 border border-white/[0.04] p-8 text-center hover:bg-[#111] hover:border-amber-500/30 transition-all duration-700 ease-[0.16,1,0.3,1] group flex flex-col items-center justify-center backdrop-blur-xl shadow-lg hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 ${val.span}`}>
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#050505] flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-black transition-all duration-700 ease-[0.16,1,0.3,1] shadow-md border border-white/[0.05] group-hover:border-transparent">{React.cloneElement(val.i as React.ReactElement, { strokeWidth: 1.5, size: 24 })}</div>
                    <h5 className="text-xl md:text-2xl font-['Bebas_Neue'] mb-3 tracking-widest uppercase text-white group-hover:text-amber-400 transition-colors duration-500">{val.t}</h5>
                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-bold tracking-[0.15em]">{val.d}</p>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* --- FINAL CLOSURE: FOUNDER SIGNATURE --- */}
        <section className="py-40 md:py-64 px-6 relative overflow-hidden bg-[#000000] text-center border-t border-white/[0.03]">
           <div className="max-w-5xl mx-auto relative z-10">
             <FadeInView blur={false}>
               <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-amber-500/20 bg-amber-500/[0.03] mx-auto mb-12 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.1)] backdrop-blur-xl relative group">
                 <div className="absolute inset-0 rounded-full border-t border-amber-500/50 animate-[spin_4s_linear_infinite]" />
                 <Quote className="text-amber-500/80 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" size={36} />
               </div>
               <h2 className="text-2xl md:text-4xl lg:text-5xl font-light italic leading-[1.5] md:leading-[1.4] mb-20 text-slate-200 font-['Barlow'] tracking-tight max-w-4xl mx-auto px-4">
                 "If we said 5 days — you will have it in 4. We have <span className="text-white font-medium not-italic relative inline-block"><span className="relative z-10 px-2">never missed a commitment</span><span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-amber-500/30 -z-10 rounded-sm skew-x-[-10deg]"></span></span> in 8 years. And we never will."
               </h2>
               <div className="space-y-4 md:space-y-6">
                 <div className="text-5xl md:text-7xl font-['Bebas_Neue'] tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] leading-none">Vipul Sakariya</div>
                 <div className="text-[9px] md:text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] bg-amber-500/10 w-fit mx-auto px-6 py-2 rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-sm">Founder & Visionary, DFPL</div>
               </div>
             </FadeInView>
           </div>
           
           {/* Cinematic Ambient Background */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/[0.08] via-zinc-950 to-[#000000] pointer-events-none mix-blend-screen" />
           <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-amber-500/[0.03] to-transparent pointer-events-none" />
        </section>

        {/* --- CUSTOM CSS FOR STROKE TEXT & SMOOTHNESS --- */}
        <style dangerouslySetInnerHTML={{ __html: `
          html {
            scroll-behavior: smooth;
            background-color: #000;
          }
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #000;
          }
          .border-text {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.25);
            color: transparent;
          }
          @media (max-width: 768px) {
            .border-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.35); }
          }
          ::selection {
            background-color: #f59e0b;
            color: #000;
          }
          /* Custom scrollbar for premium feel */
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: #050505; 
          }
          ::-webkit-scrollbar-thumb {
            background: #27272a; 
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #f59e0b; 
          }
        `}} />
      </div>
    </HelmetProvider>
  );
};

export default About;
