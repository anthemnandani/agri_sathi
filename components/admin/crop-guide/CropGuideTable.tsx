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

interface Crop {
  id: string;
  name: string;
  season: string;
  duration: string;
  diseases: number;
  practices: number;
  lastUpdated: string;
}

const mockCrops: Crop[] = [
  {
    id: '1',
    name: 'Wheat',
    season: 'Winter',
    duration: '120-150 days',
    diseases: 5,
    practices: 8,
    lastUpdated: '2024-03-10',
  },
  {
    id: '2',
    name: 'Rice',
    season: 'Monsoon',
    duration: '100-150 days',
    diseases: 7,
    practices: 10,
    lastUpdated: '2024-03-12',
  },
  {
    id: '3',
    name: 'Maize',
    season: 'Summer',
    duration: '110-130 days',
    diseases: 4,
    practices: 6,
    lastUpdated: '2024-03-08',
  },
  {
    id: '4',
    name: 'Cotton',
    season: 'Summer',
    duration: '160-180 days',
    diseases: 6,
    practices: 9,
    lastUpdated: '2024-03-05',
  },
];

export default function CropGuideTable() {
  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border">
        <CardTitle>Crops</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead>Crop Name</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Diseases</TableHead>
                <TableHead>Best Practices</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCrops.map((crop) => (
                <TableRow
                  key={crop.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{crop.season}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{crop.duration}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">{crop.diseases}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-800">{crop.practices}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{crop.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit size={16} className="mr-2" />
                          Edit
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
  );
}
