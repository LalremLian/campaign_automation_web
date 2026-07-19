import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Phone, Sparkles, MoreVertical, TrendingUp, Users,
  Clock, CheckCircle2, Check, ChevronDown, Play,
  Wand2, ShieldCheck, PhoneCall, PhoneMissed, PhoneOff,
} from 'lucide-react';

const voices = [
  { id: 'nova',  name: 'Nova',  desc: 'Warm, professional',   accent: 'American',   gender: 'F' },
  { id: 'echo',  name: 'Echo',  desc: 'Clear, calm',          accent: 'American',   gender: 'M' },
  { id: 'aria',  name: 'Aria',  desc: 'Friendly, upbeat',     accent: 'British',    gender: 'F' },
  { id: 'orion', name: 'Orion', desc: 'Deep, authoritative',  accent: 'Australian', gender: 'M' },
  { id: 'sage',  name: 'Sage',  desc: 'Neutral, crisp',       accent: 'Canadian',   gender: 'N' },
];

const languages = [
  { code: 'en-US', label: 'English (US)'     },
  { code: 'en-GB', label: 'English (UK)'     },
  { code: 'es-ES', label: 'Spanish (Spain)'  },
  { code: 'es-MX', label: 'Spanish (Mexico)' },
  { code: 'fr-FR', label: 'French'           },
  { code: 'de-DE', label: 'German'           },
  { code: 'pt-BR', label: 'Portuguese (BR)'  },
  { code: 'ja-JP', label: 'Japanese'         },
];

const windowHours = [
  '8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM',
  '1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM',
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
  { speaker: 'AI',     text: "Hi {{first_name}}, this is Alex calling on behalf of Acme. I noticed you left a few items in your cart."          },
  { speaker: 'AI',     text: "Your cart is still saved and I'd love to help you complete your order today."                                       },
  { speaker: 'Prompt', text: "Is there anything stopping you from completing your purchase? I can answer questions or apply a discount."          },
  { speaker: 'AI',     text: "Wonderful! I'll send a 10% discount code to {{email}} right now. Thank you for your time, have a great day!"       },
];

