import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight,
  ArrowUp, 
  Wand2, 
  X, 
  Settings, 
  Calendar, 
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function BadgeButton({ text }: { text: string }) {
  return (
    <button className="px-4 py-2 rounded-full border bg-white dark:bg-card text-sm font-medium hover:bg-gray-50 dark:hover:bg-secondary/50 transition-colors shadow-sm">
      {text}
    </button>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-[900px] mx-auto py-12 px-6 space-y-10">
         <div className="space-y-6 text-center">
            <Skeleton className="h-10 w-48 mx-auto" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <div className="flex items-center justify-center gap-3">
               <Skeleton className="h-9 w-40 rounded-full" />
               <Skeleton className="h-9 w-40 rounded-full" />
               <Skeleton className="h-9 w-40 rounded-full" />
            </div>
         </div>
         <Skeleton className="h-[110px] w-full rounded-xl" />
         <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-3">
               <Skeleton className="h-9 w-40" />
               <Skeleton className="h-9 w-60" />
            </div>
         </div>
         <Skeleton className="h-[200px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-12 px-4 sm:px-6 space-y-10">
      
      {/* 1. Welcome & 2. Composer */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
         <h1 className="text-3xl font-semibold tracking-tight">Welcome, John</h1>
         
         <div className="relative w-full rounded-xl border bg-white dark:bg-card shadow-sm overflow-hidden text-left hover:border-border/80 transition-colors">
            <textarea 
               className="w-full h-[120px] p-4 text-base bg-transparent border-none resize-none focus:outline-none placeholder:text-muted-foreground/60"
               placeholder="Write a message, generate a campaign, or ask a question..."
            />
            <div className="absolute bottom-3 right-3">
               <Button size="icon" className="h-[34px] w-[34px] rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors">
                 <ArrowUp className="h-[18px] w-[18px]" />
               </Button>
            </div>
         </div>
         
         {/* 3. Quick action pills */}
         <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <BadgeButton text="What should I set up first?" />
            <BadgeButton text="Generate a campaign" />
            <BadgeButton text="Discover missing flows" />
            <BadgeButton text="Audit my segments" />
         </div>
      </motion.div>
      
      {/* 4. Promo banner */}
      <AnimatePresence>
         {showPromo && (
           <motion.div 
             initial={{ opacity: 0, height: 0, y: 10 }}
             animate={{ opacity: 1, height: 'auto', y: 0 }}
             exit={{ opacity: 0, height: 0, y: -10, overflow: 'hidden' }}
             className="relative bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-5 overflow-hidden"
           >
              <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-[10px] shrink-0 flex items-center justify-center shadow-inner">
                 <Wand2 className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 space-y-1.5 pr-8 sm:pr-0">
                 <h3 className="font-semibold text-[15px] tracking-tight">Reach your audience via MarketFlow</h3>
                 <p className="text-sm text-muted-foreground">Unlock higher engagement and measurable ROI across every flow and campaign.</p>
                 <div className="pt-1">
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white dark:bg-background shadow-sm border-border">
                       Add Channel
                    </Button>
                 </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10" 
                onClick={() => setShowPromo(false)}
              >
                 <X className="h-4 w-4" />
              </Button>
           </motion.div>
         )}
      </AnimatePresence>
      
      {/* 5. Conversion metric row */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
         <h3 className="text-[13px] font-medium text-foreground/80 ml-1">Conversion metric</h3>
         <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button variant="outline" className="h-9 justify-start text-sm px-3 shadow-sm bg-white dark:bg-card">
               <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
               Active on Site
               <ChevronDown className="w-4 h-4 ml-1 text-muted-foreground" />
            </Button>
            
            <div className="flex items-center flex-wrap gap-3">
               <Button variant="outline" className="h-9 justify-start text-sm px-3 shadow-sm bg-white dark:bg-card">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  Time period
               </Button>
               <span className="text-[13px] text-muted-foreground">Jun 9, 2026 – Jul 9, 2026 compared to previous period</span>
            </div>
         </div>
      </motion.div>
      
      {/* 6. Business performance summary card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border shadow-sm bg-white dark:bg-card overflow-hidden">
           <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b gap-4 bg-gray-50/50 dark:bg-secondary/10">
              <div>
                 <h3 className="text-base font-semibold tracking-tight text-foreground">Business performance summary</h3>
                 <p className="text-[13px] text-muted-foreground mt-0.5">Jul 9, 2026 – Jul 9, 2026</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 shadow-sm bg-white dark:bg-background">View dashboard</Button>
           </div>
           
           <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x">
              <div className="space-y-1.5 sm:px-2 first:px-0">
                 <p className="text-[13px] font-medium text-muted-foreground">Total Revenue</p>
                 <p className="text-[32px] font-semibold tracking-tight text-foreground">$1.2M</p>
                 <p className="text-[13px] text-emerald-600 flex items-center font-medium">
                   <ArrowUpRight className="w-3.5 h-3.5 mr-0.5"/> 24.3%
                 </p>
              </div>
              <div className="space-y-1.5 sm:px-8 pt-6 sm:pt-0">
                 <p className="text-[13px] font-medium text-muted-foreground">Active Customers</p>
                 <p className="text-[32px] font-semibold tracking-tight text-foreground">45,231</p>
                 <p className="text-[13px] text-emerald-600 flex items-center font-medium">
                   <ArrowUpRight className="w-3.5 h-3.5 mr-0.5"/> 12.5%
                 </p>
              </div>
              <div className="space-y-1.5 sm:px-8 pt-6 sm:pt-0">
                 <p className="text-[13px] font-medium text-muted-foreground">Avg Conversion</p>
                 <p className="text-[32px] font-semibold tracking-tight text-foreground">3.2%</p>
                 <p className="text-[13px] text-emerald-600 flex items-center font-medium">
                   <ArrowUpRight className="w-3.5 h-3.5 mr-0.5"/> 1.1%
                 </p>
              </div>
           </div>
        </Card>
      </motion.div>
      
    </div>
  );
}
