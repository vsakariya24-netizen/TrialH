import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Save, Plus, Trash2, ArrowLeft, Upload, X, Layout,
  Table as TableIcon, Type, Quote, Image as ImageIcon,
  List, Code, Minus, AlertCircle, Eye, EyeOff,
  Zap, Heading1, Heading2, Grid, Link as LinkIcon, Loader2,
  BookOpen, GripVertical, HelpCircle, Copy, ChevronUp, ChevronDown,
  AlignLeft, AlignRight, AlignCenter, Bold, Italic, Underline,
  ListOrdered, List as ListBullet, Indent, Outdent, Highlighter, Palette
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, Reorder } from 'framer-motion';

// ─── UTILS ──────────────────────────────────────────────────────────────────
const generateSlug = (text: string) => {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};
const genId = () => Math.random().toString(36).slice(2, 9);

// ─── TYPES ───────────────────────────────────────────────────────────────────
type BlockType =
  | 'text' | 'heading2' | 'heading3'
  | 'quote' | 'callout' | 'highlight'
  | 'table' | 'list' | 'code' | 'divider'
  | 'image' | 'image_row' | 'summary'
  | 'split' | 'image_text' | 'faq';

interface ImageItem { url: string; caption: string; }

interface Block {
  id: string;
  type: BlockType;
  heading?: string;
  body?: string;
  headers?: string[];
  rows?: string[][];
  listType?: 'bullet' | 'numbered';
  items?: string[];
  calloutVariant?: 'info' | 'warning' | 'tip' | 'danger';
  imageUrl?: string;
  caption?: string;
  language?: string;
  highlightColor?: string;
  images?: ImageItem[];
  columns?: 2 | 3;
  splitLayout?: 'left-image' | 'right-image';
  splitImage?: string;
  splitContent?: string;
  faqItems?: { question: string; answer: string; }[];
}

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const PALETTE: { type: BlockType; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
  { type: 'text', label: 'Paragraph', icon: <Type size={16}/>, desc: 'Rich text content', color: '#6366f1' },
  { type: 'heading2', label: 'H2 Heading', icon: <Heading1 size={16}/>, desc: 'Major section', color: '#7c3aed' },
  { type: 'heading3', label: 'H3 Heading', icon: <Heading2 size={16}/>, desc: 'Sub-section', color: '#a78bfa' },
  { type: 'list', label: 'List', icon: <List size={16}/>, desc: 'Bullet/numbered', color: '#0891b2' },
  { type: 'quote', label: 'Blockquote', icon: <Quote size={16}/>, desc: 'Pull quote', color: '#db2777' },
  { type: 'callout', label: 'Callout', icon: <AlertCircle size={16}/>, desc: 'Info/Tip/Warning', color: '#d97706' },
  { type: 'highlight', label: 'Key Takeaway', icon: <Zap size={16}/>, desc: 'Highlighted insight', color: '#ea580c' },
  { type: 'image', label: 'Single Image', icon: <ImageIcon size={16}/>, desc: 'Image + caption', color: '#059669' },
  { type: 'image_row', label: 'Image Row', icon: <Grid size={16}/>, desc: '2-3 images', color: '#0d9488' },
  { type: 'table', label: 'Table', icon: <TableIcon size={16}/>, desc: 'Data table', color: '#16a34a' },
  { type: 'code', label: 'Code', icon: <Code size={16}/>, desc: 'Code snippet', color: '#65a30d' },
  { type: 'divider', label: 'Divider', icon: <Minus size={16}/>, desc: 'Separator', color: '#94a3b8' },
  { type: 'summary', label: 'Summary', icon: <BookOpen size={16}/>, desc: 'Executive summary', color: '#facc15' },
  { type: 'split', label: 'Image + Content', icon: <Layout size={16}/>, desc: 'Side by side', color: '#2563eb' },
  { type: 'faq', label: 'FAQ', icon: <HelpCircle size={16}/>, desc: 'Q&A list', color: '#8b5cf6' },
];

