'use client'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { href: '/dashboard',           label: 'Dashboard',      icon: '▤' },
    ]
  },
  {
    label: 'PEOPLE',
    items: [
      { href: '/dashboard/students',       label: 'Students',       icon: '👤' },
      { href: '/dashboard/applications',   label: 'Applications',   icon: '📋', badge: 'new' },
      { href: '/dashboard/inquiries',      label: 'Inquiries',      icon: '💬', badge: 'new' },
    ]
  },
  {
    label: 'ACADEMICS',
    items: [
      { href: '/dashboard/programs',       label: 'Programs',       icon: '🎓' },
      { href: '/dashboard/certifications', label: 'Certifications', icon: '📜' },
      { href: '/dashboard/certificates',   label: 'Certificates',   icon: '🏅' },
    ]
  },
  {
    label: 'CONTENT',
    items: [
      { href: '/dashboard/news',           label: 'News & Media',   icon: '📰' },
      { href: '/dashboard/events',         label: 'Events',         icon: '📅' },
      { href: '/dashboard/notices',        label: 'Notices',        icon: '🔔' },
      { href: '/dashboard/gallery',        label: 'Gallery',        icon: '🖼️' },
      { href: '/dashboard/testimonials',   label: 'Testimonials',   icon: '💬' },
      { href: '/dashboard/scholarships',   label: 'Scholarships',   icon: '💰' },
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { href: '/dashboard/team',           label: 'Admin Team',     icon: '🔑' },
      { href: '/dashboard/legal',          label: 'Legal Pages',    icon: '⚖️' },
      { href: '/dashboard/settings',       label: 'Settings',       icon: '⚙️' },
      { href: '/dashboard/audit-log',      label: 'Audit Log',      icon: '📋' },
    ]
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside style={{
      width: 'var(--admin-sidebar-width)',
      background: 'var(--admin-sidebar-bg)',
      height: '100vh',
      position: 'fixed',
      left: 0, top: 0,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      zIndex: 50,
      borderRight: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Logo block */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: '#E09900',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 14, color: '#111'
          }}>EU</div>
          <div>
            <div style={{ color: '#FFF', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>EU AMERICAN</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.08em' }}>ADMIN PORTAL</div>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {navGroups.map(group => (
          <div key={group.label} style={{ marginBottom: 8 }}>
            <div style={{
              padding: '8px 16px 4px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase'
            }}>
              {group.label}
            </div>
            {group.items.map(item => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 16px',
                    margin: '1px 8px',
                    borderRadius: 6,
                    color: isActive ? '#E09900' : 'rgba(255,255,255,0.65)',
                    background: isActive ? 'rgba(224,153,0,0.12)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 13.5,
                    textDecoration: 'none',
                    transition: 'var(--admin-transition)',
                  }}
                >
                  <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={{
                    background: '#E09900', color: '#111',
                    fontSize: 10, fontWeight: 700,
                    padding: '2px 6px', borderRadius: 10
                  }}>NEW</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User info + sign out */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: '#E09900',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 13, color: '#111'
          }}>
            {session?.user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div>
            <div style={{ color: '#FFF', fontSize: 12, fontWeight: 600 }}>{session?.user?.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{(session?.user as any)?.role}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          style={{
            width: '100%',
            padding: '7px 12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6,
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          ← Sign Out
        </button>
      </div>
    </aside>
  )
}
