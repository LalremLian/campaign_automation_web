import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User, Building2, Users, CreditCard, Key,
  HelpCircle, MessageSquare, Check, Zap, Mail,
  MessageCircle, Sparkles, ChevronRight, ExternalLink,
  BookOpen, Video, FileText, Search, ArrowRight,
  Phone, Clock, Star
} from 'lucide-react';

// ─── Billing Plans Data ───────────────────────────────────────────────────────

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    badge: null,
    channels: ['Email'],
    features: [
      '500 contacts',
      '1,000 emails / month',
      '1 automation workflow',
      'Basic analytics',
      'Community support',
    ],
    cta: 'Current Plan',
    current: true,
    highlight: false,
  },
  {
    id: 'email',
    name: 'Email',
    price: 49,
    period: 'mo',
    description: 'For growing teams focused on email',
    badge: null,
    channels: ['Email'],
    features: [
      '10,000 contacts',
      'Unlimited emails',
      'Advanced segmentation',
      'A/B testing',
      'Email & chat support',
      'Custom templates',
    ],
    cta: 'Upgrade to Email',
    current: false,
    highlight: false,
  },
  {
    id: 'email_sms',
    name: 'Email + SMS',
    price: 99,
    period: 'mo',
    description: 'Full omnichannel marketing suite',
    badge: 'Most Popular',
    channels: ['Email', 'SMS'],
    features: [
      '25,000 contacts',
      'Unlimited emails',
      '5,000 SMS / month',
      'AI-powered automations',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
    ],
    cta: 'Upgrade to Email + SMS',
    current: false,
    highlight: true,
  },
];

// ─── Help Center Articles ─────────────────────────────────────────────────────

const helpArticles = [
  { icon: Mail, title: 'Setting up your first email campaign', category: 'Campaigns', time: '3 min read' },
  { icon: Users, title: 'Importing and managing contacts', category: 'Contacts', time: '5 min read' },
  { icon: Zap, title: 'Building automation workflows', category: 'Automations', time: '7 min read' },
  { icon: MessageCircle, title: 'Configuring SMS messaging', category: 'SMS', time: '4 min read' },
  { icon: FileText, title: 'Understanding analytics reports', category: 'Analytics', time: '6 min read' },
  { icon: Key, title: 'API integration guide', category: 'Developers', time: '10 min read' },
];

