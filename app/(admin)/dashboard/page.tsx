import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  // Fetch stats safely
  const [
    totalApplications, pendingApplications,
    totalStudents,
    unreadInquiries,
    recentApplications,
    recentInquiries,
  ] = await Promise.all([
    prisma.application.count().catch(() => 0),
    prisma.application.count({ where: { status: 'pending' } }).catch(() => 0),
    prisma.student.count().catch(() => 0),
    prisma.contactInquiry.count({ where: { status: 'unread' } }).catch(() => 0),
    prisma.application.findMany({
      take: 5, orderBy: { submittedAt: 'desc' },
      select: { id: true, fullName: true, programName: true, status: true, submittedAt: true },
    }).catch(() => []),
    prisma.contactInquiry.findMany({
      take: 5, orderBy: { receivedAt: 'desc' },
      select: { id: true, name: true, subject: true, status: true, receivedAt: true },
    }).catch(() => []),
  ])

  const quickActions = [
    { href: '/dashboard/news/new',           label: 'Add News',        color: 'bg-blue-50 text-blue-700 hover:bg-blue-100', icon: '📰' },
    { href: '/dashboard/events/new',         label: 'Add Event',       color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100', icon: '📅' },
    { href: '/dashboard/notices/new',        label: 'Add Notice',      color: 'bg-orange-50 text-orange-700 hover:bg-orange-100', icon: '🔔' },
    { href: '/dashboard/programs/new',       label: 'Add Program',     color: 'bg-purple-50 text-purple-700 hover:bg-purple-100', icon: '🎓' },
    { href: '/dashboard/students/new',       label: 'Add Student',     color: 'bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100', icon: '👤' },
    { href: '/dashboard/certificates/new',   label: 'Issue Certificate', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100', icon: '🏅' },
  ]

  const stats = [
    { label: 'Total Applications', value: totalApplications, sub: `${pendingApplications} pending`, icon: '📋', href: '/dashboard/applications' },
    { label: 'Enrolled Students',  value: totalStudents,      sub: 'total active',                       icon: '🎓', href: '/dashboard/students' },
    { label: 'Unread Inquiries',   value: unreadInquiries,    sub: 'needs response',                  icon: '💬', href: '/dashboard/inquiries' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Welcome back, {session.user.name} 👋
        </h1>
        <p className="text-sm font-medium text-slate-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(s => (
          <Link key={s.href} href={s.href} className="group block">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex justify-between items-start transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-amber-500/30 group-hover:ring-2 ring-amber-500/20 ring-offset-2">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-4xl font-black text-slate-900 mb-1">{s.value}</p>
                <p className="text-xs font-medium text-slate-400">{s.sub}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                {s.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map(a => (
            <Link key={a.href} href={a.href} className="block group">
              <div className={`p-4 rounded-xl flex items-center gap-3 font-semibold text-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md ${a.color}`}>
                <span className="text-xl group-hover:scale-110 transition-transform">{a.icon}</span>
                {a.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Recent Applications</h3>
            <Link href="/dashboard/applications" className="text-xs font-bold text-amber-600 hover:text-amber-700">View All →</Link>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {recentApplications.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">No applications yet</div>
            ) : recentApplications.map(a => (
              <Link key={a.id} href={`/dashboard/applications/${a.id}`} className="block hover:bg-slate-50 transition-colors">
                <div className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm text-slate-900 mb-0.5">{a.fullName}</p>
                    <p className="text-xs font-medium text-slate-500">{a.programName}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${a.status === 'pending' ? 'bg-amber-100 text-amber-800' : a.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {a.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Recent Inquiries</h3>
            <Link href="/dashboard/inquiries" className="text-xs font-bold text-amber-600 hover:text-amber-700">View All →</Link>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {recentInquiries.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">No inquiries yet</div>
            ) : recentInquiries.map(i => (
              <div key={i.id} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-bold text-sm text-slate-900 mb-0.5">{i.name}</p>
                  <p className="text-xs font-medium text-slate-500">{i.subject}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                  ${i.status === 'unread' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
                  {i.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
