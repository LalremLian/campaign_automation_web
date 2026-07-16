import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, BarChart2, Zap, Target, Layers, Check,
  GitBranch, Database, Shield, Mail, MessageSquare,
  Sparkles, TrendingUp, Users, Globe, Lock, ChevronDown,
  Star, ArrowUpRight, Play, Cpu,
} from "lucide-react";

// ─── Animation variants ───────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.08 },
};

// ─── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-background/90 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background text-sm font-bold">M</span>
          </div>
          MarketFlow
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {["Platform", "Features", "Pricing", "Customers"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link href="/login" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">Log in</Link>
          <Link href="/login" className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors flex items-center gap-1.5">
            Get started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative pt-36 pb-24 px-6 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-blue-50/60 via-violet-50/30 to-transparent dark:from-blue-950/20 dark:via-violet-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Introducing AI-powered campaign flows — now in beta
            <ArrowRight className="w-3 h-3" />
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Marketing automation<br />
          <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            that actually converts
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Send smarter email, SMS, and AI-powered flows to your customers.
          Built for ambitious brands who want revenue, not vanity metrics.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link href="/login" className="w-full sm:w-auto px-6 py-3.5 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-foreground/10">
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#platform" className="w-full sm:w-auto px-6 py-3.5 border border-border bg-card font-medium rounded-xl hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 text-foreground">
            <Play className="w-4 h-4" /> See how it works
          </a>
        </motion.div>

        <motion.p className="text-xs text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Free 14-day trial · No credit card required · Setup in 5 minutes
        </motion.p>
      </div>
    </section>
  );
}

