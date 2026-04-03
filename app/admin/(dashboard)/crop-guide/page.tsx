import React from 'react';
import CropGuideTable from '@/components/admin/crop-guide/CropGuideTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CropGuidePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Guide Management</h1>
          <p className="text-muted-foreground mt-2">Manage crop information, diseases, and best practices.</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Add Crop
        </Button>
      </div>

      {/* Crop Guide Table */}
      <CropGuideTable />
    </div>
  );
}