const CALLOUT_META: Record<string, { bg: string; border: string; icon: string; label: string }> = {
  info: { bg: '#eff6ff', border: '#3b82f6', icon: 'ℹ️', label: 'Info' },
  tip: { bg: '#f0fdf4', border: '#22c55e', icon: '💡', label: 'Tip' },
  warning: { bg: '#fffbeb', border: '#f59e0b', icon: '⚠️', label: 'Warning' },
  danger: { bg: '#fef2f2', border: '#ef4444', icon: '🚫', label: 'Important' },
};

// ─── BLOCK FACTORY ────────────────────────────────────────────────────────────
const makeBlock = (type: BlockType): Block => {
  const id = genId();
  switch (type) {
    case 'summary': return { id, type, body: 'Executive summary text...' };
    case 'table': return { id, type, heading: '', headers: ['Feature', 'Option A', 'Option B'], rows: [['', '', '']] };
    case 'list': return { id, type, heading: '', listType: 'bullet', items: ['Item 1'] };
    case 'callout': return { id, type, calloutVariant: 'info', body: 'Callout message' };
    case 'code': return { id, type, heading: '', language: 'bash', body: '// code' };
    case 'image': return { id, type, imageUrl: '', caption: '' };
    case 'image_row': return { id, type, columns: 2, images: [{ url: '', caption: '' }, { url: '', caption: '' }] };
    case 'divider': return { id, type };
    case 'highlight': return { id, type, body: 'Key takeaway', highlightColor: '#fef9c3' };
    case 'split': return { id, type, splitLayout: 'left-image', splitImage: '', splitContent: '' };
    case 'faq': return { id, type, heading: 'FAQ', faqItems: [{ question: '', answer: '' }] };
    default: return { id, type, heading: '', body: '' };
  }
};

// ─── RICH TEXT TOOLBAR (full featured) ───────────────────────────────────────
// ─── RICH TEXT TOOLBAR (fixed focus & selection) ─────────────────────────────
const RichTextToolbar: React.FC<{ editorId: string; onUpdate: (html: string) => void }> = ({ editorId, onUpdate }) => {
  // Helper to get the editor element and ensure focus
  const getEditorAndFocus = () => {
    const editor = document.getElementById(editorId) as HTMLElement;
    if (editor && document.activeElement !== editor) {
      editor.focus();
      // Restore selection to the end if needed? Not necessary for commands.
    }
    return editor;
  };

  const exec = (cmd: string, value?: string) => {
    const editor = getEditorAndFocus();
    if (!editor) return;
    document.execCommand(cmd, false, value || '');
    // After command, update the parent component with new HTML
    onUpdate(editor.innerHTML);
  };

  const handleColor = (type: 'foreColor' | 'backColor') => {
    const color = prompt(`Enter ${type === 'foreColor' ? 'text' : 'background'} color (hex, rgb, name):`, type === 'foreColor' ? '#000000' : '#ffff00');
    if (color) exec(type, color);
  };

  const handleFontSize = () => {
    const size = prompt('Font size (px, em, rem):', '16px');
    if (size) exec('fontSize', size);
  };

  const handleFontFamily = () => {
    const family = prompt('Font family (e.g., Arial, Georgia, Times):', 'Georgia');
    if (family) exec('fontName', family);
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) exec('createLink', url);
  };

  // Use onMouseDown to prevent blur and keep focus inside editor
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the button from stealing focus
    // Also ensure editor is focused before command? Actually each command already calls getEditorAndFocus
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 rounded-t-xl sticky top-0 z-10">
      <div className="flex items-center gap-0.5 border-r pr-1 mr-1">
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('bold')} className="p-1.5 hover:bg-gray-200 rounded" title="Bold"><Bold size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('italic')} className="p-1.5 hover:bg-gray-200 rounded" title="Italic"><Italic size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('underline')} className="p-1.5 hover:bg-gray-200 rounded" title="Underline"><Underline size={14}/></button>
      </div>
      <div className="flex items-center gap-0.5 border-r pr-1 mr-1">
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('justifyLeft')} className="p-1.5 hover:bg-gray-200 rounded"><AlignLeft size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('justifyCenter')} className="p-1.5 hover:bg-gray-200 rounded"><AlignCenter size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('justifyRight')} className="p-1.5 hover:bg-gray-200 rounded"><AlignRight size={14}/></button>
      </div>
      <div className="flex items-center gap-0.5 border-r pr-1 mr-1">
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('insertOrderedList')} className="p-1.5 hover:bg-gray-200 rounded"><ListOrdered size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded"><ListBullet size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('indent')} className="p-1.5 hover:bg-gray-200 rounded"><Indent size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('outdent')} className="p-1.5 hover:bg-gray-200 rounded"><Outdent size={14}/></button>
      </div>
      <div className="flex items-center gap-0.5 border-r pr-1 mr-1">
        <button type="button" onMouseDown={onMouseDown} onClick={handleFontFamily} className="p-1.5 hover:bg-gray-200 rounded" title="Font Family"><Type size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={handleFontSize} className="p-1.5 hover:bg-gray-200 rounded" title="Font Size"><span className="text-xs font-bold">A↓</span></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => handleColor('foreColor')} className="p-1.5 hover:bg-gray-200 rounded" title="Text Color"><Palette size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => handleColor('backColor')} className="p-1.5 hover:bg-gray-200 rounded" title="Background Color"><Highlighter size={14}/></button>
      </div>
      <div>
        <button type="button" onMouseDown={onMouseDown} onClick={handleLink} className="p-1.5 hover:bg-gray-200 rounded" title="Add Link"><LinkIcon size={14}/></button>
        <button type="button" onMouseDown={onMouseDown} onClick={() => exec('unlink')} className="p-1.5 hover:bg-gray-200 rounded" title="Remove Link"><X size={14}/></button>
      </div>
    </div>
  );
};

