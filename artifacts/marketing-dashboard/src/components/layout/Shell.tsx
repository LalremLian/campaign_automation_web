import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import {
  Home,
  CircleDot,
  SquarePen,
  Megaphone,
  GitBranch,
  Users,
  LayoutGrid,
  Puzzle,
  Search,
  Bell,
  Wand2,
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  PieChart,
  BarChart2,
  ShoppingBag,
  ShieldCheck,
  FormInput,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';

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
    <div className="flex h-screen overflow-hidden bg-background">
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
           <SidebarItem icon={SquarePen} name="Composer" />
           
           <div className="my-3 border-t border-border/50 mx-2" />
           
           <SidebarItem icon={Megaphone} name="Campaigns" path="/campaigns" active={location.startsWith('/campaigns')} />
           <ExpandableItem name="Flows" icon={GitBranch} expanded={!!expanded['Flows']} onClick={() => toggleExpand('Flows')} active={location.startsWith('/flows')}>
             <SubItem name="AI Image" path="/flows/ai-image" active={location.startsWith('/flows/ai-image')} />
             <SubItem name="AI Video" path="/flows/ai-video" active={location.startsWith('/flows/ai-video')} />
             <SubItem name="AI Calls" path="/flows/ai-calls" active={location.startsWith('/flows/ai-calls')} />
           </ExpandableItem>

           <div className="my-3 border-t border-border/50 mx-2" />

           <SidebarItem icon={FormInput} name="Forms" path="/forms" active={location.startsWith('/forms')} />
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
        <header className="h-14 border-b bg-white dark:bg-card flex items-center justify-between px-4 shrink-0">
          <div className="flex-1" />
          
          <div className="relative flex items-center justify-center flex-1 w-full max-w-[400px]">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input 
               className="w-full pl-9 pr-14 bg-gray-50/70 dark:bg-secondary/30 border-input h-[34px] rounded-md text-sm shadow-none focus-visible:ring-1 focus-visible:ring-ring" 
               placeholder="Search" 
             />
             <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
               <kbd className="inline-flex h-[20px] items-center gap-1 rounded bg-white dark:bg-background border px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                 ctrl+k
               </kbd>
             </div>
          </div>
          
          <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
               <Bell className="h-[18px] w-[18px]" />
             </Button>
             <Button variant="outline" size="sm" className="h-8 text-xs px-3 rounded-md font-medium shadow-none hidden sm:inline-flex">
               Account plan
             </Button>
             <Button variant="ghost" size="sm" className="h-8 text-xs px-3 font-medium text-muted-foreground hover:text-foreground hidden sm:inline-flex">
               Support
             </Button>
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
               <Wand2 className="h-[18px] w-[18px]" />
             </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-white dark:bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
