'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
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
      (!filters.commodity || item.commodity === filters.commodity) &&
      (!filters.state || item.state === filters.state) &&
      (!filters.district || item.district === filters.district) &&
      (!filters.market || item.marketName === filters.market)
    );
  });

  return (
    <div className="space-y-6">
      {/* Quick Price Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Filters Section */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
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
                <SelectTrigger className="h-9 bg-white">
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
                <SelectTrigger className="h-9 bg-white">
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
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
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
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
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
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Supaul">Supaul</SelectItem>
                  <SelectItem value="Ludhiana">Ludhiana</SelectItem>
                  <SelectItem value="Kurukshetra">Kurukshetra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                className="w-full h-9 bg-foreground hover:bg-foreground/90"
                size="sm"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">SNO</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                State
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                District
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Market Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Commodity
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold">
                Avg Price (Rs./Quintal)
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold">
                Max Price (Rs./Quintal)
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold">
                Min Price (Rs./Quintal)
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-foreground">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {item.state}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {item.district}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {item.marketName}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {item.commodity}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-foreground">
                    ₹{item.avgPrice}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-foreground">
                    ₹{item.maxPrice}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-foreground">
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
    </div>
  );
}
