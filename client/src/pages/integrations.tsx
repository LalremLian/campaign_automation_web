import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockIntegrations } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { SiShopify, SiWoocommerce, SiStripe, SiGoogleanalytics, SiZapier } from 'react-icons/si';
import { FaSlack } from 'react-icons/fa';

const iconMap: Record<string, any> = {
  SiShopify,
  SiWoocommerce,
  SiStripe,
  SiSlack: FaSlack,
  SiGoogleanalytics,
  SiZapier,
};

// Brand colors per integration
const brandConfig: Record<string, { iconColor: string; iconBg: string; connectBtn: string; configBtn: string }> = {
  Shopify:          { iconColor: 'text-[#96BF48]', iconBg: 'bg-[#96BF48]/10',  connectBtn: 'bg-[#96BF48] hover:bg-[#7da53e] text-white border-0',         configBtn: 'border-[#96BF48]/40 text-[#5a7a2e] hover:bg-[#96BF48]/10' },
  WooCommerce:      { iconColor: 'text-[#7F54B3]', iconBg: 'bg-[#7F54B3]/10',  connectBtn: 'bg-[#7F54B3] hover:bg-[#6b3fa0] text-white border-0',         configBtn: 'border-[#7F54B3]/40 text-[#5c3a8a] hover:bg-[#7F54B3]/10' },
  Stripe:           { iconColor: 'text-[#6772E5]', iconBg: 'bg-[#6772E5]/10',  connectBtn: 'bg-[#6772E5] hover:bg-[#5469d4] text-white border-0',         configBtn: 'border-[#6772E5]/40 text-[#4a55c0] hover:bg-[#6772E5]/10' },
  Slack:            { iconColor: 'text-[#E01E5A]', iconBg: 'bg-[#E01E5A]/10',  connectBtn: 'bg-[#E01E5A] hover:bg-[#c01a4e] text-white border-0',         configBtn: 'border-[#E01E5A]/40 text-[#a01540] hover:bg-[#E01E5A]/10' },
  'Google Analytics': { iconColor: 'text-[#E37400]', iconBg: 'bg-[#E37400]/10', connectBtn: 'bg-[#E37400] hover:bg-[#c46200] text-white border-0',         configBtn: 'border-[#E37400]/40 text-[#a05000] hover:bg-[#E37400]/10' },
  Zapier:           { iconColor: 'text-[#FF4A00]', iconBg: 'bg-[#FF4A00]/10',  connectBtn: 'bg-[#FF4A00] hover:bg-[#dd3f00] text-white border-0',         configBtn: 'border-[#FF4A00]/40 text-[#c03800] hover:bg-[#FF4A00]/10' },
};

const defaultBrand = { iconColor: 'text-foreground', iconBg: 'bg-secondary', connectBtn: 'bg-foreground text-background hover:bg-foreground/90 border-0', configBtn: 'border-border hover:bg-secondary' };

export default function Integrations() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground mt-1">Connect your tools to sync data automatically.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockIntegrations.map((integration) => {
          const Icon = iconMap[integration.icon] || SiZapier;
          const brand = brandConfig[integration.name] ?? defaultBrand;
          return (
            <Card key={integration.id} className="border-border/60 flex flex-col h-full hover:border-foreground/20 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${brand.iconBg}`}>
                    <Icon className={`w-6 h-6 ${brand.iconColor}`} />
                  </div>
                  <Switch checked={integration.connected} />
                </div>
                <CardTitle className="text-xl">{integration.name}</CardTitle>
                <CardDescription className="h-10 mt-2">{integration.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {integration.connected ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Connected</span>
                    </div>
                    {integration.lastSync && (
                      <span className="text-xs text-muted-foreground ml-4">
                        Last sync: {integration.lastSync}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Not connected</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/50 bg-secondary/10">
                <Button
                  variant="outline"
                  className={`w-full text-sm font-medium transition-colors rounded-xl ${integration.connected ? brand.configBtn : brand.connectBtn}`}
                >
                  {integration.connected ? 'Configure' : 'Connect'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
