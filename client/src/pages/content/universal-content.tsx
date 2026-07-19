import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Plus, Search, Eye, Copy, Pencil, Trash2,
  LayoutTemplate, AlignLeft, Image, Link2, Mail, FileText
} from 'lucide-react';

type BlockType = 'header' | 'footer' | 'signature' | 'banner' | 'cta' | 'text';

const blocks: { id: number; name: string; type: BlockType; desc: string; uses: number; updatedAt: string }[] = [
  { id: 1, name: 'Standard Email Header', type: 'header', desc: 'Logo + nav links', uses: 48, updatedAt: '2 days ago' },
  { id: 2, name: 'Legal Footer', type: 'footer', desc: 'Unsubscribe · address · policy links', uses: 62, updatedAt: '5 days ago' },
  { id: 3, name: 'John Doe Signature', type: 'signature', desc: 'Name, title, phone, social links', uses: 31, updatedAt: '1 week ago' },
  { id: 4, name: 'Promo Banner – 20% Off', type: 'banner', desc: 'Countdown + CTA strip', uses: 19, updatedAt: '3 days ago' },
  { id: 5, name: 'Primary CTA Button', type: 'cta', desc: 'Black pill button, customisable label', uses: 74, updatedAt: 'Today' },
  { id: 6, name: 'Product Feature Row', type: 'text', desc: '2-col icon + copy layout', uses: 12, updatedAt: '2 weeks ago' },
  { id: 7, name: 'Minimal Footer', type: 'footer', desc: 'One-line unsubscribe only', uses: 29, updatedAt: '1 week ago' },
  { id: 8, name: 'Holiday Banner', type: 'banner', desc: 'Seasonal header image block', uses: 8, updatedAt: '3 weeks ago' },
];

