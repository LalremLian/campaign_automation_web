import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link, useLocation } from 'wouter';

export default function Register() {
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 bg-foreground rounded flex items-center justify-center">
            <span className="text-background font-bold text-xl leading-none">M</span>
          </div>
        </div>
        
        <Card className="border-border/60 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your details to get started with MarketFlow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" required className="bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="bg-background" />
              </div>
              <Button type="submit" className="w-full bg-foreground text-background">
                Create Account
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
