import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Zap, Clock, Mail, AlertCircle, Plus,
  Pause, Settings2, TrendingUp, ImageIcon, Video, Phone, Sparkles
} from 'lucide-react';

const flows = [
  { id: 1, name: 'Welcome Series',          status: 'active', triggers: 12450, steps: 3 },
  { id: 2, name: 'Abandoned Cart',          status: 'active', triggers: 3200,  steps: 5 },
  { id: 3, name: 'Post-Purchase Follow-up', status: 'paused', triggers: 890,   steps: 2 },
  { id: 4, name: 'Win-back Campaign',       status: 'draft',  triggers: 0,     steps: 4 },
  { id: 5, name: 'VIP Milestone',           status: 'active', triggers: 450,   steps: 1 },
];

type NodeKind = 'trigger' | 'filter' | 'delay' | 'email' | 'ai-image' | 'ai-video' | 'ai-call';

interface FlowNode {
  id: string; kind: NodeKind; label: string; sublabel: string;
  badge?: string; stats?: { open?: string; click?: string };
}

const nodes: FlowNode[] = [
  { id: 'n1', kind: 'trigger',  label: 'Checkout Started',                sublabel: 'Trigger logic' },
  { id: 'n2', kind: 'filter',   label: 'Flow Filter',                     sublabel: 'Placed Order zero times since starting' },
  { id: 'n3', kind: 'delay',    label: 'Time Delay',                      sublabel: 'Wait 4 hours' },
  { id: 'n4', kind: 'email',    label: 'Looks like you left something...', sublabel: 'Email 1', badge: 'Email 1', stats: { open: '45.2%', click: '12.1%' } },
  { id: 'n5', kind: 'ai-image', label: 'AI Image',                        sublabel: 'Generate personalised product ad', badge: 'AI' },
  { id: 'n6', kind: 'ai-call',  label: 'AI Call',                         sublabel: 'Voice outreach if no open after 24h', badge: 'AI' },
  { id: 'n7', kind: 'ai-video', label: 'AI Video',                        sublabel: 'Re-engagement video ad', badge: 'AI' },
];

const iconMap: Record<NodeKind, React.ElementType> = {
  trigger: Zap, filter: AlertCircle, delay: Clock, email: Mail,
  'ai-image': ImageIcon, 'ai-video': Video, 'ai-call': Phone,
};

function FlowNode({ node, selected, onClick }: { node: FlowNode; selected: boolean; onClick: () => void }) {
  const Icon = iconMap[node.kind];
  const isAI = node.kind.startsWith('ai-');
  const isAccent = node.kind === 'email' || isAI;

  return (
    <div
      onClick={onClick}
      className={`w-72 rounded-lg bg-card shadow-sm cursor-pointer transition-all
        ${node.kind === 'delay' ? 'border-dashed' : ''}
        ${isAccent ? 'border-l-[3px] border-l-foreground border-y border-r' : 'border'}
        ${selected ? 'ring-2 ring-foreground ring-offset-1' : 'hover:shadow-md'}
      `}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className={`w-8 h-8 rounded flex items-center justify-center ${isAI ? 'bg-foreground' : 'bg-secondary'}`}>
            <Icon className={`w-4 h-4 ${isAI ? 'text-background' : 'text-foreground'}`} />
          </div>
          <div className="flex items-center gap-1">
            {node.badge && (
              <Badge variant="outline" className={`text-[10px] uppercase ${isAI ? 'border-foreground/40' : ''}`}>
                {node.badge}
              </Badge>
            )}
            {isAI && <Sparkles className="w-3 h-3 text-muted-foreground" />}
          </div>
        </div>
        <p className="font-semibold text-sm text-left">{node.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 text-left">{node.sublabel}</p>
        {node.stats && (
          <div className="mt-3 pt-2.5 border-t text-xs flex justify-between text-muted-foreground">
            <span>Open: {node.stats.open}</span>
            <span>Click: {node.stats.click}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Automations() {
  const [selectedFlow, setSelectedFlow] = useState(2);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">

      {/* Left: flow list */}
      <div className="w-64 border-r bg-card flex flex-col shrink-0">
        <div className="px-4 h-12 border-b flex items-center justify-between bg-background">
          <span className="font-semibold text-sm">All Flows</span>
          <Button size="icon" variant="ghost" className="h-7 w-7"><Plus className="w-3.5 h-3.5" /></Button>
        </div>
        <div className="overflow-y-auto p-2 space-y-0.5">
          {flows.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFlow(f.id)}
              className={`w-full text-left p-3 rounded-md transition-colors
                ${selectedFlow === f.id ? 'bg-secondary border border-border' : 'hover:bg-secondary/50 border border-transparent'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-xs truncate">{f.name}</span>
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ml-2 ${
                  f.status === 'active' ? 'bg-foreground' :
                  f.status === 'paused' ? 'bg-muted-foreground' : 'border border-muted-foreground'
                }`} />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                {f.steps} steps · {f.triggers.toLocaleString()} triggers
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center: canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Toolbar */}
        <div className="border-b bg-background flex items-center justify-between px-5 h-12 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-sm">Abandoned Cart</h1>
            <Badge className="bg-foreground text-background text-[10px] px-1.5">Active</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-muted-foreground">
              <Settings2 className="w-3.5 h-3.5" /> Setup
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5" /> Metrics
            </Button>
            <Button size="sm" className="h-7 bg-foreground text-background text-xs gap-1.5">
              <Pause className="w-3 h-3" /> Pause
            </Button>
          </div>
        </div>

        {/* Dot-grid canvas */}
        <div className="flex-1 overflow-auto bg-[#f9f9f9] dark:bg-secondary/10 relative">
          <div className="absolute inset-0 pointer-events-none opacity-40"
            style={{ backgroundImage: 'radial-gradient(circle, #00000018 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative z-10 flex flex-col items-center py-12 gap-0">
            {nodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <FlowNode
                  node={node}
                  selected={selectedNode === node.id}
                  onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                />
                {idx < nodes.length - 1 && (
                  <div className="w-px h-10 bg-border flex items-center justify-center relative shrink-0">
                    <button className="absolute w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="w-3 h-3 rounded-full bg-border mt-0 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
