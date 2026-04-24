import React from 'react';
import { SMSAlertRegistration } from '@/components/farmer/weather/SMSAlertRegistration';

export const metadata = {
  title: 'SMS Alert Registration - AgriSathi',
  description: 'Register for weather alerts via SMS',
};

export default function SMSAlertRegistrationPage() {
  return <SMSAlertRegistration />;
}
