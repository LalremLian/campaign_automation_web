import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command';
import {
  Home, Megaphone, GitBranch, Users, LayoutGrid,
  Puzzle, BarChart2, ShoppingBag, ShieldCheck, Layers,
  Zap, Settings, ImageIcon, Video, Phone, FileText,
  TrendingUp, Activity, TestTube, Globe, Tag,
  CircleDot, LogOut, Moon, Sun,
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

// ─── All navigable pages ──────────────────────────────────────
const pages = [
  // Main
  { group: 'Main',        label: 'Home',                    path: '/home',                             icon: Home },
  { group: 'Main',        label: 'Get Started',             path: '/get-started',                      icon: CircleDot },
  { group: 'Main',        label: 'Campaigns',               path: '/campaigns',                        icon: Megaphone },
  { group: 'Main',        label: 'Create Campaign',         path: '/campaigns/create',                 icon: Megaphone },
  { group: 'Main',        label: 'Automations',             path: '/automations',                      icon: Zap },
  // Flows
  { group: 'Flows',       label: 'AI Image',                path: '/flows/ai-image',                   icon: ImageIcon },
  { group: 'Flows',       label: 'AI Video',                path: '/flows/ai-video',                   icon: Video },
  { group: 'Flows',       label: 'AI Calls',                path: '/flows/ai-calls',                   icon: Phone },
  // Audience
  { group: 'Audience',    label: 'Segments',                path: '/segments',                         icon: Layers },
  { group: 'Audience',    label: 'Audience / Customers',    path: '/customers',                        icon: Users },
  // Content
  { group: 'Content',     label: 'Templates',               path: '/templates',                        icon: FileText },
  { group: 'Content',     label: 'Universal Content',       path: '/content/universal-content',        icon: LayoutGrid },
  { group: 'Content',     label: 'Media & Brand',           path: '/content/media-brand',              icon: LayoutGrid },
  // Analytics
  { group: 'Analytics',   label: 'Analytics Overview',      path: '/analytics',                        icon: BarChart2 },
  { group: 'Analytics',   label: 'Revenue Attribution',     path: '/analytics/revenue-attribution',    icon: TrendingUp },
  { group: 'Analytics',   label: 'Deliverability',          path: '/analytics/deliverability',         icon: Activity },
  { group: 'Analytics',   label: 'Benchmarks',              path: '/analytics/benchmarks',             icon: BarChart2 },
  { group: 'Analytics',   label: 'A/B Tests',               path: '/analytics/ab-tests',               icon: TestTube },
  // E-commerce
  { group: 'E-commerce',  label: 'Catalog',                 path: '/ecommerce/catalog',                icon: ShoppingBag },
  { group: 'E-commerce',  label: 'Coupons',                 path: '/ecommerce/coupons',                icon: Tag },
  { group: 'E-commerce',  label: 'Predicted Analytics',     path: '/ecommerce/predicted-analytics',    icon: TrendingUp },
  // Compliance
  { group: 'Compliance',  label: 'Audit Log',               path: '/compliance/audit-log',             icon: ShieldCheck },
  { group: 'Compliance',  label: 'Consent & Compliance',    path: '/compliance/consent',               icon: ShieldCheck },
  { group: 'Compliance',  label: 'Suppression List',        path: '/compliance/suppression-list',      icon: ShieldCheck },
  // Other
  { group: 'Other',       label: 'Integrations',            path: '/integrations',                     icon: Puzzle },
  { group: 'Other',       label: 'Settings',                path: '/settings',                         icon: Settings },
];

// Unique groups in order
const groups = ['Main', 'Flows', 'Audience', 'Content', 'Analytics', 'E-commerce', 'Compliance', 'Other'];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: Props) {
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  const navigate = (path: string) => {
    setLocation(path);
    onClose();
  };

  return (
    <CommandDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <CommandInput placeholder="Search pages, actions…" />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>No results found.</CommandEmpty>

        {groups.map((group) => {
          const items = pages.filter((p) => p.group === group);
          if (!items.length) return null;
          return (
            <div key={group}>
              <CommandGroup heading={group}>
                {items.map(({ label, path, icon: Icon }) => (
                  <CommandItem
                    key={path}
                    value={label}
                    onSelect={() => navigate(path)}
                    className="flex items-center gap-3 py-2.5 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-foreground" />
                    </div>
                    <span>{label}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground font-mono opacity-50">{path}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          );
        })}

        {/* Quick actions */}
        <CommandGroup heading="Actions">
          <CommandItem
            value="toggle theme dark light"
            onSelect={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); onClose(); }}
            className="flex items-center gap-3 py-2.5 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0">
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </div>
            <span>Toggle theme ({theme === 'dark' ? 'switch to light' : 'switch to dark'})</span>
          </CommandItem>
          <CommandItem
            value="log out sign out"
            onSelect={() => navigate('/login')}
            className="flex items-center gap-3 py-2.5 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0">
              <LogOut className="w-3.5 h-3.5" />
            </div>
            <span>Log out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      {/* Footer hint */}
      <div className="flex items-center gap-3 px-3 py-2 border-t border-border/60 bg-muted/20">
        <span className="text-[10px] text-muted-foreground">
          <kbd className="px-1 py-0.5 border border-border rounded text-[9px] bg-background mr-1">↑↓</kbd>navigate
        </span>
        <span className="text-[10px] text-muted-foreground">
          <kbd className="px-1 py-0.5 border border-border rounded text-[9px] bg-background mr-1">↵</kbd>open
        </span>
        <span className="text-[10px] text-muted-foreground">
          <kbd className="px-1 py-0.5 border border-border rounded text-[9px] bg-background mr-1">esc</kbd>close
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground">
          <kbd className="px-1 py-0.5 border border-border rounded text-[9px] bg-background mr-1">ctrl</kbd>
          <kbd className="px-1 py-0.5 border border-border rounded text-[9px] bg-background mr-1">k</kbd>
          to open
        </span>
      </div>
    </CommandDialog>
  );
}
