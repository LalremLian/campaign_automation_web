import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Settings2, Users, GitBranch, Megaphone,
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  Mail, MessageSquare, Sparkles, ArrowRight, X,
  Zap, ShieldCheck, BarChart2, Package,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

// ─── Progress ─────────────────────────────────────────────────
function ProgressRing({ value, max }: { value: number; max: number }) {
  const pct = value / max;
  const r = 16, c = 2 * Math.PI * r;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r={r} fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
      <circle cx="20" cy="20" r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="3"
        strokeDasharray={`${pct * c} ${c}`} strokeLinecap="round"
        transform="rotate(-90 20 20)" className="transition-all duration-500" />
      <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">{value}/{max}</text>
    </svg>
  );
}

// ─── Section card ─────────────────────────────────────────────
function SectionCard({ icon: Icon, title, description, completed, total, children }: {
  icon: React.ElementType; title: string; description: string; completed: number; total: number; children: React.ReactNode;
}) {
  const done = completed === total;
  return (
    <div className={cn('rounded-xl border overflow-hidden transition-all', done ? 'border-emerald-200 dark:border-emerald-900' : 'border-border')}>
      <div className={cn('flex flex-col sm:flex-row', done ? 'bg-emerald-50/30 dark:bg-emerald-950/10' : 'bg-card')}>
        <div className="sm:w-60 shrink-0 p-5 sm:border-r border-b sm:border-b-0 border-border/60 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', done ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-secondary')}>
              <Icon className={cn('w-4 h-4', done ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground')} />
            </div>
            <span className="text-sm font-semibold">{title}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          <div className="flex items-center gap-2 mt-auto pt-1">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full transition-all duration-500', done ? 'bg-emerald-500' : 'bg-foreground')}
                style={{ width: `${(completed / total) * 100}%` }} />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground shrink-0">{completed}/{total}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

// ─── Task row ─────────────────────────────────────────────────
function TaskRow({ done, label, rightSlot, expanded, onToggle, onCheck, expandedContent }: {
  done?: boolean; label: string; rightSlot?: React.ReactNode;
  expanded?: boolean; onToggle?: () => void; onCheck?: () => void; expandedContent?: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/50 last:border-0">
      <div className={cn('flex items-center gap-3 px-4 py-3', onToggle && 'cursor-pointer')} onClick={onToggle}>
        <button className="shrink-0" onClick={e => { e.stopPropagation(); onCheck?.(); }}>
          {done
            ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            : <Circle className="h-5 w-5 text-muted-foreground/40" strokeWidth={1.5} />}
        </button>
        <span className={cn('text-sm flex-1', done ? 'text-muted-foreground line-through' : 'font-medium')}>{label}</span>
        <div className="flex items-center gap-2 shrink-0">{rightSlot}</div>
        {onToggle && (
          <span className="ml-1 text-muted-foreground">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        )}
      </div>
      <AnimatePresence initial={false}>
        {expanded && expandedContent && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden bg-secondary/20 border-t border-border/50">
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────
export default function GetStarted() {
  const [, setLocation] = useLocation();
  const [done, setDone] = useState<Set<string>>(new Set(['marketing-channels']));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const toggle = (k: string) => setExpanded(p => p === k ? null : k);
  const check = (k: string) => setDone(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const isDone = (k: string) => done.has(k);

  const totalSteps = 7;
  const completedSteps = done.size;

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Setup Guide</p>
            <h1 className="text-2xl font-bold tracking-tight">Let's get you set up, John </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
              Follow these steps to configure MarketFlow and start seeing results from your marketing.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <ProgressRing value={completedSteps} max={totalSteps} />
            <div>
              <p className="text-sm font-semibold">{completedSteps} of {totalSteps} done</p>
              <p className="text-xs text-muted-foreground">
                {totalSteps - completedSteps > 0 ? `${totalSteps - completedSteps} remaining` : 'All complete!'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick wins strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Zap, label: 'Connect store', sub: 'Shopify, WooCommerce', done: isDone('business-tools') },
            { icon: Users, label: 'Import contacts', sub: 'CSV or integration', done: false },
            { icon: Mail, label: 'Send first email', sub: 'Use a template', done: isDone('marketing-channels') },
            { icon: BarChart2, label: 'View analytics', sub: 'Track revenue', done: false },
          ].map(({ icon: Icon, label, sub, done: d }) => (
            <div key={label} className={cn('rounded-xl border p-3.5 flex items-center gap-3 cursor-pointer hover:shadow-sm transition-all',
              d ? 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-900 dark:bg-emerald-950/10' : 'border-border bg-card hover:border-foreground/20')}>
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', d ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-secondary')}>
                {d ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                   : <Icon className="w-4 h-4 text-foreground" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{label}</p>
                <p className="text-[10px] text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="space-y-4">

          {/* ── Section 1: Account setup ── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <SectionCard icon={Settings2} title="Account setup" description="Connect your store, confirm channels, and set your brand identity." completed={[isDone('business-tools'), isDone('marketing-channels'), isDone('branding')].filter(Boolean).length} total={3}>
              <TaskRow done={isDone('marketing-channels')} label="Confirm marketing channels"
                onToggle={() => toggle('channels')} expanded={expanded === 'channels'}
                onCheck={() => check('marketing-channels')}
                rightSlot={<div className="flex gap-1"><Mail className="w-3.5 h-3.5 text-muted-foreground" /><MessageSquare className="w-3.5 h-3.5 text-muted-foreground/50" /></div>}
                expandedContent={<div className="p-4 text-xs text-muted-foreground space-y-3">
                  <p>Email is active. Enable SMS to reach customers on their phones.</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={() => check('marketing-channels')}>Enable SMS</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skip</Button>
                  </div>
                </div>}
              />
              <TaskRow done={isDone('business-tools')} label="Connect your store"
                onToggle={() => toggle('store')} expanded={expanded === 'store'}
                onCheck={() => check('business-tools')}
                rightSlot={<Button size="sm" className="h-7 text-xs" onClick={e => { e.stopPropagation(); check('business-tools'); }}>Connect</Button>}
                expandedContent={<div className="p-4 text-xs text-muted-foreground space-y-3">
                  <p>Connect Shopify or WooCommerce to sync products, orders, and enable revenue attribution.</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={() => { check('business-tools'); setLocation('/integrations'); }}>Connect Shopify</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Connect WooCommerce</Button>
                  </div>
                </div>}
              />
              <TaskRow done={isDone('branding')} label="Confirm brand settings"
                onToggle={() => toggle('brand')} expanded={expanded === 'brand'}
                onCheck={() => check('branding')}
                rightSlot={<Button size="sm" variant="outline" className="h-7 text-xs" onClick={e => { e.stopPropagation(); check('branding'); }}>Review</Button>}
                expandedContent={<div className="p-4 text-xs text-muted-foreground space-y-3">
                  <p>Set your logo, brand colours, and sender name so every email looks on-brand.</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={() => { check('branding'); setLocation('/content/media-brand'); }}>Open Brand Settings</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skip</Button>
                  </div>
                </div>}
              />
            </SectionCard>
          </motion.div>

          {/* ── Section 2: Grow audience ── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SectionCard icon={Users} title="Grow your audience" description="Build your subscriber base with signup forms and list imports." completed={[isDone('signup-form'), isDone('import-contacts')].filter(Boolean).length} total={2}>
              <TaskRow done={isDone('signup-form')} label="Create a signup form"
                onToggle={() => toggle('form')} expanded={expanded === 'form'}
                onCheck={() => check('signup-form')}
                rightSlot={<Badge className="text-[10px] bg-blue-50 text-blue-700 border-0">Suggested</Badge>}
                expandedContent={<div className="p-4 text-xs text-muted-foreground space-y-3">
                  <p>A popup or inline form collects email and SMS consent. Drive subscribers from your website automatically.</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={() => { check('signup-form'); setLocation('/segments'); }}>Create Form</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skip</Button>
                  </div>
                </div>}
              />
              <TaskRow done={isDone('import-contacts')} label="Import existing contacts"
                onToggle={() => toggle('import')} expanded={expanded === 'import'}
                onCheck={() => check('import-contacts')}
                rightSlot={<Badge className="text-[10px] bg-blue-50 text-blue-700 border-0">Suggested</Badge>}
                expandedContent={<div className="p-4 text-xs text-muted-foreground space-y-3">
                  <p>Upload a CSV or sync contacts from your ESP, CRM, or ecommerce platform.</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={() => { check('import-contacts'); setLocation('/customers'); }}>Import CSV</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skip</Button>
                  </div>
                </div>}
              />
            </SectionCard>
          </motion.div>

          {/* ── Section 3: Flows ── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <SectionCard icon={GitBranch} title="Automate with flows" description="Set up triggered messages that run automatically for every customer." completed={[isDone('welcome-flow'), isDone('cart-flow')].filter(Boolean).length} total={2}>
              {[
                { key: 'welcome-flow', label: 'Welcome Series', desc: 'Greet new subscribers and introduce your brand.', icon: Mail, flow: 'Added to List', exp: 'welcome' },
                { key: 'cart-flow',   label: 'Abandoned Cart',  desc: 'Recover lost revenue from shoppers who left without buying.', icon: Package, flow: 'Checkout Started', exp: 'cart' },
              ].map(({ key, label, desc, icon: Icon, flow, exp }) => (
                <TaskRow key={key} done={isDone(key)} label={label}
                  onToggle={() => toggle(exp)} expanded={expanded === exp}
                  onCheck={() => check(key)}
                  rightSlot={<Badge className="text-[10px] bg-blue-50 text-blue-700 border-0"><Sparkles className="w-2.5 h-2.5 mr-0.5" />Suggested</Badge>}
                  expandedContent={<div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-foreground" /></div>
                      <div>
                        <p className="text-xs font-semibold">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Trigger: <span className="font-medium text-foreground">{flow}</span></p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 text-xs" onClick={() => { check(key); setLocation('/automations'); }}>Set Up Flow</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">Preview</Button>
                    </div>
                  </div>}
                />
              ))}
            </SectionCard>
          </motion.div>

          {/* ── Section 4: Campaign ── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SectionCard icon={Megaphone} title="Send your first campaign" description="Broadcast a one-off message to your audience using a template." completed={isDone('first-campaign') ? 1 : 0} total={1}>
              <div className="p-5">
                <AnimatePresence>
                  {!dismissed && (
                    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      className="flex items-start gap-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-4 mb-4">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Get personalised campaign recommendations</p>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">Complete your brand settings to unlock AI-generated campaigns tailored to your audience.</p>
                      </div>
                      <button onClick={() => setDismissed(true)} className="text-blue-400 hover:text-blue-600 shrink-0"><X className="w-4 h-4" /></button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Ready to broadcast?</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Use a pre-built template to send your first email in minutes.</p>
                  </div>
                  <Button className="h-8 text-xs shrink-0" onClick={() => { check('first-campaign'); setLocation('/campaigns/create'); }}>
                    Create Campaign <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </SectionCard>
          </motion.div>

          {/* Completion banner */}
          <AnimatePresence>
            {completedSteps === totalSteps && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">You're all set up! 🎉</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">MarketFlow is fully configured. Head to your dashboard to track performance.</p>
                </div>
                <Button size="sm" className="h-8 text-xs shrink-0" onClick={() => setLocation('/home')}>
                  Go to Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
