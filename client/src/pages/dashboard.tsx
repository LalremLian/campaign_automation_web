import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpRight, ArrowUp, Wand2, X, Calendar,
  ChevronDown, TrendingUp, Mail, Zap, Users,
  Megaphone, BarChart2, ArrowRight, Sparkles, Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useLocation } from 'wouter';

// ─── Plan Recommendations Modal ───────────────────────────────────────────────

const plans = [
  {
    id: 'email-sms',
    name: 'Email + mobile messages',
    badge: 'Recommended',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    price: '$35',
    desc: 'Take your marketing further by reaching customers through both email and mobile messaging.',
    highlight: true,
    features: [
      { text: '500 active profiles', ok: true },
      { text: '5,000 monthly email sends', ok: true },
      { text: '1,250 mobile messaging credits per month', ok: true },
      { text: '350+ built-in integrations', ok: true },
      { text: 'Built-in reporting dashboards', ok: true },
      { text: 'Email support', ok: true },
      { text: 'Generative AI to create content fast', ok: true },
      { text: 'Klaviyo logo removed from emails', ok: true },
      { text: 'Predictive analytics', ok: true },
      { text: 'Multi-channel segmentation', ok: true },
      { text: 'Multi-channel attribution', ok: true },
    ],
    cta: 'Select Plan',
    ctaVariant: 'default' as const,
  },
  {
    id: 'email',
    name: 'Email',
    badge: null,
    badgeColor: '',
    price: '$20',
    desc: 'Grow faster with smarter email marketing that personalises at scale.',
    highlight: false,
    features: [
      { text: '500 active profiles', ok: true },
      { text: '5,000 monthly email sends', ok: true },
      { text: '417 mobile messaging credits per month', ok: true },
      { text: '350+ built-in integrations', ok: true },
      { text: 'Built-in reporting dashboards', ok: true },
      { text: 'Email support', ok: true },
      { text: 'Generative AI to create content fast', ok: true },
      { text: 'Klaviyo logo removed from emails', ok: true },
      { text: 'Predictive analytics', ok: true },
      { text: 'Multi-channel segmentation', ok: false },
      { text: 'Multi-channel attribution', ok: false },
    ],
    cta: 'Select Plan',
    ctaVariant: 'default' as const,
  },
  {
    id: 'free',
    name: 'Free',
    badge: 'Current plan',
    badgeColor: 'bg-secondary text-muted-foreground',
    price: '$0',
    desc: 'Perfect for getting started and trying out the MarketFlow platform.',
    highlight: false,
    features: [
      { text: '250 active profiles', ok: true },
      { text: '500 monthly email sends', ok: true },
      { text: '417 mobile messaging credits per month', ok: true },
      { text: '350+ built-in integrations', ok: true },
      { text: 'Built-in reporting dashboards', ok: true },
      { text: 'Email support (first 60 days)', ok: true },
      { text: 'Generative AI to create content fast', ok: true },
      { text: 'Klaviyo logo removed from emails', ok: false },
      { text: 'Predictive analytics', ok: false },
      { text: 'Multi-channel segmentation', ok: false },
      { text: 'Multi-channel attribution', ok: false },
    ],
    cta: 'Keep my current free plan',
    ctaVariant: 'outline' as const,
  },
];

function PlanRecommendationsModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          className="relative bg-background rounded-xl border border-border shadow-2xl w-full max-w-4xl mx-4"
          initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.2 }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
            <p className="text-xs font-medium text-muted-foreground">Plan recommendations</p>
            <button onClick={onClose}
              className="px-3 py-1 text-xs font-medium border border-border rounded-md hover:bg-secondary transition-colors">
              Exit
            </button>
          </div>

          {/* Title */}
          <div className="text-center pt-8 pb-6 px-6">
            <h2 className="text-xl font-bold tracking-tight mb-1.5">Compare plans for your business</h2>
            <p className="text-sm text-muted-foreground">Here are some suggested plans, curated to fit your brand's needs.</p>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-3 gap-4 px-6 pb-4">
            {plans.map((plan) => (
              <div key={plan.id}
                className={`rounded-xl border p-5 flex flex-col ${plan.highlight ? 'border-border shadow-md' : 'border-border/60'}`}>
                {/* Plan name + badge */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-sm font-semibold">{plan.name}</span>
                  {plan.badge && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <p className="text-[10px] text-muted-foreground">Starting at</p>
                  <div className="flex items-end gap-0.5">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground mb-1.5">/ month</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{plan.desc}</p>

                {/* Features */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Includes:</p>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2 text-[11px]">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${f.ok ? 'bg-emerald-500' : 'bg-red-400'}`}>
                          {f.ok
                            ? <Check className="w-2 h-2 text-white" />
                            : <X className="w-2 h-2 text-white" />}
                        </div>
                        <span className={f.ok ? 'text-foreground' : 'text-muted-foreground'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button variant={plan.ctaVariant} className="w-full mt-auto text-xs h-9" onClick={onClose}>
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Skip */}
          <div className="text-center py-5 border-t border-border/60">
            <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-1.5 rounded-md hover:bg-secondary">
              Skip for now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

const revenueData = [
  { day: 'Mon', rev: 4200 }, { day: 'Tue', rev: 5800 }, { day: 'Wed', rev: 4900 },
  { day: 'Thu', rev: 7200 }, { day: 'Fri', rev: 8100 }, { day: 'Sat', rev: 6400 },
  { day: 'Sun', rev: 5300 },
];

const recentActivity = [
  { icon: Mail,     label: 'Black Friday Early Access sent',    sub: '12,400 recipients · 41% open rate',  time: '2h ago',  color: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400' },
  { icon: Zap,      label: 'Abandoned Cart flow triggered',      sub: '84 sessions recovered · $3,240',     time: '4h ago',  color: 'bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400' },
  { icon: Users,    label: '420 new subscribers added',          sub: 'Via homepage popup form',            time: '6h ago',  color: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' },
  { icon: BarChart2,label: 'Weekly analytics report ready',      sub: 'Revenue up 18.4% vs last week',      time: '1d ago',  color: 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400' },
];

const quickActions = [
  { label: 'Create Campaign',   sub: 'Send a broadcast',      path: '/campaigns/create', icon: Megaphone },
  { label: 'View Analytics',    sub: 'Track performance',     path: '/analytics',        icon: BarChart2 },
  { label: 'Manage Audience',   sub: 'Browse contacts',       path: '/customers',        icon: Users },
  { label: 'Browse Templates',  sub: 'Pick a design',         path: '/templates',        icon: Mail },
];

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', borderRadius: '6px', border: '1px solid hsl(var(--border))', fontSize: 12 };

function QuickSuggestion({ text }: { text: string }) {
  return (
    <button className="px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium hover:bg-secondary hover:border-foreground/20 transition-all">
      {text}
    </button>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      // Always show plan modal after login
      setShowPlans(true);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="max-w-[920px] mx-auto py-10 px-6 space-y-8">
        <div className="space-y-4 text-center">
          <Skeleton className="h-9 w-56 mx-auto" />
          <Skeleton className="h-[130px] w-full rounded-xl" />
          <div className="flex justify-center gap-2 flex-wrap">
            {[120, 140, 130, 110].map(w => <Skeleton key={w} className="h-8 rounded-full" style={{ width: w }} />)}
          </div>
        </div>
        <Skeleton className="h-[100px] w-full rounded-xl" />
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
        <Skeleton className="h-[220px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-[920px] mx-auto py-10 px-4 sm:px-6 space-y-8">

      {/* ── Plan Recommendations Modal ── */}
      {showPlans && <PlanRecommendationsModal onClose={() => setShowPlans(false)} />}

      {/* ── Greeting + AI composer ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Good morning, John</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Your campaigns are performing well — revenue is up 24% this week.</p>
        </div>

        {/* Composer */}
        <div className="relative w-full rounded-xl border bg-card shadow-sm overflow-hidden hover:border-foreground/20 transition-colors group">
          <div className="flex items-start gap-3 p-4 pb-2">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center shrink-0 mt-0.5">
              <Wand2 className="w-3.5 h-3.5 text-background" />
            </div>
            <textarea
              rows={3}
              className="flex-1 bg-transparent text-sm border-none resize-none focus:outline-none placeholder:text-muted-foreground/50 leading-relaxed"
              placeholder="Ask MarketFlow AI — generate a campaign, audit your flows, or get recommendations..."
            />
          </div>
          <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-border/40 bg-secondary/20">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">MarketFlow AI</span>
            </div>
            <Button size="sm" className="h-7 w-7 p-0 rounded-full">
              <ArrowUp className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Quick suggestions */}
        <div className="flex flex-wrap justify-center gap-2">
          <QuickSuggestion text="What should I set up first?" />
          <QuickSuggestion text="Generate a campaign" />
          <QuickSuggestion text="Discover missing flows" />
          <QuickSuggestion text="Audit my segments" />
          <QuickSuggestion text="Summarise last week" />
        </div>
      </motion.div>

      {/* ── Promo banner ── */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }} transition={{ duration: 0.2 }}
            className="relative rounded-xl border border-blue-100 dark:border-blue-900/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-blue-950/30 dark:to-indigo-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 pr-6 sm:pr-0">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Unlock SMS to reach customers where it matters</p>
              <p className="text-xs text-blue-700/80 dark:text-blue-400 mt-0.5">SMS averages 98% open rates. Add it to your flows in minutes.</p>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs bg-white dark:bg-card border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 shrink-0">
              Enable SMS <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
            <button onClick={() => setShowPromo(false)}
              className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── KPI strip ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold">Performance overview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs bg-card">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />Last 7 days
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Revenue', value: '$48,240', delta: '+18.4%', up: true },
            { label: 'Active Customers', value: '45,231', delta: '+12.5%', up: true },
            { label: 'Email Open Rate', value: '38.4%', delta: '+2.1%', up: true },
            { label: 'Avg Conversion', value: '3.2%', delta: '+0.4%', up: true },
          ].map(({ label, value, delta, up }) => (
            <Card key={label} className="border-border/60 p-4">
              <p className="text-xs text-muted-foreground mb-2">{label}</p>
              <p className="text-xl font-bold tracking-tight">{value}</p>
              <p className={`text-xs font-medium mt-1 flex items-center gap-0.5 ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                <ArrowUpRight className="w-3 h-3" />{delta} vs prev
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* ── Revenue chart ── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-border/60">
          <div className="px-5 py-4 flex items-center justify-between border-b border-border/60">
            <div>
              <p className="text-sm font-semibold">Revenue this week</p>
              <p className="text-xs text-muted-foreground mt-0.5">Jul 7 – Jul 13, 2026</p>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-bold">$41,200</span>
              <span className="text-xs text-muted-foreground font-normal">total</span>
            </div>
          </div>
          <div className="p-4 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `$${v/1000}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="rev" stroke="hsl(var(--foreground))" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* ── Quick actions + Recent activity ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="grid sm:grid-cols-5 gap-5">
        {/* Quick actions */}
        <div className="sm:col-span-2 space-y-2">
          <p className="text-sm font-semibold mb-3">Quick actions</p>
          {quickActions.map(({ label, sub, path, icon: Icon }) => (
            <button key={label} onClick={() => setLocation(path)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card hover:border-foreground/20 hover:shadow-sm transition-all text-left group">
              <div className="w-8 h-8 rounded-lg bg-secondary group-hover:bg-foreground/10 flex items-center justify-center shrink-0 transition-colors">
                <Icon className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-[10px] text-muted-foreground">{sub}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Recent activity */}
        <div className="sm:col-span-3">
          <p className="text-sm font-semibold mb-3">Recent activity</p>
          <Card className="border-border/60 divide-y divide-border/60">
            {recentActivity.map(({ icon: Icon, label, sub, time, color }) => (
              <div key={label} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/20 transition-colors cursor-pointer">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug">{label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
              </div>
            ))}
          </Card>
          <button className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors">
            View all activity →
          </button>
        </div>
      </motion.div>

    </div>
  );
}
