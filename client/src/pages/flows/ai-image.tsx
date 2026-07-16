import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ImageIcon, Sparkles, RefreshCw, Download, Copy,
  Plus, MoreVertical, Package, ChevronDown, Check, X,
  Wand2, Info, Star, TrendingUp,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────

const templates = [
  { id: 'hero',     label: 'Hero Banner',   desc: 'Full-width product showcase', ratio: '16:9' },
  { id: 'square',   label: 'Square Ad',     desc: 'Instagram / Facebook feed',   ratio: '1:1'  },
  { id: 'story',    label: 'Story / Reel',  desc: 'Vertical full-screen',        ratio: '9:16' },
  { id: 'portrait', label: 'Portrait Ad',   desc: 'Pinterest / catalog',         ratio: '4:5'  },
  { id: 'email',    label: 'Email Header',  desc: 'Inline campaign header',      ratio: '3:1'  },
  { id: 'thumb',    label: 'Product Thumb', desc: 'Listing thumbnail',           ratio: '1:1'  },
];

const styles = [
  { id: 'studio',    label: 'Studio',    desc: 'Clean bg, sharp shadows' },
  { id: 'lifestyle', label: 'Lifestyle', desc: 'Natural light, real world' },
  { id: 'minimal',   label: 'Minimal',   desc: 'Empty space, bold type' },
  { id: 'editorial', label: 'Editorial', desc: 'Magazine, high contrast' },
  { id: 'flat',      label: 'Flat lay',  desc: 'Overhead arrangement' },
  { id: 'dark',      label: 'Dark mode', desc: 'Moody, dark background' },
];

const products = [
  { id: 1, name: 'Classic Runner Sneaker', sku: 'SKU-001' },
  { id: 2, name: 'Merino Wool Crew',       sku: 'SKU-042' },
  { id: 3, name: 'Leather Tote Bag',       sku: 'SKU-108' },
  { id: 4, name: 'Polarised Sunglasses',   sku: 'SKU-207' },
  { id: 5, name: 'Slim Fit Chinos',        sku: 'SKU-315' },
];

const generated = [
  { id: 1, prompt: 'Classic Runner — studio, white bg, sharp shadows', ratio: '1:1',  flow: 'Abandoned Cart',    ctr: '4.2%', status: 'live'  },
  { id: 2, prompt: 'Summer sale banner, bold type, warm palette',      ratio: '16:9', flow: 'Welcome Series',    ctr: '3.8%', status: 'live'  },
  { id: 3, prompt: 'Leather Tote flat-lay, clean marble surface',      ratio: '4:5',  flow: 'Win-back Campaign', ctr: '—',    status: 'draft' },
  { id: 4, prompt: 'Holiday gift-set hero, dark moodboard',            ratio: '1:1',  flow: 'VIP Milestone',     ctr: '5.1%', status: 'live'  },
];

const ratioClass: Record<string, string> = {
  '1:1': 'aspect-square', '16:9': 'aspect-video', '4:5': 'aspect-[4/5]',
  '9:16': 'aspect-[9/16]', '3:1': 'aspect-[3/1]',
};

const gradients = [
  'from-blue-100 to-blue-50', 'from-violet-100 to-violet-50',
  'from-amber-100 to-amber-50', 'from-rose-100 to-rose-50',
];

// ─── Sub-components ───────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">{children}</p>;
}

