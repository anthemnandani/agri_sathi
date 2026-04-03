import React from 'react';
import SchemesTable from '@/components/admin/schemes/SchemesTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function SchemesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Government Schemes</h1>
          <p className="text-muted-foreground mt-2">Manage and update government schemes available to farmers.</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          New Scheme
        </Button>
      </div>

      {/* Schemes Table */}
      <SchemesTable />
    </div>
  );
}
