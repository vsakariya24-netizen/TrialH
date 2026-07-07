// src/pages/admin/AboutAdmin.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Save, Loader2, LayoutTemplate, FileText, 
  Globe, Image as ImageIcon, Upload, Trash2,
  Settings, Target, Users, Award, TrendingUp
} from 'lucide-react';

interface AboutFormData {
  id: number;
  // Hero Section
  hero_tagline: string;
  hero_title_highlight: string;
  hero_description: string;
  hero_bg_image: string;
  
  // Who We Are
  who_we_are_badge: string;
  who_we_are_title: string;
  who_we_are_highlight: string;
  who_we_are_image: string;
  who_we_are_ceo_name: string;
  who_we_are_ceo_role: string;
  who_we_are_quote: string;
  who_we_are_philosophy: string;
  who_we_are_location: string;
  who_we_are_distribution: string;
  who_we_are_clients: string;
  who_we_are_projects: string;
  
  // Journey
  journey_badge: string;
  journey_title: string;
  journey_highlight: string;
  journey_description: string;
  journey_card1_title: string;
  journey_card1_description: string;
  journey_card1_detail: string;
  journey_card2_title: string;
  journey_card2_description: string;
  journey_card2_points: string;
  journey_card3_title: string;
  journey_card3_description: string;
  journey_card3_detail: string;
  journey_quote: string;
  
  // Mission & Vision
  mission_badge: string;
  mission_title: string;
  mission_highlight: string;
  mission_description: string;
  mission_text: string;
  vision_text: string;
  
  // Statistics
  stat1_value: string;
  stat1_label: string;
  stat1_trend: string;
  stat2_value: string;
  stat2_label: string;
  stat2_trend: string;
  stat3_value: string;
  stat3_label: string;
  stat3_trend: string;
  stat4_value: string;
  stat4_label: string;
  stat4_trend: string;
  stat5_value: string;
  stat5_label: string;
  stat5_trend: string;
  stat6_value: string;
  stat6_label: string;
  stat6_trend: string;
  stat7_value: string;
  stat7_label: string;
  stat7_trend: string;
  stat8_value: string;
  stat8_label: string;
  stat8_trend: string;
  
  // Process
  process_badge: string;
  process_title: string;
  process_highlight: string;
  process_description: string;
  
  // Why Choose Us
  why_badge: string;
  why_title: string;
  why_highlight: string;
  why_description: string;
  why_card1_title: string;
  why_card1_desc: string;
  why_card1_metric: string;
  why_card2_title: string;
  why_card2_desc: string;
  why_card2_metric: string;
  why_card3_title: string;
  why_card3_desc: string;
  why_card3_metric: string;
  why_card4_title: string;
  why_card4_desc: string;
  why_card4_metric: string;
  why_card5_title: string;
  why_card5_desc: string;
  why_card5_metric: string;
  why_card6_title: string;
  why_card6_desc: string;
  why_card6_metric: string;
  
  // Commitment
  commitment_title: string;
  commitment_description: string;
  commitment_stat1_value: string;
  commitment_stat1_label: string;
  commitment_stat2_value: string;
  commitment_stat2_label: string;
  commitment_global_text: string;
  commitment_quality_text: string;
  commitment_support_text: string;
  commitment_eco_text: string;
  
  // Values
  values_badge: string;
  values_title: string;
  values_highlight: string;
  values_description: string;
  
  // Testimonials
  testimonial_badge: string;
  testimonial_title: string;
  testimonial_highlight: string;
  testimonial_description: string;
  testimonial1_quote: string;
  testimonial1_author: string;
  testimonial1_role: string;
  testimonial2_quote: string;
  testimonial2_author: string;
  testimonial2_role: string;
  testimonial3_quote: string;
  testimonial3_author: string;
  testimonial3_role: string;
  
  // Founder Quote
  founder_quote: string;
  founder_name: string;
  founder_role: string;
  
  // Contact CTA
  contact_title: string;
  contact_description: string;
  
  // Metadata
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  
  updated_at: string;
}

