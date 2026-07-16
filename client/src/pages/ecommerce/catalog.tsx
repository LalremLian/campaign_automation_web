import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, RefreshCw, Link2, Package, Filter, Grid3X3, List, TrendingUp, Star, ArrowUpRight } from 'lucide-react';

const products = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', sku: 'WNC-001', category: 'Electronics', price: 299.99, stock: 142, sold: 1840, revenue: 551760, rating: 4.8, status: 'active', image: 'WNC' },
  { id: 2, name: 'Premium Leather Wallet', sku: 'PLW-009', category: 'Accessories', price: 89.99, stock: 83, sold: 960, revenue: 86390, rating: 4.6, status: 'active', image: 'PLW' },
  { id: 3, name: 'Stainless Steel Water Bottle', sku: 'SSW-012', category: 'Lifestyle', price: 49.99, stock: 321, sold: 2340, revenue: 116976, rating: 4.9, status: 'active', image: 'SSW' },
  { id: 4, name: 'Organic Cotton T-Shirt', sku: 'OCT-007', category: 'Apparel', price: 39.99, stock: 0, sold: 560, revenue: 22394, rating: 4.4, status: 'out_of_stock', image: 'OCT' },
  { id: 5, name: 'Smart Home Hub', sku: 'SHH-003', category: 'Electronics', price: 149.99, stock: 56, sold: 420, revenue: 62996, rating: 4.3, status: 'active', image: 'SHH' },
  { id: 6, name: 'Yoga Mat Pro', sku: 'YMP-021', category: 'Fitness', price: 79.99, stock: 18, sold: 710, revenue: 56793, rating: 4.7, status: 'low_stock', image: 'YMP' },
  { id: 7, name: 'Ceramic Coffee Mug Set', sku: 'CCM-005', category: 'Lifestyle', price: 59.99, stock: 205, sold: 1120, revenue: 67188, rating: 4.5, status: 'active', image: 'CCM' },
  { id: 8, name: 'Running Shoes Pro', sku: 'RSP-014', category: 'Footwear', price: 129.99, stock: 0, sold: 880, revenue: 114391, rating: 4.6, status: 'out_of_stock', image: 'RSP' },
];

const categories = ['All', 'Electronics', 'Accessories', 'Lifestyle', 'Apparel', 'Fitness', 'Footwear'];

const statusConfig = {
  active:       { label: 'Active',       color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900' },
  low_stock:    { label: 'Low Stock',    color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900' },
  out_of_stock: { label: 'Out of Stock', color: 'text-red-600 bg-red-50 border-red-100 dark:bg-red-950/40 dark:border-red-900' },
};

const colorMap: Record<string, string> = {
  WNC: 'from-blue-100 to-blue-50', PLW: 'from-amber-100 to-amber-50',
  SSW: 'from-cyan-100 to-cyan-50', OCT: 'from-green-100 to-green-50',
  SHH: 'from-violet-100 to-violet-50', YMP: 'from-pink-100 to-pink-50',
  CCM: 'from-orange-100 to-orange-50', RSP: 'from-indigo-100 to-indigo-50',
};

export default function Catalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Browse and manage your synced product feed.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />Sync Feed
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs bg-background">
            <Link2 className="w-3.5 h-3.5 mr-1.5" />Connect Store
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Products', value: '248', sub: '8 shown', icon: Package },
          { label: 'Total Revenue', value: '$1.08M', sub: '+12.4% vs prev', icon: TrendingUp },
          { label: 'Best Seller', value: 'WNC-001', sub: '1,840 units sold', icon: Star },
          { label: 'Out of Stock', value: '2', sub: 'Needs restocking', icon: ArrowUpRight },
        ].map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center"><Icon className="w-3.5 h-3.5 text-foreground" /></div>
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input className="pl-8 h-8 text-xs w-56 bg-background" placeholder="Search products..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <Tabs defaultValue="All" onValueChange={setCategory}>
            <TabsList className="bg-secondary/50 h-8 p-0.5 flex flex-wrap">
              {categories.map(c => <TabsTrigger key={c} value={c} className="text-xs h-7 px-3">{c}</TabsTrigger>)}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center border border-border/60 rounded-md overflow-hidden shrink-0">
          <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-secondary' : 'bg-background hover:bg-secondary/50'} transition-colors`}><Grid3X3 className="w-3.5 h-3.5" /></button>
          <button onClick={() => setView('list')} className={`p-2 border-l border-border/60 ${view === 'list' ? 'bg-secondary' : 'bg-background hover:bg-secondary/50'} transition-colors`}><List className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(p => {
            const sc = statusConfig[p.status as keyof typeof statusConfig];
            return (
              <Card key={p.id} className="border-border/60 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                <div className={`h-36 bg-gradient-to-br ${colorMap[p.image] ?? 'from-secondary to-secondary/50'} flex items-center justify-center`}>
                  <span className="text-3xl font-bold text-foreground/20">{p.image}</span>
                </div>
                <CardContent className="p-3 space-y-2">
                  <div>
                    <p className="text-xs font-semibold line-clamp-2 leading-tight group-hover:underline">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{p.sku} · {p.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">${p.price}</p>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${sc.color}`}>{sc.label}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{p.sold.toLocaleString()} sold</span>
                    <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />{p.rating}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <Card className="border-border/60">
          <div className="divide-y divide-border/60">
            <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-4">Product</div><div className="col-span-2 text-right">Price</div><div className="col-span-1 text-right">Stock</div><div className="col-span-2 text-right">Units Sold</div><div className="col-span-2 text-right">Revenue</div><div className="col-span-1 text-right">Status</div>
            </div>
            {filtered.map(p => {
              const sc = statusConfig[p.status as keyof typeof statusConfig];
              return (
                <div key={p.id} className="grid grid-cols-12 px-5 py-3.5 items-center hover:bg-secondary/20 transition-colors cursor-pointer">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorMap[p.image] ?? 'from-secondary to-secondary/50'} flex items-center justify-center shrink-0`}>
                      <span className="text-[9px] font-bold text-foreground/40">{p.image}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.sku}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-sm font-semibold">${p.price}</div>
                  <div className="col-span-1 text-right text-sm text-muted-foreground">{p.stock}</div>
                  <div className="col-span-2 text-right text-sm text-muted-foreground">{p.sold.toLocaleString()}</div>
                  <div className="col-span-2 text-right text-sm font-semibold">${(p.revenue/1000).toFixed(1)}k</div>
                  <div className="col-span-1 text-right">
                    <Badge variant="outline" className={`text-[10px] px-1.5 ${sc.color}`}>{sc.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
