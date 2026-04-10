# Weather Map - Developer Guide

## Quick Start

### 1. View the Feature
```bash
# Start development server
npm run dev

# Navigate to
http://localhost:3000/farmer/weather
```

### 2. Key Files to Know
```
components/farmer/weather/
├── InteractiveWeatherMap.tsx      ← Main map component (Leaflet-based)
├── MapLayerControls.tsx           ← Weather layer toggle controls
├── WeatherDetailsPopup.tsx        ← Weather information panel
├── CurrentWeather.tsx
├── ForecastSection.tsx
├── ForecastCard.tsx
└── AlertsSection.tsx

utils/weather/
└── weatherService.ts              ← Weather data generation & caching

app/
├── globals.css                    ← Leaflet CSS imports & theming
└── farmer/(dashboard)/
    └── weather/
        └── page.tsx               ← Weather page entry point
```

## Component API

### InteractiveWeatherMap
Main interactive map component with full weather integration.

**Props**: None (self-contained)

**State Management**:
- `mapState`: Current map zoom and center coordinates
- `markers`: Pre-configured location markers
- `selectedMarker`: Currently selected map marker
- `weatherData`: Current location's weather information
- `loadingWeather`: Loading state while fetching weather
- `layers`: Active weather overlay layers
- `mapLoaded`: Map initialization state

**Key Methods**:
```typescript
// Fetch weather for any location
fetchWeatherForLocation(lat: number, lng: number, label: string): Promise<void>

// Handle map interactions
handleMapClick(e: React.MouseEvent<HTMLDivElement>): void
handleMarkerClick(marker: MapMarker): void
handleLayerToggle(layer: keyof LayerState): void
handleCurrentLocation(): void
```

**Events**:
- `click` on map → Fetches weather for clicked location
- `click` on marker → Centers map and fetches weather
- `moveend` → Updates visible weather overlay area
- `geolocation success` → Centers on user location

### MapLayerControls
Toggleable control panel for weather visualization layers.

**Props**:
```typescript
interface MapLayerControlsProps {
  layers: LayerState;           // Current layer states (boolean)
  onLayerToggle: (layer: keyof LayerState) => void;  // Toggle callback
}
```

**Layers**:
- `temperature`: Boolean
- `rain`: Boolean
- `thunderstorm`: Boolean
- `clouds`: Boolean
- `flood`: Boolean

### WeatherDetailsPopup
Full-screen modal showing comprehensive weather information.

**Props**:
```typescript
interface WeatherDetailsPopupProps {
  weatherData: LocationDetails;  // Complete weather information
  onClose: () => void;          // Close callback
}
```

## Weather Service API

### Mock Data Generation
Currently uses mock data with realistic patterns based on location.

**Main Functions**:
```typescript
// Get weather for coordinates
async getWeatherData(lat: number, lng: number): Promise<LocationDetails>

// Get current device location weather
async getCurrentLocationWeather(): Promise<LocationDetails | null>

// Generate overlay visualization data
function getWeatherOverlayData(
  bounds: { north, south, east, west },
  overlayType: 'temperature' | 'rain' | 'thunderstorm' | 'clouds' | 'flood'
): Array<WeatherPoint>
```

### Data Types
```typescript
interface LocationDetails {
  location: string;
  lat: number;
  lng: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  cloudCover: number;
  condition: string;
  icon: string;
  uvIndex: number;
  visibility: number;
  pressure: number;
  rainProbability: number;
  precipitation: number;
  thunderstorm: boolean;
  floodRisk: 'low' | 'medium' | 'high' | 'none';
  forecast: ForecastData[];
  sunrise: string;
  sunset: string;
  lastUpdated: number;
}

interface ForecastData {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  rainProbability: number;
}

interface LayerState {
  temperature: boolean;
  rain: boolean;
  thunderstorm: boolean;
  clouds: boolean;
  flood: boolean;
}
```

## Styling & Theming

### CSS Classes Used
```css
/* Map container */
.relative.w-full.h-full

/* Weather overlays */
.absolute.inset-0.w-full.h-full.pointer-events-none.z-10

/* Controls positioning */
.absolute.top-4.right-4.z-40    /* Top-right controls */
.absolute.top-4.left-4.z-40     /* Top-left info box */
.absolute.bottom-24.left-4.z-40 /* Bottom-left legend */

/* Loading indicator */
.absolute.inset-0.flex.items-center.justify-center.bg-black/20.z-40
```

### Tailwind Integration
```tailwind
/* Responsive breakpoints used */
md:min-h-[500px]    /* Desktop size */
hidden.sm:inline    /* Show on small+ screens */

/* Color tokens */
bg-white dark:bg-slate-900
text-foreground
border-border
shadow-md

/* Animations */
animate-spin         /* Loading spinner */
transition           /* Smooth interactions */
```

### Dark Mode
All components support dark mode automatically via Tailwind's dark variant.

**Key CSS Custom Properties**:
```css
--background
--foreground
--border
--muted
--muted-foreground
--primary
```

## Integrating Real Weather API

