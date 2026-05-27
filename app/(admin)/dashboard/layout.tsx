import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { LogOut, LayoutDashboard, FileText, Award, Users, Bell, MessageSquare, HelpCircle, FileImage, Settings, Building2 } from 'lucide-react';
import LogoutButton from './LogoutButton';

const sidebarLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/applications', label: 'Applications', icon: FileText },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { href: '/dashboard/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/dashboard/notices', label: 'Notices', icon: Bell },
  { href: '/dashboard/news', label: 'News & Media', icon: FileImage },
  { href: '/dashboard/events', label: 'Events', icon: Building2 },
  { href: '/dashboard/faculty', label: 'Faculty', icon: Users },
  { href: '/dashboard/faq', label: 'FAQ', icon: HelpCircle },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-subtle">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <span className="font-heading font-bold text-lg">AMU Admin</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
              {session.user?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{session.user?.name}</p>
              <p className="text-xs text-white/50 truncate">{session.user?.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 shrink-0">
          <h1 className="font-heading text-lg font-bold">Dashboard</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
