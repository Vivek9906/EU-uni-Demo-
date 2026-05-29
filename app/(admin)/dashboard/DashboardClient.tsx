'use client';

import Link from 'next/link';

interface DashboardStats {
  totalApplications: number;
  newApplicationsToday: number;
  pendingApplications: number;
  acceptedApplications: number;
  totalStudents: number;
  activeStudents: number;
  totalInquiries: number;
  unreadInquiries: number;
  activeNotices: number;
  publishedNews: number;
  upcomingEvents: number;
  totalSubscribers: number;
  totalCertificates: number;
}

interface RecentApplication {
  id: string;
  fullName: string;
  programName: string;
  status: string;
  submittedAt: string;
  referenceNumber: string;
}

interface RecentInquiry {
  id: string;
  name: string;
  subject: string;
  status: string;
  receivedAt: string;
}

interface MonthlyData {
  month: string;
  count: number;
}

interface DashboardClientProps {
  stats: DashboardStats;
  recentApplications: RecentApplication[];
  recentInquiries: RecentInquiry[];
  applicationsByMonth: MonthlyData[];
  adminName: string;
}

export function DashboardClient({
  stats,
  recentApplications,
  recentInquiries,
  applicationsByMonth,
  adminName,
}: DashboardClientProps) {
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400 }}>
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#111827',
              margin: 0,
            }}
          >
            Welcome back, {adminName} 👋
          </h1>
          <p style={{ color: '#6B7280', fontSize: 13.5, margin: '4px 0 0' }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard
          icon="📋"
          title="Total Applications"
          value={stats.totalApplications}
          sub={`+${stats.newApplicationsToday} today`}
          subColor="#059669"
          href="/dashboard/applications"
          accent="#1B3A6B"
        />
        <StatCard
          icon="🎓"
          title="Active Students"
          value={stats.activeStudents}
          sub={`${stats.totalStudents} total enrolled`}
          href="/dashboard/students"
          accent="#E09900"
        />
        <StatCard
          icon="💬"
          title="Unread Messages"
          value={stats.unreadInquiries}
          sub={`${stats.totalInquiries} total inquiries`}
          subColor={stats.unreadInquiries > 0 ? '#DC2626' : '#6B7280'}
          href="/dashboard/inquiries"
          accent="#7C3AED"
        />
        <StatCard
          icon="📧"
          title="Subscribers"
          value={stats.totalSubscribers}
          sub={`${stats.upcomingEvents} upcoming events`}
          href="/dashboard/events"
          accent="#0891B2"
        />
      </div>

      {/* Charts row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Application Trend — Bar Chart */}
        <div
          style={{
            background: '#FFF',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            padding: '20px 24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <div>
              <h3
                style={{
                  fontWeight: 700,
                  color: '#111827',
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Application Trend
              </h3>
              <p style={{ color: '#6B7280', fontSize: 12, margin: '3px 0 0' }}>
                Last 6 months
              </p>
            </div>
          </div>
          <ApplicationBarChart data={applicationsByMonth} />
        </div>

        {/* Application Status Donut */}
        <div
          style={{
            background: '#FFF',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            padding: '20px 24px',
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              color: '#111827',
              fontSize: 15,
              margin: '0 0 16px',
            }}
          >
            Application Status
          </h3>
          <StatusDonutChart
            pending={stats.pendingApplications}
            accepted={stats.acceptedApplications}
            total={stats.totalApplications}
          />
        </div>
      </div>

      {/* Recent Applications Table */}
      <div
        style={{
          background: '#FFF',
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #F3F4F6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ fontWeight: 700, color: '#111827', fontSize: 15, margin: 0 }}>
            Recent Applications
          </h3>
          <Link
            href="/dashboard/applications"
            style={{
              fontSize: 13,
              color: '#E09900',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            View All →
          </Link>
        </div>
        <RecentApplicationsTable applications={recentApplications} />
      </div>

      {/* Bottom row: Inbox + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Inbox preview */}
        <div
          style={{
            background: '#FFF',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
          }}
        >
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #F3F4F6',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h3 style={{ fontWeight: 700, color: '#111827', fontSize: 15, margin: 0 }}>
              Recent Inquiries
            </h3>
            <Link
              href="/dashboard/inquiries"
              style={{
                fontSize: 13,
                color: '#E09900',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View All →
            </Link>
          </div>
          <InboxPreview inquiries={recentInquiries} />
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: '#FFF',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            padding: '20px 24px',
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              color: '#111827',
              fontSize: 15,
              margin: '0 0 16px',
            }}
          >
            Quick Actions
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}
          >
            {[
              { icon: '📋', label: 'Add Notice', href: '/dashboard/notices', color: '#EFF6FF' },
              { icon: '📰', label: 'Write News', href: '/dashboard/news', color: '#F0FDF4' },
              { icon: '📅', label: 'Create Event', href: '/dashboard/events', color: '#FFF7ED' },
              { icon: '👤', label: 'Add Student', href: '/dashboard/students', color: '#FDF4FF' },
              { icon: '🎓', label: 'Issue Certificate', href: '/dashboard/certificates', color: '#FFFBEB' },
              { icon: '💬', label: 'View Inquiries', href: '/dashboard/inquiries', color: '#FEF2F2' },
            ].map((action) => (
              <Link
                key={action.href + action.label}
                href={action.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  background: action.color,
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: '#374151',
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <span style={{ fontSize: 18 }}>{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── StatCard ─── */
function StatCard({
  icon,
  title,
  value,
  sub,
  subColor = '#6B7280',
  href,
  accent,
}: {
  icon: string;
  title: string;
  value: number;
  sub: string;
  subColor?: string;
  href: string;
  accent: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#FFF',
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          padding: '20px 24px',
          borderTop: `3px solid ${accent}`,
          transition: 'box-shadow 0.15s, transform 0.15s',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <p
              style={{
                color: '#6B7280',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '0 0 8px',
              }}
            >
              {title}
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#111827',
                margin: 0,
                lineHeight: 1,
              }}
            >
              {value.toLocaleString()}
            </p>
            {sub && (
              <p
                style={{
                  color: subColor,
                  fontSize: 12,
                  margin: '6px 0 0',
                  fontWeight: 500,
                }}
              >
                {sub}
              </p>
            )}
          </div>
          <span style={{ fontSize: 26, opacity: 0.75 }}>{icon}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── ApplicationBarChart — pure CSS bars ─── */
function ApplicationBarChart({ data }: { data: MonthlyData[] }) {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          height: 140,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9CA3AF',
          fontSize: 13,
        }}
      >
        No data available
      </div>
    );
  }

  const max = Math.max(...data.map((d) => Number(d.count)), 1);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 12,
        height: 140,
        padding: '0 4px',
      }}
    >
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ fontSize: 11, color: '#374151', fontWeight: 600 }}>
            {Number(d.count)}
          </span>
          <div
            style={{
              width: '100%',
              height: `${(Number(d.count) / max) * 100}px`,
              background: 'linear-gradient(to top, #1B3A6B, #2C5282)',
              borderRadius: '4px 4px 0 0',
              minHeight: 4,
              transition: 'height 0.6s ease',
            }}
          />
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>{d.month}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── StatusDonutChart — SVG donut ─── */
function StatusDonutChart({
  pending,
  accepted,
  total,
}: {
  pending: number;
  accepted: number;
  total: number;
}) {
  const rejected = Math.max(0, total - pending - accepted);
  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0);

  const segments = [
    { value: pct(pending), color: '#E09900', label: 'Pending', count: pending },
    { value: pct(accepted), color: '#059669', label: 'Accepted', count: accepted },
    { value: pct(rejected), color: '#DC2626', label: 'Rejected', count: rejected },
  ];

  const r = 50;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width={120} height={120} viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#F3F4F6" strokeWidth="18" />
        {segments.map((seg, i) => {
          const dash = (seg.value / 100) * circ;
          const element = (
            <circle
              key={i}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              transform="rotate(-90 60 60)"
            />
          );
          offset += dash;
          return element;
        })}
        <text x="60" y="64" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111827">
          {total}
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map((seg) => (
          <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: seg.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, color: '#374151' }}>{seg.label}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#111827',
                marginLeft: 'auto',
              }}
            >
              {seg.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── RecentApplicationsTable ─── */
function RecentApplicationsTable({
  applications,
}: {
  applications: RecentApplication[];
}) {
  const statusColor: Record<string, { bg: string; text: string }> = {
    pending: { bg: '#FFF7ED', text: '#D97706' },
    reviewing: { bg: '#EFF6FF', text: '#2563EB' },
    accepted: { bg: '#F0FDF4', text: '#059669' },
    rejected: { bg: '#FEF2F2', text: '#DC2626' },
  };

  if (applications.length === 0) {
    return (
      <div style={{ padding: '32px 24px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>
        No applications yet.
      </div>
    );
  }

  return (
    <table style={{ width: '100%', fontSize: 13, textAlign: 'left', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
          <th style={{ padding: '10px 24px', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Reference</th>
          <th style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Applicant</th>
          <th style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Program</th>
          <th style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</th>
          <th style={{ padding: '10px 24px', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Date</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => {
          const sc = statusColor[app.status.toLowerCase()] || { bg: '#F3F4F6', text: '#374151' };
          return (
            <tr key={app.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '12px 24px', fontFamily: 'monospace', fontSize: 12, color: '#6B7280' }}>{app.referenceNumber}</td>
              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>{app.fullName}</td>
              <td style={{ padding: '12px 16px', color: '#6B7280' }}>{app.programName}</td>
              <td style={{ padding: '12px 16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    background: sc.bg,
                    color: sc.text,
                    textTransform: 'capitalize',
                  }}
                >
                  {app.status}
                </span>
              </td>
              <td style={{ padding: '12px 24px', color: '#6B7280', fontSize: 12 }}>
                {new Date(app.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ─── InboxPreview ─── */
function InboxPreview({ inquiries }: { inquiries: RecentInquiry[] }) {
  if (inquiries.length === 0) {
    return (
      <div style={{ padding: '32px 24px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>
        No inquiries yet.
      </div>
    );
  }

  return (
    <div>
      {inquiries.map((inq) => (
        <div
          key={inq.id}
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: inq.status === 'unread' ? '#EFF6FF' : '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {inq.status === 'unread' ? '📩' : '📧'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: inq.status === 'unread' ? 700 : 500,
                color: '#111827',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {inq.name}
            </p>
            <p
              style={{
                fontSize: 12,
                color: '#6B7280',
                margin: '2px 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {inq.subject}
            </p>
          </div>
          <span style={{ fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap' }}>
            {new Date(inq.receivedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      ))}
    </div>
  );
}
