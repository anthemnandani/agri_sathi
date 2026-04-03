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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Calendar, MapPin, Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'worker' | 'buyer' | 'admin';
  status: 'active' | 'suspended' | 'inactive';
  joinDate: string;
  phone: string;
}

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'farmer':
      return 'bg-emerald-100 text-emerald-800';
    case 'worker':
      return 'bg-blue-100 text-blue-800';
    case 'buyer':
      return 'bg-amber-100 text-amber-800';
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800';
    case 'suspended':
      return 'bg-red-100 text-red-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function UserModal({ user, isOpen, onClose }: UserModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{user.name}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2">
            <Badge className={getRoleBadgeColor(user.role)}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
            <Badge className={getStatusColor(user.status)}>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
          </div>

          <Separator />

          {/* User Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Join Date</p>
                <p className="font-medium">{user.joinDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-muted rounded-lg">
              <p className="text-lg font-bold">12</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </div>
            <div className="p-2 bg-muted rounded-lg">
              <p className="text-lg font-bold">4.8</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="p-2 bg-muted rounded-lg">
              <p className="text-lg font-bold">45</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default">Edit User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
