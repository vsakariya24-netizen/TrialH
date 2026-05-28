import React, { useRef, useEffect, useState, useCallback } from 'react';

import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';

import { 
  Target, Eye, Award, Zap, ShieldCheck, 
  Settings, ChevronRight, Boxes, 
  RefreshCw, AlertTriangle, Factory, 
  MapPin, Users, TrendingUp, Landmark,
  Scale, Gauge, CheckCircle2, Microscope, 
  Truck, Timer, BarChart3, Binary, HardHat,
  FileCheck, Database, ClipboardCheck,
  History, Repeat, XCircle, CheckCircle, ArrowRight,
  Globe, Rocket, Quote, MoveRight, Layers, Building2,
  Play, Star, Crown, Sparkles, Clock, Shield, ThumbsUp, ChevronDown,
  Hexagon, Activity, Cpu, CircuitBoard, Globe2, Award as AwardIcon,
  Linkedin, Mail, Menu, X, Instagram, Facebook, Youtube, 
  Phone, Mail as MailIcon, MapPin as MapPinIcon, Send, Check,
  Circle, CircleDot, Diamond, Gem, Trophy, BriefcaseBusiness,
  CandlestickChart, ChartNoAxesCombined, CircleGauge,
  Cog, Wrench, Nut, Bolt, Fan, Gauge as GaugeIcon,
  Heart, User, UserCheck, Briefcase, Calendar, TrendingUp as TrendingUpIcon
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
  fonts: {
    heading: "'Clash Display', 'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 30px rgba(245, 158, 11, 0.3)',
    glowStrong: '0 0 50px rgba(245, 158, 11, 0.5)',
  },
  animations: {
    durFast: '0.2s',
    durBase: '0.3s',
    durSlow: '0.5s',
    durVerySlow: '0.8s',
    ease: [0.25, 0.1, 0.25, 1],
    easeOut: [0.16, 1, 0.3, 1],
  }
  
};

// ============================================
// AI-INSPIRED PREMIUM ICON COMPONENTS
// ============================================
const AIIconWrapper = ({ children, size = 24, color = "currentColor" }) => (
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

// Quality Assurance Icon - Geometric precision
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

// Logistics & Dispatch Icon - Network nodes
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

// Ethics & Trust Icon - Balanced scales with shield
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

// Value Delivery Icon - Diamond with spark
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

// R&D Innovation Icon - Microscope with circuit
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

// Customer First Icon - Heart with shield
const CustomerIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M12 21C12 21 20 15 20 10C20 6 17 4 12 4C7 4 4 6 4 10C4 15 12 21 12 21Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 7V13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1" fill={color} stroke="none"/>
    <path d="M12 4V2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

// Manufacturing Icon - Factory with gear
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

// Process Icon - Flowchart arrows
const ProcessIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <path d="M4 12H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 8L4 12L8 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 8L20 12L16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="4" r="1.5" fill={color} stroke="none"/>
    <circle cx="12" cy="20" r="1.5" fill={color} stroke="none"/>
  </AIIconWrapper>
);

// Verification Icon - Checkmark with magnifying glass
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

// Audit Icon - Clipboard with check
const AuditIcon = ({ size = 24, color = "#f59e0b" }) => (
  <AIIconWrapper size={size} color={color}>
    <rect x="6" y="3" width="12" height="18" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 7H15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 11H15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 15H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 21V19C16 17.9 15.1 17 14 17H10C8.9 17 8 17.9 8 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 17V21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </AIIconWrapper>
);

// Dispatch Icon - Truck with speed lines
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

