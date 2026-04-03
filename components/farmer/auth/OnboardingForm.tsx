'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/farmer/MultiSelect';
import { toast } from 'sonner';

const onboardingSchema = z.object({
  pincode: z.string().regex(/^[0-9]{6}$/, 'Enter a valid 6-digit pincode'),
  location: z.string().min(2, 'Location is required'),
  crops: z.array(z.string()).min(1, 'Select at least one crop'),
  landSize: z.string().optional(),
  bio: z.string().optional(),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const CROP_OPTIONS = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'rice', label: 'Rice' },
  { value: 'maize', label: 'Maize' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'potato', label: 'Potato' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'onion', label: 'Onion' },
  { value: 'garlic', label: 'Garlic' },
  { value: 'chili', label: 'Chili' },
];

export function OnboardingForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      pincode: '',
      location: '',
      crops: [],
      landSize: '',
      bio: '',
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Profile completed! Redirecting to home...');
      // Redirect to home page in real implementation
    } catch (error) {
      toast.error('Failed to complete profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Pincode Field */}
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input
                  placeholder="6-digit pincode"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location / District</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your district or city"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Crops Multi-Select */}
        <FormField
          control={form.control}
          name="crops"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crops You Grow</FormLabel>
              <FormControl>
                <MultiSelect
                  options={CROP_OPTIONS}
                  selected={field.value}
                  onChange={field.onChange}
                  disabled={loading}
                  placeholder="Select crops..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Land Size Field */}
        <FormField
          control={form.control}
          name="landSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Land Size (in hectares)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 2.5"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio Field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About You (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself, your farming practices, etc."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Complete Profile'}
        </Button>
      </form>
    </Form>
  );
}
