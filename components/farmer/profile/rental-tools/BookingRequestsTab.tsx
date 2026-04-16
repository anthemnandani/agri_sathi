'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Calendar, DollarSign, MapPin, Phone, MessageSquare, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface BookingRequest {
  id: string;
  renterName: string;
  renterPhone: string;
  renterLocation: string;
  toolName: string;
  toolCategory: string;
  rentalDuration: {
    from: string;
    to: string;
  };
  dailyRate: number;
  totalCost: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

interface BookingRequestsTabProps {
  bookingRequests: BookingRequest[];
  isLoading: boolean;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export function BookingRequestsTab({
  bookingRequests,
  isLoading,
  onApprove,
  onReject,
}: BookingRequestsTabProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [dialogState, setDialogState] = useState<{
    type: 'approve' | 'reject' | null;
    requestId: string | null;
  }>({ type: null, requestId: null });

  const filteredRequests = bookingRequests.filter((req) => {
    if (filterStatus === 'all') return true;
    return req.status === filterStatus;
  });

  const handleApprove = async (requestId: string) => {
    try {
      await fetch(`/api/farmer/booking-requests/${requestId}/approve`, {
        method: 'POST',
      });
      onApprove(requestId);
      toast.success('Booking request approved!');
    } catch (error) {
      toast.error('Failed to approve booking request');
    }
    setDialogState({ type: null, requestId: null });
  };

  const handleReject = async (requestId: string) => {
    try {
      await fetch(`/api/farmer/booking-requests/${requestId}/reject`, {
        method: 'POST',
      });
      onReject(requestId);
      toast.success('Booking request rejected');
    } catch (error) {
      toast.error('Failed to reject booking request');
    }
    setDialogState({ type: null, requestId: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (bookingRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-muted-foreground">No booking requests yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <Tabs
        value={filterStatus}
        onValueChange={(value) => setFilterStatus(value as 'all' | 'pending' | 'approved' | 'rejected')}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({bookingRequests.length})</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending ({bookingRequests.filter((r) => r.status === 'pending').length})
            {bookingRequests.filter((r) => r.status === 'pending').length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved ({bookingRequests.filter((r) => r.status === 'approved').length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({bookingRequests.filter((r) => r.status === 'rejected').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Booking Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground text-lg">{request.renterName}</h3>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status === 'pending' && '⏳ Pending'}
                      {request.status === 'approved' && '✓ Approved'}
                      {request.status === 'rejected' && '✕ Rejected'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Wants to rent: <span className="font-medium text-foreground">{request.toolName}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{request.renterLocation}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {new Date(request.rentalDuration.from).toLocaleDateString()} to{' '}
                        {new Date(request.rentalDuration.to).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-b">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Duration</p>
                  <p className="text-sm font-semibold text-foreground">
                    {Math.ceil(
                      (new Date(request.rentalDuration.to).getTime() -
                        new Date(request.rentalDuration.from).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    days
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Daily Rate</p>
                  <p className="text-sm font-semibold text-green-600">₹{request.dailyRate.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Total Cost</p>
                  <p className="text-lg font-bold text-green-700">₹{request.totalCost.toLocaleString()}</p>
                </div>
              </div>

              {/* Contact & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-2">
                  <a href={`tel:${request.renterPhone}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="hidden sm:inline">Call</span>
                    </Button>
                  </a>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Message</span>
                  </Button>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                      onClick={() => setDialogState({ type: 'reject', requestId: request.id })}
                    >
                      <X className="h-4 w-4" />
                      <span className="hidden sm:inline">Reject</span>
                    </Button>
                    <Button
                      className="gap-2 bg-green-600 hover:bg-green-700"
                      size="sm"
                      onClick={() => setDialogState({ type: 'approve', requestId: request.id })}
                    >
                      <Check className="h-4 w-4" />
                      <span className="hidden sm:inline">Approve</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialogs */}
      <AlertDialog
        open={dialogState.type === 'approve' && dialogState.requestId !== null}
        onOpenChange={() => setDialogState({ type: null, requestId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Booking Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will confirm the rental. The renter will receive a notification and can pick up or arrange delivery of the tool.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => dialogState.requestId && handleApprove(dialogState.requestId)}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={dialogState.type === 'reject' && dialogState.requestId !== null}
        onOpenChange={() => setDialogState({ type: null, requestId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Booking Request?</AlertDialogTitle>
            <AlertDialogDescription>
              The renter will be notified that you cannot provide this rental at this time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => dialogState.requestId && handleReject(dialogState.requestId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
