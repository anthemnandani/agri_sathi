import { NextRequest, NextResponse } from 'next/server';

interface SMSAlertRequest {
  name: string;
  phone: string;
  pincode: string;
  address: string;
  occupation: string;
  registerFor: 'self' | 'family' | 'community';
}

export async function POST(request: NextRequest) {
  try {
    const body: SMSAlertRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.pincode || !body.address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(body.phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // TODO: In production, this would:
    // 1. Save the registration to the database
    // 2. Send an SMS confirmation
    // 3. Set up weather alert subscriptions
    // 4. Log the registration event

    console.log('SMS Alert Registration:', {
      name: body.name,
      phone: body.phone,
      pincode: body.pincode,
      location: body.address,
      occupation: body.occupation,
      registerFor: body.registerFor,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'SMS alert registration successful',
        data: {
          phone: body.phone,
          registeredAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('SMS Alert Registration Error:', error);
    return NextResponse.json(
      { error: 'Failed to register for SMS alerts' },
      { status: 500 }
    );
  }
}
