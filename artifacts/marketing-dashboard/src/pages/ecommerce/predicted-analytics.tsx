import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { Brain, TrendingUp, TrendingDown, Users, DollarSign, Calendar, Search, ArrowUpRight, AlertTriangle, Star } from 'lucide-react';

const segments = [
  { name: 'Champions', count: 4820, clv: 842, churnRisk: 8, nextOrder: 12, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900' },
  { name: 'Loyal Customers', count: 8940, clv: 540, churnRisk: 15, nextOrder: 18, color: 'bg-blue-500', light: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900' },
  { name: 'Potential Loyalists', count: 12400, clv: 280, churnRisk: 28, nextOrder: 22, color: 'bg-violet-500', light: 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900' },
  { name: 'At Risk', count: 6210, clv: 190, churnRisk: 62, nextOrder: 45, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-900' },
  { name: 'Need Attention', count: 3890, clv: 120, churnRisk: 74, nextOrder: 60, color: 'bg-orange-500', light: 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/40 dark:text-orange-900' },
  { name: 'About to Lapse', count: 2140, clv: 85, churnRisk: 88, nextOrder: null, color: 'bg-red-500', light: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/40 dark:text-red-900' },
];

const clvTrend = [
  { month: 'Feb', predicted: 820, actual: 815 },
  { month: 'Mar', predicted: 845, actual: 851 },
  { month: 'Apr', predicted: 870, actual: 862 },
  { month: 'May', predicted: 895, actual: 901 },
  { month: 'Jun', predicted: 920, actual: 918 },
  { month: 'Jul', predicted: 948, actual: null },
  { month: 'Aug', predicted: 975, actual: null },
];

const scatterData = [
  { x: 12, y: 840, z: 4820, name: 'Champions' },
  { x: 22, y: 540, z: 8940, name: 'Loyal' },
  { x: 18, y: 280, z: 12400, name: 'Potential' },
  { x: 45, y: 190, z: 6210, name: 'At Risk' },
  { x: 60, y: 120, z: 3890, name: 'Attention' },
  { x: 90, y: 85, z: 2140, name: 'Lapsing' },
];

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', borderRadius: '6px', border: '1px solid hsl(var(--border))', fontSize: 12 };

const customers = [
  { name: 'Sarah Mitchell', email: 'sarah@email.com', clv: 1840, churnRisk: 12, nextOrder: '~8 days', segment: 'Champions' },
  { name: 'James Carter', email: 'james@email.com', clv: 920, churnRisk: 31, nextOrder: '~19 days', segment: 'Loyal Customers' },
  { name: 'Emma Rodriguez', email: 'emma@email.com', clv: 210, churnRisk: 71, nextOrder: '—', segment: 'At Risk' },
  { name: 'Liam Johnson', email: 'liam@email.com', clv: 1640, churnRisk: 9, nextOrder: '~5 days', segment: 'Champions' },
  { name: 'Aisha Patel', email: 'aisha@email.com', clv: 480, churnRisk: 88, nextOrder: '—', segment: 'About to Lapse' },
];

export default function PredictedAnalytics() {
  const [search, setSearch] = useState('');
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Predicted Analytics</h1>
          <p className="text-xs text-muted-foreground mt-0.5">AI-powered churn risk, predicted next order date, and CLV per segment.</p>
        </div>
        <Badge className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800">
          <Brain className="w-3.5 h-3.5" />AI-Powered · Updated 2h ago
        </Badge>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Avg Predicted CLV', value: '$948', sub: '+$28 vs last month', icon: DollarSign, up: true },
          { label: 'High Churn Risk', value: '6,030', sub: '15.8% of base', icon: AlertTriangle, up: false },
          { label: 'Avg Days to Next Order', value: '24.6', sub: '−1.4 days vs avg', icon: Calendar, up: true },
          { label: 'CLV Prediction Accuracy', value: '94.2%', sub: 'Last 90 days', icon: Brain, up: true },
        ].map(({ label, value, sub, icon: Icon, up }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center"><Icon className="w-3.5 h-3.5 text-foreground" /></div>
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <p className={`text-xs mt-1 font-medium ${up ? 'text-emerald-600' : 'text-red-500'}`}>{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Segment overview + scatter */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 lg:col-span-2">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Customer Segments</CardTitle><CardDescription className="text-xs">RFM-based ML classification</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {segments.map(s => (
              <div key={s.name} className="flex items-center justify-between group cursor-pointer hover:bg-secondary/20 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.color}`} />
                  <div>
                    <p className="text-xs font-medium">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground">{s.count.toLocaleString()} customers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold">${s.clv} CLV</p>
                  <p className={`text-[10px] font-medium ${s.churnRisk > 60 ? 'text-red-500' : s.churnRisk > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{s.churnRisk}% churn</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 lg:col-span-3">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">CLV vs Churn Risk</CardTitle><CardDescription className="text-xs">Bubble size = segment count</CardDescription></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="x" name="Days to churn" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" label={{ value: 'Churn Risk %', position: 'insideBottom', offset: -2, fontSize: 10 }} />
                  <YAxis dataKey="y" name="CLV ($)" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `$${v}`} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} formatter={(v, name) => [name === 'CLV ($)' ? `$${v}` : `${v}%`, name]} />
                  <Scatter data={scatterData} fill="hsl(var(--foreground))" fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CLV trend + customer table */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Predicted CLV Trend</CardTitle><CardDescription className="text-xs">Actual vs model prediction</CardDescription></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clvTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="clvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `$${v}`} domain={[780, 1000]} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v}`, '']} />
                  <Area type="monotone" dataKey="predicted" name="Predicted" stroke="hsl(var(--chart-3))" strokeWidth={2} fill="url(#clvGrad)" strokeDasharray="4 2" dot={false} />
                  <Area type="monotone" dataKey="actual" name="Actual" stroke="hsl(var(--foreground))" strokeWidth={2} fill="none" dot={{ r: 3, fill: 'hsl(var(--foreground))' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div><CardTitle className="text-sm font-semibold">Individual Predictions</CardTitle><CardDescription className="text-xs">Per-customer CLV and churn signals</CardDescription></div>
              <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" /><Input className="pl-7 h-7 text-xs w-44 bg-background" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/60">
              {filtered.map(c => {
                const seg = segments.find(s => s.name === c.segment);
                return (
                  <div key={c.email} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/20 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 text-xs font-semibold">{c.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.email}</p>
                    </div>
                    <div className="text-right shrink-0 space-y-0.5">
                      <p className="text-xs font-semibold">${c.clv.toLocaleString()} CLV</p>
                      <Badge variant="outline" className={`text-[9px] px-1.5 ${seg?.light ?? ''}`}>{c.segment}</Badge>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-xs font-semibold ${c.churnRisk > 60 ? 'text-red-500' : c.churnRisk > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{c.churnRisk}%</p>
                      <p className="text-[10px] text-muted-foreground">churn risk</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
