'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [page, statusFilter]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const url = new URL('/api/applications', window.location.origin);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('limit', '10');
      if (statusFilter) url.searchParams.set('status', statusFilter);

      const res = await fetch(url.toString());
      const data = await res.json();
      setApplications(data.applications || []);
      setTotal(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-heading font-bold">Applications</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="input-field pl-9 py-2 text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-subtle text-foreground-muted font-medium uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Program</th>
                <th className="px-6 py-3">Level</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-foreground-muted">Loading applications...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-foreground-muted">No applications found matching the criteria.</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-background-subtle/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{app.referenceNumber}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{app.fullName}</div>
                      <div className="text-xs text-foreground-muted">{app.email}</div>
                    </td>
                    <td className="px-6 py-4 text-foreground-secondary">{app.programName}</td>
                    <td className="px-6 py-4 text-foreground-secondary">{app.programLevel}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${app.status === 'Pending' ? 'bg-accent/10 text-accent' : 
                          app.status === 'Approved' ? 'bg-success/10 text-success' : 
                          app.status === 'Rejected' ? 'bg-error/10 text-error' : 'bg-gray-100 text-gray-700'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground-secondary whitespace-nowrap">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/applications/${app.id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-light font-medium text-sm">
                        <Eye size={16} /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {total > 1 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-foreground-muted">Page {page} of {total}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-md border border-border hover:bg-background-subtle disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(total, p + 1))}
                disabled={page === total}
                className="p-2 rounded-md border border-border hover:bg-background-subtle disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
