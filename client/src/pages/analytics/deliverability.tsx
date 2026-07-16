import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Calendar, Download, ShieldCheck, AlertTriangle, XCircle, TrendingUp, Info } from 'lucide-react';

const trend = [
  { name: 'Jan', delivered: 98.2, bounced: 1.1, spam: 0.04 },
  { name: 'Feb', delivered: 97.9, bounced: 1.4, spam: 0.05 },
  { name: 'Mar', delivered: 98.5, bounced: 0.9, spam: 0.03 },
  { name: 'Apr', delivered: 98.1, bounced: 1.2, spam: 0.06 },
  { name: 'May', delivered: 98.7, bounced: 0.8, spam: 0.03 },
  { name: 'Jun', delivered: 99.1, bounced: 0.6, spam: 0.02 },
  { name: 'Jul', delivered: 98.8, bounced: 0.9, spam: 0.04 },
];

const providers = [
  { name: 'Gmail', delivered: '99.2%', inbox: '96.1%', spam: '0.03%', status: 'good' },
  { name: 'Outlook / Hotmail', delivered: '98.7%', inbox: '94.8%', spam: '0.05%', status: 'good' },
  { name: 'Yahoo / AOL', delivered: '97.9%', inbox: '91.3%', spam: '0.08%', status: 'warn' },
  { name: 'Apple Mail', delivered: '99.4%', inbox: '97.2%', spam: '0.02%', status: 'good' },
  { name: 'Corporate / Other', delivered: '96.8%', inbox: '89.5%', spam: '0.12%', status: 'warn' },
];

const statusConfig = {
  good: { label: 'Good', color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900' },
  warn: { label: 'Review', color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900' },
  bad:  { label: 'Critical', color: 'text-red-600 bg-red-50 border-red-100 dark:bg-red-950/40 dark:border-red-900' },
};

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', borderRadius: '6px', border: '1px solid hsl(var(--border))', fontSize: 12 };

function ReputationMeter({ score }: { score: number }) {
  const pct = `${score}%`;
  const color = score >= 90 ? 'bg-emerald-500' : score >= 70 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Sender Reputation</span>
        <span className="font-semibold text-foreground">{score}/100</span>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: pct }} />
      </div>
    </div>
  );
}

export default function Deliverability() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Deliverability</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Bounce rate, spam complaints, and sender reputation health.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background"><Calendar className="w-3.5 h-3.5 mr-1.5" />Last 7 months</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background"><Download className="w-3.5 h-3.5 mr-1.5" />Export</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Delivery Rate', value: '98.8%', delta: '+0.3%', icon: ShieldCheck, good: true },
          { label: 'Bounce Rate', value: '0.9%', delta: '-0.2%', icon: AlertTriangle, good: true },
          { label: 'Spam Rate', value: '0.04%', delta: '-0.01%', icon: XCircle, good: true },
          { label: 'Sender Score', value: '94 / 100', delta: '+2pts', icon: TrendingUp, good: true },
        ].map(({ label, value, delta, icon: Icon, good }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-foreground" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <p className={`text-xs font-medium mt-1 ${good ? 'text-emerald-600' : 'text-red-500'}`}>{delta} vs prev period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Delivery Rate Over Time</CardTitle>
            <CardDescription className="text-xs">% of emails successfully delivered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="delivGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[96, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v}%`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                  <Area type="monotone" dataKey="delivered" name="Delivered" stroke="hsl(var(--foreground))" strokeWidth={2} fill="url(#delivGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Bounce & Spam Rate</CardTitle>
            <CardDescription className="text-xs">Keep bounce &lt;2% and spam &lt;0.1%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v}%`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                  <Line type="monotone" dataKey="bounced" name="Bounce" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="spam" name="Spam" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-5 mt-2">
              {[{color:'hsl(var(--chart-3))',label:'Bounce Rate'},{color:'hsl(var(--destructive))',label:'Spam Rate',dash:true}].map(l=>(
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-6 h-0.5 shrink-0" style={{backgroundColor:l.color, borderStyle: l.dash?'dashed':'solid'}} />
                  {l.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reputation + Providers */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold">Sender Reputation</CardTitle>
            <CardDescription className="text-xs">Based on domain + IP health signals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <ReputationMeter score={94} />
            <div className="space-y-3">
              {[
                { label: 'DKIM Configured', ok: true },
                { label: 'SPF Record Valid', ok: true },
                { label: 'DMARC Policy Set', ok: true },
                { label: 'Custom Sending Domain', ok: false },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  {ok
                    ? <Badge className="text-[10px] h-4 px-1.5 bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900">✓ Active</Badge>
                    : <Badge variant="outline" className="text-[10px] h-4 px-1.5 text-amber-600">Set up</Badge>
                  }
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Performance by Email Provider</CardTitle>
            <CardDescription className="text-xs">Inbox placement rates across major providers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              <div className="grid grid-cols-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-2">Provider</div>
                <div className="text-right">Delivered</div>
                <div className="text-right">Inbox Rate</div>
                <div className="text-right">Status</div>
              </div>
              {providers.map(p => (
                <div key={p.name} className="grid grid-cols-5 py-3 items-center hover:bg-secondary/20 transition-colors">
                  <div className="col-span-2 text-sm font-medium">{p.name}</div>
                  <div className="text-right text-sm">{p.delivered}</div>
                  <div className="text-right text-sm">{p.inbox}</div>
                  <div className="text-right">
                    <Badge variant="outline" className={`text-[10px] px-2 ${statusConfig[p.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[p.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="border-border/60 bg-secondary/20">
        <CardContent className="p-5 flex items-start gap-3">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Deliverability Tips</p>
            <p>Keep spam complaint rate below 0.1% (Google threshold). Regularly clean bounced contacts and suppress unengaged profiles older than 90 days to protect sender reputation.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
