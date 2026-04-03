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
import { MoreHorizontal, Activity, CheckCircle, AlertCircle } from 'lucide-react';

interface Job {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  duration: string;
  nextRun?: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    name: 'Weather Data Sync',
    status: 'running',
    progress: 65,
    startTime: '2024-03-15 14:30:00',
    duration: '2m 15s',
    nextRun: '2024-03-15 15:00:00',
  },
  {
    id: '2',
    name: 'User Analytics Update',
    status: 'completed',
    progress: 100,
    startTime: '2024-03-15 14:00:00',
    duration: '3m 45s',
    nextRun: '2024-03-15 14:30:00',
  },
  {
    id: '3',
    name: 'Notification Dispatch',
    status: 'completed',
    progress: 100,
    startTime: '2024-03-15 13:30:00',
    duration: '1m 12s',
    nextRun: '2024-03-15 14:00:00',
  },
  {
    id: '4',
    name: 'Database Cleanup',
    status: 'failed',
    progress: 45,
    startTime: '2024-03-15 12:00:00',
    duration: '2m 30s',
    nextRun: '2024-03-16 00:00:00',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'running':
      return <Activity size={16} className="text-blue-600 animate-pulse" />;
    case 'completed':
      return <CheckCircle size={16} className="text-emerald-600" />;
    case 'failed':
      return <AlertCircle size={16} className="text-red-600" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-emerald-100 text-emerald-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function JobsTable() {
  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border">
        <CardTitle>Active & Recent Jobs</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead>Job Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(job.status)}
                      <Badge className={getStatusColor(job.status)}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{job.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{job.startTime}</TableCell>
                  <TableCell className="text-sm">{job.duration}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {job.nextRun || 'No repeat'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Logs</DropdownMenuItem>
                        {job.status === 'running' && (
                          <DropdownMenuItem>Cancel Job</DropdownMenuItem>
                        )}
                        {job.status === 'failed' && (
                          <DropdownMenuItem>Retry</DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Schedule</DropdownMenuItem>
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
