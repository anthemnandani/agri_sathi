import React from 'react';
import Link from 'next/link';
import { RegisterForm } from '@/components/farmer/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Register - AgriSathi',
  description: 'Create your AgriSathi farmer account',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-600 to-green-800" />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join AgriSathi and connect with farmers, experts, and solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/farmer/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
