import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Video, Sparkles, Play, Pause, Download,
  RefreshCw, Plus, MoreVertical, Package,
  ChevronDown, Check, X, Clock
} from 'lucide-react';

// ─── Mock data ────────────────────────────────────────────────

const products = [
  { id: 1, name: 'Classic Runner Sneaker', sku: 'SKU-001' },
  { id: 2, name: 'Merino Wool Crew',       sku: 'SKU-042' },
  { id: 3, name: 'Leather Tote Bag',       sku: 'SKU-108' },
  { id: 4, name: 'Polarised Sunglasses',   sku: 'SKU-207' },
  { id: 5, name: 'Slim Fit Chinos',        sku: 'SKU-315' },
];

const templates = [
  { id: 'showcase',  label: 'Product Showcase', desc: 'Hero close-up with animated text overlay'  },
  { id: 'story',     label: 'Brand Story',       desc: 'Narrative arc with voiceover'             },
  { id: 'reel',      label: 'Reel / Story',      desc: 'Vertical short-form, fast cuts'           },
  { id: 'unbox',     label: 'Unboxing',          desc: 'Reveal sequence with sound effects'       },
  { id: 'compare',   label: 'Before / After',    desc: 'Side-by-side transformation'              },
  { id: 'ugc',       label: 'UGC Style',         desc: 'Lo-fi, authentic feel, talking head'      },
];

const durations = ['0:10', '0:15', '0:30', '0:45', '1:00'];

const videos = [
  { id: 1, title: 'Cart Recovery — 15s Spot',  flow: 'Abandoned Cart',    duration: '0:15', res: '1080p', fps: 30, status: 'ready',      ctr: '3.4%', plays: 1820 },
  { id: 2, title: 'Brand Awareness Reel',       flow: 'Welcome Series',    duration: '0:30', res: '4K',    fps: 60, status: 'ready',      ctr: '2.9%', plays: 3410 },
  { id: 3, title: 'Product Demo — Summer',      flow: 'Win-back Campaign', duration: '0:45', res: '1080p', fps: 30, status: 'processing', ctr: '—',    plays: 0    },
  { id: 4, title: 'VIP Loyalty Highlight',      flow: 'VIP Milestone',     duration: '0:20', res: '1080p', fps: 30, status: 'ready',      ctr: '5.1%', plays: 640  },
];

