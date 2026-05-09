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
  Globe, Briefcase, Rocket, Quote, MoveRight, Layers, Building2,
  Play, Star, Crown, Sparkles, Clock, Shield, ThumbsUp, ChevronDown,
  Hexagon, Activity, Cpu, CircuitBoard, Globe2, Award as AwardIcon,
  Linkedin, Mail, Menu, X, Instagram, Facebook, Youtube, 
  Phone, Mail as MailIcon, MapPin as MapPinIcon, Send, Check,
  Circle, CircleDot, Diamond, Gem, Trophy, BriefcaseBusiness,
  CandlestickChart, ChartNoAxesCombined, CircleGauge,
  Cog, Wrench, Nut, Bolt, Fan, Gauge as GaugeIcon
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

// Advanced Feature Card
const FeatureCard = ({ icon: Icon, title, description, delay = 0, gradient = "from-amber-500", metrics = null }) => (
  <ScrollReveal direction="up" delay={delay}>
    <TiltCard glow className="h-full">
      <motion.div 
        whileHover={{ y: -8 }}
        className="group relative p-8 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 backdrop-blur-sm overflow-hidden h-full"
      >
        {/* Background Gradient on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}/0 to-transparent group-hover:${gradient}/[0.08] transition-all duration-700`} />
        
        {/* Glowing Orb */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        
        <div className="relative z-10">
          {/* Icon Container with Animation */}
          <motion.div 
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500"
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7 text-amber-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
          </motion.div>
          
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Optional Metrics Display */}
          {metrics && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-2xl font-bold text-amber-400">{metrics.value}</div>
              <div className="text-xs text-slate-500">{metrics.label}</div>
            </div>
          )}
        </div>
        
        {/* Animated Bottom Border */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-transparent"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </TiltCard>
  </ScrollReveal>
);

// Premium Stat Card
const StatCard = ({ icon: Icon, label, value, suffix = "", prefix = "", delay = 0, trend = null }) => (
  <ScrollReveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/40 transition-all duration-500 group backdrop-blur-sm relative overflow-hidden"
    >
      {/* Hover Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-amber-500/5 transition-all duration-500"
      />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500">
          <Icon className="w-7 h-7 text-amber-400 group-hover:text-white" strokeWidth={1.5} />
        </div>
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-2">
          <AnimatedCounter value={value} suffix={suffix} prefix={prefix} delay={delay} />
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">{label}</div>
        
        {/* Trend Indicator */}
        {trend && (
          <motion.div 
            className="mt-2 text-xs text-emerald-400 flex items-center justify-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
          >
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  </ScrollReveal>
);

// Premium Section Header
const SectionHeader = ({ badge, title, highlight, description = "", align = "center", className = "" }) => (
  <div className={`mb-20 ${align === "center" ? "text-center" : ""} ${className}`}>
    <ScrollReveal direction="up">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 mb-6 backdrop-blur-sm">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
        </motion.div>
        <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">{badge}</span>
      </div>
    </ScrollReveal>
    
    <ScrollReveal direction="up" delay={0.1}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
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
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </ScrollReveal>
    )}
  </div>
);

