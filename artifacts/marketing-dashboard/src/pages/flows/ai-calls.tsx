import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Phone, Sparkles, Play, MoreVertical,
  TrendingUp, Users, Clock, CheckCircle2, Check, ChevronDown
} from 'lucide-react';

// ─── Mock data ────────────────────────────────────────────────

const voices = [
  { id: 'nova',    name: 'Nova',    desc: 'Warm, professional, female',  accent: 'American'  },
  { id: 'echo',    name: 'Echo',    desc: 'Clear, calm, male',            accent: 'American'  },
  { id: 'aria',    name: 'Aria',    desc: 'Friendly, upbeat, female',     accent: 'British'   },
  { id: 'orion',   name: 'Orion',   desc: 'Deep, authoritative, male',   accent: 'Australian'},
  { id: 'sage',    name: 'Sage',    desc: 'Neutral, crisp, non-binary',   accent: 'Canadian'  },
];

const languages = [
  { code: 'en-US', label: 'English (US)'      },
  { code: 'en-GB', label: 'English (UK)'      },
  { code: 'es-ES', label: 'Spanish (Spain)'   },
  { code: 'es-MX', label: 'Spanish (Mexico)'  },
  { code: 'fr-FR', label: 'French'            },
  { code: 'de-DE', label: 'German'            },
  { code: 'pt-BR', label: 'Portuguese (BR)'   },
  { code: 'ja-JP', label: 'Japanese'          },
];

const windowHours = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM',  '4:00 PM',  '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM',
];

const calls = [
  { id: 1, name: 'Sarah M.',  time: 'Today 10:14 AM',    duration: '1m 42s', outcome: 'Converted', flow: 'Abandoned Cart',    score: 94 },
  { id: 2, name: 'James R.',  time: 'Today 9:02 AM',     duration: '0m 58s', outcome: 'Voicemail', flow: 'Abandoned Cart',    score: 62 },
  { id: 3, name: 'Priya K.',  time: 'Yesterday 3:40 PM', duration: '2m 11s', outcome: 'Converted', flow: 'Win-back Campaign', score: 91 },
  { id: 4, name: 'Marcus T.', time: 'Yesterday 1:15 PM', duration: '0m 22s', outcome: 'No answer', flow: 'Abandoned Cart',    score: 0  },
  { id: 5, name: 'Elena W.',  time: 'Jul 10, 11:00 AM',  duration: '1m 05s', outcome: 'Converted', flow: 'VIP Milestone',     score: 88 },
  { id: 6, name: 'Omar H.',   time: 'Jul 10, 9:30 AM',   duration: '3m 02s', outcome: 'Converted', flow: 'Win-back Campaign', score: 97 },
  { id: 7, name: 'Sophie L.', time: 'Jul 9, 2:15 PM',    duration: '0m 45s', outcome: 'Voicemail', flow: 'Welcome Series',    score: 55 },
  { id: 8, name: 'Ravi P.',   time: 'Jul 9, 11:30 AM',   duration: '1m 20s', outcome: 'No answer', flow: 'Abandoned Cart',    score: 0  },
];

const scriptLines = [
  { speaker: 'AI',     text: "Hi [First Name], this is Campaign calling about the items you left in your cart." },
  { speaker: 'AI',     text: "We wanted to make sure you didn't miss out — your cart is still saved."           },
  { speaker: 'Prompt', text: "Would you like me to send you a quick summary with a 10% discount?"              },
  { speaker: 'AI',     text: "Great! I'll send that to [Email] right now. Have a wonderful day!"               },
];

const outcomeStyle: Record<string, string> = {
  'Converted': 'bg-foreground text-background',
  'Voicemail': 'bg-secondary text-foreground border border-border',
  'No answer': 'bg-muted text-muted-foreground',
};

// ─── Sub-components ───────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{children}</p>;
}

