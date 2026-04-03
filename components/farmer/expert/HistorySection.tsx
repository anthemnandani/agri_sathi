'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockHistory = [
  {
    id: '1',
    crop: 'Tomato',
    issue: 'Early Blight',
    date: '2 days ago',
    status: 'Treated',
    confidence: 92,
  },
  {
    id: '2',
    crop: 'Wheat',
    issue: 'Leaf Spot',
    date: '1 week ago',
    status: 'Monitoring',
    confidence: 78,
  },
  {
    id: '3',
    crop: 'Rice',
    issue: 'Brown Spot',
    date: '2 weeks ago',
    status: 'Resolved',
    confidence: 85,
  },
  {
    id: '4',
    crop: 'Potato',
    issue: 'Late Blight',
    date: '3 weeks ago',
    status: 'Resolved',
    confidence: 88,
  },
];

export function HistorySection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Treated':
        return 'bg-blue-100 text-blue-700';
      case 'Monitoring':
        return 'bg-yellow-100 text-yellow-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Diagnosis History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No diagnosis history yet. Start by uploading a crop image.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">
                      {item.crop}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      • {item.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Issue: {item.issue}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-20 bg-muted rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${item.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-muted-foreground">
                      {item.confidence}% match
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
