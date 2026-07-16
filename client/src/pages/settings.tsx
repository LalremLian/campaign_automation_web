import React, { useState, useEffect } from 'react';
import { useSearch } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User, Building2, Users, CreditCard, Key, HelpCircle,
  MessageSquare, Check, Zap, Mail, MessageCircle, Sparkles,
  ChevronRight, ExternalLink, BookOpen, Video, FileText,
  Search, ArrowRight, Phone, Clock, Star, Globe, Bell,
  Shield, Palette, Webhook, LogOut,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type TopTab = 'general' | 'billing' | 'email' | 'sms' | 'whatsapp' | 'push' | 'data' | 'other';

interface SubItem { id: string; label: string; }

const topTabs: { id: TopTab; label: string }[] = [
  { id: 'general',   label: 'General' },
  { id: 'billing',   label: 'Billing' },
  { id: 'email',     label: 'Email' },
  { id: 'sms',       label: 'Text message' },
  { id: 'whatsapp',  label: 'WhatsApp' },
  { id: 'push',      label: 'Push notifications' },
  { id: 'data',      label: 'Data' },
  { id: 'other',     label: 'Other' },
];

const subNavMap: Record<TopTab, SubItem[]> = {
  general: [
    { id: 'personal',    label: 'Personal' },
    { id: 'account',     label: 'Account' },
    { id: 'users',       label: 'Users' },
    { id: 'messaging',   label: 'Messaging' },
    { id: 'domains',     label: 'Domains' },
    { id: 'api',         label: 'API keys' },
    { id: 'activity',    label: 'Activity log' },
    { id: 'security',    label: 'Security' },
    { id: 'tags',        label: 'Tags' },
    { id: 'appearance',  label: 'Appearance' },
  ],
  billing: [
    { id: 'plans',       label: 'Plans & pricing' },
    { id: 'payment',     label: 'Payment methods' },
    { id: 'invoices',    label: 'Invoices' },
    { id: 'usage',       label: 'Usage' },
  ],
  email: [
    { id: 'sending',     label: 'Sending domains' },
    { id: 'templates',   label: 'Default templates' },
    { id: 'unsubscribe', label: 'Unsubscribe page' },
    { id: 'deliverability', label: 'Deliverability' },
  ],
  sms: [
    { id: 'sms_numbers', label: 'Phone numbers' },
    { id: 'sms_opt_out', label: 'Opt-out settings' },
    { id: 'sms_compliance', label: 'Compliance' },
  ],
  whatsapp: [
    { id: 'wa_account',  label: 'WhatsApp account' },
    { id: 'wa_templates',label: 'Message templates' },
  ],
  push: [
    { id: 'push_apps',   label: 'Apps' },
    { id: 'push_prompts',label: 'Permission prompts' },
  ],
  data: [
    { id: 'data_integrations', label: 'Integrations' },
    { id: 'webhooks',    label: 'Webhooks' },
    { id: 'custom_props',label: 'Custom properties' },
    { id: 'imports',     label: 'Import history' },
  ],
  other: [
    { id: 'notifications', label: 'Notifications' },
    { id: 'help',          label: 'Help center' },
    { id: 'support',       label: 'Contact support' },
  ],
};

// ─── Billing plans data ───────────────────────────────────────────────────────

const plans = [
  {
    id: 'free', name: 'Free', price: 0, period: 'forever',
    description: 'Perfect for getting started', badge: null, channels: ['Email'],
    features: ['500 contacts','1,000 emails / month','1 automation workflow','Basic analytics','Community support'],
    cta: 'Current Plan', current: true, highlight: false,
  },
  {
    id: 'email', name: 'Email', price: 49, period: 'mo',
    description: 'For growing email-focused teams', badge: null, channels: ['Email'],
    features: ['10,000 contacts','Unlimited emails','Advanced segmentation','A/B testing','Email & chat support','Custom templates'],
    cta: 'Upgrade to Email', current: false, highlight: false,
  },
  {
    id: 'email_sms', name: 'Email + SMS', price: 99, period: 'mo',
    description: 'Full omnichannel marketing suite', badge: 'Most Popular', channels: ['Email', 'SMS'],
    features: ['25,000 contacts','Unlimited emails','5,000 SMS / month','AI-powered automations','Priority support','Advanced analytics','Custom domains'],
    cta: 'Upgrade to Email + SMS', current: false, highlight: true,
  },
];

