import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { FlaskConical, TrendingUp, Trophy, ArrowUpRight, Plus, Calendar, CheckCircle2, Clock, Archive } from 'lucide-react';

const tests = [
  {
    id: 1, name: 'Subject Line — Emoji vs No Emoji', campaign: 'Flash Sale – 24hrs',
    status: 'completed', winner: 'A', confidence: 97,
    variants: [
      { label: 'A', desc: '🔥 24-Hour Flash Sale – Don\'t Miss It', opens: 41.2, clicks: 7.8, revenue: 52400, sent: 12000 },
      { label: 'B', desc: '24-Hour Flash Sale – Don\'t Miss It', opens: 33.5, clicks: 5.9, revenue: 38100, sent: 12000 },
    ],
  },
  {
    id: 2, name: 'Send Time — Morning vs Evening', campaign: 'Welcome Series',
    status: 'completed', winner: 'B', confidence: 91,
    variants: [
      { label: 'A', desc: 'Send at 9:00 AM', opens: 28.4, clicks: 4.1, revenue: 18900, sent: 8500 },
      { label: 'B', desc: 'Send at 7:00 PM', opens: 36.7, clicks: 5.9, revenue: 24600, sent: 8500 },
    ],
  },
  {
    id: 3, name: 'CTA Button Color — Black vs Blue', campaign: 'Abandoned Cart',
    status: 'running', winner: null, confidence: 62,
    variants: [
      { label: 'A', desc: 'Black CTA button', opens: 38.1, clicks: 6.2, revenue: 21800, sent: 5200 },
      { label: 'B', desc: 'Blue CTA button', opens: 37.4, clicks: 5.8, revenue: 20100, sent: 5200 },
    ],
  },
  {
    id: 4, name: 'Personalization — First Name vs None', campaign: 'Post-Purchase',
    status: 'draft', winner: null, confidence: null,
    variants: [
      { label: 'A', desc: 'Hi {{first_name}}, your order is ready!', opens: 0, clicks: 0, revenue: 0, sent: 0 },
      { label: 'B', desc: 'Your order is ready!', opens: 0, clicks: 0, revenue: 0, sent: 0 },
    ],
  },
];

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900' },
  running:   { label: 'Running',   icon: Clock, color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900' },
  draft:     { label: 'Draft',     icon: Archive, color: 'text-muted-foreground bg-secondary border-border' },
};

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', borderRadius: '6px', border: '1px solid hsl(var(--border))', fontSize: 12 };

function ConfidenceMeter({ score }: { score: number }) {
  const color = score >= 95 ? 'bg-emerald-500' : score >= 80 ? 'bg-amber-500' : 'bg-secondary';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Statistical Confidence</span><span className="font-semibold text-foreground">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-[10px] text-muted-foreground">{score >= 95 ? '✓ Statistically significant' : score >= 80 ? 'Almost significant — keep running' : 'More data needed'}</p>
    </div>
  );
}

export default function ABTests() {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? tests : tests.filter(t => t.status === filter.toLowerCase());

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">A/B Test Results</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Review split test outcomes and winning variants.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-8 text-xs"><Plus className="w-3.5 h-3.5 mr-1.5" />New Test</Button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Tests Run', value: '24', sub: 'All time' },
          { label: 'Completed', value: '18', sub: 'With winner' },
          { label: 'Running Now', value: '4', sub: 'Active tests' },
          { label: 'Avg Lift', value: '+18.4%', sub: 'Open rate improvement' },
        ].map(({ label, value, sub }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground mb-2">{label}</p>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <Tabs defaultValue="All" onValueChange={setFilter}>
        <TabsList className="bg-secondary/50 h-8 p-0.5">
          {['All', 'Completed', 'Running', 'Draft'].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs h-7 px-4">{t}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Test cards */}
      <div className="space-y-5">
        {visible.map(test => {
          const sc = statusConfig[test.status as keyof typeof statusConfig];
          const StatusIcon = sc.icon;
          const chartData = test.variants.map(v => ({ name: `Variant ${v.label}`, opens: v.opens, clicks: v.clicks }));
          return (
            <Card key={test.id} className="border-border/60 overflow-hidden">
              <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 bg-secondary/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <FlaskConical className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{test.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Campaign: {test.campaign}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {test.winner && (
                    <Badge className="text-[10px] bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900">
                      <Trophy className="w-2.5 h-2.5 mr-1" />Variant {test.winner} wins
                    </Badge>
                  )}
                  <Badge variant="outline" className={`text-[10px] px-2 flex items-center gap-1 ${sc.color}`}>
                    <StatusIcon className="w-2.5 h-2.5" />{sc.label}
                  </Badge>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Variants */}
                <div className="lg:col-span-2 space-y-3">
                  {test.variants.map(v => (
                    <div key={v.label} className={`rounded-lg border p-4 ${test.winner === v.label ? 'border-foreground bg-secondary/10' : 'border-border/60'}`}>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${test.winner === v.label ? 'bg-foreground text-background' : 'bg-secondary text-foreground'}`}>{v.label}</span>
                          <p className="text-xs text-muted-foreground truncate max-w-[240px]">{v.desc}</p>
                        </div>
                        {test.winner === v.label && <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { label: 'Open Rate', value: v.opens > 0 ? `${v.opens}%` : '—' },
                          { label: 'Click Rate', value: v.clicks > 0 ? `${v.clicks}%` : '—' },
                          { label: 'Revenue', value: v.revenue > 0 ? `$${v.revenue.toLocaleString()}` : '—' },
                          { label: 'Sent', value: v.sent > 0 ? v.sent.toLocaleString() : '—' },
                        ].map(m => (
                          <div key={m.label}>
                            <p className="text-[10px] text-muted-foreground">{m.label}</p>
                            <p className="text-sm font-semibold mt-0.5">{m.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart + confidence */}
                <div className="space-y-4">
                  {test.status !== 'draft' && (
                    <>
                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                            <Bar dataKey="opens" name="Open Rate" radius={[3,3,0,0]} maxBarSize={32}>
                              {chartData.map((_, i) => <Cell key={i} fill={i === (test.winner ? test.winner.charCodeAt(0)-65 : -1) ? 'hsl(var(--foreground))' : 'hsl(var(--chart-4))'} />)}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <ConfidenceMeter score={test.confidence ?? 0} />
                    </>
                  )}
                  {test.status === 'draft' && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <FlaskConical className="w-8 h-8 text-muted-foreground/30 mx-auto" />
                        <p className="text-xs text-muted-foreground">Test not started yet</p>
                        <Button variant="outline" size="sm" className="text-xs h-7">Launch Test</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
