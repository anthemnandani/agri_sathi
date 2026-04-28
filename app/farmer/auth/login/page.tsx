import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/farmer/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Sprout, Sun } from 'lucide-react';

export const metadata = {
  title: 'Login - AgriSathi',
  description: 'Login to your AgriSathi farmer account',
};

export default function LoginPage() {
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
              Empowering Farmers,<br />Growing Together
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Connect with farmers, access expert advice, buy and sell products, and get real-time weather alerts.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <Sprout className="h-6 w-6 text-primary-foreground mb-2" />
              <p className="text-sm font-medium text-primary-foreground">10K+ Farmers</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <Sun className="h-6 w-6 text-primary-foreground mb-2" />
              <p className="text-sm font-medium text-primary-foreground">Weather Alerts</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <Leaf className="h-6 w-6 text-primary-foreground mb-2" />
              <p className="text-sm font-medium text-primary-foreground">Expert Advice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AgriSathi</span>
          </div>

          <Card className="border-0 shadow-none lg:shadow-sm lg:border">
            <CardHeader className="space-y-1 text-center pb-4">
              <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to your farmer account with OTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/farmer/auth/register"
                    className="font-semibold text-primary hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
