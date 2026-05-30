'use client';

import Link from 'next/link';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Bell, 
  ArrowRight,
  TrendingUp,
  FileSignature,
  Mail,
  MailOpen
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';

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
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome back, {adminName} 👋
        </h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-[#1B3A6B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              +{stats.newApplicationsToday} today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Students</CardTitle>
            <Users className="h-4 w-4 text-[#E09900]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.totalStudents.toLocaleString()} total enrolled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unread Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadInquiries.toLocaleString()}</div>
            <p className={cn("text-xs font-medium mt-1", stats.unreadInquiries > 0 ? "text-red-600" : "text-gray-500")}>
              {stats.totalInquiries.toLocaleString()} total inquiries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subscribers</CardTitle>
            <Bell className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.upcomingEvents} upcoming events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 lg:col-span-5">
          <CardHeader>
            <CardTitle>Application Trend</CardTitle>
            <CardDescription>Applications received over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationBarChart data={applicationsByMonth} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
            <CardDescription>Current application distribution</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <StatusDonutChart 
              pending={stats.pendingApplications} 
              accepted={stats.acceptedApplications} 
              total={stats.totalApplications} 
            />
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest submitted applications</CardDescription>
            </div>
            <Link href="/dashboard/applications" className="text-sm text-[#E09900] hover:underline font-medium">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-4">No applications yet.</div>
              ) : (
                recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{app.fullName}</p>
                      <p className="text-xs text-gray-500">{app.programName}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={app.status === 'accepted' ? 'success' : app.status === 'pending' ? 'warning' : app.status === 'rejected' ? 'danger' : 'secondary'}>
                        {app.status}
                      </Badge>
                      <span className="text-[10px] text-gray-400">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Latest contact messages</CardDescription>
            </div>
            <Link href="/dashboard/inquiries" className="text-sm text-[#E09900] hover:underline font-medium">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-4">No inquiries yet.</div>
              ) : (
                recentInquiries.map((inq) => (
                  <div key={inq.id} className="flex items-center gap-4 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", inq.status === 'unread' ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500")}>
                      {inq.status === 'unread' ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <p className={cn("text-sm truncate", inq.status === 'unread' ? "font-bold text-gray-900" : "font-medium text-gray-700")}>
                        {inq.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{inq.subject}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {new Date(inq.receivedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ApplicationBarChart({ data }: { data: MonthlyData[] }) {
  if (!data || data.length === 0) {
    return <div className="h-[200px] flex items-center justify-center text-sm text-gray-500">No data available</div>;
  }
  const max = Math.max(...data.map((d) => Number(d.count)), 1);
  
  return (
    <div className="flex h-[200px] items-end gap-2 pt-6">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2 group">
          <span className="text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
            {Number(d.count)}
          </span>
          <div
            className="w-full bg-[#1B3A6B] rounded-t-sm min-h-[4px] transition-all duration-500 group-hover:bg-[#E09900]"
            style={{ height: `${(Number(d.count) / max) * 100}%` }}
          />
          <span className="text-xs text-gray-400">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function StatusDonutChart({ pending, accepted, total }: { pending: number; accepted: number; total: number }) {
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
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg width={140} height={140} viewBox="0 0 120 120" className="-rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#F3F4F6" strokeWidth="12" />
          {segments.map((seg, i) => {
            if (seg.value === 0) return null;
            const dash = (seg.value / 100) * circ;
            const el = (
              <circle
                key={i}
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="12"
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{total}</span>
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Total</span>
        </div>
      </div>
      <div className="flex gap-4">
        {segments.map((seg) => (
          <div key={seg.label} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: seg.color }} />
              <span className="text-xs text-gray-500">{seg.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{seg.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
