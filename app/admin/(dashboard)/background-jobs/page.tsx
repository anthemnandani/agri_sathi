'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Copy,
  Download,
  Trash2,
  LogOut,
  Zap,
  Database,
  Mail,
  Image as ImageIcon,
} from 'lucide-react';
import { backgroundJobs, type BackgroundJob } from '@/lib/admin-data';

const statusColors: Record<string, string> = {
  queued: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  running: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  cancelled: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

const statusIcons: Record<string, React.ElementType> = {
  queued: Clock,
  running: RefreshCw,
  completed: CheckCircle,
  failed: AlertTriangle,
  cancelled: XCircle,
};

const typeIcons: Record<string, React.ElementType> = {
  data_sync: Database,
  report_generation: LogOut,
  email_broadcast: Mail,
  image_processing: ImageIcon,
  data_cleanup: Trash2,
};

const typeColors: Record<string, string> = {
  data_sync: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  report_generation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  email_broadcast: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  image_processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  data_cleanup: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number | string; icon: React.ElementType; color: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div
        className={`h-full transition-all ${
          progress === 100
            ? 'bg-emerald-500'
            : progress >= 50
            ? 'bg-blue-500'
            : 'bg-amber-500'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function BackgroundJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<BackgroundJob | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return backgroundJobs.filter((job) => {
      const matchesSearch =
        job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.triggeredBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesType = typeFilter === 'all' || job.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const stats = useMemo(() => ({
    total: backgroundJobs.length,
    running: backgroundJobs.filter(j => j.status === 'running').length,
    completed: backgroundJobs.filter(j => j.status === 'completed').length,
    failed: backgroundJobs.filter(j => j.status === 'failed').length,
  }), []);

  const handleViewDetails = (job: BackgroundJob) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Background Jobs</h1>
          <p className="text-muted-foreground">Monitor and manage background tasks and processes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Clear Old Jobs</Button>
          <Button size="sm">Schedule Job</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Jobs"
          value={stats.total}
          icon={Zap}
          color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard
          title="Running"
          value={stats.running}
          icon={RefreshCw}
          color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
        <StatCard
          title="Failed"
          value={stats.failed}
          icon={AlertTriangle}
          color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by name or trigger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="data_sync">Data Sync</SelectItem>
                <SelectItem value="report_generation">Reports</SelectItem>
                <SelectItem value="email_broadcast">Email</SelectItem>
                <SelectItem value="image_processing">Images</SelectItem>
                <SelectItem value="data_cleanup">Cleanup</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Jobs List</CardTitle>
          <CardDescription>
            Showing {filteredJobs.length} of {backgroundJobs.length} jobs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Triggered By</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => {
                  const StatusIcon = statusIcons[job.status] || Clock;
                  const TypeIcon = typeIcons[job.type] || Zap;
                  return (
                    <TableRow key={job.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${typeColors[job.type]}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{job.name}</p>
                            <p className="text-xs text-muted-foreground">{job.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={typeColors[job.type]}>
                          {job.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[job.status]}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24">
                            <ProgressBar progress={job.progress} />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">{job.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">
                          {new Date(job.startTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{job.duration || 'In progress'}</span>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground truncate max-w-[150px]">{job.triggeredBy}</p>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(job)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <LogOut className="h-4 w-4 mr-2" />
                              View Logs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {(job.status === 'queued' || job.status === 'running') && (
                              <DropdownMenuItem className="text-amber-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Job
                              </DropdownMenuItem>
                            )}
                            {job.status === 'failed' && (
                              <DropdownMenuItem className="text-blue-600">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Retry Job
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Clone Job
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Job Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedJob && typeIcons[selectedJob.type] && React.createElement(typeIcons[selectedJob.type], { className: 'h-5 w-5' })}
                  {selectedJob.name}
                </DialogTitle>
                <DialogDescription>Job execution details and logs</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Status */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold">{selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}</p>
                  </div>
                  <Badge className={statusColors[selectedJob.status]}>
                    {selectedJob.status}
                  </Badge>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Progress</p>
                  <ProgressBar progress={selectedJob.progress} />
                  <p className="text-sm text-muted-foreground text-right">{selectedJob.progress}% Complete</p>
                </div>

                {/* Type and Timing */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Job Type</p>
                    <Badge className={typeColors[selectedJob.type]} variant="outline">
                      {selectedJob.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Started</p>
                    <p className="text-sm font-medium">{new Date(selectedJob.startTime).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Duration */}
                {selectedJob.duration && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="text-lg font-bold text-emerald-600">{selectedJob.duration}</p>
                  </div>
                )}

                {/* Error Message */}
                {selectedJob.errorMessage && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">Error</p>
                    <p className="text-sm text-red-700 dark:text-red-300">{selectedJob.errorMessage}</p>
                  </div>
                )}

                {/* Triggered By */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Triggered By</p>
                  <p className="text-sm font-medium">{selectedJob.triggeredBy}</p>
                </div>

                {/* Logs Section */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Logs Preview</p>
                  <div className="p-3 bg-slate-900 dark:bg-slate-950 rounded-lg font-mono text-xs text-green-400 overflow-x-auto h-40 overflow-y-auto">
                    <p>{'[INFO] Job started at ' + new Date(selectedJob.startTime).toLocaleTimeString()}</p>
                    <p>{'[INFO] Processing: ' + selectedJob.name}</p>
                    {selectedJob.progress === 100 && (
                      <>
                        <p>{'[INFO] Stage 1 completed (25%)'}</p>
                        <p>{'[INFO] Stage 2 completed (50%)'}</p>
                        <p>{'[INFO] Stage 3 completed (75%)'}</p>
                        <p>{'[INFO] Stage 4 completed (100%)'}</p>
                      </>
                    )}
                    {selectedJob.progress < 100 && selectedJob.status === 'running' && (
                      <>
                        <p>{'[INFO] Stage 1 completed (25%)'}</p>
                        <p>{'[INFO] Stage 2 completed (50%)'}</p>
                        <p>{'[INFO] Processing stage 3...'}</p>
                      </>
                    )}
                    {selectedJob.errorMessage && (
                      <p className="text-red-400">{'[ERROR] ' + selectedJob.errorMessage}</p>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Logs
                </Button>
                {selectedJob.status === 'failed' && (
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry Job
                  </Button>
                )}
                {(selectedJob.status === 'running' || selectedJob.status === 'queued') && (
                  <Button variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Job
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
