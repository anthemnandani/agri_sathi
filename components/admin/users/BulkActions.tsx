import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';

export default function BulkActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button variant="outline" size="sm" className="gap-2">
        <Upload className="w-4 h-4" />
        Import CSV
      </Button>
      <Button size="sm" className="gap-2">
        <Plus className="w-4 h-4" />
        New User
      </Button>
    </div>
  );
}