// ─── PREVIEW BLOCK (matches frontend styling) ────────────────────────────────
const PreviewBlock: React.FC<{ block: Block }> = ({ block }) => {
  const pf = "'Playfair Display', Georgia, serif";
  const bf = "'Georgia', serif";

  switch (block.type) {
    case 'text':
      return (
        <div className="mb-8">
          {block.heading && <h4 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: pf }}>{block.heading}</h4>}
          <div className="blog-content-render" dangerouslySetInnerHTML={{ __html: block.body || '' }} />
        </div>
      );
    case 'heading2':
      return <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6 border-b-4 border-yellow-500 pb-3" style={{ fontFamily: pf }}>{block.body}</h2>;
    case 'heading3':
      return <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4" style={{ fontFamily: pf }}>{block.body}</h3>;
    case 'quote':
      return <blockquote className="my-8 pl-6 border-l-4 border-yellow-500 bg-amber-50/30 py-4 pr-4 rounded-r-xl italic text-gray-700 text-lg">{block.body}{block.heading && <footer className="mt-2 text-sm font-bold text-gray-400 not-italic">— {block.heading}</footer>}</blockquote>;
    case 'summary':
      return <div className="my-10 p-8 bg-gray-900 rounded-2xl text-white"><div className="flex items-center gap-3 mb-4"><div className="w-8 h-0.5 bg-yellow-500"/><span className="text-xs font-black tracking-wider text-yellow-500 uppercase">Executive Summary</span></div><p className="text-xl text-gray-300 italic leading-relaxed">{block.body}</p></div>;
    case 'callout': { const m = CALLOUT_META[block.calloutVariant || 'info']; return <div className="my-6 p-4 rounded-xl flex gap-3" style={{ background: m.bg, borderLeft: `4px solid ${m.border}` }}><span className="text-xl">{m.icon}</span><div><p className="text-xs font-black uppercase" style={{ color: m.border }}>{m.label}</p><p className="text-gray-700">{block.body}</p></div></div>; }
    case 'highlight': return <div className="my-6 p-5 rounded-xl border-l-4 border-yellow-500" style={{ background: block.highlightColor || '#fef9c3' }}><p className="text-gray-800 text-lg">{block.body}</p></div>;
    case 'list': { const Tag = block.listType === 'numbered' ? 'ol' : 'ul'; return <div className="my-6">{block.heading && <h4 className="text-xl font-bold mb-3">{block.heading}</h4>}<Tag className="pl-6 space-y-2 list-disc marker:text-yellow-600">{block.items?.map((item,i) => <li key={i} className="text-gray-700">{item}</li>)}</Tag></div>; }
    case 'table': return <div className="my-8 overflow-x-auto">{block.heading && <h3 className="text-xl font-bold mb-4">{block.heading}</h3>}<table className="w-full border-collapse rounded-xl overflow-hidden shadow border border-gray-200"><thead className="bg-gray-900 text-yellow-500 text-xs font-black uppercase"><tr>{block.headers?.map((h,i)=><th key={i} className="px-5 py-3 text-left border border-gray-800">{h}</th>)}</tr></thead><tbody>{block.rows?.map((row,ri)=> <tr key={ri} className={ri%2===0?'bg-white':'bg-gray-50'}>{row.map((cell,ci)=><td key={ci} className="px-5 py-3 text-gray-600 border border-gray-100" dangerouslySetInnerHTML={{ __html: cell }} />)}</tr>)}</tbody></table></div>;
    case 'code': return <div className="my-6 rounded-xl overflow-hidden border border-gray-800"><div className="bg-gray-900 px-4 py-2 flex justify-between"><span className="text-xs text-gray-400 font-mono uppercase">{block.language}</span>{block.heading && <span className="text-xs text-gray-500">{block.heading}</span>}</div><pre className="bg-gray-950 p-5 overflow-x-auto"><code className="text-gray-300 font-mono text-sm">{block.body}</code></pre></div>;
    case 'divider': return <div className="my-10 flex items-center gap-2"><div className="flex-1 h-px bg-gray-200"/><div className="w-2 h-2 rounded-full bg-yellow-500"/><div className="flex-1 h-px bg-gray-200"/></div>;
    case 'image': return <figure className="my-8 text-center"><img src={block.imageUrl} className="mx-auto rounded-xl shadow-md max-w-full" alt={block.caption} />{block.caption && <figcaption className="mt-3 text-sm text-gray-400 italic">— {block.caption}</figcaption>}</figure>;
    case 'image_row': return <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4">{block.images?.map((img,i)=><figure key={i} className="text-center"><img src={img.url} className="w-full rounded-lg border bg-gray-50 p-2" alt={img.caption}/>{img.caption && <figcaption className="text-xs text-gray-400 mt-2">{img.caption}</figcaption>}</figure>)}</div>;
    case 'split': return <div className={`my-10 grid md:grid-cols-2 gap-8 items-center ${block.splitLayout === 'right-image' ? 'md:flex-row-reverse' : ''}`}><img src={block.splitImage} className="rounded-xl shadow-lg w-full" alt=""/><div className="blog-content-render" dangerouslySetInnerHTML={{ __html: block.splitContent || '' }} /></div>;
    case 'faq': return <div className="my-12">{block.heading && <h2 className="text-2xl font-bold border-b-2 border-yellow-500 pb-2 mb-6">{block.heading}</h2>}<div className="space-y-3">{block.faqItems?.map((item,i)=><details key={i} className="border border-gray-200 rounded-xl p-4 bg-white"><summary className="font-bold text-gray-800 cursor-pointer">{item.question || 'Question'}</summary><p className="mt-3 text-gray-600 pl-4 border-l-2 border-yellow-300" dangerouslySetInnerHTML={{ __html: item.answer || '' }} /></details>)}</div></div>;
    default: return null;
  }
};

