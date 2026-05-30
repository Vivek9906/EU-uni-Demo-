'use client';

import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  GraduationCap, 
  Award, 
  Medal, 
  Newspaper, 
  Calendar, 
  Bell, 
  Image as ImageIcon, 
  Key, 
  Scale, 
  Settings, 
  ClipboardList,
  LogOut
} from 'lucide-react';
import { cn } from './ui/Button';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    label: 'People',
    items: [
      { href: '/dashboard/students', label: 'Students', icon: Users },
      { href: '/dashboard/applications', label: 'Applications', icon: FileText, badge: 'new' },
      { href: '/dashboard/inquiries', label: 'Inquiries', icon: MessageSquare, badge: 'new' },
    ]
  },
  {
    label: 'Academics',
    items: [
      { href: '/dashboard/programs', label: 'Programs', icon: GraduationCap },
      { href: '/dashboard/certifications', label: 'Certifications', icon: Award },
      { href: '/dashboard/certificates', label: 'Certificates', icon: Medal },
    ]
  },
  {
    label: 'Content',
    items: [
      { href: '/dashboard/news', label: 'News & Media', icon: Newspaper },
      { href: '/dashboard/events', label: 'Events', icon: Calendar },
      { href: '/dashboard/notices', label: 'Notices', icon: Bell },
      { href: '/dashboard/gallery', label: 'Gallery', icon: ImageIcon },
      { href: '/dashboard/testimonials', label: 'Testimonials', icon: MessageSquare },
    ]
  },
  {
    label: 'System',
    items: [
      { href: '/dashboard/team', label: 'Admin Team', icon: Key },
      { href: '/dashboard/legal', label: 'Legal Pages', icon: Scale },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
      { href: '/dashboard/audit-log', label: 'Audit Log', icon: ClipboardList },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-zinc-950 border-r border-zinc-800 overflow-y-auto">
      {/* Logo block */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-zinc-800/50">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E09900] text-zinc-950 font-bold text-sm">
            EU
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-white">EU AMERICAN</span>
            <span className="text-[10px] font-medium tracking-widest text-zinc-400">ADMIN PORTAL</span>
          </div>
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 space-y-6 px-3 py-6 overflow-y-auto custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              {group.label}
            </h4>
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-zinc-800/80 text-white" 
                      : "text-zinc-400 hover:bg-zinc-900/80 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-[#E09900]" : "text-zinc-500 group-hover:text-zinc-300"
                    )} />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-[#E09900]/20 px-2 py-0.5 text-[10px] font-bold text-[#E09900] uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User info + sign out */}
      <div className="mt-auto shrink-0 border-t border-zinc-800/50 p-4">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-medium text-white border border-zinc-700">
            {session?.user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-medium text-white">
              {session?.user?.name ?? 'Admin User'}
            </span>
            <span className="truncate text-xs text-zinc-500">
              {(session?.user as any)?.role ?? 'Administrator'}
            </span>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
