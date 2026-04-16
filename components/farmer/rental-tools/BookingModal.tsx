'use client';

import React, { useState } from 'react';
import { X, Calendar, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: {
    id: string;
    name: string;
    price: number;
    image: string;
    owner: {
      name: string;
      contact: string;
    };
  };
}

export function BookingModal({ isOpen, onClose, tool }: BookingModalProps) {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    farmerName: '',
    farmSize: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const totalPrice = calculateDays() * tool.price;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rental-tools/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: tool.id,
          toolName: tool.name,
          ...formData,
          days: calculateDays(),
          totalPrice,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            startDate: '',
            endDate: '',
            farmerName: '',
            farmSize: '',
            phone: '',
          });
        }, 2000);
      }
    } catch (error) {
      console.error('[v0] Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="text-5xl">✓</div>
            <h3 className="text-lg font-semibold text-foreground">Booking Submitted!</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your booking request has been sent to {tool.owner.name}. They will confirm within 24 hours.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book {tool.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tool Summary */}
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Owner</span>
              <span className="text-sm text-foreground">{tool.owner.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Price</span>
              <span className="text-sm text-foreground">₹{tool.price}/day</span>
            </div>
            {calculateDays() > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Duration</span>
                  <span className="text-sm text-foreground">{calculateDays()} days</span>
                </div>
                <div className="border-t border-green-200 dark:border-green-800 pt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-green-600">Total</span>
                  <span className="text-sm font-bold text-green-600">₹{totalPrice}</span>
                </div>
              </>
            )}
          </div>

          {/* Booking Dates */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Start Date
            </Label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              End Date
            </Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              className="text-sm"
            />
          </div>

          {/* Farmer Details */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Your Name
            </Label>
            <Input
              type="text"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleInputChange}
              placeholder="Full name"
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Farm Size (acres)</Label>
            <Input
              type="text"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleInputChange}
              placeholder="e.g., 5, 10"
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Number
            </Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
              required
              className="text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.startDate || !formData.endDate}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Submitting...' : 'Request Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
