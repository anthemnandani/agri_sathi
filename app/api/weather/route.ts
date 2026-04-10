import { NextRequest, NextResponse } from 'next/server';

// Types matching the frontend requirements
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
  uvIndex: number;
  visibility: number;
  pressure: number;
  rainProbability: number;
  precipitation: number;
  thunderstorm: boolean;
  floodRisk: 'low' | 'medium' | 'high' | 'none';
  sunrise: string;
  sunset: string;
  lastUpdated: number;
}

export interface ForecastDay {
  day: string;
  date: string;
  condition: string;
  minTemp: number;
  maxTemp: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
  isToday?: boolean;
}

export interface WeatherStats {
  rainChance: number;
  lightning: string;
  windSpeed: number;
  humidity: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastDay[];
  stats: WeatherStats;
}

// Dummy weather data - Replace with actual DB/API calls later
const DUMMY_WEATHER_DATA: Record<string, WeatherResponse> = {
  'default': {
    current: {
      location: 'Supaul, Bihar',
      lat: 26.1197,
      lng: 86.9967,
      temperature: 31,
      feelsLike: 34,
      humidity: 40.67,
      windSpeed: 0.2,
      windDirection: 180,
      cloudCover: 25,
      condition: 'Sunny',
      uvIndex: 7,
      visibility: 10,
      pressure: 1012,
      rainProbability: 0,
      precipitation: 0,
      thunderstorm: false,
      floodRisk: 'none',
      sunrise: '07:00:23',
      sunset: '18:10:03',
      lastUpdated: Date.now(),
    },
    forecast: [
      { day: 'Today', date: new Date().toISOString(), condition: 'Cloudy', minTemp: 27, maxTemp: 33, rainChance: 70, humidity: 65, windSpeed: 5, isToday: true },
      { day: 'Tomorrow', date: new Date(Date.now() + 86400000).toISOString(), condition: 'Cloudy', minTemp: 27, maxTemp: 33, rainChance: 40, humidity: 60, windSpeed: 8 },
      { day: 'Wednesday', date: new Date(Date.now() + 86400000 * 2).toISOString(), condition: 'Partly Cloudy', minTemp: 27, maxTemp: 33, rainChance: 20, humidity: 55, windSpeed: 6 },
      { day: 'Thursday', date: new Date(Date.now() + 86400000 * 3).toISOString(), condition: 'Cloudy', minTemp: 27, maxTemp: 33, rainChance: 30, humidity: 58, windSpeed: 7 },
      { day: 'Friday', date: new Date(Date.now() + 86400000 * 4).toISOString(), condition: 'Sunny', minTemp: 27, maxTemp: 33, rainChance: 5, humidity: 45, windSpeed: 4 },
      { day: 'Saturday', date: new Date(Date.now() + 86400000 * 5).toISOString(), condition: 'Sunny', minTemp: 27, maxTemp: 33, rainChance: 0, humidity: 42, windSpeed: 3 },
      { day: 'Sunday', date: new Date(Date.now() + 86400000 * 6).toISOString(), condition: 'Rainy', minTemp: 27, maxTemp: 33, rainChance: 80, humidity: 75, windSpeed: 12 },
    ],
    stats: {
      rainChance: 0,
      lightning: 'N/A',
      windSpeed: 0.2,
      humidity: 40.67,
      sunrise: '07:00:23',
      sunset: '18:10:03',
    },
  },
  'delhi': {
    current: {
      location: 'Delhi',
      lat: 28.7041,
      lng: 77.1025,
      temperature: 35,
      feelsLike: 38,
      humidity: 35,
      windSpeed: 8,
      windDirection: 220,
      cloudCover: 15,
      condition: 'Sunny',
      uvIndex: 9,
      visibility: 8,
      pressure: 1008,
      rainProbability: 5,
      precipitation: 0,
      thunderstorm: false,
      floodRisk: 'none',
      sunrise: '06:45:00',
      sunset: '18:30:00',
      lastUpdated: Date.now(),
    },
    forecast: [
      { day: 'Today', date: new Date().toISOString(), condition: 'Sunny', minTemp: 30, maxTemp: 38, rainChance: 5, humidity: 35, windSpeed: 8, isToday: true },
      { day: 'Tomorrow', date: new Date(Date.now() + 86400000).toISOString(), condition: 'Partly Cloudy', minTemp: 29, maxTemp: 36, rainChance: 15, humidity: 40, windSpeed: 10 },
      { day: 'Wednesday', date: new Date(Date.now() + 86400000 * 2).toISOString(), condition: 'Cloudy', minTemp: 28, maxTemp: 35, rainChance: 30, humidity: 50, windSpeed: 12 },
      { day: 'Thursday', date: new Date(Date.now() + 86400000 * 3).toISOString(), condition: 'Rainy', minTemp: 26, maxTemp: 32, rainChance: 70, humidity: 70, windSpeed: 15 },
      { day: 'Friday', date: new Date(Date.now() + 86400000 * 4).toISOString(), condition: 'Thunderstorm', minTemp: 25, maxTemp: 30, rainChance: 85, humidity: 80, windSpeed: 20 },
      { day: 'Saturday', date: new Date(Date.now() + 86400000 * 5).toISOString(), condition: 'Cloudy', minTemp: 27, maxTemp: 33, rainChance: 40, humidity: 55, windSpeed: 10 },
      { day: 'Sunday', date: new Date(Date.now() + 86400000 * 6).toISOString(), condition: 'Sunny', minTemp: 28, maxTemp: 35, rainChance: 10, humidity: 40, windSpeed: 6 },
    ],
    stats: {
      rainChance: 5,
      lightning: 'N/A',
      windSpeed: 8,
      humidity: 35,
      sunrise: '06:45:00',
      sunset: '18:30:00',
    },
  },
  'mumbai': {
    current: {
      location: 'Mumbai',
      lat: 19.076,
      lng: 72.8776,
      temperature: 32,
      feelsLike: 36,
      humidity: 70,
      windSpeed: 15,
      windDirection: 270,
      cloudCover: 40,
      condition: 'Partly Cloudy',
      uvIndex: 8,
      visibility: 6,
      pressure: 1010,
      rainProbability: 60,
      precipitation: 2,
      thunderstorm: false,
      floodRisk: 'medium',
      sunrise: '06:20:00',
      sunset: '18:45:00',
      lastUpdated: Date.now(),
    },
    forecast: [
      { day: 'Today', date: new Date().toISOString(), condition: 'Rainy', minTemp: 28, maxTemp: 32, rainChance: 75, humidity: 85, windSpeed: 18, isToday: true },
      { day: 'Tomorrow', date: new Date(Date.now() + 86400000).toISOString(), condition: 'Thunderstorm', minTemp: 27, maxTemp: 31, rainChance: 90, humidity: 90, windSpeed: 25 },
      { day: 'Wednesday', date: new Date(Date.now() + 86400000 * 2).toISOString(), condition: 'Rainy', minTemp: 27, maxTemp: 30, rainChance: 80, humidity: 88, windSpeed: 20 },
      { day: 'Thursday', date: new Date(Date.now() + 86400000 * 3).toISOString(), condition: 'Cloudy', minTemp: 28, maxTemp: 31, rainChance: 50, humidity: 75, windSpeed: 12 },
      { day: 'Friday', date: new Date(Date.now() + 86400000 * 4).toISOString(), condition: 'Partly Cloudy', minTemp: 28, maxTemp: 32, rainChance: 30, humidity: 65, windSpeed: 10 },
      { day: 'Saturday', date: new Date(Date.now() + 86400000 * 5).toISOString(), condition: 'Sunny', minTemp: 29, maxTemp: 33, rainChance: 15, humidity: 55, windSpeed: 8 },
      { day: 'Sunday', date: new Date(Date.now() + 86400000 * 6).toISOString(), condition: 'Rainy', minTemp: 27, maxTemp: 31, rainChance: 70, humidity: 80, windSpeed: 15 },
    ],
    stats: {
      rainChance: 60,
      lightning: 'Possible',
      windSpeed: 15,
      humidity: 70,
      sunrise: '06:20:00',
      sunset: '18:45:00',
    },
  },
};