const helpArticles = [
  { icon: Mail,         title: 'Setting up your first email campaign', category: 'Campaigns',   time: '3 min read' },
  { icon: Users,        title: 'Importing and managing contacts',       category: 'Contacts',    time: '5 min read' },
  { icon: Zap,          title: 'Building automation workflows',         category: 'Automations', time: '7 min read' },
  { icon: MessageCircle,title: 'Configuring SMS messaging',             category: 'SMS',         time: '4 min read' },
  { icon: FileText,     title: 'Understanding analytics reports',       category: 'Analytics',   time: '6 min read' },
  { icon: Key,          title: 'API integration guide',                 category: 'Developers',  time: '10 min read' },
];

const supportCategories = [
  { icon: BookOpen,     title: 'Documentation',   description: 'Full product reference and guides' },
  { icon: Video,        title: 'Video Tutorials',  description: 'Step-by-step walkthroughs'        },
  { icon: MessageSquare,title: 'Community Forum',  description: 'Ask questions, share ideas'       },
  { icon: FileText,     title: 'Release Notes',    description: "What's new in each version"       },
];

// ─── Section wrapper (matches Klaviyo card style) ─────────────────────────────

function Section({ title, description, children, onSave }: {
  title: string; description?: string; children: React.ReactNode; onSave?: () => void;
}) {
  return (
    <div className="border border-border/60 rounded-lg overflow-hidden mb-6">
      <div className="flex items-start justify-between px-5 py-4 bg-background border-b border-border/60">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {onSave && (
          <Button size="sm" variant="outline" className="h-7 text-xs shrink-0" onClick={onSave}>Save</Button>
        )}
      </div>
      <div className="px-5 py-4 bg-background space-y-4">{children}</div>
    </div>
  );
}

// ─── Content panels ───────────────────────────────────────────────────────────

function PersonalPanel() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Personal</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Your email is currently <span className="font-medium text-foreground">john.doe@example.com</span>.</p>
        <p className="text-xs text-muted-foreground">Your role is currently <span className="font-medium text-foreground">Owner</span>.</p>
      </div>

      <Section title="Information" onSave={() => {}}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fn" className="text-xs">First name <span className="text-red-500">*</span></Label>
            <Input id="fn" defaultValue="Lazy" className="h-9 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ln" className="text-xs">Last name <span className="text-red-500">*</span></Label>
            <Input id="ln" defaultValue="Developer" className="h-9 text-sm" />
          </div>
        </div>
      </Section>

      <Section title="Personal language and regional format" description="Set the language you prefer. These settings don't impact other people." onSave={() => {}}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Language</Label>
              <p className="text-[11px] text-muted-foreground">Only your account uses this language</p>
              <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Japanese</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">US regional format</Label>
              <p className="text-[11px] text-muted-foreground">The formatting for numbers, times, dates and currencies uses the standards in the United States.</p>
              <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer mt-2">
                <input type="checkbox" className="mt-0.5 rounded" />
                <span>Show English metric and event names<br /><span className="text-[10px]">Recommended if you will reference these objects in code.</span></span>
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium">Preview</p>
            <div className="rounded-md border border-border/60 bg-secondary/20 p-3 space-y-3 text-xs">
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Date, time, and timezone</p>
                <p>Jul 14, 2026, 5:01:10 PM GMT+6</p>
                <p>07/14/2026</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Number, percentage, and currency</p>
                <p>834,561,242.59</p>
                <p>59.76%</p>
                <p>$3,456.68</p>
                <p>$23K</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Metric name</p>
                <p>Active on site</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Change password">
        <div className="space-y-3 max-w-sm">
          <div className="space-y-1.5"><Label className="text-xs">Current password</Label><Input type="password" className="h-9 text-sm" /></div>
          <div className="space-y-1.5"><Label className="text-xs">New password</Label><Input type="password" className="h-9 text-sm" /></div>
          <div className="space-y-1.5"><Label className="text-xs">Confirm new password</Label><Input type="password" className="h-9 text-sm" /></div>
          <Button size="sm" className="text-xs h-8">Update password</Button>
        </div>
      </Section>
    </div>
  );
}

