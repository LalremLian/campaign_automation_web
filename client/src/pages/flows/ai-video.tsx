import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Video, Sparkles, Play, Pause, Download, RefreshCw,
  Plus, MoreVertical, Package, ChevronDown, Check, X,
  Clock, Wand2, TrendingUp, Info, Eye,
} from 'lucide-react';

const products = [
  { id: 1, name: 'Classic Runner Sneaker', sku: 'SKU-001' },
  { id: 2, name: 'Merino Wool Crew',       sku: 'SKU-042' },
  { id: 3, name: 'Leather Tote Bag',       sku: 'SKU-108' },
  { id: 4, name: 'Polarised Sunglasses',   sku: 'SKU-207' },
  { id: 5, name: 'Slim Fit Chinos',        sku: 'SKU-315' },
];

const templates = [
  { id: 'showcase', label: 'Product Showcase', desc: 'Hero close-up + animated overlay' },
  { id: 'story',    label: 'Brand Story',       desc: 'Narrative arc with voiceover'    },
  { id: 'reel',     label: 'Reel / Story',      desc: 'Vertical short-form, fast cuts'  },
  { id: 'unbox',    label: 'Unboxing',          desc: 'Reveal sequence + sound effects' },
  { id: 'compare',  label: 'Before / After',    desc: 'Side-by-side transformation'     },
  { id: 'ugc',      label: 'UGC Style',         desc: 'Lo-fi, authentic, talking head'  },
];

const durations = ['0:10', '0:15', '0:30', '0:45', '1:00'];
const resolutions = ['720p', '1080p', '4K'];

