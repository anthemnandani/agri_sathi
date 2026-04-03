import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/layouts/AdminLayout';

export const metadata: Metadata = {
  title: 'AgriSathi Admin Panel',
  description: 'Platform management and analytics dashboard',
};

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
