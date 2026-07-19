import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Upload, Search, Image, Copy, Trash2, Palette,
  Type, CheckCircle2, Plus, Download, Link2
} from 'lucide-react';

// ─── Mock media library ───────────────────────────────────────────────────────
const mediaFiles = [
  { id: 1, name: 'hero-banner.jpg',    type: 'image', size: '248 KB', dims: '1200×628', used: 12, color: 'from-blue-200 to-blue-100' },
  { id: 2, name: 'logo-dark.png',      type: 'image', size: '18 KB',  dims: '400×120',  used: 62, color: 'from-gray-200 to-gray-100' },
  { id: 3, name: 'logo-light.png',     type: 'image', size: '18 KB',  dims: '400×120',  used: 48, color: 'from-gray-800 to-gray-700' },
  { id: 4, name: 'product-shot-1.jpg', type: 'image', size: '182 KB', dims: '800×800',  used: 8,  color: 'from-amber-200 to-amber-100' },
  { id: 5, name: 'product-shot-2.jpg', type: 'image', size: '204 KB', dims: '800×800',  used: 5,  color: 'from-rose-200 to-rose-100' },
  { id: 6, name: 'summer-bg.jpg',      type: 'image', size: '312 KB', dims: '1600×900', used: 3,  color: 'from-cyan-200 to-cyan-100' },
  { id: 7, name: 'icon-email.svg',     type: 'svg',   size: '4 KB',   dims: '64×64',    used: 24, color: 'from-violet-100 to-violet-50' },
  { id: 8, name: 'icon-cart.svg',      type: 'svg',   size: '3 KB',   dims: '64×64',    used: 18, color: 'from-green-100 to-green-50' },
];

// ─── Brand config ─────────────────────────────────────────────────────────────
const brandColors = [
  { name: 'Primary',   hex: '#0A0A0A', usage: 'Buttons, headings' },
  { name: 'Secondary', hex: '#F5F5F5', usage: 'Backgrounds, cards' },
  { name: 'Accent',    hex: '#2563EB', usage: 'Links, highlights' },
  { name: 'Success',   hex: '#16A34A', usage: 'Positive states' },
  { name: 'Warning',   hex: '#D97706', usage: 'Alerts, badges' },
  { name: 'Danger',    hex: '#DC2626', usage: 'Errors, destructive' },
];

const brandFonts = [
  { role: 'Heading', family: 'Inter', weight: '700', size: '28px', fallback: 'sans-serif' },
  { role: 'Body',    family: 'Inter', weight: '400', size: '16px', fallback: 'sans-serif' },
  { role: 'Caption', family: 'Inter', weight: '400', size: '12px', fallback: 'sans-serif' },
  { role: 'Mono',    family: 'Menlo', weight: '400', size: '13px', fallback: 'monospace' },
];

export default function MediaBrand() {
  const [tab, setTab] = useState('media');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const filteredMedia = mediaFiles.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Media & Brand</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Your image library, brand colors, and typography — all in one place.</p>
        </div>
        {tab === 'media' && (
          <Button size="sm" className="h-8 text-xs self-start sm:self-auto">
            <Upload className="w-3.5 h-3.5 mr-1.5" />Upload Files
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="media" onValueChange={setTab}>
        <TabsList className="bg-secondary/50 h-8 p-0.5">
          {[
            { value: 'media',  label: 'Media Library' },
            { value: 'colors', label: 'Brand Colors' },
            { value: 'fonts',  label: 'Typography' },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value} className="text-xs h-7 px-4">{t.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ── Media Library ── */}
      {tab === 'media' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input className="pl-8 h-8 text-xs bg-background w-110" placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="text-xs text-muted-foreground ml-auto"><span className="font-bold text-foreground">{filteredMedia.length} files · 1.2 GB used of 5 GB</span></div>
          </div>

          {/* Upload dropzone */}
          <div className="border-2 border-dashed border-border/60 rounded-xl p-6 text-center hover:border-foreground/30 hover:bg-secondary/20 transition-all cursor-pointer group">
            <Upload className="w-7 h-7 text-muted-foreground mx-auto mb-2 group-hover:text-foreground transition-colors" />
            <p className="text-sm font-medium">Drop files here or <span className="underline underline-offset-2">browse</span></p>
            <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, SVG, GIF — max 10 MB each</p>
          </div>

          {/* Grid */}
          <motion.div layout className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredMedia.map(file => (
              <motion.div key={file.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                <Card className="border-border/60 overflow-hidden hover:shadow-sm hover:border-border transition-all group cursor-pointer">
                  <div className={`h-24 bg-gradient-to-br ${file.color} flex items-center justify-center relative`}>
                    <Image className="w-6 h-6 text-foreground/20" />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 backdrop-blur-[1px]">
                      <button onClick={() => handleCopy(file.name)} className="w-7 h-7 rounded-md bg-background/80 flex items-center justify-center hover:bg-background transition-colors shadow-sm">
                        {copied === file.name ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-foreground" />}
                      </button>
                      <button className="w-7 h-7 rounded-md bg-background/80 flex items-center justify-center hover:bg-background transition-colors shadow-sm">
                        <Download className="w-3.5 h-3.5 text-foreground" />
                      </button>
                      <button className="w-7 h-7 rounded-md bg-background/80 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/20 hover:bg-background transition-colors shadow-sm">
                        <Trash2 className="w-3.5 h-3.5 text-foreground hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                  <CardContent className="p-2.5 space-y-1">
                    <p className="text-[11px] font-medium truncate">{file.name}</p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{file.dims}</span>
                      <span>{file.size}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Used {file.used}×</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── Brand Colors ── */}
      {tab === 'colors' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Define your brand palette — used across email templates automatically.</p>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-background">
              <Plus className="w-3.5 h-3.5 mr-1.5" />Add Color
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brandColors.map(c => (
              <Card key={c.name} className="border-border/60 overflow-hidden group hover:shadow-sm transition-all">
                <div className="h-20 relative" style={{ backgroundColor: c.hex }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopy(c.hex)}
                      className="px-3 py-1.5 bg-background/90 rounded-md text-xs font-medium shadow-sm flex items-center gap-1.5 hover:bg-background transition-colors"
                    >
                      {copied === c.hex ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      Copy hex
                    </button>
                  </div>
                </div>
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{c.usage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[11px] font-mono text-muted-foreground">{c.hex}</code>
                    <button className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Palette className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Typography ── */}
      {tab === 'fonts' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Typography settings applied to all email templates by default.</p>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-background">
              <Plus className="w-3.5 h-3.5 mr-1.5" />Add Font
            </Button>
          </div>

          <div className="space-y-3">
            {brandFonts.map(f => (
              <Card key={f.role} className="border-border/60 hover:shadow-sm transition-all">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Type className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold">{f.role}</p>
                        <Badge variant="outline" className="text-[10px] px-1.5">{f.family}</Badge>
                      </div>
                      <p
                        className="text-muted-foreground leading-none"
                        style={{ fontFamily: f.family, fontSize: '18px', fontWeight: f.weight }}
                      >
                        The quick brown fox jumps
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">Size</p>
                      <p className="text-xs font-semibold">{f.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">Weight</p>
                      <p className="text-xs font-semibold">{f.weight}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">Fallback</p>
                      <p className="text-xs font-semibold">{f.fallback}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Web-safe note */}
          <Card className="border-border/60 bg-secondary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Link2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Custom web fonts in email</span> — not all email clients support custom fonts. Always set a web-safe fallback. Google Fonts work in Gmail and Apple Mail but fall back in Outlook.
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
