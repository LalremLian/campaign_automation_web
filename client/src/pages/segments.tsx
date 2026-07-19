import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSegments } from '@/lib/mock-data';
import { Plus, Users, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CARD_COLORS = [
  { bg: 'bg-blue-50   dark:bg-blue-950/30',   border: 'border-blue-200   dark:border-blue-800',   badge: 'bg-blue-100   text-blue-700   dark:bg-blue-900   dark:text-blue-300'   },
  { bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300' },
  { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
  { bg: 'bg-amber-50  dark:bg-amber-950/30',  border: 'border-amber-200  dark:border-amber-800',  badge: 'bg-amber-100  text-amber-700  dark:bg-amber-900  dark:text-amber-300'  },
  { bg: 'bg-rose-50   dark:bg-rose-950/30',   border: 'border-rose-200   dark:border-rose-800',   badge: 'bg-rose-100   text-rose-700   dark:bg-rose-900   dark:text-rose-300'   },
  { bg: 'bg-cyan-50   dark:bg-cyan-950/30',   border: 'border-cyan-200   dark:border-cyan-800',   badge: 'bg-cyan-100   text-cyan-700   dark:bg-cyan-900   dark:text-cyan-300'   },
  { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
  { bg: 'bg-pink-50   dark:bg-pink-950/30',   border: 'border-pink-200   dark:border-pink-800',   badge: 'bg-pink-100   text-pink-700   dark:bg-pink-900   dark:text-pink-300'   },
];

export default function Segments() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-5 max-w-[1600px] mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Segments</h1>
          <p className="text-muted-foreground text-xs mt-0.5">Group your audience based on behavior and properties.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Segment</DialogTitle>
              <DialogDescription>
                Define conditions to group your customers dynamically.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Segment Name</Label>
                <Input id="name" placeholder="e.g. Highly Engaged Newbies" />
              </div>
              <div className="p-4 border rounded-md bg-secondary/20 space-y-4">
                <div className="text-sm font-medium">Conditions</div>
                <div className="flex items-center gap-2">
                  <select className="h-9 w-1/3 rounded-md border border-input bg-background px-3 pr-8 py-2 text-sm appearance-auto">
                    <option>What someone has done</option>
                    <option>Properties about someone</option>
                  </select>
                  <select className="h-9 w-1/3 rounded-md border border-input bg-background px-3 pr-8 py-2 text-sm appearance-auto">
                    <option>Placed Order</option>
                    <option>Opened Email</option>
                  </select>
                  <select className="h-9 w-1/3 rounded-md border border-input bg-background px-3 pr-8 py-2 text-sm appearance-auto">
                    <option>at least once</option>
                    <option>zero times</option>
                  </select>
                </div>
                <Button variant="outline" size="sm" className="w-full border-dashed">
                  <Plus className="w-3 h-3 mr-1" /> Add Condition
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Segment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="grid gap-3 md:grid-cols-3 lg:grid-cols-4"
      >
        {mockSegments.map((segment, idx) => {
          const c = CARD_COLORS[idx % CARD_COLORS.length];
          return (
          <motion.div key={segment.id} variants={item}>
            <Card className={`${c.bg} ${c.border} border hover-elevate transition-shadow flex flex-col group cursor-pointer`}>
              <CardHeader className="pb-2 flex-1 px-4 pt-3">
                <div className="flex justify-between items-start mb-1">
                  <Badge className={`font-medium rounded-sm text-[10px] border-0 ${c.badge}`}>
                    {segment.id}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
                <CardTitle className="text-sm">{segment.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-0.5 text-xs">
                  {segment.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className={`px-4 py-2.5 border-t ${c.border} flex items-center justify-between text-xs`}>
                <div className="flex items-center text-foreground font-medium">
                  <Users className="w-3 h-3 mr-1.5 text-muted-foreground" />
                  {segment.count.toLocaleString()}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {segment.lastUpdated}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
