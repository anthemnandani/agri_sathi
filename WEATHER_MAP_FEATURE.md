# Interactive Weather Map Feature

## Overview
The Interactive Weather Map is a powerful feature that allows farmers to explore and visualize weather data across different regions of India. The map is fully interactive, farmer-friendly, and provides detailed weather information for any location.

## Features

### 1. **Interactive Map (Leaflet.js + OpenStreetMap)**
- **Zoom & Pan**: Drag to explore different areas, zoom in/out to see detailed or broader views
- **OpenStreetMap Integration**: Real-time map tiles from OpenStreetMap for accurate geographical reference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Touch Friendly**: Full touch support for mobile devices

### 2. **Location Markers**
- Pre-configured markers for major agricultural regions:
  - Supaul, Bihar
  - Delhi
  - Mumbai
  - Bangalore
  - Indore
- Click on any marker to view detailed weather data for that location
- Click anywhere on the map to fetch weather for that custom location

### 3. **Weather Overlays & Layers**
Toggle different weather visualization layers on/off:
- **Temperature Heatmap**: Shows temperature distribution with color gradients
  - Red: High temperature (>30°C)
  - Orange: Medium temperature (25-30°C)
  - Blue: Cool temperature (<25°C)
- **Rainfall Layer**: Shows precipitation areas
  - Dark Blue: Heavy rainfall
  - Light Blue: Light rainfall
- **Thunderstorm Alert**: Highlights areas with thunderstorm risk
  - Purple zones indicate active thunderstorm areas
- **Cloud Cover**: Shows cloud density across the region
  - Dense clouds: 70-100% coverage
  - Moderate clouds: 40-70% coverage
  - Light clouds: 10-40% coverage
- **Flood Risk**: Shows areas at risk of flooding
  - Red (High): High flood risk areas
  - Orange (Medium): Medium flood risk areas

### 4. **Weather Details Popup**
Click on any location to open a detailed weather panel showing:
- **Current Conditions**
  - Temperature, feels-like temperature, weather condition
  - Visual weather icon
- **Detailed Metrics**
  - Humidity (%)
  - Wind speed (km/h)
  - Visibility (km)
  - Cloud cover (%)
  - UV Index
  - Rain probability (%)
- **Sun Timing**
  - Sunrise time
  - Sunset time
- **Alerts**
  - Thunderstorm warnings
  - Flood risk alerts
  - Heavy rain warnings
- **Hourly Forecast**
  - Next 3 hours of weather predictions
  - Temperature and rain probability for each hour

### 5. **Smart Controls**
- **"My Location" Button**: Instantly navigate to user's current location using device geolocation
- **Layer Controls Panel**: Collapsible panel at bottom-left to toggle weather overlays
- **Visual Legend**: Shows currently active weather layers with color indicators
- **Loading States**: Clear feedback when fetching weather data

## How to Use

### For Farmers
1. **View Weather for Your Area**
   - Click "My Location" button to see your current location's weather
   - Or drag the map to find your village/area

2. **Check Weather for Multiple Locations**
   - Click on different location markers (Delhi, Mumbai, etc.)
   - Or click directly on the map where you want to check weather

3. **Monitor Weather Hazards**
   - Enable "Thunderstorm" layer to see storm alerts
   - Enable "Flood Risk" layer for flood warnings
   - Enable "Rainfall" layer to see precipitation patterns

4. **Plan Agricultural Activities**
   - Use temperature heatmap to understand regional temperature patterns
   - Check wind speed and cloud cover for planning irrigation
   - Monitor rainfall probability for planting/harvesting decisions

### Weather Layer Guide for Agriculture

**Temperature Layer**: 
- Use to plan heat-sensitive crop irrigation timing
- Identify cooler micro-climates suitable for specific crops

**Rainfall Layer**:
- Plan irrigation schedules around natural rainfall
- Check rainfall probability before applying fertilizers

**Thunderstorm Layer**:
- Avoid outdoor work during thunderstorms
- Protect crops and livestock from lightning
- Postpone harvesting activities

**Cloud Cover Layer**:
- Understand solar radiation for crop growth planning
- Identify overcast periods for pesticide spraying

**Flood Risk Layer**:
- Prepare drainage systems in high-risk areas
- Plan crop selection based on flood vulnerability
- Schedule harvesting before predicted heavy rains

## Technical Details

### Architecture
- **Frontend**: React with TypeScript
- **Map Engine**: Leaflet.js + react-leaflet
- **Base Maps**: OpenStreetMap (free, open-source)
- **Weather Data**: Mock data service (ready for real OpenWeatherMap API integration)
- **Styling**: Tailwind CSS with theme-aware dark mode support

### Components
1. **InteractiveWeatherMap.tsx**: Main map component with all interactions
2. **MapLayerControls.tsx**: Weather layer toggle controls
3. **WeatherDetailsPopup.tsx**: Detailed weather information panel
4. **weatherService.ts**: Mock weather data generation and caching

### Key Features
- **Client-side Caching**: Weather data is cached for 10 minutes
- **Responsive Layout**: Adapts to mobile, tablet, and desktop screens
- **Dark Mode Support**: Full theme integration with app's dark mode
- **Accessibility**: ARIA labels and semantic HTML for screen readers
- **Performance**: Optimized rendering with memoized components

## Future Enhancements

### Real Weather Data Integration
To connect to real weather API (e.g., OpenWeatherMap):
1. Update `weatherService.ts` to call actual API endpoints
2. Add API key configuration in environment variables
3. Replace mock data generation with real API responses

### Additional Features
- User-defined location bookmarks
- Weather alerts notifications
- Historical weather data
- Weather comparison between multiple locations
- Crop-specific weather recommendations
- Soil moisture monitoring overlay
- Air quality index (AQI) layer
- Severe weather prediction alerts

### Localization
- Support for local languages (Hindi, Marathi, Gujarati, etc.)
- Location name translation
- Local weather terminology

## Mobile Optimization

The map is fully optimized for mobile devices:
- Touch-friendly controls
- Responsive popup design
- Optimized layer control for small screens
- Fast loading on slower connections

## Troubleshooting

### Map not loading
- Check browser console for errors
- Ensure Leaflet CSS is properly imported
- Verify internet connection for map tiles

### Weather data not showing
- Check browser console for API errors
- Verify geolocation permission is granted
- Ensure weather service is accessible

### Performance issues
- Try zooming out to load fewer map tiles
- Close/minimize weather detail popup
- Clear browser cache if map tiles are outdated

## Browser Support
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## API & Integration Notes

### Weather Service Methods
```typescript
// Get weather for specific coordinates
getWeatherData(lat: number, lng: number): Promise<LocationDetails>

// Get current location weather
getCurrentLocationWeather(): Promise<LocationDetails | null>

// Get weather overlay data for map visualization
getWeatherOverlayData(bounds, overlayType): Array<WeatherPoint>
```

### Data Types
```typescript
interface LocationDetails {
  location: string;
  lat: number;
  lng: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  rainProbability: number;
  thunderstorm: boolean;
  floodRisk: 'low' | 'medium' | 'high' | 'none';
  forecast: ForecastData[];
  // ... more fields
}
```

## Contributing

When enhancing this feature:
1. Keep the farmer-first UI/UX principle
2. Test on mobile devices
3. Maintain theme compatibility
4. Add proper error handling
5. Update this documentation

---

**Last Updated**: April 2026
**Status**: Production Ready (with mock data)
**Next Phase**: Real API Integration (OpenWeatherMap)
