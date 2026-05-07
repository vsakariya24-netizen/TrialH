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
  
  const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset, filter: blur ? 'blur(12px)' : 'none' }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, filter: blur ? 'blur(0px)' : 'none' } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
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
    <span ref={ref} className="font-['Space_Mono'] bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
      {prefix}{display.toLocaleString(undefined, { minimumFractionDigits: value.toString().includes('.') ? 2 : 0, maximumFractionDigits: 2 })}{suffix}
    </span>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <HelmetProvider>
      <div ref={containerRef} className="bg-[#020202] min-h-screen text-[#E2E4E9] font-['Barlow'] overflow-x-hidden selection:bg-amber-500 selection:text-black">
        <Helmet>
          <title>The DFPL Story | Durable Fastener Pvt. Ltd.</title>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@100;300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        </Helmet>

        {/* --- GLOBAL UI ELEMENTS --- */}
        <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 z-[100] origin-left shadow-[0_0_20px_rgba(245,158,11,0.5)]" style={{ scaleX }} />
        
        {/* --- DYNAMIC INDUSTRIAL GRID & LIGHTING --- */}
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04]" 
             style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none z-[1] rounded-full mix-blend-screen" />

        {/* --- HERO: THE MACHINE --- */}
        <section className="relative h-[100dvh] flex items-center justify-center px-6 overflow-hidden">
          <motion.div style={{ y: bgY, opacity: heroOpacity }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
             <h1 className="text-[35vw] font-['Bebas_Neue'] whitespace-nowrap text-white/[0.015] select-none tracking-tighter">DURABLE</h1>
          </motion.div>

          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="max-w-7xl mx-auto w-full z-10 relative">
            <FadeInView>
              <div className="flex items-center gap-6 mb-8 lg:mb-12">
                <span className="w-20 h-[1px] bg-gradient-to-r from-amber-500 to-transparent" />
                <span className="font-['Space_Mono'] text-amber-500 text-xs md:text-sm tracking-[0.4em] uppercase font-bold">Est. 2018 // Industrial Excellence</span>
              </div>
              <h1 className="text-[clamp(4.5rem,14vw,14rem)] font-['Bebas_Neue'] leading-[0.75] uppercase tracking-tighter mb-12 drop-shadow-2xl">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600 inline-block drop-shadow-[0_0_40px_rgba(245,158,11,0.3)] pb-4">Integrity.</span> <br />
                <span className="text-transparent border-text opacity-50 block mt-2">Built To Last.</span>
              </h1>
            </FadeInView>

            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 xl:col-span-6">
                <FadeInView delay={0.4}>
                  <p className="text-2xl md:text-4xl font-light leading-[1.2] text-slate-300 border-l-[3px] border-amber-500 pl-8 md:pl-10 relative">
                    <span className="absolute -left-[1.5px] top-0 w-[3px] h-1/3 bg-amber-300 blur-[2px]" />
                    Defining the future of fasteners through <span className="text-white font-semibold">system-driven reliability</span> and unyielding industrial grit.
                  </p>
                </FadeInView>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}
             className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-2 font-['Space_Mono'] text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.3em]">
            <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"/> Lat: 22.3039° N</span>
            <span className="pl-4">Long: 70.8022° E</span>
          </motion.div>
        </section>

        {/* --- 01 THE GENESIS: ARCHITECTURAL VIEW --- */}
        <section className="py-40 md:py-60 px-6 relative z-10 border-t border-white/[0.05] bg-gradient-to-b from-zinc-950/80 to-[#020202] backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-5 relative">
              <div className="sticky top-40">
                <FadeInView direction="right">
                  <div className="inline-flex items-center gap-3 font-['Space_Mono'] text-amber-500 text-xs tracking-[0.3em] uppercase mb-8 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" /> 01 // THE GENESIS
                  </div>
                  <h2 className="text-7xl md:text-[9rem] font-['Bebas_Neue'] leading-[0.85] uppercase mb-12 text-white">
                    Who <br/><span className="text-amber-500 italic pr-4">We Are.</span>
                  </h2>
                  <div className="relative group overflow-hidden rounded-3xl border border-white/10 aspect-square bg-zinc-900/50 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000">
                      <Factory size={180} strokeWidth={0.5} className="text-white group-hover:text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                  </div>
                </FadeInView>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-16 md:space-y-24 pt-10 lg:pt-32">
              <FadeInView delay={0.2}>
                <div className="space-y-12">
                  <div className="p-10 md:p-14 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-2xl border border-white/5 rounded-3xl relative shadow-2xl group hover:border-white/10 transition-colors">
                    <div className="absolute -top-4 -left-2 md:-left-6 px-6 py-2 bg-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.4)]">Founded 29th Aug 2018</div>
                    <p className="text-2xl md:text-4xl font-light text-slate-200 leading-[1.4]">
                      Durable Fastener Pvt. Ltd. (DFPL) was founded by <span className="text-white font-semibold italic underline decoration-amber-500/50 hover:decoration-amber-500 transition-colors underline-offset-8">Mr. Vipul Sakariya</span> with a singular, unyielding purpose: to bridge the gap between heavy-duty manufacturing and professional, system-driven service.
                    </p>
                  </div>
                  <p className="text-xl md:text-3xl font-light text-slate-400 pl-8 md:pl-12 border-l border-amber-500/30 leading-relaxed">
                    Operating from Rajkot — India’s industrial nerve center — we have engineered a company built on reliable systems and a deep commitment to customer satisfaction. We don't just supply fasteners; we engineer the integrity of your structures.
                  </p>
                </div>
              </FadeInView>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {[
                  { icon: <MapPin size={32} />, title: "The Factory", sub: "Ravki Makhavad, Rajkot, Gujarat", label: "LOG_COORD: RAJKOT_GUJ_IND" },
                  { icon: <Globe size={32} />, title: "Global Presence", sub: "Surat Branch & Warehouse Serving Pan-India", label: "LOG_DIST: PAN_INDIA" }
                ].map((item, idx) => (
                  <FadeInView key={idx} delay={0.1 * idx}>
                    <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-800/40 backdrop-blur-md transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-5 font-['Space_Mono'] text-[9px] text-zinc-500 bg-black/20 rounded-bl-2xl">{item.label}</div>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-amber-500/10 transition-all duration-500">{item.icon}</div>
                      <h4 className="text-3xl md:text-4xl font-['Bebas_Neue'] mb-3 tracking-wide text-white group-hover:text-amber-400 transition-colors">{item.title}</h4>
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">{item.sub}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 02 THE STORY: CINEMATIC QUOTE --- */}
        <section className="py-40 md:py-60 px-6 relative overflow-hidden bg-[#020202]">
          {/* Ambient Quote Background */}
          <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] w-[80vw] h-[80vw] pointer-events-none" strokeWidth={0.5} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <FadeInView>
              <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 uppercase tracking-[0.3em] flex justify-center lg:justify-start">02 // THE ORIGIN</div>
              <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-[0.85] uppercase mb-20 text-center lg:text-left drop-shadow-lg">
                The Story <br/><span className="text-amber-500 italic pr-4">Behind DFPL.</span>
              </h2>
            </FadeInView>

            <div className="grid lg:grid-cols-12 gap-16 md:gap-20 items-center">
              <div className="lg:col-span-8">
                <FadeInView>
                  <div className="relative mb-24 group">
                    <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-transparent rounded-full" />
                    <p className="text-3xl md:text-5xl font-light text-slate-200 italic leading-[1.3] relative z-10">
                      Before founding DFPL, <span className="font-semibold text-amber-500 not-italic">Mr. Vipul Sakariya</span> witnessed firsthand the friction of poor workplace systems and the lack of accountability in the industry.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:bg-zinc-900/60 transition-colors">
                      <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      <h4 className="text-amber-500 font-['Bebas_Neue'] text-3xl md:text-4xl mb-5 tracking-widest uppercase">The Market Gap</h4>
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed">Manufacturers in Rajkot produced quality fasteners but lacked structured sales and QC. Mr. Sakariya saw them as <span className="text-white font-medium">precision-engineered mechanical products</span>, not just hardware.</p>
                    </div>
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:bg-zinc-900/60 transition-colors">
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                      <h4 className="text-white font-['Bebas_Neue'] text-3xl md:text-4xl mb-5 tracking-widest uppercase">The Dual Purpose</h4>
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed">Built to ensure neither employees nor customers faced systemic failures. The goal: <span className="text-white font-medium">one-day dispatch system</span> backed by rigorous QC.</p>
                    </div>
                  </div>
                </FadeInView>
              </div>
              <div className="lg:col-span-4">
                <FadeInView direction="left" delay={0.3}>
                   <div className="relative">
                     <div className="absolute inset-0 bg-amber-500 blur-[60px] opacity-20 rounded-full" />
                     <div className="p-10 md:p-14 bg-gradient-to-br from-amber-400 to-amber-600 text-black rounded-[2.5rem] shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-700 relative z-10 border border-amber-300">
                        <Quote className="text-black/10 absolute top-6 left-6" size={80} />
                        <p className="text-2xl md:text-3xl font-bold italic leading-[1.3] mb-8 relative z-10">
                          "What we sell is not just a product — we sell a service. The screw is just the beginning."
                        </p>
                        <div className="h-1.5 w-16 bg-black/30 rounded-full" />
                     </div>
                   </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* --- 03 EVOLUTION: THE CRITICAL FAIL --- */}
        <section className="py-40 md:py-60 px-6 bg-[#000000] border-y border-white/[0.02] relative overflow-hidden">
          {/* Subtle Red Warning Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto relative z-10">
             <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
               <div className="lg:col-span-5">
                 <FadeInView>
                   <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">03 // THE EVOLUTION</div>
                   <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-[0.85] uppercase mb-12">The Early <br/><span className="text-amber-500 italic pr-4">Journey.</span></h2>
                   
                   {/* Terminal Style Glitch Card */}
                   <div className="p-8 md:p-12 rounded-3xl bg-black border border-red-500/30 relative group shadow-[0_0_40px_rgba(239,68,68,0.05)] overflow-hidden">
                      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                      <div className="absolute top-0 right-0 px-4 py-2 font-['Space_Mono'] text-[9px] bg-red-500/10 text-red-400 border-b border-l border-red-500/20 rounded-bl-xl tracking-widest">CRITICAL_LOG_2019</div>
                      
                      <div className="relative z-10">
                        <AlertTriangle className="text-red-500 mb-8 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" size={48} />
                        <h4 className="text-3xl md:text-4xl font-['Bebas_Neue'] mb-4 text-white tracking-widest">The ₹8 Lakh Rejection</h4>
                        <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed font-light">
                          A major 5,000kg order failed due to head-cutting. Investigation revealed: plywood density increases in winter.
                        </p>
                        <div className="flex items-center gap-3 text-emerald-400 font-bold text-xs md:text-sm uppercase tracking-widest bg-emerald-500/10 w-fit px-4 py-2 rounded-full border border-emerald-500/20">
                          <CheckCircle size={16} /> Pivot: Season-Aware QC Established
                        </div>
                      </div>
                   </div>
                 </FadeInView>
               </div>
               
               <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-0">
                 <FadeInView delay={0.2}>
                   <p className="text-2xl md:text-4xl font-light text-slate-300 mb-16 leading-[1.4]">
                     This moment shifted our focus to <span className="text-white italic font-medium relative inline-block"><span className="relative z-10">application engineering.</span><span className="absolute bottom-1 left-0 w-full h-3 bg-amber-500/30 -z-10 rounded-sm"></span></span> We analyzed international standards to build a system that accounts for material science and variables.
                   </p>
                   
                   {/* Bento Grid for Breakthroughs */}
                   <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 hover:bg-zinc-900 transition-all duration-500 group">
                        <History className="text-amber-500 mb-6 w-10 h-10 group-hover:scale-110 transition-transform" />
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.25em] mb-2">Breakthrough 01</div>
                        <div className="text-5xl md:text-6xl font-['Bebas_Neue'] text-white tracking-tight">120 Cartons</div>
                        <div className="text-xs font-['Space_Mono'] text-amber-500/70 mt-3 tracking-widest bg-amber-500/10 w-fit px-3 py-1 rounded-md">VALUED AT ₹5 LAKH</div>
                      </div>
                      <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 hover:bg-zinc-900 transition-all duration-500 group">
                        <TrendingUp className="text-amber-500 mb-6 w-10 h-10 group-hover:scale-110 transition-transform" />
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.25em] mb-2">Breakthrough 02</div>
                        <div className="text-5xl md:text-6xl font-['Bebas_Neue'] text-white tracking-tight">200 Cartons</div>
                        <div className="text-xs font-['Space_Mono'] text-amber-500/70 mt-3 tracking-widest bg-amber-500/10 w-fit px-3 py-1 rounded-md">VALUED AT ₹12 LAKH</div>
                      </div>
                      <div className="sm:col-span-2 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black flex items-center justify-between shadow-[0_10px_40px_rgba(245,158,11,0.2)]">
                        <div>
                           <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-80 mix-blend-overlay">Elite Early Partners</div>
                           <div className="text-3xl md:text-5xl font-['Bebas_Neue'] leading-none">Bhumi Associates & <br className="md:hidden"/>Ramdev Hardware</div>
                        </div>
                        <Award size={80} className="opacity-20 hidden sm:block mix-blend-overlay" />
                      </div>
                   </div>
                 </FadeInView>
               </div>
             </div>
          </div>
        </section>

        {/* --- 04 SYSTEMS: THE DASHBOARD GRID --- */}
        <section className="py-40 md:py-60 px-6 bg-[#030303] relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="max-w-7xl mx-auto">
            <FadeInView>
              <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase text-center">04 // TRANSFORMATION</div>
              <h2 className="text-7xl md:text-[11rem] font-['Bebas_Neue'] leading-[0.8] uppercase mb-20 md:mb-32 text-center text-white drop-shadow-2xl">
                From Resilience <br/><span className="text-amber-500 italic">To Systems.</span>
              </h2>
            </FadeInView>
            
            <div className="grid lg:grid-cols-12 gap-12 md:gap-16 mb-24 items-center">
               <div className="lg:col-span-7">
                  <FadeInView>
                    <p className="text-2xl md:text-5xl font-light text-slate-300 leading-[1.3]">
                      The 2020 lockdown was our <span className="text-white italic font-medium">Strategic Clarity</span> phase. We dismantled legacy operations and rebuilt around one truth: the market needed <span className="text-amber-500 font-semibold underline decoration-amber-500/40 hover:decoration-amber-500 transition-colors underline-offset-8">Speed and Reliability</span> above all else.
                    </p>
                  </FadeInView>
               </div>
               <div className="lg:col-span-5">
                  <FadeInView delay={0.2} direction="left">
                    <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/60 backdrop-blur-md border border-white/10 relative shadow-2xl group overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 to-amber-600" />
                      <Quote className="absolute top-4 right-4 text-white/[0.03] group-hover:scale-110 transition-transform duration-700" size={100} />
                      <p className="relative z-10 italic text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
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
                  <div className="h-full p-10 md:p-12 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-amber-500/40 hover:bg-zinc-900/80 backdrop-blur-sm transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-colors duration-500" />
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-zinc-800 text-amber-500 mb-10 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 shadow-lg">{React.cloneElement(item.icon as React.ReactElement, { size: 32 })}</div>
                      <h4 className="text-3xl md:text-4xl font-['Bebas_Neue'] mb-4 tracking-widest uppercase text-white group-hover:text-amber-400 transition-colors">{item.title}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed uppercase tracking-[0.15em] mt-4">{item.desc}</p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* --- 05 NUMBERS: THE STATS HUB --- */}
        <section className="py-40 md:py-60 bg-zinc-950 relative overflow-hidden border-y border-white/[0.05]">
          {/* Subtle Graphic Element */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0,transparent_50%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <FadeInView>
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-10 mb-20 gap-8">
                <h2 className="text-6xl md:text-8xl font-['Bebas_Neue'] uppercase leading-none">Our Numbers <br/><span className="text-amber-500">Speak.</span></h2>
                <div className="font-['Space_Mono'] text-xs text-zinc-500 uppercase tracking-widest">Real-Time Performance Metrics</div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-24">
                {[
                  { l: "On-Time Dispatch", v: 95, s: "%", i: <Truck size={24}/> },
                  { l: "Order Accuracy", v: 99, s: "%", i: <CheckCircle2 size={24}/> },
                  { l: "Repeat Customers", v: 92, s: "%", i: <Users size={24}/> },
                  { l: "Avg Response", v: "45", s: "m", i: <Timer size={24}/> },
                  { l: "Rejection Rate", v: 1.20, s: "%", i: <XCircle size={24}/> },
                  { l: "Turnover Cr", v: 5.12, p: "₹", i: <TrendingUp size={24}/> },
                ].map((stat, i) => (
                  <div key={i} className="group relative">
                    <div className="flex items-center gap-4 text-zinc-500 mb-6 group-hover:text-amber-500 transition-colors">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-amber-500/10 transition-colors">{stat.i}</div>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{stat.l}</span>
                    </div>
                    <div className="text-6xl md:text-7xl font-['Bebas_Neue'] text-white drop-shadow-md">
                      <RollingNumber value={stat.v} suffix={stat.s} prefix={stat.p} />
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
          <div className="absolute -bottom-20 md:-bottom-40 right-0 text-[15rem] md:text-[25rem] font-['Bebas_Neue'] text-white/[0.02] select-none uppercase pointer-events-none leading-none">PERFORMANCE</div>
        </section>

        {/* --- 06 THE PROTOCOL: SCHEMATIC FLOW --- */}
        <section className="py-40 md:py-60 px-6 bg-[#020202]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 md:gap-24 relative">
            <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
              <FadeInView direction="right">
                <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">05 // THE PROTOCOL</div>
                <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-[0.85] uppercase mb-10 text-white">Precision <br/><span className="text-amber-500 italic pr-4">Dispatch.</span></h2>
                <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed font-light">
                   In 8 years, we have achieved a <span className="text-white font-medium bg-white/10 px-2 py-1 rounded">0% error rate</span> in material accuracy. We never miss a deadline.
                </p>
                <div className="p-8 md:p-10 rounded-3xl bg-amber-500/5 border border-amber-500/20 text-lg text-amber-100/90 italic font-light leading-relaxed shadow-[0_0_30px_rgba(245,158,11,0.05)] backdrop-blur-sm">
                  <Quote className="text-amber-500/30 mb-4" size={32} />
                  "If wrong material is sent, DFPL covers 100% of replacement costs. If a delay occurs, we deliver before the deadline with 2 buffer days."
                </div>
              </FadeInView>
            </div>
            
            <div className="lg:col-span-7 relative">
              {/* Connecting Line */}
              <div className="absolute left-[39px] md:left-[49px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-amber-500 via-zinc-800 to-transparent hidden sm:block" />
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { s: "01", t: "Engineering Flow", d: "Wire → Heading → Threading → Stock → Heat Treat → Plating → Packing → Dispatch.", i: <Settings /> },
                  { s: "02", t: "Verification Trigger", d: "Order/PI is printed and handed to the packing floor before a single box moves.", i: <FileCheck /> },
                  { s: "03", t: "Mandatory QC Sign-off", d: "Size, grade, and quantity are verified against the PI. Sign-off is non-negotiable.", i: <ClipboardCheck /> },
                  { s: "04", t: "Third-Party Cross-Check", d: "Dedicated validator audits the shipment independently before billing.", i: <Users /> },
                  { s: "05", t: "Final Confirmation", d: "Billing team verifies physical stock. LR and transport details shared instantly.", i: <Truck /> },
                ].map((step, i) => (
                  <FadeInView key={i} delay={0.1 * i} direction="left">
                    <div className="group flex flex-col sm:flex-row gap-6 md:gap-10 p-8 md:p-10 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/80 hover:border-amber-500/30 transition-all duration-500 relative backdrop-blur-md">
                      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-4xl md:text-5xl font-['Bebas_Neue'] text-amber-500/40 group-hover:text-amber-500 group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500 z-10 relative">
                        {step.s}
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-[2px] bg-amber-500 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-2xl md:text-3xl font-['Bebas_Neue'] mb-3 tracking-widest uppercase text-white group-hover:text-amber-400 transition-colors flex items-center gap-4">
                          {step.t}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-400 uppercase tracking-[0.15em] leading-[1.6]">{step.d}</p>
                      </div>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 07 THE ADVANTAGE: COMPARISON --- */}
        <section className="py-40 md:py-60 px-6 bg-[#030303] border-y border-white/[0.05] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-emerald-500/5 via-transparent to-red-500/5 blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
             <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                <FadeInView>
                  <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">06 // THE ADVANTAGE</div>
                  <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-none uppercase mb-12 drop-shadow-xl">Why Choose <br/><span className="text-amber-500">DFPL.</span></h2>
                  <div className="inline-flex items-center gap-4 py-4 px-8 md:py-6 md:px-10 rounded-2xl bg-amber-500 text-black font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform duration-300">
                    <Zap size={20} className="animate-pulse" /> Delivering 10x value for every Rupee
                  </div>
                </FadeInView>
                
                <FadeInView delay={0.2} direction="left">
                  <div className="grid gap-px bg-white/10 border border-white/10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                     <div className="bg-zinc-900/90 backdrop-blur-xl p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full" />
                        <h4 className="text-white font-['Bebas_Neue'] text-3xl md:text-4xl mb-10 flex items-center gap-4 relative z-10">
                          <CheckCircle className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" size={32} /> The DFPL Standard
                        </h4>
                        <ul className="space-y-6 relative z-10">
                          {["360° Continuous Daily Improvement", "Unified Quality, Packing & Service", "Zero-Exception QC Stage-wise", "Advanced R&D for New Tech"].map((li, i) => (
                            <li key={i} className="flex items-center gap-5 text-base md:text-lg text-slate-200 font-medium">
                               <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> {li}
                            </li>
                          ))}
                        </ul>
                     </div>
                     <div className="bg-black/80 backdrop-blur-xl p-10 md:p-14 relative group transition-all duration-700">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-900/10 blur-[40px] rounded-full group-hover:bg-red-900/20 transition-colors" />
                        <h4 className="text-zinc-500 group-hover:text-zinc-300 font-['Bebas_Neue'] text-3xl md:text-4xl mb-10 flex items-center gap-4 transition-colors relative z-10">
                          <XCircle className="text-red-900/50 group-hover:text-red-500 transition-colors" size={32} /> Market Gaps
                        </h4>
                        <ul className="space-y-6 italic text-zinc-600 group-hover:text-zinc-400 transition-colors relative z-10">
                          {["No structured QC systems", "Fragmented service & poor reach", "Engineering treated as hardware", "Stagnant product development"].map((li, i) => (
                            <li key={i} className="flex items-center gap-5 text-base md:text-lg font-light">
                               <span className="w-2.5 h-2.5 bg-zinc-800 group-hover:bg-red-900/50 transition-colors rounded-sm shrink-0" /> {li}
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
        <section className="py-40 md:py-60 px-6 bg-[#020202]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-5">
              <FadeInView>
                <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">07 // CAPABILITIES</div>
                <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-none uppercase mb-16">Scale & <br/><span className="text-amber-500 italic pr-4">Service.</span></h2>
                <div className="space-y-1">
                  {[
                    { l: "MAX ORDER CAPACITY", v: "3,000 Cartons / 100 Tons" },
                    { l: "CUSTOM PRODUCTION", v: "1,000 Cartons / 25–30 Tons" },
                    { l: "TRANSACTION RANGE", v: "₹1 Lakh – ₹1 Crore" },
                    { l: "MONTHLY THROUGHPUT", v: "30 – 150 Orders" },
                  ].map((cap, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/10 py-6 md:py-8 group hover:border-amber-500 transition-colors">
                      <span className="text-xs font-['Space_Mono'] text-zinc-500 group-hover:text-amber-400 transition-colors mb-2 sm:mb-0 tracking-widest">{cap.l}</span>
                      <span className="text-3xl md:text-5xl font-['Bebas_Neue'] text-white group-hover:tracking-wide transition-all duration-300">{cap.v}</span>
                    </div>
                  ))}
                </div>
              </FadeInView>
            </div>
            
            <div className="lg:col-span-7">
               <FadeInView delay={0.2} direction="left">
                 <div className="bg-zinc-900/40 p-10 md:p-16 rounded-[2.5rem] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                    <div className="absolute top-0 left-10 md:left-16 w-16 h-1 bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                    <h4 className="text-4xl md:text-5xl font-['Bebas_Neue'] tracking-[0.15em] mb-12 md:mb-16 border-l-4 border-amber-500/50 pl-6 uppercase text-white">Industries We Serve</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 relative z-10">
                      {[
                        { t: "OEM Mfrs", i: <Factory /> },
                        { t: "Wholesale", i: <Briefcase /> },
                        { t: "Turnkey", i: <Settings /> },
                        { t: "PEB Structs", i: <Building2 /> },
                        { t: "POP Agencies", i: <Layers /> },
                        { t: "Construction", i: <HardHat /> },
                      ].map((ind, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-4 group cursor-default">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all duration-500">
                             {React.cloneElement(ind.i as React.ReactElement, { size: 32 })}
                          </div>
                          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-zinc-500 group-hover:text-white uppercase transition-colors">{ind.t}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-white/10 text-xs md:text-sm text-amber-500/70 uppercase tracking-[0.2em] font-['Space_Mono'] text-center">
                      Structural backbone for India's growing infrastructure.
                    </div>
                 </div>
               </FadeInView>
            </div>
          </div>
        </section> 

        {/* --- 09 GEOGRAPHY & 10 TEAM: MAP CARDS --- */}
        <section className="py-40 md:py-60 bg-[#000000] border-t border-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-40 md:mb-60">
              {[
                { l: "Factory Unit", loc: "Ravki Makhavad, Rajkot", i: <Factory /> },
                { l: "Head Office", loc: "Rajkot, Gujarat", i: <MapPin /> },
                { l: "Branch & Warehouse", loc: "Surat, Gujarat", i: <Boxes /> },
              ].map((site, i) => (
                <FadeInView key={i} delay={0.1 * i}>
                  <div className="p-10 md:p-12 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-amber-500/30 hover:bg-zinc-900/60 backdrop-blur-md transition-all duration-700 h-full group relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                    <div className="absolute -right-10 -bottom-10 text-white/[0.015] group-hover:text-amber-500/[0.05] transition-colors duration-700">
                       {React.cloneElement(site.i as React.ReactElement, { size: 240 })}
                    </div>
                    <div className="text-amber-500 mb-12 w-16 h-16 flex items-center justify-center bg-amber-500/10 rounded-2xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-lg relative z-10">
                       {React.cloneElement(site.i as React.ReactElement, { size: 28 })}
                    </div>
                    <div className="relative z-10">
                       <div className="text-[10px] font-bold text-zinc-500 group-hover:text-amber-400 mb-3 uppercase tracking-[0.3em] transition-colors">{site.l}</div>
                       <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-white leading-none">{site.loc}</div>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
              <FadeInView>
                <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 tracking-[0.3em] uppercase">08 // HUMAN CAPITAL</div>
                <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-none uppercase mb-12">The Power Of <br/><span className="text-amber-500 italic pr-4">Ownership.</span></h2>
                <div className="space-y-8 md:space-y-10 text-xl md:text-2xl font-light text-slate-300 leading-relaxed">
                  <p>DFPL operates with a professional force of <span className="text-white font-semibold underline decoration-amber-500/50 hover:decoration-amber-500 transition-colors underline-offset-8">25 experts</span>. We have eliminated the "single point of failure" by empowering every member to own their process.</p>
                  <p className="border-l-2 border-white/20 pl-6 text-slate-400">Our commitment: meaningful employment with <span className="text-white italic">Professionalism, Respect, and Absolute Fairness.</span></p>
                </div>
              </FadeInView>
              
              <div className="relative flex justify-center lg:justify-end">
                <FadeInView direction="left">
                  <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.02)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Users size={160} className="text-white/[0.02] group-hover:text-amber-500/10 group-hover:scale-125 transition-all duration-1000 absolute" strokeWidth={0.5} />
                    <div className="text-[12rem] md:text-[18rem] font-['Bebas_Neue'] leading-none text-white z-10 group-hover:text-amber-500 transition-colors duration-700 drop-shadow-2xl tracking-tighter">25</div>
                    <div className="font-['Space_Mono'] text-xs md:text-sm tracking-[0.5em] md:tracking-[0.8em] text-amber-500 uppercase -mt-4 relative z-20 font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">Active Professionals</div>
                  </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* --- 11 ROADMAP: FINANCIAL TICKER --- */}
        <section className="py-40 md:py-60 bg-[#030303] border-y border-white/[0.05] relative">
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6">
            <FadeInView>
              <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] text-center uppercase mb-20 md:mb-32 tracking-tighter drop-shadow-lg">Financial <span className="text-amber-500 italic pr-4">Roadmap.</span></h2>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
                {/* Connecting Line Desktop */}
                <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-white/5 -z-10 -translate-y-1/2" />
                
                {[
                  { y: "2025-26", v: "₹5.12 Cr", l: "CURRENT TURNOVER", s: "Active", c: "border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]", glow: "from-emerald-500/5" },
                  { y: "2026-27", v: "₹10 Cr", l: "SCALING TARGET", s: "Projected", c: "border-amber-500 text-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]", glow: "from-amber-500/5" },
                  { y: "2030", v: "₹30 Cr", l: "SME IPO VISION", s: "Vision", c: "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]", glow: "from-blue-500/5" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-3xl bg-zinc-900/60 backdrop-blur-xl p-10 md:p-14 group hover:bg-zinc-900 transition-all duration-700 relative overflow-hidden border border-white/5 shadow-xl hover:-translate-y-2`}>
                    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${item.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                    <div className="absolute -top-4 -right-4 text-7xl md:text-8xl font-['Bebas_Neue'] text-white/[0.03] group-hover:text-white/[0.08] transition-colors pointer-events-none">{item.y}</div>
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="text-[10px] md:text-xs font-bold text-zinc-400 mb-6 tracking-[0.3em] uppercase">{item.l}</div>
                      <div className="text-6xl md:text-[5.5rem] font-['Bebas_Neue'] mb-10 text-white group-hover:text-white transition-colors drop-shadow-md">{item.v}</div>
                      <div className={`inline-block px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] border ${item.c}`}>
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
        <section className="py-40 md:py-60 px-6 bg-[#020202]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 md:gap-32 mb-40 md:mb-60">
              <FadeInView>
                <div className="p-10 md:p-14 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 h-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
                  <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 uppercase tracking-[0.3em]">09 // MISSION</div>
                  <h3 className="text-6xl md:text-7xl font-['Bebas_Neue'] mb-10 uppercase tracking-tight leading-none text-white">To Give The <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 pr-2">Best.</span></h3>
                  <p className="text-xl md:text-3xl font-light text-slate-300 leading-relaxed italic border-l-2 border-white/10 pl-6">
                    Improve every single day, across every department and every person in the organization.
                  </p>
                </div>
              </FadeInView>
              <FadeInView delay={0.2}>
                <div className="p-10 md:p-14 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-2 h-full bg-white/20" />
                  <div className="font-['Space_Mono'] text-amber-500 text-xs mb-8 uppercase tracking-[0.3em]">10 // VISION</div>
                  <h3 className="text-6xl md:text-7xl font-['Bebas_Neue'] mb-10 uppercase tracking-tight leading-none text-white">IPO Bound <br/><span className="text-white italic pr-2 opacity-50">2030.</span></h3>
                  <p className="text-xl md:text-3xl font-light text-slate-300 leading-relaxed">
                    DFPL aims to list on SME IPO by 2030 and Graduate to Main Board by 2036. Building India's most trusted fastener brand.
                  </p>
                </div>
              </FadeInView>
            </div>

            <FadeInView>
              <div className="text-center mb-16 md:mb-24">
                <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.6em] md:tracking-[0.8em] text-zinc-500 uppercase border border-zinc-800 rounded-full px-8 py-3 bg-white/[0.02]">Our Core Architecture</span>
              </div>
              {/* Modern Bento Grid for Values */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {[
                  { t: "Quality First", d: "Zero compromise.", i: <ShieldCheck />, span: "col-span-2 md:col-span-1 lg:col-span-1" },
                  { t: "Absolute Ethics", d: "Words are sacred.", i: <Scale />, span: "col-span-1" },
                  { t: "10x Value", d: "Exceed investment.", i: <Zap />, span: "col-span-1" },
                  { t: "Human Touch", d: "People before profit.", i: <Users />, span: "col-span-1" },
                  { t: "Sacred Brand", d: "Protect the trust.", i: <Award />, span: "col-span-2 md:col-span-1 lg:col-span-1" },
                ].map((val, i) => (
                  <div key={i} className={`rounded-3xl bg-zinc-900/40 border border-white/5 p-8 md:p-10 text-center hover:bg-zinc-800 hover:border-amber-500/30 transition-all duration-500 group flex flex-col items-center justify-center ${val.span}`}>
                    <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-lg">{val.i}</div>
                    <h5 className="text-2xl md:text-3xl font-['Bebas_Neue'] mb-3 tracking-widest uppercase text-white group-hover:text-amber-400 transition-colors">{val.t}</h5>
                    <p className="text-[9px] md:text-[10px] text-zinc-400 uppercase font-bold tracking-[0.2em]">{val.d}</p>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* --- FINAL CLOSURE: FOUNDER SIGNATURE --- */}
        <section className="py-60 md:py-80 px-6 relative overflow-hidden bg-[#000000] text-center border-t border-white/[0.05]">
           <div className="max-w-6xl mx-auto relative z-10">
             <FadeInView blur={false}>
               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-amber-500/20 bg-amber-500/5 mx-auto mb-16 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.1)]">
                 <Quote className="text-amber-500" size={40} />
               </div>
               <h2 className="text-3xl md:text-6xl lg:text-7xl font-light italic leading-[1.3] md:leading-[1.2] mb-24 text-slate-200 font-['Barlow'] tracking-tight max-w-5xl mx-auto">
                 "If we said 5 days — you will have it in 4. We have <span className="text-white font-semibold not-italic relative inline-block"><span className="relative z-10">never missed a commitment</span><span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-5 bg-amber-500/40 -z-10 rounded-sm skew-x-[-10deg]"></span></span> in 8 years. And we never will."
               </h2>
               <div className="space-y-4 md:space-y-6">
                 <div className="text-6xl md:text-8xl lg:text-9xl font-['Bebas_Neue'] tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-2xl">Vipul Sakariya</div>
                 <div className="text-[10px] md:text-xs text-amber-500 font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] bg-amber-500/10 w-fit mx-auto px-6 py-2 rounded-full border border-amber-500/20">Founder & Visionary, DFPL</div>
               </div>
             </FadeInView>
           </div>
           
           {/* Cinematic Ambient Background */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/10 via-zinc-950 to-[#000000] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />
        </section>

        {/* --- CUSTOM CSS FOR STROKE TEXT & SMOOTHNESS --- */}
        <style dangerouslySetInnerHTML={{ __html: `
          html {
            scroll-behavior: smooth;
          }
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .border-text {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
            color: transparent;
          }
          @media (max-width: 768px) {
            .border-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5); }
          }
          ::selection {
            background-color: #f59e0b;
            color: #000;
          }
        `}} />
      </div>
    </HelmetProvider>
  );
};

export default About;