const supportCategories = [
  { icon: BookOpen, title: 'Documentation', description: 'Full product reference and guides', href: '#' },
  { icon: Video, title: 'Video Tutorials', description: 'Step-by-step walkthroughs', href: '#' },
  { icon: MessageSquare, title: 'Community Forum', description: 'Ask questions, share ideas', href: '#' },
  { icon: FileText, title: 'Release Notes', description: "What's new in each version", href: '#' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChannelPill({ channel }: { channel: string }) {
  const config: Record<string, { icon: React.ElementType; color: string }> = {
    Email: { icon: Mail, color: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900' },
    SMS: { icon: MessageCircle, color: 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-900' },
  };
  const { icon: Icon, color } = config[channel] ?? { icon: Mail, color: '' };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${color}`}>
      <Icon className="w-3 h-3" />
      {channel}
    </span>
  );
}

function PlanCard({ plan, isAnnual }: { plan: typeof plans[0]; isAnnual: boolean }) {
  const price = isAnnual ? Math.round(plan.price * 0.8) : plan.price;
  return (
    <div className={`relative flex flex-col rounded-xl border p-6 transition-all ${
      plan.highlight
        ? 'border-foreground bg-foreground text-background shadow-xl'
        : plan.current
        ? 'border-border bg-card'
        : 'border-border bg-card hover:border-foreground/30'
    }`}>
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-background text-foreground border border-border text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-semibold tracking-wide uppercase ${plan.highlight ? 'text-background/70' : 'text-muted-foreground'}`}>
            {plan.name}
          </span>
          {plan.current && <Badge variant="secondary" className="text-[11px]">Active</Badge>}
        </div>
        <div className="flex items-end gap-1 mb-1">
          <span className="text-4xl font-bold tracking-tight">
            {plan.price === 0 ? 'Free' : `$${price}`}
          </span>
          {plan.price > 0 && (
            <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-background/60' : 'text-muted-foreground'}`}>
              /{plan.period}{isAnnual ? ' (billed annually)' : ''}
            </span>
          )}
        </div>
        <p className={`text-sm ${plan.highlight ? 'text-background/70' : 'text-muted-foreground'}`}>
          {plan.description}
        </p>
      </div>

      <div className="flex gap-1.5 mb-5">
        {plan.channels.map(c => (
          plan.highlight
            ? <span key={c} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border border-background/20 text-background/80 bg-background/10"><Mail className="w-3 h-3" />{c}</span>
            : <ChannelPill key={c} channel={c} />
        ))}
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-center gap-2.5 text-sm">
            <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-background/20' : 'bg-secondary'}`}>
              <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-background' : 'text-foreground'}`} />
            </div>
            <span className={plan.highlight ? 'text-background/90' : ''}>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full ${
          plan.current
            ? 'cursor-default opacity-60'
            : plan.highlight
            ? 'bg-background text-foreground hover:bg-background/90'
            : ''
        }`}
        variant={plan.current ? 'outline' : plan.highlight ? 'outline' : 'default'}
        disabled={plan.current}
      >
        {plan.current ? 'Current Plan' : plan.cta}
      </Button>
    </div>
  );
}

// ─── Tab: Billing & Plans ─────────────────────────────────────────────────────

function BillingTab() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="space-y-8">
      {/* Current plan summary */}
      <Card className="border-border/60">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Free Plan</span>
                  <Badge variant="secondary" className="text-[11px]">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">500 contacts · 1,000 emails/mo · Renews never</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" className="text-xs">Billing History</Button>
              <Button size="sm" className="text-xs">Manage Billing</Button>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Contacts used', value: '312', max: '500' },
              { label: 'Emails sent', value: '840', max: '1,000' },
              { label: 'Automations', value: '1', max: '1' },
              { label: 'Next renewal', value: 'N/A', max: '' },
            ].map(({ label, value, max }) => (
              <div key={label} className="space-y-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}{max ? <span className="text-muted-foreground font-normal"> / {max}</span> : ''}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing toggle + plans */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-semibold">Choose a Plan</h3>
            <p className="text-sm text-muted-foreground">Upgrade to unlock more contacts, channels, and features.</p>
          </div>
          <div className="flex items-center gap-3 bg-secondary rounded-lg p-1 self-start sm:self-auto">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${!isAnnual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${isAnnual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Annual
              <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">–20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(plan => <PlanCard key={plan.id} plan={plan} isAnnual={isAnnual} />)}
        </div>
      </div>

      {/* Enterprise callout */}
      <Card className="border-border/60 bg-secondary/30">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Need an Enterprise plan?</p>
              <p className="text-sm text-muted-foreground mt-0.5">Custom limits, dedicated support, SSO, SLA, and volume pricing.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 text-xs">
            Contact Sales <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Help Center ─────────────────────────────────────────────────────────

function HelpCenterTab() {
  const [query, setQuery] = useState('');
  const filtered = helpArticles.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="border-border/60 overflow-hidden">
        <div className="bg-gradient-to-br from-secondary/60 to-secondary/20 p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-background rounded-xl border shadow-sm mb-1">
            <HelpCircle className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">How can we help?</h3>
            <p className="text-sm text-muted-foreground mt-1">Search our knowledge base or browse articles below.</p>
          </div>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9 bg-background shadow-sm"
              placeholder="Search articles..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Quick links */}
      <div>
        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Resources</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {supportCategories.map(({ icon: Icon, title, description }) => (
            <button key={title} className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card text-left hover:border-foreground/30 hover:shadow-sm transition-all group">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors">
                <Icon className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div>
        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          {query ? `Results for "${query}"` : 'Popular Articles'}
        </h4>
        {filtered.length === 0 ? (
          <Card className="border-border/60 p-8 text-center">
            <p className="text-sm text-muted-foreground">No articles found for "{query}".</p>
          </Card>
        ) : (
          <div className="divide-y divide-border/60 border border-border/60 rounded-xl overflow-hidden">
            {filtered.map(({ icon: Icon, title, category, time }) => (
              <button key={title} className="flex items-center gap-4 w-full p-4 bg-card text-left hover:bg-secondary/30 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium group-hover:text-foreground transition-colors truncate">{title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{category}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {time}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Contact Support ─────────────────────────────────────────────────────

function ContactSupportTab() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Card className="border-border/60">
        <CardContent className="p-12 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Message sent!</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">We've received your request and will reply to your email within 24 hours.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Send another message</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* Contact options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, title: 'Live Chat', description: 'Available Mon–Fri, 9am–6pm EST', tag: 'Online now', tagColor: 'text-green-600 bg-green-50 border-green-100 dark:text-green-400 dark:bg-green-950/40 dark:border-green-900' },
          { icon: Mail, title: 'Email Support', description: 'Response within 24 hours', tag: 'Always open', tagColor: 'text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900' },
          { icon: Phone, title: 'Phone Support', description: 'Enterprise plan customers only', tag: 'Enterprise', tagColor: 'text-muted-foreground bg-secondary border-border' },
        ].map(({ icon: Icon, title, description, tag, tagColor }) => (
          <div key={title} className="flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-card">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Icon className="w-4 h-4 text-foreground" />
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${tagColor}`}>{tag}</span>
            </div>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Send us a message</CardTitle>
          <CardDescription>Describe your issue and our team will get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="support_name">Your Name</Label>
              <Input id="support_name" placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support_email">Email Address</Label>
              <Input id="support_email" type="email" placeholder="john@example.com" defaultValue="john.doe@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="support_subject">Subject</Label>
            <select id="support_subject" className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
              <option>General Question</option>
              <option>Technical Issue</option>
              <option>Billing Inquiry</option>
              <option>Feature Request</option>
              <option>Account Access</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="support_message">Message</Label>
            <textarea
              id="support_message"
              rows={5}
              placeholder="Please describe your issue in detail..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Typical response time: under 24 hours
            </p>
            <Button onClick={() => setSubmitted(true)} className="text-sm">
              Send Message <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Settings Nav Items ───────────────────────────────────────────────────────

type TabValue = 'profile' | 'organization' | 'team' | 'billing' | 'api' | 'help' | 'support';

const navItems: { value: TabValue; label: string; icon: React.ElementType }[] = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'organization', label: 'Organization', icon: Building2 },
  { value: 'team', label: 'Team Members', icon: Users },
  { value: 'billing', label: 'Billing & Plans', icon: CreditCard },
  { value: 'api', label: 'API Keys', icon: Key },
  { value: 'help', label: 'Help Center', icon: HelpCircle },
  { value: 'support', label: 'Contact Support', icon: MessageSquare },
];

// ─── Main Settings Page ───────────────────────────────────────────────────────

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabValue>('profile');

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your account, billing, and preferences.</p>
      </div>

      {/* Two-column layout — nav is fully independent of content so it never moves */}
      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* Fixed-width nav — self-start so it doesn't stretch with content */}
        <nav className="w-full md:w-56 shrink-0 self-start sticky top-6 flex flex-col space-y-0.5">
          {navItems.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                activeTab === value
                  ? 'bg-secondary text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Content area */}
        <div className="flex-1 min-w-0">

          {activeTab === 'profile' && (
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Your personal information and email address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-5">
                  <Avatar className="h-16 w-16 border">
                    <AvatarFallback className="text-lg bg-secondary font-semibold">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-muted-foreground mt-1.5">JPG, GIF or PNG. Max size 2MB.</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input id="first_name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input id="last_name" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="pt-2 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'organization' && (
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>Manage your company information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org_name">Company Name</Label>
                  <Input id="org_name" defaultValue="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <select id="industry" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                    <option>E-commerce / Retail</option>
                    <option>SaaS</option>
                    <option>Agency</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://yourcompany.com" />
                </div>
                <div className="pt-2 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'team' && (
            <Card className="border-border/60 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-base font-semibold mb-1">Team Management</div>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">Invite colleagues, assign roles, and manage permissions across your organization.</p>
              <Button>Invite Member</Button>
            </Card>
          )}

          {activeTab === 'billing' && <BillingTab />}

          {activeTab === 'api' && (
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Use these keys to authenticate requests to our REST API.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/60 bg-secondary/20 p-4 flex items-center justify-between font-mono text-sm gap-4">
                  <span className="truncate text-muted-foreground">pk_live_8f7d6a5s4d3f2g1h...</span>
                  <Button variant="ghost" size="sm" className="shrink-0 text-xs">Copy</Button>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/30 rounded-lg px-4 py-3">
                  <span>Created June 12, 2025 · Last used 2 days ago</span>
                  <button className="text-destructive hover:underline font-medium">Revoke</button>
                </div>
                <Button variant="outline" size="sm" className="mt-2">Generate New Key</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'help' && <HelpCenterTab />}

          {activeTab === 'support' && <ContactSupportTab />}

        </div>
      </div>
    </div>
  );
}
