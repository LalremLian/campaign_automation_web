import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ChevronLeft, ChevronRight, Mail, Smartphone, MessageSquare,
  Check, Clock, Send, Zap, Users, Calendar, Search, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Types ─────────────────────────────────────────────── */
type Channel = 'Email' | 'SMS' | 'WhatsApp';
type SendTime = 'now' | 'schedule' | 'optimized';

interface WizardState {
  channel: Channel | null;
  templateId: string | null;
  name: string;
  subject: string;
  previewText: string;
  body: string;
  audience: string[];
  sendTime: SendTime | null;
  scheduledDate: string;
  scheduledHour: string;
}

/* ─── Mock data ──────────────────────────────────────────── */
const TEMPLATES = [
  { id: 't1', name: 'Abandoned Cart', tag: 'E-commerce', desc: 'Recover lost carts with a compelling offer.' },
  { id: 't2', name: 'Welcome Series', tag: 'Onboarding', desc: 'Warm up new subscribers on day 1.' },
  { id: 't3', name: 'Win-back', tag: 'Retention', desc: 'Re-engage customers who haven\'t bought in 90 days.' },
  { id: 't4', name: 'Flash Sale', tag: 'Promotion', desc: 'Time-limited discount with countdown urgency.' },
  { id: 't5', name: 'Product Launch', tag: 'Announcement', desc: 'Introduce a new product to your list.' },
  { id: 't6', name: 'VIP Reward', tag: 'Loyalty', desc: 'Exclusive offer for your top-tier customers.' },
  { id: 't7', name: 'Review Request', tag: 'Post-purchase', desc: 'Ask for a review 7 days after delivery.' },
  { id: 't8', name: 'Newsletter', tag: 'Content', desc: 'Curated content digest for engaged subscribers.' },
  { id: 't9', name: 'Blank', tag: 'Custom', desc: 'Start from scratch with a clean canvas.' },
];

const AUDIENCES = [
  { id: 'a1', name: 'All Subscribers', count: '24,881' },
  { id: 'a2', name: 'Active Customers', count: '8,432' },
  { id: 'a3', name: 'Lapsed — 90 days', count: '3,210' },
  { id: 'a4', name: 'VIP Tier', count: '1,047' },
  { id: 'a5', name: 'Cart Abandoners', count: '2,651' },
  { id: 'a6', name: 'New This Month', count: '912' },
];

const STEPS = ['Channel', 'Template', 'Content', 'Audience', 'Review'];

/* ─── Step indicator ─────────────────────────────────────── */
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors',
                done ? 'bg-foreground border-foreground text-background' :
                active ? 'border-foreground text-foreground bg-background' :
                'border-border text-muted-foreground bg-background'
              )}>
                {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn('text-[10px] mt-1 font-medium', active ? 'text-foreground' : 'text-muted-foreground')}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn('h-px w-10 mb-4 mx-1', done ? 'bg-foreground' : 'bg-border')} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── Step 1 — Channel ───────────────────────────────────── */
