import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Settings2,
  Users,
  GitBranch,
  Megaphone,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// ─── shared primitives ────────────────────────────────────────────

function SectionCard({
  icon: Icon,
  title,
  description,
  badge,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* left description panel */}
      <div className="sm:w-56 shrink-0 p-5 sm:border-r border-b sm:border-b-0 border-gray-100">
        <div className="flex items-center gap-2 mb-1.5">
          <Icon className="h-4 w-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{description}</p>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-medium">
          {badge}
        </span>
      </div>

      {/* right task panel */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function TaskRow({
  done,
  label,
  rightSlot,
  expanded,
  onToggle,
  expandedContent,
}: {
  done?: boolean;
  label: string;
  rightSlot?: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
  expandedContent?: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3',
          onToggle && 'cursor-pointer',
        )}
        onClick={onToggle}
      >
        {/* status icon */}
        <button
          className="shrink-0"
          onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
        >
          {done ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-300" strokeWidth={1.5} />
          )}
        </button>

        <span className={cn('text-sm flex-1 truncate', done ? 'text-muted-foreground line-through' : 'text-foreground font-medium')}>
          {label}
        </span>

        <div className="flex items-center gap-2 shrink-0">{rightSlot}</div>

        {onToggle && (
          <button
            className="ml-1 text-muted-foreground hover:text-foreground"
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && expandedContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50/70 border-t border-gray-100"
          >
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TableHeader({ cols }: { cols: string[] }) {
  return (
    <div className="grid border-b border-gray-100 bg-gray-50/60 px-4 py-2"
      style={{ gridTemplateColumns: `2fr ${cols.slice(1).map(() => '1fr').join(' ')}` }}>
      {cols.map((c) => (
        <span key={c} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
          {c}
        </span>
      ))}
    </div>
  );
}

function TableRow({
  cols,
  expanded,
  onToggle,
  expandedContent,
}: {
  cols: React.ReactNode[];
  expanded?: boolean;
  onToggle?: () => void;
  expandedContent?: React.ReactNode;
}) {
  const count = cols.length;
  return (
    <div className="border-b border-gray-100 last:border-0">
      <div
        className={cn('grid items-center px-4 py-3 gap-2', onToggle && 'cursor-pointer hover:bg-gray-50')}
        style={{ gridTemplateColumns: `2fr ${Array(count - 1).fill('1fr').join(' ')}` }}
        onClick={onToggle}
      >
        {cols.map((col, i) => (
          <div key={i} className="min-w-0">
            {col}
          </div>
        ))}
      </div>
      <AnimatePresence initial={false}>
        {expanded && expandedContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50 border-t border-gray-100"
          >
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────

export default function GetStarted() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set(['marketing-channels']));
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [campaignBannerDismissed, setCampaignBannerDismissed] = useState(false);

  const toggle = (key: string) =>
    setExpandedTask((prev) => (prev === key ? null : key));

  const toggleRow = (key: string) =>
    setExpandedRow((prev) => (prev === key ? null : key));

  const toggleTask = (key: string) =>
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const guidesCompleted = (() => {
    let n = 0;
    if (completedTasks.has('business-tools') && completedTasks.has('marketing-channels') && completedTasks.has('branding')) n++;
    if (completedTasks.has('signup-form') && completedTasks.has('signup-sms')) n++;
    if (completedTasks.has('flow-email') && completedTasks.has('flow-sms')) n++;
    if (!campaignBannerDismissed || completedTasks.has('campaign-done')) n++;
    return n;
  })();

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-[960px] mx-auto px-6 py-10">

        {/* ── top progress bar ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 mx-auto">
            <Circle className="h-5 w-5 text-gray-300" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground font-medium">
              {guidesCompleted} / 4 guides completed
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground absolute right-10">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* ── heading ── */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Let's get started, John!
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Based on what we know about your business, we've created a personalized setup
            guide to help you get started and start seeing value from MarketFlow.
          </p>
        </div>

        <div className="space-y-4">

          {/* ─────────────────────────────────────────────
              Section 1 — Account setup
          ───────────────────────────────────────────── */}
          <SectionCard
            icon={Settings2}
            title="Account setup"
            description="Get set up to start sending and grow your marketing."
            badge="1 / 3 completed"
          >
            {/* Confirm business tools */}
            <TaskRow
              done={completedTasks.has('business-tools')}
              label="Confirm business tools"
              expanded={expandedTask === 'business-tools'}
              onToggle={() => toggle('business-tools')}
              rightSlot={
                <>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Share2 className="h-3.5 w-3.5" />
                    <Share2 className="h-3.5 w-3.5 opacity-60" />
                  </div>
                  <Button
                    size="sm"
                    className="h-7 px-3 text-xs rounded-md bg-black text-white hover:bg-gray-800"
                    onClick={(e) => { e.stopPropagation(); toggleTask('business-tools'); }}
                  >
                    Review
                  </Button>
                </>
              }
              expandedContent={
                <div className="px-4 py-3 text-xs text-muted-foreground">
                  Connect your ecommerce platform (Shopify, WooCommerce) and confirm
                  the data MarketFlow should sync. This enables revenue attribution
                  and personalised recommendations.
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="h-7 text-xs bg-black text-white hover:bg-gray-800">Connect Shopify</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skip for now</Button>
                  </div>
                </div>
              }
            />

            {/* Marketing channels — already completed */}
            <TaskRow
              done={completedTasks.has('marketing-channels')}
              label="Marketing channels"
              expanded={expandedTask === 'marketing-channels'}
              onToggle={() => toggle('marketing-channels')}
              rightSlot={
                <>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <MessageSquare className="h-3.5 w-3.5 opacity-70" />
                    <Share2 className="h-3.5 w-3.5 opacity-50" />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-3 text-xs font-medium"
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    Manage
                  </Button>
                </>
              }
              expandedContent={
                <div className="px-4 py-3 text-xs text-muted-foreground">
                  Email is active. You can also enable SMS, push notifications and social channels.
                </div>
              }
            />

            {/* Confirm branding */}
            <TaskRow
              done={completedTasks.has('branding')}
              label="Confirm branding"
              expanded={expandedTask === 'branding'}
              onToggle={() => toggle('branding')}
              rightSlot={
                <>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-sm bg-yellow-400 inline-block" />
                    <span className="w-4 h-4 rounded-sm bg-black inline-block" />
                    <span className="w-4 h-4 rounded-sm bg-gray-400 inline-block" />
                    <span className="w-4 h-4 rounded-sm bg-blue-500 inline-block" />
                  </div>
                  <Button
                    size="sm"
                    className="h-7 px-3 text-xs rounded-md bg-black text-white hover:bg-gray-800"
                    onClick={(e) => { e.stopPropagation(); toggleTask('branding'); }}
                  >
                    Review
                  </Button>
                </>
              }
              expandedContent={
                <div className="px-4 py-3 text-xs text-muted-foreground">
                  Set your brand colours, logo, and from-name so every email looks on-brand.
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="h-7 text-xs bg-black text-white hover:bg-gray-800">Open brand settings</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skip</Button>
                  </div>
                </div>
              }
            />
          </SectionCard>

          {/* ─────────────────────────────────────────────
              Section 2 — Grow your audience
          ───────────────────────────────────────────── */}
          <SectionCard
            icon={Users}
            title="Grow your audience"
            description="Build your subscriber base by turning website visitors and social media users into subscribers."
            badge="0 / 2 completed"
          >
            <TableHeader cols={['Form', 'Type', 'Status', 'Submitted']} />

            {/* Sign-up Form row */}
            <TableRow
              expanded={expandedRow === 'signup-email'}
              onToggle={() => toggleRow('signup-email')}
              cols={[
                <div className="flex items-center gap-2 min-w-0">
                  {expandedRow === 'signup-email'
                    ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                  <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center shrink-0">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Sign-up Form</p>
                    <p className="text-[11px] text-muted-foreground truncate">Email List & Text Messaging List</p>
                  </div>
                </div>,
                <Badge className="text-[11px] bg-blue-50 text-blue-700 border-0 hover:bg-blue-50">Popup</Badge>,
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-[12px] text-blue-600 font-medium">Suggested</span>
                </div>,
                <span className="text-sm text-muted-foreground">0</span>,
              ]}
              expandedContent={
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground mb-1">Sign-up Form</p>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                        A multi-step sign-up form that collects email and text messaging consent, and
                        confirms subscription to your list.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                        <ChevronDown className="h-4 w-4 rotate-90" />
                      </Button>
                      <span className="text-xs text-muted-foreground">1 / 3</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="h-7 text-xs bg-black text-white hover:bg-gray-800">Create form</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skip</Button>
                  </div>
                </div>
              }
            />

            {/* SMS opt-in */}
            <TableRow
              cols={[
                <div className="flex items-center gap-2 min-w-0">
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">SMS Opt-in Form</p>
                    <p className="text-[11px] text-muted-foreground truncate">Text Messaging List</p>
                  </div>
                </div>,
                <Badge className="text-[11px] bg-gray-100 text-gray-600 border-0 hover:bg-gray-100">Inline</Badge>,
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-[12px] text-blue-600 font-medium">Suggested</span>
                </div>,
                <span className="text-sm text-muted-foreground">0</span>,
              ]}
            />
          </SectionCard>

          {/* ─────────────────────────────────────────────
              Section 3 — Automate with flows
          ───────────────────────────────────────────── */}
          <SectionCard
            icon={GitBranch}
            title="Automate your marketing with flows"
            description="Create automated messages to engage customers at key moments."
            badge="0 / 2 completed"
          >
            {/* Review / Skip tabs */}
            <div className="flex items-center gap-0 border-b border-gray-100 px-4 pt-2 pb-0">
              <button className="text-sm font-medium text-foreground border-b-2 border-black pb-2 pr-4">Review</button>
              <button className="text-sm text-muted-foreground pb-2 px-4 hover:text-foreground">Skip</button>
            </div>

            <TableHeader cols={['Flow', 'Type', 'Trigger', 'Status', 'Deliveries']} />

            <TableRow
              cols={[
                <div className="flex items-center gap-2 min-w-0">
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center shrink-0">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Welcome Series (Email)</p>
                    <p className="text-[11px] text-muted-foreground truncate">Added to List</p>
                  </div>
                </div>,
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />,
                <div className="w-5 h-4 flex flex-col gap-0.5 justify-center">
                  <span className="block h-px bg-muted-foreground/50 w-full" />
                  <span className="block h-px bg-muted-foreground/50 w-full" />
                  <span className="block h-px bg-muted-foreground/50 w-full" />
                </div>,
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-[12px] text-blue-600 font-medium">Suggested</span>
                </div>,
                <span className="text-sm text-muted-foreground">-</span>,
              ]}
            />

            <TableRow
              cols={[
                <div className="flex items-center gap-2 min-w-0">
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Welcome Series (Text Message)</p>
                    <p className="text-[11px] text-muted-foreground truncate">Subscribed to SMS Marketing</p>
                  </div>
                </div>,
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />,
                <div className="w-5 h-4 flex flex-col gap-0.5 justify-center">
                  <span className="block h-px bg-muted-foreground/50 w-full" />
                  <span className="block h-px bg-muted-foreground/50 w-full" />
                  <span className="block h-px bg-muted-foreground/50 w-full" />
                </div>,
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-[12px] text-blue-600 font-medium">Suggested</span>
                </div>,
                <span className="text-sm text-muted-foreground">-</span>,
              ]}
            />
          </SectionCard>

          {/* ─────────────────────────────────────────────
              Section 4 — Engage with campaigns
          ───────────────────────────────────────────── */}
          <SectionCard
            icon={Megaphone}
            title="Engage your audience with campaigns"
            description="Send your first email message using a ready-made campaign."
            badge="Setup required"
          >
            <div className="p-4">
              <AnimatePresence>
                {!campaignBannerDismissed && (
                  <motion.div
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 overflow-hidden"
                  >
                    <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-blue-800 mb-0.5">
                        Unlock personalized campaign recommendations
                      </p>
                      <p className="text-xs text-blue-600 leading-relaxed">
                        Review and confirm your branding to get personalized and branded campaign recommendations.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs shrink-0 bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Review
                    </Button>
                    <button
                      onClick={() => setCampaignBannerDismissed(true)}
                      className="text-blue-400 hover:text-blue-600 ml-1 shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {campaignBannerDismissed && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Megaphone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Create your first campaign</p>
                  <p className="text-xs text-muted-foreground mb-4 max-w-xs">
                    Send a targeted message to your audience using one of our ready-made templates.
                  </p>
                  <Button size="sm" className="h-7 text-xs bg-black text-white hover:bg-gray-800">
                    Create campaign
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              )}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}
