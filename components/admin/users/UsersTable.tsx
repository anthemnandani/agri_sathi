'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Lock, Trash2 } from 'lucide-react';
import UserModal from './UserModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'worker' | 'buyer' | 'admin';
  status: 'active' | 'suspended' | 'inactive';
  joinDate: string;
  phone: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@farm.com',
    role: 'farmer',
    status: 'active',
    joinDate: '2024-01-15',
    phone: '98765 43210',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@farm.com',
    role: 'farmer',
    status: 'active',
    joinDate: '2024-02-20',
    phone: '98765 43211',
  },
  {
    id: '3',
    name: 'Arjun Singh',
    email: 'arjun@work.com',
    role: 'worker',
    status: 'active',
    joinDate: '2024-01-10',
    phone: '98765 43212',
  },
  {
    id: '4',
    name: 'Meera Patel',
    email: 'meera@buyer.com',
    role: 'buyer',
    status: 'suspended',
    joinDate: '2023-12-05',
    phone: '98765 43213',
  },
  {
    id: '5',
    name: 'Vikram Das',
    email: 'vikram@farm.com',
    role: 'farmer',
    status: 'inactive',
    joinDate: '2023-11-20',
    phone: '98765 43214',
  },
];

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'farmer':
      return 'bg-emerald-100 text-emerald-800';
    case 'worker':
      return 'bg-blue-100 text-blue-800';
    case 'buyer':
      return 'bg-green-100 text-green-800';
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800';
    case 'suspended':
      return 'bg-red-100 text-red-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function UsersTable() {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedUsers.size === mockUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(mockUsers.map((u) => u.id)));
    }
  };

  return (
    <>
      <Card className="border border-border">
        <CardHeader className="border-b border-border">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.size === mockUsers.length && mockUsers.length > 0}
                      onCheckedChange={toggleAllSelection}
                      aria-label="Select all users"
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.has(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                        aria-label={`Select ${user.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.joinDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setIsModalOpen(true);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail size={16} className="mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Lock size={16} className="mr-2" />
                            Suspend Account
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={16} className="mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
