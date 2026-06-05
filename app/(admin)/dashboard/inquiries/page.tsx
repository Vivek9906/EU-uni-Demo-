'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Loader2, Mail, CheckCircle, Clock } from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error('Failed to fetch inquiries', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/inquiries`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      fetchInquiries();
    } catch (e) { console.error(e); }
  };

  if (isLoading) return <div className="p-12 text-center text-slate-500"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Mail className="text-amber-500" /> Contact Inquiries
        </h1>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">No inquiries yet.</div>
        ) : inquiries.map((inq) => (
          <div key={inq.id} className={`bg-white rounded-xl border p-6 transition-colors shadow-sm ${inq.status === 'New' || inq.status === 'unread' ? 'border-amber-500/30 bg-amber-50/10' : 'border-slate-200'}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-slate-900">{inq.name}</span>
                  <span className="text-xs font-medium text-slate-500">({inq.email})</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${inq.status === 'unread' || inq.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{inq.status}</span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">{inq.subject}</h3>
                <p className="text-sm text-slate-600 mb-3">{inq.message}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock size={14} />{new Date(inq.receivedAt).toLocaleString()}</span>
                  {inq.phone && <span>Phone: {inq.phone}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {(inq.status === 'unread' || inq.status === 'New') && (
                  <button onClick={() => updateStatus(inq.id, 'read')} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-md text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                    <CheckCircle size={14} /> Mark Read
                  </button>
                )}
                <button onClick={() => updateStatus(inq.id, 'resolved')} className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                  Resolved
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
