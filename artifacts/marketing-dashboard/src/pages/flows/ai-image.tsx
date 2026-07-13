import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ImageIcon, Sparkles, RefreshCw, Download, Copy,
  Plus, MoreVertical, Package, ChevronDown, Check, X
} from 'lucide-react';

// ─── Mock data ────────────────────────────────────────────────

const templates = [
  { id: 'hero',     label: 'Hero Banner',     desc: 'Full-width product showcase',  ratio: '16:9' },
  { id: 'square',   label: 'Square Ad',       desc: 'Instagram / Facebook feed',    ratio: '1:1'  },
  { id: 'story',    label: 'Story / Reel',    desc: 'Vertical full-screen',         ratio: '9:16' },
  { id: 'portrait', label: 'Portrait Ad',     desc: 'Pinterest / catalog grid',     ratio: '4:5'  },
  { id: 'email',    label: 'Email Header',    desc: 'Inline campaign header',       ratio: '3:1'  },
  { id: 'thumb',    label: 'Product Thumb',   desc: 'Listing / PDP thumbnail',      ratio: '1:1'  },
];

const styles = [
  { id: 'studio',     label: 'Studio',      desc: 'Clean white background, sharp shadows' },
  { id: 'lifestyle',  label: 'Lifestyle',   desc: 'Natural light, real-world setting'     },
  { id: 'minimal',    label: 'Minimal',     desc: 'Empty space, bold typography'          },
  { id: 'editorial',  label: 'Editorial',   desc: 'Magazine-style, high contrast'         },
  { id: 'flat',       label: 'Flat lay',    desc: 'Overhead product arrangement'          },
  { id: 'dark',       label: 'Dark mode',   desc: 'Dark background, moody lighting'       },
];

const products = [
  { id: 1, name: 'Classic Runner Sneaker',  sku: 'SKU-001', img: null },
  { id: 2, name: 'Merino Wool Crew',        sku: 'SKU-042', img: null },
  { id: 3, name: 'Leather Tote Bag',        sku: 'SKU-108', img: null },
  { id: 4, name: 'Polarised Sunglasses',    sku: 'SKU-207', img: null },
  { id: 5, name: 'Slim Fit Chinos',         sku: 'SKU-315', img: null },
];

const generated = [
  { id: 1, prompt: 'Classic Runner — studio, white bg, sharp shadows', ratio: '1:1',  flow: 'Abandoned Cart',    ctr: '4.2%', status: 'live'  },
  { id: 2, prompt: 'Summer sale banner, bold type, warm palette',       ratio: '16:9', flow: 'Welcome Series',    ctr: '3.8%', status: 'live'  },
  { id: 3, prompt: 'Leather Tote flat-lay, clean surface',              ratio: '4:5',  flow: 'Win-back Campaign', ctr: '—',    status: 'draft' },
  { id: 4, prompt: 'Holiday gift-set hero, dark background',            ratio: '1:1',  flow: 'VIP Milestone',     ctr: '5.1%', status: 'live'  },
];

const ratioClass: Record<string, string> = {
  '1:1': 'h-40', '16:9': 'h-28', '4:5': 'h-48', '9:16': 'h-56', '3:1': 'h-20',
};

// ─── Sub-components ───────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{children}</p>;
}

