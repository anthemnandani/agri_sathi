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
    description: 'Hot & Cold Areas',
    farmerInfo: 'Shows which areas are too hot or cold for your crops',
  },
  {
    id: 'rain' as const,
    label: 'Rainfall',
    icon: CloudRain,
    color: 'text-blue-500',
    description: 'Rain Zones',
    farmerInfo: 'Shows where rain is expected (helps with irrigation planning)',
  },
  {
    id: 'thunderstorm' as const,
    label: 'Thunderstorm',
    icon: Zap,
    color: 'text-purple-500',
    description: '⚡ Storm Warning',
    farmerInfo: 'Alerts for dangerous lightning storms',
  },
  {
    id: 'clouds' as const,
    label: 'Cloud Cover',
    icon: Cloud,
    color: 'text-gray-500',
    description: 'Cloud Shadow',
    farmerInfo: 'Shows cloudy vs sunny areas (affects solar radiation)',
  },
  {
    id: 'flood' as const,
    label: 'Flood Risk',
    icon: AlertTriangle,
    color: 'text-red-500',
    description: '⚠️ High Risk',
    farmerInfo: 'Critical areas at risk of flooding',
  },
];

export const MapLayerControls = React.memo(function MapLayerControls({
  layers,
  onLayerToggle,
}: MapLayerControlsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [hoveredLayer, setHoveredLayer] = React.useState<string | null>(null);

  const activeLayers = Object.values(layers).filter(Boolean).length;

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 w-full sm:w-auto px-4 sm:px-0">
      <Card className="bg-background/95 backdrop-blur border-2 border-foreground/10 shadow-lg">
        <div className="p-3 sm:p-4 max-w-sm">
          {/* Compact Header - Always Visible */}
          <div
            className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-950 rounded-lg">
                <Cloud className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">Weather Layers</h3>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  {activeLayers} layer{activeLayers !== 1 ? 's' : ''} active
                </p>
              </div>
            </div>
            <button className="p-1 hover:bg-muted rounded-md transition">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Expanded Layer Controls */}
          {isExpanded && (
            <div className="mt-4 sm:mt-5 space-y-2">
              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2.5 mb-3">
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                  💡 Tap each layer to see what it shows on the map
                </p>
              </div>

              {/* Layer Toggles */}
              {LAYER_CONFIG.map((layer) => {
                const Icon = layer.icon;
                const isActive = layers[layer.id];

                return (
                  <div
                    key={layer.id}
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                    className="relative"
                  >
                    <button
                      onClick={() => onLayerToggle(layer.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition text-left ${
                        isActive
                          ? 'bg-accent/20 border-accent text-foreground'
                          : 'bg-muted/60 border-border hover:bg-muted/80 text-muted-foreground'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`p-2 rounded-md transition ${isActive ? 'bg-accent/30' : 'bg-muted'}`}>
                        <Icon className={`h-4 w-4 ${isActive ? layer.color : 'text-muted-foreground'}`} />
                      </div>

                      {/* Label and Description */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{layer.label}</p>
                        <p className="text-xs text-muted-foreground">{layer.description}</p>
                      </div>

                      {/* Toggle Switch */}
                      <div
                        className={`relative w-10 h-6 rounded-full transition flex items-center justify-end pr-1 flex-shrink-0 ${
                          isActive
                            ? 'bg-accent'
                            : 'bg-muted-foreground/30'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white dark:bg-slate-900 rounded-full shadow transition transform ${
                            isActive ? 'translate-x-0' : '-translate-x-4'
                          }`}
                        ></div>
                      </div>
                    </button>

                    {/* Farmer-Friendly Tooltip */}
                    {hoveredLayer === layer.id && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-foreground text-background rounded-lg p-2.5 text-xs shadow-lg z-50 pointer-events-none">
                        <p className="font-semibold mb-1">How this helps you:</p>
                        <p>{(layer as any).farmerInfo}</p>
                        <div className="absolute -top-1 left-6 w-2 h-2 bg-foreground transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quick Stats */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Temp', icon: '🌡️' },
                    { label: 'Rain', icon: '🌧️' },
                    { label: 'Storm', icon: '⚡' },
                    { label: 'Flood', icon: '⚠️' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
});

MapLayerControls.displayName = 'MapLayerControls';