const outcomeConfig = {
  'Converted': { icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900' },
  'Voicemail':  { icon: PhoneOff,    color: 'bg-secondary text-muted-foreground border-border' },
  'No answer':  { icon: PhoneMissed, color: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900' },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">{children}</p>;
}

function SelectDropdown({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const sel = options.find(o => o.value === value);
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between h-9 px-3 border border-border bg-background rounded-lg text-xs hover:border-foreground/30 transition-colors">
        <span className="font-medium">{sel?.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-20 max-h-44 overflow-y-auto">
          {options.map(o => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-secondary transition-colors text-left">
              {o.label}
              {value === o.value && <Check className="w-3 h-3 text-foreground" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AICalls() {
  const [filter, setFilter] = useState<'all' | 'Converted' | 'Voicemail' | 'No answer'>('all');
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [retryAttempts, setRetryAttempts] = useState(2);
  const [windowStart, setWindowStart] = useState('9:00 AM');
  const [windowEnd, setWindowEnd] = useState('6:00 PM');

  const filtered = filter === 'all' ? calls : calls.filter(c => c.outcome === filter);

  return (
    <div className="flex h-full overflow-hidden bg-background">

      {/* Left config panel */}
      <div className="w-[420px] border-r bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="px-4 py-3.5 border-b flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground rounded-xl flex items-center justify-center shadow-sm">
            <Phone className="w-4 h-4 text-background" />
          </div>
          <div>
            <p className="font-semibold text-sm">AI Calls</p>
            <p className="text-[11px] text-muted-foreground">Configure voice outreach</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {/* Voice prompt */}
          <div>
            <SectionLabel>Call Script Prompt</SectionLabel>
            <div className="relative">
              <textarea
                rows={7}
                placeholder="e.g. Remind the customer about their abandoned cart, offer a 10% discount if they complete their purchase today..."
                className="w-full px-3 py-2.5 border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-foreground rounded-lg resize-none leading-relaxed" />
              <button className="absolute bottom-2 right-2 p-1 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Wand2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Voice */}
          <div>
            <SectionLabel>AI Voice</SectionLabel>
            <div className="space-y-1.5">
              {voices.map(v => (
                <button key={v.id} onClick={() => setSelectedVoice(v.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 border rounded-lg transition-all text-left
                    ${selectedVoice === v.id ? 'border-foreground bg-foreground/5 ring-1 ring-foreground' : 'border-border hover:border-foreground/30 bg-background'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold
                    ${selectedVoice === v.id ? 'bg-foreground text-background' : 'bg-secondary text-foreground'}`}>
                    {v.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold">{v.name}</span>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                        v.accent === 'American'   ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' :
                        v.accent === 'British'    ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' :
                        v.accent === 'Australian' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' :
                        'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                      }`}>{v.accent}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{v.desc}</span>
                  </div>
                  {selectedVoice === v.id && <Check className="w-3.5 h-3.5 text-foreground shrink-0" />}
                </button>
              ))}
            </div>
            <button className="mt-2 w-full h-8 border border-dashed border-border rounded-lg text-[10px] text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
              <Play className="w-3 h-3" />Preview voice sample
            </button>
          </div>

          {/* Language */}
          <div>
            <SectionLabel>Language</SectionLabel>
            <SelectDropdown value={selectedLang} onChange={setSelectedLang} options={languages.map(l => ({ value: l.code, label: l.label }))} />
          </div>

          {/* Retry */}
          <div>
            <SectionLabel>Retry Attempts</SectionLabel>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setRetryAttempts(n)}
                  className={`flex-1 h-9 text-xs font-semibold border rounded-lg transition-colors
                    ${retryAttempts === n ? 'bg-foreground text-background border-foreground' : 'bg-background border-border hover:bg-secondary'}`}>
                  {n}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">Retry after no answer / voicemail, spaced 2h apart.</p>
          </div>

          {/* Calling window */}
          <div>
            <SectionLabel>Calling Window</SectionLabel>
            <div className="flex items-center gap-2">
              <SelectDropdown value={windowStart} onChange={setWindowStart} options={windowHours.map(h => ({ value: h, label: h }))} />
              <span className="text-xs text-muted-foreground shrink-0">to</span>
              <SelectDropdown value={windowEnd} onChange={setWindowEnd} options={windowHours.map(h => ({ value: h, label: h }))} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">Calls placed in the contact's local timezone.</p>
            <div className="flex gap-1 mt-2">
              {['M','T','W','T','F','S','S'].map((d, i) => (
                <button key={i}
                  className={`flex-1 h-7 text-[10px] font-semibold border rounded-lg transition-colors
                    ${i < 5 ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:bg-secondary bg-background'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* DNC toggle */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-secondary/40 rounded-lg">
            <div>
              <p className="text-xs font-medium flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" />DNC list check</p>
              <p className="text-[10px] text-muted-foreground">Skip opted-out contacts</p>
            </div>
            <div className="w-9 h-5 bg-foreground rounded-full relative cursor-pointer shrink-0 shadow-inner">
              <div className="w-3.5 h-3.5 bg-background rounded-full absolute right-0.5 top-0.5 shadow" />
            </div>
          </div>
        </div>

        <div className="p-4 border-t space-y-2 shrink-0">
          <Button className="w-full h-10 gap-2">
            <Sparkles className="w-3.5 h-3.5" />Save Configuration
          </Button>
        </div>
      </div>

      {/* Right: call log + script */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* KPI strip */}
        <div className="px-5 py-3 border-b bg-card/50 shrink-0">
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: PhoneCall,    label: 'Total calls',   value: '8',      sub: 'Last 7 days', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'           },
              { icon: CheckCircle2, label: 'Converted',     value: '5',      sub: '62.5% rate',  color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'},
              { icon: Clock,        label: 'Avg duration',  value: '1m 15s', sub: 'Per call',    color: 'bg-secondary text-muted-foreground'                                       },
              { icon: TrendingUp,   label: 'Revenue attr.', value: '$2,840', sub: 'This week',   color: 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400'     },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div key={label} className="border border-border/60 rounded-xl p-3 bg-card">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <p className="font-extrabold text-xl leading-none">{value}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{label} · {sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Call log — full width */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="flex items-center gap-1 px-4 py-2.5 border-b bg-card/50 shrink-0">
              {(['all', 'Converted', 'Voicemail', 'No answer'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors
                    ${filter === f ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                  {f === 'all' ? 'All calls' : f}
                </button>
              ))}
              <span className="ml-auto text-[11px] font-bold text-foreground">{filtered.length} calls</span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.map(call => {
                const oc = outcomeConfig[call.outcome as keyof typeof outcomeConfig];
                const OIcon = oc.icon;
                return (
                  <div key={call.id} className="flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 text-xs font-bold">
                      {call.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{call.name}</span>
                        <span className="text-[10px] text-muted-foreground truncate">{call.flow}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{call.time} · {call.duration}</div>
                    </div>
                    {call.score > 0 && (
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-14 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${call.score >= 80 ? 'bg-emerald-500' : call.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${call.score}%` }} />
                        </div>
                        <span className={`text-[10px] font-bold w-5 text-right ${call.score >= 80 ? 'text-emerald-600' : call.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{call.score}</span>
                      </div>
                    )}
                    <Badge variant="outline" className={`text-[9px] px-1.5 flex items-center gap-1 shrink-0 ${oc.color}`}>
                      <OIcon className="w-2.5 h-2.5" />{call.outcome}
                    </Badge>
                    <button className="w-6 h-6 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
