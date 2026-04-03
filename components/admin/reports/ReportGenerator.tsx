'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Calendar } from 'lucide-react';

export default function ReportGenerator() {
  const [reportType, setReportType] = useState('users');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerateReport = () => {
    console.log('Generating report:', { reportType, startDate, endDate });
  };

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
        <CardDescription>Create custom reports with date range filters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Report Type */}
          <div>
            <Label htmlFor="report-type" className="text-sm font-medium">
              Report Type
            </Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">User Analytics</SelectItem>
                <SelectItem value="revenue">Revenue Report</SelectItem>
                <SelectItem value="products">Product Performance</SelectItem>
                <SelectItem value="engagement">Community Engagement</SelectItem>
                <SelectItem value="compliance">Compliance Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="start-date" className="text-sm font-medium">
              Start Date
            </Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* End Date */}
          <div>
            <Label htmlFor="end-date" className="text-sm font-medium">
              End Date
            </Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleGenerateReport} className="gap-2">
            <Download size={16} />
            Generate Report
          </Button>
          <Button variant="outline">Export as PDF</Button>
          <Button variant="outline">Export as CSV</Button>
        </div>

        {/* Info Message */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            Reports are generated in real-time based on your selected filters. You can export results
            in CSV or PDF format for further analysis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
