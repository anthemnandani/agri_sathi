'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Wrench, BookOpen, Bell } from 'lucide-react';
import { MyRentalsList } from './rental-tools/MyRentalsList';
import { MyToolsList } from './rental-tools/MyToolsList';
import { AddToolForm } from './rental-tools/AddToolForm';
import { BookingRequestsTab } from './rental-tools/BookingRequestsTab';
import { toast } from 'sonner';

export function RentalToolsTab() {
  const [activeView, setActiveView] = useState<'rentals' | 'mytools' | 'bookings' | 'addtool'>('rentals');
  const [myRentals, setMyRentals] = useState<any[]>([]);
  const [myTools, setMyTools] = useState<any[]>([]);
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's rentals and tools on mount
  useEffect(() => {
    fetchRentalsAndTools();
  }, []);

  const fetchRentalsAndTools = async () => {
    try {
      setIsLoading(true);
      const [rentalsRes, toolsRes, bookingsRes] = await Promise.all([
        fetch('/api/farmer/rentals'),
        fetch('/api/farmer/tools'),
        fetch('/api/farmer/booking-requests'),
      ]);

      if (rentalsRes.ok) {
        const rentalsData = await rentalsRes.json();
        setMyRentals(rentalsData.data || []);
      }

      if (toolsRes.ok) {
        const toolsData = await toolsRes.json();
        setMyTools(toolsData.data || []);
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookingRequests(bookingsData.data || []);
      }
    } catch (error) {
      console.error('[v0] Error fetching rentals/tools/bookings:', error);
      toast.error('Failed to load rental information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToolAdded = (newTool: any) => {
    setMyTools([newTool, ...myTools]);
    setActiveView('mytools');
    toast.success('Tool added successfully!');
  };

  const handleToolDeleted = (toolId: string) => {
    setMyTools(myTools.filter((tool) => tool.id !== toolId));
    toast.success('Tool removed successfully!');
  };

  const handleToolToggled = (toolId: string, isActive: boolean) => {
    setMyTools(
      myTools.map((tool) =>
        tool.id === toolId ? { ...tool, status: isActive ? 'active' : 'inactive' } : tool
      )
    );
  };

  const handleBookingApproved = (requestId: string) => {
    setBookingRequests(
      bookingRequests.map((req) =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );
  };

  const handleBookingRejected = (requestId: string) => {
    setBookingRequests(
      bookingRequests.map((req) =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Active Rentals</p>
              <p className="text-3xl font-bold text-foreground">
                {myRentals.filter((r) => r.status === 'active').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">My Tools Listed</p>
              <p className="text-3xl font-bold text-foreground">{myTools.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Tools Earning</p>
              <p className="text-3xl font-bold text-green-600">
                ₹{myTools.reduce((sum, tool) => sum + (tool.totalEarnings || 0), 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tab Navigation */}
      <Tabs
        value={activeView}
        onValueChange={(value) => setActiveView(value as 'rentals' | 'mytools' | 'bookings' | 'addtool')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="rentals" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">My Rentals</span>
            <span className="sm:hidden">Rentals</span>
          </TabsTrigger>
          <TabsTrigger value="mytools" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">My Tools</span>
            <span className="sm:hidden">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="relative flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Booking Requests</span>
            <span className="sm:hidden">Requests</span>
            {bookingRequests.filter((r) => r.status === 'pending').length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="addtool" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Tool</span>
            <span className="sm:hidden">Add</span>
          </TabsTrigger>
        </TabsList>

        {/* My Rentals Tab */}
        <TabsContent value="rentals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tools I&apos;ve Rented</CardTitle>
              <CardDescription>
                {myRentals.length === 0
                  ? 'You haven&apos;t rented any tools yet'
                  : `You have ${myRentals.length} rental${myRentals.length !== 1 ? 's' : ''}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MyRentalsList rentals={myRentals} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Tools Tab */}
        <TabsContent value="mytools" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tools I Offer for Rent</CardTitle>
                <CardDescription>
                  {myTools.length === 0
                    ? 'Start earning by listing a tool'
                    : `You have ${myTools.length} tool${myTools.length !== 1 ? 's' : ''} listed`}
                </CardDescription>
              </div>
              <Button
                onClick={() => setActiveView('addtool')}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Add Tool
              </Button>
            </CardHeader>
            <CardContent>
              <MyToolsList
                tools={myTools}
                isLoading={isLoading}
                onDelete={handleToolDeleted}
                onToggle={handleToolToggled}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Requests Tab */}
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Requests</CardTitle>
              <CardDescription>
                {bookingRequests.filter((r) => r.status === 'pending').length > 0
                  ? `You have ${bookingRequests.filter((r) => r.status === 'pending').length} pending request${bookingRequests.filter((r) => r.status === 'pending').length !== 1 ? 's' : ''}`
                  : 'No pending booking requests'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookingRequestsTab
                bookingRequests={bookingRequests}
                isLoading={isLoading}
                onApprove={handleBookingApproved}
                onReject={handleBookingRejected}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Tool Tab */}
        <TabsContent value="addtool" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>List Your Tool for Rent</CardTitle>
              <CardDescription>
                Fill in the details to start earning from your tools. Simple, quick, and farmer-friendly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddToolForm onToolAdded={handleToolAdded} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
