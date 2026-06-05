// components/admin/AdminSidebar.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { UniversityLogo } from '@/components/ui/UniversityLogo'

// FLAT LIST — no categories, all items at one level
const NAV_ITEMS = [
  { href: '/dashboard',               label: 'Dashboard',      icon: '▤', exact: true },
  { href: '/dashboard/applications',  label: 'Applications',   icon: '📋' },
  { href: '/dashboard/inquiries',     label: 'Inquiries',      icon: '💬' },
  { href: '/dashboard/students',      label: 'Students',       icon: '👤' },
  { href: '/dashboard/programs',      label: 'Programs',       icon: '🎓' },
  { href: '/dashboard/certifications',label: 'Certifications', icon: '📜' },
  { href: '/dashboard/certificates',  label: 'Certificates',   icon: '🏅' },
  { href: '/dashboard/news',          label: 'News & Media',   icon: '📰' },
  { href: '/dashboard/events',        label: 'Events',         icon: '📅' },
  { href: '/dashboard/notices',       label: 'Notices',        icon: '🔔' },
  { href: '/dashboard/testimonials',  label: 'Testimonials',   icon: '⭐' },
  { href: '/dashboard/faq',           label: 'FAQ',            icon: '❓' },
  { href: '/dashboard/partners',              label: 'Global Partners',  icon: '🤝' },
  { href: '/dashboard/partner-applications', label: 'Partner Requests', icon: '📬' },
  { href: '/dashboard/settings',      label: 'Settings',       icon: '⚙️' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  return (
    <aside className="fixed left-0 top-0 w-[240px] h-screen bg-slate-900 flex flex-col z-50 overflow-y-auto no-scrollbar border-r border-slate-800">
      {/* Logo — uses the website logo */}
      <div className="p-4 border-b border-white/5 shrink-0">
        <UniversityLogo variant="light" href="/dashboard" />
      </div>

      {/* Navigation — flat list */}
      <nav className="flex-1 py-3 overflow-y-auto no-scrollbar px-3">
        <div className="space-y-0.5">
          {NAV_ITEMS.map(item => {
            const active = isActive(item.href, item.exact ?? false)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all duration-200 group ${
                  active 
                    ? 'bg-amber-500/10 text-amber-500 font-semibold shadow-inner' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <span className={`text-base w-5 text-center transition-transform duration-200 group-hover:scale-110 shrink-0 ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User + Sign Out */}
      <div className="p-4 border-t border-white/5 shrink-0 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-black text-slate-900 text-xs shrink-0 shadow-inner">
            {session?.user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="min-w-0">
            <div className="text-slate-50 text-[13px] font-bold truncate">
              {session?.user?.name ?? 'Admin'}
            </div>
            <div className="text-white/40 text-[10px] uppercase tracking-wider font-medium">
              {(session?.user as any)?.role ?? 'Administrator'}
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-lg text-white/50 hover:text-red-400 text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
