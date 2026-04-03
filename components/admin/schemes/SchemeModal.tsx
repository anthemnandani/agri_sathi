'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface Scheme {
  id: string;
  name: string;
  organization: string;
  category: string;
  subsidy: string;
  status: 'active' | 'inactive';
  eligibility: string;
  deadline: string;
}

interface SchemeModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SchemeModal({ scheme, isOpen, onClose }: SchemeModalProps) {
  if (!scheme) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Scheme</DialogTitle>
          <DialogDescription>Update scheme details and eligibility criteria</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Scheme Name
              </Label>
              <Input id="name" defaultValue={scheme.name} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="org" className="text-sm font-medium">
                Organization
              </Label>
              <Input id="org" defaultValue={scheme.organization} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Input id="category" defaultValue={scheme.category} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="subsidy" className="text-sm font-medium">
                Subsidy
              </Label>
              <Input id="subsidy" defaultValue={scheme.subsidy} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deadline" className="text-sm font-medium">
                Application Deadline
              </Label>
              <Input id="deadline" type="date" defaultValue={scheme.deadline} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select defaultValue={scheme.status}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="eligibility" className="text-sm font-medium">
              Eligibility Criteria
            </Label>
            <Textarea
              id="eligibility"
              defaultValue={scheme.eligibility}
              className="mt-1 min-h-24"
              placeholder="Describe eligibility criteria..."
            />
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium">Benefits</Label>
            <Textarea
              defaultValue="Provides financial support for agricultural development..."
              className="mt-1 min-h-20"
              placeholder="List benefits..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
