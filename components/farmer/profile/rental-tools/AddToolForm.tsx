'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const TOOL_CATEGORIES = [
  { id: 'tractor', name: 'Tractor', emoji: '🚜' },
  { id: 'harvester', name: 'Harvester', emoji: '🌾' },
  { id: 'cultivator', name: 'Rotavator/Cultivator', emoji: '⚙️' },
  { id: 'irrigation', name: 'Irrigation Pump', emoji: '💧' },
  { id: 'sprayer', name: 'Sprayer', emoji: '🧪' },
  { id: 'thresher', name: 'Thresher', emoji: '🔄' },
];

const TOOL_CONDITIONS = ['New', 'Excellent', 'Good', 'Fair'];
const AVAILABILITY_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface AddToolFormProps {
  onToolAdded: (tool: any) => void;
}

export function AddToolForm({ onToolAdded }: AddToolFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: 'Good',
    dailyRate: '',
    monthlyRate: '',
    availability: [] as string[],
    minRentalDays: '1',
    power: '',
    fuelType: '',
    year: new Date().getFullYear().toString(),
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData((prev) => ({ ...prev, category: categoryId }));
  };

  const handleConditionSelect = (condition: string) => {
    setFormData((prev) => ({ ...prev, condition }));
  };

  const isStep1Valid = formData.name.trim() && formData.category;
  const isStep2Valid =
    formData.dailyRate &&
    Number(formData.dailyRate) > 0 &&
    formData.monthlyRate &&
    Number(formData.monthlyRate) > 0 &&
    formData.availability.length > 0;

  const handleSubmit = async () => {
    if (!isStep1Valid || !isStep2Valid) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/farmer/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          condition: formData.condition,
          dailyRate: Number(formData.dailyRate),
          monthlyRate: Number(formData.monthlyRate),
          availability: formData.availability,
          minRentalDays: Number(formData.minRentalDays),
          power: formData.power || null,
          fuelType: formData.fuelType || null,
          year: formData.year ? Number(formData.year) : null,
          notes: formData.notes || null,
        }),
      });

      if (response.ok) {
        const newTool = await response.json();
        onToolAdded(newTool.data);
        toast.success('Tool added successfully!');
        setFormData({
          name: '',
          category: '',
          condition: 'Good',
          dailyRate: '',
          monthlyRate: '',
          availability: [],
          minRentalDays: '1',
          power: '',
          fuelType: '',
          year: new Date().getFullYear().toString(),
          notes: '',
        });
        setStep(1);
      } else {
        toast.error('Failed to add tool');
      }
    } catch (error) {
      console.error('[v0] Error adding tool:', error);
      toast.error('Error adding tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex gap-2 justify-center">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <Badge
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all ${
                step === s
                  ? 'bg-green-600 text-white'
                  : step > s
                    ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700'
              }`}
              onClick={() => s < step && setStep(s)}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </Badge>
            {s < 3 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700"></div>}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">
              What tool do you want to rent out?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TOOL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center hover:border-green-600 ${
                    formData.category === cat.id
                      ? 'border-green-600 bg-green-50 dark:bg-green-950'
                      : 'border-border'
                  }`}
                >
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <p className="text-xs font-medium text-foreground">{cat.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">
              Tool Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., John Deere Tractor, Rotavator Machine"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <p className="text-xs text-muted-foreground">Give it a clear, descriptive name</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">Tool Condition</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TOOL_CONDITIONS.map((cond) => (
                <button
                  key={cond}
                  onClick={() => handleConditionSelect(cond)}
                  className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                    formData.condition === cond
                      ? 'border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                      : 'border-border text-foreground hover:border-green-600'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              className="gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Pricing & Availability */}
      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">
                Daily Rent (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="dailyRate"
                placeholder="500"
                value={formData.dailyRate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
                min="1"
              />
              <p className="text-xs text-muted-foreground">Per day rental rate</p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">
                Monthly Rent (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="monthlyRate"
                placeholder="10000"
                value={formData.monthlyRate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
                min="1"
              />
              <p className="text-xs text-muted-foreground">Per month rental rate</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">
              Available Days <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AVAILABILITY_DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                    formData.availability.includes(day)
                      ? 'border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                      : 'border-border text-foreground hover:border-green-600'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Selected: {formData.availability.length > 0 ? formData.availability.join(', ') : 'None'}
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">Minimum Rental Duration (days)</label>
            <input
              type="number"
              name="minRentalDays"
              placeholder="1"
              value={formData.minRentalDays}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              min="1"
            />
            <p className="text-xs text-muted-foreground">Minimum days someone must rent this tool</p>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!isStep2Valid}
              className="gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Additional Details & Review */}
      {step === 3 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">Power (HP) - Optional</label>
            <input
              type="text"
              name="power"
              placeholder="40 HP"
              value={formData.power}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">Fuel Type - Optional</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select...</option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">Year - Optional</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
                min="2000"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">Additional Notes - Optional</label>
            <textarea
              name="notes"
              placeholder="e.g., Includes operator, free delivery, must return with fuel, etc."
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600 resize-none h-24"
            />
          </div>

          {/* Summary */}
          <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-foreground mb-3">Tool Summary</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Name:</span>{' '}
                <span className="font-medium">{formData.name}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Daily Rate:</span>{' '}
                <span className="font-medium">₹{formData.dailyRate || '—'}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Monthly Rate:</span>{' '}
                <span className="font-medium">₹{formData.monthlyRate || '—'}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Available:</span>{' '}
                <span className="font-medium">{formData.availability.length} days/week</span>
              </p>
            </div>
          </Card>

          <div className="flex justify-between">
            <Button
              onClick={() => setStep(2)}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Tool'}
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
