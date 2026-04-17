import React, { useEffect, useRef, useState } from 'react';
import { 
  Target, Eye, TrendingUp, Award, Zap, ShieldCheck, 
  Settings, Globe2, ChevronRight, Quote, 
  Boxes, Handshake, Microscope, 
  ArrowUpRight, CheckCircle2, Factory, AlertTriangle, XCircle, RefreshCw
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// --- 1. Helper: Reveal Animation ---
const RevealSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-10');
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out opacity-0 translate-y-10 ${className}`}>
      {children}
    </div>
  );
};

// --- 2. Helper: Counter Hook ---
const useCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = target;
    const totalSteps = 60;
    const increment = end / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / totalSteps);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return { count, elementRef };
};

const About: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats Configuration
  const yearsStat = useCounter(8);
  const clientsStat = useCounter(350);
  const skuStat = useCounter(600);
  const exportStat = useCounter(12);

  return (
    <div className="bg-[#fcfcfc] min-h-screen overflow-x-hidden font-sans text-slate-900">
      <Helmet>
        <title>Our Legacy | Durable Fastener Pvt Ltd (DFPL)</title>
        <meta name="description" content="Forging excellence since 2018. From Gujarat to the world, providing industrial screw solutions for Titan, Reliance, and beyond." />
      </Helmet>

      {/* SECTION 1: HERO - THE PROBLEM SOLVERS */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#05070a] text-white">
        <div 
          className="absolute inset-0 opacity-30 z-0 grayscale contrast-125"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1504917595217-d4dc5f66679b?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${offsetY * 0.4}px) scale(1.1)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#05070a]/60 to-[#05070a] z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <RevealSection>
            <span className="inline-block px-5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px] font-black tracking-[0.4em] uppercase mb-8 backdrop-blur-md">
              Gujarat, India — Exporting Excellence
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-[0.85] uppercase">
              Built to solve<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 italic">
                The Market Gap.
              </span>
            </h1>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg md:text-2xl text-white font-medium leading-relaxed">
                We didn't start DFPL to just sell screws. We started it because the industry lacked 
                <span className="text-amber-500 italic"> technical precision </span> and reliable standards.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SECTION 2: STATS STRIP */}
      <div className="bg-amber-500 py-12 relative z-30 -mt-10 mx-6 rounded-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-black">
            <div className="text-center border-r border-black/10 last:border-0" ref={yearsStat.elementRef}>
              <span className="block text-4xl md:text-6xl font-black tracking-tighter">{yearsStat.count}+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Years in Industry</span>
            </div>
            <div className="text-center border-r border-black/10 last:border-0" ref={clientsStat.elementRef}>
              <span className="block text-4xl md:text-6xl font-black tracking-tighter">{clientsStat.count}+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Global Clients</span>
            </div>
            <div className="text-center border-r border-black/10 last:border-0" ref={skuStat.elementRef}>
              <span className="block text-4xl md:text-6xl font-black tracking-tighter">{skuStat.count}+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Unique SKUs</span>
            </div>
            
          </div>
        </div>
      </div>

      {/* SECTION 3: THE ORIGIN & EVOLUTION */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Origin Story */}
          <div className="lg:col-span-5 space-y-8">
            <RevealSection>
              <span className="text-amber-600 font-black text-xs tracking-[0.3em] uppercase block">Our Origin</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase italic mb-8">
                Why we started,<br/> <span className="text-slate-400">Not just when.</span>
              </h2>
              <div className="border-l-4 border-amber-500 pl-8 mb-8 italic text-xl text-slate-700 leading-relaxed">
                "The problem wasn't a lack of supply — it was a lack of standards. We built DFPL to be the benchmark."
              </div>
              <p className="text-slate-500 leading-relaxed text-lg">
                Before DFPL, the market for high-grade industrial screws was dominated by volume over quality. We entered this industry from Rajkot with a global mindset. We wanted to be the technical lead for engineers who cannot afford a 0.1% failure rate.
              </p>
              
              <div className="pt-12 grid grid-cols-1 gap-4">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-amber-500 transition-all">
                    <Microscope className="text-amber-500 mb-4" size={32} />
                    <h4 className="font-bold uppercase italic">Technical DNA</h4>
                    <p className="text-xs text-slate-500">Every thread is tested against DIN, ISO, and JIS standards.</p>
                 </div>
              </div>
            </RevealSection>
          </div>

          {/* Right: The Evolution Timeline */}
          <div className="lg:col-span-7 relative">
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />
            <div className="space-y-12">
              {[
                { year: "2018", title: "The Foundation", desc: "Established with a disruptive vision to transform fastening solutions via a quality-first approach.", icon: <Factory size={20} /> },
                { year: "2020", title: "The Breakthrough", desc: "During global supply disruptions, we ensured zero-delay for essential clients, building unbreakable trust.", icon: <Zap size={20} /> },
                { year: "2021–2023", title: "Expansion Phase", desc: "Exponential scaling of manufacturing capabilities to meet surging global demand.", icon: <TrendingUp size={20} /> },
                { year: "2023+", title: "Industry Standard", desc: "Now a trusted vendor for giants like Reliance and Titan. Recognized for precision quality.", icon: <Award size={20} />, isCurrent: true }
              ].map((step, idx) => (
                <RevealSection key={idx} className="relative pl-0 md:pl-24 group">
                  <div className={`absolute left-0 md:left-7 top-0 w-3 h-3 rounded-full z-20 hidden md:block transition-all ${step.isCurrent ? 'bg-amber-500 ring-4 ring-amber-100 scale-125' : 'bg-slate-300 group-hover:bg-amber-500'}`} />
                  <div className={`p-8 rounded-[2rem] border transition-all ${step.isCurrent ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white border-slate-100 hover:border-amber-200 shadow-sm'}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${step.isCurrent ? 'text-amber-500' : 'text-slate-400'}`}>{step.year}</span>
                      <div className={step.isCurrent ? 'text-amber-500' : 'text-slate-700'}>{step.icon}</div>
                    </div>
                    <h4 className="text-xl font-black uppercase italic mb-2 tracking-tight">{step.title}</h4>
                    <p className={`text-sm leading-relaxed ${step.isCurrent ? 'text-slate-400' : 'text-slate-500'}`}>{step.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE TRUST LEAGUE (CLIENTS) */}
      <section className="py-32 bg-[#05070a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <RevealSection>
              <span className="text-amber-500 font-black text-[10px] tracking-[0.5em] uppercase">Strategic Assets</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mt-6">
                Important <span className="text-slate-600">Clients & Projects</span>
              </h2>
            </RevealSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Titan */}
            <div className="group bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-14 hover:border-amber-500/40 transition-all">
               <div className="flex justify-between items-start mb-12">
                 <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Direct Supply Tier-1</span>
                 <Award className="text-slate-700 group-hover:text-amber-500" size={32} />
               </div>
               <h3 className="text-7xl md:text-9xl font-black text-white tracking-tighter italic opacity-20 group-hover:opacity-100 transition-all duration-700">TITAN</h3>
               <div className="mt-8">
                 <h4 className="text-lg font-bold text-white uppercase italic mb-2">Watchmaking Precision</h4>
                 <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Micro-precision components that meet the rigorous aesthetic and mechanical standards of premium horology.</p>
               </div>
            </div>

            {/* Reliance */}
            <div className="group bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-14 hover:border-amber-500/40 transition-all">
               <div className="flex justify-between items-start mb-12">
                 <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Infrastructure Partner</span>
                 <Zap className="text-slate-700 group-hover:text-amber-500" size={32} />
               </div>
               <h3 className="text-7xl md:text-9xl font-black text-white tracking-tighter italic opacity-20 group-hover:opacity-100 transition-all duration-700">RELIANCE</h3>
               <div className="mt-8">
                 <h4 className="text-lg font-bold text-white uppercase italic mb-2">Industrial Strength</h4>
                 <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Anchoring critical industrial infrastructure through high-volume, authorized supply partnerships.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HONEST TURNING POINTS */}
      <section className="py-32 bg-[#0a0f1a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-20">
            <span className="text-amber-500 font-black text-[10px] tracking-[0.5em] uppercase">The Turning Points</span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mt-4">
              Moments that<br/> <span className="text-slate-600">Defined us.</span>
            </h2>
            <p className="text-slate-400 mt-6 text-lg">We don't hide our friction. Our challenges are why our systems are unbreakable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <RevealSection className="bg-white/[0.03] p-12 border border-white/5 hover:bg-white/[0.05] transition-all">
              <AlertTriangle className="text-red-500 mb-8" size={40} />
              <h3 className="text-2xl font-black italic uppercase mb-6">Market Disruption</h3>
              <p className="text-slate-500 text-sm leading-relaxed">During the 2020 supply stall, we chose to pivot our procurement logic to ensure zero-delay for essential clients. We didn't quit; we restructured.</p>
            </RevealSection>

            <RevealSection className="bg-white/[0.03] p-12 border border-white/5 hover:bg-white/[0.05] transition-all">
              <XCircle className="text-amber-500 mb-8" size={40} />
              <h3 className="text-2xl font-black italic uppercase mb-6">The Scaling Mistake</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Early on, speed outpaced our QC manual. A minor batch error taught us: speed is nothing without a rigid system. That mistake rewrote our manual.</p>
            </RevealSection>

            <RevealSection className="bg-white/[0.03] p-12 border border-white/5 hover:bg-white/[0.05] transition-all">
              <RefreshCw className="text-emerald-500 mb-8" size={40} />
              <h3 className="text-2xl font-black italic uppercase mb-6">Strategic Shift</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We shifted from a 'vendor' to a 'technical partner' mindset. This opened doors to industrial leaders like Titan and Reliance.</p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* SECTION 6: MISSION/VISION BENTO GRID */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <RevealSection className="md:col-span-7 bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
              <Target className="text-amber-500 mb-8" size={48} />
              <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase italic">Our Mission</h3>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg">
                To deliver high-integrity fastening solutions that serve as the silent, unbreakable backbone of global industrial progress.
              </p>
              <div className="absolute -bottom-10 -right-10 p-8 opacity-10">
                <Boxes size={300} />
              </div>
          </RevealSection>

          <RevealSection className="md:col-span-5 bg-amber-500 rounded-[3rem] p-12 md:p-16 flex flex-col justify-between hover:bg-amber-400 transition-colors">
              <div>
                <Eye className="text-black mb-8" size={48} />
                <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase italic">Our Vision</h3>
                <p className="text-lg font-bold text-black/80 leading-tight">
                  To become the global benchmark for fastener manufacturing, synonymous with Indian engineering excellence by 2030.
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                  <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                    <ChevronRight size={32} />
                  </div>
              </div>
          </RevealSection>
        </div>
      </section>

      {/* SECTION 7: ACTION-BASED VALUES */}
      <section className="py-32 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase italic">Values are Decisions</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Not posters on a wall, but rules that shape our behavior when no one is watching.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <CheckCircle2 />, title: "Quality Clearance", action: "No Dispatch without double QC", desc: "Every batch is cross-inspected against technical spec sheets. No exceptions for Friday rushes." },
              { icon: <Zap />, title: "Defined Response", action: "4-Hour Query Policy", desc: "All client inquiries — pricing or technical — receive a response within 4 hours." },
              { icon: <Handshake />, title: "Honest Intel", action: "Disclose before escalation", desc: "If a delay is identified, we notify the client before they ask. We resolve, never hide." },
              { icon: <Microscope />, title: "Standard Obsession", action: "DIN/ISO/JIS Adherence", desc: "We manufacture to international codes, ensuring 100% compatibility for global projects." },
              { icon: <Factory />, title: "Production Integrity", action: "Monthly Process Fix", desc: "Every department must identify and fix one friction point every 30 days." },
              { icon: <Globe2 />, title: "Global Reliability", action: "Export Grade Packing", desc: "Whether it goes to Rajkot or Germany, the packaging must withstand 45 days of sea-freight." },
            ].map((value, idx) => (
              <RevealSection key={idx} className="group p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:border-amber-500 hover:shadow-2xl transition-all">
                <div className="text-amber-600 mb-6 bg-amber-50 w-12 h-12 flex items-center justify-center rounded-xl">{value.icon}</div>
                <h4 className="text-xl font-black mb-2 uppercase tracking-tight">{value.title}</h4>
                <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-700 text-[10px] font-black uppercase rounded-md mb-4">{value.action}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <RevealSection className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight uppercase italic">
              Ready to Secure Your <br/>
              <span className="text-amber-500">Industrial Future?</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg">
              Experience the DFPL difference. Let's discuss how our precision components can elevate your production line.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-amber-500 text-black rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all">
                Contact Technical Sales
              </button>
              <button className="px-12 py-6 border border-white/20 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                Download Catalog (PDF)
              </button>
            </div>
          </RevealSection>
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
             <Factory size={600} className="text-white absolute -right-20 -bottom-20" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;