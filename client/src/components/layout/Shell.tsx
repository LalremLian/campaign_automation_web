import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import {
  Home, CircleDot, Megaphone, GitBranch,
  Users, LayoutGrid, Puzzle, Search, Bell,
  ChevronRight, ChevronDown, Settings, LogOut, PieChart,
  BarChart2, ShoppingBag, ShieldCheck, Layers, Zap,
  X, CheckCircle2, AlertCircle, Info, Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';

// ─── Notifications Panel ─────────────────────────────────────────────────────

const notifications = [
  { id: 1, icon: Mail,         color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',    title: 'Campaign sent successfully',          body: 'Black Friday Early Access sent to 12,400 recipients.',  time: '2h ago',  read: false },
  { id: 2, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400', title: 'Flow triggered 84 times',       body: 'Abandoned Cart flow recovered $3,240 today.',           time: '4h ago',  read: false },
  { id: 3, icon: AlertCircle,  color: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',  title: 'Deliverability warning',              body: 'Bounce rate for Yahoo/AOL reached 1.4% — above threshold.', time: '6h ago',  read: false },
  { id: 4, icon: Info,         color: 'bg-secondary text-muted-foreground',                                title: 'Shopify sync completed',              body: '1,240 new orders synced successfully.',                 time: '1d ago',  read: true  },
  { id: 5, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400', title: '420 new subscribers added',     body: 'Via homepage popup form — your best day this week.',    time: '1d ago',  read: true  },
  { id: 6, icon: Info,         color: 'bg-secondary text-muted-foreground',                                title: 'Weekly analytics report ready',       body: 'Revenue up 18.4% vs last week.',                        time: '2d ago',  read: true  },
];

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState(notifications);
  const unread = items.filter(n => !n.read).length;

  const markAllRead = () => setItems(p => p.map(n => ({ ...n, read: true })));

  return (
    <div className="absolute top-14 right-0 w-[380px] bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Notifications</span>
          {unread > 0 && (
            <Badge className="h-4 px-1.5 text-[10px] bg-foreground text-background">{unread}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button onClick={markAllRead} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="max-h-[420px] overflow-y-auto divide-y divide-border/50">
        {items.map(n => {
          const Icon = n.icon;
          return (
            <div key={n.id}
              onClick={() => setItems(p => p.map(x => x.id === n.id ? { ...x, read: true } : x))}
              className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-secondary/30 transition-colors ${!n.read ? 'bg-secondary/10' : ''}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${n.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-xs leading-snug ${!n.read ? 'font-semibold' : 'font-medium'}`}>{n.title}</p>
                  {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0 mt-1.5" />}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border/60">
        <button
          onClick={() => { setLocation('/compliance/audit-log'); onClose(); }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
        >
          View all activity in Audit Log →
        </button>
      </div>
    </div>
  );
}

// ─── Search data ──────────────────────────────────────────────
const ALL_PAGES = [
  { label: 'Home',                 path: '/home',                          group: 'Main' },
  { label: 'Get Started',          path: '/get-started',                   group: 'Main' },
  { label: 'Campaigns',            path: '/campaigns',                     group: 'Main' },
  { label: 'Create Campaign',      path: '/campaigns/create',              group: 'Main' },
  { label: 'Automations',          path: '/automations',                   group: 'Main' },
  { label: 'AI Image',             path: '/flows/ai-image',                group: 'Flows' },
  { label: 'AI Video',             path: '/flows/ai-video',                group: 'Flows' },
  { label: 'AI Calls',             path: '/flows/ai-calls',                group: 'Flows' },
  { label: 'Segments',             path: '/segments',                      group: 'Audience' },
  { label: 'Audience',             path: '/customers',                     group: 'Audience' },
  { label: 'Templates',            path: '/templates',                     group: 'Content' },
  { label: 'Universal Content',    path: '/content/universal-content',     group: 'Content' },
  { label: 'Media & Brand',        path: '/content/media-brand',           group: 'Content' },
  { label: 'Analytics Overview',   path: '/analytics',                     group: 'Analytics' },
  { label: 'Revenue Attribution',  path: '/analytics/revenue-attribution', group: 'Analytics' },
  { label: 'Deliverability',       path: '/analytics/deliverability',      group: 'Analytics' },
  { label: 'Benchmarks',           path: '/analytics/benchmarks',          group: 'Analytics' },
  { label: 'A/B Tests',            path: '/analytics/ab-tests',            group: 'Analytics' },
  { label: 'Catalog',              path: '/ecommerce/catalog',             group: 'E-commerce' },
  { label: 'Coupons',              path: '/ecommerce/coupons',             group: 'E-commerce' },
  { label: 'Predicted Analytics',  path: '/ecommerce/predicted-analytics', group: 'E-commerce' },
  { label: 'Audit Log',            path: '/compliance/audit-log',          group: 'Compliance' },
  { label: 'Consent & Compliance', path: '/compliance/consent',            group: 'Compliance' },
  { label: 'Suppression List',     path: '/compliance/suppression-list',   group: 'Compliance' },
  { label: 'Integrations',         path: '/integrations',                  group: 'Other' },
  { label: 'Settings',             path: '/settings',                      group: 'Other' },
];

const SUGGESTIONS = ['Campaigns', 'Analytics Overview', 'AI Calls', 'Segments', 'Automations', 'Templates'];

function SidebarItem({ icon: Icon, name, path, active, disabled, onClick }: any) {
  const [_, setLocation] = useLocation();
  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    else if (path) setLocation(path);
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "flex items-center w-full px-2.5 py-1.5 text-[13px] rounded-md transition-colors",
        active 
          ? "bg-gray-100 dark:bg-secondary text-foreground font-medium" 
          : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-secondary/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <Icon className="w-4 h-4 mr-3 shrink-0" />
      <span className="truncate">{name}</span>
    </button>
  );
}

function SubItem({ name, path, active }: any) {
  const [_, setLocation] = useLocation();
  return (
    <button
      onClick={() => path && setLocation(path)}
      className={cn(
        "flex items-center w-full pl-9 pr-3 py-1.5 text-xs rounded-md transition-colors",
        active 
          ? "text-foreground font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-secondary/50"
      )}
    >
      <span className="truncate">{name}</span>
    </button>
  );
}

function ExpandableItem({ icon: Icon, name, expanded, onClick, children, active }: any) {
  return (
    <div>
      <button
        onClick={onClick}
        className={cn(
          "flex items-center w-full px-2.5 py-1.5 text-[13px] rounded-md transition-colors",
          active
            ? "bg-gray-100 dark:bg-secondary text-foreground font-medium"
            : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-secondary/50"
        )}
      >
        <Icon className="w-4 h-4 mr-3 shrink-0" />
        <span className="truncate flex-1 text-left">{name}</span>
        {expanded
          ? <ChevronDown className="w-3 h-3 shrink-0" />
          : <ChevronRight className="w-3 h-3 shrink-0" />
        }
      </button>

      {expanded && children && (
        <div className="mt-0.5 flex flex-col space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Filter results
  const searchResults = searchQuery.trim()
    ? ALL_PAGES.filter(p =>
        p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.group.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  // Ctrl+K → focus inline search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 10);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scale the 1280px desktop layout to fit any viewport width
  useEffect(() => {
    const DESIGN_WIDTH = 1280;
    const applyScale = () => {
      if (!innerRef.current) return;
      const vw = window.innerWidth;
      if (vw < DESIGN_WIDTH) {
        // Small screens: scale down to fit
        const scale = vw / DESIGN_WIDTH;
        innerRef.current.style.zoom = String(scale);
        innerRef.current.style.width = `${DESIGN_WIDTH}px`;
        innerRef.current.style.height = `${window.innerHeight / scale}px`;
      } else {
        // Desktop: fill full viewport — no zoom, no fixed width
        innerRef.current.style.zoom = '1';
        innerRef.current.style.width = '100%';
        innerRef.current.style.height = '100dvh';
      }
    };
    applyScale();
    window.addEventListener('resize', applyScale);
    return () => window.removeEventListener('resize', applyScale);
  }, []);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Content: location.startsWith('/templates') || location.startsWith('/content'),
    Flows: location.startsWith('/flows'),
    Analytics: location.startsWith('/analytics'),
    Ecommerce: location.startsWith('/ecommerce'),
    Compliance: location.startsWith('/compliance'),
  });

  const toggleExpand = (name: string) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="app-shell-wrapper">
      <div ref={innerRef} className="app-shell-inner flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-52 flex flex-col border-r bg-white dark:bg-sidebar shrink-0">
         <div className="flex items-center p-4 h-14">
            <div className="w-7 h-7 bg-black dark:bg-white rounded-[6px] flex items-center justify-center shrink-0">
              <span className="text-white dark:text-black font-bold text-sm leading-none">M</span>
            </div>
         </div>
         
         <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 mt-2">
           <SidebarItem icon={CircleDot} name="Get started" path="/get-started" active={location.startsWith('/get-started')} />
           <SidebarItem icon={Home} name="Home" path="/home" active={location === '/home' || location === '/dashboard'} />
           
           <div className="my-3 border-t border-border/50 mx-2" />
           
           <SidebarItem icon={Megaphone} name="Campaigns" path="/campaigns" active={location.startsWith('/campaigns')} />
           <SidebarItem icon={Zap} name="Automations" path="/automations" active={location.startsWith('/automations')} />
           <ExpandableItem name="Flows" icon={GitBranch} expanded={!!expanded['Flows']} onClick={() => toggleExpand('Flows')} active={location.startsWith('/flows')}>
             <SubItem name="AI Image" path="/flows/ai-image" active={location.startsWith('/flows/ai-image')} />
             <SubItem name="AI Video" path="/flows/ai-video" active={location.startsWith('/flows/ai-video')} />
             <SubItem name="AI Calls" path="/flows/ai-calls" active={location.startsWith('/flows/ai-calls')} />
           </ExpandableItem>

           <div className="my-3 border-t border-border/50 mx-2" />

           <SidebarItem icon={Layers} name="Segments" path="/segments" active={location.startsWith('/segments')} />
           <SidebarItem icon={Users} name="Audience" path="/customers" active={location.startsWith('/customers')} />

           <ExpandableItem name="Content" icon={LayoutGrid} expanded={!!expanded['Content']} onClick={() => toggleExpand('Content')} active={location.startsWith('/templates') || location.startsWith('/content')}>
              <SubItem name="Templates" path="/templates" active={location.startsWith('/templates')} />
              <SubItem name="Universal Content" path="/content/universal-content" active={location.startsWith('/content/universal-content')} />
              <SubItem name="Media & Brand" path="/content/media-brand" active={location.startsWith('/content/media-brand')} />
           </ExpandableItem>

           <div className="my-3 border-t border-border/50 mx-2" />

           <ExpandableItem name="Analytics" icon={BarChart2} expanded={!!expanded['Analytics']} onClick={() => toggleExpand('Analytics')} active={location.startsWith('/analytics')}>
             <SubItem name="Overview" path="/analytics" active={location === '/analytics'} />
             <SubItem name="Revenue Attribution" path="/analytics/revenue-attribution" active={location.startsWith('/analytics/revenue-attribution')} />
             <SubItem name="Deliverability" path="/analytics/deliverability" active={location.startsWith('/analytics/deliverability')} />
             <SubItem name="Benchmarks" path="/analytics/benchmarks" active={location.startsWith('/analytics/benchmarks')} />
             <SubItem name="A/B Tests" path="/analytics/ab-tests" active={location.startsWith('/analytics/ab-tests')} />
           </ExpandableItem>

           <ExpandableItem name="E-commerce" icon={ShoppingBag} expanded={!!expanded['Ecommerce']} onClick={() => toggleExpand('Ecommerce')} active={location.startsWith('/ecommerce')}>
             <SubItem name="Catalog" path="/ecommerce/catalog" active={location.startsWith('/ecommerce/catalog')} />
             <SubItem name="Coupons" path="/ecommerce/coupons" active={location.startsWith('/ecommerce/coupons')} />
             <SubItem name="Predicted Analytics" path="/ecommerce/predicted-analytics" active={location.startsWith('/ecommerce/predicted-analytics')} />
           </ExpandableItem>

           <ExpandableItem name="Compliance" icon={ShieldCheck} expanded={!!expanded['Compliance']} onClick={() => toggleExpand('Compliance')} active={location.startsWith('/compliance')}>
             <SubItem name="Audit Log" path="/compliance/audit-log" active={location.startsWith('/compliance/audit-log')} />
             <SubItem name="Consent & Compliance" path="/compliance/consent" active={location.startsWith('/compliance/consent')} />
             <SubItem name="Suppression List" path="/compliance/suppression-list" active={location.startsWith('/compliance/suppression-list')} />
           </ExpandableItem>

           <div className="my-3 border-t border-border/50 mx-2" />

           <SidebarItem icon={Puzzle} name="Integrations" path="/integrations" active={location.startsWith('/integrations')} />
         </nav>
         
         <div className="p-2 border-t border-border/50">
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="w-full justify-start px-2 h-10 hover:bg-gray-100 dark:hover:bg-secondary/50 rounded-md">
                 <Avatar className="h-6 w-6 mr-2">
                   <AvatarFallback className="text-[10px] font-medium bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100">LD</AvatarFallback>
                 </Avatar>
                 <span className="text-sm font-medium truncate flex-1 text-left">Lazy Developer</span>
                 <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-48" align="start">
               <DropdownMenuLabel className="font-normal">
                 <div className="flex flex-col space-y-1">
                   <p className="text-sm font-medium leading-none">Lazy Developer</p>
                   <p className="text-xs leading-none text-muted-foreground">
                     lazy@example.com
                   </p>
                 </div>
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => setLocation('/settings')}>
                 <Settings className="mr-2 h-4 w-4" />
                 <span>Settings</span>
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                 <PieChart className="mr-2 h-4 w-4" />
                 <span>Toggle Theme</span>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => setLocation('/login')}>
                 <LogOut className="mr-2 h-4 w-4" />
                 <span>Log out</span>
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
         </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 border-b bg-white dark:bg-card flex items-center justify-between px-4 shrink-0 relative">
          <div className="flex-1" />
          
          <div ref={searchRef} className="relative flex items-center justify-center flex-1 w-full max-w-[400px]">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
             <input
               ref={inputRef}
               value={searchQuery}
               onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
               onFocus={() => setSearchOpen(true)}
               placeholder="Search pages…"
               className={`w-full pl-9 pr-14 h-[34px] rounded-xl text-sm outline-none transition-all bg-gray-50/70 dark:bg-secondary/30
                 ${searchOpen
                   ? 'border-2 border-foreground'
                   : 'border border-border hover:border-foreground/40'
                 }`}
             />
             <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
               <kbd className="inline-flex h-[20px] items-center gap-1 rounded-xl bg-white dark:bg-background border px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                 ctrl+k
               </kbd>
             </div>

             {/* Dropdown */}
             {searchOpen && (
               <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                 {searchQuery.trim() === '' ? (
                   /* Default suggestions */
                   <div className="p-2">
                     <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1.5">Suggestions</p>
                     {SUGGESTIONS.map(label => {
                       const page = ALL_PAGES.find(p => p.label === label);
                       if (!page) return null;
                       return (
                         <button key={page.path}
                           onMouseDown={() => { setLocation(page.path); setSearchOpen(false); setSearchQuery(''); }}
                           className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-secondary transition-colors text-left">
                           <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                           <span className="text-sm flex-1">{page.label}</span>
                           <span className="text-[10px] text-muted-foreground">{page.group}</span>
                         </button>
                       );
                     })}
                   </div>
                 ) : searchResults.length > 0 ? (
                   /* Search results */
                   <div className="p-2">
                     <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1.5">
                       {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                     </p>
                     {searchResults.map(page => (
                       <button key={page.path}
                         onMouseDown={() => { setLocation(page.path); setSearchOpen(false); setSearchQuery(''); }}
                         className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-secondary transition-colors text-left group">
                         <div className="w-6 h-6 rounded-md bg-secondary group-hover:bg-foreground/10 flex items-center justify-center shrink-0">
                           <Search className="w-3 h-3 text-muted-foreground" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <p className="text-sm font-medium truncate">{page.label}</p>
                         </div>
                         <span className="text-[10px] text-muted-foreground shrink-0 px-1.5 py-0.5 bg-secondary rounded-md">{page.group}</span>
                       </button>
                     ))}
                   </div>
                 ) : (
                   /* No results */
                   <div className="px-4 py-8 text-center">
                     <p className="text-sm text-muted-foreground">No pages found for "<span className="font-medium text-foreground">{searchQuery}</span>"</p>
                   </div>
                 )}
                 <div className="px-3 py-2 border-t border-border/60 bg-muted/20 flex items-center gap-3">
                   <span className="text-[10px] text-muted-foreground"><kbd className="px-1 border border-border rounded text-[9px] bg-background">↵</kbd> to navigate</span>
                   <span className="text-[10px] text-muted-foreground"><kbd className="px-1 border border-border rounded text-[9px] bg-background">esc</kbd> to close</span>
                 </div>
               </div>
             )}
          </div>
          
          <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
             {/* Bell — notifications panel */}
             <div className="relative">
               <Button
                 variant="ghost" size="icon"
                 className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
                 onClick={() => setShowNotifications(v => !v)}
               >
                 <Bell className="h-[18px] w-[18px]" />
                 {unreadCount > 0 && (
                   <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-foreground" />
                 )}
               </Button>
               {showNotifications && (
                 <NotificationsPanel onClose={() => setShowNotifications(false)} />
               )}
             </div>

             {/* Account plan → Settings billing tab */}
             <Button
               variant="outline" size="sm"
               className="h-8 text-xs px-3 rounded-md font-medium shadow-none hidden sm:inline-flex"
               onClick={() => setLocation('/settings?tab=billing')}
             >
               Account plan
             </Button>

             {/* Support → Settings support tab */}
             <Button
               variant="ghost" size="sm"
               className="h-8 text-xs px-3 font-medium text-muted-foreground hover:text-foreground hidden sm:inline-flex"
               onClick={() => setLocation('/settings?tab=support')}
             >
               Support
             </Button>


          </div>

          {/* Click outside overlay to close notifications */}
          {showNotifications && (
            <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden bg-white dark:bg-background">
          {children}
        </main>
      </div>
    </div>
    </div>
  );
}
