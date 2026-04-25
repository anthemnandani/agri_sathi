'use client';

import React from 'react';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, CloudRain, AlertTriangle } from 'lucide-react';

interface Alert {
  id: string;
  type: string;
  region: string;
  severity: 'low' | 'medium' | 'high';
  recipients: number;
  status: 'active' | 'sent' | 'scheduled';
  date: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'Heavy Rainfall',
    region: 'Punjab',
    severity: 'high',
    recipients: 1234,
    status: 'active',
    date: '2024-03-15',
  },
  {
    id: '2',
    type: 'Frost Warning',
    region: 'Himachal Pradesh',
    severity: 'high',
    recipients: 567,
    status: 'active',
    date: '2024-03-14',
  },
  {
    id: '3',
    type: 'Drought Alert',
    region: 'Rajasthan',
    severity: 'medium',
    recipients: 2341,
    status: 'sent',
    date: '2024-03-10',
  },
  {
    id: '4',
    type: 'Strong Winds',
    region: 'Gujarat',
    severity: 'low',
    recipients: 890,
    status: 'scheduled',
    date: '2024-03-20',
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800';
    case 'sent':
      return 'bg-blue-100 text-blue-800';
    case 'scheduled':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AlertsTable() {
  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border">
        <CardTitle>Active Weather Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead>Alert Type</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAlerts.map((alert) => (
                <TableRow
                  key={alert.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <CloudRain size={16} className="text-muted-foreground" />
                    {alert.type}
                  </TableCell>
                  <TableCell>{alert.region}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{alert.recipients}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{alert.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Alert</DropdownMenuItem>
                        <DropdownMenuItem>View Recipients</DropdownMenuItem>
                        <DropdownMenuItem>Resend</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
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
