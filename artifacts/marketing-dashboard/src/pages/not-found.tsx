import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      <div className="text-9xl font-bold text-secondary mb-4">404</div>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button className="bg-foreground text-background">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