const typeConfig: Record<BlockType, { icon: React.ElementType; color: string; label: string }> = {
  header:    { icon: LayoutTemplate, color: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',     label: 'Header'    },
  footer:    { icon: AlignLeft,      color: 'bg-secondary text-muted-foreground border-border',                                                           label: 'Footer'    },
  signature: { icon: Mail,           color: 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900', label: 'Signature' },
  banner:    { icon: Image,          color: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-900',                      label: 'Banner'    },
  cta:       { icon: Link2,          color: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-900',            label: 'CTA'       },
  text:      { icon: FileText,       color: 'bg-secondary text-muted-foreground border-border',                                                           label: 'Text'      },
};

// Mini visual previews per type
function BlockPreview({ type }: { type: BlockType }) {
  if (type === 'header') return (
    <div className="w-full h-full flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded bg-foreground/20" />
        <div className="flex gap-1.5">{[1,2,3].map(i => <div key={i} className="w-8 h-2 rounded-full bg-muted" />)}</div>
      </div>
      <div className="w-full h-px bg-border mt-1" />
    </div>
  );
  if (type === 'footer') return (
    <div className="w-full h-full flex flex-col justify-end gap-1.5 p-3">
      <div className="w-full h-px bg-border" />
      <div className="flex justify-center gap-2">{[1,2,3].map(i => <div key={i} className="w-10 h-1.5 rounded-full bg-muted" />)}</div>
      <div className="w-1/2 h-1.5 rounded-full bg-muted mx-auto" />
    </div>
  );
  if (type === 'signature') return (
    <div className="w-full h-full flex items-center gap-3 p-3">
      <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
      <div className="space-y-1.5 flex-1">
        <div className="w-3/4 h-2 rounded-full bg-muted" />
        <div className="w-1/2 h-1.5 rounded-full bg-muted" />
        <div className="w-2/3 h-1.5 rounded-full bg-muted" />
      </div>
    </div>
  );
  if (type === 'banner') return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3 bg-foreground/5 rounded-sm mx-2 my-2">
      <div className="w-2/3 h-3 rounded-full bg-foreground/30" />
      <div className="w-1/2 h-2 rounded-full bg-muted" />
      <div className="w-20 h-5 rounded-full bg-foreground/20 mt-1" />
    </div>
  );
  if (type === 'cta') return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-28 h-8 rounded-lg bg-foreground/80 flex items-center justify-center">
        <div className="w-16 h-2 rounded-full bg-background/60" />
      </div>
    </div>
  );
  return (
    <div className="w-full h-full flex flex-col gap-2 p-3 justify-center">
      {[1,2,3].map(i => <div key={i} className={`h-1.5 rounded-full bg-muted ${i === 3 ? 'w-2/3' : 'w-full'}`} />)}
    </div>
  );
}

export default function UniversalContent() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const visible = blocks.filter(b =>
    (filter === 'All' || b.type === filter.toLowerCase()) &&
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Universal Content</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Reusable blocks — headers, footers, signatures — shared across all templates.</p>
        </div>
        <Button size="sm" className="h-8 text-xs self-start sm:self-auto">
          <Plus className="w-3.5 h-3.5 mr-1.5" />New Block
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Blocks', value: blocks.length.toString(),                               bg: 'bg-blue-50 dark:bg-blue-950/30',   border: 'border-blue-200 dark:border-blue-800',   labelCls: 'text-blue-600 dark:text-blue-400',   valueCls: 'text-blue-900 dark:text-blue-200'   },
          { label: 'Headers',      value: blocks.filter(b => b.type === 'header').length.toString(), bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800', labelCls: 'text-violet-600 dark:text-violet-400', valueCls: 'text-violet-900 dark:text-violet-200' },
          { label: 'Footers',      value: blocks.filter(b => b.type === 'footer').length.toString(), bg: 'bg-amber-50 dark:bg-amber-950/30',  border: 'border-amber-200 dark:border-amber-800',  labelCls: 'text-amber-600 dark:text-amber-400',  valueCls: 'text-amber-900 dark:text-amber-200'  },
          { label: 'Most Used',    value: 'Primary CTA',                                          bg: 'bg-card',                             border: 'border-border/60',                          labelCls: 'text-muted-foreground',                  valueCls: 'text-foreground'                        },
        ].map(({ label, value, bg, border, labelCls, valueCls }) => (
          <Card key={label} className={`border ${bg} ${border}`}>
            <CardContent className="p-4">
              <p className={`text-xs font-medium ${labelCls}`}>{label}</p>
              <p className={`text-lg font-bold mt-1 ${valueCls}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input className="pl-8 h-8 text-xs bg-background w-52" placeholder="Search blocks..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Tabs defaultValue="All" onValueChange={setFilter}>
            <TabsList className="bg-secondary/50 h-8 p-0.5">
              {['All', 'header', 'footer', 'signature', 'banner', 'cta', 'text'].map(t => (
                <TabsTrigger key={t} value={t} className="text-xs h-7 px-3 capitalize">{t}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visible.map(block => {
          const tc = typeConfig[block.type];
          const Icon = tc.icon;
          return (
            <motion.div
              layout
              key={block.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="border-border/60 overflow-hidden hover:border-border hover:shadow-sm transition-all group cursor-pointer">
                {/* Preview area */}
                <div className="h-28 bg-secondary/20 border-b border-border/60 relative overflow-hidden">
                  <BlockPreview type={block.type} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <Button size="sm" variant="secondary" className="h-7 text-xs shadow-sm"><Eye className="w-3 h-3 mr-1" />Preview</Button>
                    <Button size="sm" variant="secondary" className="h-7 text-xs shadow-sm"><Pencil className="w-3 h-3 mr-1" />Edit</Button>
                  </div>
                </div>

                {/* Info */}
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{block.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{block.desc}</p>
                    </div>
                    <Badge variant="outline" className={`text-[9px] px-1.5 shrink-0 flex items-center gap-0.5 ${tc.color}`}>
                      <Icon className="w-2.5 h-2.5" />{tc.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span>Used {block.uses}×</span>
                      <span>{block.updatedAt}</span>
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
                      <button className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-muted-foreground hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {/* Add new block card */}
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button className="w-full h-full min-h-[172px] rounded-xl border-2 border-dashed border-border/60 hover:border-foreground/30 hover:bg-secondary/20 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground group">
            <div className="w-8 h-8 rounded-lg bg-secondary group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">New Block</span>
          </button>
        </motion.div>
      </motion.div>

      {visible.length === 0 && (
        <div className="text-center py-14 text-sm text-muted-foreground">
          No blocks match your search.
        </div>
      )}
    </div>
  );
}
