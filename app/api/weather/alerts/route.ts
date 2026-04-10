import { NextRequest, NextResponse } from 'next/server';

// Types matching the Weather Alert Registration schema
export interface WeatherAlertRegistration {
  registration_id: string;
  user_id: string;
  farmer_name: string;
  mobile_number: string;
  pincode: string;
  address?: string;
  occupation: 'Farmer' | 'Laborer' | 'Other';
  register_for: 'Self' | 'Other';
  relation?: string;
  created_at: string;
  updated_at: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface WeatherAlert {
  alert_id: string;
  registration_id: string;
  alert_type: 'Rain' | 'Heatwave' | 'Coldwave' | 'Thunderstorm' | 'Flood' | 'Cyclone';
  alert_message: string;
  sent_at: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  pincode: string;
}

// Dummy registrations data - Replace with actual DB calls later
const DUMMY_REGISTRATIONS: WeatherAlertRegistration[] = [
  {
    registration_id: 'reg-001',
    user_id: 'user-001',
    farmer_name: 'Ramesh Kumar',
    mobile_number: '+91 9876543210',
    pincode: '847215',
    address: 'Village Bhikhna Thori, Supaul, Bihar',
    occupation: 'Farmer',
    register_for: 'Self',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    status: 'Active',
  },
  {
    registration_id: 'reg-002',
    user_id: 'user-002',
    farmer_name: 'Sunita Devi',
    mobile_number: '+91 9876543211',
    pincode: '847215',
    address: 'Village Triveniganj, Supaul, Bihar',
    occupation: 'Farmer',
    register_for: 'Self',
    created_at: '2024-01-20T14:45:00Z',
    updated_at: '2024-01-20T14:45:00Z',
    status: 'Active',
  },
];

// Dummy active alerts - Replace with actual DB/API calls later
const DUMMY_ALERTS: WeatherAlert[] = [
  {
    alert_id: 'alert-001',
    registration_id: 'reg-001',
    alert_type: 'Rain',
    alert_message: 'Heavy rainfall expected in your area in the next 24 hours. Take necessary precautions for your crops.',
    sent_at: new Date().toISOString(),
    severity: 'Medium',
    pincode: '847215',
  },
  {
    alert_id: 'alert-002',
    registration_id: 'reg-001',
    alert_type: 'Thunderstorm',
    alert_message: 'Thunderstorm warning for Supaul district. Stay indoors and secure your livestock.',
    sent_at: new Date(Date.now() - 3600000).toISOString(),
    severity: 'High',
    pincode: '847215',
  },
  {
    alert_id: 'alert-003',
    registration_id: 'reg-002',
    alert_type: 'Flood',
    alert_message: 'Flood alert: Water levels rising in Kosi river. Move to higher ground if necessary.',
    sent_at: new Date(Date.now() - 7200000).toISOString(),
    severity: 'Critical',
    pincode: '847215',
  },
];

// GET: Fetch alerts and registrations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'registrations' | 'alerts' | 'all'
    const pincode = searchParams.get('pincode');
    const userId = searchParams.get('userId');

    let registrations = [...DUMMY_REGISTRATIONS];
    let alerts = [...DUMMY_ALERTS];

    // Filter by pincode
    if (pincode) {
      registrations = registrations.filter(r => r.pincode === pincode);
      alerts = alerts.filter(a => a.pincode === pincode);
    }

    // Filter by userId
    if (userId) {
      registrations = registrations.filter(r => r.user_id === userId);
      const userRegIds = registrations.map(r => r.registration_id);
      alerts = alerts.filter(a => userRegIds.includes(a.registration_id));
    }

    if (type === 'registrations') {
      return NextResponse.json({ success: true, data: registrations });
    }

    if (type === 'alerts') {
      return NextResponse.json({ success: true, data: alerts });
    }

    // Return all
    return NextResponse.json({
      success: true,
      data: {
        registrations,
        alerts,
        summary: {
          totalRegistrations: registrations.length,
          activeAlerts: alerts.length,
          criticalAlerts: alerts.filter(a => a.severity === 'Critical').length,
        },
      },
    });
  } catch (error) {
    console.error('Weather alerts API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather alerts' },
      { status: 500 }
    );
  }
}

// POST: Register for weather alerts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, pincode, address, occupation, registerFor, relation } = body;

    // Validate required fields
    if (!name || !phone || !pincode) {
      return NextResponse.json(
        { success: false, error: 'Name, phone, and pincode are required' },
        { status: 400 }
      );
    }

    // Create new registration (In production, save to DB)
    const newRegistration: WeatherAlertRegistration = {
      registration_id: `reg-${Date.now()}`,
      user_id: `user-${Date.now()}`, // In production, get from auth
      farmer_name: name,
      mobile_number: phone,
      pincode,
      address: address || undefined,
      occupation: occupation || 'Farmer',
      register_for: registerFor === 'other' ? 'Other' : 'Self',
      relation: relation || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'Active',
    };

    // In production: Save to database
    // await db.insert(weatherAlertRegistrations).values(newRegistration);

    return NextResponse.json({
      success: true,
      message: 'Successfully registered for weather alerts',
      data: newRegistration,
    });
  } catch (error) {
    console.error('Weather alert registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register for weather alerts' },
      { status: 500 }
    );
  }
}
