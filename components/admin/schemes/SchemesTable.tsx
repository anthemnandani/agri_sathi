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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import SchemeModal from './SchemeModal';

interface Scheme {
  id: string;
  name: string;
  organization: string;
  category: string;
  subsidy: string;
  status: 'active' | 'inactive';
  eligibility: string;
  deadline: string;
}

const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-Kisan Scheme',
    organization: 'Government of India',
    category: 'Direct Income Support',
    subsidy: '₹6,000/year',
    status: 'active',
    eligibility: 'All farmers',
    deadline: '2024-12-31',
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    organization: 'Government of India',
    category: 'Crop Insurance',
    subsidy: 'Variable',
    status: 'active',
    eligibility: 'Farmers with land',
    deadline: '2024-06-30',
  },
  {
    id: '3',
    name: 'Paramparagat Krishi Vikas',
    organization: 'Ministry of Agriculture',
    category: 'Organic Farming',
    subsidy: '₹50,000/ha',
    status: 'active',
    eligibility: '10 farmers minimum',
    deadline: '2024-08-15',
  },
  {
    id: '4',
    name: 'Soil Health Card Scheme',
    organization: 'Government of India',
    category: 'Soil Testing',
    subsidy: 'Free testing',
    status: 'inactive',
    eligibility: 'All farmers',
    deadline: '2024-03-31',
  },
];

export default function SchemesTable() {
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="border border-border">
        <CardHeader className="border-b border-border">
          <CardTitle>Available Schemes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead>Scheme Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subsidy</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSchemes.map((scheme) => (
                  <TableRow
                    key={scheme.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{scheme.name}</TableCell>
                    <TableCell className="text-sm">{scheme.organization}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{scheme.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{scheme.subsidy}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          scheme.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{scheme.deadline}</TableCell>
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
                              setSelectedScheme(scheme);
                              setIsModalOpen(true);
                            }}
                          >
                            <Edit size={16} className="mr-2" />
                            Edit Scheme
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={16} className="mr-2" />
                            Delete
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

      {/* Scheme Modal */}
      <SchemeModal
        scheme={selectedScheme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