function ProductPicker({ selected, onSelect }: { selected: number | null; onSelect: (id: number | null) => void }) {
  const [open, setOpen] = useState(false);
  const product = products.find(p => p.id === selected);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center gap-2 h-9 px-3 border rounded-sm text-sm transition-colors
          ${selected ? 'border-foreground bg-foreground/5' : 'border-border hover:border-foreground/50 bg-background'}`}
      >
        <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className={`flex-1 text-left text-xs truncate ${selected ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
          {product ? product.name : 'Select a product for reference…'}
        </span>
        {selected
          ? <X className="w-3.5 h-3.5 text-muted-foreground shrink-0" onClick={(e) => { e.stopPropagation(); onSelect(null); }} />
          : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-sm shadow-lg z-20 overflow-hidden">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => { onSelect(p.id); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary transition-colors text-left"
            >
              {/* Product placeholder thumbnail */}
              <div className="w-8 h-8 border border-border rounded bg-secondary/50 flex items-center justify-center shrink-0">
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
  const [selectedTemplate, setSelectedTemplate] = useState<string>('square');
  const [selectedStyle, setSelectedStyle] = useState<string>('studio');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [ratio, setRatio] = useState('1:1');

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1800);
  };

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Left config panel ── */}
      <div className="w-72 border-r bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="px-4 py-3 border-b bg-background shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-foreground rounded flex items-center justify-center">
              <ImageIcon className="w-3.5 h-3.5 text-background" />
            </div>
            <div>
              <p className="font-semibold text-sm">AI Image</p>
              <p className="text-[11px] text-muted-foreground">Generate ad creatives</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {/* Prompt */}
          <div>
            <SectionLabel>Prompt</SectionLabel>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your creative…"
              rows={3}
              className="w-full px-3 py-2 border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-foreground rounded-sm resize-none leading-relaxed"
            />
          </div>

          {/* Product reference */}
          <div>
            <SectionLabel>Product Reference</SectionLabel>
            <ProductPicker selected={selectedProduct} onSelect={setSelectedProduct} />
            <p className="text-[10px] text-muted-foreground mt-1.5">AI will pull product images and details automatically.</p>
          </div>

          {/* Templates */}
          <div>
            <SectionLabel>Template</SectionLabel>
            <div className="grid grid-cols-2 gap-1.5">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(t.id); setRatio(t.ratio); }}
                  className={`text-left p-2.5 border rounded-sm transition-all text-xs
                    ${selectedTemplate === t.id
                      ? 'border-foreground bg-foreground/5 ring-1 ring-foreground'
                      : 'border-border hover:border-foreground/40 bg-background'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-[11px] leading-tight">{t.label}</span>
                    {selectedTemplate === t.id && <Check className="w-3 h-3 text-foreground shrink-0" />}
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-tight block">{t.desc}</span>
                  <span className="text-[9px] font-mono text-muted-foreground/60 mt-1 block">{t.ratio}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <SectionLabel>Image Style</SectionLabel>
            <div className="space-y-1">
              {styles.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 border rounded-sm text-xs transition-all
                    ${selectedStyle === s.id
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/40 bg-background'}`}
                >
                  <div className="text-left">
                    <span className="font-medium block text-[11px]">{s.label}</span>
                    <span className="text-[10px] text-muted-foreground">{s.desc}</span>
                  </div>
                  {selectedStyle === s.id && <Check className="w-3.5 h-3.5 text-foreground shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect ratio override */}
          <div>
            <SectionLabel>Aspect Ratio</SectionLabel>
            <div className="flex gap-1.5">
              {['1:1', '16:9', '4:5', '9:16'].map(r => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  className={`flex-1 py-1.5 text-[10px] font-mono border rounded-sm transition-colors
                    ${ratio === r ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-personalise */}
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-xs font-medium">Auto-personalise</p>
              <p className="text-[10px] text-muted-foreground">Use customer name & history</p>
            </div>
            <div className="w-9 h-5 bg-foreground rounded-full relative cursor-pointer shrink-0">
              <div className="w-3.5 h-3.5 bg-background rounded-full absolute right-0.5 top-0.5" />
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t shrink-0">
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full h-10 bg-foreground text-background text-sm gap-2"
          >
            {generating
              ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating…</>
              : <><Sparkles className="w-3.5 h-3.5" /> Generate</>}
          </Button>
        </div>
      </div>

      {/* ── Right: generated gallery ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 h-12 border-b bg-background flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-sm">
            {[['4', 'Creatives'], ['4.4%', 'Avg CTR'], ['6', 'Flow uses']].map(([val, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="font-bold">{val}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" /> New Batch
          </Button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-5 bg-secondary/5">
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            {generated.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedCard(selectedCard === img.id ? null : img.id)}
                className={`bg-card border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md
                  ${selectedCard === img.id ? 'ring-2 ring-foreground' : ''}`}
              >
                {/* Preview placeholder */}
                <div className={`w-full bg-secondary/40 relative flex items-center justify-center ${ratioClass[img.ratio] ?? 'h-40'}`}>
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 0,transparent 50%)', backgroundSize: '10px 10px' }}
                  />
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
                    <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-wider">Generated</span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className={`text-[9px] uppercase ${img.status === 'live' ? 'bg-background border-foreground text-foreground' : ''}`}>
                      {img.status}
                    </Badge>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-3">
                  <p className="text-xs text-muted-foreground leading-snug line-clamp-2 mb-2">{img.prompt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="font-mono">{img.ratio}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span>{img.flow}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span>CTR {img.ctr}</span>
                    </div>
                    <div className="flex gap-1">
                      <button className="w-6 h-6 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors">
                        <Download className="w-3 h-3" />
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty slot */}
            <button
              onClick={handleGenerate}
              className="border-2 border-dashed border-border rounded-lg h-48 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs font-medium">Generate new creative</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