// ─── Shared sub-components ────────────────────────────────────

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
          {product ? product.name : 'Select a product…'}
        </span>
        {selected
          ? <X className="w-3.5 h-3.5 text-muted-foreground shrink-0" onClick={e => { e.stopPropagation(); onSelect(null); }} />
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

export default function AIVideo() {
  const [playing, setPlaying]               = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('showcase');
  const [selectedDuration, setSelectedDuration] = useState<string>('0:15');
  const [generating, setGenerating]         = useState(false);
  const [prompt, setPrompt]                 = useState('');

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Left config panel ── */}
      <div className="w-72 border-r bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="px-4 py-3 border-b bg-background shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-foreground rounded flex items-center justify-center">
              <Video className="w-3.5 h-3.5 text-background" />
            </div>
            <div>
              <p className="font-semibold text-sm">AI Video</p>
              <p className="text-[11px] text-muted-foreground">Generate campaign video ads</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {/* Prompt */}
          <div>
            <SectionLabel>Prompt</SectionLabel>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your video ad…"
              rows={3}
              className="w-full px-3 py-2 border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-foreground rounded-sm resize-none leading-relaxed"
            />
          </div>

          {/* Product */}
          <div>
            <SectionLabel>Product Reference</SectionLabel>
            <ProductPicker selected={selectedProduct} onSelect={setSelectedProduct} />
            <p className="text-[10px] text-muted-foreground mt-1.5">AI pulls product images & copy automatically.</p>
          </div>

          {/* Template */}
          <div>
            <SectionLabel>Template</SectionLabel>
            <div className="space-y-1.5">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-sm text-xs transition-all
                    ${selectedTemplate === t.id
                      ? 'border-foreground bg-foreground/5 ring-1 ring-foreground'
                      : 'border-border hover:border-foreground/40 bg-background'}`}
                >
                  <div className="text-left">
                    <span className="font-medium block text-[11px]">{t.label}</span>
                    <span className="text-[10px] text-muted-foreground">{t.desc}</span>
                  </div>
                  {selectedTemplate === t.id && <Check className="w-3.5 h-3.5 text-foreground shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <SectionLabel>Duration</SectionLabel>
            <div className="flex gap-1.5 flex-wrap">
              {durations.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDuration(d)}
                  className={`px-3 py-1.5 text-xs font-mono border rounded-sm transition-colors
                    ${selectedDuration === d
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:bg-secondary bg-background'}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Auto-trim to content</span>
              </div>
              <div className="w-8 h-4 bg-foreground rounded-full relative cursor-pointer ml-auto shrink-0">
                <div className="w-3 h-3 bg-background rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
          </div>

          {/* Resolution */}
          <div>
            <SectionLabel>Resolution</SectionLabel>
            <div className="flex gap-1.5">
              {['720p', '1080p', '4K'].map(r => (
                <button
                  key={r}
                  className={`flex-1 py-1.5 text-[10px] font-mono border rounded-sm transition-colors
                    ${r === '1080p' ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-captions */}
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-xs font-medium">Auto captions</p>
              <p className="text-[10px] text-muted-foreground">Burn subtitles into video</p>
            </div>
            <div className="w-9 h-5 bg-foreground rounded-full relative cursor-pointer shrink-0">
              <div className="w-3.5 h-3.5 bg-background rounded-full absolute right-0.5 top-0.5" />
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="p-4 border-t shrink-0">
          <Button
            onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 2000); }}
            disabled={generating}
            className="w-full h-10 bg-foreground text-background text-sm gap-2"
          >
            {generating
              ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating…</>
              : <><Sparkles className="w-3.5 h-3.5" /> Generate Video</>}
          </Button>
        </div>
      </div>

      {/* ── Right: video list ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 h-12 border-b bg-background flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-sm">
            {[['4', 'Videos'], ['5,870', 'Total plays'], ['3.8%', 'Avg CTR'], ['3', 'Live in flows']].map(([val, label]) => (
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

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 bg-secondary/5 space-y-4">
          {videos.map(v => (
            <div key={v.id} className="bg-card border rounded-lg overflow-hidden flex hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div
                className="w-44 bg-foreground relative flex items-center justify-center shrink-0 cursor-pointer group"
                onClick={() => setPlaying(playing === v.id ? null : v.id)}
              >
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 20px)', backgroundSize: '20px 20px' }}
                />
                {v.status === 'processing' ? (
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-white/50 animate-spin" />
                    <span className="text-[10px] text-white/40 font-mono">PROCESSING</span>
                  </div>
                ) : (
                  <>
                    <div className="w-9 h-9 border-2 border-white/70 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                      {playing === v.id
                        ? <Pause className="w-3.5 h-3.5 text-white" />
                        : <Play className="w-3.5 h-3.5 text-white ml-0.5" />}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {v.duration}
                    </div>
                  </>
                )}
              </div>

              {/* Meta */}
              <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm truncate">{v.title}</p>
                    <Badge variant="outline" className={`text-[9px] uppercase shrink-0 ${v.status === 'ready' ? 'border-foreground text-foreground' : ''}`}>
                      {v.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{v.flow}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="font-mono">{v.res} · {v.fps}fps · {v.duration}</span>
                    {v.plays > 0 && <span>{v.plays.toLocaleString()} plays · CTR {v.ctr}</span>}
                  </div>
                  {v.status === 'ready' && (
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="sm" className="h-7 text-xs px-3">Use in Flow</Button>
                      <button className="w-7 h-7 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button className="w-full border-2 border-dashed border-border rounded-lg h-20 flex items-center justify-center gap-2 text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Generate new video</span>
          </button>
        </div>
      </div>
    </div>
  );
}
