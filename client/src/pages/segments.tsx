import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSegments } from '@/lib/mock-data';
import { Plus, Users, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Segments</h1>
          <p className="text-muted-foreground mt-1">Group your audience based on behavior and properties.</p>
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
                  <select className="flex h-9 w-1/3 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>What someone has done</option>
                    <option>Properties about someone</option>
                  </select>
                  <select className="flex h-9 w-1/3 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Placed Order</option>
                    <option>Opened Email</option>
                  </select>
                  <select className="flex h-9 w-1/3 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
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
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {mockSegments.map((segment) => (
          <motion.div key={segment.id} variants={item}>
            <Card className="h-full border-border/50 hover-elevate transition-shadow flex flex-col group cursor-pointer">
              <CardHeader className="pb-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-secondary/50 font-medium rounded-sm">
                    {segment.id}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg">{segment.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1 h-10">
                  {segment.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-4 border-t border-border bg-card/50 flex items-center justify-between text-sm">
                <div className="flex items-center text-foreground font-medium">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  {segment.count.toLocaleString()}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {segment.lastUpdated}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