const AboutAdmin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const [formData, setFormData] = useState<AboutFormData>({
    id: 1,
    hero_tagline: '',
    hero_title_highlight: '',
    hero_description: '',
    hero_bg_image: '',
    who_we_are_badge: '',
    who_we_are_title: '',
    who_we_are_highlight: '',
    who_we_are_image: '',
    who_we_are_ceo_name: '',
    who_we_are_ceo_role: '',
    who_we_are_quote: '',
    who_we_are_philosophy: '',
    who_we_are_location: '',
    who_we_are_distribution: '',
    who_we_are_clients: '',
    who_we_are_projects: '',
    journey_badge: '',
    journey_title: '',
    journey_highlight: '',
    journey_description: '',
    journey_card1_title: '',
    journey_card1_description: '',
    journey_card1_detail: '',
    journey_card2_title: '',
    journey_card2_description: '',
    journey_card2_points: '',
    journey_card3_title: '',
    journey_card3_description: '',
    journey_card3_detail: '',
    journey_quote: '',
    mission_badge: '',
    mission_title: '',
    mission_highlight: '',
    mission_description: '',
    mission_text: '',
    vision_text: '',
    stat1_value: '',
    stat1_label: '',
    stat1_trend: '',
    stat2_value: '',
    stat2_label: '',
    stat2_trend: '',
    stat3_value: '',
    stat3_label: '',
    stat3_trend: '',
    stat4_value: '',
    stat4_label: '',
    stat4_trend: '',
    stat5_value: '',
    stat5_label: '',
    stat5_trend: '',
    stat6_value: '',
    stat6_label: '',
    stat6_trend: '',
    stat7_value: '',
    stat7_label: '',
    stat7_trend: '',
    stat8_value: '',
    stat8_label: '',
    stat8_trend: '',
    process_badge: '',
    process_title: '',
    process_highlight: '',
    process_description: '',
    why_badge: '',
    why_title: '',
    why_highlight: '',
    why_description: '',
    why_card1_title: '',
    why_card1_desc: '',
    why_card1_metric: '',
    why_card2_title: '',
    why_card2_desc: '',
    why_card2_metric: '',
    why_card3_title: '',
    why_card3_desc: '',
    why_card3_metric: '',
    why_card4_title: '',
    why_card4_desc: '',
    why_card4_metric: '',
    why_card5_title: '',
    why_card5_desc: '',
    why_card5_metric: '',
    why_card6_title: '',
    why_card6_desc: '',
    why_card6_metric: '',
    commitment_title: '',
    commitment_description: '',
    commitment_stat1_value: '',
    commitment_stat1_label: '',
    commitment_stat2_value: '',
    commitment_stat2_label: '',
    commitment_global_text: '',
    commitment_quality_text: '',
    commitment_support_text: '',
    commitment_eco_text: '',
    values_badge: '',
    values_title: '',
    values_highlight: '',
    values_description: '',
    testimonial_badge: '',
    testimonial_title: '',
    testimonial_highlight: '',
    testimonial_description: '',
    testimonial1_quote: '',
    testimonial1_author: '',
    testimonial1_role: '',
    testimonial2_quote: '',
    testimonial2_author: '',
    testimonial2_role: '',
    testimonial3_quote: '',
    testimonial3_author: '',
    testimonial3_role: '',
    founder_quote: '',
    founder_name: '',
    founder_role: '',
    contact_title: '',
    contact_description: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    updated_at: '',
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('about_content')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (data) {
          setFormData(prev => ({ ...prev, ...data }));
        } else {
          // If no record exists, create one
          await supabase.from('about_content').insert({ id: 1 });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('about_content')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', 1);
      
      if (error) throw error;
      alert('✅ About page content published successfully!');
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const filePath = `about-assets/${Date.now()}-${file.name.replace(/\s/g, '-')}`;

    setUploading(true);
    try {
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, [fieldName]: publicUrl }));
    } catch (err: any) {
      alert(`❌ Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fieldName: string, url: string) => {
    if (!url) return;
    if (!window.confirm("Remove this media? (Click PUBLISH to save changes)")) return;

    try {
      const pathParts = url.split('/storage/v1/object/public/images/');
      if (pathParts.length > 1) {
        const filePath = pathParts[1];
        await supabase.storage.from('images').remove([filePath]);
      }
      setFormData(prev => ({ ...prev, [fieldName]: '' }));
    } catch (err) {
      console.error("Storage delete error:", err);
      setFormData(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const renderField = (name: string, label: string, placeholder: string = '', type: 'text' | 'textarea' = 'text') => {
    const value = (formData as any)[name] || '';
    return type === 'textarea' ? (
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-3 border border-slate-300 rounded-lg font-mono text-xs min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>
    ) : (
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
        <input
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>
    );
  };

  const renderMediaUpload = (fieldName: string, label: string, currentUrl: string) => (
    <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
      <label className="block text-xs font-bold text-slate-500 uppercase mb-3">{label}</label>
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={currentUrl} 
              className="flex-1 p-3 bg-white border border-slate-200 rounded text-sm text-slate-400 truncate"
              readOnly 
            />
            <label className="bg-blue-600 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition flex items-center gap-2">
              {uploading ? <Loader2 size={16} className="animate-spin"/> : <Upload size={16} />}
              Upload
              <input 
                type="file" 
                hidden 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, fieldName)} 
              />
            </label>
          </div>
        </div>
        <div className="w-32 h-24 bg-slate-900 rounded-lg overflow-hidden border border-slate-300 relative group flex-shrink-0">
          {currentUrl ? (
            <>
              <img src={currentUrl} className="w-full h-full object-cover" alt="Preview" />
              <button 
                onClick={() => handleDeleteFile(fieldName, currentUrl)}
                className="absolute inset-0 bg-red-600/90 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <Trash2 size={20} />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-[10px] text-slate-500 uppercase">No Image</div>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Globe },
    { id: 'who', label: 'Who We Are', icon: Users },
    { id: 'journey', label: 'Journey', icon: TrendingUp },
    { id: 'mission', label: 'Mission & Vision', icon: Target },
    { id: 'stats', label: 'Statistics', icon: Award },
    { id: 'why', label: 'Why Choose Us', icon: Settings },
    { id: 'values', label: 'Values', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: Users },
    { id: 'seo', label: 'SEO', icon: FileText },
  ];

  if (fetching) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 w-12 h-12 mx-auto" />
          <p className="mt-4 text-slate-500 font-medium">Loading about page data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Globe className="text-blue-600" size={24} />
            <h1 className="font-black text-xl text-slate-800">About Page Admin</h1>
            <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full text-slate-500 font-bold uppercase">v1.0</span>
          </div>
          <button 
            onClick={handleSave} 
            disabled={loading || uploading} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
            PUBLISH CHANGES
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6 overflow-x-auto">
        <div className="flex gap-2 border-b border-slate-200 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* ==================== HERO SECTION ==================== */}
        {activeTab === 'hero' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Globe size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Hero Section</h2>
            </div>
            <div className="grid gap-6">
              {renderField('hero_tagline', 'Tagline', 'Est. 2018 | Industrial Excellence')}
              {renderField('hero_title_highlight', 'Highlight Text', 'Integrity.')}
              {renderField('hero_description', 'Description', 'Defining the future of fasteners...')}
              {renderMediaUpload('hero_bg_image', 'Hero Background Image', formData.hero_bg_image)}
            </div>
          </section>
        )}

        {/* ==================== WHO WE ARE ==================== */}
        {activeTab === 'who' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Users size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Who We Are</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {renderField('who_we_are_badge', 'Badge', 'The Genesis')}
                {renderField('who_we_are_title', 'Title', 'Who')}
                {renderField('who_we_are_highlight', 'Highlight', 'We Are')}
                {renderField('who_we_are_ceo_name', 'CEO Name', 'Mr. Vipul Sakariya')}
                {renderField('who_we_are_ceo_role', 'CEO Role', 'Chief Executive Officer')}
                {renderField('who_we_are_quote', 'Quote', '"We do not just supply fasteners..."')}
              </div>
              <div className="space-y-4">
                {renderField('who_we_are_philosophy', 'Philosophy', 'Operating from Rajkot...', 'textarea')}
                {renderField('who_we_are_location', 'Location', 'Ravki Makhavad, Rajkot')}
                {renderField('who_we_are_distribution', 'Distribution', 'Surat Branch & Warehouse')}
                {renderField('who_we_are_clients', 'Clients Count', '1000+')}
                {renderField('who_we_are_projects', 'Projects Count', '5000+')}
                {renderMediaUpload('who_we_are_image', 'CEO Image', formData.who_we_are_image)}
              </div>
            </div>
          </section>
        )}

        {/* ==================== JOURNEY ==================== */}
        {activeTab === 'journey' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <TrendingUp size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">The Journey</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {renderField('journey_badge', 'Badge', 'The Evolution')}
                {renderField('journey_title', 'Title', 'The Early')}
                {renderField('journey_highlight', 'Highlight', 'Journey')}
                {renderField('journey_description', 'Description', 'Every setback became a stronger system...', 'textarea')}
                {renderField('journey_quote', 'Core Philosophy Quote', 'We don\'t react to problems...', 'textarea')}
              </div>
              <div className="space-y-4">
                {renderField('journey_card1_title', 'Card 1 Title', 'The ₹1 Crore Rejection')}
                {renderField('journey_card1_description', 'Card 1 Description', 'A major order was rejected...', 'textarea')}
                {renderField('journey_card1_detail', 'Card 1 Detail', 'Seasonal variation in plywood density...')}
                {renderField('journey_card2_title', 'Card 2 Title', 'Strategic Shift')}
                {renderField('journey_card2_description', 'Card 2 Description', 'We began analyzing international standards...', 'textarea')}
                {renderField('journey_card2_points', 'Card 2 Points', 'Material science & metallurgy')}
                {renderField('journey_card3_title', 'Card 3 Title', 'Turning Point')}
                {renderField('journey_card3_description', 'Card 3 Description', 'This failure became a breakthrough...', 'textarea')}
                {renderField('journey_card3_detail', 'Card 3 Detail', 'Quality depends on environment...')}
              </div>
            </div>
          </section>
        )}

        {/* ==================== MISSION & VISION ==================== */}
        {activeTab === 'mission' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Target size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Mission & Vision</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {renderField('mission_badge', 'Badge', 'Our Purpose')}
                {renderField('mission_title', 'Title', 'Mission &')}
                {renderField('mission_highlight', 'Highlight', 'Vision')}
                {renderField('mission_description', 'Description', 'Driving industrial excellence through quality and reliability.')}
              </div>
              <div className="space-y-4">
                {renderField('mission_text', 'Mission Text', '"To give the best..."', 'textarea')}
                {renderField('vision_text', 'Vision Text', '"IPO Bound 2030..."', 'textarea')}
              </div>
            </div>
          </section>
        )}

        {/* ==================== STATISTICS ==================== */}
        {activeTab === 'stats' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Award size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Statistics</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Stat {num}</label>
                  <input
                    name={`stat${num}_value`}
                    value={(formData as any)[`stat${num}_value`] || ''}
                    onChange={handleChange}
                    placeholder="Value"
                    className="w-full p-2 border border-slate-300 rounded text-sm font-bold"
                  />
                  <input
                    name={`stat${num}_label`}
                    value={(formData as any)[`stat${num}_label`] || ''}
                    onChange={handleChange}
                    placeholder="Label"
                    className="w-full p-2 border border-slate-300 rounded text-sm"
                  />
                  <input
                    name={`stat${num}_trend`}
                    value={(formData as any)[`stat${num}_trend`] || ''}
                    onChange={handleChange}
                    placeholder="Trend (e.g. +12% YoY)"
                    className="w-full p-2 border border-slate-300 rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== WHY CHOOSE US ==================== */}
        {activeTab === 'why' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Settings size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Why Choose Us</h2>
            </div>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {renderField('why_badge', 'Badge', 'Why Choose DFPL')}
                {renderField('why_title', 'Title', 'The Durable')}
                {renderField('why_highlight', 'Highlight', 'Advantage')}
                {renderField('why_description', 'Description', 'What makes us the preferred partner...')}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Card {num}</label>
                    <input
                      name={`why_card${num}_title`}
                      value={(formData as any)[`why_card${num}_title`] || ''}
                      onChange={handleChange}
                      placeholder="Title"
                      className="w-full p-2 border border-slate-300 rounded text-sm font-bold"
                    />
                    <textarea
                      name={`why_card${num}_desc`}
                      value={(formData as any)[`why_card${num}_desc`] || ''}
                      onChange={handleChange}
                      placeholder="Description"
                      className="w-full p-2 border border-slate-300 rounded text-sm min-h-[60px]"
                    />
                    <input
                      name={`why_card${num}_metric`}
                      value={(formData as any)[`why_card${num}_metric`] || ''}
                      onChange={handleChange}
                      placeholder="Metric (e.g. 100%)"
                      className="w-full p-2 border border-slate-300 rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================== VALUES ==================== */}
        {activeTab === 'values' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Award size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Core Values</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {renderField('values_badge', 'Badge', 'Core Values')}
              {renderField('values_title', 'Title', 'The Principles That')}
              {renderField('values_highlight', 'Highlight', 'Guide Us')}
              {renderField('values_description', 'Description', 'Our foundational values that shape every decision we make')}
            </div>
            <div className="mt-4 text-center text-sm text-slate-400 bg-slate-50 p-4 rounded-lg border border-slate-200">
              Values are currently hardcoded in the component. Add dynamic fields if needed.
            </div>
          </section>
        )}

        {/* ==================== TESTIMONIALS ==================== */}
        {activeTab === 'testimonials' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Users size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Testimonials</h2>
            </div>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {renderField('testimonial_badge', 'Badge', 'Client Love')}
                {renderField('testimonial_title', 'Title', 'What Our')}
                {renderField('testimonial_highlight', 'Highlight', 'Clients Say')}
                {renderField('testimonial_description', 'Description', 'Trusted by precision-driven industries across the globe')}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Testimonial {num}</label>
                    <textarea
                      name={`testimonial${num}_quote`}
                      value={(formData as any)[`testimonial${num}_quote`] || ''}
                      onChange={handleChange}
                      placeholder="Quote"
                      className="w-full p-2 border border-slate-300 rounded text-sm min-h-[80px]"
                    />
                    <input
                      name={`testimonial${num}_author`}
                      value={(formData as any)[`testimonial${num}_author`] || ''}
                      onChange={handleChange}
                      placeholder="Author"
                      className="w-full p-2 border border-slate-300 rounded text-sm"
                    />
                    <input
                      name={`testimonial${num}_role`}
                      value={(formData as any)[`testimonial${num}_role`] || ''}
                      onChange={handleChange}
                      placeholder="Role / Location"
                      className="w-full p-2 border border-slate-300 rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================== SEO ==================== */}
        {activeTab === 'seo' && (
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <FileText size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">SEO & Metadata</h2>
            </div>
            <div className="grid gap-6">
              {renderField('meta_title', 'Meta Title', 'About DFPL | Durable Fastener Pvt. Ltd.')}
              {renderField('meta_description', 'Meta Description', 'Durable Fastener Pvt. Ltd. (DFPL) - India\'s premier fastener manufacturer...', 'textarea')}
              {renderField('meta_keywords', 'Meta Keywords', 'fastener manufacturer India, industrial fasteners, screws, bolts')}
            </div>
          </section>
        )}

        {/* Save Status */}
        <div className="text-center text-xs text-slate-400">
          Last updated: {formData.updated_at ? new Date(formData.updated_at).toLocaleString() : 'Never'}
          <button 
            onClick={handleSave} 
            disabled={loading || uploading}
            className="ml-4 text-blue-600 font-bold hover:underline disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutAdmin;