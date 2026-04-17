'use client';

import React from 'react';
import { Download, FileText, Calendar, User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}

interface CommunityDocumentsProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
}

export function CommunityDocuments({
  isOpen,
  onClose,
  documents,
}: CommunityDocumentsProps) {
  const handleDownload = (doc: Document) => {
    toast.success(`${doc.name} डाउनलोड हो रहा है...`);
  };

  const handleView = (doc: Document) => {
    toast.info(`${doc.name} खोला जा रहा है...`);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>साझा किए गए दस्तावेज़</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {documents.length === 0 ? (
            <Card className="bg-muted/30 border-border">
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">कोई दस्तावेज़ साझा नहीं किए गए हैं</p>
              </CardContent>
            </Card>
          ) : (
            documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Document Icon */}
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground mb-2">
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                        <span>{doc.size}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {doc.uploadedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {doc.uploadedAt.toLocaleDateString('hi-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleView(doc)}
                        title="देखें"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDownload(doc)}
                        title="डाउनलोड करें"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
