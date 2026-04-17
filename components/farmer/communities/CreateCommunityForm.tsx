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
    <div className="max-w-2xl mx-auto py-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Community</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Start a community for farmers to connect, share knowledge, and solve problems together
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

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crop">Crop/Commodity</SelectItem>
                  <SelectItem value="location">Location/Region</SelectItem>
                  <SelectItem value="problem">Problem/Challenge</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose the primary focus of your community
              </p>
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
            <div className="flex gap-3 pt-4">
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
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Community'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
