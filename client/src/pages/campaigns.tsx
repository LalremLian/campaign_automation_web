import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCampaigns, Campaign } from '@/lib/mock-data';
import { Plus, Mail, Smartphone, MoreVertical, Copy, Send } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState('All');
  const [, navigate] = useLocation();

  const filtered = activeTab === 'All'
    ? mockCampaigns
    : mockCampaigns.filter(c => c.status === activeTab);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Create and manage your one-off broadcasts.</p>
        </div>
        <Button
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90 h-8 text-xs px-3"
          onClick={() => navigate('/campaigns/create')}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="All" onValueChange={setActiveTab}>
        <TabsList className="bg-secondary/50 h-8 p-0.5">
          {['All', 'Draft', 'Scheduled', 'Sending', 'Completed'].map(tab => (
            <TabsTrigger key={tab} value={tab} className="text-xs h-7 px-3">
              {tab === 'All' ? 'All' : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-2"
            >
              {filtered.length === 0 ? (
                <div className="text-center p-10 border border-dashed rounded-lg">
                  <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">No campaigns found</p>
                  <p className="text-xs text-muted-foreground mb-3">Nothing in this status yet.</p>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate('/campaigns/create')}>
                    Create One Now
                  </Button>
                </div>
              ) : (
                filtered.map(campaign => (
                  <CampaignRow key={campaign.id} campaign={campaign} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  const isEmail = campaign.type === 'Email';
  const Icon = isEmail ? Mail : Smartphone;

  // Icon color by type
  const iconStyle = isEmail
    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400';

  const statusClass =
    campaign.status === 'Completed' ? 'bg-secondary/60 text-foreground' :
    campaign.status === 'Scheduled' ? 'border-foreground/40 text-foreground' :
    campaign.status === 'Sending' ? 'bg-foreground text-background border-foreground' :
    'bg-transparent text-muted-foreground';

  return (
    <div className="flex items-center gap-3 border border-border/60 rounded-md px-4 py-2.5 bg-card hover:border-border transition-colors group">
      {/* Icon */}
      <div className={`p-1.5 rounded shrink-0 ${iconStyle}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate group-hover:underline cursor-pointer">{campaign.name}</span>
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 shrink-0 ${statusClass}`}>
            {campaign.status}
          </Badge>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5 flex gap-3">
          <span>To: <span className="text-foreground font-medium">{campaign.audience}</span></span>
          {campaign.sentAt && <span>Sent {format(new Date(campaign.sentAt), 'MMM d, yyyy')}</span>}
          {campaign.scheduledAt && <span>Scheduled {format(new Date(campaign.scheduledAt), 'MMM d, h:mm a')}</span>}
        </p>
      </div>

      {/* Metrics */}
      {(campaign.status === 'Completed' || campaign.status === 'Sending') && (
        <div className="hidden md:flex items-center gap-5 text-right shrink-0">
          <Metric label="Open"    value={`${campaign.openRate}%`}               color="text-blue-600 dark:text-blue-400" />
          <Metric label="Click"   value={`${campaign.clickRate}%`}              color="text-orange-500 dark:text-orange-400" />
          <Metric label="Revenue" value={`$${campaign.revenue.toLocaleString()}`} color="text-emerald-600 dark:text-emerald-400" />
        </div>
      )}

      {/* Actions — all same fixed size */}
      <div className="flex items-center gap-1 shrink-0 ml-2">
        {campaign.status === 'Draft'     && <Button size="sm" className="h-7 w-16 text-xs px-0">Edit</Button>}
        {campaign.status === 'Scheduled' && <Button size="sm" variant="outline" className="h-7 w-16 text-xs px-0">Cancel</Button>}
        {campaign.status === 'Completed' && <Button size="sm" variant="outline" className="h-7 w-16 text-xs px-0">Report</Button>}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="w-3.5 h-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuItem className="text-xs"><Copy className="w-3.5 h-3.5 mr-2" /> Duplicate</DropdownMenuItem>
            {campaign.status === 'Draft' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs"><Send className="w-3.5 h-3.5 mr-2" /> Send Test</DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-destructive">Delete</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-right">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className={`text-xs font-semibold ${color}`}>{value}</div>
    </div>
  );
}
