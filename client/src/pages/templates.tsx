import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutTemplate, Plus, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const templates = [
  { id: 1, name: 'Minimal Newsletter', category: 'Newsletter', img: 'rect1', uses: 1240 },
  { id: 2, name: 'Product Launch Boxy', category: 'Product Launch', img: 'rect2', uses: 890 },
  { id: 3, name: 'Welcome Series Standard', category: 'Welcome', img: 'rect3', uses: 3450 },
  { id: 4, name: 'Abandoned Cart Nudge', category: 'Abandoned Cart', img: 'rect1', uses: 2100 },
  { id: 5, name: 'Holiday Sale Grid', category: 'Promotion', img: 'rect2', uses: 1560 },
  { id: 6, name: 'Digest Text Heavy', category: 'Newsletter', img: 'rect3', uses: 420 },
  { id: 7, name: 'Feedback Request', category: 'Welcome', img: 'rect1', uses: 850 },
  { id: 8, name: 'Re-engagement Plain', category: 'Promotion', img: 'rect2', uses: 1120 },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filtered = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground mt-1">Design and manage reusable email templates.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-[360px] hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-9 bg-background"
            />
          </div>
          <Button className="bg-foreground text-background">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" onValueChange={setActiveCategory}>
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 space-x-6">
          {['All', 'Newsletter', 'Promotion', 'Welcome', 'Abandoned Cart', 'Product Launch'].map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent pb-3 px-0 font-medium"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-8">
          <motion.div 
            layout
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filtered.map((template) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={template.id}
              >
                <Card className="overflow-hidden group border-border/60 hover:border-border transition-all cursor-pointer">
                  {/* Mock Thumbnail generator */}
                  <div className="aspect-[3/4] bg-secondary/30 relative flex flex-col p-4 border-b">
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px] z-10">
                      <Button variant="secondary" className="shadow-lg">
                        <Eye className="w-4 h-4 mr-2" /> Preview
                      </Button>
                    </div>
                    
                    {/* Abstract visual representations of templates */}
                    {template.img === 'rect1' && (
                      <div className="w-full h-full space-y-4">
                        <div className="w-full h-1/3 bg-muted rounded"></div>
                        <div className="w-3/4 h-4 bg-muted rounded mx-auto"></div>
                        <div className="w-1/2 h-4 bg-muted rounded mx-auto"></div>
                        <div className="w-full h-24 bg-muted/50 rounded mt-auto"></div>
                      </div>
                    )}
                    {template.img === 'rect2' && (
                      <div className="w-full h-full flex flex-col gap-2">
                        <div className="w-full h-12 bg-muted rounded"></div>
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <div className="bg-muted rounded"></div>
                          <div className="bg-muted rounded"></div>
                        </div>
                        <div className="w-1/2 h-8 bg-foreground mx-auto rounded mt-4"></div>
                      </div>
                    )}
                    {template.img === 'rect3' && (
                      <div className="w-full h-full space-y-2">
                        <div className="w-12 h-12 bg-muted rounded-full mb-4"></div>
                        <div className="w-full h-4 bg-muted rounded"></div>
                        <div className="w-full h-4 bg-muted rounded"></div>
                        <div className="w-5/6 h-4 bg-muted rounded"></div>
                        <div className="w-full h-32 bg-muted rounded mt-4"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-card">
                    <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">{template.category}</div>
                    <h3 className="font-semibold text-foreground truncate">{template.name}</h3>
                    <div className="text-xs text-muted-foreground mt-2">Used {template.uses} times</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Tabs>
    </div>
  );
}
