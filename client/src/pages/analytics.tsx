import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  CartesianGrid, ComposedChart, Line, Cell,
} from 'recharts';
import { revenueTrend, geographicAudience } from '@/lib/mock-data';
import { Download, Calendar } from 'lucide-react';

// Vibrant colors for each bar in Revenue vs Orders
const BAR_COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6',
  '#06b6d4', '#84cc16',
];

// Colors for geographic distribution
const GEO_COLORS = [
  '#6366f1', '#3b82f6', '#22c55e', '#f97316', '#ec4899', '#8b5cf6',
];

export default function Analytics() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your marketing performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-background">
            <Calendar className="w-4 h-4 mr-2" />
            Last 12 Months
          </Button>
          <Button variant="outline" className="bg-background">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Total Revenue</div>
            <div className="text-3xl font-bold">$985,420</div>
            <div className="text-sm text-foreground font-medium mt-1">+14.2% vs prev period</div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Avg Order Value</div>
            <div className="text-3xl font-bold">$112.50</div>
            <div className="text-sm text-foreground font-medium mt-1">+2.4% vs prev period</div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Email ROI</div>
            <div className="text-3xl font-bold">34x</div>
            <div className="text-sm text-foreground font-medium mt-1">+1.1x vs prev period</div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Active Subscribers</div>
            <div className="text-3xl font-bold">124.5k</div>
            <div className="text-sm text-muted-foreground mt-1">+4.2k this month</div>
          </CardContent>
        </Card>
        <Card className="border-border/60 hidden xl:block bg-secondary/30">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <Button className="w-full bg-foreground text-background">Generate Report</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Revenue vs Orders Correlation</CardTitle>
          <CardDescription>Monthly breakdown of revenue and order volume.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueTrend} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <defs>
                  {BAR_COLORS.map((color, i) => (
                    <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '10px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar yAxisId="right" dataKey="orders" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {revenueTrend.map((_, i) => (
                    <Cell key={i} fill={`url(#barGrad${i})`} />
                  ))}
                </Bar>
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ r: 5, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Where your converting audience lives.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geographicAudience} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    {GEO_COLORS.map((color, i) => (
                      <linearGradient key={i} id={`geoGrad${i}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.5} />
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    stroke="hsl(var(--foreground))"
                    width={115}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--secondary))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '10px', border: '1px solid hsl(var(--border))' }}
                    formatter={(v: number) => [`${v}%`, 'Share']}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {geographicAudience.map((_, i) => (
                      <Cell key={i} fill={`url(#geoGrad${i})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
            <CardDescription>By attributed revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Black Friday Early Access', rev: 124500, rate: '4.2%' },
                { name: 'Flash Sale - 24 Hours Only', rev: 89000, rate: '3.8%' },
                { name: 'Holiday Gift Guide', rev: 56200, rate: '2.9%' },
                { name: 'Summer Collection Launch', rev: 45000, rate: '2.5%' },
                { name: 'VIP Exclusive Weekend', rev: 32400, rate: '4.8%' },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Conv. Rate: {c.rate}</div>
                  </div>
                  <div className="font-bold">${c.rev.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
