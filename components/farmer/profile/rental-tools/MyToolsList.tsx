'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2, ToggleLeft, ToggleRight, Star, Users, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface MediaFile {
  type: 'image' | 'video' | 'document';
  url: string;
  name: string;
}

interface Tool {
  id: string;
  name: string;
  category: string;
  image: string;
  condition: string;
  dailyRate: number;
  monthlyRate: number;
  status: 'active' | 'inactive';
  bookings: number;
  rating: number;
  reviews: number;
  totalEarnings: number;
  media?: MediaFile[];
  notes?: string;
}

interface MyToolsListProps {
  tools: Tool[];
  isLoading: boolean;
  onDelete: (toolId: string) => void;
  onToggle: (toolId: string, isActive: boolean) => void;
}

export function MyToolsList({ tools, isLoading, onDelete, onToggle }: MyToolsListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);
  const [mediaIndex, setMediaIndex] = useState<Record<string, number>>({});

  const handleDelete = async (toolId: string) => {
    try {
      const response = await fetch(`/api/farmer/tools/${toolId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(toolId);
        toast.success('Tool deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete tool');
    }
    setDeleteConfirm(null);
  };

  const handleToggleStatus = async (tool: Tool) => {
    try {
      const newStatus = tool.status === 'active' ? 'inactive' : 'active';
      const response = await fetch(`/api/farmer/tools/${tool.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onToggle(tool.id, newStatus === 'active');
        toast.success(`Tool ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      }
    } catch (error) {
      toast.error('Failed to update tool status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🛠️</div>
        <p className="text-muted-foreground">No tools listed yet. Start earning by adding a tool!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => {
        const currentMediaIndex = mediaIndex[tool.id] || 0;
        const hasMedia = tool.media && tool.media.length > 0;
        const isExpanded = expandedToolId === tool.id;

        return (
          <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 space-y-4">
              {/* Header with Tool Info and Status */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div className="text-5xl">{tool.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-lg">{tool.name}</h3>
                      <Badge
                        className={
                          tool.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }
                      >
                        {tool.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize mb-2">{tool.category}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{tool.rating}</span>
                        <span className="text-xs text-muted-foreground">({tool.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4" />
                        <span className="font-semibold">{tool.bookings}</span>
                        <span className="text-muted-foreground">bookings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Gallery - Expandable */}
              {hasMedia && (
                <div className="space-y-2 py-3 border-t border-b">
                  <button
                    onClick={() => setExpandedToolId(isExpanded ? null : tool.id)}
                    className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-green-600 transition-colors"
                  >
                    <span>📸 {tool.media?.length || 0} File{(tool.media?.length || 0) !== 1 ? 's' : ''}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {isExpanded && tool.media && tool.media.length > 0 && (
                    <div className="space-y-2 mt-3">
                      {/* Media Display */}
                      <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center relative">
                        {tool.media[currentMediaIndex]?.type === 'image' && (
                          <img
                            src={tool.media[currentMediaIndex]?.url || ''}
                            alt={tool.media[currentMediaIndex]?.name || 'preview'}
                            className="w-full h-full object-contain"
                          />
                        )}
                        {tool.media[currentMediaIndex]?.type === 'video' && (
                          <video
                            src={tool.media[currentMediaIndex]?.url || ''}
                            controls
                            className="w-full h-full object-contain"
                          />
                        )}
                        {tool.media[currentMediaIndex]?.type === 'document' && (
                          <div className="flex flex-col items-center gap-2 text-white">
                            <span className="text-4xl">📄</span>
                            <p className="text-sm">{tool.media[currentMediaIndex]?.name}</p>
                          </div>
                        )}

                        {/* Navigation */}
                        {tool.media && tool.media.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setMediaIndex((prev) => ({
                                  ...prev,
                                  [tool.id]: (currentMediaIndex - 1 + (tool.media?.length || 0)) % (tool.media?.length || 1),
                                }))
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full"
                            >
                              <ChevronUp className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() =>
                                setMediaIndex((prev) => ({
                                  ...prev,
                                  [tool.id]: (currentMediaIndex + 1) % (tool.media?.length || 1),
                                }))
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full"
                            >
                              <ChevronDown className="h-5 w-5" />
                            </button>
                          </>
                        )}

                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                          {currentMediaIndex + 1} / {tool.media?.length || 0}
                        </div>
                      </div>

                      {/* Thumbnails */}
                      <div className="flex gap-2 overflow-x-auto">
                        {tool.media?.map((media, idx) => (
                          <button
                            key={idx}
                            onClick={() => setMediaIndex((prev) => ({ ...prev, [tool.id]: idx }))}
                            className={`flex-shrink-0 h-12 w-12 rounded border-2 transition-all ${
                              idx === currentMediaIndex ? 'border-green-600' : 'border-gray-300'
                            }`}
                          >
                            {media.type === 'image' && (
                              <img src={media.url} alt="thumbnail" className="w-full h-full object-cover rounded" />
                            )}
                            {media.type === 'video' && (
                              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white rounded">
                                ▶
                              </div>
                            )}
                            {media.type === 'document' && (
                              <div className="w-full h-full bg-blue-200 flex items-center justify-center rounded text-xl">
                                📄
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Info */}
              {tool.notes && (
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded border border-green-200 dark:border-green-800">
                  <p className="text-xs font-medium text-green-800 dark:text-green-300 mb-1">ℹ️ Notes:</p>
                  <p className="text-sm text-green-700 dark:text-green-200">{tool.notes}</p>
                </div>
              )}

              {/* Pricing and Earnings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-b">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Daily Rent</p>
                  <p className="text-lg font-bold text-green-600">₹{tool.dailyRate.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Monthly Rent</p>
                  <p className="text-lg font-bold text-green-600">₹{tool.monthlyRate.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Total Earnings</p>
                  <p className="text-lg font-bold text-green-700">₹{tool.totalEarnings.toLocaleString()}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleToggleStatus(tool)}
                >
                  {tool.status === 'active' ? (
                    <>
                      <ToggleRight className="h-4 w-4" />
                      <span className="hidden sm:inline">Deactivate</span>
                      <span className="sm:hidden">Off</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Activate</span>
                      <span className="sm:hidden">On</span>
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={() => setDeleteConfirm(tool.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tool?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tool? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
