import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BarChart2, Zap, Target, Layers, ArrowUpRight, Check, Command, Cpu, GitBranch, Database, Shield } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
};

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-foreground selection:text-background">
      
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-difference bg-noise"></div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-4 h-4 bg-foreground" />
            Campaign
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#resources" className="hover:text-foreground transition-colors">Resources</a>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/login" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link href="/login" className="px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-2">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-border/60 bg-muted/30 text-xs font-mono font-medium tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
              SYSTEM_READY: V2.4 RELEASED
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.95] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Precision automation<br />
            <span className="text-muted-foreground">for ambitious brands.</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            The control center where data, audiences, and logic converge. 
            Send smarter email, SMS, and flows without the guesswork. 
            Measure everything. Leave nothing to chance.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2">
              Start building flows <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#platform" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border hover:bg-muted/50 transition-colors font-medium flex items-center justify-center">
              Request calibration
            </a>
          </motion.div>
        </div>

        {/* HERO UI MOCKUP */}
        <motion.div 
          className="mt-24 max-w-[1400px] mx-auto relative z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[16/9] md:aspect-[21/9] bg-card border border-border/80 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="h-10 border-b border-border/50 flex items-center px-4 gap-2 bg-muted/20">
              <div className="w-3 h-3 rounded-full border border-border" />
              <div className="w-3 h-3 rounded-full border border-border" />
              <div className="w-3 h-3 rounded-full border border-border" />
              <div className="ml-4 h-4 w-64 bg-muted/50 rounded-[1px]" />
            </div>
            <div className="flex-1 flex p-6 gap-6 relative">
              {/* Sidebar */}
              <div className="w-48 hidden md:flex flex-col gap-4">
                <div className="h-4 w-24 bg-muted mb-4" />
                {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-full bg-muted/30 border border-border/50" />)}
              </div>
              {/* Main content - Flow Builder Mock */}
              <div className="flex-1 border border-border/50 bg-background relative overflow-hidden flex items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px]">
                
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="px-6 py-3 bg-foreground text-background font-mono text-xs shadow-lg relative z-10">
                    TRIGGER: CHECKOUT_ABANDONED
                  </div>
                  <div className="w-px h-12 bg-foreground" />
                  <div className="px-6 py-3 bg-card border border-border font-mono text-xs font-medium shadow-md">
                    DELAY: 2 HOURS
                  </div>
                  <div className="w-px h-12 bg-border relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-border bg-background flex items-center justify-center text-[10px]">
                      +
                    </div>
                  </div>
                  <div className="flex gap-16 relative">
                    <div className="absolute -top-px left-1/4 right-1/4 h-px bg-border" />
                    <div className="flex flex-col items-center mt-6">
                      <div className="w-px h-6 bg-border" />
                      <div className="px-4 py-2 border border-border bg-muted/20 font-mono text-[10px]">
                        IF: CART_VALUE {'>'} $100
                      </div>
                      <div className="w-px h-6 bg-border" />
                      <div className="px-6 py-3 bg-card border border-border shadow-md text-xs font-medium">
                        SEND_EMAIL: HIGH_INTENT
                      </div>
                    </div>
                    <div className="flex flex-col items-center mt-6">
                      <div className="w-px h-6 bg-border" />
                      <div className="px-4 py-2 border border-border bg-muted/20 font-mono text-[10px]">
                        ELSE
                      </div>
                      <div className="w-px h-6 bg-border" />
                      <div className="px-6 py-3 bg-card border border-border shadow-md text-xs font-medium">
                        SEND_SMS: STANDARD_REMINDER
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              {/* Right Panel */}
              <div className="w-64 hidden lg:flex flex-col gap-6">
                <div className="border border-border/50 p-4">
                  <div className="text-xs font-mono text-muted-foreground mb-4">NODE_METRICS</div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Delivery Rate</span>
                        <span className="font-mono">99.8%</span>
                      </div>
                      <div className="h-1 w-full bg-muted/30"><div className="h-full w-[99.8%] bg-foreground" /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Conversion</span>
                        <span className="font-mono">14.2%</span>
                      </div>
                      <div className="h-1 w-full bg-muted/30"><div className="h-full w-[14.2%] bg-foreground" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* LOGOS */}
      <section className="py-16 border-y border-border/50 bg-muted/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-center text-sm font-mono text-muted-foreground mb-8">TRUSTED BY EXACT MARKETERS AT</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            {["Acme Corp", "Nexus", "Quantum", "Stark", "Oscorp"].map((logo, i) => (
              <div key={i} className="text-xl md:text-2xl font-display font-bold tracking-tight">
                {logo.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE 1: DATA */}
      <section className="py-32 px-6 relative" id="platform">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView">
              <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center mb-8">
                <Database className="w-5 h-5 text-foreground" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6">
                The absolute source of truth.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Campaign ingests billions of events in real-time. No sync delays, no data silos. 
                Every click, view, purchase, and predictive score is immediately actionable in your segments.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time event processing architecture",
                  "Unrestricted historical data retention",
                  "Computed properties and predictive LTV",
                  "Instant sub-second segment evaluation"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                    <Check className="w-5 h-5 text-foreground shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              variants={fadeIn} initial="initial" whileInView="whileInView"
              className="bg-card border border-border p-8 relative"
            >
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-foreground flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3 text-background" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="font-mono text-xs text-muted-foreground">AUDIENCE_BUILDER</div>
                  <div className="font-mono text-xs">MATCH: 1.2M USERS</div>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-4 border border-border bg-muted/20">
                    WHERE <span className="font-bold">event</span> = 'checkout_completed'
                  </div>
                  <div className="pl-6 border-l border-border relative">
                    <div className="absolute top-1/2 -left-[5px] w-[9px] h-px bg-border" />
                    <div className="p-4 border border-border bg-muted/20">
                      AND <span className="font-bold">timestamp</span> {'>='} now() - 30d
                    </div>
                  </div>
                  <div className="pl-6 border-l border-border relative">
                    <div className="absolute top-1/2 -left-[5px] w-[9px] h-px bg-border" />
                    <div className="p-4 border border-border bg-muted/20">
                      AND <span className="font-bold">user.ltv_tier</span> IN ('premium', 'vip')
                    </div>
                  </div>
                  <div className="p-4 bg-foreground text-background font-bold text-center mt-6">
                    CALCULATE SEGMENT
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURE 2: AUTOMATION */}
      <section className="py-32 px-6 bg-muted/10 border-y border-border/50" id="features">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row">
            
            <motion.div 
              variants={fadeIn} initial="initial" whileInView="whileInView"
              className="bg-card border border-border p-8 font-mono text-xs relative overflow-hidden"
            >
               {/* Decorative background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="text-muted-foreground mb-6">{"// FLOW_LOGIC.TSX"}</div>
                <div><span className="text-muted-foreground">import</span> {'{'} Flow, Email, SMS, Delay, Split {'}'} <span className="text-muted-foreground">from</span> '@campaign/core';</div>
                <br />
                <div><span className="text-foreground font-bold">const</span> WelcomeSeries = new Flow({'{'}</div>
                <div className="pl-4">trigger: <span className="text-foreground font-bold">'user_signed_up'</span>,</div>
                <div className="pl-4">nodes: [</div>
                <div className="pl-8">new Email('welcome_1', {'{'} template: 't_892a' {'}'}),</div>
                <div className="pl-8">new Delay('2_days'),</div>
                <div className="pl-8">new Split('has_purchased', {'{'}</div>
                <div className="pl-12">condition: user = {'>'} user.total_orders {'>'} 0,</div>
                <div className="pl-12">onTrue: [new Email('thank_you')],</div>
                <div className="pl-12">onFalse: [</div>
                <div className="pl-16">new SMS('promo_code_reminder'),</div>
                <div className="pl-16">new Delay('1_day'),</div>
                <div className="pl-16">new Email('final_offer')</div>
                <div className="pl-12">]</div>
                <div className="pl-8">{'}'})</div>
                <div className="pl-4">]</div>
                <div>{'}'});</div>
                <br />
                <div>WelcomeSeries.deploy();</div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView">
              <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center mb-8">
                <GitBranch className="w-5 h-5 text-foreground" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6">
                Logic without limits.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Build sophisticated journeys that adapt to every user action. 
                A/B test entire branches, utilize dynamic content, and seamlessly switch between email and SMS based on channel preference.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-display font-bold mb-2">Omnichannel Routing</h4>
                  <p className="text-sm text-muted-foreground">Deliver the right message on the channel with the highest likelihood of conversion.</p>
                </div>
                <div>
                  <h4 className="font-display font-bold mb-2">Branching Logic</h4>
                  <p className="text-sm text-muted-foreground">Split paths based on real-time event data, predictive attributes, or past behavior.</p>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* METRICS / STATS */}
      <section className="py-32 px-6" id="pricing">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-20"
            variants={fadeIn} initial="initial" whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6">
              Measure everything.
            </h2>
            <p className="text-lg text-muted-foreground">
              Vague metrics are a liability. Campaign provides exact attribution, incrementality testing, and cohort analysis out of the box.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={stagger} initial="initial" whileInView="whileInView"
          >
            {[
              { label: "ATTRIBUTION WINDOW", value: "Custom", icon: Target },
              { label: "QUERY LATENCY", value: "< 50ms", icon: Zap },
              { label: "DATA RETENTION", value: "Infinite", icon: Layers }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="border border-border p-8 hover:bg-muted/10 transition-colors">
                <stat.icon className="w-6 h-6 mb-8 text-muted-foreground" />
                <div className="text-4xl font-display font-bold tracking-tighter mb-2">{stat.value}</div>
                <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 px-6 bg-foreground text-background" id="resources">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView">
            <QuoteIcon className="w-12 h-12 mx-auto mb-12 opacity-50" />
            <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight mb-12">
              "We migrated from Klaviyo and never looked back. Campaign gives our growth team the precision of an engineering tool, without writing a single line of code. It is exactly what modern retention demands."
            </h3>
            <div className="flex items-center justify-center gap-4 text-left">
              <div className="w-12 h-12 bg-background/20 rounded-none border border-background/30" />
              <div>
                <div className="font-bold">Sarah Jenkins</div>
                <div className="text-sm font-mono opacity-70">VP GROWTH, NEURAL ESSENTIALS</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div className="w-[800px] h-[800px] border border-foreground rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[600px] h-[600px] border border-foreground rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-[400px] h-[400px] border border-foreground rounded-full animate-[spin_20s_linear_infinite]" />
        </div>
        
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.h2 
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to calibrate?
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Deploy your first flow in minutes. Connect your data warehouse, and let Campaign handle the logic.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a href="#" className="inline-flex px-10 py-5 bg-foreground text-background text-lg font-medium hover:bg-foreground/90 transition-colors items-center gap-3">
              Initialize Campaign <Command className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-muted/20 py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 text-sm">
          <div className="col-span-2">
            <div className="font-display font-bold text-xl tracking-tight flex items-center gap-2 mb-6">
              <div className="w-4 h-4 bg-foreground" />
              Campaign
            </div>
            <p className="text-muted-foreground max-w-xs">
              Precision automation for ambitious brands. Measure everything. Leave nothing to chance.
            </p>
          </div>
          <div>
            <h5 className="font-mono text-xs font-bold text-muted-foreground mb-4">PLATFORM</h5>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Email Automation</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">SMS Marketing</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Audience Builder</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Predictive Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-xs font-bold text-muted-foreground mb-4">DEVELOPERS</h5>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Status: Operational</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-xs font-bold text-muted-foreground mb-4">COMPANY</h5>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Customers</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-muted-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <div>© {new Date().getFullYear()} Campaign Systems Inc.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}