function AccountPanel() {
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">Account</h2><p className="text-xs text-muted-foreground mt-0.5">Manage your organization details and preferences.</p></div>
      <Section title="Organization details" onSave={() => {}}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5"><Label className="text-xs">Company name <span className="text-red-500">*</span></Label><Input defaultValue="Acme Corp" className="h-9 text-sm" /></div>
          <div className="space-y-1.5"><Label className="text-xs">Website</Label><Input placeholder="https://yourcompany.com" className="h-9 text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Industry</Label>
            <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
              <option>E-commerce / Retail</option><option>SaaS</option><option>Agency</option><option>Healthcare</option><option>Finance</option>
            </select>
          </div>
          <div className="space-y-1.5"><Label className="text-xs">Time zone</Label>
            <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
              <option>UTC-8 Pacific Time</option><option>UTC-5 Eastern Time</option><option>UTC+0 London</option><option>UTC+5:30 Mumbai</option>
            </select>
          </div>
        </div>
      </Section>
      <Section title="Danger zone">
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-red-600">Delete organization</p><p className="text-xs text-muted-foreground">Permanently delete your account and all data. This cannot be undone.</p></div>
          <Button variant="outline" size="sm" className="text-xs h-8 text-red-600 border-red-200 hover:bg-red-50">Delete</Button>
        </div>
      </Section>
    </div>
  );
}

