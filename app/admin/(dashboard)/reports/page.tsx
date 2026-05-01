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
import { Label } from '@/components/ui/label';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Trash2,
  RefreshCw,
  FileText,
  Users,
  ShoppingCart,
  Zap,
} from 'lucide-react';
import { reports, type Report } from '@/lib/admin-data';

const reportTypeIcons: Record<string, React.ElementType> = {
  sales: ShoppingCart,
  users: Users,
  products: FileText,
  rentals: Zap,
  communities: Users,
  revenue: TrendingUp,
};

const reportTypeColors: Record<string, string> = {
  sales: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  users: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  products: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  rentals: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  communities: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  revenue: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  ready: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
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

function MetricChart({ dataPoints }: { dataPoints: { label: string; value: number }[] }) {
  const maxValue = Math.max(...dataPoints.map(p => p.value));
  return (
    <div className="flex items-end gap-2 h-40">
      {dataPoints.map((point) => (
        <div key={point.label} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
            style={{ height: `${(point.value / maxValue) * 120}px` }}
          />
          <p className="text-xs text-muted-foreground mt-2">{point.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || report.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: reports.length,
    ready: reports.filter(r => r.status === 'ready').length,
    pending: reports.filter(r => r.status === 'pending').length,
  }), []);

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Platform analytics and detailed performance reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Reports"
          value={stats.total}
          icon={BarChart3}
          color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard
          title="Ready to Download"
          value={stats.ready}
          icon={TrendingUp}
          color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
        <StatCard
          title="Processing"
          value={stats.pending}
          icon={Zap}
          color="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="rentals">Rentals</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>
            Showing {filteredReports.length} of {reports.length} reports
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const TypeIcon = reportTypeIcons[report.type] || FileText;
                  const TrendIcon = report.metrics.change >= 0 ? TrendingUp : TrendingDown;
                  const trendColor = report.metrics.change >= 0 ? 'text-emerald-600' : 'text-red-600';
                  return (
                    <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${reportTypeColors[report.type]}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{report.name}</p>
                            <p className="text-xs text-muted-foreground">{report.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={reportTypeColors[report.type]}>
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{report.generatedBy}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.dateRange.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(report.dateRange.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">₹{report.metrics.totalValue.toLocaleString('en-IN')}</span>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${trendColor}`}>
                          <TrendIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {report.metrics.change >= 0 ? '+' : ''}{report.metrics.change.toLocaleString('en-IN')} ({report.metrics.changePercent.toFixed(1)}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[report.status]}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(report)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Report
                            </DropdownMenuItem>
                            {report.status === 'ready' && (
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Regenerate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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

      {/* Report Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {React.createElement(reportTypeIcons[selectedReport.type] || FileText, { className: 'h-5 w-5' })}
                  {selectedReport.name}
                </DialogTitle>
                <DialogDescription>Detailed report analysis and metrics</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Report Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Type</p>
                    <Badge className={reportTypeColors[selectedReport.type]}>
                      {selectedReport.type.charAt(0).toUpperCase() + selectedReport.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge className={statusColors[selectedReport.status]}>
                      {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Main Metric */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">₹{selectedReport.metrics.totalValue.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedReport.metrics.change >= 0 ? <TrendingUp className="h-5 w-5 text-emerald-600" /> : <TrendingDown className="h-5 w-5 text-red-600" />}
                    <span className={`text-sm font-semibold ${selectedReport.metrics.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {selectedReport.metrics.change >= 0 ? '+' : ''}{selectedReport.metrics.change.toLocaleString('en-IN')} ({selectedReport.metrics.changePercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">From</p>
                    <p className="text-sm font-medium">{new Date(selectedReport.dateRange.start).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">To</p>
                    <p className="text-sm font-medium">{new Date(selectedReport.dateRange.end).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-4">Data Visualization</p>
                  <MetricChart dataPoints={selectedReport.dataPoints} />
                </div>

                {/* Generated Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Generated By</p>
                    <p className="text-sm font-medium">{selectedReport.generatedBy}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Generated At</p>
                    <p className="text-sm font-medium">{new Date(selectedReport.generatedAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                {selectedReport.status === 'ready' && (
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
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
