export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardClient } from './DashboardClient';
import { AdminPageSkeleton } from '@/components/admin/AdminPageSkeleton';

function getMonthLabel(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short' });
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getMonthsAgo(months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function getApplicationsByMonth() {
  const sixMonthsAgo = getMonthsAgo(6);
  const applications = await prisma.application.findMany({
    where: { submittedAt: { gte: sixMonthsAgo } },
    select: { submittedAt: true },
    orderBy: { submittedAt: 'asc' },
  });

  // Group by month
  const monthCounts = new Map<string, number>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const label = getMonthLabel(d);
    monthCounts.set(label, 0);
  }

  for (const app of applications) {
    const label = getMonthLabel(new Date(app.submittedAt));
    if (monthCounts.has(label)) {
      monthCounts.set(label, (monthCounts.get(label) || 0) + 1);
    }
  }

  return Array.from(monthCounts.entries()).map(([month, count]) => ({
    month,
    count,
  }));
}

async function DashboardData() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const today = startOfDay(new Date());

  // Fetch all stats in parallel
  const [
    totalApplications,
    newApplicationsToday,
    pendingApplications,
    acceptedApplications,
    totalStudents,
    activeStudents,
    totalInquiries,
    unreadInquiries,
    activeNotices,
    publishedNews,
    upcomingEvents,
    totalSubscribers,
    totalCertificates,
    recentApplications,
    recentInquiries,
    applicationsByMonth,
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { submittedAt: { gte: today } } }),
    prisma.application.count({ where: { status: 'pending' } }),
    prisma.application.count({ where: { status: 'accepted' } }),
    prisma.student.count(),
    prisma.student.count({ where: { status: 'enrolled' } }),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { status: 'unread' } }),
    prisma.notice.count({ where: { isActive: true } }),
    prisma.news.count({ where: { isPublished: true } }),
    prisma.event.count({ where: { date: { gte: new Date() }, isPublished: true } }),
    prisma.subscriber.count({ where: { isActive: true } }),
    prisma.certificate.count(),
    prisma.application.findMany({
      take: 5,
      orderBy: { submittedAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        programName: true,
        status: true,
        submittedAt: true,
        referenceNumber: true,
      },
    }),
    prisma.contactInquiry.findMany({
      take: 5,
      orderBy: { receivedAt: 'desc' },
      select: {
        id: true,
        name: true,
        subject: true,
        status: true,
        receivedAt: true,
      },
    }),
    getApplicationsByMonth(),
  ]);

  const adminName = session.user.name || 'Admin';

  return (
    <DashboardClient
      stats={{
        totalApplications,
        newApplicationsToday,
        pendingApplications,
        acceptedApplications,
        totalStudents,
        activeStudents,
        totalInquiries,
        unreadInquiries,
        activeNotices,
        publishedNews,
        upcomingEvents,
        totalSubscribers,
        totalCertificates,
      }}
      recentApplications={recentApplications.map((app) => ({
        ...app,
        submittedAt: app.submittedAt.toISOString(),
      }))}
      recentInquiries={recentInquiries.map((inq) => ({
        ...inq,
        receivedAt: inq.receivedAt.toISOString(),
      }))}
      applicationsByMonth={applicationsByMonth}
      adminName={adminName}
    />
  );
}

export default function DashboardOverviewPage() {
  return (
    <Suspense fallback={<AdminPageSkeleton />}>
      <DashboardData />
    </Suspense>
  );
}