function UsersPanel() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Users</h2><p className="text-xs text-muted-foreground mt-0.5">Manage team members and their permissions.</p></div>
        <Button size="sm" className="text-xs h-8">Invite user</Button>
      </div>
      <div className="border border-border/60 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 bg-secondary/30 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/60">
          <div className="col-span-5">User</div><div className="col-span-3">Role</div><div className="col-span-3">Status</div><div className="col-span-1" />
        </div>
        {[
          { name: 'Lazy Developer', email: 'lazy@example.com', role: 'Owner', status: 'Active', initials: 'LD' },
          { name: 'Sarah Lee', email: 'sarah@example.com', role: 'Editor', status: 'Active', initials: 'SL' },
          { name: 'Mark Johnson', email: 'mark@example.com', role: 'Viewer', status: 'Pending', initials: 'MJ' },
        ].map(u => (
          <div key={u.email} className="grid grid-cols-12 px-4 py-3 items-center border-b border-border/50 last:border-0 hover:bg-secondary/20">
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold shrink-0">{u.initials}</div>
              <div><p className="text-xs font-medium">{u.name}</p><p className="text-[10px] text-muted-foreground">{u.email}</p></div>
            </div>
            <div className="col-span-3 text-xs text-muted-foreground">{u.role}</div>
            <div className="col-span-3">
              <Badge variant="outline" className={`text-[10px] px-2 ${u.status === 'Active' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>{u.status}</Badge>
            </div>
            <div className="col-span-1 text-right"><button className="text-[10px] text-muted-foreground hover:text-destructive transition-colors">Remove</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiPanel() {
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">API keys</h2><p className="text-xs text-muted-foreground mt-0.5">Use these keys to authenticate requests to our REST API.</p></div>
      <Section title="Private API keys">
        <div className="rounded-md border border-border/60 bg-secondary/20 p-3 flex items-center justify-between font-mono text-xs gap-4">
          <span className="truncate text-muted-foreground">pk_live_8f7d6a5s4d3f2g1h...</span>
          <Button variant="ghost" size="sm" className="shrink-0 text-xs h-7">Copy</Button>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/20 rounded-md px-3 py-2">
          <span>Created Jun 12, 2025 · Last used 2 days ago</span>
          <button className="text-destructive hover:underline font-medium">Revoke</button>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8 mt-1">Generate new key</Button>
      </Section>
      <Section title="Public API keys">
        <div className="rounded-md border border-border/60 bg-secondary/20 p-3 flex items-center justify-between font-mono text-xs gap-4">
          <span className="truncate text-muted-foreground">pub_abc123xyz789...</span>
          <Button variant="ghost" size="sm" className="shrink-0 text-xs h-7">Copy</Button>
        </div>
        <p className="text-[11px] text-muted-foreground">Use the public key for client-side integrations where the key may be exposed.</p>
      </Section>
    </div>
  );
}

function ActivityPanel() {
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">Activity log</h2><p className="text-xs text-muted-foreground mt-0.5">A record of actions taken in your account.</p></div>
      <div className="border border-border/60 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 bg-secondary/30 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/60">
          <div className="col-span-5">Action</div><div className="col-span-3">User</div><div className="col-span-2">IP</div><div className="col-span-2 text-right">Time</div>
        </div>
        {[
          { action: 'Exported subscriber list', user: 'Lazy Developer', ip: '192.168.1.14', time: '2h ago' },
          { action: 'Changed billing plan', user: 'Sarah Lee', ip: '10.0.0.5', time: '5h ago' },
          { action: 'Deleted API key', user: 'Lazy Developer', ip: '192.168.1.14', time: '1d ago' },
          { action: 'Sent campaign', user: 'Lazy Developer', ip: '192.168.1.14', time: '2d ago' },
          { action: 'Invited team member', user: 'Sarah Lee', ip: '10.0.0.5', time: '3d ago' },
        ].map((e, i) => (
          <div key={i} className="grid grid-cols-12 px-4 py-3 items-center border-b border-border/50 last:border-0 hover:bg-secondary/20 text-xs">
            <div className="col-span-5 font-medium">{e.action}</div>
            <div className="col-span-3 text-muted-foreground">{e.user}</div>
            <div className="col-span-2 font-mono text-muted-foreground">{e.ip}</div>
            <div className="col-span-2 text-right text-muted-foreground">{e.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityPanel() {
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">Security</h2><p className="text-xs text-muted-foreground mt-0.5">Manage two-factor authentication and active sessions.</p></div>
      <Section title="Two-factor authentication" description="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium">Authenticator app</p><p className="text-xs text-muted-foreground">Use an app like Google Authenticator or Authy.</p></div>
          <Button size="sm" className="text-xs h-8">Enable 2FA</Button>
        </div>
      </Section>
      <Section title="Active sessions" description="Devices currently signed into your account.">
        {[
          { device: 'Chrome on Windows', location: 'New York, US', time: 'Active now', current: true },
          { device: 'Safari on iPhone', location: 'London, UK', time: '3 days ago', current: false },
        ].map(s => (
          <div key={s.device} className="flex items-center justify-between py-2">
            <div><p className="text-xs font-medium">{s.device} {s.current && <Badge variant="secondary" className="text-[10px] ml-1">This device</Badge>}</p><p className="text-[11px] text-muted-foreground">{s.location} · {s.time}</p></div>
            {!s.current && <Button variant="outline" size="sm" className="text-xs h-7 text-destructive border-red-200 hover:bg-red-50">Revoke</Button>}
          </div>
        ))}
      </Section>
    </div>
  );
}

function AppearancePanel() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">Appearance</h2><p className="text-xs text-muted-foreground mt-0.5">Customise how the platform looks for you.</p></div>
      <Section title="Theme" onSave={() => {}}>
        <div className="flex gap-3">
          {(['light','dark','system'] as const).map(t => (
            <button key={t} onClick={() => setTheme(t)}
              className={`flex-1 border rounded-lg p-3 text-left transition-all ${theme === t ? 'border-foreground ring-1 ring-foreground' : 'border-border hover:border-foreground/30'}`}>
              <div className={`w-full h-12 rounded-md mb-2 border ${t === 'dark' ? 'bg-gray-900' : t === 'system' ? 'bg-gradient-to-r from-white to-gray-900' : 'bg-white'}`} />
              <p className="text-xs font-medium capitalize">{t}</p>
              {theme === t && <p className="text-[10px] text-muted-foreground">Active</p>}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function BillingPanel() {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">Plans & pricing</h2><p className="text-xs text-muted-foreground mt-0.5">Manage your subscription and billing details.</p></div>
      <Section title="Current plan">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
            <div><div className="flex items-center gap-2"><span className="text-sm font-semibold">Free Plan</span><Badge variant="secondary" className="text-[10px]">Active</Badge></div>
              <p className="text-xs text-muted-foreground">500 contacts · 1,000 emails/mo</p></div>
          </div>
          <div className="flex gap-2"><Button variant="outline" size="sm" className="text-xs h-8">Billing history</Button><Button size="sm" className="text-xs h-8">Manage billing</Button></div>
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{l:'Contacts used',v:'312',m:'500'},{l:'Emails sent',v:'840',m:'1,000'},{l:'Automations',v:'1',m:'1'},{l:'Next renewal',v:'N/A',m:''}].map(({l,v,m})=>(
            <div key={l}><p className="text-[11px] text-muted-foreground">{l}</p><p className="text-sm font-semibold mt-0.5">{v}{m&&<span className="text-muted-foreground font-normal"> / {m}</span>}</p></div>
          ))}
        </div>
      </Section>
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-sm font-semibold">Available plans</p><p className="text-xs text-muted-foreground">Upgrade to unlock more features.</p></div>
        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
          {['Monthly','Annual'].map(t=>(
            <button key={t} onClick={()=>setIsAnnual(t==='Annual')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${(t==='Annual')===isAnnual?'bg-background shadow-sm text-foreground':'text-muted-foreground'}`}>
              {t}{t==='Annual'&&<span className="ml-1 text-[10px] text-green-600 font-bold">–20%</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {plans.map(plan=>{
          const price = isAnnual ? Math.round(plan.price*0.8) : plan.price;
          return (
            <div key={plan.id} className={`relative border rounded-xl p-5 flex flex-col ${plan.highlight?'border-foreground bg-foreground text-background':plan.current?'border-border bg-card':'border-border bg-card hover:border-foreground/20'}`}>
              {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background border border-border text-[10px] font-semibold px-2.5 py-0.5 rounded-full"><Star className="w-2.5 h-2.5 inline mr-1" />{plan.badge}</div>}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${plan.highlight?'text-background/70':'text-muted-foreground'}`}>{plan.name}</span>
                  {plan.current&&<Badge variant="secondary" className="text-[10px]">Active</Badge>}
                </div>
                <div className="text-3xl font-bold">{plan.price===0?'Free':`$${price}`}{plan.price>0&&<span className={`text-sm font-normal ml-1 ${plan.highlight?'text-background/60':'text-muted-foreground'}`}>/{plan.period}</span>}</div>
                <p className={`text-xs mt-1 ${plan.highlight?'text-background/70':'text-muted-foreground'}`}>{plan.description}</p>
              </div>
              <ul className="space-y-2 mb-5 flex-1">
                {plan.features.map(f=>(
                  <li key={f} className="flex items-center gap-2 text-xs">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight?'bg-background/20':'bg-secondary'}`}><Check className={`w-2 h-2 ${plan.highlight?'text-background':'text-foreground'}`}/></div>
                    <span className={plan.highlight?'text-background/90':''}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button size="sm" className={`w-full text-xs h-8 ${plan.current?'opacity-50 cursor-default':plan.highlight?'bg-background text-foreground hover:bg-background/90':''}`} variant={plan.highlight?'outline':'default'} disabled={plan.current}>
                {plan.current?'Current plan':plan.cta}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="border border-border/60 rounded-xl p-4 bg-secondary/20 flex items-center justify-between gap-4 flex-wrap">
        <div><p className="text-sm font-semibold">Need Enterprise?</p><p className="text-xs text-muted-foreground">Custom limits, SSO, dedicated support and SLA.</p></div>
        <Button variant="outline" size="sm" className="text-xs h-8">Contact sales <ArrowRight className="w-3 h-3 ml-1"/></Button>
      </div>
    </div>
  );
}

function HelpPanel() {
  const [query, setQuery] = useState('');
  const filtered = helpArticles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">Help center</h2></div>
      <Section title="Search knowledge base">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search articles..." value={query} onChange={e=>setQuery(e.target.value)} /></div>
      </Section>
      <Section title="Resources">
        <div className="grid grid-cols-2 gap-3">
          {supportCategories.map(({icon:Icon,title,description})=>(
            <button key={title} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background text-left hover:border-foreground/20 hover:shadow-sm transition-all group">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0"><Icon className="w-3.5 h-3.5"/></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-medium">{title}</p><p className="text-[10px] text-muted-foreground">{description}</p></div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0"/>
            </button>
          ))}
        </div>
      </Section>
      <Section title={query ? `Results for "${query}"` : 'Popular articles'}>
        <div className="divide-y divide-border/60">
          {filtered.map(({icon:Icon,title,category,time})=>(
            <button key={title} className="flex items-center gap-3 w-full py-3 text-left hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0"><Icon className="w-3 h-3 text-muted-foreground"/></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{title}</p><p className="text-[10px] text-muted-foreground">{category} · {time}</p></div>
              <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0"/>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function SupportPanel() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center"><Check className="w-6 h-6 text-green-600"/></div>
      <div><p className="text-sm font-semibold">Message sent!</p><p className="text-xs text-muted-foreground mt-1">We'll reply to your email within 24 hours.</p></div>
      <Button variant="outline" size="sm" className="text-xs h-8" onClick={()=>setSubmitted(false)}>Send another</Button>
    </div>
  );
  return (
    <div>
      <div className="mb-5"><h2 className="text-lg font-semibold">Contact support</h2></div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {icon:MessageSquare,title:'Live Chat',desc:'Mon–Fri 9am–6pm EST',tag:'Online',tc:'text-emerald-600 bg-emerald-50 border-emerald-100'},
          {icon:Mail,title:'Email',desc:'Response within 24h',tag:'Always open',tc:'text-blue-600 bg-blue-50 border-blue-100'},
          {icon:Phone,title:'Phone',desc:'Enterprise only',tag:'Enterprise',tc:'text-muted-foreground bg-secondary border-border'},
        ].map(({icon:Icon,title,desc,tag,tc})=>(
          <div key={title} className="border border-border/60 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between"><div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><Icon className="w-4 h-4"/></div><span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tc}`}>{tag}</span></div>
            <div><p className="text-xs font-semibold">{title}</p><p className="text-[10px] text-muted-foreground">{desc}</p></div>
          </div>
        ))}
      </div>
      <Section title="Send us a message">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5"><Label className="text-xs">Name</Label><Input defaultValue="Lazy Developer" className="h-9 text-sm"/></div>
          <div className="space-y-1.5"><Label className="text-xs">Email</Label><Input type="email" defaultValue="lazy@example.com" className="h-9 text-sm"/></div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Subject</Label>
          <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
            <option>General Question</option><option>Technical Issue</option><option>Billing Inquiry</option><option>Feature Request</option>
          </select>
        </div>
        <div className="space-y-1.5"><Label className="text-xs">Message</Label><textarea rows={4} placeholder="Describe your issue..." className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"/></div>
        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/>Typical response: under 24 hours</p>
          <Button size="sm" className="text-xs h-8" onClick={()=>setSubmitted(true)}>Send message <ArrowRight className="w-3 h-3 ml-1"/></Button>
        </div>
      </Section>
    </div>
  );
}

function GenericPanel({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Palette className="w-5 h-5 text-muted-foreground"/></div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground max-w-xs">This section is coming soon. Settings for {label.toLowerCase()} will be available here.</p>
    </div>
  );
}

// ─── Panel resolver ───────────────────────────────────────────────────────────

function resolvePanel(topTab: TopTab, subId: string): React.ReactNode {
  if (topTab === 'general') {
    if (subId === 'personal')   return <PersonalPanel />;
    if (subId === 'account')    return <AccountPanel />;
    if (subId === 'users')      return <UsersPanel />;
    if (subId === 'api')        return <ApiPanel />;
    if (subId === 'activity')   return <ActivityPanel />;
    if (subId === 'security')   return <SecurityPanel />;
    if (subId === 'appearance') return <AppearancePanel />;
    return <GenericPanel label={subNavMap[topTab].find(s=>s.id===subId)?.label ?? subId} />;
  }
  if (topTab === 'billing') {
    if (subId === 'plans') return <BillingPanel />;
    return <GenericPanel label={subNavMap[topTab].find(s=>s.id===subId)?.label ?? subId} />;
  }
  if (topTab === 'other') {
    if (subId === 'help')    return <HelpPanel />;
    if (subId === 'support') return <SupportPanel />;
    return <GenericPanel label={subNavMap[topTab].find(s=>s.id===subId)?.label ?? subId} />;
  }
  return <GenericPanel label={subNavMap[topTab]?.find(s=>s.id===subId)?.label ?? subId} />;
}

// ─── Main Settings Page ───────────────────────────────────────────────────────

export default function Settings() {
  const search = useSearch();

  const [activeTop, setActiveTop] = useState<TopTab>('general');
  const [activeSub, setActiveSub] = useState<string>('personal');

  // Re-sync whenever the URL query param changes (e.g. clicking "Account plan" or "Support" from the header)
  useEffect(() => {
    const params = new URLSearchParams(search);
    const tabParam = params.get('tab');
    if (tabParam === 'billing') {
      setActiveTop('billing');
      setActiveSub('plans');
    } else if (tabParam === 'support') {
      setActiveTop('other');
      setActiveSub('support');
    }
  }, [search]);

  const handleTopTab = (tab: TopTab) => {
    setActiveTop(tab);
    setActiveSub(subNavMap[tab][0].id);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Page title + top tab bar */}
      <div className="px-6 pt-5 pb-0 border-b border-border/60 bg-background shrink-0">
        <h1 className="text-base font-semibold mb-3">Settings</h1>
        <div className="flex items-center gap-0 overflow-x-auto">
          {topTabs.map(t => (
            <button
              key={t.id}
              onClick={() => handleTopTab(t.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTop === t.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body: left sub-nav + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sub-nav */}
        <div className="w-52 shrink-0 border-r border-border/60 overflow-y-auto py-3 pl-8 pr-3 bg-background">
          {subNavMap[activeTop].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSub(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                activeSub === item.id
                  ? 'bg-secondary text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-background">
          <div className="max-w-[860px] ml-10">
            {resolvePanel(activeTop, activeSub)}
          </div>
        </div>
      </div>
    </div>
  );
}
