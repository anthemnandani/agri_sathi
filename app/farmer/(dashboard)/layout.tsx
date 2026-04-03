import { FarmerLayout } from '@/components/layouts/FarmerLayout';
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <FarmerLayout>{children}</FarmerLayout>;
}
