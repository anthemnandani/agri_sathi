'use client';

import React, { useState } from 'react';
import { ExternalLink, Calendar, ChevronDown, Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

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
  const [expanded, setExpanded] = useState(false);
  const [applied, setApplied] = useState(false);

  const deadlineDate = new Date(scheme.deadline);
  const today = new Date();
  const daysLeft = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );

  const isExpiring = daysLeft < 30;
  const isExpired = daysLeft < 0;

  const categoryColors: Record<string, string> = {
    'Income Support': 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
    'Insurance': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
    'Equipment': 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200',
    'Technology': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200',
    'Marketing': 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
    'Infrastructure': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  };

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <Card
      className={cn(
        'hover:shadow-lg transition-all duration-300 overflow-hidden',
        isExpired && 'opacity-75'
      )}
    >
      <CardHeader className="pb-3 bg-gradient-to-r from-card to-muted/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-base text-foreground leading-snug">
                {scheme.title}
              </h3>
              {applied && (
                <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {scheme.description}
            </p>
          </div>
          <Badge
            className={cn(
              'shrink-0',
              categoryColors[scheme.category] ||
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            )}
          >
            {scheme.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Deadline Alert */}
        <div
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg border',
            isExpired
              ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
              : isExpiring
                ? 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
                : 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
          )}
        >
          <Calendar
            className={cn(
              'h-5 w-5 shrink-0',
              isExpired
                ? 'text-red-600 dark:text-red-400'
                : isExpiring
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-blue-600 dark:text-blue-400'
            )}
          />
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">
              Application Deadline
            </p>
            <p
              className={cn(
                'text-sm font-bold',
                isExpired
                  ? 'text-red-700 dark:text-red-300'
                  : isExpiring
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-blue-700 dark:text-blue-300'
              )}
            >
              {isExpired ? 'Expired' : `${scheme.deadline} (${daysLeft} days left)`}
            </p>
          </div>
        </div>

        {/* Expandable Details */}
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-0 h-auto py-2 hover:bg-transparent"
            >
              <span className="text-sm font-semibold text-primary">
                {expanded ? 'Hide Details' : 'View Full Details'}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-300',
                  expanded && 'rotate-180'
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                Who is Eligible?
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {scheme.eligibility}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                What You Will Get
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {scheme.benefits}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Apply Button */}
        <Button
          className="w-full font-semibold"
          disabled={isExpired}
          onClick={handleApply}
          size="lg"
        >
          {applied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Application Started!
            </>
          ) : isExpired ? (
            'Application Closed'
          ) : (
            <>
              Apply Now
              <ExternalLink className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
