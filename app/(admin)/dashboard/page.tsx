export const dynamic = 'force-dynamic';

import prisma from '@/lib/db';
import { FileText, Award, MessageSquare, Users } from 'lucide-react';

export default async function DashboardOverviewPage() {
  const [
    totalApplications,
    pendingApplications,
    totalCertificates,
    totalInquiries,
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: 'Pending' } }),
    prisma.certificate.count(),
    prisma.contactInquiry.count({ where: { status: 'New' } }),
  ]);

  const recentApplications = await prisma.application.findMany({
    take: 5,
    orderBy: { submittedAt: 'desc' },
    select: { id: true, fullName: true, programName: true, status: true, submittedAt: true, referenceNumber: true },
  });

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-secondary">Total Applications</p>
            <p className="text-2xl font-heading font-bold text-foreground">{totalApplications}</p>
          </div>
        </div>
        <div className="card p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-secondary">Pending Review</p>
            <p className="text-2xl font-heading font-bold text-foreground">{pendingApplications}</p>
          </div>
        </div>
        <div className="card p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-secondary">Certificates Issued</p>
            <p className="text-2xl font-heading font-bold text-foreground">{totalCertificates}</p>
          </div>
        </div>
        <div className="card p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-secondary">New Inquiries</p>
            <p className="text-2xl font-heading font-bold text-foreground">{totalInquiries}</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="font-heading text-lg font-bold">Recent Applications</h2>
          <a href="/dashboard/applications" className="text-sm text-primary font-medium hover:underline">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-subtle text-foreground-muted font-medium uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Program</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-background-subtle/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{app.referenceNumber}</td>
                  <td className="px-6 py-4 font-medium">{app.fullName}</td>
                  <td className="px-6 py-4 text-foreground-secondary">{app.programName}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${app.status === 'Pending' ? 'bg-accent/10 text-accent' : 
                        app.status === 'Approved' ? 'bg-success/10 text-success' : 
                        app.status === 'Rejected' ? 'bg-error/10 text-error' : 'bg-gray-100 text-gray-700'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground-secondary">
                    {app.submittedAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentApplications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-foreground-muted">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
