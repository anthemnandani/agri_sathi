import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Thermometer, CloudRain, Zap, Cloud, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export interface LayerState {
  temperature: boolean;
  rain: boolean;
  thunderstorm: boolean;
  clouds: boolean;
  flood: boolean;
}

interface MapLayerControlsProps {
  layers: LayerState;
  onLayerToggle: (layer: keyof LayerState) => void;
}

const LAYER_CONFIG = [
  {
    id: 'temperature' as const,
    label: 'Temperature',
    icon: Thermometer,
    color: 'text-red-500',
    description: 'Temperature heatmap',
  },
  {
    id: 'rain' as const,
    label: 'Rainfall',
    icon: CloudRain,
    color: 'text-blue-500',
    description: 'Precipitation areas',
  },
  {
    id: 'thunderstorm' as const,
    label: 'Thunderstorm',
    icon: Zap,
    color: 'text-purple-500',
    description: 'Storm alerts',
  },
  {
    id: 'clouds' as const,
    label: 'Cloud Cover',
    icon: Cloud,
    color: 'text-gray-500',
    description: 'Cloud coverage %',
  },
  {
    id: 'flood' as const,
    label: 'Flood Risk',
    icon: AlertTriangle,
    color: 'text-red-500',
    description: 'Flood warning zones',
  },
];

export const MapLayerControls = React.memo(function MapLayerControls({
  layers,
  onLayerToggle,
}: MapLayerControlsProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const activeLayers = Object.values(layers).filter(Boolean).length;

  return (
    <Card className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-auto max-w-xs z-40 bg-background/95 backdrop-blur border-2 border-foreground/10">
      <div className="p-3 sm:p-4">
        {/* Header */}
        <div
          className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground">Weather Layers</h3>
            <p className="text-xs text-muted-foreground">{activeLayers} active</p>
          </div>
          <button className="p-1 hover:bg-muted rounded-md transition">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Layer Controls */}
        {isExpanded && (
          <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
            {LAYER_CONFIG.map((layer) => {
              const Icon = layer.icon;
              const isActive = layers[layer.id];

              return (
                <button
                  key={layer.id}
                  onClick={() => onLayerToggle(layer.id)}
                  className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border-2 transition text-left ${
                    isActive
                      ? 'bg-primary/10 border-primary'
                      : 'bg-muted border-border hover:bg-muted/80'
                  }`}
                >
                  <Icon className={`h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 ${isActive ? layer.color : 'text-muted-foreground'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-foreground truncate">{layer.label}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{layer.description}</p>
                  </div>
                  <div
                    className={`w-4 sm:w-5 h-4 sm:h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${
                      isActive ? 'bg-primary border-primary' : 'border-border'
                    }`}
                  >
                    {isActive && <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-background rounded-sm" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Info Text */}
        {isExpanded && (
          <p className="text-xs text-muted-foreground mt-2 sm:mt-3 p-2 bg-muted rounded">
            Click on the map to view weather information
          </p>
        )}
      </div>
    </Card>
  );
});

MapLayerControls.displayName = 'MapLayerControls';
