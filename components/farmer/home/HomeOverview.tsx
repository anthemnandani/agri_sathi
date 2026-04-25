'use client';

import React from 'react';
import Link from 'next/link';
import { Cloud, Users, FileText, Stethoscope, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function HomeOverview() {
  const overviewSections = [
    {
      icon: Cloud,
      title: 'Weather Alert',
      description: 'Heavy rainfall expected tomorrow in your region',
      action: 'View Details',
      href: '/farmer/weather',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: FileText,
      title: 'Government Schemes',
      description: 'New subsidy scheme available for wheat farmers',
      action: 'Explore Schemes',
      href: '/farmer/schemes',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: Users,
      title: 'Community Discussion',
      description: 'Join farmers discussing pesticide solutions',
      action: 'View Communities',
      href: '/farmer/communities',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Stethoscope,
      title: 'Expert Talk',
      description: 'Get AI diagnosis for plant diseases',
      action: 'Ask Expert',
      href: '/farmer/expert-talk',
      color: 'from-green-400 to-green-600',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Featured</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {overviewSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`bg-gradient-to-br ${section.color} p-3 rounded-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
                    <Link href={section.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 h-auto p-0 text-primary"
                      >
                        {section.action}
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
