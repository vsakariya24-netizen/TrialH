import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Target, Eye, Award, Zap, ShieldCheck, SearchCheck, 
  Settings, ChevronRight, Boxes, Cable,
  RefreshCw, AlertTriangle, Factory, Hammer, ShieldIcon,  MicroscopeIcon,
  MapPin, Users, TrendingUp, Landmark, Flame,
  Scale, Gauge, CheckCircle2, Microscope, ScanSearch, 
  Truck, Timer, BarChart3, Binary, HardHat, Package, PackageCheck,
  FileCheck, Database, ClipboardCheck,
  History, Repeat, XCircle, CheckCircle, ArrowRight, 
  ArrowUp, 
  Globe, Rocket, Quote, MoveRight, Layers, Building2,
  Play, Star, Crown, Sparkles, Clock, Shield, ThumbsUp, ChevronDown,
  Hexagon, Activity, Cpu, CircuitBoard, Globe2, Award as AwardIcon,
  Linkedin, Mail, Menu, X, Instagram, Facebook, Youtube, 
  Phone, Mail as MailIcon, MapPin as MapPinIcon, Send, Check,
  Circle, CircleDot, Diamond, Gem, Trophy, BriefcaseBusiness,
  CandlestickChart, ChartNoAxesCombined, CircleGauge,
  Cog, Wrench, Nut, Bolt, Fan, Gauge as GaugeIcon,
  Heart, User, UserCheck, Briefcase, Calendar, TrendingUp as TrendingUpIcon,
  TriangleAlert, Crosshair, 
  ShieldX,
  Lightbulb,
  BarChart, ArrowDown, Handshake,
} from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// ============================================
// PREMIUM DESIGN SYSTEM - VARIABLES & THEMES
// ============================================
const designSystem = {
  colors: {
    primary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    dark: {
      1: '#0A0A0F',
      2: '#0F0F14',
      3: '#14141A',
      4: '#1A1A22',
      5: '#20202A',
    },
    accent: {
      blue: '#3B82F6',
      purple: '#8B5CF6',
      emerald: '#10B981',
      rose: '#F43F5E',
    }
  },
  animations: {
    easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  }
};

// ============================================
// AI-INSPIRED PREMIUM ICON COMPONENTS
// ============================================
const AIIconWrapper = ({ children, size = 24, color = "currentColor" }: { children: React.ReactNode, size?: number, color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.5))" }}
  >
    {children}
  </svg>
);

const QualityIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 9V12L14 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 2V5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22 9L19 11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 9L5 11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

const LogisticsIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M4 6H20V18H4V6Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <circle cx="8" cy="12" r="1.5" fill={color} stroke="none"/>
    <circle cx="16" cy="12" r="1.5" fill={color} stroke="none"/>
    <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeDasharray="2 2"/>
    <path d="M12 6V18" stroke={color} strokeWidth="1.5" strokeDasharray="2 2"/>
    <path d="M4 9H8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 15H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

const EthicsIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M12 2V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 6L12 10L20 6" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 14L12 18L20 14" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M12 10V18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 4L12 7L18 4" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <circle cx="12" cy="14" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
  </AIIconWrapper>
);

const ValueIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M12 2L20 7L12 12L4 7L12 2Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 7L12 12L20 7" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M12 12V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 17L12 20L16 17" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M12 2L9 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 2L15 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

const InnovationIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 4V8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 16V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 12H8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 12H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 8L10 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 14L16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 16L10 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 10L16 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

const CustomerIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M12 21C12 21 20 15 20 10C20 6 17 4 12 4C7 4 4 6 4 10C4 15 12 21 12 21Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 7V13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1" fill={color} stroke="none"/>
    <path d="M12 4V2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

const ManufacturingIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M6 10L10 8V16L6 14V10Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M18 14L14 16V8L18 6V14Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M10 8L14 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 16L14 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="6" y="10" width="12" height="4" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
  </AIIconWrapper>
);

const VerifyIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3V5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 12H5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

const DispatchIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M4 6H16V16H4V6Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M16 10H20L22 13V16H16V10Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <circle cx="7" cy="17" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="18" cy="17" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M7 17H18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 14H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

const RejectionIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 9L15 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 3V5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 12H5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);


// ============================================
// FLOWCHART HELPER COMPONENTS
// ============================================

interface FlowArrowProps {
  direction?: "right" | "left";
  diamondText?: string | null;
}

const FlowArrow: React.FC<FlowArrowProps> = ({ direction = "right", diamondText }) => (
  <div className="relative flex flex-col items-center justify-center z-10 shrink-0 w-[40px] md:w-[60px]">
    <div className="w-8 h-7 bg-[#0a0a0f] border-[1.5px] border-[#16a34a] flex items-center justify-center shadow-[0_0_12px_rgba(22,163,74,0.3)] rounded-[2px] relative z-20">
      <span className="text-[#ef4444] text-[15px] font-black tracking-[-0.15em] leading-none pr-[2px]">
        {direction === "right" ? ">>" : "<<"}
      </span>
    </div>
    {diamondText && (
      <div className="absolute top-[28px] flex flex-col items-center z-10">
        <div className="w-9 h-9 border-[1.5px] border-[#f59e0b] rotate-45 flex items-center justify-center bg-[#0a0a0f] shadow-[0_0_15px_rgba(245,158,11,0.2)] mt-1.5">
          <span className="-rotate-45 text-[9px] font-black text-[#f59e0b] tracking-wider whitespace-nowrap">
            {diamondText}
          </span>
        </div>
      </div>
    )}
  </div>
);

const FlowCircle = ({ text }: { text: string }) => (
  <div className="relative z-10 w-[95px] h-[95px] md:w-[125px] md:h-[125px] rounded-full bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0369a1] flex items-center justify-center text-center p-3 shadow-[0_0_35px_rgba(14,165,233,0.5)] border-2 border-[#bae6fd]/40 shrink-0 hover:scale-105 transition-transform duration-300">
    <span className="text-white text-[11px] md:text-[14px] font-black leading-tight tracking-wider drop-shadow-md px-1 uppercase">{text}</span>
  </div>
);

// ============================================
// ADVANCED ANIMATION COMPONENTS
// ============================================

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .interactive');
      setIsHovering(!!isInteractive);
    };
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[32px] h-[32px] rounded-full border-2 border-amber-400/60 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full bg-amber-400 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30, mass: 0.3 }}
      />
    </>
  );
};

// ============================================
// DATA ARRAYS
// ============================================

