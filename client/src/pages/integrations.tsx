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
  SiZapier
};

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
          return (
            <Card key={integration.id} className="border-border/60 flex flex-col h-full hover:border-foreground/20 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
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
                      <div className="w-2 h-2 rounded-full bg-foreground" />
                      <span className="text-sm font-medium">Connected</span>
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
                <Button variant="outline" className="w-full bg-background">
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