const videos = [
  { id: 1, title: 'Cart Recovery — 15s Spot', flow: 'Abandoned Cart',    duration: '0:15', res: '1080p', fps: 30, status: 'ready',      ctr: '3.4%', plays: 1820, gradient: 'from-blue-900 to-blue-800'   },
  { id: 2, title: 'Brand Awareness Reel',      flow: 'Welcome Series',    duration: '0:30', res: '4K',    fps: 60, status: 'ready',      ctr: '2.9%', plays: 3410, gradient: 'from-violet-900 to-violet-800' },
  { id: 3, title: 'Product Demo — Summer',     flow: 'Win-back Campaign', duration: '0:45', res: '1080p', fps: 30, status: 'processing', ctr: '—',    plays: 0,    gradient: 'from-gray-800 to-gray-700'    },
  { id: 4, title: 'VIP Loyalty Highlight',     flow: 'VIP Milestone',     duration: '0:20', res: '1080p', fps: 30, status: 'ready',      ctr: '5.1%', plays: 640,  gradient: 'from-amber-900 to-amber-800'  },
];

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
          {product?.name ?? 'Select a product…'}
        </span>
        {selected
          ? <X className="w-3.5 h-3.5 text-muted-foreground" onClick={e => { e.stopPropagation(); onSelect(null); }} />
          : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
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
              {selected === p.id && <Check className="w-3.5 h-3.5 text-foreground" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AIVideo() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('showcase');
  const [selectedDuration, setSelectedDuration] = useState('0:15');
  const [selectedRes, setSelectedRes] = useState('1080p');
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  return (
    <div className="flex h-full overflow-hidden bg-background">

      {/* Left panel */}
      <div className="w-[420px] border-r bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="px-4 py-3.5 border-b flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground rounded-xl flex items-center justify-center shadow-sm">
            <Video className="w-4 h-4 text-background" />
          </div>
          <div>
            <p className="font-semibold text-sm">AI Video</p>
            <p className="text-[11px] text-muted-foreground">Generate campaign video ads</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div>
            <SectionLabel>Describe your video</SectionLabel>
            <div className="relative">
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
                placeholder="e.g. Fast-paced 15s product showcase with upbeat music and bold text overlays..."
                rows={7}
                className="w-full px-3 py-2.5 border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-foreground rounded-lg resize-none leading-relaxed" />
              <button className="absolute bottom-2 right-2 p-1 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Wand2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <SectionLabel>Product Reference</SectionLabel>
            <ProductPicker selected={selectedProduct} onSelect={setSelectedProduct} />
            <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3" />AI pulls product images and copy automatically.
            </p>
          </div>

          <div>
            <SectionLabel>Template</SectionLabel>
            <div className="space-y-1.5">
              {templates.map(t => (
                <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-xs transition-all
                    ${selectedTemplate === t.id ? 'border-foreground bg-foreground/5 ring-1 ring-foreground' : 'border-border hover:border-foreground/30 bg-background'}`}>
                  <div className="text-left">
                    <span className="font-semibold block text-[11px]">{t.label}</span>
                    <span className="text-[10px] text-muted-foreground">{t.desc}</span>
                  </div>
                  {selectedTemplate === t.id && <Check className="w-3.5 h-3.5 text-foreground shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Duration</SectionLabel>
            <div className="flex gap-1.5 flex-wrap">
              {durations.map(d => (
                <button key={d} onClick={() => setSelectedDuration(d)}
                  className={`px-3 py-1.5 text-xs font-mono border rounded-lg transition-colors
                    ${selectedDuration === d ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary bg-background'}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-2.5 flex items-center justify-between px-3 py-2 bg-secondary/40 rounded-lg">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" />Auto-trim to content
              </div>
              <div className="w-8 h-4 bg-foreground rounded-full relative cursor-pointer shrink-0">
                <div className="w-3 h-3 bg-background rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>Resolution</SectionLabel>
            <div className="flex gap-1.5">
              {resolutions.map(r => (
                <button key={r} onClick={() => setSelectedRes(r)}
                  className={`flex-1 py-1.5 text-[10px] font-mono border rounded-lg transition-colors
                    ${selectedRes === r ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-2.5 px-3 bg-secondary/40 rounded-lg">
            <div>
              <p className="text-xs font-medium">Auto captions</p>
              <p className="text-[10px] text-muted-foreground">Burn subtitles into video</p>
            </div>
            <div className="w-9 h-5 bg-foreground rounded-full relative cursor-pointer shrink-0 shadow-inner">
              <div className="w-3.5 h-3.5 bg-background rounded-full absolute right-0.5 top-0.5 shadow" />
            </div>
          </div>
        </div>

        <div className="p-4 border-t space-y-2 shrink-0">
          <Button onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 2000); }}
            disabled={generating} className="w-full h-10 gap-2">
            {generating ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" />Generating…</>
              : <><Sparkles className="w-3.5 h-3.5" />Generate Video</>}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">~30–90s generation time</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 h-12 border-b flex items-center justify-between shrink-0 bg-card/50">
          <div className="flex items-center gap-5 text-sm">
            {[['4', 'Videos'], ['5,870', 'Total plays'], ['3.8%', 'Avg CTR'], ['3', 'Live in flows']].map(([v, l]) => (
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

        <div className="flex-1 overflow-y-auto p-5 bg-secondary/10 space-y-4">
          {videos.map(v => (
            <div key={v.id} className="bg-card border border-border/60 rounded-xl overflow-hidden flex hover:shadow-md hover:border-border transition-all group">
              {/* Thumbnail */}
              <div
                className={`w-48 bg-gradient-to-br ${v.gradient} relative flex items-center justify-center shrink-0 cursor-pointer`}
                onClick={() => setPlaying(playing === v.id ? null : v.id)}
              >
                <div className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 20px)', backgroundSize: '20px 20px' }} />
                {v.status === 'processing' ? (
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-white/40 animate-spin" />
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Processing</span>
                  </div>
                ) : (
                  <>
                    <div className={`w-10 h-10 border-2 border-white/60 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-white/90`}>
                      {playing === v.id
                        ? <Pause className="w-4 h-4 text-white" />
                        : <Play className="w-4 h-4 text-white ml-0.5" />}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-mono">
                      {v.duration}
                    </div>
                  </>
                )}
              </div>

              {/* Meta */}
              <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="font-semibold text-sm truncate">{v.title}</p>
                    <Badge variant="outline" className={`text-[9px] uppercase shrink-0 ${v.status === 'ready' ? 'border-foreground/30 text-foreground' : ''}`}>
                      {v.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{v.flow}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                    <span className="font-mono bg-secondary px-1.5 py-0.5 rounded">{v.res} · {v.fps}fps</span>
                    {v.plays > 0 && (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <TrendingUp className="w-3 h-3" />{v.ctr} CTR · {v.plays.toLocaleString()} plays
                      </span>
                    )}
                  </div>
                  {v.status === 'ready' && (
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="sm" className="h-7 text-xs px-3 bg-background">Use in Flow</Button>
                      <button className="w-7 h-7 flex items-center justify-center border border-border rounded-lg hover:bg-secondary transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center border border-border rounded-lg hover:bg-secondary transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center border border-border rounded-lg hover:bg-secondary transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button className="w-full border-2 border-dashed border-border/60 rounded-xl h-20 flex items-center justify-center gap-3 text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-secondary/20 transition-all">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Generate new video</span>
          </button>
        </div>
      </div>
    </div>
  );
}
