import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Wrench, ArrowUpRight,
  ChevronRight, ShoppingCart, Loader2, Share2, Printer,
  Ruler, Maximize2, Info, X, FileText,
  ArrowRight, Lock, Activity, FileCheck, Layers,
  ShieldCheck, Tag, Settings,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import MagicZoomClone from '../components/MagicZoomClone';
import { Helmet } from 'react-helmet-async';

const { useParams, Link } = ReactRouterDOM;

// ─────────────────────────────────────────────────────────────────────────────
// THEME & CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const THEME = {
  bg: "bg-[#dbdbdc]",
  textPrimary: "text-neutral-900",
  textSecondary: "text-neutral-700",
  border: "border-neutral-200",
};

const fontHeading = { fontFamily: '"Oswald", sans-serif', letterSpacing: '0.03em' };
const fontBody = { fontFamily: '"Roboto", sans-serif' };
const fontMono = { fontFamily: '"Roboto Mono", monospace' };

const blueprintGridStyleLight = {
  backgroundImage:
    'linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),' +
    'linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)',
  backgroundSize: '24px 24px',
};

const PERFORMANCE_KEYS_DISPLAY = [
  "Core Hardness", "Surface Hardness", "Tensile Strength",
  "Shear Strength", "Salt Spray Resistance", "Installation Speed", "Temperature Range",
];

const HIDDEN_SPECS = [
  'hardness', 'sst', 'torque', 'salt', 'box_qty', 'carton_qty',
  'standard', 'seo_keywords', 'tds_url', 'mtc_url',
  'head type', 'head_type', 'drive', 'drive type', 'drive_type', 'type',
  ...PERFORMANCE_KEYS_DISPLAY.map(s => s.toLowerCase()),
];

const R2_BASE = "https://pub-ffd0eb07a99540ac95c35c521dd8f7ae.r2.dev";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const itemVar: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 20 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const cleanImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const fileName = url.split('/').pop();
  return `${R2_BASE}/${fileName}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// UPDATED SCHEMA BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

/** FAQPage schema */
const buildFaqSchema = (faqs: { question: string; answer: string }[]) => {
  if (!faqs?.length) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question.trim(),
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer.trim() },
    })),
  });
};

/** BreadcrumbList schema */
const buildBreadcrumbSchema = (productName: string, slug: string) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://durablefastener.com" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://durablefastener.com/products" },
      { "@type": "ListItem", "position": 3, "name": productName, "item": `https://durablefastener.com/product/${slug}` },
    ],
  });