// Generate dynamic weather data based on coordinates
function generateWeatherForCoordinates(lat: number, lng: number): WeatherResponse {
  const baseTemp = 25 + Math.sin(lng / 10) * 5;
  const thunderstormChance = Math.random();
  const rainChance = Math.random();
  
  const condition = rainChance > 0.7 ? 'Rainy' : thunderstormChance > 0.8 ? 'Thunderstorm' : rainChance > 0.4 ? 'Cloudy' : 'Sunny';
  
  const current: WeatherData = {
    location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    lat,
    lng,
    temperature: Math.round(baseTemp + (Math.random() - 0.5) * 10),
    feelsLike: Math.round(baseTemp + (Math.random() - 0.5) * 12),
    humidity: Math.round(40 + Math.random() * 50),
    windSpeed: Math.round((5 + Math.random() * 20) * 10) / 10,
    windDirection: Math.round(Math.random() * 360),
    cloudCover: Math.round(Math.random() * 100),
    condition,
    uvIndex: Math.round(3 + Math.random() * 5),
    visibility: Math.round(8 + Math.random() * 4),
    pressure: Math.round(1010 + (Math.random() - 0.5) * 20),
    rainProbability: Math.round(rainChance * 100),
    precipitation: rainChance > 0.5 ? Math.round(Math.random() * 10 * 10) / 10 : 0,
    thunderstorm: thunderstormChance > 0.8,
    floodRisk: rainChance > 0.8 ? 'high' : rainChance > 0.6 ? 'medium' : rainChance > 0.3 ? 'low' : 'none',
    sunrise: '06:30:00',
    sunset: '18:45:00',
    lastUpdated: Date.now(),
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Thunderstorm'];
  
  const forecast: ForecastDay[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(Date.now() + i * 86400000);
    const dayCondition = conditions[Math.floor(Math.random() * conditions.length)];
    forecast.push({
      day: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[date.getDay()],
      date: date.toISOString(),
      condition: dayCondition,
      minTemp: Math.round(baseTemp - 3 + Math.random() * 2),
      maxTemp: Math.round(baseTemp + 5 + Math.random() * 3),
      rainChance: Math.round(Math.random() * 100),
      humidity: Math.round(40 + Math.random() * 50),
      windSpeed: Math.round(5 + Math.random() * 15),
      isToday: i === 0,
    });
  }

  return {
    current,
    forecast,
    stats: {
      rainChance: current.rainProbability,
      lightning: current.thunderstorm ? 'Active' : 'N/A',
      windSpeed: current.windSpeed,
      humidity: current.humidity,
      sunrise: current.sunrise,
      sunset: current.sunset,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const location = searchParams.get('location')?.toLowerCase();

    // If location name is provided, return predefined data
    if (location && DUMMY_WEATHER_DATA[location]) {
      return NextResponse.json({
        success: true,
        data: DUMMY_WEATHER_DATA[location],
      });
    }

    // If coordinates are provided, generate weather for that location
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      
      // Check if coordinates match any predefined location
      if (Math.abs(latitude - 26.1197) < 0.5 && Math.abs(longitude - 86.9967) < 0.5) {
        return NextResponse.json({ success: true, data: DUMMY_WEATHER_DATA['default'] });
      }
      if (Math.abs(latitude - 28.7041) < 0.5 && Math.abs(longitude - 77.1025) < 0.5) {
        return NextResponse.json({ success: true, data: DUMMY_WEATHER_DATA['delhi'] });
      }
      if (Math.abs(latitude - 19.076) < 0.5 && Math.abs(longitude - 72.8776) < 0.5) {
        return NextResponse.json({ success: true, data: DUMMY_WEATHER_DATA['mumbai'] });
      }

      // Generate dynamic data for other coordinates
      const weatherData = generateWeatherForCoordinates(latitude, longitude);
      return NextResponse.json({ success: true, data: weatherData });
    }

    // Default: return Supaul weather
    return NextResponse.json({
      success: true,
      data: DUMMY_WEATHER_DATA['default'],
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
