import React, { useRef } from 'react';
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

// --- Expert Component: Smooth Reveal ---
const MotionSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// --- Expert Component: Animated Counter ---
const RollingNumber = ({ value, suffix = "", prefix = "" }: { value: string | number, suffix?: string, prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value.toString());
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplay(end);
          clearInterval(timer);
        } else {
          setDisplay(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display.toLocaleString(undefined, { minimumFractionDigits: value.toString().includes('.') ? 2 : 0, maximumFractionDigits: 2 })}{suffix}
    </span>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <HelmetProvider>
      <div className="bg-[#08090A] min-h-screen text-[#E2E4E9] font-['Barlow'] selection:bg-amber-500 selection:text-black">
        <Helmet>
          <title>The DFPL Story | Durable Fastener Pvt. Ltd.</title>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@100;300;400;600;700&family=Barlow+Condensed:wght@700&family=Space+Mono&display=swap" rel="stylesheet" />
        </Helmet>

        {/* --- PROGRESS BAR --- */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-50 origin-left" style={{ scaleX }} />

        {/* --- INDUSTRIAL GRID OVERLAY --- */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20" 
             style={{ backgroundImage: `linear-gradient(#1a1c1e 1px, transparent 1px), linear-gradient(90deg, #1a1c1e 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full z-10">
            <MotionSection>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-amber-500" />
                <span className="font-mono text-amber-500 text-[10px] tracking-[0.4em] uppercase">Est. 2018 / Industrial Excellence</span>
              </div>
              <h1 className="text-[clamp(4rem,15vw,10rem)] font-['Bebas_Neue'] leading-[0.85] uppercase tracking-tighter">
                Engineering <br />
                <span className="text-amber-500 inline-block hover:italic transition-all duration-500">Integrity.</span> <br />
                <span className="text-transparent stroke-text opacity-30">Built To Last.</span>
              </h1>
            </MotionSection>

            <div className="mt-12 grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6">
                <MotionSection delay={0.2}>
                  <p className="text-xl md:text-3xl font-extralight leading-tight text-slate-400 border-l border-amber-500/50 pl-8">
                    Defining the future of fasteners through <span className="text-white font-medium">system-driven reliability</span> and unyielding industrial grit.
                  </p>
                </MotionSection>
              </div>
            </div>
          </div>
          
          {/* Background Text Decor */}
          <div className="absolute -right-20 bottom-0 text-[20vw] font-['Bebas_Neue'] text-white/[0.02] select-none leading-none">
            DURABLE
          </div>
        </section>

        {/* --- 01 THE GENESIS --- */}
        <section className="py-40 px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 sticky top-24 h-fit">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs tracking-widest mb-4">01 // THE GENESIS</div>
                <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-8">
                  Who <br/><span className="text-amber-500 italic">We Are.</span>
                </h2>
                <div className="relative group overflow-hidden border border-white/10 aspect-video bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Factory size={160} strokeWidth={0.5} className="text-white/5 group-hover:text-amber-500/20" />
                  </div>
                  <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-widest text-slate-500">
                    LOG_COORD: RAJKOT_GUJ_IND
                  </div>
                </div>
              </MotionSection>
            </div>
            
            <div className="lg:col-span-7 space-y-12">
              <MotionSection delay={0.1}>
                <div className="space-y-8 text-xl md:text-2xl font-light text-slate-300 leading-relaxed">
                  <p className="p-8 bg-zinc-900/50 border border-white/5 rounded-tr-3xl">
                    <span className="text-amber-500 font-bold block mb-4 text-sm tracking-widest uppercase">Founded 29th Aug 2018</span>
                    Durable Fastener Pvt. Ltd. (DFPL) was founded by <span className="text-white font-semibold italic">Mr. Vipul Sakariya</span> with a singular, unyielding purpose: to bridge the gap between heavy-duty manufacturing and professional, system-driven service.
                  </p>
                  <p className="pl-8">
                    Operating from Rajkot — India’s industrial nerve center — we have engineered a company built on reliable systems and a deep commitment to customer satisfaction. We don't just supply fasteners; we engineer the integrity of your structures.
                  </p>
                </div>
              </MotionSection>

              <div className="grid md:grid-cols-2 gap-6">
                <MotionSection delay={0.2}>
                  <div className="p-10 border border-white/10 hover:border-amber-500/50 transition-colors bg-zinc-900/30 group">
                    <MapPin className="text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-3xl font-['Bebas_Neue'] mb-2 tracking-wide">The Factory</h4>
                    <p className="text-xs uppercase tracking-widest text-slate-500">Ravki Makhavad, Rajkot, Gujarat</p>
                  </div>
                </MotionSection>
                <MotionSection delay={0.3}>
                  <div className="p-10 border border-white/10 hover:border-amber-500/50 transition-colors bg-zinc-900/30 group">
                    <Globe className="text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-3xl font-['Bebas_Neue'] mb-2 tracking-wide">Global Presence</h4>
                    <p className="text-xs uppercase tracking-widest text-slate-500">Surat Branch & Warehouse Serving Pan-India</p>
                  </div>
                </MotionSection>
              </div>
            </div>
          </div>
        </section>

        {/* --- 02 THE STORY --- */}
        <section className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase tracking-widest">02 // THE ORIGIN</div>
                <h2 className="text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-12">The Story <br/><span className="text-amber-500 italic">Behind DFPL.</span></h2>
                <div className="h-px w-24 bg-amber-500" />
              </MotionSection>
            </div>
            <div className="lg:col-span-8">
              <MotionSection>
                <div className="space-y-16">
                  <div className="relative pl-12 border-l-2 border-amber-500/20">
                    <Quote className="absolute -left-6 -top-10 text-amber-500/10" size={120} />
                    <p className="text-3xl md:text-4xl font-light text-slate-100 italic leading-tight">
                      Before founding DFPL, <span className="text-white font-bold">Mr. Vipul Sakariya</span> witnessed firsthand the friction of poor workplace systems and the lack of accountability in the industry.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12 text-slate-400 leading-relaxed">
                    <div className="group">
                      <h4 className="text-amber-500 font-['Bebas_Neue'] text-2xl mb-4 tracking-widest">The Market Gap</h4>
                      <p>Manufacturers in Rajkot produced quality fasteners but lacked structured sales and QC. Mr. Sakariya saw them as <span className="text-white">precision-engineered mechanical products</span>, not just hardware.</p>
                    </div>
                    <div className="group">
                      <h4 className="text-amber-500 font-['Bebas_Neue'] text-2xl mb-4 tracking-widest">The Dual Purpose</h4>
                      <p>Built to ensure neither employees nor customers faced systemic failures. The goal: <span className="text-white">one-day dispatch system</span> backed by rigorous QC.</p>
                    </div>
                  </div>
                  <div className="p-12 bg-amber-500/5 border border-amber-500/20 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[60px]" />
                    <p className="text-2xl italic font-extralight text-amber-50 relative z-10">
                      "What we sell is not just a product — we sell a service. The screw is just the beginning."
                    </p>
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </section>

        {/* --- 03 THE EVOLUTION & REJECTION CASE --- */}
        <section className="py-40 px-6 bg-[#0A0C0E]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase tracking-widest">03 // THE EVOLUTION</div>
                <h2 className="text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-12">The Early <br/><span className="text-amber-500 italic">Journey.</span></h2>
                
                <div className="p-10 bg-zinc-900 border border-red-500/20 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 font-mono text-[8px] bg-red-500/20 text-red-400">CRITICAL_LOG_2019</div>
                   <AlertTriangle className="text-red-500 mb-6" size={40} />
                   <h4 className="text-3xl font-['Bebas_Neue'] mb-4">The ₹8 Lakh Rejection</h4>
                   <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                     A major 5,000kg order failed due to head-cutting. Investigation revealed: plywood density increases in winter.
                   </p>
                   <div className="pt-6 border-t border-white/5 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
                     Pivot: Season-Aware QC Protocols Established
                   </div>
                </div>
              </MotionSection>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center lg:pl-16">
              <MotionSection>
                <p className="text-2xl text-slate-300 font-light mb-12 leading-relaxed">
                  This moment shifted our focus to <span className="text-white font-semibold italic">application engineering.</span> We analyzed international standards to build a system that accounts for material science and variables.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-8 bg-zinc-900/40 border border-white/5">
                    <History className="text-amber-500 mb-4" />
                    <div className="text-[10px] text-slate-500 uppercase mb-1">Breakthrough 01</div>
                    <div className="text-4xl font-['Bebas_Neue']">120 Cartons</div>
                    <div className="text-xs text-slate-600">VALUED AT ₹5 LAKH</div>
                  </div>
                  <div className="p-8 bg-zinc-900/40 border border-white/5">
                    <TrendingUp className="text-amber-500 mb-4" />
                    <div className="text-[10px] text-slate-500 uppercase mb-1">Breakthrough 02</div>
                    <div className="text-4xl font-['Bebas_Neue']">200 Cartons</div>
                    <div className="text-xs text-slate-600">VALUED AT ₹12 LAKH</div>
                  </div>
                  <div className="p-8 bg-amber-500 text-black sm:col-span-2 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-1">Elite Early Partners</div>
                      <div className="text-3xl font-['Bebas_Neue']">Bhumi Associates & Ramdev Hardware</div>
                    </div>
                    <Award size={40} className="opacity-20" />
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </section>

        {/* --- 04 SYSTEMS & COVID PIVOT --- */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <MotionSection>
              <div className="font-mono text-amber-500 text-xs mb-4 uppercase tracking-widest">04 // TRANSFORMATION</div>
              <h2 className="text-7xl md:text-9xl font-['Bebas_Neue'] leading-[0.85] uppercase mb-12">
                From Resilience <br/><span className="text-amber-500 italic">To Systems.</span>
              </h2>
              
              <div className="grid lg:grid-cols-12 gap-16 items-center mb-20">
                <div className="lg:col-span-7">
                  <p className="text-2xl text-slate-400 font-light leading-snug">
                    The 2020 lockdown was our <span className="text-white italic">Strategic Clarity</span> phase. We dismantled legacy operations and rebuilt around one truth: the market needed <span className="text-amber-500">Speed and Reliability</span> above all else.
                  </p>
                </div>
                <div className="lg:col-span-5 p-8 bg-zinc-900 border-l-4 border-amber-500 italic text-xl text-slate-300">
                  "We didn't just wait for the world to open; we prepared our systems to be the fastest to respond."
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  { title: "Quality Control", icon: <ShieldCheck />, desc: "QC at every stage—wire, heading, threading, heat treat—ensuring international standard compliance." },
                  { title: "Inventory & Dispatch", icon: <RefreshCw />, desc: "Real-time management via pro software. Floor stock matches system records for 1-day dispatch." },
                  { title: "Compliance & Ethics", icon: <Scale />, desc: "Strict adherence to regulations and financial systems since 2021. Built for multi-decade growth." }
                ].map((item, i) => (
                  <div key={i} className="p-10 bg-zinc-900/30 border border-white/5 hover:border-amber-500/30 transition-all group">
                    <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h4 className="text-3xl font-['Bebas_Neue'] mb-4 tracking-widest">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed uppercase tracking-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>
        </section>

        {/* --- 05 THE NUMBERS (DASHBOARD UX) --- */}
        <section className="py-40 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <MotionSection>
              <h2 className="text-6xl font-['Bebas_Neue'] uppercase mb-20">Our Numbers <span className="text-amber-500 underline decoration-1 underline-offset-8">Speak.</span></h2>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-12">
                {[
                  { l: "On-Time Dispatch", v: 95, s: "%", i: <Truck size={14}/> },
                  { l: "Order Accuracy", v: 99, s: "%", i: <CheckCircle2 size={14}/> },
                  { l: "Repeat Customers", v: 92, s: "%", i: <Users size={14}/> },
                  { l: "Avg Response", v: "45", s: "m", i: <Timer size={14}/> },
                  { l: "Rejection Rate", v: 1.20, s: "%", i: <XCircle size={14}/> },
                  { l: "Turnover Cr", v: 5.12, p: "₹", i: <TrendingUp size={14}/> },
                ].map((stat, i) => (
                  <div key={i} className="border-l border-white/10 pl-8 group">
                    <div className="flex items-center gap-2 text-slate-500 mb-3 group-hover:text-amber-500 transition-colors">
                      {stat.i}
                      <span className="text-[9px] font-bold uppercase tracking-widest">{stat.l}</span>
                    </div>
                    <div className="text-5xl font-['Bebas_Neue'] text-white">
                      <RollingNumber value={stat.v} suffix={stat.s} prefix={stat.p} />
                    </div>
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>
          <div className="absolute -bottom-10 left-10 text-[120px] font-['Bebas_Neue'] text-white/[0.01] select-none uppercase">Performance_Data</div>
        </section>

        {/* --- 06 PRECISION DISPATCH (FLOW DESIGN) --- */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 sticky top-24 h-fit">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase tracking-widest">05 // THE PROTOCOL</div>
                <h2 className="text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-8">Precision <br/><span className="text-amber-500 italic">Dispatch.</span></h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  In 8 years, we have achieved a <span className="text-white font-bold">0% error rate</span> in material accuracy. We never miss a deadline.
                </p>
                <div className="p-8 bg-zinc-900 border border-amber-500/20 text-sm text-slate-300 italic font-light leading-relaxed">
                  "If wrong material is sent, DFPL covers 100% of replacement costs. If a delay occurs, we deliver before the deadline with 2 buffer days."
                </div>
              </MotionSection>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {[
                  { s: "01", t: "Engineering Flow", d: "Wire → Heading → Threading → Stock → Heat Treat → Plating → Packing → Dispatch.", i: <Settings /> },
                  { s: "02", t: "Verification Trigger", d: "Order/PI is printed and handed to the packing floor before a single box moves.", i: <FileCheck /> },
                  { s: "03", t: "Mandatory QC Sign-off", d: "Size, grade, and quantity are verified against the PI. Sign-off is non-negotiable.", i: <ClipboardCheck /> },
                  { s: "04", t: "Third-Party Cross-Check", d: "Dedicated validator audits the shipment independently before billing.", i: <Users /> },
                  { s: "05", t: "Final Confirmation", d: "Billing team verifies physical stock. LR and transport details shared instantly.", i: <Truck /> },
                ].map((step, i) => (
                  <MotionSection key={i} delay={i * 0.1}>
                    <div className="flex gap-6 p-8 bg-zinc-900/20 border border-white/5 hover:bg-zinc-900 transition-all group">
                      <div className="text-4xl font-['Bebas_Neue'] text-amber-500 opacity-30 group-hover:opacity-100 transition-opacity">{step.s}</div>
                      <div>
                        <h4 className="text-2xl font-['Bebas_Neue'] mb-2 tracking-widest group-hover:text-amber-500 transition-colors">{step.t}</h4>
                        <p className="text-sm text-slate-500 uppercase tracking-tight">{step.d}</p>
                      </div>
                    </div>
                  </MotionSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 07 THE ADVANTAGE --- */}
        <section className="py-40 px-6 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase tracking-widest">06 // THE ADVANTAGE</div>
                <h2 className="text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-8">Why Choose <br/><span className="text-amber-500">DFPL.</span></h2>
                <div className="flex items-center gap-3 py-4 px-6 bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-widest text-amber-500 w-fit">
                  <Zap size={16} /> Delivering 10x value for every Rupee
                </div>
              </MotionSection>
            </div>
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
              <div className="bg-zinc-950 p-10">
                <h4 className="text-white font-['Bebas_Neue'] text-2xl mb-6 flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={20} /> The DFPL Standard
                </h4>
                <ul className="space-y-4 text-sm text-slate-400 font-light">
                  {["360° Continuous Daily Improvement", "Unified Quality, Packing & Service", "Zero-Exception QC Stage-wise", "Advanced R&D for New Tech"].map((li, i) => (
                    <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" /> {li}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-950/50 p-10">
                <h4 className="text-slate-500 font-['Bebas_Neue'] text-2xl mb-6 flex items-center gap-2">
                  <XCircle className="text-red-900" size={20} /> Market Gaps
                </h4>
                <ul className="space-y-4 text-sm text-slate-600 font-light italic">
                  {["No structured QC systems", "Fragmented service & poor reach", "Engineering treated as hardware", "Stagnant product development"].map((li, i) => (
                    <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5 shrink-0" /> {li}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- 08 CAPABILITIES --- */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase tracking-widest">07 // CAPABILITIES</div>
                <h2 className="text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-12 text-white">Scale & <br/><span className="text-amber-500">Service.</span></h2>
                <div className="space-y-1">
                  {[
                    { l: "MAX ORDER CAPACITY", v: "3,000 Cartons / 100 Tons" },
                    { l: "CUSTOM PRODUCTION", v: "1,000 Cartons / 25–30 Tons" },
                    { l: "TRANSACTION RANGE", v: "₹1 Lakh – ₹1 Crore" },
                    { l: "MONTHLY THROUGHPUT", v: "30 – 150 Orders" },
                  ].map((cap, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-white/5 py-5 hover:border-amber-500 transition-colors group">
                      <span className="text-[10px] font-bold text-slate-500 group-hover:text-amber-500 transition-colors uppercase">{cap.l}</span>
                      <span className="text-3xl font-['Bebas_Neue']">{cap.v}</span>
                    </div>
                  ))}
                </div>
              </MotionSection>
            </div>
            <div className="lg:col-span-7 bg-zinc-900 p-12 border border-white/5 relative overflow-hidden">
               <h4 className="text-3xl font-['Bebas_Neue'] tracking-widest mb-10 border-l-4 border-amber-500 pl-6 uppercase">Industries We Serve</h4>
               <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                 {[
                   { t: "OEM Manufacturers", i: <Factory /> },
                   { t: "Wholesale Counters", i: <Briefcase /> },
                   { t: "Turnkey Projects", i: <Settings /> },
                   { t: "PEB Structures", i: <Building2 /> },
                   { t: "POP Agencies", i: <Layers /> },
                   { t: "Construction Units", i: <HardHat /> },
                 ].map((ind, i) => (
                   <div key={i} className="flex items-center gap-4 group">
                     <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">{ind.i}</div>
                     <span className="text-[10px] font-bold tracking-widest text-slate-400 group-hover:text-white uppercase transition-colors">{ind.t}</span>
                   </div>
                 ))}
               </div>
               <div className="mt-12 pt-8 border-t border-white/10 text-xs text-slate-500 uppercase tracking-tight font-light">
                 Structural backbone for India's growing infrastructure.
               </div>
            </div>
          </div>
        </section>

        {/* --- 09 GEOGRAPHY & 10 TEAM --- */}
        <section className="py-40 bg-[#08090A]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-40">
              {[
                { l: "Factory Unit", loc: "Ravki Makhavad, Rajkot", i: <Factory /> },
                { l: "Head Office", loc: "Rajkot, Gujarat", i: <MapPin /> },
                { l: "Branch & Warehouse", loc: "Surat, Gujarat", i: <Boxes /> },
              ].map((site, i) => (
                <MotionSection key={i} delay={i * 0.1}>
                  <div className="p-12 bg-zinc-900/40 border border-white/5 hover:bg-amber-500 group transition-all duration-500 h-full">
                    <div className="text-amber-500 group-hover:text-black mb-10 transition-colors">{site.i}</div>
                    <div className="text-[10px] font-bold text-slate-500 group-hover:text-black/60 mb-2 uppercase">{site.l}</div>
                    <div className="text-3xl font-['Bebas_Neue'] group-hover:text-black">{site.loc}</div>
                  </div>
                </MotionSection>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase tracking-widest">08 // HUMAN CAPITAL</div>
                <h2 className="text-7xl font-['Bebas_Neue'] leading-[0.9] uppercase mb-10">The Power Of <br/><span className="text-amber-500 italic">Ownership.</span></h2>
                <div className="space-y-6 text-xl font-light text-slate-400">
                  <p>DFPL operates with a professional force of <span className="text-white font-semibold">25 experts</span>. We have eliminated the "single point of failure" by empowering every member to own their process.</p>
                  <p>Our commitment: meaningful employment with <span className="text-white">Professionalism, Respect, and Absolute Fairness.</span></p>
                </div>
              </MotionSection>
              <div className="aspect-square bg-zinc-900 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
                <Users size={100} className="text-amber-500 opacity-20 group-hover:scale-125 transition-transform duration-1000" />
                <div className="text-[180px] font-['Bebas_Neue'] leading-none text-white relative z-10">25</div>
                <div className="font-mono text-xs tracking-[0.5em] text-amber-500 uppercase mt-[-20px]">Active Professionals</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 11 ROADMAP --- */}
        <section className="py-40 bg-zinc-950 border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <MotionSection>
              <h2 className="text-7xl font-['Bebas_Neue'] text-center uppercase mb-24">Financial <span className="text-amber-500 italic">Roadmap.</span></h2>
              <div className="grid lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                {[
                  { y: "2025-26", v: "₹5.12 Cr", l: "CURRENT TURNOVER", s: "Active" },
                  { y: "2026-27", v: "₹10 Cr", l: "SCALING TARGET", s: "Projected" },
                  { y: "2030", v: "₹30 Cr", l: "SME IPO VISION", s: "Vision" },
                ].map((item, i) => (
                  <div key={i} className="bg-black p-16 group hover:bg-zinc-900 transition-colors relative overflow-hidden">
                    <div className="absolute top-6 right-8 text-5xl font-['Bebas_Neue'] text-amber-500/10 group-hover:text-amber-500/20">{item.y}</div>
                    <div className="relative z-10">
                      <div className="text-[10px] font-bold text-slate-500 mb-2 tracking-widest uppercase">{item.l}</div>
                      <div className="text-7xl font-['Bebas_Neue'] mb-8">{item.v}</div>
                      <div className={`inline-block px-4 py-1 text-[10px] font-bold uppercase tracking-widest border ${i === 0 ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : 'border-amber-500/30 text-amber-500 bg-amber-500/5'}`}>
                        {item.s}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>
        </section>

        {/* --- 12/13 VISION & VALUES --- */}
        <section className="py-40 px-6 bg-[#08090A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-32 mb-40">
              <MotionSection>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase">09 // MISSION</div>
                <h3 className="text-5xl font-['Bebas_Neue'] mb-8 uppercase tracking-widest">To Give The <span className="text-amber-500 underline underline-offset-4 decoration-2">Best.</span></h3>
                <p className="text-2xl font-light text-slate-400 leading-relaxed italic">Improve every single day, across every department and every person in the organization.</p>
              </MotionSection>
              <MotionSection delay={0.2}>
                <div className="font-mono text-amber-500 text-xs mb-4 uppercase">10 // VISION</div>
                <h3 className="text-5xl font-['Bebas_Neue'] mb-8 uppercase tracking-widest">IPO Bound <span className="text-amber-500 italic">2030.</span></h3>
                <p className="text-2xl font-light text-slate-400 leading-relaxed">DFPL aims to list on SME IPO by 2030 and Graduate to Main Board by 2036. Building India's most trusted fastener brand.</p>
              </MotionSection>
            </div>

            <MotionSection>
              <div className="text-center mb-16">
                <span className="text-[10px] font-bold tracking-[0.6em] text-slate-500 uppercase">Our Core Architecture</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { t: "Quality First", d: "Zero compromise." },
                  { t: "Absolute Ethics", d: "Words are sacred." },
                  { t: "10x Value", d: "Exceed investment." },
                  { t: "Human Touch", d: "People before profit." },
                  { t: "Sacred Brand", d: "Protect the trust." },
                ].map((val, i) => (
                  <div key={i} className="p-8 border border-white/5 bg-zinc-900/20 text-center hover:border-amber-500/50 hover:bg-zinc-900 transition-all group">
                    <h5 className="text-lg font-['Bebas_Neue'] mb-2 tracking-widest group-hover:text-amber-500">{val.t}</h5>
                    <p className="text-[9px] text-slate-600 uppercase font-bold">{val.d}</p>
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>
        </section>

        {/* --- FOUNDER CLOSURE --- */}
        <section className="py-60 px-6 relative overflow-hidden bg-black text-center">
           <div className="max-w-4xl mx-auto relative z-10">
             <MotionSection>
               <Quote className="text-amber-500/20 mx-auto mb-16" size={80} />
               <h2 className="text-4xl md:text-6xl font-light italic leading-tight mb-16 text-white font-['Barlow']">
                 "If we said 5 days — you will have it in 4. We have <span className="text-amber-500 font-bold not-italic underline decoration-1 underline-offset-8">never missed a commitment</span> in 8 years. And we never will."
               </h2>
               <div className="space-y-3">
                 <div className="text-5xl font-['Bebas_Neue'] tracking-[0.2em] text-amber-500">Vipul Sakariya</div>
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.8em]">Founder & Visionary, DFPL</div>
               </div>
             </MotionSection>
           </div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        </section>

        {/* --- CUSTOM CSS FOR STROKE TEXT --- */}
        <style dangerouslySetInnerHTML={{ __html: `
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
            color: transparent;
          }
        `}} />
      </div>
    </HelmetProvider>
  );
};

export default About;
