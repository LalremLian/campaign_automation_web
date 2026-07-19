import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign, Zap, Megaphone, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const monthlyAttribution = [
  { name: 'Jan', flows: 42000, campaigns: 28000, forms: 8000 },
  { name: 'Feb', flows: 38000, campaigns: 32000, forms: 7500 },
  { name: 'Mar', flows: 51000, campaigns: 41000, forms: 9200 },
  { name: 'Apr', flows: 47000, campaigns: 38000, forms: 8800 },
  { name: 'May', flows: 63000, campaigns: 52000, forms: 11000 },
  { name: 'Jun', flows: 71000, campaigns: 59000, forms: 13500 },
  { name: 'Jul', flows: 68000, campaigns: 55000, forms: 12800 },
];

const topFlows = [
  { name: 'Welcome Series', revenue: 89400, orders: 712, cvr: '4.8%', trend: 'up', delta: '+12%' },
  { name: 'Abandoned Cart', revenue: 124500, orders: 1043, cvr: '6.2%', trend: 'up', delta: '+8%' },
  { name: 'Post-Purchase', revenue: 56200, orders: 489, cvr: '3.1%', trend: 'down', delta: '-2%' },
  { name: 'Win-back', revenue: 34800, orders: 276, cvr: '2.4%', trend: 'up', delta: '+5%' },
  { name: 'Browse Abandon', revenue: 28100, orders: 231, cvr: '1.9%', trend: 'up', delta: '+19%' },
];

const topCampaigns = [
  { name: 'Black Friday Early Access', revenue: 124500, opens: '41%', clicks: '7.2%', trend: 'up', delta: '+22%' },
  { name: 'Flash Sale – 24hrs', revenue: 89000, opens: '38%', clicks: '6.8%', trend: 'up', delta: '+14%' },
  { name: 'Holiday Gift Guide', revenue: 56200, opens: '29%', clicks: '4.1%', trend: 'down', delta: '-3%' },
  { name: 'Summer Collection Drop', revenue: 45000, opens: '25%', clicks: '3.9%', trend: 'up', delta: '+7%' },
  { name: 'VIP Exclusive Weekend', revenue: 32400, opens: '48%', clicks: '9.3%', trend: 'up', delta: '+31%' },
];

const pieData = [
  { name: 'Flows', value: 52 },
  { name: 'Campaigns', value: 37 },
  { name: 'Forms', value: 11 },
];
const PIE_COLORS = ['#6366f1', '#f97316', '#22c55e'];

// Colors for stacked bar segments
const BAR_SOURCE_COLORS = {
  flows:     '#6366f1',
  campaigns: '#f97316',
  forms:     '#22c55e',
};

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', borderRadius: '6px', border: '1px solid hsl(var(--border))', fontSize: 12 };

export default function RevenueAttribution() {
  const [source, setSource] = useState('All');

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Revenue Attribution</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Which flows and campaigns are actually driving revenue.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background">
            <Calendar className="w-3.5 h-3.5 mr-1.5" /> Last 7 months
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Attributed Revenue', value: '$985,420', delta: '+14.2%', up: true, icon: DollarSign },
          { label: 'Revenue from Flows', value: '$512,600', delta: '+18.7%', up: true, icon: Zap },
          { label: 'Revenue from Campaigns', value: '$394,800', delta: '+9.1%', up: true, icon: Megaphone },
          { label: 'Avg Revenue / Email', value: '$0.94', delta: '+0.07', up: true, icon: TrendingUp },
        ].map(({ label, value, delta, up, icon: Icon }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-foreground" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <p className={`text-xs font-medium mt-1 flex items-center gap-0.5 ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{delta} vs prev period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Monthly Revenue by Source</CardTitle>
            <CardDescription className="text-xs">Flows vs Campaigns vs Forms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAttribution} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                  <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                  <Bar dataKey="flows" name="Flows" stackId="a" fill={BAR_SOURCE_COLORS.flows} radius={[0,0,0,0]} maxBarSize={36} />
                  <Bar dataKey="campaigns" name="Campaigns" stackId="a" fill={BAR_SOURCE_COLORS.campaigns} maxBarSize={36} />
                  <Bar dataKey="forms" name="Forms" stackId="a" fill={BAR_SOURCE_COLORS.forms} radius={[4,4,0,0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-5 mt-3">
              {[
                { color: BAR_SOURCE_COLORS.flows,     label: 'Flows' },
                { color: BAR_SOURCE_COLORS.campaigns, label: 'Campaigns' },
                { color: BAR_SOURCE_COLORS.forms,     label: 'Forms' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Revenue Share</CardTitle>
            <CardDescription className="text-xs">Breakdown by source type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {PIE_COLORS.map((color, i) => (
                      <linearGradient key={i} id={`pieGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={1} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={`url(#pieGrad${i})`} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Source tabs + tables */}
      <div className="space-y-4">
        <Tabs defaultValue="flows" onValueChange={setSource}>
          <TabsList className="bg-secondary/50 h-8 p-0.5">
            {['flows', 'campaigns'].map(t => (
              <TabsTrigger key={t} value={t} className="text-xs h-7 px-4 capitalize">{t}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Card className="border-border/60">
          <div className="divide-y divide-border/60">
            <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-4">Name</div>
              <div className="col-span-2 text-right">Revenue</div>
              <div className="col-span-2 text-right">Orders</div>
              <div className="col-span-2 text-right">{source === 'campaigns' ? 'Opens' : 'CVR'}</div>
              <div className="col-span-2 text-right">vs prev</div>
            </div>
            {(source === 'campaigns' ? topCampaigns : topFlows).map((row: any, i) => (
              <div key={i} className="grid grid-cols-12 px-5 py-3.5 hover:bg-secondary/20 transition-colors items-center">
                <div className="col-span-4">
                  <p className="text-sm font-medium truncate pr-4">{row.name}</p>
                </div>
                <div className="col-span-2 text-right text-sm font-semibold">${row.revenue.toLocaleString()}</div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">{row.orders ?? '—'}</div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">{row.cvr ?? row.opens}</div>
                <div className={`col-span-2 text-right text-xs font-semibold flex items-center justify-end gap-0.5 ${row.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {row.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {row.delta}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