// Rejection Icon - X-circle with warning
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
// ADVANCED ANIMATION COMPONENTS
// ============================================

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseOver = (e) => {
      const target = e.target;
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

// 3D Tilt Card with Enhanced Effects
const TiltCard = ({ children, className = "", glow = false }) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(0);

  const handleMouseMove = (e) => {
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

// Animated Counter with Floating Effect
const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 2000, delay = 0 }) => {
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

// Scroll Reveal with Stagger
const ScrollReveal = ({ children, direction = "up", delay = 0, className = "", threshold = 0.1, duration = 0.8 }) => {
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
  
  const initial = directions[direction] || directions.up;

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

// Parallax Section Component
const ParallaxSection = ({ children, speed = 0.5, className = "" }) => {
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

// Animated Background Grid
const AnimatedGrid = () => (
  <motion.div 
    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)]"
    animate={{ 
      backgroundPosition: ["0px 0px", "80px 80px"],
    }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
  />
);

// Floating Particles Component
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

// Advanced Feature Card - Enhanced readability
const FeatureCard = ({ icon: Icon, title, description, gradient, metrics, delay }) => {
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

// Premium Stat Card - Enhanced readability
const StatCard = ({ icon: Icon, label, value, suffix = "", prefix = "", delay = 0, trend = null }) => (
  <ScrollReveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/40 transition-all duration-500 group backdrop-blur-sm relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-amber-500/5 transition-all duration-500"
      />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500">
          <Icon size={32} color="#f59e0b" />
        </div>
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-3">
          <AnimatedCounter value={value} suffix={suffix} prefix={prefix} delay={delay} />
        </div>
        <div className="text-base md:text-lg text-slate-300 uppercase tracking-wider font-semibold">{label}</div>
        {trend && (
          <motion.div 
            className="mt-3 text-base text-emerald-400 flex items-center justify-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{trend}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  </ScrollReveal>
);

// Premium Section Header - Enhanced visibility
const SectionHeader = ({ badge, title, highlight, description = "", align = "center", className = "" }) => (
  <div className={`mb-20 ${align === "center" ? "text-center" : ""} ${className}`}>
    <ScrollReveal direction="up">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 mb-6 backdrop-blur-sm">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
        </motion.div>
        <span className="text-sm md:text-base font-bold text-amber-400 uppercase tracking-wider">{badge}</span>
      </div>
    </ScrollReveal>
    <ScrollReveal direction="up" delay={0.1}>
      <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
        {title}{" "}
        <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent relative inline-block">
          {highlight}
          <motion.div 
            className="absolute -bottom-3 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
            initial={{ width: "0%", opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </span>
      </h2>
    </ScrollReveal>
    {description && (
      <ScrollReveal direction="up" delay={0.2}>
        <p className="text-slate-300 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </ScrollReveal>
    )}
  </div>
);

// Leadership Card Component (Enhanced for Leadership Team)
const LeadershipCard = ({ name, role, bio, delay, icon: Icon, color = "from-amber-500", socialLinks = [] }) => (
  <ScrollReveal direction="up" delay={delay}>
    <TiltCard glow>
      <motion.div 
        whileHover={{ y: -10 }}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 h-full flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent" />
        
        <div className="relative flex items-center gap-5 mb-6">
          <motion.div 
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color}/20 to-transparent flex items-center justify-center shrink-0`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-8 h-8 text-amber-400" />
          </motion.div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{name}</h3>
            <p className="text-amber-400 text-lg font-semibold">{role}</p>
          </div>
        </div>
        
        <p className="text-slate-300 text-base md:text-lg leading-relaxed flex-grow">
          {bio}
        </p>
        
        <div className="flex justify-start gap-3 mt-6 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {socialLinks.map((link, idx) => (
            <motion.div 
              key={idx}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {link.icon === 'linkedin' && <Linkedin className="w-5 h-5 text-white hover:text-black" />}
              {link.icon === 'mail' && <Mail className="w-5 h-5 text-white hover:text-black" />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  </ScrollReveal>
);

// Team Member Card (Simplified for larger team)
const EmployeeCard = ({ name, role, description, delay, initials }) => (
  <ScrollReveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ y: -5 }}
      className="group text-center p-6 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 h-full flex flex-col items-center"
    >
      <motion.div 
        className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl font-bold text-amber-400">{initials}</span>
      </motion.div>
      <h4 className="text-xl font-bold text-white mb-1">{name}</h4>
      <p className="text-amber-400 text-sm font-semibold mb-2">{role}</p>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  </ScrollReveal>
);

// Team Member Card - Enhanced readability (Original - Kept for compatibility)
const TeamMemberCard = ({ name, role, image = null, delay, socialLinks = [] }) => (
  <ScrollReveal direction="up" delay={delay}>
    <TiltCard glow>
      <motion.div 
        whileHover={{ y: -10 }}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 text-center border border-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
      >
        <div className="relative w-36 h-36 mx-auto mb-5">
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Users className="w-14 h-14 text-amber-400" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{name}</h3>
        <p className="text-amber-400 text-lg md:text-xl mb-4">{role}</p>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
          Leading DFPL's {role.toLowerCase()} initiatives with excellence and innovation
        </p>
        <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {socialLinks.map((link, idx) => (
            <motion.div 
              key={idx}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {link.icon === 'linkedin' && <Linkedin className="w-5 h-5 text-white hover:text-black" />}
              {link.icon === 'mail' && <Mail className="w-5 h-5 text-white hover:text-black" />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  </ScrollReveal>
);

// Testimonial Card - Enhanced readability
const TestimonialCard = ({ quote, author, role, delay }) => (
  <ScrollReveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
    >
      <Quote className="w-12 h-12 text-amber-500/30 mb-4" />
      <p className="text-slate-200 text-xl md:text-2xl leading-relaxed mb-6">{quote}</p>
      <div>
        <p className="text-white font-bold text-xl mb-1">{author}</p>
        <p className="text-amber-400 text-lg">{role}</p>
      </div>
    </motion.div>
  </ScrollReveal>
);

// ============================================
// MAIN COMPONENT
// ============================================

const About: React.FC = () => {
  const containerRef = useRef(null);
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

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(sectionId);
    }
  }, []);

  return (
    <HelmetProvider>
      <div ref={containerRef} className="bg-[#0A0A0F] min-h-screen text-white overflow-x-hidden selection:bg-amber-500 selection:text-black">
        
        <Helmet>
          <title>About DFPL | Durable Fastener Pvt. Ltd. - Engineering Integrity Since 2018</title>
          <meta name="description" content="Durable Fastener Pvt. Ltd. (DFPL) - India's premier fastener manufacturer with 95% One‑day dispatch, 99% order accuracy, and uncompromising quality standards since 2018." />
          <meta name="keywords" content="fastener manufacturer India, industrial fasteners, screws, bolts, DFPL, Rajkot fastener company, leadership team DFPL" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        </Helmet>

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

        {/* ============================================ */}
        {/* HERO SECTION - CINEMATIC ENTRY */}
        {/* ============================================ */}
        
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 overflow-hidden">
          <ParallaxSection speed={0.3} className="absolute inset-0 z-0">
            <div className="relative w-full h-full flex items-center justify-center">
              
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black whitespace-nowrap select-none bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.02) 80%)",
                  backgroundSize: "200% auto" 
                }}
                animate={{ 
                  backgroundPosition: ["200% 50%", "-200% 50%"] 
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                DURABLE
              </motion.div>

              <motion.div 
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)]"
                animate={{ 
                  backgroundPosition: ["0px 0px", "60px 60px"],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </ParallaxSection>

          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity, filter: `blur(${heroBlur}px)` }}
            className="max-w-[1400px] mx-auto w-full relative z-10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <ScrollReveal direction="up">
                  <motion.div 
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 mb-8 backdrop-blur-sm"
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
                    <span className="text-sm md:text-base font-bold text-amber-400 uppercase tracking-wider">Est. 2018 | Industrial Excellence</span>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.1}>
                  <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-bold leading-[0.9] mb-5 tracking-tighter">
                    Engineering{" "}
                    <motion.span 
                      className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent inline-block pb-[0.1em]"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{ backgroundSize: "200% auto" }}
                    >
                      Integrity.
                    </motion.span>
                    <br />
                    <span className="text-5xl md:text-6xl text-slate-400 block mt-4 font-light">
                      Built To Last.
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                  <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed mb-10 max-w-xl">
                    Defining the future of fasteners through <span className="text-white font-semibold relative inline-block group">
                      system-driven reliability
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                    </span> and unyielding industrial grit.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-full flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-amber-500/25 hover:shadow-amber-500/50 transition-all duration-300 text-lg"
                    >
                      <span className="relative z-10">Explore Our Products</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
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
                      className="px-8 py-4 border border-white/20 rounded-full font-bold hover:border-amber-500 hover:text-amber-400 transition-all duration-300 backdrop-blur-sm text-lg"
                    >
                      Download Brochure
                    </motion.button>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="left" delay={0.2}>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "95", label: "On-Time Dispatch", suffix: "%", color: "from-emerald-500", icon: LogisticsIcon },
                    { value: "99", label: "Order Accuracy", suffix: "%", color: "from-blue-500", icon: VerifyIcon },
                    { value: "8", label: "Years Excellence", suffix: "+", color: "from-purple-500", icon: AwardIcon },
                    { value: "100", label: "Client Satisfaction", suffix: "%", color: "from-amber-500", icon: CustomerIcon },
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] backdrop-blur-sm overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}/0 group-hover:${stat.color}/10 transition-all duration-500`} />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <stat.icon size={24} color="#f59e0b" />
                        </div>
                        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-2">
                          {stat.value}{stat.suffix}
                        </div>
                        <div className="text-base md:text-lg text-slate-300 font-bold">{stat.label}</div>
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20 group"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-[11px] sm:text-xs font-semibold text-slate-200 uppercase tracking-[0.3em] transition-all duration-300 drop-shadow-sm group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-md" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </section>

        {/* ============================================ */}
        {/* SECTION: WHO WE ARE - THE GENESIS */}
        {/* ============================================ */}
        <section id="who-we-are" className="min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#0A0A0F] via-[#050508] to-[#0A0A0F] overflow-y-auto">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 py-16 md:py-20 lg:py-24">
            
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="text-sm md:text-base font-bold text-amber-400 uppercase tracking-[0.2em]">THE GENESIS</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
                <span className="text-white">Who </span>
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">We Are</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Durable Fastener Pvt. Ltd. (DFPL) was founded by Mr. Vipul Sakariya with a singular 
                and unyielding purpose — to bridge the gap between heavy-duty manufacturing, global exporting, and professional, system-driven service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              
              <div className="space-y-8">
                
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <ManufacturingIcon size={28} color="#f59e0b" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-amber-400 uppercase tracking-wider mb-2">MANUFACTURING & EXPORT HUB</h3>
                      <p className="text-white font-semibold text-xl sm:text-2xl">Ravki Makhavad, Rajkot, Gujarat</p>
                      <p className="text-slate-400 text-base md:text-lg mt-2">Strategically located in India's industrial heartland</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <LogisticsIcon size={28} color="#f59e0b" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-blue-400 uppercase tracking-wider mb-2">DISTRIBUTION NETWORK</h3>
                      <p className="text-white font-semibold text-xl sm:text-2xl">Surat Branch & Warehouse</p>
                      <p className="text-slate-400 text-base md:text-lg mt-2">Serving clients across India with 48-hour delivery</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/5 to-transparent border border-amber-500/20">
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400">500+</p>
                    <p className="text-sm md:text-base font-semibold text-slate-400 uppercase tracking-wider mt-3">CLIENTS SERVED</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400">1000+</p>
                    <p className="text-sm md:text-base font-semibold text-slate-400 uppercase tracking-wider mt-3">PROJECTS COMPLETED</p>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-[3px] bg-amber-500"></div>
                    <h3 className="text-sm md:text-base font-bold text-amber-400 uppercase tracking-wider">OUR PHILOSOPHY</h3>
                  </div>
                  <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed">
                    Operating from <strong className="text-white font-bold">Rajkot</strong> — India's industrial nerve center, 
                    DFPL is built on <strong className="text-amber-400">reliable systems & precision engineering</strong>, 
                    and an unwavering commitment to customer satisfaction.
                  </p>
                </div>

                <div className="p-8 sm:p-10 lg:p-12 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                  
                  <svg className="w-12 h-12 text-amber-500/30 mb-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  
                  <p className="text-white text-2xl sm:text-3xl md:text-4xl font-medium leading-relaxed relative z-10 italic">
                    "We don't just supply fasteners — we engineer the integrity of your structures."
                  </p>
                  
                  <div className="flex items-center gap-4 mt-8 relative z-10">
                    <div className="w-12 h-[3px] bg-amber-500"></div>
                    <p className="text-slate-300 text-lg md:text-xl font-semibold">— Vipul Sakariya, Founder</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-6 rounded-xl bg-white/[0.02]">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed">
                      We transformed traditional hardware supply into a <strong className="text-amber-400 font-bold block sm:inline mt-1">system-driven engineering service</strong>
                    </p>
                    <p className="text-slate-400 text-base md:text-lg mt-3">Ensuring quality control, traceability, and technical support at every step.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 md:mt-20 pt-8 border-t border-white/[0.06]">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm md:text-base text-slate-400 font-semibold tracking-wide">FOUNDED ON</span>
                  <span className="text-base md:text-lg font-bold text-white">29th August 2018</span>
                </div>

                <div className="w-[2px] h-6 bg-white/10 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <span className="text-base md:text-lg font-medium text-slate-300">8+ Years of Excellence</span>
                </div>

                <div className="w-[2px] h-6 bg-white/10 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-base md:text-lg font-medium text-slate-400">ISO 9001:2015 Certified</span>
                </div>
              </div>
            </div>

          </div>
        </section>
        
        {/* ============================================ */}
        {/* SECTION: THE ORIGIN — THE STORY */}
        {/* ============================================ */}
        <section id="the-story" className="min-h-screen w-full flex flex-col justify-center px-4 lg:px-8 relative overflow-hidden py-12 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />

          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col justify-center h-full">
            
            <div className="mb-10 md:mb-16 flex-shrink-0">
              <SectionHeader 
                badge="THE ORIGIN — THE STORY"
                title="The Story Behind"
                highlight="DFPL"
                description="Before founding DFPL, Mr. Vipul Sakariya witnessed firsthand the friction caused by poor workplace systems and lack of accountability in the industry."
                align="center"
              />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="space-y-8 md:space-y-10">
                  
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="group p-6 md:p-8 lg:p-10 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent" />
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-5">
                        <motion.div 
                          className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />
                        </motion.div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">The Market Gap</h3>
                      </div>
                      
                      <p className="text-slate-200 text-lg md:text-xl lg:text-2xl leading-relaxed mb-5">
                        Manufacturers and exporters in Rajkot were producing quality fasteners, but lacked structured sales systems and proper quality control.
                      </p>
                      
                      <div className="mt-5 p-5 md:p-6 rounded-lg bg-amber-500/5 border-l-4 border-amber-500">
                        <p className="text-amber-400 text-lg md:text-xl font-semibold leading-relaxed">
                          Mr. Sakariya identified a critical shift:<br/>
                          <span className="text-white mt-2 block text-xl md:text-2xl">Fasteners are precision-engineered mechanical components.</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="group p-6 md:p-8 lg:p-10 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent" />
                    <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-5">
                        <motion.div 
                          className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Target className="w-6 h-6 md:w-7 md:h-7 text-blue-400" />
                        </motion.div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">The Dual Purpose</h3>
                      </div>
                      
                      <p className="text-slate-200 text-lg md:text-xl lg:text-2xl leading-relaxed mb-5">
                        DFPL was built with a dual mission:
                      </p>
                      
                      <ul className="space-y-4 mb-5">
                        <li className="flex items-start gap-4 text-slate-200 text-lg md:text-xl">
                          <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-emerald-400 flex-shrink-0 mt-1" />
                          <span>Eliminate internal system failures to create a stable, low-friction work environment.</span>
                        </li>
                        <li className="flex items-start gap-4 text-slate-200 text-lg md:text-xl">
                          <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-emerald-400 flex-shrink-0 mt-1" />
                          <span>Deliver consistent, reliable service every single time, without exceptions.</span>
                        </li>
                      </ul>
                      
                      <div className="mt-5 p-5 md:p-6 rounded-lg bg-emerald-500/5 border-l-4 border-emerald-500">
                        <p className="text-emerald-400 text-lg md:text-xl font-semibold leading-relaxed">
                          To achieve that dual mission, DFPL designed and implemented two operational pillars: the One-day dispatch Running inventory system and strict QC protocols.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.2}>
                <div className="h-full flex items-center">
                  <TiltCard glow className="w-full">
                    <motion.div 
                      className="p-10 md:p-14 lg:p-16 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 text-center relative overflow-hidden h-full flex flex-col justify-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]" />
                      
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="mx-auto mb-8 md:mb-10"
                      >
                        <Quote className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-amber-500/30 mx-auto" />
                      </motion.div>
                      
                      <p className="text-3xl md:text-4xl lg:text-5xl lg:leading-tight font-medium text-white italic relative z-10">
                        "What we sell is not just a product — we sell a service. The screw is just the beginning."
                      </p>
                      
                      <motion.div 
                        className="mt-10 md:mt-12 h-1 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 128, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                      
                      <div className="mt-8 md:mt-10 relative z-10">
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                          Vipul Sakariya
                        </p>
                        <p className="text-base md:text-lg lg:text-xl text-slate-200 tracking-wider uppercase font-semibold">
                          Founder & CEO, DFPL
                        </p>
                      </div>
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </motion.div>
                  </TiltCard>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* ============================================ */}
        {/* SECTION: THE EVOLUTION — THE EARLY JOURNEY */}
        {/* ============================================ */}
        <section id="early-journey" className="py-32 px-6 bg-gradient-to-b from-[#0A0A0F] via-[#050508] to-[#0A0A0F] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.06)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <SectionHeader 
              badge="THE EVOLUTION — THE EARLY JOURNEY"
              title="The Early"
              highlight="Journey"
              description="Every setback became a setup for a stronger system — DFPL's defining moments"
              align="center"
            />
            
            <ScrollReveal direction="up" delay={0.1}>
              <motion.div 
                className="mb-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 text-center max-w-4xl mx-auto relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-sm md:text-base font-bold text-red-400 uppercase tracking-wider">Critical Incident</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-5">The ₹1 Crore PCS Rejection</h3>
                  
                  <p className="text-slate-300 text-xl md:text-2xl mb-4 max-w-2xl mx-auto">
                    A major order of <strong className="text-white">1 crore / 10 million PCS</strong> was rejected due to a head-cutting issue.
                  </p>
                  
                  <motion.div 
                    className="mt-6 p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-amber-400 text-lg md:text-xl font-semibold">
                      Upon investigation, the root cause was identified: <span className="text-white">Seasonal variation in plywood density during winter.</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
            
            
           <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                
                <ScrollReveal direction="left" delay={0.2}>
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group h-full p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
                    
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Cog className="w-7 h-7 text-emerald-400" />
                      </motion.div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">Strategic Shift</h3>
                    </div>
                    
                    <p className="text-slate-300 text-lg md:text-xl mb-4">
                      We began analyzing international standards and building systems that account for:
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-base md:text-lg">Material science & metallurgy</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-base md:text-lg">Seasonal variations & environmental factors</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-base md:text-lg">Real-world application conditions</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.3}>
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group h-full p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent" />
                    
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <RefreshCw className="w-7 h-7 text-blue-400" />
                      </motion.div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">Turning Point</h3>
                    </div>
                    
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-5">
                      This failure became a breakthrough. DFPL shifted focus toward <strong className="text-white">application engineering</strong>, studying real-world usage conditions instead of just manufacturing standards.
                    </p>
                    
                    <div className="mt-5 p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border-l-3 border-emerald-500">
                      <p className="text-emerald-400 text-base md:text-lg font-bold mb-2">🎯 Key Learning:</p>
                      <p className="text-slate-300 text-base md:text-lg">
                        Quality is not just about product — it depends on environment, material behavior, and application conditions.
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="max-w-4xl mx-auto mb-16">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 relative overflow-hidden group shadow-lg"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <Quote className="w-10 h-10 text-amber-500/40 mb-4" />
                      <p className="text-slate-300 text-xl md:text-2xl font-medium italic leading-relaxed">
                        "This phase defined DFPL's core philosophy: We don't react to problems — we engineer systems that prevent them."
                      </p>
                      <motion.div 
                        className="mt-6 w-16 h-[2px] bg-amber-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-16 h-px bg-gradient-to-r from-amber-500 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                    <div className="w-16 h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/30" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: WHY CHOOSE US - FEATURE GRID */}
        {/* ============================================ */}
        <section className="py-32 px-6 bg-gradient-to-b from-[#0A0A0F] via-[#050508] to-[#0A0A0F]">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Why Choose DFPL"
              title="The Durable"
              highlight="Advantage"
              description="What makes us the preferred partner for industry leaders across India"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: QualityIcon, title: "Uncompromising Quality", description: "From raw material to final dispatch, each step is controlled, verified, and aligned with international standards to ensure zero compromise in performance and consistency.", gradient: "from-emerald-500", metrics: { value: "100%", label: "Quality Certified" } },
                { icon: DispatchIcon, title: "One-Day Dispatch", description: "Real-time inventory management with floor stock matching system records for guaranteed One‑day dispatch Running inventory.", gradient: "from-blue-500", metrics: { value: "95%", label: "On-Time Delivery" } },
                { icon: EthicsIcon, title: "Absolute Ethics", description: "Strict adherence to regulations and financial systems. Built for multi-decade sustainable growth.", gradient: "from-purple-500", metrics: { value: "8+", label: "Years Trust" } },
                { icon: ValueIcon, title: "10x Value Delivery", description: "Delivering 10x value for every rupee invested through superior quality and reliability.", gradient: "from-amber-500", metrics: { value: "10x", label: "ROI Delivered" } },
                { icon: InnovationIcon, title: "Advanced R&D", description: "Continuous innovation and development of new technologies for evolving industry needs.", gradient: "from-rose-500", metrics: { value: "24/7", label: "Innovation Lab" } },
                { icon: CustomerIcon, title: "Customer First", description: "24/7 support and dedicated relationship managers for every client account.", gradient: "from-indigo-500", metrics: { value: "100%", label: "Support Coverage" } }
              ].map((feature, idx) => (
                <FeatureCard key={idx} {...feature} delay={idx * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: MISSION & VISION - PREMIUM CARDS */}
        {/* ============================================ */}

        <section id="mission" className="py-32 px-6 relative bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Our Purpose"
              title="Mission &"
              highlight="Vision"
              description="Driving industrial excellence through quality and reliability."
            />

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal direction="right" delay={0.1}>
                <TiltCard glow>
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group relative p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Target className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-4xl font-bold text-white mb-4">Our Mission</h3>
                      <p className="text-slate-300 leading-relaxed text-xl md:text-2xl">
                        "To give the best. Improve every single day, across every department and every person in the organization."
                      </p>
                    </div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <TiltCard glow>
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group relative p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Eye className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-4xl font-bold text-white mb-4">Our Vision</h3>
                      <p className="text-slate-300 leading-relaxed text-xl md:text-2xl">
                        "IPO Bound 2030. DFPL aims to list on SME IPO by 2030 and Graduate to Main Board by 2036. Building India's most trusted fastener brand."
                      </p>
                    </div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: STATISTICS - DYNAMIC METRICS */}
        {/* ============================================ */}

        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <SectionHeader 
              badge="Performance Metrics"
              title="Our Numbers"
              highlight="Speak for Themselves"
              description="Real-time performance metrics that demonstrate our commitment to excellence"
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={LogisticsIcon} label="On-Time Dispatch" value={95} suffix="%" delay={0} trend="+12% YoY" />
              <StatCard icon={VerifyIcon} label="Order Accuracy" value={99} suffix="%" delay={0.1} trend="+5% YoY" />
              <StatCard icon={Users} label="Repeat Customers" value={92} suffix="%" delay={0.2} trend="+18% YoY" />
              <StatCard icon={Timer} label="Avg Response Time" value={45} suffix="min" delay={0.3} trend="-30% YoY" />
              <StatCard icon={RejectionIcon} label="Rejection Rate" value={1.2} suffix="%" delay={0.4} trend="-40% YoY" />
              <StatCard icon={TrendingUp} label="Annual Turnover" value={5.12} prefix="₹" suffix="Cr" delay={0.5} trend="+25% YoY" />
              <StatCard icon={ManufacturingIcon} label="Monthly Capacity" value={100} suffix="Tons" delay={0.6} trend="+15% YoY" />
              <StatCard icon={Globe} label="Cities Served" value={50} suffix="+" delay={0.7} trend="Expanding" />
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: OUR PROCESS - TIMELINE STYLE */}
        {/* ============================================ */}

        <section 
          id="process" 
          className="min-h-[100dvh] flex flex-col justify-center px-6 bg-gradient-to-b from-[#050508] to-[#0A0A0F] overflow-hidden py-8 md:py-12"
        >
          <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col">
            <div className="shrink-0 mb-8 md:mb-12">
              <SectionHeader 
                badge="Our Protocol"
                title="The DFPL"
                highlight="Process"
                description="A systematic approach ensuring zero errors and 100% reliability"
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center flex-grow min-h-0">
              
              {/* Left Column - Steps */}
              <div className="relative h-full flex flex-col justify-center">
                <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-500 via-amber-500/30 to-transparent hidden md:block" />
                
                <div className="space-y-4 md:space-y-6">
                  {[
                    { step: "01", title: "Engineering Flow", desc: "Raw Material Inspection → Wire Drawing & Annealing → Cold Heading (Forging) → Thread Rolling → Packing & Dispatch → Optical Sorting → Surface Coating → Heat Treatment", icon: Settings, color: "from-amber-500" },
                    { step: "02", title: "Verification Trigger", desc: "Order/PI is printed and handed to the packing floor before moving", icon: FileCheck, color: "from-blue-500" },
                    { step: "03", title: "Mandatory QC Sign-off", desc: "Size, grade, and quantity are verified against the PI. Non-negotiable", icon: ClipboardCheck, color: "from-emerald-500" },
                    { step: "04", title: "Independent Audit Check", desc: "Dedicated validator audits the shipment independently before billing", icon: Users, color: "from-purple-500" },
                    { step: "05", title: "Final Confirmation", desc: "Billing team verifies stock. LR details shared instantly", icon: Truck, color: "from-rose-500" }
                  ].map((step, idx) => (
                    <ScrollReveal key={idx} direction="right" delay={idx * 0.05}>
                      <motion.div 
                        className="group flex items-center gap-5 p-4 md:p-5 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/30 transition-all duration-500 relative"
                        whileHover={{ x: 10 }}
                      >
                        <div className="hidden md:block absolute -left-[27px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-glow" />
                        
                        <motion.div 
                          className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${step.color}/20 to-transparent flex items-center justify-center text-xl md:text-2xl font-bold text-amber-400 group-hover:scale-110 transition-transform`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {step.step}
                        </motion.div>
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-base md:text-lg text-slate-300 leading-normal">{step.desc}</p>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Right Column - Card */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="w-full">
                  <TiltCard glow>
                    <motion.div 
                      className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center mb-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-5"
                        >
                          <Shield className="w-10 h-10 text-amber-400" />
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Commitment</h3>
                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                          "If wrong material is sent, DFPL covers 100% of replacement costs. If a delay occurs, we deliver before the deadline with 2 buffer days."
                        </p>
                      </div>
                      
                      <div className="border-t border-white/10 pt-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-base md:text-lg text-slate-300 font-semibold">Zero error rate in material accuracy</span>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ThumbsUp className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                          </motion.div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <motion.div 
                            className="bg-gradient-to-r from-amber-500 to-amber-400 h-3 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-6 text-center">
                          <div className="p-3 md:p-4 rounded-xl bg-white/5">
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">100%</div>
                            <div className="text-base md:text-lg font-medium text-slate-300">Accountability</div>
                          </div>
                          <div className="p-3 md:p-4 rounded-xl bg-white/5">
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">0%</div>
                            <div className="text-base md:text-lg font-medium text-slate-300">Compromise</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              </ScrollReveal>
              
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: VALUES - CORE PRINCIPLES */}
        {/* ============================================ */}

        <section id="values" className="py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Core Values"
              title="The Principles That"
              highlight="Guide Us"
              description="Our foundational values that shape every decision we make"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
                    <motion.div 
                      className="group text-center p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/40 transition-all duration-500 h-full"
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color}/20 to-transparent flex items-center justify-center mx-auto mb-4`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <value.icon size={32} color="#f59e0b" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                      <p className="text-base text-slate-300 mb-3">{value.description}</p>
                      <div className="text-sm text-amber-400/80 uppercase tracking-wider font-semibold">{value.metric}</div>
                    </motion.div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: LEADERSHIP TEAM - NEW SECTION */}
        {/* ============================================ */}

        <section id="leadership" className="py-32 px-6 bg-gradient-to-b from-[#050508] to-[#0A0A0F] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.04)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="The Visionaries"
              title="Our"
              highlight="Leadership"
              description="A leadership team united by a shared vision of industrial excellence, system-driven integrity, and sustainable growth. Their collective expertise drives DFPL's mission to become India's most trusted fastener brand."
            />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vipul Sakariya - Founder & CEO */}
              <LeadershipCard 
                name="Vipul Sakariya"
                role="Founder & Managing Director"
                bio="The visionary behind DFPL, Vipul identified the critical gap between manufacturing potential and service reliability. With over a decade of industry experience, he built DFPL from ground up with a philosophy rooted in system-driven integrity, ethical business practices, and long-term value creation. He leads the company's strategic direction, IPO roadmap, and brand building initiatives."
                delay={0}
                icon={Crown}
                color="from-amber-500"
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
              
              {/* Dipti Sakariya - Quality & Compliance */}
              <LeadershipCard 
                name="Dipti Sakariya"
                role="Head of Quality Assurance & Compliance"
                bio="Dipti ensures that every fastener leaving DFPL's facility meets uncompromising quality standards. She oversees the entire QC protocol from raw material inspection to final sign-off, maintaining ISO 9001:2015 certifications and implementing stringent quality checkpoints across all production stages. Her leadership makes 'zero defect' a daily reality."
                delay={0.1}
                icon={Shield}
                color="from-emerald-500"
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
              
              {/* Dhaval Vataliya - Sales & Business Development */}
              <LeadershipCard 
                name="Dhaval Vataliya"
                role="Sales & Business Development Director"
                bio="Dhaval drives DFPL's market expansion and client relationships with a customer-first approach. His deep understanding of industrial fastener applications across sectors like automotive, infrastructure, and engineering has built long-term partnerships with over 500+ clients nationwide. He leads a high-performance sales team focused on value-driven solutions."
                delay={0.2}
                icon={TrendingUpIcon}
                color="from-blue-500"
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
              
              {/* Kishan Shiroya - Operations & Supply Chain */}
              <LeadershipCard 
                name="Kishan Shiroya"
                role="Operations & Supply Chain Head"
                bio="The architect behind DFPL's industry-leading 95% one-day dispatch rate. Kishan manages the complete operational workflow from raw material procurement to final delivery, ensuring seamless coordination between production, inventory, and logistics. His process optimization and inventory management systems have redefined reliability standards in fastener distribution."
                delay={0.3}
                icon={Settings}
                color="from-purple-500"
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: TEAM MEMBERS - NEW SECTION (10 MEMBERS) */}
        {/* ============================================ */}

        <section id="our-team" className="py-32 px-6 bg-gradient-to-b from-[#0A0A0F] to-[#050508]">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="The Execution Force"
              title="Meet Our"
              highlight="Team"
              description="Behind every successful dispatch, every quality check, and every satisfied client is a dedicated team committed to excellence, accuracy, and continuous improvement."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {/* Ayushi Savaliya */}
              <EmployeeCard 
                name="Ayushi Savaliya"
                role="Senior Marketing Executive"
                description="Crafting compelling brand narratives and digital strategy to amplify DFPL's market presence."
                delay={0}
                initials="AS"
              />
              
              {/* Rohit Padavi */}
              <EmployeeCard 
                name="Rohit Padavi"
                role="Production Coordinator"
                description="Ensuring smooth workflow from raw material to finished goods with precision scheduling."
                delay={0.05}
                initials="RP"
              />
              
              {/* Daniel Gavit */}
              <EmployeeCard 
                name="Daniel Gavit"
                role="Warehouse & Logistics Lead"
                description="Orchestrating the 95% on-time dispatch record through systematic inventory management."
                delay={0.1}
                initials="DG"
              />
              
              {/* Payal Teraiya */}
              <EmployeeCard 
                name="Payal Teraiya"
                role="Customer Success Specialist"
                description="The friendly voice ensuring complete client satisfaction from order to delivery."
                delay={0.15}
                initials="PT"
              />
              
              {/* Prinsi Patoliya */}
              <EmployeeCard 
                name="Prinsi Patoliya"
                role="Procurement Analyst"
                description="Managing vendor relationships and raw material quality for consistent production."
                delay={0.2}
                initials="PP"
              />
              
              {/* Asmita Dhanani */}
              <EmployeeCard 
                name="Asmita Dhanani"
                role="Quality Control Inspector"
                description="Vigilantly checking every batch against ISO standards for zero defect output."
                delay={0.25}
                initials="AD"
              />
              
              {/* Yagni Gajera */}
              <EmployeeCard 
                name="Yagni Gajera"
                role="Sales Coordinator"
                description="Bridging client needs with internal sales systems for seamless order processing."
                delay={0.3}
                initials="YG"
              />
              
              {/* Hasti Kamani */}
              <EmployeeCard 
                name="Hasti Kamani"
                role="HR & Admin Executive"
                description="Cultivating DFPL's people-first work culture and talent development programs."
                delay={0.35}
                initials="HK"
              />
              
              {/* Hemanshi Vaghasiya */}
              <EmployeeCard 
                name="Hemanshi Vaghasiya"
                role="Finance & Accounts Associate"
                description="Ensuring financial accuracy, compliance, and transparent reporting across operations."
                delay={0.4}
                initials="HV"
              />
              
              {/* Dipali Gangera */}
              <EmployeeCard 
                name="Dipali Gangera"
                role="Junior Design Engineer"
                description="Assisting in product development and R&D for innovative fastener solutions."
                delay={0.45}
                initials="DG"
              />
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: TESTIMONIALS */}
        {/* ============================================ */}

        <section className="py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Client Love"
              title="What Our"
              highlight="Clients Say"
              description="Trusted by precision-driven industries across the globe"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard 
                quote="DFPL has been our trusted partner for over 5 years. Their quality standards and on-time delivery are unmatched in the industry."
                author="Ramesh Patel"
                role="Director, Bhumi Associates"
                delay={0}
              />
              <TestimonialCard 
                quote="The professionalism and system-driven approach of DFPL sets them apart. They treat fasteners as precision-engineered products, not just hardware."
                author="Suresh Mehta"
                role="Owner, Ramdev Hardware"
                delay={0.1}
              />
              <TestimonialCard 
                quote="Zero defects, zero delays, zero excuses. That's the DFPL promise they've delivered consistently for years."
                author="Ankit Shah"
                role="Purchase Head, Leading OEM"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* Founder's Quote Section */}
        <section className="py-40 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12)_0%,transparent_70%)]" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <ScrollReveal direction="up">
              <motion.div 
                className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-8 border-2 border-amber-500/30"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Quote className="w-14 h-14 text-amber-400" strokeWidth={1.5} />
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-5xl lg:text-6xl font-light italic text-slate-200 leading-relaxed mb-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                "If we said 5 days — you will have it in 4. We have{" "}
                <span className="text-white font-bold not-italic relative inline-block">
                  never missed a commitment
                  <motion.span 
                    className="absolute bottom-1 left-0 w-full h-4 bg-amber-500/40 -z-10 rounded-sm"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>{" "}
                in 8 years. And we never will."
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-3">
                  Vipul Sakariya
                </div>
                <div className="text-base md:text-lg text-amber-400 font-bold uppercase tracking-[0.2em]">Founder & Visionary, DFPL</div>
                
                <motion.div 
                  className="w-20 h-[2px] bg-amber-500 mx-auto mt-6"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal direction="up">
              <motion.div 
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-12 md:p-16 text-center"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10" />
                
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ 
                      x: Math.random() * 600 - 300,
                      y: Math.random() * 300 - 150,
                      scale: 0
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.4,
                      repeat: Infinity,
                    }}
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  />
                ))}
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-6"
                  >
                    <Gem className="w-14 h-14 text-white/80" />
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">Ready to Partner with Excellence?</h2>
                  <p className="text-amber-100 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join India's most trusted fastener manufacturer. Experience the DFPL difference with guaranteed quality and on-time delivery.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-white text-amber-700 font-bold rounded-full flex items-center justify-center gap-2 shadow-xl overflow-hidden text-lg md:text-xl"
                    >
                      <span className="relative z-10">Contact Sales</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-amber-100 to-white"
                        initial={{ x: "100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 text-lg md:text-xl"
                    >
                      <Phone className="w-5 h-5" />
                      Request Quote
                    </motion.button>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-amber-100 text-base md:text-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>ISO Certified</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-100 text-base md:text-lg">
                      <Shield className="w-5 h-5" />
                      <span>100% Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-100 text-base md:text-lg">
                      <DispatchIcon size={20} color="#fffbeb" />
                      <span>PAN India Delivery</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        <style dangerouslySetInnerHTML={{ __html: `
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: #0A0A0F;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #d97706;
          }
          
          ::selection {
            background: #f59e0b;
            color: #000;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-10px) translateX(5px); }
            75% { transform: translateY(10px) translateX(-5px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.2; filter: blur(100px); }
            50% { opacity: 0.4; filter: blur(120px); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 4s ease-in-out infinite;
          }
          
          .shimmer-text {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          
          .glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </HelmetProvider>
  );
};

export default About;
