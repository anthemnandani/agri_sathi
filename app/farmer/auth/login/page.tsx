import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/farmer/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Login - AgriSathi',
  description: 'Login to your AgriSathi farmer account',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-600 to-green-800" />
          </div>
          <CardTitle className="text-2xl">AgriSathi</CardTitle>
          <CardDescription>
            Sign in to your farmer account with OTP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/farmer/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
