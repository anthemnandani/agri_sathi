'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';

const loginSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      otp: '',
    },
  });

  const handleSendOTP = async () => {
    const phoneIsValid = form.trigger('phone');
    if (!phoneIsValid) return;

    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
      toast.success('OTP sent to your phone');
    } catch (error) {
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Login successful! Redirecting...');
      // Redirect to home page in real implementation
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="10-digit phone number"
                  disabled={otpSent || loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Send OTP Button */}
        {!otpSent && (
          <Button
            type="button"
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>
        )}

        {/* OTP Field */}
        {otpSent && (
          <>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={loading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Verifying...' : 'Verify & Login'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOtpSent(false)}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
