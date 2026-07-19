import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockCustomers, Customer } from '@/lib/mock-data';
import { Search, Filter, ChevronRight, Download, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// ─── Generate a consistent color from a name string ───────────
function nameToHsl(name: string): { bg: string; text: string; border: string } {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  return {
    bg:     `hsl(${hue}, 70%, 88%)`,
    text:   `hsl(${hue}, 55%, 30%)`,
    border: `hsl(${hue}, 60%, 75%)`,
  };
}

// Stat card palettes
const STAT_COLORS = [
  { bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800', label: 'text-violet-600 dark:text-violet-400', value: 'text-violet-900 dark:text-violet-200' },
  { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', label: 'text-emerald-600 dark:text-emerald-400', value: 'text-emerald-900 dark:text-emerald-200' },
];

export default function Customers() {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    return mockCustomers.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.email.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 20); // Just show first 20 for prototype
  }, [search]);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer database and view profiles.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-border">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Add Customer
          </Button>
        </div>
      </div>

      <Card className="border-border/50 overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between bg-card">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9 border-border bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredData.length} of 5,000+
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-[250px]">Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end cursor-pointer group">
                    Orders <ArrowUpDown className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end cursor-pointer group">
                    Total Spend <ArrowUpDown className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Last Active</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(10)].map((_, i) => (
                  <TableRow key={i} className="border-border">
                    <TableCell><div className="flex items-center gap-3"><Skeleton className="h-8 w-8 rounded-full" /><div className="space-y-1"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-32" /></div></div></TableCell>
                    <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No customers found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((customer, i) => (
                  <TableRow 
                    key={customer.id} 
                    className="cursor-pointer hover:bg-secondary/30 border-border transition-colors"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {(() => {
                          const clr = nameToHsl(customer.name);
                          return (
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border"
                              style={{ backgroundColor: clr.bg, color: clr.text, borderColor: clr.border }}
                            >
                              {customer.avatar}
                            </div>
                          );
                        })()}
                        <div>
                          <div className="font-medium text-sm">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] h-5 w-16 justify-center px-0 font-medium ${
                        customer.status === 'active'   ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' :
                        customer.status === 'inactive' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' :
                                                         'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                      }`}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{customer.country}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{customer.totalOrders}</TableCell>
                    <TableCell className="text-right text-sm font-medium">${customer.totalSpend.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {format(new Date(customer.lastPurchase), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-card">
          <div>Page 1 of 250</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      <Sheet open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <SheetContent className="w-full sm:max-w-md border-l border-border bg-background p-0 sm:max-w-lg">
          {selectedCustomer && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b bg-card">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {(() => {
                      const clr = nameToHsl(selectedCustomer.name);
                      return (
                        <div
                          className="h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0 border-2"
                          style={{ backgroundColor: clr.bg, color: clr.text, borderColor: clr.border }}
                        >
                          {selectedCustomer.avatar}
                        </div>
                      );
                    })()}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                        <Button variant="ghost" size="icon" className="h-7 w-7 ml-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-[10px] h-5 w-16 justify-center px-0 font-medium ${
                          selectedCustomer.status === 'active'   ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' :
                          selectedCustomer.status === 'inactive' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' :
                                                                   'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                        }`}>{selectedCustomer.status}</Badge>
                        <span className="text-xs text-muted-foreground">{selectedCustomer.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <Card className={`p-4 border ${STAT_COLORS[0].bg} ${STAT_COLORS[0].border}`}>
                    <div className={`text-xs uppercase tracking-wider font-semibold mb-1 ${STAT_COLORS[0].label}`}>Lifetime Value</div>
                    <div className={`text-2xl font-bold ${STAT_COLORS[0].value}`}>${selectedCustomer.totalSpend.toLocaleString()}</div>
                  </Card>
                  <Card className={`p-4 border ${STAT_COLORS[1].bg} ${STAT_COLORS[1].border}`}>
                    <div className={`text-xs uppercase tracking-wider font-semibold mb-1 ${STAT_COLORS[1].label}`}>Total Orders</div>
                    <div className={`text-2xl font-bold ${STAT_COLORS[1].value}`}>{selectedCustomer.totalOrders}</div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                    Contact Details
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Edit</Button>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="col-span-2 font-medium">{selectedCustomer.phone}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-muted-foreground">Location</span>
                      <span className="col-span-2 font-medium">{selectedCustomer.country}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                    Tags
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Manage</Button>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Recent Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-foreground mt-1.5 shrink-0 relative">
                        <div className="absolute top-3 left-[3px] w-[1px] h-10 bg-border -translate-x-1/2"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Placed Order #1042</div>
                        <div className="text-xs text-muted-foreground">Today at 10:42 AM • $124.50</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-border mt-1.5 shrink-0 relative">
                        <div className="absolute top-3 left-[3px] w-[1px] h-10 bg-border -translate-x-1/2"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Opened "Winter Sale" Email</div>
                        <div className="text-xs text-muted-foreground">Yesterday at 4:15 PM</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-border mt-1.5 shrink-0"></div>
                      <div>
                        <div className="text-sm font-medium">Added to Segment: VIP Customers</div>
                        <div className="text-xs text-muted-foreground">Oct 12, 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
