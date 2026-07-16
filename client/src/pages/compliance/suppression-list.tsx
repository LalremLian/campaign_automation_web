import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Upload, Download, XCircle, AlertCircle, UserX, Trash2, RefreshCw, Plus } from 'lucide-react';

type SupReason = 'unsubscribed' | 'bounced' | 'spam' | 'manual';

const suppressedContacts: { email: string; reason: SupReason; channel: string; date: string; source: string; canRestore: boolean }[] = [
  { email: 'john.smith@example.com', reason: 'unsubscribed', channel: 'Email', date: '2026-07-10', source: 'Email footer link', canRestore: false },
  { email: 'lisa.m@company.org', reason: 'bounced', channel: 'Email', date: '2026-07-08', source: 'Hard bounce', canRestore: true },
  { email: '+14155552671', reason: 'spam', channel: 'SMS', date: '2026-07-05', source: 'Carrier complaint', canRestore: false },
  { email: 'noreply@auto.io', reason: 'bounced', channel: 'Email', date: '2026-07-01', source: 'Soft bounce (×5)', canRestore: true },
  { email: 'mark.p@mail.com', reason: 'unsubscribed', channel: 'Email + SMS', date: '2026-06-28', source: 'Preference center', canRestore: false },
  { email: 'anna@coldmail.ru', reason: 'spam', channel: 'Email', date: '2026-06-20', source: 'Spam complaint', canRestore: false },
  { email: '+14085559234', reason: 'manual', channel: 'SMS', date: '2026-06-18', source: 'Manually added', canRestore: true },
  { email: 'robot@scraper.net', reason: 'manual', channel: 'Email', date: '2026-06-10', source: 'Admin import', canRestore: true },
];

const reasonConfig: Record<SupReason, { label: string; color: string; icon: React.ElementType }> = {
  unsubscribed: { label: 'Unsubscribed', color: 'text-muted-foreground bg-secondary border-border', icon: UserX },
  bounced:      { label: 'Bounced',      color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900', icon: AlertCircle },
  spam:         { label: 'Spam Report',  color: 'text-red-600 bg-red-50 border-red-100 dark:bg-red-950/40 dark:border-red-900', icon: XCircle },
  manual:       { label: 'Manual',       color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900', icon: UserX },
};

export default function SuppressionList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = suppressedContacts.filter(c =>
    (filter === 'All' || c.reason === filter.toLowerCase()) &&
    (c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Suppression List</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Unsubscribed, bounced, and spam-reported contacts — never messaged again.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background"><Upload className="w-3.5 h-3.5 mr-1.5" />Import</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background"><Download className="w-3.5 h-3.5 mr-1.5" />Export</Button>
          <Button size="sm" className="h-8 text-xs"><Plus className="w-3.5 h-3.5 mr-1.5" />Add Email</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Suppressed', value: '3,842', sub: 'Across all channels', icon: UserX },
          { label: 'Unsubscribed', value: '2,190', sub: '57% of suppressed', icon: UserX },
          { label: 'Hard Bounced', value: '1,024', sub: '27% of suppressed', icon: AlertCircle },
          { label: 'Spam Reports', value: '628', sub: '16% of suppressed', icon: XCircle },
        ].map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center"><Icon className="w-3.5 h-3.5 text-foreground" /></div>
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Warning banner */}
      <Card className="border-amber-200 bg-amber-50/40 dark:border-amber-900 dark:bg-amber-950/10">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-xs space-y-0.5">
            <p className="font-semibold text-foreground">Suppressed contacts are permanently excluded from all sends.</p>
            <p className="text-muted-foreground">Re-adding an unsubscribed contact without their explicit re-consent may violate CAN-SPAM and GDPR. Only restore bounced contacts after verifying the address.</p>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar + table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input className="pl-8 h-8 text-xs bg-background w-60" placeholder="Search email or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Tabs defaultValue="All" onValueChange={setFilter}>
            <TabsList className="bg-secondary/50 h-8 p-0.5">
              {['All', 'unsubscribed', 'bounced', 'spam', 'manual'].map(t => (
                <TabsTrigger key={t} value={t} className="text-xs h-7 px-3 capitalize">{t}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Card className="border-border/60">
          <div className="divide-y divide-border/60">
            <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-4">Contact</div>
              <div className="col-span-2">Channel</div>
              <div className="col-span-2">Reason</div>
              <div className="col-span-2">Source</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            {filtered.map(c => {
              const rc = reasonConfig[c.reason];
              const RIcon = rc.icon;
              return (
                <div key={c.email + c.date} className="grid grid-cols-12 px-5 py-3.5 items-center hover:bg-secondary/20 transition-colors">
                  <div className="col-span-4 flex items-center gap-2.5 min-w-0 pr-3">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <UserX className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-medium truncate">{c.email}</p>
                  </div>
                  <div className="col-span-2 text-xs text-muted-foreground">{c.channel}</div>
                  <div className="col-span-2">
                    <Badge variant="outline" className={`text-[10px] px-1.5 flex items-center gap-1 w-fit ${rc.color}`}>
                      <RIcon className="w-2.5 h-2.5" />{rc.label}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-xs text-muted-foreground">{c.source}</div>
                  <div className="col-span-1 text-xs text-muted-foreground">{c.date.slice(5)}</div>
                  <div className="col-span-1 flex items-center justify-end gap-1">
                    {c.canRestore && (
                      <button className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Restore">
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    )}
                    <button className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-muted-foreground hover:text-red-500" title="Delete record">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-5 py-10 text-center text-sm text-muted-foreground">No suppressed contacts match your search.</div>
            )}
          </div>
        </Card>
        <p className="text-xs text-muted-foreground">Showing {filtered.length} of {suppressedContacts.length} suppressed contacts</p>
      </div>
    </div>
  );
}