### Step 1: Update weatherService.ts
```typescript
// Replace getWeatherData function
export async function getWeatherData(lat: number, lng: number): Promise<LocationDetails> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
  );
  
  const data = await response.json();
  
  // Transform API response to LocationDetails format
  return {
    location: data.name,
    lat,
    lng,
    temperature: Math.round(data.main.temp),
    // ... map other fields
  };
}
```

### Step 2: Add Environment Variable
```bash
# .env.local
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### Step 3: Test Integration
```bash
npm run dev
# Navigate to weather page and test
```

## Performance Optimization Tips

### 1. Reduce Weather Point Density
In `getWeatherOverlayData()`, adjust grid step size:
```typescript
// Current: Creates dense grid
const latStep = (bounds.north - bounds.south) / 4;
const lngStep = (bounds.east - bounds.west) / 4;

// Faster: Less dense grid
const latStep = (bounds.north - bounds.south) / 2;
const lngStep = (bounds.east - bounds.west) / 2;
```

### 2. Cache Weather Data
Current caching: 10 minutes
```typescript
const CACHE_DURATION = 10 * 60 * 1000; // Adjust as needed
```

### 3. Limit Visible Markers
Hide markers at high zoom levels:
```typescript
// In InteractiveWeatherMap, add before rendering markers
if (mapState.zoom < 6) return null; // Don't show markers when zoomed out
```

### 4. Lazy Load Leaflet
Already implemented with dynamic import:
```typescript
import('leaflet').then((L) => {
  // Load only when needed
});
```

## Common Tasks

### Add New Weather Layer
1. Update `LayerState` interface in weatherService.ts
2. Add toggle option in `MapLayerControls.tsx`
3. Add SVG rendering logic in `InteractiveWeatherMap.tsx`
4. Add color/styling in getWeatherOverlayData()

### Change Default Location
```typescript
// In InteractiveWeatherMap.tsx
const [mapState, setMapState] = useState<MapState>({
  zoom: 5,
  center: { lat: 28.7, lng: 77.1 }, // Change to Delhi, for example
});
```

### Add More Markers
```typescript
const [markers, setMarkers] = useState<MapMarker[]>([
  { id: '1', lat: 26.2, lng: 87.5, label: 'Supaul, Bihar' },
  // Add new marker here
  { id: '6', lat: 22.5, lng: 88.4, label: 'Kolkata' },
]);
```

### Change Popup Style
Edit `WeatherDetailsPopup.tsx` - modify Card and CardContent styling.

### Customize Layer Colors
In `InteractiveWeatherMap.tsx`, modify the color switches:
```typescript
switch (layerType) {
  case 'temperature':
    color = point.value > 35 ? 'rgb(220, 20, 60)' : /* ... */;
    break;
}
```

## Debugging

### Enable Debug Logging
```typescript
// Already in code with [v0] prefix
console.log('[v0] Debug message:', variable);
```

### Check Leaflet Initialization
```javascript
// In browser console
window.L // Should show Leaflet object
map.getCenter() // Get current map center
map.getZoom() // Get current zoom
```

### Test Geolocation
```javascript
navigator.geolocation.getCurrentPosition((pos) => {
  console.log(pos.coords);
});
```

### Verify Weather Data
```javascript
// Check weatherCache in weatherService
// Add to browser DevTools console breakpoint
```

## Testing

### Unit Test Example
```typescript
describe('InteractiveWeatherMap', () => {
  it('should fetch weather on map click', async () => {
    const { getByRole } = render(<InteractiveWeatherMap />);
    const mapElement = getByRole('region');
    
    fireEvent.click(mapElement);
    
    // Assert weather data loaded
  });
});
```

### Integration Test
```typescript
// Test full user flow
1. Map loads ✓
2. Click on map ✓
3. Weather popup appears ✓
4. Toggle layer works ✓
5. Close popup works ✓
```

## Mobile Testing

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Touch Testing Checklist
- [ ] Tap markers work
- [ ] Drag map smoothly
- [ ] Layer controls accessible
- [ ] Popup readable on small screen
- [ ] Buttons large enough (48px+)
- [ ] No horizontal scroll

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Map not loading | Check Leaflet CSS import in globals.css |
| Markers not showing | Verify marker coordinates are valid |
| Weather data undefined | Check weatherService mock data generation |
| Layer overlay invisible | Verify SVG percentage positioning logic |
| Mobile controls unclickable | Check z-index values (should be >= 40) |
| Dark mode not working | Verify dark class on html element |
| High memory usage | Reduce weather point density in overlay data |

## Dependencies

```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.3",
  "@types/leaflet": "^1.9.8"
}
```

### Update Procedure
```bash
npm update leaflet react-leaflet
npm install --save-dev @types/leaflet@latest
```

## Resources

- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [React-Leaflet Guide](https://react-leaflet.js.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Contributing Guidelines

1. **Code Style**: Follow existing patterns
2. **Comments**: Add comments for complex logic
3. **TypeScript**: Maintain strict type checking
4. **Testing**: Test on mobile before committing
5. **Performance**: Profile before optimizing
6. **Documentation**: Update docs with changes

---

**Questions?** Check existing documentation or review component comments.
**Last Updated**: April 2026