function StepChannel({ value, onChange }: { value: Channel | null; onChange: (c: Channel) => void }) {
  const options: { channel: Channel; icon: React.ElementType; desc: string }[] = [
    { channel: 'Email', icon: Mail, desc: 'Rich HTML emails with images and links.' },
    { channel: 'SMS', icon: Smartphone, desc: 'Short text messages, straight to their phone.' },
    { channel: 'WhatsApp', icon: MessageSquare, desc: 'Conversational messages on WhatsApp.' },
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Choose the channel you want to send this campaign through.</p>
      <div className="flex flex-col gap-3 mt-4 max-w-lg">
        {options.map(({ channel, icon: Icon, desc }) => (
          <button
            key={channel}
            onClick={() => onChange(channel)}
            className={cn(
              'flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all',
              value === channel
                ? 'border-foreground bg-secondary/30'
                : 'border-border hover:border-foreground/40'
            )}
          >
            <div className="p-2 rounded-md bg-secondary shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{channel}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            {value === channel && (
              <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-background" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2 — Template ──────────────────────────────────── */
function StepTemplate({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  const [search, setSearch] = useState('');
  const filtered = TEMPLATES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.tag.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Pick a starting template or begin from a blank canvas.</p>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input
          placeholder="Search templates…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8 h-8 text-xs"
        />
      </div>
      <div className="grid grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
        {filtered.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              'text-left rounded-md border-2 p-3.5 transition-all',
              value === t.id
                ? 'border-foreground bg-secondary/30'
                : 'border-border hover:border-foreground/40'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">{t.tag}</Badge>
              {value === t.id && <Check className="w-3.5 h-3.5" />}
            </div>
            <p className="text-xs font-semibold">{t.name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 3 — Content ───────────────────────────────────── */
function StepContent({
  channel, state, onChange
}: {
  channel: Channel | null;
  state: WizardState;
  onChange: (patch: Partial<WizardState>) => void;
}) {
  const isEmail = channel === 'Email';
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left — fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Campaign Name <span className="text-destructive">*</span></Label>
          <Input
            placeholder="e.g. July Flash Sale"
            value={state.name}
            onChange={e => onChange({ name: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        {isEmail && (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Subject Line <span className="text-destructive">*</span></Label>
              <Input
                placeholder="e.g. Your cart is waiting 🛒"
                value={state.subject}
                onChange={e => onChange({ subject: e.target.value })}
                className="h-8 text-xs"
              />
              <p className="text-[10px] text-muted-foreground">{state.subject.length} / 80 characters</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Preview Text</Label>
              <Input
                placeholder="Short text shown after subject in inbox…"
                value={state.previewText}
                onChange={e => onChange({ previewText: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
          </>
        )}

        <div className="space-y-1.5">
          <Label className="text-xs">Message Body <span className="text-destructive">*</span></Label>
          <Textarea
            placeholder={isEmail ? 'Write your email content here…' : 'Write your message (160 chars for SMS)…'}
            value={state.body}
            onChange={e => onChange({ body: e.target.value })}
            className="text-xs min-h-[140px] resize-none"
          />
          <p className="text-[10px] text-muted-foreground">{state.body.length} characters</p>
        </div>
      </div>

      {/* Right — preview */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider">Live Preview</p>
          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />live
          </span>
        </div>
        {isEmail ? (
          <div className="rounded-xl overflow-hidden border border-border shadow-md bg-background text-xs">
            {/* Inbox chrome bar */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-200 text-[10px] font-bold shrink-0">C</div>
                <div>
                  <p className="text-[10px] text-blue-500 dark:text-blue-400">Campaign &lt;hello@campaign.app&gt;</p>
                  <p className="text-blue-900 dark:text-blue-100 font-semibold text-sm leading-tight">{state.subject || <span className="opacity-40">Your subject line…</span>}</p>
                </div>
              </div>
              <p className="text-[10px] text-blue-400 dark:text-blue-500">{state.previewText || 'Preview text appears here…'}</p>
            </div>
            {/* Body */}
            <div className="p-5 min-h-[160px] leading-relaxed text-foreground whitespace-pre-wrap bg-white dark:bg-card">
              {state.body
                ? <span className="text-sm">{state.body}</span>
                : <span className="text-muted-foreground text-sm italic">Your message body will appear here…</span>}
            </div>
            {/* Footer */}
            <div className="px-5 py-3 bg-gray-50 dark:bg-secondary/30 border-t border-border">
              <p className="text-[10px] text-muted-foreground text-center">Unsubscribe · View in browser · Privacy Policy</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center pt-2">
            {/* Phone frame */}
            <div className="relative w-56">
              <div className="w-56 border-[6px] border-gray-800 dark:border-gray-600 rounded-[2.5rem] p-2 bg-gray-800 dark:bg-gray-600 shadow-2xl">
                {/* Screen */}
                <div className={`rounded-[2rem] overflow-hidden ${channel === 'WhatsApp' ? 'bg-[#e5ddd5] dark:bg-[#0d1117]' : 'bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900'}`}>
                  {/* Status bar */}
                  <div className={`px-4 pt-2 pb-1 flex items-center justify-between ${channel === 'WhatsApp' ? 'bg-[#075e54]' : 'bg-blue-100 dark:bg-blue-900/50'}`}>
                    <span className={`text-[9px] font-medium ${channel === 'WhatsApp' ? 'text-white' : 'text-blue-700 dark:text-blue-200'}`}>9:41</span>
                    <span className={`text-[9px] ${channel === 'WhatsApp' ? 'text-white' : 'text-blue-700 dark:text-blue-200'}`}>{channel === 'WhatsApp' ? 'WhatsApp' : 'Messages'}</span>
                    <span className={`text-[9px] ${channel === 'WhatsApp' ? 'text-white' : 'text-blue-700 dark:text-blue-200'}`}>●●●</span>
                  </div>
                  {/* Chat area */}
                  <div className="p-3 min-h-[160px] space-y-2">
                    <div className="flex justify-start">
                      <div className={`max-w-[85%] rounded-xl rounded-tl-sm px-3 py-2 shadow-sm ${channel === 'WhatsApp' ? 'bg-white dark:bg-gray-700' : 'bg-white dark:bg-gray-700 border border-border'}`}>
                        <p className="text-xs leading-relaxed text-foreground">
                          {state.body || <span className="text-muted-foreground italic">Your message will appear here…</span>}
                        </p>
                        <p className="text-[9px] text-muted-foreground text-right mt-1">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {channel === 'WhatsApp' && ' ✓✓'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Home indicator */}
              <div className="flex justify-center mt-2">
                <div className="w-16 h-1 bg-gray-600 dark:bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step 4 — Audience & Send Time ─────────────────────── */
function StepAudience({
  state, onChange
}: {
  state: WizardState;
  onChange: (patch: Partial<WizardState>) => void;
}) {
  const toggle = (id: string) => {
    onChange({
      audience: state.audience.includes(id)
        ? state.audience.filter(a => a !== id)
        : [...state.audience, id]
    });
  };

  const sendOptions: { id: SendTime; icon: React.ElementType; label: string; desc: string }[] = [
    { id: 'now', icon: Send, label: 'Send Now', desc: 'Deliver immediately after you click send.' },
    { id: 'schedule', icon: Calendar, label: 'Schedule for Later', desc: 'Pick an exact date and time.' },
    { id: 'optimized', icon: Zap, label: 'Best Time Optimization', desc: 'AI picks the best time per recipient.' },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Audience */}
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium">Select Audience</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Choose one or more segments to target.</p>
        </div>
        <div className="space-y-1.5">
          {AUDIENCES.map(a => {
            const selected = state.audience.includes(a.id);
            return (
              <button
                key={a.id}
                onClick={() => toggle(a.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-md border text-left transition-all text-xs',
                  selected ? 'border-foreground bg-secondary/30' : 'border-border hover:border-foreground/40'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0',
                    selected ? 'bg-foreground border-foreground' : 'border-border'
                  )}>
                    {selected && <Check className="w-2.5 h-2.5 text-background" />}
                  </div>
                  <span className="font-medium">{a.name}</span>
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums">{a.count}</span>
              </button>
            );
          })}
        </div>
        {state.audience.length > 0 && (
          <p className="text-[11px] text-muted-foreground pl-1">
            <Users className="inline w-3 h-3 mr-1" />
            {state.audience.length} segment{state.audience.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Send Time */}
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium">When to Send</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Choose your delivery timing.</p>
        </div>
        <div className="space-y-2">
          {sendOptions.map(({ id, icon: Icon, label, desc }) => (
            <button
              key={id}
              onClick={() => onChange({ sendTime: id })}
              className={cn(
                'w-full flex items-start gap-3 px-3 py-3 rounded-md border-2 text-left transition-all',
                state.sendTime === id
                  ? 'border-foreground bg-secondary/30'
                  : 'border-border hover:border-foreground/40'
              )}
            >
              <div className="p-1.5 rounded bg-secondary mt-0.5 shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
              </div>
              {state.sendTime === id && (
                <Check className="w-3.5 h-3.5 ml-auto self-center shrink-0" />
              )}
            </button>
          ))}
        </div>

        {state.sendTime === 'schedule' && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Date</Label>
              <Input
                type="date"
                value={state.scheduledDate}
                onChange={e => onChange({ scheduledDate: e.target.value })}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Time</Label>
              <Input
                type="time"
                value={state.scheduledHour}
                onChange={e => onChange({ scheduledHour: e.target.value })}
                className="h-8 text-sm"
              />
            </div>
          </div>
        )}

        {state.sendTime === 'optimized' && (
          <div className="rounded-md bg-secondary/40 border border-border px-3 py-2.5 text-[11px] text-muted-foreground leading-relaxed">
            <Zap className="inline w-3 h-3 mr-1.5 text-foreground" />
            Campaign will analyze each recipient's past open history and deliver at their personal peak engagement window — typically within 24 hours of sending.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step 5 — Review ────────────────────────────────────── */
function StepReview({ state }: { state: WizardState }) {
  const template = TEMPLATES.find(t => t.id === state.templateId);
  const audiences = AUDIENCES.filter(a => state.audience.includes(a.id));
  const totalContacts = audiences.reduce((sum, a) => sum + parseInt(a.count.replace(',', '')), 0);

  const sendLabel =
    state.sendTime === 'now' ? 'Send Now' :
    state.sendTime === 'optimized' ? 'Best Time Optimization' :
    state.scheduledDate && state.scheduledHour
      ? `${state.scheduledDate} at ${state.scheduledHour}`
      : 'Schedule for Later';

  const rows: { label: string; value: string }[] = [
    { label: 'Channel', value: state.channel ?? '—' },
    { label: 'Template', value: template?.name ?? '—' },
    { label: 'Campaign Name', value: state.name || '—' },
    ...(state.channel === 'Email' ? [
      { label: 'Subject Line', value: state.subject || '—' },
      { label: 'Preview Text', value: state.previewText || '—' },
    ] : []),
    { label: 'Audience', value: audiences.map(a => a.name).join(', ') || '—' },
    { label: 'Recipients', value: totalContacts.toLocaleString() },
    { label: 'Send Time', value: sendLabel },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Review everything before sending. Once sent, this action cannot be undone.</p>

      <div className="grid grid-cols-2 gap-4">
        {/* Summary table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-secondary/40 px-4 py-2 border-b">
            <p className="text-xs font-semibold">Campaign Summary</p>
          </div>
          <div className="divide-y">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex gap-3 px-4 py-2.5">
                <span className="text-[11px] text-muted-foreground w-28 shrink-0">{label}</span>
                <span className="text-[11px] font-medium text-foreground leading-relaxed">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Message preview */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-secondary/40 px-4 py-2 border-b">
            <p className="text-xs font-semibold">Message Preview</p>
          </div>
          {state.channel === 'Email' ? (
            <div className="p-4">
              <div className="bg-secondary/20 rounded px-3 py-2 mb-3 space-y-0.5">
                <p className="text-[10px] text-muted-foreground">Subject: <span className="text-foreground font-medium">{state.subject || '—'}</span></p>
                <p className="text-[10px] text-muted-foreground">Preview: {state.previewText || '—'}</p>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {state.body || 'No message body entered.'}
              </p>
            </div>
          ) : (
            <div className="flex justify-center p-6">
              <div className="w-44 border-4 border-foreground/10 rounded-3xl p-3 bg-background shadow-md">
                <div className="bg-secondary/50 rounded-2xl p-2.5 space-y-2">
                  <p className="text-[9px] text-muted-foreground font-medium">{state.channel}</p>
                  <div className="bg-background rounded-xl p-2 text-[10px] leading-relaxed shadow-sm">
                    {state.body || 'No message entered.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audience breakdown */}
      {audiences.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-secondary/40 px-4 py-2 border-b flex items-center justify-between">
            <p className="text-xs font-semibold">Audience</p>
            <span className="text-[11px] text-muted-foreground">{totalContacts.toLocaleString()} total recipients</span>
          </div>
          <div className="flex divide-x">
            {audiences.map(a => (
              <div key={a.id} className="flex-1 px-4 py-3">
                <p className="text-xs font-medium">{a.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{a.count} contacts</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main wizard ────────────────────────────────────────── */
export default function CreateCampaign() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    channel: null,
    templateId: null,
    name: '',
    subject: '',
    previewText: '',
    body: '',
    audience: [],
    sendTime: null,
    scheduledDate: '',
    scheduledHour: '',
  });

  const patch = (p: Partial<WizardState>) => setState(s => ({ ...s, ...p }));

  const canNext = () => {
    if (step === 0) return !!state.channel;
    if (step === 1) return !!state.templateId;
    if (step === 2) return !!state.name && !!state.body;
    if (step === 3) return state.audience.length > 0 && !!state.sendTime;
    return true;
  };

  const next = () => { if (canNext()) setStep(s => Math.min(s + 1, 4)); };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const send = () => {
    // Mock send — navigate back with success
    navigate('/campaigns');
  };

  return (
    <div className="min-h-full bg-background flex flex-col">
      {/* Header */}
      <div className="border-b px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/campaigns')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-semibold">Create Campaign</h1>
            <p className="text-[11px] text-muted-foreground">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
          </div>
        </div>
        <StepBar current={step} />
        <button
          onClick={() => navigate('/campaigns')}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[860px] mx-auto space-y-8">
          {step === 0 && <StepChannel value={state.channel} onChange={c => patch({ channel: c })} />}
          {step === 1 && <StepTemplate value={state.templateId} onChange={id => patch({ templateId: id })} />}
          {step === 2 && <StepContent channel={state.channel} state={state} onChange={patch} />}
          {step === 3 && <StepAudience state={state} onChange={patch} />}
          {step === 4 && <StepReview state={state} />}

          {/* Inline navigation — always visible without scrolling */}
          <div className="flex items-center justify-between pt-4 pb-2 border-t border-border/60">
            <Button
              variant="outline"
              onClick={back}
              disabled={step === 0}
              className="h-10 px-6 text-sm gap-1.5 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>

            <div className="flex items-center gap-3">
              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <div key={i} className={`rounded-full transition-all ${i === step ? 'w-5 h-2 bg-foreground' : i < step ? 'w-2 h-2 bg-foreground/50' : 'w-2 h-2 bg-border'}`} />
                ))}
              </div>

              {step < 4 ? (
                <Button
                  onClick={next}
                  disabled={!canNext()}
                  className="h-10 px-6 text-sm gap-1.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={send}
                  className="h-10 px-7 text-sm gap-1.5 rounded-xl bg-foreground text-background hover:bg-foreground/90"
                >
                  <Send className="w-4 h-4" /> Send Campaign
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
