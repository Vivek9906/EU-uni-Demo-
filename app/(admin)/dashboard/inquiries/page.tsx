'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle, Clock, Loader2 } from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
    } catch (e) { console.error(e); }
  };

  if (isLoading) return <div className="p-12 text-center text-foreground-muted"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><MessageSquare className="text-primary" /> Contact Inquiries</h1>
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="card p-12 text-center text-foreground-muted">No inquiries yet.</div>
        ) : inquiries.map((inq) => (
          <div key={inq.id} className={`card p-6 ${inq.status === 'New' || inq.status === 'unread' ? 'border-primary/30 bg-primary/[0.02]' : ''}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{inq.name}</span>
                  <span className="text-xs text-foreground-muted">({inq.email})</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${inq.status === 'unread' || inq.status === 'New' ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'}`}>{inq.status}</span>
                </div>
                <h3 className="font-heading text-base font-bold mb-1">{inq.subject}</h3>
                <p className="text-sm text-foreground-secondary mb-2">{inq.message}</p>
                <div className="flex items-center gap-3 text-xs text-foreground-muted">
                  <span className="flex items-center gap-1"><Clock size={12} />{new Date(inq.receivedAt).toLocaleString()}</span>
                  {inq.phone && <span>Phone: {inq.phone}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {(inq.status === 'unread' || inq.status === 'New') && (
                  <button onClick={() => updateStatus(inq.id, 'read')} className="btn-primary btn-sm gap-1"><CheckCircle size={14} /> Mark Read</button>
                )}
                <button onClick={() => updateStatus(inq.id, 'resolved')} className="btn-ghost btn-sm text-xs">Resolved</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
