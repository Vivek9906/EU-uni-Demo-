import type { Metadata } from 'next';
import { AuthProvider } from '@/components/providers/AuthProvider';

import './admin-globals.css';

export const metadata: Metadata = {
  title: 'Admin Portal',
  description: 'Login to EU American University Admin Portal',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen admin-mode flex flex-col">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