const leadershipData = [
  {
    id: 1,
    name: "Mr.Vipul",
    role: "Founder & Managing Director",
    image:"/vrs1.png",
    description: "The visionary behind DFPL, Vipul identified the critical gap between manufacturing potential and service reliability. With over a decade of industry experience, he built DFPL from ground up with a philosophy rooted in system-driven integrity, ethical business practices, and long-term value creation. He leads the company's strategic direction, IPO roadmap, and brand building initiatives.",
    mainIcon: Crown,
    stats: [
      { icon: Target, label: "Strategy &\nVision" },
      { icon: TrendingUp, label: "Business\nGrowth" },
      { icon: Users, label: "Leadership &\nGovernance" }
    ]
  },
  {
    id: 2,
    name: "Ms.Dipti",
    role: "Head of Quality Assurance & Compliance",
    image: "/dipti.png",
    description: "Dipti ensures that every fastener leaving DFPL's facility meets uncompromising quality standards. She oversees the entire QC protocol from raw material inspection to final sign-off, maintaining ISO 9001:2015 certifications and implementing stringent quality checkpoints across all production stages. Her leadership makes 'zero defect' a daily reality.",
    mainIcon: ShieldCheck,
    stats: [
      { icon: Award, label: "Quality\nAssurance" },
      { icon: FileCheck, label: "Compliance &\nCertifications" },
      { icon: Settings, label: "Process\nExcellence" }
    ]
  },
  {
    id: 3,
    name: "Mr.Dhaval",
    role: "Sales & Business Development Director",
    image: "/dhaval.png",
    description: "Dhaval drives DFPL's market expansion and client relationships with a customer-first approach. His deep understanding of industrial fastener applications across sectors like automotive, infrastructure, and engineering has built long-term partnerships with over 100+ clients nationwide. He leads a high-performance sales team focused on value-driven solutions.",
    mainIcon: TrendingUp,
    stats: [
      { icon: Briefcase, label: "Business\nDevelopment" },
      { icon: Users, label: "Client\nRelations" },
      { icon: MapPin, label: "Market\nExpansion" }
    ]
  },
  {
    id: 4,
    name: "Mr.Kishan",
    role: "Operations & Supply Chain Head",
    image: "/ks.png",
    description: "The architect behind DFPL's industry-leading 95% one-day dispatch rate. Kishan manages the complete operational workflow from raw material procurement to final delivery, ensuring seamless coordination between production, inventory, and logistics. His process optimization and inventory management systems have redefined reliability standards in fastener distribution.",
    mainIcon: Settings,
    stats: [
      { icon: Settings, label: "Operations\nManagement" },
      { icon: Truck, label: "Supply Chain &\nLogistics" },
      { icon: BarChart, label: "Process\nOptimization" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: designSystem.animations.easeOut }
  }
};

// ============================================
// UI COMPONENTS
// ============================================

const TiltCard = ({ children, className = "", glow = false }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    const intensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 15) / 15;
    setRotate({ x: rotateX, y: rotateY });
    setGlowIntensity(intensity);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlowIntensity(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {glow && (
        <motion.div 
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${rotate.x * 10 + 50}% ${rotate.y * 10 + 50}%, rgba(245,158,11,0.3), transparent 70%)`,
            opacity: glowIntensity * 0.5,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 2000, delay = 0 }: any) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        let start = 0;
        const end = parseFloat(value.toString());
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
        return () => clearInterval(timer);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, duration, delay]);

  return (
    <motion.span 
      ref={ref} 
      className="font-bold inline-block"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay + 0.2, type: "spring" }}
    >
      {prefix}{count.toLocaleString(undefined, { 
        minimumFractionDigits: value.toString().includes('.') ? 1 : 0,
        maximumFractionDigits: 1 
      })}{suffix}
    </motion.span>
  );
};

const ScrollReveal = ({ children, direction = "up", delay = 0, className = "", threshold = 0.1, duration = 0.8 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: threshold });
  
  const directions = {
    up: { y: 80, x: 0, scale: 0.95 },
    down: { y: -80, x: 0, scale: 0.95 },
    left: { y: 0, x: 80, scale: 0.95 },
    right: { y: 0, x: -80, scale: 0.95 },
    none: { y: 0, x: 0, scale: 1 },
    scale: { scale: 0.8, y: 0, x: 0 }
  };
  
  const initial = directions[direction as keyof typeof directions] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration, delay, ease: designSystem.animations.easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxSection = ({ children, speed = 0.5, className = "" }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const AnimatedGrid = () => (
  <motion.div 
    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)]"
    animate={{ 
      backgroundPosition: ["0px 0px", "80px 80px"],
    }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
  />
);

const FloatingParticles = ({ count = 50 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-amber-400/20 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, metrics, delay }: any) => {
  return (
    <ScrollReveal delay={delay}>
      <div className="h-full flex flex-col p-8 md:p-12 rounded-3xl bg-[#111116] border border-white/10 hover:border-amber-500/50 transition-all duration-500 group shadow-2xl hover:shadow-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/10 group-hover:border-amber-400/30">
            <Icon size={40} color="#f59e0b" />
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-wide mb-6 leading-tight">
            {title}
          </h3>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-semibold">
            {description}
          </p>
        </div>
        <div className="mt-auto pt-10 relative z-10">
          <div className="w-full h-[3px] bg-gradient-to-r from-amber-500/60 via-amber-500/20 to-transparent mb-8 rounded-full" />
          <div>
            <span className="block text-5xl md:text-6xl font-black text-amber-400 mb-3 tracking-tighter drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
              {metrics.value}
            </span>
            <span className="block text-base md:text-lg font-extrabold text-slate-300 uppercase tracking-[0.25em]">
              {metrics.label}
            </span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const StatCard = ({ icon: Icon, label, value, suffix = "", prefix = "", delay = 0, trend = null }: any) => (
  <ScrollReveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ scale: 1.03, y: -3 }}
      className="text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/40 transition-all duration-500 group backdrop-blur-sm relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"
      />
      <div className="relative z-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500">
          <Icon size={24} className="sm:w-7 sm:h-7" color="#f59e0b" />
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-2">
          <AnimatedCounter value={value} suffix={suffix} prefix={prefix} delay={delay} />
        </div>
        <div className="text-sm sm:text-base text-slate-300 uppercase tracking-wider font-semibold">{label}</div>
        {trend && (
          <motion.div 
            className="mt-2 text-xs sm:text-sm text-emerald-400 flex items-center justify-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
          >
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{trend}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  </ScrollReveal>
);

const SectionHeader = ({ badge, title, highlight, description = "", align = "center", className = "" }: any) => (
  <div className={`mb-6 md:mb-8 ${align === "center" ? "text-center" : ""} ${className}`}>
    <ScrollReveal direction="up">
      <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 mb-4 sm:mb-6 backdrop-blur-sm">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
        </motion.div>
        <span className="text-xs sm:text-sm md:text-base font-bold text-amber-400 uppercase tracking-wider">{badge}</span>
      </div>
    </ScrollReveal>
    <ScrollReveal direction="up" delay={0.1}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight">
        {title}{" "}
        <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent relative inline-block">
          {highlight}
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
            initial={{ width: "0%", opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </span>
      </h2>
    </ScrollReveal>
    {description && (
      <ScrollReveal direction="up" delay={0.2}>
        <p className="text-slate-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </ScrollReveal>
    )}
  </div>
);

const EmployeeCard = ({ name, role, delay, image }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -10, borderColor: "rgba(245, 158, 11, 0.5)" }}
      className="bg-[#111116] border border-white/5 rounded-[2rem] p-6 sm:p-8 flex flex-col items-center text-center transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] duration-500 w-full max-w-[260px] sm:max-w-[280px]"
    >
      <div className="relative w-full aspect-[4/5] mb-6 sm:mb-8 overflow-hidden rounded-[1.5rem] bg-[#0A0A0F]">
        <img 
          src={image || "/placeholder-avatar.jpg"} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <h3 className="text-white font-bold text-lg sm:text-xl mb-1 tracking-tight">{name}</h3>
      <p className="text-amber-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">{role}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, delay }: any) => (
  <ScrollReveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
    >
      <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500/30 mb-3 sm:mb-4" />
      <p className="text-slate-200 text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 sm:mb-6">{quote}</p>
      <div>
        <p className="text-white font-bold text-lg sm:text-xl mb-1">{author}</p>
        <p className="text-amber-400 text-base sm:text-lg">{role}</p>
      </div>
    </motion.div>
  </ScrollReveal>
);

// ============================================
// FIXED FULL SCREEN SNAP WRAPPER COMPONENT
// ============================================
const FullScreenSection = ({ id, children, className = "" }) => (
  <section id={id} className={`snap-start min-h-screen w-full relative flex flex-col justify-center ${className}`}>
    <div className="w-full py-8 md:py-12 lg:py-16">
      {children}
    </div>
  </section>
);

// ============================================
// MAIN PROCESS SECTION COMPONENT
// ============================================
const StepConnector = ({ borderColor, dotColor }) => (
  <div className="hidden lg:block absolute -right-[24px] w-[24px] z-10 pointer-events-none"
       style={{ top: '180px', bottom: '60px' }}>
    <div className={`absolute left-0 bottom-0 w-[12px] h-[0%] border-b-2 border-r-2 rounded-br-[16px] ${borderColor}`} />
    <div className={`absolute right-[0px] top-[0px] w-[12px] h-[100%] border-t-2 border-l-2 rounded-tl-[16px] ${borderColor}`} />
    <div className={`absolute left-[-4px] bottom-[-4px] w-[8px] h-[8px] rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`} />
    <div className={`absolute right-[-4px] top-[-4px] w-[8px] h-[8px] rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`} />
  </div>
);

const DFPLProcessSection = () => {

  const EngineeringProcess = () => (
    <div className="flex flex-col items-center flex-1 justify-between w-full h-full mt-2">
      <FlowStep title="Material Inspection" icon={SearchCheck} color="blue" />
      <ArrowDown className="text-blue-400" />
      <FlowStep title="Wire Drawing" icon={Cable} color="blue" />
      <ArrowDown className="text-blue-400" />
      <FlowStep title="Cold Heading" icon={Hammer} color="blue" />
      <ArrowDown className="text-blue-400" />
      <FlowStep title="Thread Rolling" icon={Cog} color="blue" />
      <ArrowDown className="text-blue-400" />
      <FlowStep title="Heat Treatment" icon={Flame} color="blue" />
      <ArrowDown className="text-blue-400" />
      <FlowStep title="Surface Coating" icon={Layers} color="blue" />
    </div>
  );

  const QualityProcess = () => (
    <div className="flex flex-col items-center flex-1 justify-between w-full h-full mt-2">
      <motion.div 
        animate={{ boxShadow: ['0px 0px 10px rgba(224, 221, 228, 0.2)', '0px 0px 30px rgba(168,85,247,0.6)', '0px 0px 10px rgba(168,85,247,0.2)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-purple-500/40 flex items-center justify-center bg-purple-500/5 shrink-0"
      >
        <Microscope size={28} className="sm:w-9 sm:h-9 text-purple-400" />
      </motion.div>
      <ArrowDown className="text-purple-400/50" />
      
      <FlowStep title="Size Validation" icon={Scale} color="purple" />
      <ArrowDown className="text-purple-400" />
      
      <FlowStep title="Grade Verification" icon={SearchCheck} color="purple" />
      <ArrowDown className="text-purple-400" />
      
      <FlowStep title="Quantity Audit" icon={BarChart3} color="purple" />
      <ArrowDown className="text-purple-400" />
      
      <FlowStep title="Sign-off" icon={CheckCircle2} color="purple" />
    </div>
  );

  const VerificationProcess = () => (
    <div className="flex flex-col items-center flex-1 justify-between w-full h-full mt-2">
      <motion.div 
        animate={{ boxShadow: ['0px 0px 10px rgba(16,185,129,0.2)', '0px 0px 30px rgba(16,185,129,0.6)', '0px 0px 10px rgba(16,185,129,0.2)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-500/5 shrink-0"
      >
        <ClipboardCheck size={28} className="sm:w-9 sm:h-9 text-emerald-400" />
      </motion.div>
      <ArrowDown className="text-emerald-400/50" />
      
      <FlowStep title="Order/PI Printing" icon={ClipboardCheck} color="emerald" />
      <ArrowDown className="text-emerald-400" />
      
      <FlowStep title="Packing Floor Handover" icon={Package} color="emerald" />
      <ArrowDown className="text-emerald-400" />
      
      <FlowStep title="Document Audit" icon={FileCheck} color="emerald" />
      <ArrowDown className="text-emerald-400" />
      
      <FlowStep title="Verification Complete" icon={CheckCircle2} color="emerald" />
    </div>
  );

  const DispatchProcess = () => (
    <div className="flex flex-col items-center flex-1 justify-between w-full h-full mt-2">
      <motion.div 
        animate={{ boxShadow: ['0px 0px 10px rgba(245,158,11,0.2)', '0px 0px 30px rgba(245,158,11,0.6)', '0px 0px 10px rgba(245,158,11,0.2)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-500/40 flex items-center justify-center bg-amber-500/5 shrink-0"
      >
        <Truck size={28} className="sm:w-9 sm:h-9 text-amber-400" />
      </motion.div>
      <ArrowDown className="text-amber-400/50" />
      
      <FlowStep title="Stock Verification" icon={Truck} color="amber" />
      <ArrowDown className="text-amber-400" />
      
      <FlowStep title="Dispatch" icon={CheckCircle2} color="amber" />
      <ArrowDown className="text-amber-400" />
      
      <FlowStep title="LR Detail Generation" icon={FileCheck} color="amber" />
      <ArrowDown className="text-amber-400" />
      
      <FlowStep title="Instant Sharing" icon={Rocket} color="amber" />
    </div>
  );

  const FlowStep = ({ title, icon: Icon, color }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`
        group w-full rounded-xl border border-white/10 
        bg-gradient-to-r from-white/[0.03] to-white/[0.01] 
        hover:border-${color}-500/50 hover:bg-white/[0.05] 
        transition-colors duration-300 px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer
      `}
    >
      <Icon size={14} className={`sm:w-4 sm:h-4 text-${color}-400 shrink-0`} />
      <span className="text-xs sm:text-sm md:text-base text-slate-300">
        {title}
      </span>
    </motion.div>
  );

  const processFlow = [
    {
      id: "01",
      title: "Engineering",
      icon: Factory,
      color: "border-blue-500",
      textCol: "text-blue-500",
      connectorColor: "border-blue-500",
      dotColor: "bg-blue-500",
      hasConnector: true
    },
    {
      id: "02",
      title: "Quality Check",
      icon: Microscope,
      color: "border-purple-500",
      textCol: "text-purple-500",
      connectorColor: "border-purple-500",
      dotColor: "bg-purple-500",
      hasConnector: true
    },
    {
      id: "03",
      title: "Verification",
      icon: ClipboardCheck,
      color: "border-emerald-500",
      textCol: "text-emerald-500",
      connectorColor: "border-emerald-500",
      dotColor: "bg-emerald-500",
      hasConnector: true
    },
    {
      id: "04",
      title: "Final Dispatch",
      icon: Truck,
      color: "border-amber-500",
      textCol: "text-amber-500",
      hasConnector: false
    }
  ];

  return (
    <div className="w-full bg-[#0a0a0f] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="shrink-0 mb-6 md:mb-10"
        >
          <SectionHeader 
            badge="Our Protocol"
            title="The DFPL"
            highlight="Process"
            description="A systematic approach ensuring zero errors and 100% reliability"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch relative">
          {processFlow.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative p-4 sm:p-5 rounded-3xl bg-[#0a0a0f] border-t-4 border border-white/10 flex flex-col h-full lg:col-span-1 z-10"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className={`text-2xl sm:text-3xl font-black opacity-30 ${step.textCol}`}>{step.id}</div>
                <div className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
                  flex items-center justify-center border border-white/10 
                  group-hover:scale-110 transition-all duration-500 ${step.textCol}
                `}>
                  <step.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
              </div>
              
              <div className="mb-3 sm:mb-4">
                <h3 className="text-slate-300 text-lg sm:text-xl font-semibold leading-relaxed">
                  {step.title}
                </h3>
              </div>

              <div className="flex-1 flex flex-col">
                {step.id === "01" ? <EngineeringProcess /> 
                  : step.id === "02" ? <QualityProcess /> 
                  : step.id === "03" ? <VerificationProcess /> 
                  : <DispatchProcess />}
              </div>

              {step.hasConnector && (
                <StepConnector borderColor={step.connectorColor} dotColor={step.dotColor} />
              )}

            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-3xl border border-white/10 bg-[#0a0a0f] overflow-hidden"
        >
          <div className="grid lg:grid-cols-3">
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Handshake size={32} className="sm:w-10 sm:h-10 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Our Commitment</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    If wrong material is sent, DFPL covers 100% of replacement costs. If a delay occurs, we deliver before the deadline with 2 buffer days.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
              <h4 className="text-center text-amber-400 font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Zero error rate is our total accuracy</h4>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-5xl font-black text-amber-400">100%</div>
                  <div className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm">Accountability</div>
                </div>
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-5xl font-black text-amber-400">0%</div>
                  <div className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm">Compromise</div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck size={32} className="sm:w-10 sm:h-10 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Trusted by 1000+ Global Customers</h3>
                  <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base">Delivering quality, reliability and commitment every time.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================
// MAIN ABOUT PAGE COMPONENT
// ============================================

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCustomCursor, setShowCustomCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setShowCustomCursor(window.innerWidth >= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(sectionId);
    }
  }, []);

  return (
    <HelmetProvider>
      <div className="relative h-screen overflow-y-auto scroll-snap-type-y-mandatory bg-[#0A0A0F] text-white overflow-x-hidden selection:bg-amber-500 selection:text-black" ref={containerRef}>
        
        <Helmet>
          <title>About DFPL | Durable Fastener Pvt. Ltd. - Engineering Integrity Since 2018</title>
          <meta name="description" content="Durable Fastener Pvt. Ltd. (DFPL) - India's premier fastener manufacturer with 95% One‑day dispatch, 99% order accuracy, and uncompromising quality standards since 2018." />
          <meta name="keywords" content="fastener manufacturer India, industrial fasteners, screws, bolts, DFPL, Rajkot fastener company, leadership team DFPL" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        </Helmet>

        <style dangerouslySetInnerHTML={{ __html: `
          * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; margin: 0; overflow: hidden; }
          .scroll-snap-type-y-mandatory { scroll-snap-type: y mandatory; }
          .snap-start { scroll-snap-align: start; }
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: #0A0A0F; }
          ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 5px; }
          ::-webkit-scrollbar-thumb:hover { background: #d97706; }
          ::selection { background: #f59e0b; color: #000; }
          @keyframes float { 0%, 100% { transform: translateY(0px) translateX(0px); } 25% { transform: translateY(-10px) translateX(5px); } 75% { transform: translateY(10px) translateX(-5px); } }
          @keyframes pulse-glow { 0%, 100% { opacity: 0.2; filter: blur(100px); } 50% { opacity: 0.4; filter: blur(120px); } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          .animate-float { animation: float 8s ease-in-out infinite; }
          .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
          .shimmer-text { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
          .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {showCustomCursor && <CustomCursor />}

        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 z-[100] origin-left shadow-[0_0_20px_rgba(245,158,11,0.5)]"
          style={{ scaleX }}
        />

        <FloatingParticles count={30} />
        <AnimatedGrid />
        
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen animate-pulse" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px] pointer-events-none z-0" />

        {/* HERO SECTION */}
        <FullScreenSection id="hero" className="relative">
          <ParallaxSection speed={0.3} className="absolute inset-0 z-0">
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black whitespace-nowrap select-none bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.02) 80%)",
                  backgroundSize: "200% auto" 
                }}
                animate={{ backgroundPosition: ["200% 50%", "-200% 50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                DURABLE
              </motion.div>
              <motion.div 
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)]"
                animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </ParallaxSection>

          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity, filter: `blur(${heroBlur}px)` }}
            className="max-w-[1400px] mx-auto w-full relative z-10 px-4 sm:px-6"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <ScrollReveal direction="up">
                  <motion.div 
                    className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 mb-6 sm:mb-8 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="relative w-2 h-2"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping" />
                      <div className="relative rounded-full w-2 h-2 bg-amber-400" />
                    </motion.div>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-amber-400 uppercase tracking-wider">Est. 2018 | Industrial Excellence</span>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.1}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-4 sm:mb-5 tracking-tighter">
                    Engineering{" "}
                    <motion.span 
                      className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent inline-block pb-[0.1em]"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{ backgroundSize: "200% auto" }}
                    >
                      Integrity.
                    </motion.span>
                    <br />
                    <span className="text-3xl sm:text-4xl md:text-5xl text-slate-400 block mt-3 sm:mt-4 font-light">
                      Built To Last.
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed mb-6 sm:mb-10 max-w-xl">
                    Defining the future of fasteners through <span className="text-white font-semibold relative inline-block group">
                      system-driven reliability
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                    </span> and unyielding industrial grit.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-full flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-amber-500/25 hover:shadow-amber-500/50 transition-all duration-300 text-base sm:text-lg"
                    >
                      <span className="relative z-10">Explore Our Products</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500"
                        initial={{ x: "100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full font-bold hover:border-amber-500 hover:text-amber-400 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg"
                    >
                      Download Brochure
                    </motion.button>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="left" delay={0.2}>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { value: "95", label: "On-Time Dispatch", suffix: "%", color: "from-emerald-500", icon: LogisticsIcon },
                    { value: "99", label: "Order Accuracy", suffix: "%", color: "from-blue-500", icon: VerifyIcon },
                    { value: "8", label: "Years Excellence", suffix: "+", color: "from-purple-500", icon: AwardIcon },
                    { value: "100", label: "Client Satisfaction", suffix: "%", color: "from-amber-500", icon: CustomerIcon },
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] backdrop-blur-sm overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}/0 group-hover:${stat.color}/10 transition-all duration-500`} />
                      <div className="relative z-10">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                          <stat.icon size={20} className="sm:w-6 sm:h-6" color="#f59e0b" />
                        </div>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-1 sm:mb-2">
                          {stat.value}{stat.suffix}
                        </div>
                        <div className="text-sm sm:text-base md:text-lg text-slate-300 font-bold">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3 cursor-pointer z-20 group"
            onClick={() => {
              const nextSection = document.getElementById('who-we-are');
              if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] sm:text-xs font-semibold text-slate-200 uppercase tracking-[0.3em] transition-all duration-300 drop-shadow-sm group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              Scroll to explore
            </span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-md" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </FullScreenSection>

        {/* SECTION: WHO WE ARE - THE GENESIS */}
       <FullScreenSection id="who-we-are"
      className="relative w-full bg-[#050508] font-sans antialiased"
    >
      {/* --- Ambient backgrounds (refined for readability) --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c12] via-[#08080c] to-[#030305] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.08)_0%,_transparent_60%)] z-0" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* --- Main Container (max-width + auto margins to prevent overflow) --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
        
        {/* --- Section Header (inline component, centered, high contrast) --- */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 shadow-glow-amber" />
            <span className="text-amber-400 font-bold tracking-wider text-[10px] sm:text-[11px] uppercase">The Genesis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Who <span className="text-amber-400 relative inline-block">We Are
              <span className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-amber-500/30 rounded-full blur-sm -z-10" />
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-amber-500/60 mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* --- 12-Column Responsive Grid --- */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">
          
          {/* LEFT COLUMN: Founder Image Card (more polished, no overflow) */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]">
              <div className="relative group">
                {/* Decorative border gradient */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-amber-400/20 to-transparent rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative bg-gradient-to-b from-white/[0.08] to-transparent p-[1px] rounded-2xl shadow-2xl">
                  <div className="bg-[#0a0a0f] rounded-2xl overflow-hidden">
                    <div className="aspect-[3/4] relative">
                      <img
                        src="/vrs2.png"
                        alt="Mr. Vipul Sakariya - CEO"
                        className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition duration-700 ease-out"
                      />
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="text-center py-3 sm:py-4 px-3 sm:px-4 bg-[#0a0a0f] border-t border-white/5">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-wide">Mr. Vipul Sakariya</h3>
                      <p className="text-amber-400 font-bold tracking-wider uppercase text-[9px] sm:text-[10px] mt-1">Chief Executive Officer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: All Content (improved typography & spacing) */}
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6">
            
            {/* 1. Founder Quote — now uses standard sans-serif with elegant italics, high contrast */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <Quote size={24} className="absolute -top-3 -left-2 text-amber-500/20 rotate-180" />
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-[1.3] font-medium pl-3 sm:pl-4 border-l-3 sm:border-l-4 border-amber-500">
                <span className="font-light italic">"We do not just supply fasteners — we </span>
                <span className="text-amber-400 font-bold not-italic">engineer</span>
                <span className="font-light italic"> the integrity of your structures."</span>
              </h1>
              <div className="flex items-center gap-3 mt-3 sm:mt-4 pl-3 sm:pl-4">
                <span className="text-amber-400 font-bold tracking-wider uppercase text-[9px] sm:text-[10px]">Vipul Sakariya</span>
                <span className="w-px h-2 sm:h-3 bg-white/20" />
                <span className="text-slate-300 font-medium tracking-wide uppercase text-[9px] sm:text-[10px]">Founder & CEO, DFPL</span>
              </div>
            </motion.div>

            {/* 2. Philosophy Box — clean, readable, subtle backdrop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative border border-white/10 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent p-4 sm:p-5 backdrop-blur-[2px]"
            >
              <div className="absolute -top-3 left-4 sm:left-5 bg-[#08080c] px-2 sm:px-3 flex items-center gap-1 sm:gap-2">
                <div className="w-4 h-[2px] bg-amber-500 shadow-md" />
                <h4 className="text-amber-400 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">Our Philosophy</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Operating from <strong className="text-white font-semibold">Rajkot</strong> — India's industrial nerve center, DFPL is built on 
                <strong className="text-amber-400 font-semibold"> reliable systems & precision engineering</strong>, 
                and an unwavering commitment to customer satisfaction. Every fastener reflects our dedication to structural safety.
              </p>
            </motion.div>

            {/* 3. Two Info Cards — better hover feedback, clear text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-3 sm:gap-4 items-start p-3 sm:p-4 rounded-xl border border-white/[0.07] bg-[#0d0d12] hover:border-amber-500/30 hover:bg-[#111118] transition-all group cursor-default"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-[#0a0a0c] transition-colors">
                  <Factory size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h5 className="text-amber-400 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">Manufacturing & Export Hub</h5>
                  <p className="text-white font-semibold text-xs sm:text-sm mt-0.5">Ravki Makhavad, Rajkot</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex gap-3 sm:gap-4 items-start p-3 sm:p-4 rounded-xl border border-white/[0.07] bg-[#0d0d12] hover:border-slate-400/30 hover:bg-[#111118] transition-all group cursor-default"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-500/10 border border-slate-500/20 flex items-center justify-center text-slate-300 group-hover:bg-slate-200 group-hover:text-[#0a0a0c] transition-colors">
                  <Truck size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h5 className="text-amber-400 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">Distribution Network</h5>
                  <p className="text-white font-semibold text-xs sm:text-sm mt-0.5">Surat Branch & Warehouse</p>
                </div>
              </motion.div>
            </div>

            {/* 4. Key Achievements — high contrast stats, fully legible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative mt-2 pt-4 sm:pt-5 border-t border-white/[0.08]"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#050508] px-3 sm:px-4 py-0.5 rounded-full border border-white/10">
                <h6 className="text-slate-300 font-bold tracking-wider uppercase text-[8px] sm:text-[9px]">Key Achievements</h6>
              </div>
              <div className="flex justify-center sm:justify-around items-center gap-4 sm:gap-6 md:gap-8 pt-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-amber-500/15 rounded-full border border-amber-500/30 shadow-sm">
                    <Users size={14} className="sm:w-[18px] sm:h-[18px] text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 leading-none">1000+</p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-wider">Clients Served</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-6 sm:h-8 bg-white/10" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-sky-500/15 rounded-full border border-sky-500/30 shadow-sm">
                    <Building2 size={14} className="sm:w-[18px] sm:h-[18px] text-sky-300" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 leading-none">5000+</p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-wider">Projects Completed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional Custom Style - for glow effect (shadow-glow-amber) */}
      <style>{`
        .shadow-glow-amber {
          box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);
        }
      `}</style>
    
</FullScreenSection>

        {/* SECTION: THE ORIGIN — THE STORY */}
        < FullScreenSection id="the-journey"
      className="relative w-full bg-[#050508] font-sans overflow-hidden"
    >
      {/* Ambient backgrounds - softer to improve text contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[30vh] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid pattern for depth (improves readability by reducing flatness) */}


      {/* Main container - increased padding and max-width for breathing room */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-20">
        
        {/* Section Header - improved spacing and text contrast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-5 shadow-sm">
            <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 tracking-[0.15em] uppercase">The Evolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            The Early <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Journey</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 font-medium">
            Every setback became a stronger system. DFPL's defining moments.
          </p>
        </motion.div>

        {/* Three Cards - improved backgrounds, better text contrast */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-12">
          
          {/* Card 1: The Rejection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative bg-gradient-to-br from-[#1c0a0a] to-[#0a0505] rounded-2xl border border-red-500/30 p-5 sm:p-6 shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-4 left-5 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-[#2a0f0f] rounded-xl border border-red-500/40 flex items-center justify-center shadow-red-500/30 rotate-3 group-hover:rotate-6 transition">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            </div>
            <div className="mt-6 sm:mt-8">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">
                The <span className="text-red-400">₹1 Crore</span> Rejection
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                A major order of <span className="text-red-300 font-semibold">10 million PCS</span> was rejected due to a critical head-cutting issue.
              </p>
              <div className="bg-black/30 border border-red-500/20 rounded-xl p-3 sm:p-4">
                <p className="text-amber-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1">Root Cause</p>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                  Seasonal variation in plywood density during winter conditions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Strategic Shift */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative bg-gradient-to-br from-[#0a1a12] to-[#030a06] rounded-2xl border border-emerald-500/30 p-5 sm:p-6 shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-4 left-5 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-[#0f2618] rounded-xl border border-emerald-500/40 flex items-center justify-center shadow-emerald-500/30 -rotate-3 group-hover:-rotate-6 transition">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <div className="mt-6 sm:mt-8">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">Strategic Shift</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                We began analyzing international standards and engineering systems for:
              </p>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Material science & metallurgy</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Seasonal & environmental factors</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Turning Point */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative bg-gradient-to-br from-[#0a121c] to-[#04080e] rounded-2xl border border-blue-500/30 p-5 sm:p-6 shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-4 left-5 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-[#101a2a] rounded-xl border border-blue-500/40 flex items-center justify-center shadow-blue-500/30 rotate-3 group-hover:rotate-6 transition">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
            <div className="mt-6 sm:mt-8">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">Turning Point</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                This failure became a breakthrough. We shifted focus to{" "}
                <span className="text-blue-400 font-semibold">application engineering</span>.
              </p>
              <div className="bg-black/30 border border-blue-500/20 rounded-xl p-3 sm:p-4">
                <p className="text-blue-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1">Key Learning</p>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                  Quality depends on environment, material behavior, and application conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Quote - enhanced contrast and visibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative bg-gradient-to-r from-amber-950/30 via-[#0a0a0f] to-transparent rounded-2xl border border-amber-500/30 p-5 sm:p-6 md:p-8 overflow-hidden shadow-xl"
        >
          <div className="absolute -right-8 -top-8 opacity-5 pointer-events-none">
            <Quote className="w-40 h-40 sm:w-56 sm:h-56 text-amber-500" />
          </div>
          <div className="relative flex flex-col md:flex-row items-center gap-4 sm:gap-5 md:gap-8">
            <div className="bg-amber-500/15 p-3 sm:p-4 rounded-2xl border border-amber-500/30 shrink-0 shadow-glow">
              <Quote className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-amber-400 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2">Core Philosophy</p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                We don't react to problems —<br className="hidden sm:block" />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  we engineer systems that prevent them.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom style for glow effect (if needed) */}
      
    
        </FullScreenSection>

        {/* SECTION: WHY CHOOSE US - FULLY OPTIMIZED FOR ONE SCREEN */}
        <FullScreenSection className="bg-gradient-to-b from-[#0A0A0F] via-[#050508] to-[#0A0A0F] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-[1350px] mx-auto relative z-10 px-4 sm:px-6 flex-1 flex flex-col justify-center">
            {/* Section Header - compact but readable */}
            <div className="mb-5 md:mb-6">
              <SectionHeader 
                badge="Why Choose DFPL" 
                title="The Durable" 
                highlight="Advantage" 
                description="What makes us the preferred partner for industry leaders across India" 
              />
            </div>

            {/* Responsive grid - adjusted gaps and padding for better fit */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 items-stretch">
              {[
                { icon: QualityIcon, title: "Uncompromising Quality", description: "From raw material to final dispatch, each step is controlled, verified, and aligned with international standards.", metrics: { value: "100%", label: "Quality Certified" } },
                { icon: DispatchIcon, title: "One-Day Dispatch", description: "Real-time inventory management with floor stock matching system records for guaranteed One-day dispatch (Running Item).", metrics: { value: "95%", label: "On-Time Delivery" } },
                { icon: EthicsIcon, title: "Absolute Ethics", description: "Strict adherence to regulations and financial systems. Built for multi-decade sustainable growth.", metrics: { value: "8+", label: "Years Trust" } },
                { icon: ValueIcon, title: "10x Value Delivery", description: "Delivering 10x value for every rupee invested through superior quality and reliability.", metrics: { value: "10x", label: "ROI Delivered" } },
                { icon: InnovationIcon, title: "Advanced R&D", description: "Continuous innovation and development of new technologies for evolving industry needs.", metrics: { value: "24/7", label: "Innovation Lab" } },
                { icon: CustomerIcon, title: "Customer First", description: "24/7 support and dedicated relationship managers for every client account.", metrics: { value: "100%", label: "Support Coverage" } }
              ].map((feature, idx) => {
                const { icon: Icon, title, description, metrics } = feature;
                return (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.1} className="h-full flex flex-col">
                    <TiltCard glow className="h-full flex flex-col flex-1">
                      <motion.div 
                        whileHover={{ y: -3, scale: 1.01 }} 
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group flex-1 w-full bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 overflow-hidden relative"
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -top-24 -right-24 w-36 h-36 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                        <div className="flex items-center gap-3 relative z-10">
                          <motion.div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center shrink-0 border border-amber-500/20"
                            whileHover={{ rotate: 6, scale: 1.05 }} 
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" strokeWidth={1.5} />
                          </motion.div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-wide">{title}</h3>
                        </div>

                        <p className="text-slate-300 leading-relaxed text-xs sm:text-sm md:text-base flex-grow relative z-10">
                          {description}
                        </p>

                        <div className="mt-auto pt-3 sm:pt-4 border-t border-white/[0.06] relative z-10">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-500">
                              {metrics.value}
                            </span>
                            <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                              {metrics.label}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </FullScreenSection>

        {/* SECTION: MISSION & VISION */}
        <FullScreenSection id="mission" className="relative bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHeader badge="Our Purpose" title="Mission &" highlight="Vision" description="Driving industrial excellence through quality and reliability." />
            <div className="grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
              <ScrollReveal direction="right" delay={0.1}>
                <TiltCard glow>
                  <motion.div whileHover={{ y: -5 }} className="group relative p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
                    <div className="absolute -top-24 -right-24 w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10">
                      <motion.div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Target className="w-7 h-7 sm:w-10 sm:h-10 text-amber-400" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Our Mission</h3>
                      <p className="text-slate-300 leading-relaxed text-lg sm:text-xl md:text-2xl">"To give the best. Improve every single day, across every department and every person in the organization."</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <TiltCard glow>
                  <motion.div whileHover={{ y: -5 }} className="group relative p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
                    <div className="absolute -bottom-24 -right-24 w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10">
                      <motion.div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Eye className="w-7 h-7 sm:w-10 sm:h-10 text-amber-400" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Our Vision</h3>
                      <p className="text-slate-300 leading-relaxed text-lg sm:text-xl md:text-2xl">"IPO Bound 2030. DFPL aims to list on SME IPO by 2030 and Graduate to Main Board by 2036. Building India's most trusted fastener brand."</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </FullScreenSection>

        {/* SECTION: STATISTICS - NOW FULLY OPTIMIZED FOR ALL SCREEN SIZES */}
        <FullScreenSection className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)]" />
          <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6">
            
            {/* Section Header - reduced margin for tighter fit */}
            <div className="mb-5 md:mb-7">
              <SectionHeader 
                badge="Performance Metrics" 
                title="Our Numbers" 
                highlight="Speak for Themselves" 
                description="Real-time performance metrics that demonstrate our commitment to excellence" 
              />
            </div>

            {/* Responsive grid - 2 columns on mobile, 4 on desktop, with compact gaps and fully responsive cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              
              {/* Stat Cards - each card is compact but fully readable on all devices */}
              <StatCard icon={LogisticsIcon} label="On-Time Dispatch" value={95} suffix="%" delay={0} trend="+12% YoY" />
              <StatCard icon={VerifyIcon} label="Order Accuracy" value={99} suffix="%" delay={0.1} trend="+5% YoY" />
              <StatCard icon={Users} label="Repeat Customers" value={92} suffix="%" delay={0.2} trend="+18% YoY" />
              <StatCard icon={Timer} label="Avg Response Time" value={30} suffix="min" delay={0.3} trend="-30% YoY" />
              <StatCard icon={RejectionIcon} label="Rejection Rate" value={1.2} suffix="%" delay={0.4} trend="-40% YoY" />
              <StatCard icon={TrendingUp} label="Total Customers" value={1000} suffix="+" delay={0.5} trend="+25% YoY" />
              <StatCard icon={ManufacturingIcon} label="Yearly Capacity" value={300} suffix=" Tons" delay={0.6} trend="+15% YoY" />
              <StatCard icon={Globe} label="Cities Served" value={450} suffix="+" delay={0.7} trend="Expanding" />
              
            </div>
          </div>
        </FullScreenSection>

        {/* SECTION: OUR PROCESS */}
        <FullScreenSection className="py-6 md:py-8">
          <DFPLProcessSection />
        </FullScreenSection>

        {/* SECTION: VALUES */}
        <FullScreenSection id="values">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHeader badge="Core Values" title="The Principles That" highlight="Guide Us" description="Our foundational values that shape every decision we make" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {[
                { icon: QualityIcon, title: "Quality First", description: "Zero compromise", color: "from-emerald-500", metric: "ISO Certified" },
                { icon: EthicsIcon, title: "Absolute Ethics", description: "Words are sacred", color: "from-blue-500", metric: "100% Trust" },
                { icon: ValueIcon, title: "10x Value", description: "Exceed investment", color: "from-amber-500", metric: "ROI Focus" },
                { icon: Users, title: "Human Touch", description: "People before profit", color: "from-purple-500", metric: "Employee First" },
                { icon: AwardIcon, title: "Sacred Brand", description: "Protect the trust", color: "from-rose-500", metric: "Legacy Builder" },
                { icon: CustomerIcon, title: "Customer First", description: "Exceed expectations", color: "from-cyan-500", metric: "100% Satisfaction" },
              ].map((value, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.05}>
                  <TiltCard>
                    <motion.div className="group text-center p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/40 transition-all duration-500 h-full" whileHover={{ y: -3 }}>
                      <motion.div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${value.color}/20 to-transparent flex items-center justify-center mx-auto mb-3 sm:mb-4`} whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                        <value.icon size={24} className="sm:w-7 sm:h-7" color="#f59e0b" />
                      </motion.div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{value.title}</h4>
                      <p className="text-sm sm:text-base text-slate-300 mb-2 sm:mb-3">{value.description}</p>
                      <div className="text-xs sm:text-sm text-amber-400/80 uppercase tracking-wider font-semibold">{value.metric}</div>
                    </motion.div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </FullScreenSection>

        {/* SECTION: LEADERSHIP TEAM */}
        <FullScreenSection id="leadership" className="relative bg-[#050508] overflow-hidden font-sans">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.04)_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-14">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                <span className="text-[10px] sm:text-xs font-bold text-amber-500 tracking-widest uppercase">The Visionaries</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Our <span className="text-amber-500">Leadership</span></h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4">A leadership team united by a shared vision of industrial excellence, system-driven integrity, and sustainable growth. Their collective expertise drives DFPL's mission to become India's most trusted fastener brand.</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-6">
              {leadershipData.map((leader, index) => {
                const MainIcon = leader.mainIcon;
                return (
                  <motion.div key={leader.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group flex flex-col sm:flex-row bg-[#0a0a0f] rounded-2xl border border-white/10 hover:border-amber-500/30 transition-colors duration-300 overflow-hidden">
                    <div className="w-full sm:w-2/5 relative min-h-[280px] sm:min-h-full bg-gradient-to-b from-[#2a1d0c] to-[#0a0a0f] overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.3)_0%,transparent_70%)] opacity-80" />
                      <img src={leader.image} alt={leader.name} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-cover object-bottom drop-shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="w-full sm:w-3/5 p-5 sm:p-6 md:p-8 flex flex-col">
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#15151c] border border-white/10 flex items-center justify-center shrink-0"><MainIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /></div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5 tracking-wide group-hover:text-amber-500 transition-colors duration-300">{leader.name}</h3>
                          <p className="text-amber-500 text-xs sm:text-sm font-medium">{leader.role}</p>
                        </div>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-xs sm:text-sm mb-5 sm:mb-6 flex-grow">{leader.description}</p>
                      <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-4 sm:pt-5 border-t border-white/5 mt-auto">
                        {leader.stats.map((stat, idx) => {
                          const StatIcon = stat.icon;
                          return (
                            <div key={idx} className="flex items-center gap-1 sm:gap-2">
                              <StatIcon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 shrink-0 p-1 sm:p-1.5" />
                              <span className="text-[9px] sm:text-[10px] md:text-xs text-slate-300 leading-tight whitespace-pre-line font-medium">{stat.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FullScreenSection>

        {/* SECTION: TEAM MEMBERS */}
        <FullScreenSection id="our-team" className="bg-[#0A0A0F]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHeader badge="The Execution Force" title="Meet Our" highlight="Expert Team" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12">
              <EmployeeCard name="Ms.Ayushi" role="Office Executive" delay={0.05} initials="AE" image="/ayushi.jpg" />
              <EmployeeCard name="Mr.Rohit" role="Business Development Executive" delay={0.1} initials="PP" image="/rohit.jpg" />
              <EmployeeCard name="Mr.Daniel" role="Business Development Executive" delay={0.15} initials="DL" image="/daniel.png" />
              <EmployeeCard name="Ms.Payal" role="Business Development Executive" delay={0.2} initials="PT" image="/payal.png" />
              <EmployeeCard name="Ms.Prinsi" role="Office Executive" delay={0.25} initials="PA" image="/prinsi123.png" />
              <EmployeeCard name="Ms.Asmita" role="Business Development Executive" delay={0.3} initials="AD" image="/asmita.png" />
              <EmployeeCard name="Ms.Yagni" role="Business Development Executive" delay={0.35} initials="YG" image="/yagni.png" />
            </div>
          </div>
        </FullScreenSection>

        {/* SECTION: TESTIMONIALS */}
        <FullScreenSection>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <SectionHeader badge="Client Love" title="What Our" highlight="Clients Say" description="Trusted by precision-driven industries across the globe" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              <TestimonialCard quote="DFPL has been our trusted partner for over 5 years. Their quality standards and on-time delivery are unmatched in the industry." author="Ramesh Patel" role="Director, Bhumi Associates" delay={0} />
              <TestimonialCard quote="The professionalism and system-driven approach of DFPL sets them apart. They treat fasteners as precision-engineered products, not just hardware." author="Suresh Mehta" role="Owner, Ramdev Hardware" delay={0.1} />
              <TestimonialCard quote="Zero defects, zero delays, zero excuses. That's the DFPL promise they've delivered consistently for years." author="Ankit Shah" role="Purchase Head, Leading OEM" delay={0.2} />
            </div>
          </div>
        </FullScreenSection>

        {/* SECTION: FOUNDER'S QUOTE */}
        <FullScreenSection className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12)_0%,transparent_70%)]" />
          <div className="max-w-5xl mx-auto text-center relative z-10 px-4 sm:px-6">
            <ScrollReveal direction="up">
              <motion.div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-6 sm:mb-8 border-2 border-amber-500/30" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-amber-400" strokeWidth={1.5} />
              </motion.div>
              <motion.h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light italic text-slate-200 leading-relaxed mb-8 sm:mb-10 md:mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                "If we said 5 days — you will have it in 4. We have <span className="text-white font-bold not-italic relative inline-block">never missed a commitment<motion.span className="absolute bottom-0 left-0 w-full h-2 sm:h-3 bg-amber-500/40 -z-10 rounded-sm" initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 1, delay: 0.5 }} /></span> in 8 years. And we never will."
              </motion.h2>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-2 sm:mb-3">Mr.Vipul</div>
                <div className="text-sm sm:text-base md:text-lg text-amber-400 font-bold uppercase tracking-[0.2em]">Founder & Visionary, DFPL</div>
                <motion.div className="w-16 sm:w-20 h-px sm:h-[2px] bg-amber-500 mx-auto mt-4 sm:mt-6" initial={{ width: 0 }} whileInView={{ width: 64 }} transition={{ duration: 0.6, delay: 0.6 }} />
              </motion.div>
            </ScrollReveal>
          </div>
        </FullScreenSection>

        {/* SECTION: CONTACT */}
        <FullScreenSection id="contact">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <ScrollReveal direction="up">
              <motion.div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-8 sm:p-10 md:p-12 lg:p-16 text-center" whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10" />
                {[...Array(6)].map((_, i) => (
                  <motion.div key={i} className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full" initial={{ x: Math.random() * 600 - 300, y: Math.random() * 300 - 150, scale: 0 }} animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
                ))}
                <div className="relative z-10">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4 sm:mb-6"><Gem className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white/80" /></motion.div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4">Ready to Partner with Excellence?</h2>
                  <p className="text-amber-100 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">Join India's most trusted fastener manufacturer. Experience the DFPL difference with guaranteed quality and on-time delivery.</p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-700 font-bold rounded-full flex items-center justify-center gap-2 shadow-xl overflow-hidden text-base sm:text-lg md:text-xl">
                      <span className="relative z-10">Contact Sales</span>
                      <motion.div className="relative z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}><Send className="w-4 h-4 sm:w-5 sm:h-5" /></motion.div>
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-white" initial={{ x: "100%" }} whileHover={{ x: "0%" }} transition={{ duration: 0.3 }} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Request Quote
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-white/20">
                    <div className="flex items-center gap-1 sm:gap-2 text-amber-100 text-xs sm:text-sm md:text-base"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /><span>ISO Certified</span></div>
                    <div className="flex items-center gap-1 sm:gap-2 text-amber-100 text-xs sm:text-sm md:text-base"><Shield className="w-3 h-3 sm:w-4 sm:h-4" /><span>100% Guarantee</span></div>
                    <div className="flex items-center gap-1 sm:gap-2 text-amber-100 text-xs sm:text-sm md:text-base"><DispatchIcon size={14} className="sm:w-4 sm:h-4" color="#fffbeb" /><span>PAN India Delivery</span></div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </FullScreenSection>
      </div>
    </HelmetProvider>
  );
};

export default About;
