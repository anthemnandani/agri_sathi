'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const cropsData = [
  {
    id: 'rice',
    name: 'Rice',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    season: '20 MAY - 5 JUNE',
    highlights: ['Types of Varieties', 'Chemical Fertilizer', 'Irrigation Methods'],
    sections: [
      {
        title: 'General Information',
        content:
          'Rice is a staple food crop in India. It requires warm climate, high humidity, and plenty of water for cultivation. The crop thrives in temperatures between 20°C to 35°C.',
      },
      {
        title: 'Climate',
        content:
          'Rice requires high rainfall (100-250 cm annually), high humidity, and temperatures of 20-35°C during growing season. It is sensitive to frost and waterlogging.',
      },
      {
        title: 'Soil',
        content:
          'Rice grows well in alluvial and clayey soils rich in organic matter. Soil pH should be between 5.5 to 7.5. Well-drained and fertile soils are preferred.',
      },
      {
        title: 'Seed',
        content:
          'High-quality certified seeds should be used at 20-25 kg/hectare. Seeds must have good germination rate (>80%) and be free from diseases and weeds.',
      },
      {
        title: 'Sowing',
        content:
          'Rice is sown from May to June. Seeds can be sown dry or wet. Wet sowing is preferred in areas with controlled water supply.',
      },
      {
        title: 'Irrigation',
        content:
          'Rice requires 100-150 cm of water during the growing season. Continuous submergence of 5-10 cm is maintained. Proper drainage is essential to prevent waterlogging.',
      },
      {
        title: 'Fertilizer',
        content:
          'Apply 100 kg N, 50 kg P, and 50 kg K per hectare. Use vermicompost or FYM 5-10 tons/ha. Half nitrogen should be applied at planting and half at tillering.',
      },
      {
        title: 'Harvesting',
        content:
          'Harvest when 80% of grains turn golden yellow, usually 120-150 days after sowing. Cut and bundle stalks, then thresh immediately.',
      },
    ],
  },
  {
    id: 'wheat',
    name: 'Wheat',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
    season: '15 OCT - 15 NOV',
    highlights: ['High Yield Varieties', 'Pest Management', 'Storage Methods'],
    sections: [
      {
        title: 'General Information',
        content:
          'Wheat is a major rabi (winter) crop grown in India. It is a staple carbohydrate source and is used in various food products.',
      },
      {
        title: 'Climate',
        content:
          'Wheat prefers cool climate with temperatures between 15-25°C. Moderate rainfall of 50-100 cm is suitable. Frost during grain filling reduces yield.',
      },
      {
        title: 'Soil',
        content:
          'Well-drained, fertile loamy soils are ideal for wheat. Soil pH should be 6.0-7.5. Heavy clay soils should be avoided.',
      },
      {
        title: 'Seed',
        content:
          'Use certified seed at 100-125 kg/hectare. Seed should have germination >85% and be treated with fungicide before sowing.',
      },
      {
        title: 'Sowing',
        content:
          'Sow from October to November in northern India. Spacing should be 20-25 cm between rows. Drilling method is preferred for uniform distribution.',
      },
      {
        title: 'Irrigation',
        content:
          '3-4 irrigations are recommended during the growing season. First irrigation at 25-30 days, second at flowering, and third at grain filling stage.',
      },
      {
        title: 'Fertilizer',
        content:
          'Apply 120 kg N, 60 kg P, and 40 kg K per hectare. Use farm yard manure 5-10 tons/ha. Apply nitrogen in splits for better utilization.',
      },
      {
        title: 'Harvesting',
        content:
          'Harvest when grains become hard and moisture content reduces to 10-12%. Usually done 150-180 days after sowing in April-May.',
      },
    ],
  },
];

export function CropsInformationTab() {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const crop = cropsData.find((c) => c.id === selectedCrop);

  return (
    <div className="space-y-6">
      {/* Crop Selection */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {cropsData.map((c) => (
          <Card
            key={c.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCrop === c.id
                ? 'border-green-600 border-2 bg-green-50'
                : 'hover:border-green-300'
            }`}
            onClick={() => setSelectedCrop(c.id)}
          >
            <CardContent className="p-4">
              <div className="font-semibold text-foreground text-center">
                {c.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {crop && (
        <div className="space-y-6">
          {/* Crop Header */}
          <Card className="overflow-hidden">
            <div className="relative h-48 w-full bg-muted">
              <Image
                src={crop.image}
                alt={crop.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <div className="p-6 text-white w-full">
                  <h2 className="text-4xl font-bold mb-2">{crop.name}</h2>
                  <div className="text-sm opacity-90">Season: {crop.season}</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <CardContent className="p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {crop.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="bg-green-600 text-white p-3 rounded text-sm font-medium"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accordion Sections */}
          <div className="space-y-2">
            {crop.sections.map((section, idx) => (
              <Collapsible key={idx} defaultOpen={idx === 0}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                    <span className="font-semibold text-left">
                      {section.title}
                    </span>
                    <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-0">
                  <div className="bg-muted/50 border border-border rounded-lg mt-1 p-4">
                    <p className="text-sm text-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
