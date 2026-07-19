import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Info } from 'lucide-react';

const YOU_COLOR     = '#6366f1'; // indigo
const AVG_COLOR     = '#f97316'; // orange
const BAR_COLORS    = ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#14b8a6'];

const industries = ['E-commerce', 'SaaS', 'Agency', 'Healthcare', 'Finance', 'Education'];

const benchmarkData: Record<string, { metric: string; yours: number; industry: number; unit: string }[]> = {
  'E-commerce': [
    { metric: 'Open Rate', yours: 38.4, industry: 32.1, unit: '%' },
    { metric: 'Click Rate', yours: 5.2, industry: 4.8, unit: '%' },
    { metric: 'Conversion Rate', yours: 3.1, industry: 2.6, unit: '%' },
    { metric: 'Unsubscribe Rate', yours: 0.18, industry: 0.22, unit: '%' },
    { metric: 'Revenue / Email', yours: 0.94, industry: 0.71, unit: '$' },
    { metric: 'Bounce Rate', yours: 0.9, industry: 1.4, unit: '%' },
  ],
  'SaaS': [
    { metric: 'Open Rate', yours: 38.4, industry: 28.6, unit: '%' },
    { metric: 'Click Rate', yours: 5.2, industry: 3.9, unit: '%' },
    { metric: 'Conversion Rate', yours: 3.1, industry: 2.1, unit: '%' },
    { metric: 'Unsubscribe Rate', yours: 0.18, industry: 0.19, unit: '%' },
    { metric: 'Revenue / Email', yours: 0.94, industry: 0.52, unit: '$' },
    { metric: 'Bounce Rate', yours: 0.9, industry: 1.1, unit: '%' },
  ],
};

const radarData = [
  { subject: 'Open Rate', you: 88, avg: 70 },
  { subject: 'Click Rate', you: 82, avg: 65 },
  { subject: 'Conversion', you: 79, avg: 62 },
  { subject: 'Deliverability', you: 95, avg: 88 },
  { subject: 'Engagement', you: 73, avg: 60 },
  { subject: 'Revenue/Email', you: 91, avg: 72 },
];

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', borderRadius: '6px', border: '1px solid hsl(var(--border))', fontSize: 12 };

export default function Benchmarks() {
  const [industry, setIndustry] = useState('E-commerce');
  const data = benchmarkData[industry] ?? benchmarkData['E-commerce'];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Benchmarks</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Compare your performance against industry averages.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {industries.map(i => (
            <button key={i} onClick={() => setIndustry(i)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${industry === i ? 'bg-foreground text-background border-foreground' : 'bg-background border-border text-muted-foreground hover:border-foreground/30'}`}>
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Score banner */}
      <Card className="border-border/60 bg-foreground text-background">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-7 h-7 text-background" />
            </div>
            <div>
              <p className="text-xs text-background/60 mb-1">Overall Benchmark Score</p>
              <p className="text-4xl font-bold tracking-tight">84 <span className="text-xl font-normal text-background/60">/ 100</span></p>
              <p className="text-sm text-background/70 mt-0.5">You're outperforming <span className="font-semibold text-background">73%</span> of {industry} senders</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-background/70">5 metrics above average</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-background/70">1 metric needs attention</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Radar */}
        <Card className="border-border/60 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Performance Radar</CardTitle>
            <CardDescription className="text-xs">You vs {industry} average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Radar name="You" dataKey="you" stroke={YOU_COLOR} fill={YOU_COLOR} fillOpacity={0.25} strokeWidth={2.5} dot={{ r: 3, fill: YOU_COLOR }} />
                  <Radar name="Industry" dataKey="avg" stroke={AVG_COLOR} fill={AVG_COLOR} fillOpacity={0.12} strokeWidth={2} strokeDasharray="4 2" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}`, '']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 inline-block rounded-full" style={{ backgroundColor: YOU_COLOR }} /> You
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 inline-block rounded-full" style={{ backgroundColor: AVG_COLOR }} /> {industry} Avg
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric breakdown */}
        <Card className="border-border/60 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Metric by Metric</CardTitle>
            <CardDescription className="text-xs">Your stats vs {industry} industry averages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.map((d, i) => ({ name: d.metric, You: d.yours, Average: d.industry, color: BAR_COLORS[i % BAR_COLORS.length] }))} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <defs>
                    {BAR_COLORS.map((color, i) => (
                      <linearGradient key={i} id={`bmGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={1} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="You" radius={[3,3,0,0]} maxBarSize={24}>
                    {data.map((_, i) => (
                      <Cell key={i} fill={`url(#bmGrad${i % BAR_COLORS.length})`} />
                    ))}
                  </Bar>
                  <Bar dataKey="Average" fill="#e2e8f0" radius={[3,3,0,0]} maxBarSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} /> You
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block bg-slate-200" /> {industry} Avg
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail table */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/60">
            <div className="grid grid-cols-4 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div>Metric</div><div className="text-right">Your Rate</div><div className="text-right">Industry Avg</div><div className="text-right">Difference</div>
            </div>
            {data.map(row => {
              const diff = row.yours - row.industry;
              const better = row.metric === 'Unsubscribe Rate' || row.metric === 'Bounce Rate' ? diff < 0 : diff > 0;
              return (
                <div key={row.metric} className="grid grid-cols-4 px-5 py-3.5 items-center hover:bg-secondary/20 transition-colors">
                  <div className="text-sm font-medium">{row.metric}</div>
                  <div className="text-right text-sm font-semibold">{row.unit === '$' ? '$' : ''}{row.yours}{row.unit === '%' ? '%' : ''}</div>
                  <div className="text-right text-sm text-muted-foreground">{row.unit === '$' ? '$' : ''}{row.industry}{row.unit === '%' ? '%' : ''}</div>
                  <div className={`text-right text-xs font-semibold flex items-center justify-end gap-0.5 ${better ? 'text-emerald-600' : 'text-red-500'}`}>
                    {better ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {diff > 0 ? '+' : ''}{row.unit === '$' ? '$' : ''}{diff.toFixed(2)}{row.unit === '%' ? '%' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
