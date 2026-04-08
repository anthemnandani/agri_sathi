import React from 'react';
import { CropsPriceTab } from '@/components/farmer/crops/CropsPriceTab';
import { CropsInformationTab } from '@/components/farmer/crops/CropsInformationTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Crops - AgriSathi',
  description: 'View crop prices and detailed information',
};

export default function CropsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Crops</h1>
        <p className="text-muted-foreground">
          Check crop prices and get detailed farming information
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="price" className="w-full">
        <TabsList>
          <TabsTrigger value="price">Crops Price</TabsTrigger>
          <TabsTrigger value="information">Crops Information</TabsTrigger>
        </TabsList>

        <TabsContent value="price" className="mt-6">
          <CropsPriceTab />
        </TabsContent>

        <TabsContent value="information" className="mt-6">
          <CropsInformationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