function ProductPicker({ selected, onSelect }: { selected: number | null; onSelect: (id: number | null) => void }) {
  const [open, setOpen] = useState(false);
  const product = products.find(p => p.id === selected);
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center gap-2 h-9 px-3 border rounded-lg text-xs transition-colors
          ${selected ? 'border-foreground bg-foreground/5' : 'border-border hover:border-foreground/30 bg-background'}`}>
        <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className={`flex-1 text-left truncate ${selected ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
          {product?.name ?? 'Select product for reference…'}
        </span>
        {selected
          ? <X className="w-3.5 h-3.5 text-muted-foreground shrink-0" onClick={e => { e.stopPropagation(); onSelect(null); }} />
          : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
          {products.map(p => (
            <button key={p.id} onClick={() => { onSelect(p.id); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary transition-colors text-left">
              <div className="w-8 h-8 rounded-lg border border-border bg-secondary/50 flex items-center justify-center shrink-0">
                <Package className="w-3.5 h-3.5 text-muted-foreground/40" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{p.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{p.sku}</p>
              </div>
              {selected === p.id && <Check className="w-3.5 h-3.5 text-foreground shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────

export default function AIImage() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('square');
  const [selectedStyle, setSelectedStyle] = useState('studio');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [ratio, setRatio] = useState('1:1');
  const [starred, setStarred] = useState<Set<number>>(new Set([1, 4]));

  const handleGenerate = () => { setGenerating(true); setTimeout(() => setGenerating(false), 1800); };

  return (
    <div className="flex h-full overflow-hidden bg-background">

      {/* ── Config panel (left) ── */}
      <div className="w-[420px] border-r bg-card flex flex-col shrink-0 overflow-hidden">

        {/* Header */}
        <div className="px-4 py-3.5 border-b flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground rounded-xl flex items-center justify-center shadow-sm">
            <ImageIcon className="w-4 h-4 text-background" />
          </div>
          <div>
            <p className="font-semibold text-sm">AI Image</p>
            <p className="text-[11px] text-muted-foreground">Generate ad creatives instantly</p>
          </div>
        </div>

        {/* Scrollable config */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {/* Prompt */}
          <div>
            <SectionLabel>Describe your creative</SectionLabel>
            <div className="relative">
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
                placeholder="e.g. Studio shot of leather tote with soft shadows and minimal white background..."
                rows={7}
                className="w-full px-3 py-2.5 border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-foreground rounded-lg resize-none leading-relaxed" />
              <button className="absolute bottom-2 right-2 p-1 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Wand2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Product reference */}
          <div>
            <SectionLabel>Product Reference</SectionLabel>
            <ProductPicker selected={selectedProduct} onSelect={setSelectedProduct} />
            <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3" />AI pulls product images and copy automatically.
            </p>
          </div>

          {/* Format */}
          <div>
            <SectionLabel>Format</SectionLabel>
            <div className="grid grid-cols-2 gap-1.5">
              {templates.map(t => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t.id); setRatio(t.ratio); }}
                  className={`text-left p-2.5 border rounded-lg transition-all text-xs
                    ${selectedTemplate === t.id ? 'border-foreground bg-foreground/5 ring-1 ring-foreground' : 'border-border hover:border-foreground/30 bg-background'}`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-[11px]">{t.label}</span>
                    {selectedTemplate === t.id && <Check className="w-3 h-3 text-foreground" />}
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-tight block">{t.desc}</span>
                  <span className="text-[9px] font-mono text-muted-foreground/50 mt-1 block">{t.ratio}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <SectionLabel>Style</SectionLabel>
            <div className="space-y-1">
              {styles.map(s => (
                <button key={s.id} onClick={() => setSelectedStyle(s.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 border rounded-lg text-xs transition-all
                    ${selectedStyle === s.id ? 'border-foreground bg-foreground/5' : 'border-border hover:border-foreground/30 bg-background'}`}>
                  <div className="text-left">
                    <span className="font-medium block text-[11px]">{s.label}</span>
                    <span className="text-[10px] text-muted-foreground">{s.desc}</span>
                  </div>
                  {selectedStyle === s.id && <Check className="w-3.5 h-3.5 text-foreground shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect ratio */}
          <div>
            <SectionLabel>Aspect Ratio</SectionLabel>
            <div className="flex gap-1.5">
              {['1:1', '16:9', '4:5', '9:16'].map(r => (
                <button key={r} onClick={() => setRatio(r)}
                  className={`flex-1 py-1.5 text-[10px] font-mono border rounded-lg transition-colors
                    ${ratio === r ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-personalise toggle */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-secondary/40 rounded-lg">
            <div>
              <p className="text-xs font-medium">Auto-personalise</p>
              <p className="text-[10px] text-muted-foreground">Use customer name & history</p>
            </div>
            <div className="w-9 h-5 bg-foreground rounded-full relative cursor-pointer shrink-0 shadow-inner">
              <div className="w-3.5 h-3.5 bg-background rounded-full absolute right-0.5 top-0.5 shadow" />
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t space-y-2 shrink-0">
          <Button onClick={handleGenerate} disabled={generating} className="w-full h-10 gap-2">
            {generating ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" />Generating…</>
              : <><Sparkles className="w-3.5 h-3.5" />Generate Creative</>}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">4 generations remaining today</p>
        </div>
      </div>

      {/* ── Gallery (right) ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Gallery toolbar */}
        <div className="px-5 py-3 border-b bg-card/50 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-5 text-sm">
            {[['4', 'Creatives'], ['4.4%', 'Avg CTR'], ['6', 'Flow uses']].map(([v, l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span className="font-bold">{v}</span>
                <span className="text-xs text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-background">
            <Plus className="w-3.5 h-3.5" />New Batch
          </Button>
        </div>

        {/* Image grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-secondary/10">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {generated.map((img, idx) => (
              <div key={img.id}
                className="bg-card border border-border/60 rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:border-border transition-all group">
                <div className={`w-full bg-gradient-to-br ${gradients[idx % gradients.length]} relative flex items-center justify-center ${ratioClass[img.ratio] ?? 'aspect-square'}`}>
                  <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 0,transparent 50%)', backgroundSize: '8px 8px' }} />
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <ImageIcon className="w-7 h-7 text-foreground/20" />
                    <span className="text-[9px] font-semibold text-foreground/30 uppercase tracking-widest">Preview</span>
                  </div>
                  <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
                    <Badge variant="outline" className={`text-[9px] uppercase backdrop-blur-sm ${img.status === 'live' ? 'bg-background/80 border-foreground/20 text-foreground' : 'bg-background/60'}`}>
                      {img.status}
                    </Badge>
                    <button onClick={() => setStarred(p => { const n = new Set(p); n.has(img.id) ? n.delete(img.id) : n.add(img.id); return n; })}
                      className="w-6 h-6 rounded-md bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className={`w-3 h-3 ${starred.has(img.id) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">{img.prompt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="font-mono bg-secondary px-1.5 py-0.5 rounded">{img.ratio}</span>
                      {img.ctr !== '—' && (
                        <span className="flex items-center gap-0.5 text-emerald-600 font-medium">
                          <TrendingUp className="w-2.5 h-2.5" />{img.ctr}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-6 h-6 flex items-center justify-center border border-border rounded-md hover:bg-secondary transition-colors"><Copy className="w-3 h-3" /></button>
                      <button className="w-6 h-6 flex items-center justify-center border border-border rounded-md hover:bg-secondary transition-colors"><Download className="w-3 h-3" /></button>
                      <button className="w-6 h-6 flex items-center justify-center border border-border rounded-md hover:bg-secondary transition-colors"><MoreVertical className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{img.flow}</p>
                </div>
              </div>
            ))}

            <button onClick={handleGenerate}
              className="border-2 border-dashed border-border/60 rounded-xl aspect-square flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-secondary/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Generate new</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