/** Updated Product schema with mainEntityOfPage Fix */
const buildProductSchema = (
  product: any,
  slug: string,
  selectedDia: string,
  selectedLen: string,
  selectedUnit: string,
) => {
  const images = (product.images || []).map((img: string) => cleanImageUrl(img));
  const additionalProperties = (product.specifications || [])
    .filter((s: any) => !HIDDEN_SPECS.includes(s.key.toLowerCase()))
    .map((s: any) => ({
      "@type": "PropertyValue",
      "name": s.key,
      "value": s.value,
    }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    // ✅ ADDED: Link schema directly to the specific WebPage URL for better detection
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://durablefastener.com/product/${slug}`
    },
    "name": product.name,
    "description": product.short_description || "",
    "image": images,
    "sku": product.slug,
    "mpn": product.slug,
    "brand": { "@type": "Brand", "name": "Classone" },
    "manufacturer": {
      "@type": "Organization",
      "name": "Durable Fastener Private Limited",
      "url": "https://durablefastener.com",
    },
    "category": product.category || "Industrial Fasteners",
    "size": selectedDia && selectedLen ? `${selectedDia} × ${selectedLen} ${selectedUnit}` : undefined,
    ...(additionalProperties.length > 0 ? { "additionalProperty": additionalProperties } : {}),
    "offers": {
      "@type": "Offer",
      "url": `https://durablefastener.com/product/${slug}`,
      "priceCurrency": "INR",
      "price": "0",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "0",
        "priceCurrency": "INR",
        "description": "Contact for bulk pricing",
      },
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Durable Fastener Private Limited" },
    },
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface FaqProps { 
  question: string; 
  answer: string; 
  index: number; 
}
const FaqAccordion: React.FC<FaqProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`mb-4 border border-neutral-200 rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'ring-2 ring-yellow-500 shadow-lg bg-white' : 'bg-neutral-50 hover:bg-neutral-100'
      }`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 flex items-center justify-between text-left group">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isOpen ? 'bg-yellow-500 text-neutral-900' : 'bg-neutral-200 text-neutral-500 group-hover:bg-neutral-300'
          }`}>
            <HelpCircle size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold uppercase tracking-tight text-neutral-900" style={fontHeading}>{question}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={isOpen ? 'text-yellow-600' : 'text-neutral-400'}>
          <Settings size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <div className="px-6 pb-8 flex gap-6 relative">
              <div className="w-1 bg-yellow-500 rounded-full shrink-0" />
              <div className="flex-1">
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 text-neutral-600 leading-relaxed font-medium whitespace-pre-wrap">{answer}</div>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400">
                  <Wrench size={12} /> Tech Verified Answer
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className={`flex items-center gap-2.5 mb-5 border-b ${THEME.border} pb-3`}>
    <Icon size={20} className="text-yellow-600" />
    <span className="text-lg font-bold uppercase tracking-wide text-neutral-900" style={fontHeading}>{title}</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDia, setSelectedDia] = useState('');
  const [selectedLen, setSelectedLen] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('mm');
  const [selectedType, setSelectedType] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeImageOverride, setActiveImageOverride] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeAppIndex, setActiveAppIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!slug) throw new Error('No product slug');
        const { data: productData, error } = await supabase.from('products').select('*').eq('slug', slug).single();
        if (error) throw error;
        const { data: vData } = await supabase.from('product_variants').select('*').eq('product_id', productData.id);
        
        const fullProduct = {
          ...productData,
          applications: productData.applications || [],
          variants: vData || [],
          specifications: productData.specifications || [],
          dimensional_specifications: productData.dimensional_specifications || [],
          faqs: productData.faqs || [],
        };
        setProduct(fullProduct);
        if (vData && vData.length > 0) {
          const dias = Array.from(new Set(vData.map((v: any) => v.diameter).filter(Boolean))).sort((a: any, b: any) => parseFloat(a) - parseFloat(b));
          if (dias.length > 0) setSelectedDia(dias[0] as string);
        }
      } catch (err) { console.error('ProductDetail fetch error:', err); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [slug]);

  // Derived Logic (Truncated for brevity, remains the same as original)
  const uniqueDiameters = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(new Set(product.variants.map((v: any) => v.diameter?.toString().trim()).filter(Boolean))).sort((a: any, b: any) => parseFloat(a) - parseFloat(b));
  }, [product]);

  const diameterTitle = useMemo(() => {
    if (!product?.variants || !selectedDia) return 'Select Diameter';
    const v = product.variants.find((v: any) => v.diameter === selectedDia);
    return v?.diameter_unit === 'gauge' ? 'Select Gauge' : 'Select Diameter';
  }, [product, selectedDia]);

  const availableLengthOptions = useMemo(() => {
    if (!product?.variants || !selectedDia) return [];
    const filtered = product.variants.filter((v: any) => v.diameter === selectedDia);
    const map = new Map();
    filtered.forEach((v: any) => {
      if (!v.length) return;
      const u = v.unit || 'mm';
      const lengths = v.length.includes(',') ? v.length.split(',').map((l: string) => l.trim()) : [v.length];
      lengths.forEach((l: string) => { const key = `${l}_${u}`; if (!map.has(key)) map.set(key, { value: l, unit: u }); });
    });
    return Array.from(map.values()).sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
  }, [product, selectedDia]);

  useEffect(() => {
    if (availableLengthOptions.length > 0) {
      const valid = availableLengthOptions.some(o => o.value === selectedLen && o.unit === selectedUnit);
      if (!valid) { setSelectedLen(availableLengthOptions[0].value); setSelectedUnit(availableLengthOptions[0].unit); }
    }
  }, [selectedDia, availableLengthOptions]);

  const availableFinishes = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(new Set(product.variants.filter((v: any) => v.diameter === selectedDia && (v.length === selectedLen || v.length?.includes(selectedLen)) && (v.unit || 'mm') === selectedUnit).map((v: any) => v.finish).filter(Boolean)));
  }, [product, selectedDia, selectedLen, selectedUnit]);

  const availableTypes = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(new Set(product.variants.filter((v: any) => v.diameter === selectedDia && (v.length === selectedLen || v.length?.includes(selectedLen)) && (v.unit || 'mm') === selectedUnit).map((v: any) => v.type).filter(Boolean)));
  }, [product, selectedDia, selectedLen, selectedUnit]);

  const displayImages = useMemo(() => {
    const imgs = (product?.images || ['https://via.placeholder.com/600x600?text=No+Image']).map(cleanImageUrl);
    if (activeImageOverride) return [cleanImageUrl(activeImageOverride), ...imgs];
    return imgs;
  }, [product, activeImageOverride]);

  const handleFinishClick = (finish: string) => {
    let img = product.finish_images?.[finish] || product.variants?.find((v: any) => v.finish === finish && v.image)?.image || null;
    setActiveImageOverride(img); setSelectedImageIndex(0);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    const img = product.type_images?.[type] || product.variants?.find((v: any) => v.type === type && v.diameter === selectedDia && v.image)?.image || product.variants?.find((v: any) => v.type === type && v.image)?.image || null;
    setActiveImageOverride(img); setSelectedImageIndex(0);
  };

  // ── Schema strings ───────────────────
  const faqSchemaJson = useMemo(() => buildFaqSchema(product?.faqs), [product?.faqs]);
  const breadcrumbSchemaJson = useMemo(() => buildBreadcrumbSchema(product?.name || '', slug!), [product?.name, slug]);
  const productSchemaJson = useMemo(() => buildProductSchema(product, slug!, selectedDia, selectedLen, selectedUnit), [product, slug, selectedDia, selectedLen, selectedUnit]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#dbdbdc]"><Loader2 className="animate-spin text-yellow-500" size={48} /></div>;
  if (!product) return <div className="h-screen flex items-center justify-center bg-[#dbdbdc]"><h2>Specification Not Found</h2></div>;

  const currentImage = displayImages[selectedImageIndex];
  const standard = product.specifications?.find((s: any) => s.key.toLowerCase() === 'standard')?.value;
  const showDimensions = product.technical_drawing || product.dimensional_specifications?.length > 0;

  return (
    <div className={`${THEME.bg} min-h-screen pb-24 pt-[170px] md:pt-[200px]`} style={fontBody}>
      {/* ─────────────────────────────────────────────────────────────────────────────
          SEO HEAD INJECTION - GOVERNANCE COMPLIANT
      ───────────────────────────────────────────────────────────────────────────── */}
      <Helmet>
        <title>{product.name} Manufacturer | Durable Fastener Rajkot</title>
        <link rel="canonical" href={`https://durablefastener.com/product/${slug}`} />
        <meta name="description" content={`Buy ${product.name} directly from factory. ISO certified fastener manufacturer in Rajkot.`} />
        
        {/* ✅ UPDATED: Strict Length Check (over 50 chars) prevents empty/broken script tags */}
        {faqSchemaJson && faqSchemaJson.length > 50 && (
          <script type="application/ld+json">{faqSchemaJson}</script>
        )}
        
        <script type="application/ld+json">{breadcrumbSchemaJson}</script>
        <script type="application/ld+json">{productSchemaJson}</script>
      </Helmet>

      {/* ── Breadcrumb Nav ── */}
      <div className="fixed top-[80px] md:top-[170px] left-0 w-full z-30 bg-neutral-900 border-b border-neutral-800 shadow-md">
        <div className="max-w-7xl mx-auto px-5 py-2.5">
          <nav className="flex items-center gap-2 text-[14px] font-medium">
            <Link to="/" className="text-neutral-400 hover:text-white">Home</Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <Link to="/products" className="text-neutral-400 hover:text-white">Products</Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <span className="text-yellow-500 font-bold uppercase truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* ... Title & Product Details (Internal components remain unchanged) ... */}
        {/* Simplified for clarity, keep your original JSX structure for UI */}
        
        {/* ── Technical Knowledge Base (Visible Content) ── */}
        {product.faqs?.length > 0 && (
          <section className="py-24 bg-neutral-900 rounded-3xl mt-20 p-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16">
                <h3 className="text-4xl md:text-6xl font-bold uppercase text-white" style={fontHeading}>
                  Technical <span className="text-yellow-500">Knowledge</span> Base
                </h3>
              </div>
              <div className="space-y-4">
                {product.faqs.map((faq: any, idx: number) => (
                  <FaqAccordion key={idx} index={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;