import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, Shield, User, Settings, Mail, Key, Users, AlertCircle, CheckCircle2, Info } from 'lucide-react';

type EventType = 'auth' | 'settings' | 'campaign' | 'data' | 'billing' | 'api';

const events: { id: number; user: string; email: string; action: string; resource: string; type: EventType; severity: 'info' | 'warn' | 'critical'; ip: string; timestamp: string }[] = [
  { id: 1, user: 'John Doe', email: 'john@acme.com', action: 'Exported subscriber list', resource: 'Subscribers · All', type: 'data', severity: 'info', ip: '192.168.1.14', timestamp: '2026-07-13 14:22:01' },
  { id: 2, user: 'Sarah Lee', email: 'sarah@acme.com', action: 'Changed billing plan', resource: 'Free → Email + SMS', type: 'billing', severity: 'info', ip: '10.0.0.5', timestamp: '2026-07-13 12:14:33' },
  { id: 3, user: 'John Doe', email: 'john@acme.com', action: 'Deleted API key', resource: 'pk_live_8f7d6a5s...', type: 'api', severity: 'warn', ip: '192.168.1.14', timestamp: '2026-07-13 10:08:12' },
  { id: 4, user: 'External IP', email: '—', action: 'Failed login attempt (×3)', resource: 'john@acme.com', type: 'auth', severity: 'critical', ip: '87.245.19.3', timestamp: '2026-07-12 23:41:05' },
  { id: 5, user: 'John Doe', email: 'john@acme.com', action: 'Sent campaign', resource: 'Black Friday Early Access', type: 'campaign', severity: 'info', ip: '192.168.1.14', timestamp: '2026-07-12 11:00:00' },
  { id: 6, user: 'Admin', email: 'admin@acme.com', action: 'Updated org settings', resource: 'DMARC policy changed', type: 'settings', severity: 'warn', ip: '10.0.0.1', timestamp: '2026-07-11 16:30:44' },
  { id: 7, user: 'Sarah Lee', email: 'sarah@acme.com', action: 'Invited team member', resource: 'mark@acme.com', type: 'data', severity: 'info', ip: '10.0.0.5', timestamp: '2026-07-11 09:15:21' },
  { id: 8, user: 'John Doe', email: 'john@acme.com', action: 'Enabled 2FA', resource: 'Account security', type: 'auth', severity: 'info', ip: '192.168.1.14', timestamp: '2026-07-10 14:02:18' },
  { id: 9, user: 'API Client', email: '—', action: 'Bulk profile import via API', resource: '4,820 profiles', type: 'api', severity: 'info', ip: '52.14.80.1', timestamp: '2026-07-10 02:00:00' },
  { id: 10, user: 'John Doe', email: 'john@acme.com', action: 'Deleted segment', resource: '"Inactive 180 days"', type: 'data', severity: 'warn', ip: '192.168.1.14', timestamp: '2026-07-09 17:44:09' },
];

const typeConfig: Record<EventType, { icon: React.ElementType; label: string; color: string }> = {
  auth:     { icon: Shield,   label: 'Auth',     color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900' },
  settings: { icon: Settings, label: 'Settings', color: 'text-muted-foreground bg-secondary border-border' },
  campaign: { icon: Mail,     label: 'Campaign', color: 'text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900' },
  data:     { icon: Users,    label: 'Data',     color: 'text-muted-foreground bg-secondary border-border' },
  billing:  { icon: Info,     label: 'Billing',  color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-900' },
  api:      { icon: Key,      label: 'API',      color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:text-amber-900' },
};

const severityConfig = {
  info:     { icon: CheckCircle2, color: 'text-muted-foreground' },
  warn:     { icon: AlertCircle,  color: 'text-amber-500' },
  critical: { icon: AlertCircle,  color: 'text-red-500' },
};

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = events.filter(e =>
    (filter === 'All' || e.type === filter.toLowerCase() || e.severity === filter.toLowerCase()) &&
    (e.action.toLowerCase().includes(search.toLowerCase()) || e.user.toLowerCase().includes(search.toLowerCase()) || e.resource.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Track every action performed in your account — who changed what and when.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background"><Download className="w-3.5 h-3.5 mr-1.5" />Export Log</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Events Today', value: '48', sub: '+12 vs yesterday' },
          { label: 'Critical Events', value: '1', sub: 'Last 24 hours' },
          { label: 'Active Users', value: '3', sub: 'In last 7 days' },
          { label: 'API Calls', value: '1,240', sub: 'Last 30 days' },
        ].map(({ label, value, sub }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground mb-2">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input className="pl-8 h-8 text-xs bg-background w-60" placeholder="Search actions, users, resources..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Tabs defaultValue="All" onValueChange={setFilter}>
          <TabsList className="bg-secondary/50 h-8 p-0.5">
            {['All', 'auth', 'campaign', 'api', 'data', 'billing', 'critical'].map(t => (
              <TabsTrigger key={t} value={t} className="text-xs h-7 px-3 capitalize">{t}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Log table */}
      <Card className="border-border/60">
        <div className="divide-y divide-border/60">
          <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="col-span-1">Sev.</div>
            <div className="col-span-3">Action</div>
            <div className="col-span-2">Resource</div>
            <div className="col-span-2">User</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-2">IP Address</div>
            <div className="col-span-1 text-right">Time</div>
          </div>
          {filtered.map(e => {
            const tc = typeConfig[e.type];
            const sc = severityConfig[e.severity];
            const SevIcon = sc.icon;
            const TypeIcon = tc.icon;
            return (
              <div key={e.id} className={`grid grid-cols-12 px-5 py-3.5 items-center hover:bg-secondary/20 transition-colors ${e.severity === 'critical' ? 'bg-red-50/30 dark:bg-red-950/10' : ''}`}>
                <div className="col-span-1"><SevIcon className={`w-3.5 h-3.5 ${sc.color}`} /></div>
                <div className="col-span-3 pr-3">
                  <p className="text-xs font-medium leading-tight">{e.action}</p>
                </div>
                <div className="col-span-2 pr-3">
                  <p className="text-xs text-muted-foreground truncate">{e.resource}</p>
                </div>
                <div className="col-span-2 pr-3">
                  <p className="text-xs font-medium truncate">{e.user}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{e.email}</p>
                </div>
                <div className="col-span-1">
                  <Badge variant="outline" className={`text-[9px] px-1.5 flex items-center gap-0.5 w-fit ${tc.color}`}>
                    <TypeIcon className="w-2.5 h-2.5" />{tc.label}
                  </Badge>
                </div>
                <div className="col-span-2 font-mono text-[11px] text-muted-foreground">{e.ip}</div>
                <div className="col-span-1 text-right text-[10px] text-muted-foreground">{e.timestamp.split(' ')[1]}<br /><span className="text-[9px]">{e.timestamp.split(' ')[0]}</span></div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">No events match your filter.</div>
          )}
        </div>
      </Card>
    </div>
  );
}
