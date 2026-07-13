import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, FileText, Globe, MessageCircle, Mail, AlertTriangle, CheckCircle2, Download, Info, ExternalLink } from 'lucide-react';

const regulations = [
  { name: 'GDPR', region: 'European Union', status: 'compliant', score: 94, issues: 1, color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900' },
  { name: 'CAN-SPAM', region: 'United States', status: 'compliant', score: 100, issues: 0, color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-900' },
  { name: 'TCPA', region: 'United States (SMS)', status: 'review', score: 78, issues: 2, color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:text-amber-900' },
  { name: 'CASL', region: 'Canada', status: 'compliant', score: 91, issues: 0, color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-900' },
  { name: 'CCPA', region: 'California', status: 'compliant', score: 88, issues: 1, color: 'text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-950/40 dark:text-violet-900' },
];

const consentRecords = [
  { email: 'sarah@email.com', channel: 'Email', method: 'Double opt-in', source: 'Homepage form', date: '2026-06-12', status: 'active' },
  { email: 'james@email.com', channel: 'SMS', method: 'Keyword opt-in', source: 'SMS Campaign', date: '2026-05-28', status: 'active' },
  { email: 'emma@email.com', channel: 'Email', method: 'Single opt-in', source: 'Checkout', date: '2026-04-02', status: 'withdrawn' },
  { email: 'liam@email.com', channel: 'Email + SMS', method: 'Double opt-in', source: 'Pop-up form', date: '2026-03-15', status: 'active' },
  { email: 'aisha@email.com', channel: 'Email', method: 'Double opt-in', source: 'Welcome flow', date: '2026-02-19', status: 'active' },
];

const checklist = [
  { item: 'Unsubscribe link in all emails', done: true },
  { item: 'Physical mailing address in footer', done: true },
  { item: 'Privacy policy linked in signup forms', done: true },
  { item: 'Double opt-in enabled for new subscribers', done: false },
  { item: 'Data deletion workflow configured', done: true },
  { item: 'SMS opt-out keyword (STOP) active', done: true },
  { item: 'TCPA-compliant SMS consent language', done: false },
  { item: 'DMARC policy configured', done: true },
];

export default function ConsentCompliance() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Consent & Compliance</h1>
          <p className="text-xs text-muted-foreground mt-0.5">GDPR, CAN-SPAM, TCPA opt-in records and suppression management.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background"><Download className="w-3.5 h-3.5 mr-1.5" />Export Report</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setTab}>
        <TabsList className="bg-secondary/50 h-8 p-0.5">
          {['overview', 'records', 'checklist'].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs h-7 px-4 capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {tab === 'overview' && (
        <div className="space-y-6">
          {/* Overall compliance score */}
          <Card className="border-border/60 bg-foreground text-background overflow-hidden">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-background" />
                </div>
                <div>
                  <p className="text-xs text-background/60 mb-1">Overall Compliance Score</p>
                  <p className="text-4xl font-bold">90 <span className="text-xl font-normal text-background/60">/ 100</span></p>
                  <p className="text-sm text-background/70 mt-0.5">3 regulations fully compliant · 2 need review</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs bg-background/10 border-background/20 text-background hover:bg-background/20">View Full Report <ExternalLink className="w-3 h-3 ml-1.5" /></Button>
            </CardContent>
          </Card>

          {/* Per-regulation cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regulations.map(r => (
              <Card key={r.name} className="border-border/60">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{r.name}</p>
                        <Badge variant="outline" className={`text-[10px] px-2 ${r.color}`}>{r.status === 'compliant' ? 'Compliant' : 'Review Needed'}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.region}</p>
                    </div>
                    <span className="text-lg font-bold">{r.score}%</span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={r.score} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground">{r.issues === 0 ? '✓ No issues found' : `${r.issues} issue${r.issues > 1 ? 's' : ''} to resolve`}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Mail, label: 'Email Consent Rate', value: '89.4%', sub: 'of email subscribers', color: 'bg-blue-50 dark:bg-blue-950/20' },
              { icon: MessageCircle, label: 'SMS Consent Rate', value: '94.1%', sub: 'of SMS subscribers', color: 'bg-violet-50 dark:bg-violet-950/20' },
              { icon: Globe, label: 'Data Requests', value: '12', sub: 'processed this quarter', color: 'bg-secondary' },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <Card key={label} className={`border-border/60 ${color}`}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-background/60 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-foreground" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xl font-bold">{value}</p>
                    <p className="text-[10px] text-muted-foreground">{sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === 'records' && (
        <Card className="border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Consent Records</CardTitle><CardDescription className="text-xs">Opt-in history per contact and channel</CardDescription></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/60">
              <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-3">Email</div><div className="col-span-2">Channel</div><div className="col-span-2">Method</div><div className="col-span-2">Source</div><div className="col-span-2">Date</div><div className="col-span-1 text-right">Status</div>
              </div>
              {consentRecords.map(r => (
                <div key={r.email} className="grid grid-cols-12 px-5 py-3.5 items-center hover:bg-secondary/20 transition-colors">
                  <div className="col-span-3 text-xs font-medium truncate pr-3">{r.email}</div>
                  <div className="col-span-2"><span className="text-xs text-muted-foreground">{r.channel}</span></div>
                  <div className="col-span-2"><span className="text-xs text-muted-foreground">{r.method}</span></div>
                  <div className="col-span-2"><span className="text-xs text-muted-foreground">{r.source}</span></div>
                  <div className="col-span-2"><span className="text-xs text-muted-foreground">{r.date}</span></div>
                  <div className="col-span-1 text-right">
                    <Badge variant="outline" className={`text-[10px] px-1.5 ${r.status === 'active' ? 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900' : 'text-muted-foreground bg-secondary border-border'}`}>
                      {r.status === 'active' ? 'Active' : 'Withdrawn'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'checklist' && (
        <Card className="border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Compliance Checklist</CardTitle><CardDescription className="text-xs">Required steps to stay compliant across regulations</CardDescription></CardHeader>
          <CardContent className="space-y-2 pt-2">
            {checklist.map(({ item, done }) => (
              <div key={item} className={`flex items-center gap-3 p-3 rounded-lg border ${done ? 'border-border/60 bg-card' : 'border-amber-200 bg-amber-50/40 dark:border-amber-900 dark:bg-amber-950/10'}`}>
                {done
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                }
                <p className="text-sm flex-1">{item}</p>
                {!done && <Button variant="outline" size="sm" className="text-xs h-7 shrink-0">Fix Now</Button>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
