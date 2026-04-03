import React from 'react';
import UsersTable from '@/components/admin/users/UsersTable';
import UserFilters from '@/components/admin/users/UserFilters';
import BulkActions from '@/components/admin/users/BulkActions';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage farmers, workers, and buyers on the platform.</p>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <UserFilters />
        <BulkActions />
      </div>

      {/* Users Table */}
      <UsersTable />
    </div>
  );
}
