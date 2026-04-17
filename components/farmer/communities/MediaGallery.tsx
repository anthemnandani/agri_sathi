'use client';

import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document';
  thumbnail: string;
  url: string;
  description: string;
  uploadedBy: string;
  uploadedAt: Date;
}

interface MediaGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
}

export function MediaGallery({ isOpen, onClose, mediaItems }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'fullscreen'>('grid');

  const selectedMedia = mediaItems[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = (item: MediaItem) => {
    toast.success(`${item.description} डाउनलोड हो रहा है...`);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>मीडिया गैलरी</DialogTitle>
        </DialogHeader>

        {viewMode === 'grid' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mediaItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIndex(index);
                    setViewMode('fullscreen');
                  }}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.description}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <p className="text-xs text-white font-medium line-clamp-1">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-300">{item.uploadedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.description}
                className="w-full h-[60vh] object-contain"
              />
              {mediaItems.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedIndex + 1} / {mediaItems.length}
                  </div>
                </>
              )}
            </div>

            <Card>
              <CardContent className="pt-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {selectedMedia.description}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{selectedMedia.uploadedBy}</span>
                    <span>
                      {selectedMedia.uploadedAt.toLocaleDateString('hi-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(selectedMedia)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    डाउनलोड
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    वापस
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
