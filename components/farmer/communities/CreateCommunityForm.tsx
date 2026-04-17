'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getCategoryIcon, getCategoryColor } from '@/lib/community-icons';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  description: string;
  category: string;
  language: string;
  private: boolean;
  rules: string;
}

export function CreateCommunityForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    category: 'crop',
    language: 'English',
    private: false,
    rules: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Community name is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }

    if (formData.name.length < 3) {
      toast.error('Name must be at least 3 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Community created! Waiting for admin approval.');
        setTimeout(() => {
          router.push('/farmer/communities');
        }, 1500);
      } else {
        toast.error('Failed to create community');
      }
    } catch (error) {
      console.error('[v0] Error creating community:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌾</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Create Your Community</h1>
        </div>
        <p className="text-base text-muted-foreground max-w-2xl">
          Build a thriving community where farmers connect, share knowledge, exchange experiences, and solve farming challenges together.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Community Details
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            All communities go through admin approval before becoming publicly visible
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Community Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Community Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Wheat Farmers of Maharashtra"
                value={formData.name}
                onChange={handleChange}
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">
                {formData.name.length}/50 characters
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="What is your community about? Who should join? What will you discuss?"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/500 characters
              </p>
            </div>

            {/* Category - Card-based Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold block">Category *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['crop', 'location', 'problem', 'other'].map((cat) => {
                  const isSelected = formData.category === cat;
                  const color = getCategoryColor(cat);
                  const icon = getCategoryIcon(cat);
                  const labels: Record<string, string> = {
                    crop: 'Crop/Commodity',
                    location: 'Location/Region',
                    problem: 'Problem/Challenge',
                    other: 'Other Topics',
                  };
                  const descriptions: Record<string, string> = {
                    crop: 'Discuss specific crops, cultivation techniques',
                    location: 'Connect with farmers in your region',
                    problem: 'Share and solve farming challenges',
                    other: 'General farming discussions',
                  };

                  return (
                    <button
                      key={cat}
                      onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : `${color.border} bg-card hover:shadow-md`
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-1">{icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-foreground">{labels[cat]}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{descriptions[cat]}</p>
                        </div>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label htmlFor="language" className="text-base font-semibold">
                Primary Language *
              </Label>
              <Select
                value={formData.language}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, language: value }))
                }
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hindi">Hindi (हिंदी)</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Marathi">Marathi (मराठी)</SelectItem>
                  <SelectItem value="Tamil">Tamil (தமிழ்)</SelectItem>
                  <SelectItem value="Telugu">Telugu (తెలుగు)</SelectItem>
                  <SelectItem value="Gujarati">Gujarati (ગુજરાતી)</SelectItem>
                  <SelectItem value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Privacy */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Privacy *</Label>
              <RadioGroup
                value={formData.private ? 'private' : 'public'}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, private: value === 'private' }))
                }
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex-1 cursor-pointer font-normal">
                    <span className="font-semibold">Public</span>
                    <p className="text-xs text-muted-foreground">
                      Anyone can discover and join your community
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex-1 cursor-pointer font-normal">
                    <span className="font-semibold">Private</span>
                    <p className="text-xs text-muted-foreground">
                      Only invited members can join
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Community Rules */}
            <div className="space-y-2">
              <Label htmlFor="rules" className="text-base font-semibold">
                Community Rules (Optional)
              </Label>
              <Textarea
                id="rules"
                name="rules"
                placeholder="e.g., No spam, Be respectful, Share verified information only"
                value={formData.rules}
                onChange={handleChange}
                rows={3}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                These rules will be displayed to all members
              </p>
            </div>

            {/* Admin Approval Notice */}
            <Alert>
              <AlertDescription className="text-sm">
                ℹ️ Your community will go through admin approval before it becomes visible publicly.
                This ensures quality and compliance with guidelines.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={loading}
              >
                {loading ? 'Creating Community...' : (
                  <>
                    Create Community
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
