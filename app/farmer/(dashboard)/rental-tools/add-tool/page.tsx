'use client';

import React, { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AddRentalToolPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    specifications: '',
    availability: [] as string[],
    location: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    'tractor',
    'harvester',
    'cultivator',
    'irrigation',
    'thresher',
    'sprayer',
    'baler',
  ];

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - In real scenario, connect to database
      console.log('[v0] Tool data to be saved:', formData);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setTimeout(() => {
        // Reset form
        setFormData({
          name: '',
          category: '',
          description: '',
          price: '',
          specifications: '',
          availability: [],
          location: '',
          contact: '',
        });
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('[v0] Error submitting tool:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md space-y-4">
          <div className="text-5xl">✓</div>
          <h2 className="text-2xl font-bold text-foreground">Tool Listed!</h2>
          <p className="text-muted-foreground">
            Your rental tool has been successfully listed. Farmers can now rent it.
          </p>
          <Link href="/farmer/rental-tools">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              View All Tools
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border p-4 md:p-6">
        <Link href="/farmer/rental-tools">
          <Button variant="ghost" className="mb-4 gap-2">
            <ChevronLeft className="h-5 w-5" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">List Your Equipment</h1>
        <p className="text-muted-foreground mt-2">
          Share your agricultural tools and earn extra income
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Basic Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Tool Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Deere Tractor 40 HP"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-semibold">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-semibold">
                    Daily Rental Price (₹) *
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your tool, its condition, and features..."
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">
                Specifications
              </h3>

              <div className="space-y-2">
                <Label htmlFor="specifications" className="text-sm font-semibold">
                  Key Specifications
                </Label>
                <Textarea
                  id="specifications"
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  placeholder="Power: 40 HP&#10;Fuel Type: Diesel&#10;Condition: Excellent&#10;Year: 2018"
                  rows={3}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">
                Availability
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {days.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(day)}
                      onChange={() => handleAvailabilityChange(day)}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location & Contact */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground">
                Location & Contact
              </h3>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold">
                  Village/City *
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Haryana"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-semibold">
                  Contact Number *
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Link href="/farmer/rental-tools" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
              >
                <Plus className="h-4 w-4" />
                {loading ? 'Listing...' : 'List Equipment'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
