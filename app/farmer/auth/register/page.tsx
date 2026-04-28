import React from 'react';
import Link from 'next/link';
import { RegisterForm } from '@/components/farmer/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Users, ShoppingBag, Cloud } from 'lucide-react';

export const metadata = {
  title: 'Register - AgriSathi',
  description: 'Create your AgriSathi farmer account',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-14 w-14 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold text-primary-foreground">AgriSathi</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-4">
              Join the Farming<br />Revolution
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Create your account and become part of India&apos;s largest agricultural community platform.
            </p>
          </div>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Connect with Farmers</p>
                <p className="text-sm text-primary-foreground/70">Join communities, share knowledge</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Buy & Sell Products</p>
                <p className="text-sm text-primary-foreground/70">Access marketplace, rent tools</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Cloud className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Weather Alerts</p>
                <p className="text-sm text-primary-foreground/70">Real-time forecasts & SMS alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-6 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AgriSathi</span>
          </div>

          <Card className="border-0 shadow-none lg:shadow-sm lg:border">
            <CardHeader className="space-y-1 text-center pb-4">
              <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
              <CardDescription className="text-muted-foreground">
                Join AgriSathi and start growing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    href="/farmer/auth/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
