import React from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

// Layout
import { Shell } from '@/components/layout/Shell';

// Pages (to be implemented)
import Landing from '@/pages/landing';
import GetStarted from '@/pages/get-started';
import Dashboard from '@/pages/dashboard';
import Customers from '@/pages/customers';
import Segments from '@/pages/segments';
import Campaigns from '@/pages/campaigns';
import CreateCampaign from '@/pages/campaigns/create';
import Templates from '@/pages/templates';
import Automations from '@/pages/automations';
import AIImage from '@/pages/flows/ai-image';
import AIVideo from '@/pages/flows/ai-video';
import AICalls from '@/pages/flows/ai-calls';
import Analytics from '@/pages/analytics';
import Integrations from '@/pages/integrations';
import Settings from '@/pages/settings';

// Auth Pages (to be implemented)
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import ForgotPassword from '@/pages/auth/forgot-password';
import NotFound from '@/pages/not-found';

function AppRouter() {
  return (
    <Switch>
      {/* Public Routes - No Shell */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />

      {/* App Routes - Within Shell */}
      <Route path="/get-started">
        <Shell><GetStarted /></Shell>
      </Route>
      <Route path="/home">
        <Shell><Dashboard /></Shell>
      </Route>
      <Route path="/dashboard">
        <Shell><Dashboard /></Shell>
      </Route>
      <Route path="/customers">
        <Shell><Customers /></Shell>
      </Route>
      <Route path="/segments">
        <Shell><Segments /></Shell>
      </Route>
      <Route path="/campaigns">
        <Shell><Campaigns /></Shell>
      </Route>
      <Route path="/campaigns/create">
        <Shell><CreateCampaign /></Shell>
      </Route>
      <Route path="/templates">
        <Shell><Templates /></Shell>
      </Route>
      <Route path="/automations">
        <Shell><Automations /></Shell>
      </Route>
      <Route path="/flows/ai-image">
        <Shell><AIImage /></Shell>
      </Route>
      <Route path="/flows/ai-video">
        <Shell><AIVideo /></Shell>
      </Route>
      <Route path="/flows/ai-calls">
        <Shell><AICalls /></Shell>
      </Route>
      <Route path="/analytics">
        <Shell><Analytics /></Shell>
      </Route>
      <Route path="/integrations">
        <Shell><Integrations /></Shell>
      </Route>
      <Route path="/settings">
        <Shell><Settings /></Shell>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
          <AppRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