// ─── Dashboard preview mockup ─────────────────────────────────
function DashboardMockup() {
  return (
    <motion.section
      className="px-6 pb-24"
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 overflow-hidden">
          {/* Browser chrome */}
          <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="mx-auto w-64 h-5 rounded-md bg-muted" />
          </div>
          {/* Mock content */}
          <div className="flex h-[400px] md:h-[500px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-border bg-white dark:bg-card p-3 hidden md:flex flex-col gap-1 shrink-0">
              <div className="h-7 w-28 bg-muted rounded-md mb-3" />
              {[90, 70, 80, 60, 75, 65, 50].map((w, i) => (
                <div key={i} className={`h-7 rounded-md flex items-center px-2 gap-2 ${i === 2 ? 'bg-foreground/8 border border-border' : ''}`}>
                  <div className="w-3.5 h-3.5 rounded bg-muted shrink-0" />
                  <div className={`h-2 rounded-full bg-muted`} style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            {/* Main area */}
            <div className="flex-1 p-5 bg-gray-50/50 dark:bg-background overflow-hidden">
              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Revenue", val: "$48,290", up: "+18.4%" },
                  { label: "Sent", val: "124K", up: "+6.2%" },
                  { label: "Open Rate", val: "42.1%", up: "+3.8%" },
                  { label: "Converted", val: "1,840", up: "+22.1%" },
                ].map(({ label, val, up }) => (
                  <div key={label} className="bg-white dark:bg-card rounded-xl border border-border p-3.5 shadow-sm">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">{label}</p>
                    <p className="text-lg font-bold">{val}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{up}</p>
                  </div>
                ))}
              </div>
              {/* Chart placeholder */}
              <div className="bg-white dark:bg-card rounded-xl border border-border p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-3 w-24 bg-muted rounded-full" />
                  <div className="h-5 w-20 bg-muted/60 rounded-md" />
                </div>
                <div className="flex items-end gap-1 h-28">
                  {[40, 55, 45, 70, 65, 80, 72, 90, 85, 95, 88, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm"
                      style={{ height: `${h}%`, background: i === 11 ? 'hsl(var(--foreground))' : 'hsl(var(--muted))' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ─── Logos ────────────────────────────────────────────────────
function Logos() {
  const logos = ["Acme Corp", "Nexus", "Quantum", "Stark Industries", "Oscorp", "Umbrella"];
  return (
    <section className="py-16 border-y border-border/50 bg-muted/20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-10">
          Trusted by fast-growing brands worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {logos.map((l, i) => (
            <span key={i} className="text-base md:text-lg font-bold tracking-tight text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              {l.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features grid ────────────────────────────────────────────
function Features() {
  const items = [
    { icon: GitBranch, title: "Visual Flow Builder", desc: "Drag-and-drop automation builder with conditional branches, delays, A/B splits, and multi-channel actions. No code required." },
    { icon: Sparkles,  title: "AI-Generated Content", desc: "Generate on-brand email copy, ad creatives, and SMS messages in seconds using your product catalog and customer data." },
    { icon: Database,  title: "Real-Time Segmentation", desc: "Build hyper-targeted segments from behavioral events, purchase history, predictive LTV, and custom properties instantly." },
    { icon: BarChart2, title: "Revenue Attribution", desc: "See exactly which flows and campaigns drove revenue. Multi-touch attribution with configurable windows and channel weighting." },
    { icon: Globe,     title: "Omnichannel Delivery", desc: "Reach customers where they are — email, SMS, AI voice calls, and ad retargeting, all managed from a single workflow." },
    { icon: Shield,    title: "Compliance Built-In", desc: "GDPR, CAN-SPAM, and TCPA compliant out of the box. Automated consent management, suppression lists, and audit logs." },
  ];
  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fadeUp}>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">Platform</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to grow</h2>
          <p className="text-lg text-muted-foreground">A complete marketing stack — not a patchwork of integrations. Built for teams who want results, not complexity.</p>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" {...stagger} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-80px" }}>
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-foreground/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-foreground group-hover:text-background transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Platform deep-dive ───────────────────────────────────────
function Platform() {
  return (
    <section className="py-24 px-6 bg-muted/20 border-y border-border/50" id="platform">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-5">
              <Zap className="w-3 h-3" /> Automation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Flows that run while you sleep</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-7">
              Build sophisticated customer journeys that trigger on any event — abandoned cart, product view, post-purchase, anniversary — and route each person down the perfect path automatically.
            </p>
            <ul className="space-y-3">
              {["Multi-step email + SMS sequences", "Real-time conditional branching", "A/B test entire flow branches", "Pause, resume, and re-enter logic"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                  <div className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-background" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} className="bg-card border border-border rounded-2xl p-6 shadow-lg font-mono text-xs space-y-2 leading-relaxed">
            <p className="text-muted-foreground mb-4 text-[11px] tracking-widest uppercase">Flow · Abandoned Cart</p>
            {[
              ["trigger", "checkout.abandoned"],
              ["wait",    "2 hours"],
              ["if",      "cart.value > $75"],
              ["  send",  "email: high_intent_offer"],
              ["else",    ""],
              ["  send",  "sms: quick_reminder"],
              ["wait",    "1 day"],
              ["if",      "!converted"],
              ["  send",  "email: final_offer + 10% off"],
            ].map(([k, v], i) => (
              <div key={i} className="flex gap-3">
                <span className="text-muted-foreground/50 select-none w-4 text-right shrink-0">{i + 1}</span>
                <span className={k.startsWith(' ') ? 'pl-4' : ''}>
                  <span className="text-blue-600 dark:text-blue-400">{k.trim()}</span>
                  {v && <span className="text-foreground"> {v}</span>}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1 bg-card border border-border rounded-2xl p-6 shadow-lg">
            <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase mb-4">Segment Builder</p>
            <div className="space-y-2.5 font-mono text-xs">
              {[
                { label: "event = checkout_completed", color: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-200" },
                { label: "AND timestamp >= now() − 30d", color: "bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-950/40 dark:border-violet-800 dark:text-violet-200" },
                { label: "AND user.ltv_tier IN ('premium', 'vip')", color: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200" },
              ].map(({ label, color }) => (
                <div key={label} className={`px-3 py-2.5 rounded-lg border ${color}`}>{label}</div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">1,204,391</p>
                <p className="text-[10px] text-muted-foreground">matching contacts</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4% this week
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-5">
              <Users className="w-3 h-3" /> Segmentation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Audiences that update in real time</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-7">
              Every event, purchase, and page view updates your segments instantly. Stop scheduling syncs and start messaging the right people at the exact right moment.
            </p>
            <ul className="space-y-3">
              {["Behavioral, demographic, and predictive filters", "Sub-second segment evaluation", "Computed properties & custom attributes", "Sync to Facebook, Google, and more"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                  <div className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-background" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "$2.4B+", label: "Revenue attributed", sub: "across all customers" },
    { value: "99.97%", label: "Delivery rate", sub: "industry-leading inbox placement" },
    { value: "< 50ms", label: "Segment evaluation", sub: "real-time, always fresh" },
    { value: "4,200+", label: "Brands trust us", sub: "from startups to enterprise" },
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" {...stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          {stats.map(({ value, label, sub }) => (
            <motion.div key={label} variants={fadeUp} className="text-center p-6 rounded-2xl border border-border bg-card">
              <p className="text-4xl font-bold tracking-tight mb-1">{value}</p>
              <p className="text-sm font-semibold mb-1">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────
function Pricing() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    {
      name: "Starter", price: annual ? 49 : 59, desc: "Perfect for early-stage brands getting started with automation.",
      features: ["Up to 10,000 contacts", "Email automation", "5 active flows", "Basic analytics", "Email support"],
      cta: "Start free trial", highlight: false,
    },
    {
      name: "Growth", price: annual ? 149 : 179, desc: "For growing brands that need segmentation, SMS, and AI tools.",
      features: ["Up to 50,000 contacts", "Email + SMS automation", "Unlimited flows", "AI content generation", "Revenue attribution", "Priority support"],
      cta: "Start free trial", highlight: true,
    },
    {
      name: "Scale", price: annual ? 399 : 479, desc: "For high-volume teams with advanced compliance and analytics needs.",
      features: ["Unlimited contacts", "All channels incl. AI Calls", "Custom reporting", "Dedicated IP warming", "SAML SSO", "SLA + dedicated CSM"],
      cta: "Talk to sales", highlight: false,
    },
  ];
  return (
    <section className="py-24 px-6 bg-muted/20 border-y border-border/50" id="pricing">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center max-w-xl mx-auto mb-12" {...fadeUp}>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground mb-7">All plans include a 14-day free trial. No credit card required.</p>
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-card border border-border">
            <button onClick={() => setAnnual(false)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${!annual ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${annual ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>
              Annual <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${annual ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700'}`}>−20%</span>
            </button>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map(({ name, price, desc, features, cta, highlight }) => (
            <motion.div key={name} {...fadeUp}
              className={`relative rounded-2xl border p-7 flex flex-col ${highlight ? 'border-foreground bg-foreground text-background shadow-2xl shadow-foreground/20 scale-[1.02]' : 'border-border bg-card'}`}>
              {highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full tracking-wide">MOST POPULAR</div>}
              <div className="mb-6">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${highlight ? 'text-background/60' : 'text-muted-foreground'}`}>{name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold">${price}</span>
                  <span className={`text-sm mb-1.5 ${highlight ? 'text-background/60' : 'text-muted-foreground'}`}>/mo</span>
                </div>
                <p className={`text-sm leading-relaxed ${highlight ? 'text-background/70' : 'text-muted-foreground'}`}>{desc}</p>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${highlight ? 'bg-background/20' : 'bg-muted'}`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all ${highlight ? 'bg-background text-foreground hover:bg-background/90' : 'bg-foreground text-background hover:bg-foreground/90'}`}>
                {cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: "Sarah Jenkins", role: "VP Growth · Neural Essentials", body: "We migrated from Klaviyo and never looked back. MarketFlow gives our team the precision of an engineering tool without writing a single line of code.", stars: 5 },
    { name: "Marcus Reyes", role: "Head of CRM · Luxe Brands", body: "The AI flow builder cut our setup time by 70%. What used to take our team a week now takes an afternoon. Revenue attribution is finally accurate.", stars: 5 },
    { name: "Priya Sharma", role: "Marketing Director · Bloom Beauty", body: "Real-time segmentation changed everything for us. We can target 'bought X but not Y in 30 days' instantly. Our repurchase rate is up 34%.", stars: 5 },
  ];
  return (
    <section className="py-24 px-6" id="customers">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-14" {...fadeUp}>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold tracking-tight">Loved by growth teams</h2>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-5" {...stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          {testimonials.map(({ name, role, body, stars }) => (
            <motion.div key={name} variants={fadeUp} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{body}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-semibold">{name}</p>
                  <p className="text-[10px] text-muted-foreground">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...fadeUp}
          className="relative bg-foreground text-background rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border border-background/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-background/10 pointer-events-none" />

          <p className="text-xs font-semibold tracking-widest uppercase text-background/50 mb-4">Get started today</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Ready to grow faster?
          </h2>
          <p className="text-background/70 text-lg mb-10 max-w-lg mx-auto">
            Join 4,200+ brands using MarketFlow to automate their marketing and drive real revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login" className="px-7 py-3.5 bg-background text-foreground rounded-xl font-semibold hover:bg-background/90 transition-colors flex items-center gap-2">
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#pricing" className="px-7 py-3.5 border border-background/30 rounded-xl font-medium hover:bg-background/10 transition-colors text-background">
              View pricing
            </a>
          </div>
          <p className="text-background/40 text-xs mt-6">14-day free trial · No credit card · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight mb-4">
              <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background text-sm font-bold">M</span>
              </div>
              MarketFlow
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Precision marketing automation for ambitious brands. Measure everything. Leave nothing to chance.
            </p>
            <div className="flex gap-3 mt-5">
              {["Twitter", "LinkedIn", "GitHub"].map(s => (
                <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">{s}</a>
              ))}
            </div>
          </div>
          {[
            { heading: "Platform", links: ["Email Automation", "SMS Marketing", "AI Flows", "Audience Builder", "Analytics"] },
            { heading: "Resources", links: ["Documentation", "API Reference", "Status", "Changelog", "Blog"] },
            { heading: "Company",  links: ["About", "Customers", "Careers", "Privacy", "Terms"] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{heading}</h5>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l}><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            Developed by{' '}
            <a
              href="https://www.linkedin.com/company/lazy-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline transition-colors"
            >
              Lazy Developer
            </a>
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root export ──────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <DashboardMockup />
      <Logos />
      <Features />
      <Platform />
      <Stats />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
