import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link, useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    setLocation('/login');
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
            <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required className="bg-background" />
              </div>
              <Button type="submit" className="w-full bg-foreground text-background">
                Send Reset Link
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/login">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to sign in
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
