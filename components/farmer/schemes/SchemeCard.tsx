'use client';

import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SchemeCardProps {
  scheme: {
    id: string;
    title: string;
    description: string;
    eligibility: string;
    benefits: string;
    deadline: string;
    category: string;
  };
}

export function SchemeCard({ scheme }: SchemeCardProps) {
  const deadlineDate = new Date(scheme.deadline);
  const today = new Date();
  const daysLeft = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );

  const isExpiring = daysLeft < 30;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">
              {scheme.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {scheme.description}
            </p>
          </div>
          <Badge variant="outline">{scheme.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Deadline */}
        <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Application Deadline</p>
            <p className={`text-sm font-medium ${isExpiring ? 'text-destructive' : 'text-foreground'}`}>
              {scheme.deadline} ({daysLeft} days left)
            </p>
          </div>
        </div>

        {/* Collapsible Details */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <span className="text-sm font-medium text-primary">
                View Details
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3 pt-3 border-t border-border">
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">
                ELIGIBILITY
              </p>
              <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">
                BENEFITS
              </p>
              <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Apply Button */}
        <Button className="w-full">
          Apply Now
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