// ─── BLOCK EDITOR CARD ───────────────────────────────────────────────────────
const BlockEditorCard: React.FC<{
  block: Block; index: number; total: number;
  onUpdate: (id: string, patch: Partial<Block>) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onUpload: (file: File) => Promise<string>;
}> = ({ block, index, total, onUpdate, onRemove, onDuplicate, onMoveUp, onMoveDown, onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const u = (patch: Partial<Block>) => onUpdate(block.id, patch);
  const meta = PALETTE.find(p => p.type === block.type)!;

  const handleFileUpload = async (file: File | undefined, callback: (url: string) => void) => {
    if (!file) return;
    setUploading(true);
    try { const url = await onUpload(file); callback(url); } catch { alert("Upload failed"); } finally { setUploading(false); }
  };

  const renderRichEditor = (content: string, onChange: (html: string) => void, editorId: string) => (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <RichTextToolbar editorId={editorId} onUpdate={onChange} />
      <div id={editorId} contentEditable suppressContentEditableWarning
        className="min-h-[150px] max-h-[350px] overflow-y-auto p-4 outline-none font-serif text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all mb-5">
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-700"><GripVertical size={18} /></div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white shadow-sm text-xs font-bold" style={{ color: meta.color }}>{meta.icon} <span>{meta.label}</span></div>
          <span className="text-[10px] text-gray-400 font-mono">#{index + 1}</span>
          {uploading && <Loader2 size={14} className="animate-spin text-yellow-600" />}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onMoveUp(block.id)} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronUp size={16}/></button>
          <button type="button" onClick={() => onMoveDown(block.id)} disabled={index === total-1} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronDown size={16}/></button>
          <button type="button" onClick={() => onDuplicate(block.id)} className="p-1.5 text-gray-400 hover:text-blue-600"><Copy size={16}/></button>
          <button type="button" onClick={() => onRemove(block.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {block.type === 'text' && (
          <>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-yellow-400 outline-none" placeholder="Optional heading..." value={block.heading || ''} onChange={e => u({ heading: e.target.value })} />
            {renderRichEditor(block.body || '', html => u({ body: html }), `editor-${block.id}`)}
          </>
        )}
        {(block.type === 'heading2' || block.type === 'heading3') && (
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-yellow-400 outline-none" placeholder="Heading text..." value={block.body || ''} onChange={e => u({ body: e.target.value })} />
        )}
        {block.type === 'quote' && (
          <>
            <textarea className="w-full border border-gray-200 rounded-xl p-3 font-serif italic resize-none" rows={3} placeholder="Quote text..." value={block.body || ''} onChange={e => u({ body: e.target.value })} />
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Attribution" value={block.heading || ''} onChange={e => u({ heading: e.target.value })} />
          </>
        )}
        {block.type === 'summary' && (
          <textarea className="w-full border border-gray-200 rounded-xl p-4 font-serif italic resize-none" rows={4} placeholder="Executive summary..." value={block.body || ''} onChange={e => u({ body: e.target.value })} />
        )}
        {block.type === 'callout' && (
          <>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={block.calloutVariant} onChange={e => u({ calloutVariant: e.target.value as any })}>
              {Object.entries(CALLOUT_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <textarea className="w-full border border-gray-200 rounded-xl p-3" rows={2} placeholder="Callout message..." value={block.body || ''} onChange={e => u({ body: e.target.value })} />
          </>
        )}
        {block.type === 'highlight' && (
          <>
            <input type="color" value={block.highlightColor || '#fef9c3'} onChange={e => u({ highlightColor: e.target.value })} className="w-10 h-10 rounded border" />
            <textarea className="w-full border border-gray-200 rounded-xl p-3" rows={2} placeholder="Key takeaway..." value={block.body || ''} onChange={e => u({ body: e.target.value })} />
          </>
        )}
        {block.type === 'list' && (
          <>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="List heading" value={block.heading || ''} onChange={e => u({ heading: e.target.value })} />
            <div className="flex gap-2"><button type="button" onClick={() => u({ listType: 'bullet' })} className={`px-3 py-1 text-xs rounded ${block.listType === 'bullet' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Bullet</button><button type="button" onClick={() => u({ listType: 'numbered' })} className={`px-3 py-1 text-xs rounded ${block.listType === 'numbered' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Numbered</button></div>
            {block.items?.map((item, i) => (
              <div key={i} className="flex gap-2"><input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" value={item} onChange={e => { const newItems = [...(block.items || [])]; newItems[i] = e.target.value; u({ items: newItems }); }} /><button type="button" onClick={() => u({ items: block.items?.filter((_, idx) => idx !== i) })} className="text-red-400"><X size={18}/></button></div>
            ))}
            <button type="button" onClick={() => u({ items: [...(block.items || []), ''] })} className="text-xs text-yellow-600 font-bold flex items-center gap-1"><Plus size={14}/> Add Item</button>
          </>
        )}
        {block.type === 'table' && (
          <div className="space-y-3">
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="Table title" value={block.heading || ''} onChange={e => u({ heading: e.target.value })} />
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-900">{block.headers?.map((h, i) => <th key={i} className="p-2 border"><input className="w-full bg-transparent text-yellow-500 font-bold text-xs uppercase" value={h} onChange={e => { const nh = [...(block.headers || [])]; nh[i] = e.target.value; u({ headers: nh }); }} /></th>)}<th className="w-8"></th></tr></thead>
                <tbody>{block.rows?.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="p-2 border"><div contentEditable suppressContentEditableWarning className="outline-none min-w-[80px]" dangerouslySetInnerHTML={{ __html: cell }} onBlur={e => { const nr = [...(block.rows || [])]; nr[ri][ci] = e.currentTarget.innerHTML; u({ rows: nr }); }} /></td>)}<td className="text-center"><button onClick={() => u({ rows: block.rows?.filter((_, i) => i !== ri) })}><Trash2 size={12}/></button></td></tr>
                ))}</tbody>
             </table>
            </div>
            <div className="flex gap-2"><button type="button" onClick={() => u({ rows: [...(block.rows || []), Array(block.headers?.length || 2).fill('')] })} className="text-xs font-bold bg-gray-100 px-3 py-1 rounded">+ Row</button><button type="button" onClick={() => { u({ headers: [...(block.headers || []), 'New'], rows: (block.rows || []).map(r => [...r, '']) }); }} className="text-xs font-bold bg-gray-100 px-3 py-1 rounded">+ Column</button></div>
          </div>
        )}
        {block.type === 'image' && (
          <div className="space-y-3">
            <div className="relative h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
              {block.imageUrl ? <img src={block.imageUrl} className="h-full object-contain" alt="" /> : <Upload size={24} className="text-gray-400" />}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e.target.files?.[0], url => u({ imageUrl: url }))} />
            </div>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="Image URL" value={block.imageUrl || ''} onChange={e => u({ imageUrl: e.target.value })} />
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="Caption" value={block.caption || ''} onChange={e => u({ caption: e.target.value })} />
          </div>
        )}
        {block.type === 'split' && (
          <div className="space-y-3">
            <div className="flex gap-2"><button onClick={() => u({ splitLayout: 'left-image' })} className={`px-3 py-1 text-xs rounded ${block.splitLayout === 'left-image' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Image Left</button><button onClick={() => u({ splitLayout: 'right-image' })} className={`px-3 py-1 text-xs rounded ${block.splitLayout === 'right-image' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Image Right</button></div>
            <div className="relative h-32 bg-gray-100 border-2 border-dashed rounded-lg flex items-center justify-center"><Upload size={20}/><input type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={e => handleFileUpload(e.target.files?.[0], url => u({ splitImage: url }))} /></div>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="Image URL" value={block.splitImage || ''} onChange={e => u({ splitImage: e.target.value })} />
            {renderRichEditor(block.splitContent || '', html => u({ splitContent: html }), `editor-split-${block.id}`)}
          </div>
        )}
        {block.type === 'faq' && (
          <div className="space-y-4">
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 font-bold" placeholder="FAQ Heading" value={block.heading || ''} onChange={e => u({ heading: e.target.value })} />
            {block.faqItems?.map((item, i) => (
              <div key={i} className="border rounded-xl p-3 bg-gray-50">
                <div className="flex justify-between mb-2"><span className="text-xs font-bold text-gray-400">Q{i+1}</span><button onClick={() => u({ faqItems: block.faqItems?.filter((_, idx) => idx !== i) })}><Trash2 size={12}/></button></div>
                <input className="w-full border rounded-lg px-3 py-2 mb-2 text-sm" placeholder="Question" value={item.question} onChange={e => { const n = [...(block.faqItems || [])]; n[i].question = e.target.value; u({ faqItems: n }); }} />
                {renderRichEditor(item.answer, html => { const n = [...(block.faqItems || [])]; n[i].answer = html; u({ faqItems: n }); }, `faq-answer-${block.id}-${i}`)}
              </div>
            ))}
            <button type="button" onClick={() => u({ faqItems: [...(block.faqItems || []), { question: '', answer: '' }] })} className="text-xs font-bold bg-gray-100 px-3 py-1 rounded">+ Add Question</button>
          </div>
        )}
        {block.type === 'code' && (
          <>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Caption / filename" value={block.heading || ''} onChange={e => u({ heading: e.target.value })} />
            <select value={block.language} onChange={e => u({ language: e.target.value })} className="border rounded-lg px-3 py-2 text-sm"><option>bash</option><option>javascript</option><option>python</option><option>html</option><option>css</option></select>
            <textarea className="w-full font-mono text-sm border rounded-xl p-3" rows={6} placeholder="Code here..." value={block.body || ''} onChange={e => u({ body: e.target.value })} />
          </>
        )}
        {block.type === 'divider' && <div className="text-center text-gray-400 text-sm">——— Divider ———</div>}
        {block.type === 'image_row' && (
          <div className="space-y-3">
            <div className="flex gap-2"><button onClick={() => u({ columns: 2 })} className={`px-3 py-1 text-xs rounded ${block.columns === 2 ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>2 Columns</button><button onClick={() => u({ columns: 3 })} className={`px-3 py-1 text-xs rounded ${block.columns === 3 ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>3 Columns</button></div>
            <div className={`grid gap-3 ${block.columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {block.images?.map((img, i) => (
                <div key={i} className="border rounded-xl p-2 space-y-2"><div className="relative h-24 bg-gray-100 rounded"><img src={img.url} className="h-full mx-auto object-contain" alt=""/><input type="file" className="absolute inset-0 opacity-0" onChange={e => handleFileUpload(e.target.files?.[0], url => { const newImgs = [...(block.images || [])]; newImgs[i].url = url; u({ images: newImgs }); })} /></div><input className="w-full text-xs border rounded px-2 py-1" placeholder="URL" value={img.url} onChange={e => { const newImgs = [...(block.images || [])]; newImgs[i].url = e.target.value; u({ images: newImgs }); }} /><input className="w-full text-xs border rounded px-2 py-1" placeholder="Caption" value={img.caption} onChange={e => { const newImgs = [...(block.images || [])]; newImgs[i].caption = e.target.value; u({ images: newImgs }); }} /></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── MAIN ADMIN COMPONENT ─────────────────────────────────────────────────────
const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([makeBlock('heading2'), makeBlock('text')]);
  const [formData, setFormData] = useState({
    title: '', category: 'Technical Guide', excerpt: '',
    author: 'Durable Editorial', image_url: ''
  });

  useEffect(() => {
    if (!isEditing) return;
    (async () => {
      const { data } = await supabase.from('blogs').select('*').eq('id', id).single();
      if (!data) return;
      setFormData(data);
      setImagePreview(data.image_url);
      try {
        const saved = JSON.parse(data.content);
        setBlocks(Array.isArray(saved) ? saved.map((s: any) => ({ ...makeBlock(s.type || 'text'), ...s, id: s.id || genId() })) : [makeBlock('text')]);
      } catch { setBlocks([{ ...makeBlock('text'), body: data.content }]); }
    })();
  }, [id, isEditing]);

  const uploadFileToSupabase = async (file: File) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file);
    if (error) throw error;
    return supabase.storage.from('blog-images').getPublicUrl(fileName).data.publicUrl;
  };

  const addBlock = (type: BlockType) => setBlocks(prev => [...prev, makeBlock(type)]);
  const removeBlock = (id: string) => setBlocks(prev => prev.filter(b => b.id !== id));
  const updateBlock = (id: string, patch: Partial<Block>) => setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b));
  const duplicateBlock = (id: string) => {
    const index = blocks.findIndex(b => b.id === id);
    if (index !== -1) { const copy = { ...blocks[index], id: genId() }; setBlocks(prev => [...prev.slice(0, index+1), copy, ...prev.slice(index+1)]); }
  };
  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const idx = blocks.findIndex(b => b.id === id);
    if (direction === 'up' && idx > 0) { const newBlocks = [...blocks]; [newBlocks[idx-1], newBlocks[idx]] = [newBlocks[idx], newBlocks[idx-1]]; setBlocks(newBlocks); }
    if (direction === 'down' && idx < blocks.length-1) { const newBlocks = [...blocks]; [newBlocks[idx+1], newBlocks[idx]] = [newBlocks[idx], newBlocks[idx+1]]; setBlocks(newBlocks); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      let finalImageUrl = formData.image_url;
      if (imageFile) finalImageUrl = await uploadFileToSupabase(imageFile);
      const slug = generateSlug(formData.title);
      const payload = { ...formData, slug, image_url: finalImageUrl, content: JSON.stringify(blocks) };
      const { error } = isEditing ? await supabase.from('blogs').update(payload).eq('id', id) : await supabase.from('blogs').insert([payload]);
      if (error) throw error;
      navigate('/dfpladmin access/blogs');
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        .blog-content-render, .blog-content-render p, .blog-content-render div, .blog-content-render span, .blog-content-render li {
          font-family: 'Georgia', serif !important;
          font-size: 17px !important;
          line-height: 1.9 !important;
          color: #374151 !important;
        }
        .blog-content-render a { color: #2563eb !important; text-decoration: underline; font-weight: 600; }
        [contenteditable] { font-family: Georgia, serif; line-height: 1.8; }
      `}</style>

      <form onSubmit={handleSubmit}>
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <Link to="/dfpladmin access/blogs" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900"><ArrowLeft size={14}/> BACK</Link>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200">{showPreview ? <EyeOff size={14}/> : <Eye size={14}/>} {showPreview ? 'Hide Preview' : 'Show Preview'}</button>
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-gray-900 text-yellow-500 hover:bg-black">{loading ? <Loader2 size={14} className="animate-spin"/> : <Save size={14}/>} {loading ? 'Saving...' : (isEditing ? 'Update' : 'Publish')}</button>
          </div>
        </div>

        <div className={`max-w-[1600px] mx-auto px-6 py-8 ${showPreview ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''}`}>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Article Settings</h3>
              <div className="space-y-4">
                <input required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-yellow-400 outline-none" placeholder="Blog Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-3"><select className="border rounded-lg px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>{['Technical Guide','How-To','Comparison','News','Tutorial'].map(c=><option key={c}>{c}</option>)}</select><input className="border rounded-lg px-3 py-2 text-sm" placeholder="Author" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} /></div>
                <div><label className="text-xs font-bold">Cover Image</label><div className="relative h-40 bg-gray-100 rounded-xl border-2 border-dashed mt-1 flex items-center justify-center overflow-hidden">{imagePreview ? <img src={imagePreview} className="h-full object-cover" /> : <Upload size={24} className="text-gray-400"/>}<input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => { if(e.target.files?.[0]){ setImageFile(e.target.files[0]); setImagePreview(URL.createObjectURL(e.target.files[0])); } }} /></div><input className="w-full border rounded-lg px-3 py-2 mt-2 text-sm" placeholder="Or image URL" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} /></div>
              </div>
            </div>

            <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-4">
              {blocks.map((block, idx) => (
                <Reorder.Item key={block.id} value={block} dragListener={false}>
                  <BlockEditorCard
                    block={block} index={idx} total={blocks.length}
                    onUpdate={updateBlock} onRemove={removeBlock}
                    onDuplicate={duplicateBlock} onMoveUp={(id) => moveBlock(id, 'up')} onMoveDown={(id) => moveBlock(id, 'down')}
                    onUpload={uploadFileToSupabase}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4"><Plus size={16}/><span className="text-xs font-bold uppercase tracking-wider">Add New Block</span></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {PALETTE.map(item => (
                  <button key={item.type} type="button" onClick={() => addBlock(item.type)} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition text-left">
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showPreview && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 h-[calc(100vh-100px)] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-3 z-10"><h4 className="text-sm font-bold text-gray-500">📄 Live Preview</h4></div>
              <article className="max-w-2xl mx-auto px-6 py-8">
                {imagePreview && <img src={imagePreview} alt="cover" className="w-full rounded-2xl mb-8 shadow-md" />}
                <h1 className="text-4xl font-bold mb-6 text-gray-900 font-serif">{formData.title || "Your Blog Title"}</h1>
                {blocks.map(block => <PreviewBlock key={block.id} block={block} />)}
              </article>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBlog;