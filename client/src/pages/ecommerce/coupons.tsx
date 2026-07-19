import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Copy, Tag, Percent, DollarSign, CheckCircle2, Clock, XCircle, Search, Zap } from 'lucide-react';

const coupons = [
  { code: 'WELCOME20', type: 'percent', value: 20, uses: 842, limit: 1000, revenue: 18640, expires: '2026-12-31', status: 'active', channels: ['Email', 'SMS'] },
  { code: 'BLACKFRI50', type: 'percent', value: 50, uses: 5120, limit: 5120, revenue: 142800, expires: '2025-11-30', status: 'expired', channels: ['Email'] },
  { code: 'SAVE15NOW', type: 'percent', value: 15, uses: 231, limit: 500, revenue: 9240, expires: '2026-08-31', status: 'active', channels: ['SMS'] },
  { code: 'FREESHIP', type: 'shipping', value: 0, uses: 1840, limit: null, revenue: 73600, expires: null, status: 'active', channels: ['Email', 'SMS'] },
  { code: 'VIP30OFF', type: 'percent', value: 30, uses: 98, limit: 200, revenue: 8820, expires: '2026-09-15', status: 'active', channels: ['Email'] },
  { code: 'FLAT10', type: 'fixed', value: 10, uses: 560, limit: null, revenue: 22400, expires: '2026-10-01', status: 'paused', channels: ['Email'] },
];

const statusConfig = {
  active:  { label: 'Active',  icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900' },
  expired: { label: 'Expired', icon: XCircle,      color: 'text-muted-foreground bg-secondary border-border' },
  paused:  { label: 'Paused',  icon: Clock,        color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900' },
};

function CouponTypePill({ type }: { type: string }) {
  if (type === 'percent')  return <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900"><Percent className="w-2.5 h-2.5" />Percent</span>;
  if (type === 'fixed')    return <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950/40 dark:text-blue-900"><DollarSign className="w-2.5 h-2.5" />Fixed</span>;
  return <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border"><Zap className="w-2.5 h-2.5" />Shipping</span>;
}

export default function Coupons() {
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase()));

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Coupons</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Generate and manage discount codes for email and SMS campaigns.</p>
        </div>
        <Button size="sm" className="h-8 text-xs" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />Create Coupon
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Coupons',      value: '4',        sub: '2 paused / expired',     colored: true,  bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800', lCls: 'text-violet-600 dark:text-violet-400', vCls: 'text-violet-900 dark:text-violet-200' },
          { label: 'Total Redemptions',   value: '8,691',    sub: 'All time',               colored: true,  bg: 'bg-blue-50 dark:bg-blue-950/30',    border: 'border-blue-200 dark:border-blue-800',    lCls: 'text-blue-600 dark:text-blue-400',    vCls: 'text-blue-900 dark:text-blue-200'    },
          { label: 'Revenue Attributed',  value: '$275,500', sub: 'From coupon orders',     colored: true,  bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', lCls: 'text-emerald-600 dark:text-emerald-400', vCls: 'text-emerald-900 dark:text-emerald-200' },
          { label: 'Avg Discount',        value: '23%',      sub: 'Across active coupons',  colored: false },
        ].map(({ label, value, sub, colored, bg, border, lCls, vCls }: any) => (
          <Card key={label} className={`border ${colored ? `${bg} ${border}` : 'border-border/60'}`}>
            <CardContent className="p-5">
              <p className={`text-xs font-medium mb-2 ${colored ? lCls : 'text-muted-foreground'}`}>{label}</p>
              <p className={`text-2xl font-bold ${colored ? vCls : ''}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create form */}
      {showCreate && (
        <Card className="border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold">Create New Coupon</CardTitle>
            <CardDescription className="text-xs">Configure your discount code settings.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Coupon Code</Label>
              <Input className="h-8 text-xs font-mono uppercase" placeholder="e.g. SUMMER25" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Discount Type</Label>
              <select className="flex h-8 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Percentage Off</option>
                <option>Fixed Amount Off</option>
                <option>Free Shipping</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Discount Value</Label>
              <Input className="h-8 text-xs" placeholder="e.g. 20" type="number" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Usage Limit</Label>
              <Input className="h-8 text-xs" placeholder="Unlimited" type="number" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Expiry Date</Label>
              <Input className="h-8 text-xs" type="date" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Channels</Label>
              <select className="flex h-8 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Email + SMS</option><option>Email Only</option><option>SMS Only</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button size="sm" className="text-xs h-8">Create Coupon</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search + Table */}
      <div className="space-y-3">
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input className="pl-8 h-8 text-xs bg-background" placeholder="Search codes..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <Card className="border-border/60">
          <div className="divide-y divide-border/60">
            <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-3">Code</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-1 text-right">Value</div>
              <div className="col-span-2 text-right">Uses</div>
              <div className="col-span-2 text-right">Revenue</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            {filtered.map(c => {
              const sc = statusConfig[c.status as keyof typeof statusConfig];
              const usePct = c.limit ? Math.round((c.uses / c.limit) * 100) : null;
              return (
                <div key={c.code} className="grid grid-cols-12 px-5 py-4 items-center hover:bg-secondary/20 transition-colors">
                  <div className="col-span-3 flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center shrink-0"><Tag className="w-3.5 h-3.5 text-foreground" /></div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-mono font-semibold truncate">{c.code}</p>
                        <button onClick={() => handleCopy(c.code)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                          {copied === c.code ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <div className="flex gap-1 mt-0.5 flex-wrap">
                        {c.channels.map(ch => <span key={ch} className="text-[9px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{ch}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2"><CouponTypePill type={c.type} /></div>
                  <div className="col-span-1 text-right text-sm font-semibold">
                    {c.type === 'percent' ? `${c.value}%` : c.type === 'fixed' ? `$${c.value}` : 'Free'}
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-sm">{c.uses.toLocaleString()}{c.limit ? ` / ${c.limit.toLocaleString()}` : ''}</p>
                    {usePct !== null && (
                      <div className="mt-1 h-1 bg-secondary rounded-full overflow-hidden w-16 ml-auto">
                        <div className={`h-full rounded-full ${usePct >= 90 ? 'bg-amber-500' : 'bg-foreground'}`} style={{ width: `${usePct}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 text-right text-sm font-semibold">${c.revenue.toLocaleString()}</div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-2">
                    <Badge variant="outline" className={`text-[10px] px-2 flex items-center gap-1 ${sc.color}`}>
                      <sc.icon className="w-2.5 h-2.5" />{sc.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