// Team Member Card with 3D Effect
const TeamMemberCard = ({ name, role, image = null, delay, socialLinks = [] }) => (
  <ScrollReveal direction="up" delay={delay}>
    <TiltCard glow>
      <motion.div 
        whileHover={{ y: -10 }}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 text-center border border-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
      >
        {/* Avatar with animated ring */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Users className="w-12 h-12 text-amber-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-amber-400 text-sm mb-3">{role}</p>
        <p className="text-slate-400 text-sm">
          Leading DFPL's {role.toLowerCase()} initiatives with excellence and innovation
        </p>
        
        {/* Social Links with fade-in on hover */}
        <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {socialLinks.map((link, idx) => (
            <motion.div 
              key={idx}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {link.icon === 'linkedin' && <Linkedin className="w-4 h-4 text-white hover:text-black" />}
              {link.icon === 'mail' && <Mail className="w-4 h-4 text-white hover:text-black" />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  </ScrollReveal>
);

// Testimonial Card
const TestimonialCard = ({ quote, author, role, delay }) => (
  <ScrollReveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
    >
      <Quote className="w-10 h-10 text-amber-500/30 mb-4" />
      <p className="text-slate-300 leading-relaxed mb-6">{quote}</p>
      <div>
        <p className="text-white font-semibold">{author}</p>
        <p className="text-amber-400 text-sm">{role}</p>
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
  
  // Parallax values
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  // Check if mobile for custom cursor
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setShowCustomCursor(window.innerWidth >= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll to section
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
        
        {/* SEO & Fonts */}
        <Helmet>
          <title>About DFPL | Durable Fastener Pvt. Ltd. - Engineering Integrity Since 2018</title>
          <meta name="description" content="Durable Fastener Pvt. Ltd. (DFPL) - India's premier fastener manufacturer with 95% on-time dispatch, 99% order accuracy, and uncompromising quality standards since 2018." />
          <meta name="keywords" content="fastener manufacturer India, industrial fasteners, screws, bolts, DFPL, Rajkot fastener company" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        </Helmet>

        {/* Custom Cursor (Desktop only) */}
        {showCustomCursor && <CustomCursor />}

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 z-[100] origin-left shadow-[0_0_20px_rgba(245,158,11,0.5)]"
          style={{ scaleX }}
        />

        {/* Particle & Ambient Effects */}
        <FloatingParticles count={30} />
        <AnimatedGrid />
        
        {/* Ambient Gradient Orbs */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen animate-pulse" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px] pointer-events-none z-0" />

        {/* ============================================ */}
        {/* HERO SECTION - CINEMATIC ENTRY */}
        {/* ============================================ */}
        
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 overflow-hidden">
          {/* Animated Background Shapes */}
          <ParallaxSection speed={0.3} className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.015] whitespace-nowrap select-none">
                DURABLE
              </div>
              {/* Animated Grid */}
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
              
              {/* Left Content */}
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
                    <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Est. 2018 // Industrial Excellence</span>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.1}>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-8 tracking-tighter">
                    Engineering{" "}
                    <motion.span 
                      className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent inline-block"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{ backgroundSize: "200% auto" }}
                    >
                      Integrity.
                    </motion.span>
                    <br />
                    <span className="text-4xl md:text-5xl text-slate-500 block mt-4 font-light">
                      Built To Last.
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
                    Defining the future of fasteners through <span className="text-white font-semibold relative inline-block group">
                      system-driven reliability
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                    </span> and unyielding industrial grit.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-full flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-amber-500/25 hover:shadow-amber-500/50 transition-all duration-300"
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
                      className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:border-amber-500 hover:text-amber-400 transition-all duration-300 backdrop-blur-sm"
                    >
                      Download Brochure
                    </motion.button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Content - Animated Trust Indicators */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "95", label: "On-Time Dispatch", suffix: "%", color: "from-emerald-500", icon: Truck },
                    { value: "99", label: "Order Accuracy", suffix: "%", color: "from-blue-500", icon: CheckCircle2 },
                    { value: "8", label: "Years Excellence", suffix: "+", color: "from-purple-500", icon: Award },
                    { value: "100", label: "Client Satisfaction", suffix: "%", color: "from-amber-500", icon: ThumbsUp },
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] backdrop-blur-sm overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}/0 group-hover:${stat.color}/10 transition-all duration-500`} />
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <stat.icon className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                        </div>
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-1">
                          {stat.value}{stat.suffix}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </motion.div>

          {/* Animated Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-slate-500" />
            </motion.div>
          </motion.div>
        </section>

        {/* ============================================ */}
        {/* SECTION: WHO WE ARE - THE GENESIS (NEW) */}
        {/* ============================================ */}
      <section id="who-we-are" className="py-32 px-6 relative bg-gradient-to-b from-[#0A0A0F] via-[#050508] to-[#0A0A0F]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <SectionHeader 
              badge="01 // THE GENESIS — WHO WE ARE"
              title="The Story Behind"
              highlight="DFPL"
              description="Durable Fastener Pvt. Ltd. (DFPL) was founded by Mr. Vipul Sakariya with a singular and unyielding purpose — to bridge the gap between heavy-duty manufacturing and professional, system-driven service."
              align="center"
            />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
              {/* Left Column - Info Cards */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="space-y-6">
                  {/* Factory Card */}
                  <motion.div 
                    whileHover={{ x: 15, scale: 1.02 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-5">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Factory className="w-7 h-7 text-amber-400 group-hover:text-white transition-colors" />
                      </motion.div>
                      <div>
                        <div className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">The Factory</div>
                        <div className="text-white font-medium text-lg">Ravki Makhavad, Rajkot, Gujarat</div>
                        <div className="text-xs text-slate-500 font-mono mt-2 inline-block px-2 py-1 rounded bg-white/5">Log Code: RAJKOT_GUJ_IND</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Global Presence Card */}
                  <motion.div 
                    whileHover={{ x: 15, scale: 1.02 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-5">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Globe className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                      </motion.div>
                      <div>
                        <div className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">Global Presence</div>
                        <div className="text-white font-medium text-lg">Surat Branch & Warehouse serving Pan-India</div>
                        <div className="text-xs text-slate-500 font-mono mt-2 inline-block px-2 py-1 rounded bg-white/5">Log Code: PAN_INDIA</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
              
              {/* Right Column - Content */}
              <ScrollReveal direction="left" delay={0.3}>
                <div className="space-y-8">
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Operating from <strong className="text-white">Rajkot</strong> — India's industrial nerve center, DFPL is built on reliable systems, precision engineering, and a deep commitment to customer satisfaction.
                  </p>
                  
                  <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 relative overflow-hidden group">
                    <motion.div 
                      className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"
                    />
                    <Quote className="w-10 h-10 text-amber-500/40 mb-4 relative z-10" />
                    <p className="text-white text-xl md:text-2xl font-medium italic leading-relaxed relative z-10">
                      "We don't just supply fasteners — we engineer the integrity of your structures."
                    </p>
                    <motion.div 
                      className="mt-4 w-16 h-[2px] bg-gradient-to-r from-amber-500 to-transparent relative z-10"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <p className="text-amber-400 font-semibold tracking-wide text-lg">
                      We transformed traditional hardware supply into a system-driven engineering service.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Founded Badge - Centered */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="mt-20 text-center">
                <motion.div 
                  className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.08] backdrop-blur-sm shadow-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </motion.div>
                  <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Founded on</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">29th August 2018</span>
                  <div className="w-px h-6 bg-white/10" />
                  <span className="text-sm text-slate-400">8+ Years of Excellence</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* ============================================ */}
        {/* SECTION: THE ORIGIN — THE STORY */}
        {/* ============================================ */}
        <section id="the-story" className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <SectionHeader 
              badge="02 // THE ORIGIN — THE STORY"
              title="The Story Behind"
              highlight="DFPL"
              description="Before founding DFPL, Mr. Vipul Sakariya witnessed firsthand the friction caused by poor workplace systems and lack of accountability in the industry."
              align="center"
            />
            
            <div className="grid lg:grid-cols-2 gap-12 mt-16">
              {/* Left Column - Content Blocks */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="space-y-8">
                  {/* Market Gap Card */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <AlertTriangle className="w-6 h-6 text-amber-400" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white">The Market Gap</h3>
                      </div>
                      <p className="text-slate-300 leading-relaxed mb-4">
                        Manufacturers in Rajkot were producing quality fasteners, but lacked structured sales systems and proper quality control.
                      </p>
                      <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border-l-2 border-amber-500">
                        <p className="text-amber-400 font-medium">
                          Mr. Sakariya identified a critical shift:<br/>
                          <span className="text-white">Fasteners are not just hardware — they are precision-engineered mechanical components.</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Dual Purpose Card */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Target className="w-6 h-6 text-blue-400" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white">The Dual Purpose</h3>
                      </div>
                      <p className="text-slate-300 leading-relaxed mb-4">
                        DFPL was built with a dual mission:
                      </p>
                      <ul className="space-y-3 mb-5">
                        <li className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span>To eliminate internal system failures for employees</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span>To deliver consistent, reliable service to customers</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-4 rounded-xl bg-emerald-500/5 border-l-2 border-emerald-500">
                        <p className="text-emerald-400 font-medium">
                          This led to the creation of a one-day dispatch system, backed by strict quality control protocols.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
              
              {/* Right Column - Quote Card (Sticky) */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="sticky top-32">
                  <TiltCard glow>
                    <motion.div 
                      className="p-10 md:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 text-center relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]" />
                      
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="mx-auto mb-6"
                      >
                        <Quote className="w-20 h-20 text-amber-500/30 mx-auto" />
                      </motion.div>
                      
                      <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed italic relative z-10">
                        "What we sell is not just a product — we sell a service. The screw is just the beginning."
                      </p>
                      
                      <motion.div 
                        className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 96, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                      
                      <div className="mt-6 relative z-10">
                        <p className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                          Vipul Sakariya
                        </p>
                        <p className="text-sm text-slate-400 mt-1">Founder & CEO, DFPL</p>
                      </div>
                      
                      {/* Animated border effect */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"
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
              badge="03 // THE EVOLUTION — THE EARLY JOURNEY"
              title="The Early"
              highlight="Journey"
              description="Every setback became a setup for a stronger system — DFPL's defining moments"
              align="center"
            />
            
            {/* Critical Incident Card - Hero Style */}
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
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Critical Incident</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">The ₹8 Lakh Rejection</h3>
                  
                  <p className="text-slate-300 text-lg md:text-xl mb-4 max-w-2xl mx-auto">
                    A major order of <strong className="text-white">5,000 kg</strong> was rejected due to a head-cutting issue.
                  </p>
                  
                  <motion.div 
                    className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-amber-400 font-medium">
                      🔍 Upon investigation, the root cause was identified: <span className="text-white">Seasonal variation in plywood density during winter.</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
            
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left Column */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="space-y-8">
                  {/* Turning Point Card */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent" />
                    
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <RefreshCw className="w-6 h-6 text-blue-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">Turning Point</h3>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-5">
                      This failure became a breakthrough. DFPL shifted focus toward <strong className="text-white">application engineering</strong>, studying real-world usage conditions instead of just manufacturing standards.
                    </p>
                    
                    <div className="mt-5 p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border-l-3 border-emerald-500">
                      <p className="text-emerald-400 font-semibold mb-2">🎯 Key Learning:</p>
                      <p className="text-slate-300">
                        Quality is not just about product — it depends on environment, material behavior, and application conditions.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Strategic Shift Card */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
                    
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Cog className="w-6 h-6 text-emerald-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">Strategic Shift</h3>
                    </div>
                    
                    <p className="text-slate-300 mb-4">
                      We began analyzing international standards and building systems that account for:
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-slate-300">Material science & metallurgy</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-slate-300">Seasonal variations & environmental factors</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-slate-300">Real-world application conditions</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
              
              {/* Right Column */}
              <ScrollReveal direction="left" delay={0.3}>
                <div className="space-y-8">
                  {/* Breakthrough Achievements Card */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 hover:border-amber-500/50 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                        <Trophy className="w-6 h-6 text-amber-400" />
                        Breakthrough Achievements
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-5">
                        <motion.div 
                          className="text-center p-5 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06]"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">120</div>
                          <div className="text-sm text-slate-400 mt-1">Cartons Delivered</div>
                          <div className="text-xs text-emerald-400 mt-2 font-medium">Value: ₹5 Lakh</div>
                        </motion.div>
                        
                        <motion.div 
                          className="text-center p-5 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06]"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">200</div>
                          <div className="text-sm text-slate-400 mt-1">Cartons Delivered</div>
                          <div className="text-xs text-emerald-400 mt-2 font-medium">Value: ₹12 Lakh</div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Early Trusted Partners Card */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-amber-500/40 transition-all duration-500"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      Early Trusted Partners
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      <motion.span 
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 text-slate-300 text-sm"
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        Bhumi Associates
                      </motion.span>
                      <motion.span 
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 text-slate-300 text-sm"
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        Ramdev Hardware
                      </motion.span>
                    </div>
                  </motion.div>
                  
                  {/* Closing Philosophy Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="relative z-10">
                      <Quote className="w-8 h-8 text-amber-500/40 mb-3" />
                      <p className="text-slate-300 text-lg font-medium italic leading-relaxed">
                        "This phase defined DFPL's core philosophy: We don't react to problems — we engineer systems that prevent them."
                      </p>
                      <motion.div 
                        className="mt-4 w-12 h-[2px] bg-amber-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Timeline Decorative Element */}
            <ScrollReveal direction="up" delay={0.4}>
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
        </section>

        {/* ============================================ */}
        {/* SECTION: WHY CHOOSE US - FEATURE GRID (ORIGINAL - KEPT AS IS) */}
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
                { icon: ShieldCheck, title: "Uncompromising Quality", description: "QC at every stage—wire, heading, threading, heat treat—ensuring international standard compliance.", gradient: "from-emerald-500", metrics: { value: "100%", label: "Quality Certified" } },
                { icon: Truck, title: "One-Day Dispatch", description: "Real-time inventory management with floor stock matching system records for guaranteed 1-day dispatch.", gradient: "from-blue-500", metrics: { value: "95%", label: "On-Time Delivery" } },
                { icon: Scale, title: "Absolute Ethics", description: "Strict adherence to regulations and financial systems. Built for multi-decade sustainable growth.", gradient: "from-purple-500", metrics: { value: "8+", label: "Years Trust" } },
                { icon: Zap, title: "10x Value Delivery", description: "Delivering 10x value for every rupee invested through superior quality and reliability.", gradient: "from-amber-500", metrics: { value: "10x", label: "ROI Delivered" } },
                { icon: Microscope, title: "Advanced R&D", description: "Continuous innovation and development of new technologies for evolving industry needs.", gradient: "from-rose-500", metrics: { value: "24/7", label: "Innovation Lab" } },
                { icon: Users, title: "Customer First", description: "24/7 support and dedicated relationship managers for every client account.", gradient: "from-indigo-500", metrics: { value: "100%", label: "Support Coverage" } }
              ].map((feature, idx) => (
                <FeatureCard key={idx} {...feature} delay={idx * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: MISSION & VISION - PREMIUM CARDS (ORIGINAL) */}
        {/* ============================================ */}

        <section id="mission" className="py-32 px-6 relative bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Our Purpose"
              title="Mission &"
              highlight="Vision"
              description="Driving industrial excellence through uncompromising quality and system-driven reliability"
            />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission Card */}
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
                      <p className="text-slate-300 leading-relaxed text-xl">
                        "To give the best. Improve every single day, across every department and every person in the organization."
                      </p>
                      <div className="mt-8 flex items-center gap-2 text-amber-400 group-hover:gap-4 transition-all">
                        <span className="text-sm font-medium uppercase tracking-wider">Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>

              {/* Vision Card */}
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
                      <p className="text-slate-300 leading-relaxed text-xl">
                        "IPO Bound 2030. DFPL aims to list on SME IPO by 2030 and Graduate to Main Board by 2036. Building India's most trusted fastener brand."
                      </p>
                      <div className="mt-8 flex items-center gap-2 text-amber-400 group-hover:gap-4 transition-all">
                        <span className="text-sm font-medium uppercase tracking-wider">Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: STATISTICS - DYNAMIC METRICS (ORIGINAL) */}
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
              <StatCard icon={Truck} label="On-Time Dispatch" value={95} suffix="%" delay={0} trend="+12% YoY" />
              <StatCard icon={CheckCircle2} label="Order Accuracy" value={99} suffix="%" delay={0.1} trend="+5% YoY" />
              <StatCard icon={Users} label="Repeat Customers" value={92} suffix="%" delay={0.2} trend="+18% YoY" />
              <StatCard icon={Timer} label="Avg Response Time" value={45} suffix="min" delay={0.3} trend="-30% YoY" />
              <StatCard icon={XCircle} label="Rejection Rate" value={1.2} suffix="%" delay={0.4} trend="-40% YoY" />
              <StatCard icon={TrendingUp} label="Annual Turnover" value={5.12} prefix="₹" suffix="Cr" delay={0.5} trend="+25% YoY" />
              <StatCard icon={Factory} label="Monthly Capacity" value={100} suffix="Tons" delay={0.6} trend="+15% YoY" />
              <StatCard icon={Globe} label="Cities Served" value={50} suffix="+" delay={0.7} trend="Expanding" />
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: OUR PROCESS - TIMELINE STYLE (ORIGINAL) */}
        {/* ============================================ */}

        <section id="process" className="py-32 px-6 bg-gradient-to-b from-[#050508] to-[#0A0A0F]">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Our Protocol"
              title="The DFPL"
              highlight="Process"
              description="A systematic approach ensuring zero errors and 100% reliability"
            />

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Process Steps with Timeline */}
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500 via-amber-500/30 to-transparent hidden md:block" />
                
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Engineering Flow", desc: "Wire → Heading → Threading → Stock → Heat Treat → Plating → Packing → Dispatch", icon: Settings, color: "from-amber-500" },
                    { step: "02", title: "Verification Trigger", desc: "Order/PI is printed and handed to the packing floor before a single box moves", icon: FileCheck, color: "from-blue-500" },
                    { step: "03", title: "Mandatory QC Sign-off", desc: "Size, grade, and quantity are verified against the PI. Sign-off is non-negotiable", icon: ClipboardCheck, color: "from-emerald-500" },
                    { step: "04", title: "Third-Party Cross-Check", desc: "Dedicated validator audits the shipment independently before billing", icon: Users, color: "from-purple-500" },
                    { step: "05", title: "Final Confirmation", desc: "Billing team verifies physical stock. LR and transport details shared instantly", icon: Truck, color: "from-rose-500" }
                  ].map((step, idx) => (
                    <ScrollReveal key={idx} direction="right" delay={idx * 0.1}>
                      <motion.div 
                        className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/30 transition-all duration-500 relative"
                        whileHover={{ x: 15 }}
                      >
                        {/* Timeline Dot */}
                        <div className="hidden md:block absolute -left-[31px] top-8 w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-glow" />
                        
                        <motion.div 
                          className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color}/20 to-transparent flex items-center justify-center text-2xl font-bold text-amber-400 group-hover:scale-110 transition-transform`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {step.step}
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Quality Guarantee Card - Premium */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="sticky top-32">
                  <TiltCard glow>
                    <motion.div 
                      className="p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center mb-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-4"
                        >
                          <Shield className="w-12 h-12 text-amber-400" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-4">Our Commitment</h3>
                        <p className="text-slate-300 text-xl leading-relaxed">
                          "If wrong material is sent, DFPL covers 100% of replacement costs. If a delay occurs, we deliver before the deadline with 2 buffer days."
                        </p>
                      </div>
                      
                      <div className="border-t border-white/10 pt-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-slate-400 font-medium">Zero error rate in material accuracy</span>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ThumbsUp className="w-5 h-5 text-amber-400" />
                          </motion.div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 rounded-xl bg-white/5">
                            <div className="text-2xl font-bold text-amber-400">100%</div>
                            <div className="text-xs text-slate-500">Accountability</div>
                          </div>
                          <div className="p-3 rounded-xl bg-white/5">
                            <div className="text-2xl font-bold text-amber-400">0%</div>
                            <div className="text-xs text-slate-500">Compromise</div>
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
        {/* SECTION: VALUES - CORE PRINCIPLES (ORIGINAL) */}
        {/* ============================================ */}

        <section id="values" className="py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Core Values"
              title="The Principles That"
              highlight="Guide Us"
              description="Our foundational values that shape every decision we make"
            />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                { icon: ShieldCheck, title: "Quality First", description: "Zero compromise", color: "from-emerald-500", metric: "ISO Certified" },
                { icon: Scale, title: "Absolute Ethics", description: "Words are sacred", color: "from-blue-500", metric: "100% Trust" },
                { icon: Zap, title: "10x Value", description: "Exceed investment", color: "from-amber-500", metric: "ROI Focus" },
                { icon: Users, title: "Human Touch", description: "People before profit", color: "from-purple-500", metric: "Employee First" },
                { icon: Award, title: "Sacred Brand", description: "Protect the trust", color: "from-rose-500", metric: "Legacy Builder" },
              ].map((value, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.05}>
                  <TiltCard>
                    <motion.div 
                      className="group text-center p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/40 transition-all duration-500 h-full"
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${value.color}/20 to-transparent flex items-center justify-center mx-auto mb-4`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <value.icon className="w-7 h-7 text-amber-400" />
                      </motion.div>
                      <h4 className="text-base font-bold text-white mb-1">{value.title}</h4>
                      <p className="text-xs text-slate-400 mb-2">{value.description}</p>
                      <div className="text-[10px] text-amber-400/60 uppercase tracking-wider">{value.metric}</div>
                    </motion.div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: TEAM - LEADERSHIP (ORIGINAL) */}
        {/* ============================================ */}

        <section id="team" className="py-32 px-6 bg-gradient-to-b from-[#0A0A0F] to-[#050508]">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Leadership"
              title="Meet Our"
              highlight="Team"
              description="The dedicated professionals driving DFPL's success"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TeamMemberCard 
                name="Vipul Sakariya" 
                role="Founder & CEO" 
                delay={0} 
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
              <TeamMemberCard 
                name="Rajesh Mehta" 
                role="Operations Head" 
                delay={0.1} 
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
              <TeamMemberCard 
                name="Priya Sharma" 
                role="Quality Control" 
                delay={0.2} 
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
              <TeamMemberCard 
                name="Amit Patel" 
                role="Sales Director" 
                delay={0.3} 
                socialLinks={[{ icon: 'linkedin' }, { icon: 'mail' }]}
              />
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: TESTIMONIALS (ORIGINAL) */}
        {/* ============================================ */}

        <section className="py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader 
              badge="Client Love"
              title="What Our"
              highlight="Clients Say"
              description="Trusted by industry leaders across India"
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

        {/* ============================================ */}
        {/* SECTION: ROADMAP - FUTURE JOURNEY (ORIGINAL) */}
        {/* ============================================ */}

        <section className="py-32 px-6 bg-gradient-to-b from-[#0A0A0F] via-[#050508] to-[#0A0A0F] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <SectionHeader 
              badge="Future Roadmap"
              title="Financial"
              highlight="Journey"
              description="Our ambitious growth trajectory towards becoming India's most trusted fastener brand"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { year: "2025-26", value: "₹5.12 Cr", label: "Current Turnover", status: "Active", color: "from-emerald-500", icon: Target, achievements: ["95% Dispatch", "99% Accuracy"] },
                { year: "2026-27", value: "₹10 Cr", label: "Scaling Target", status: "Projected", color: "from-amber-500", icon: TrendingUp, achievements: ["PAN India", "New Verticals"] },
                { year: "2030", value: "₹30 Cr", label: "SME IPO Vision", status: "Vision", color: "from-blue-500", icon: Rocket, achievements: ["IPO Listing", "Global Reach"] },
              ].map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                  <TiltCard glow>
                    <motion.div 
                      whileHover={{ y: -8 }}
                      className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] text-center overflow-hidden group h-full"
                    >
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} to-transparent`} />
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color}/20 to-transparent flex items-center justify-center mx-auto mb-4`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-7 h-7 text-amber-400" />
                        </motion.div>
                        <div className="text-3xl font-bold text-white mb-2">{item.year}</div>
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-3">{item.value}</div>
                        <div className="text-sm text-slate-400 mb-4">{item.label}</div>
                        <div className={`inline-block px-4 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.color}/20 to-transparent text-amber-400 mb-4`}>
                          {item.status}
                        </div>
                        
                        {/* Achievement Badges */}
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {item.achievements.map((ach, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400">
                              {ach}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Timeline Connection Animation */}
            <div className="hidden md:flex justify-between items-center mt-12 px-8">
              {[1, 2].map((_, idx) => (
                <motion.div 
                  key={idx}
                  className="flex-1 h-[2px] bg-gradient-to-r from-amber-500/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: idx * 0.5 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: FOUNDER'S NOTE - CINEMATIC (ORIGINAL) */}
        {/* ============================================ */}

        <section className="py-40 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12)_0%,transparent_70%)]" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <ScrollReveal direction="up">
              <motion.div 
                className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-8 border-2 border-amber-500/30"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Quote className="w-12 h-12 text-amber-400" strokeWidth={1.5} />
              </motion.div>
              
              <motion.h2 
                className="text-2xl md:text-4xl lg:text-5xl font-light italic text-slate-200 leading-relaxed mb-12"
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
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-3">
                  Vipul Sakariya
                </div>
                <div className="text-sm text-amber-400 font-medium uppercase tracking-[0.2em]">Founder & Visionary, DFPL</div>
                
                {/* Signature Line */}
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

        {/* ============================================ */}
        {/* SECTION: CTA - CONVERSION FOCUSED (ORIGINAL) */}
        {/* ============================================ */}

        <section id="contact" className="py-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal direction="up">
              <motion.div 
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-12 md:p-16 text-center"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10" />
                
                {/* Animated Particles */}
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
                    <Gem className="w-12 h-12 text-white/80" />
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Ready to Partner with Excellence?</h2>
                  <p className="text-amber-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join India's most trusted fastener manufacturer. Experience the DFPL difference with guaranteed quality and on-time delivery.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-white text-amber-700 font-bold rounded-full flex items-center justify-center gap-2 shadow-xl overflow-hidden"
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
                      className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Request Quote
                    </motion.button>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-amber-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>ISO Certified</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-100 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>100% Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-100 text-sm">
                      <Truck className="w-4 h-4" />
                      <span>PAN India Delivery</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* Custom CSS for premium styling */}
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
          
          /* Smooth Scroll Behavior */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom Animations */
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
          
          /* Glass Effect */
          .glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          /* Hide scrollbar for cleaner look on some elements */
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
