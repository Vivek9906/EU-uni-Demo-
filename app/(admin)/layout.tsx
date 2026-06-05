import type { Metadata } from 'next';
import { AuthProvider } from '@/components/providers/AuthProvider';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
