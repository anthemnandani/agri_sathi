'use client';

import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { hi } from 'date-fns/locale';

interface MessageDateSeparatorProps {
  date: Date;
}

export function MessageDateSeparator({ date }: MessageDateSeparatorProps) {
  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'आज';
    if (isYesterday(date)) return 'कल';
    return format(date, 'd MMM yyyy', { locale: hi });
  };

  return (
    <div className="flex items-center gap-3 my-4 first:mt-0">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs font-semibold text-muted-foreground px-2 py-1 bg-muted rounded-full">
        {getDateLabel(date)}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