function Select({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between h-9 px-3 border border-border bg-background rounded-sm text-xs hover:border-foreground/50 transition-colors"
      >
        <span className="font-medium">{selected?.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-sm shadow-lg z-20 max-h-44 overflow-y-auto">
          {options.map(o => (
            <button
              key={o.value}
              onClick={() => { onChange(o.value); setOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-secondary transition-colors text-left"
            >
              {o.label}
              {value === o.value && <Check className="w-3 h-3 text-foreground shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────

export default function AICalls() {
  const [filter, setFilter]             = useState<'all' | 'Converted' | 'Voicemail' | 'No answer'>('all');
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [retryAttempts, setRetryAttempts] = useState(2);
  const [windowStart, setWindowStart]   = useState('9:00 AM');
  const [windowEnd, setWindowEnd]       = useState('6:00 PM');

  const filtered = filter === 'all' ? calls : calls.filter(c => c.outcome === filter);

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Left config panel ── */}
      <div className="w-72 border-r bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="px-4 py-3 border-b bg-background shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-foreground rounded flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-background" />
            </div>
            <div>
              <p className="font-semibold text-sm">AI Calls</p>
              <p className="text-[11px] text-muted-foreground">Configure voice outreach</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {/* Voice */}
          <div>
            <SectionLabel>AI Voice</SectionLabel>
            <div className="space-y-1.5">
              {voices.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 border rounded-sm transition-all text-left
                    ${selectedVoice === v.id
                      ? 'border-foreground bg-foreground/5 ring-1 ring-foreground'
                      : 'border-border hover:border-foreground/40 bg-background'}`}
                >
                  {/* Voice avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold
                    ${selectedVoice === v.id ? 'bg-foreground text-background' : 'bg-secondary text-foreground'}`}>
                    {v.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold">{v.name}</span>
                      <span className="text-[9px] font-mono text-muted-foreground">{v.accent}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{v.desc}</span>
                  </div>
                  {selectedVoice === v.id && <Check className="w-3.5 h-3.5 text-foreground shrink-0" />}
                </button>
              ))}
            </div>
            <button className="mt-2 w-full h-7 border border-dashed border-border rounded-sm text-[10px] text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors">
              + Preview voice
            </button>
          </div>

          {/* Language */}
          <div>
            <SectionLabel>Language</SectionLabel>
            <Select
              value={selectedLang}
              onChange={setSelectedLang}
              options={languages.map(l => ({ value: l.code, label: l.label }))}
            />
          </div>

          {/* Retry attempts */}
          <div>
            <SectionLabel>Retry Attempts</SectionLabel>
            <div className="flex items-center gap-2">
              <div className="flex border border-border rounded-sm overflow-hidden">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRetryAttempts(n)}
                    className={`w-9 h-9 text-xs font-medium transition-colors border-r last:border-r-0 border-border
                      ${retryAttempts === n ? 'bg-foreground text-background' : 'bg-background hover:bg-secondary'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground">attempt{retryAttempts !== 1 ? 's' : ''}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">
              Retry after no answer or voicemail, spaced 2h apart.
            </p>
          </div>

          {/* Calling window */}
          <div>
            <SectionLabel>Calling Window</SectionLabel>
            <div className="flex items-center gap-2">
              <Select
                value={windowStart}
                onChange={setWindowStart}
                options={windowHours.map(h => ({ value: h, label: h }))}
              />
              <span className="text-xs text-muted-foreground shrink-0">to</span>
              <Select
                value={windowEnd}
                onChange={setWindowEnd}
                options={windowHours.map(h => ({ value: h, label: h }))}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">Calls only placed within this window in the contact's timezone.</p>

            {/* Days */}
            <div className="flex gap-1 mt-2.5">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <button
                  key={i}
                  className={`flex-1 h-7 text-[10px] font-medium border rounded-sm transition-colors
                    ${i < 5 ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:bg-secondary bg-background'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-xs font-medium">DNC list check</p>
              <p className="text-[10px] text-muted-foreground">Skip opted-out contacts</p>
            </div>
            <div className="w-9 h-5 bg-foreground rounded-full relative cursor-pointer shrink-0">
              <div className="w-3.5 h-3.5 bg-background rounded-full absolute right-0.5 top-0.5" />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="p-4 border-t shrink-0">
          <Button className="w-full h-10 bg-foreground text-background text-sm gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Save Configuration
          </Button>
        </div>
      </div>

      {/* ── Right: call log + script ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Stats */}
        <div className="px-5 py-3 border-b bg-background shrink-0">
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Users,        label: 'Total calls',   value: '8',     sub: 'Last 7 days' },
              { icon: CheckCircle2, label: 'Converted',     value: '5',     sub: '62.5% rate'  },
              { icon: Clock,        label: 'Avg duration',  value: '1m 15s', sub: 'Per call'   },
              { icon: TrendingUp,   label: 'Revenue attr.', value: '$2,840', sub: 'This week'  },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="border rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{label}</span>
                </div>
                <div className="font-bold text-base leading-none">{value}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Call log */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-r">
            <div className="flex items-center gap-1 px-4 py-2 border-b bg-background shrink-0">
              {(['all', 'Converted', 'Voicemail', 'No answer'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors
                    ${filter === f ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
                >
                  {f === 'all' ? 'All calls' : f}
                </button>
              ))}
              <span className="ml-auto text-[11px] text-muted-foreground">{filtered.length} calls</span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.map(call => (
                <div key={call.id} className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 hover:bg-secondary/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 text-xs font-bold">
                    {call.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{call.name}</span>
                      <span className="text-[10px] text-muted-foreground">{call.flow}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{call.time} · {call.duration}</div>
                  </div>
                  {call.score > 0 && (
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-foreground rounded-full" style={{ width: `${call.score}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">{call.score}</span>
                    </div>
                  )}
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm shrink-0 ${outcomeStyle[call.outcome]}`}>
                    {call.outcome}
                  </span>
                  <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
