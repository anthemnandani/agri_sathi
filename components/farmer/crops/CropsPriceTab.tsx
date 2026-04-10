'use client';

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PriceData {
  id: string;
  state: string;
  district: string;
  marketName: string;
  commodity: string;
  avgPrice: number;
  maxPrice: number;
  minPrice: number;
}

const mockPriceData: PriceData[] = [
  {
    id: '1',
    state: 'Bihar',
    district: 'Supaul',
    marketName: 'Simrahi',
    commodity: 'Paddy',
    avgPrice: 2000,
    maxPrice: 2200,
    minPrice: 1800,
  },
  {
    id: '2',
    state: 'Punjab',
    district: 'Ludhiana',
    marketName: 'Mandi Board',
    commodity: 'Wheat',
    avgPrice: 2500,
    maxPrice: 2700,
    minPrice: 2300,
  },
  {
    id: '3',
    state: 'Haryana',
    district: 'Kurukshetra',
    marketName: 'Agriculture Mandi',
    commodity: 'Maize',
    avgPrice: 1800,
    maxPrice: 2000,
    minPrice: 1600,
  },
];

export function CropsPriceTab() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    commodity: '',
    state: '',
    district: '',
    market: '',
  });

  const filteredData = mockPriceData.filter((item) => {
    return (
      (filters.commodity === '' || filters.commodity === 'all' || item.commodity === filters.commodity) &&
      (filters.state === '' || filters.state === 'all' || item.state === filters.state) &&
      (filters.district === '' || filters.district === 'all' || item.district === filters.district) &&
      (filters.market === '' || filters.market === 'all' || item.marketName === filters.market)
    );
  });

  const FilterContent = () => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <div>
        <label className="text-xs font-medium text-foreground mb-2 block">
          Date From
        </label>
        <Select
          value={filters.dateFrom}
          onValueChange={(value) =>
            setFilters({ ...filters, dateFrom: value })
          }
        >
          <SelectTrigger className="h-9 bg-background">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground mb-2 block">
          Date To
        </label>
        <Select
          value={filters.dateTo}
          onValueChange={(value) =>
            setFilters({ ...filters, dateTo: value })
          }
        >
          <SelectTrigger className="h-9 bg-background">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground mb-2 block">
          Commodity
        </label>
        <Select
          value={filters.commodity}
          onValueChange={(value) =>
            setFilters({ ...filters, commodity: value })
          }
        >
          <SelectTrigger className="h-9 bg-background">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Paddy">Paddy</SelectItem>
            <SelectItem value="Wheat">Wheat</SelectItem>
            <SelectItem value="Maize">Maize</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground mb-2 block">
          State
        </label>
        <Select
          value={filters.state}
          onValueChange={(value) =>
            setFilters({ ...filters, state: value })
          }
        >
          <SelectTrigger className="h-9 bg-background">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Bihar">Bihar</SelectItem>
            <SelectItem value="Punjab">Punjab</SelectItem>
            <SelectItem value="Haryana">Haryana</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground mb-2 block">
          District
        </label>
        <Select
          value={filters.district}
          onValueChange={(value) =>
            setFilters({ ...filters, district: value })
          }
        >
          <SelectTrigger className="h-9 bg-background">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Supaul">Supaul</SelectItem>
            <SelectItem value="Ludhiana">Ludhiana</SelectItem>
            <SelectItem value="Kurukshetra">Kurukshetra</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end">
        <Button
          className="w-full h-9 bg-green-600 hover:bg-green-700 text-white"
          size="sm"
        >
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Price Cards */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-green-700">Wheat price</div>
            <div className="text-2xl font-bold text-green-900">₹2500/MG</div>
            <div className="text-xs text-green-600 mt-1">Mandi Board</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-green-700">Paddy price</div>
            <div className="text-2xl font-bold text-green-900">₹2000/MG</div>
            <div className="text-xs text-green-600 mt-1">Simrahi</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-green-700">Maize price</div>
            <div className="text-2xl font-bold text-green-900">₹1800/MG</div>
            <div className="text-xs text-green-600 mt-1">Kurukshetra</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-green-700">Soybean price</div>
            <div className="text-2xl font-bold text-green-900">₹4200/MG</div>
            <div className="text-xs text-green-600 mt-1">Regional Avg</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section - Desktop View */}
      <div className="hidden md:block">
        <Card className="bg-muted/50 border border-border">
          <CardContent className="p-4">
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Filters Section - Mobile View with Dialog */}
      <div className="md:hidden flex justify-end">
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Filter Results</DialogTitle>
              <DialogDescription className="sr-only">Filter crop prices by state, market, and date range</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <FilterContent />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Price Table - Desktop */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-600 dark:bg-green-700 text-white">
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">SNO</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">
                State
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">
                District
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">
                Market Name
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">
                Commodity
              </th>
              <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold">
                Avg Price
              </th>
              <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold">
                Max Price
              </th>
              <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold">
                Min Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-foreground">
                    {index + 1}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-foreground">
                    {item.state}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-foreground">
                    {item.district}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-foreground">
                    {item.marketName}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-foreground">
                    {item.commodity}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-right text-foreground">
                    ₹{item.avgPrice}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-right text-foreground">
                    ₹{item.maxPrice}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-right text-foreground">
                    ₹{item.minPrice}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No data found. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Price Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Card key={item.id} className="border border-border">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">#{index + 1}</p>
                    <p className="font-semibold text-sm text-foreground">{item.commodity}</p>
                  </div>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">₹{item.avgPrice}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">State</p>
                    <p className="text-foreground font-medium">{item.state}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">District</p>
                    <p className="text-foreground font-medium">{item.district}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Market</p>
                    <p className="text-foreground font-medium">{item.marketName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price Range</p>
                    <p className="text-foreground font-medium">₹{item.minPrice}-₹{item.maxPrice}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              No data found. Try adjusting your filters.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
