// Weather data types and interfaces
export interface WeatherData {
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
}

export interface ForecastData {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  rainProbability: number;
}

export interface LocationDetails extends WeatherData {
  forecast: ForecastData[];
  sunrise: string;
  sunset: string;
  lastUpdated: number;
}

// Weather data cache
const weatherCache = new Map<string, { data: LocationDetails; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch weather data for a specific location from API
 * Uses cached data if available within the cache duration
 */
export async function getWeatherData(lat: number, lng: number): Promise<LocationDetails> {
  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  const cached = weatherCache.get(cacheKey);

  // Return cached data if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Fetch from API
    const response = await fetch(`/api/weather?lat=${lat}&lng=${lng}`);
    const result = await response.json();

    if (result.success && result.data) {
      const { current } = result.data;
      
      // Transform API response to LocationDetails format
      const weatherData: LocationDetails = {
        location: current.location,
        lat: current.lat,
        lng: current.lng,
        temperature: current.temperature,
        feelsLike: current.feelsLike,
        humidity: current.humidity,
        windSpeed: current.windSpeed,
        windDirection: current.windDirection,
        cloudCover: current.cloudCover,
        condition: current.condition,
        icon: getWeatherIcon(current.condition),
        uvIndex: current.uvIndex,
        visibility: current.visibility,
        pressure: current.pressure,
        rainProbability: current.rainProbability,
        precipitation: current.precipitation,
        thunderstorm: current.thunderstorm,
        floodRisk: current.floodRisk,
        forecast: generateMockForecast(),
        sunrise: current.sunrise,
        sunset: current.sunset,
        lastUpdated: Date.now(),
      };

      // Cache the data
      weatherCache.set(cacheKey, { data: weatherData, timestamp: Date.now() });

      return weatherData;
    }

    // Fallback to mock data if API fails
    return generateMockWeatherData(lat, lng);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Fallback to mock data
    return generateMockWeatherData(lat, lng);
  }
}

// Get weather icon based on condition
function getWeatherIcon(condition: string): string {
  switch (condition?.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return 'sunny';
    case 'partly cloudy':
      return 'partly-cloudy';
    case 'cloudy':
      return 'cloudy';
    case 'rainy':
    case 'rain':
      return 'rainy';
    case 'snow':
      return 'snow';
    case 'thunderstorm':
      return 'thunderstorm';
    default:
      return 'sunny';
  }
}

// Mock weather data for fallback
const generateMockWeatherData = (lat: number, lng: number): LocationDetails => {
  const baseTemp = 25 + Math.sin(lng / 10) * 5;
  const thunderstormChance = Math.random();
  const rainChance = Math.random();

  return {
    location: `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
    lat,
    lng,
    temperature: Math.round(baseTemp + (Math.random() - 0.5) * 10),
    feelsLike: Math.round(baseTemp + (Math.random() - 0.5) * 12),
    humidity: 40 + Math.random() * 50,
    windSpeed: 5 + Math.random() * 20,
    windDirection: Math.random() * 360,
    cloudCover: Math.random() * 100,
    condition: rainChance > 0.7 ? 'Rainy' : thunderstormChance > 0.8 ? 'Thunderstorm' : 'Partly Cloudy',
    icon: rainChance > 0.7 ? 'rainy' : thunderstormChance > 0.8 ? 'thunderstorm' : 'partly-cloudy',
    uvIndex: 3 + Math.random() * 5,
    visibility: 8 + Math.random() * 4,
    pressure: 1010 + (Math.random() - 0.5) * 20,
    rainProbability: rainChance * 100,
    precipitation: rainChance > 0.5 ? Math.random() * 10 : 0,
    thunderstorm: thunderstormChance > 0.8,
    floodRisk: rainChance > 0.8 ? 'high' : rainChance > 0.6 ? 'medium' : 'low',
    forecast: generateMockForecast(),
    sunrise: '06:30',
    sunset: '18:45',
    lastUpdated: Date.now(),
  };
};

const generateMockForecast = (): ForecastData[] => {
  const forecast: ForecastData[] = [];
  const now = new Date();

  for (let i = 0; i < 6; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const rainChance = Math.random();

    forecast.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temperature: 22 + Math.random() * 8,
      condition: rainChance > 0.7 ? 'Rainy' : 'Clear',
      icon: rainChance > 0.7 ? 'rainy' : 'sunny',
      rainProbability: rainChance * 100,
    });
  }

  return forecast;
};

/**
 * Get weather data for current user location
 */
export async function getCurrentLocationWeather(): Promise<LocationDetails | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherData = await getWeatherData(latitude, longitude);
          resolve(weatherData);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          resolve(null);
        }
      },
      () => {
        // Return mock data for India (Bihar - Supaul) as fallback
        resolve(generateMockWeatherData(26.2, 87.5));
      }
    );
  });
}

/**
 * Get weather overlay data from API
 */
export async function getWeatherOverlayDataFromAPI(
  bounds: { north: number; south: number; east: number; west: number },
  overlayType: 'temperature' | 'rain' | 'thunderstorm' | 'clouds' | 'flood'
) {
  try {
    const params = new URLSearchParams({
      type: overlayType,
      north: bounds.north.toString(),
      south: bounds.south.toString(),
      east: bounds.east.toString(),
      west: bounds.west.toString(),
    });

    const response = await fetch(`/api/weather/overlay?${params}`);
    const result = await response.json();

    if (result.success && result.data) {
      return result.data.points;
    }

    // Fallback to local generation
    return getWeatherOverlayData(bounds, overlayType);
  } catch (error) {
    console.error('Error fetching overlay data:', error);
    return getWeatherOverlayData(bounds, overlayType);
  }
}

/**
 * Get weather overlay data for map visualization (fallback/local)
 */
export function getWeatherOverlayData(
  bounds: { north: number; south: number; east: number; west: number },
  overlayType: 'temperature' | 'rain' | 'thunderstorm' | 'clouds' | 'flood'
) {
  const data: Array<{ lat: number; lng: number; value: number; intensity?: string }> = [];

  // Generate grid of data points
  const latStep = (bounds.north - bounds.south) / 4;
  const lngStep = (bounds.east - bounds.west) / 4;

  for (let lat = bounds.south; lat <= bounds.north; lat += latStep) {
    for (let lng = bounds.west; lng <= bounds.east; lng += lngStep) {
      const randomValue = Math.random();

      switch (overlayType) {
        case 'temperature':
          data.push({
            lat,
            lng,
            value: 20 + randomValue * 15,
            intensity: randomValue > 0.8 ? 'high' : randomValue > 0.5 ? 'medium' : 'low',
          });
          break;

        case 'rain':
          if (randomValue > 0.6) {
            data.push({
              lat,
              lng,
              value: randomValue * 100,
              intensity: randomValue > 0.8 ? 'heavy' : 'light',
            });
          }
          break;

        case 'thunderstorm':
          if (randomValue > 0.85) {
            data.push({
              lat,
              lng,
              value: randomValue * 100,
              intensity: 'high',
            });
          }
          break;

        case 'clouds':
          data.push({
            lat,
            lng,
            value: randomValue * 100,
            intensity: randomValue > 0.8 ? 'dense' : randomValue > 0.5 ? 'moderate' : 'light',
          });
          break;

        case 'flood':
          if (randomValue > 0.8) {
            data.push({
              lat,
              lng,
              value: randomValue * 100,
              intensity: randomValue > 0.9 ? 'high' : 'medium',
            });
          }
          break;
      }
    }
  }

  return data;
}

/**
 * Clear weather cache
 */
export function clearWeatherCache() {
  weatherCache.clear();
}
