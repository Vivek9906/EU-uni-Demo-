'use client';

import { useState, useEffect } from 'react';
import { Bell, Plus, Loader2, Trash2 } from 'lucide-react';

export default function NoticesAdminPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: 'general' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetch('/api/admin/notices').then(r => r.json()).then(d => setNotices(d.notices || [])).finally(() => setIsLoading(false)); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/notices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { const data = await res.json(); setNotices([data.notice, ...notices]); setForm({ title: '', content: '', category: 'general' }); setShowForm(false); }
    } catch (e) { console.error(e); }
    finally { setIsSaving(false); }
  };

  if (isLoading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-foreground-muted" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Bell className="text-primary" /> Notices</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary btn-sm gap-1"><Plus size={14} /> New Notice</button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 space-y-4">
          <div><label className="block text-sm font-medium mb-1.5">Title *</label><input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Content *</label><textarea required rows={4} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field"><option value="general">General</option><option value="academic">Academic</option><option value="admin">Admin</option><option value="exam">Exam</option></select></div>
          <div className="flex gap-2"><button type="submit" disabled={isSaving} className="btn-primary btn-sm gap-1">{isSaving ? <Loader2 size={14} className="animate-spin" /> : null} Publish</button><button type="button" onClick={() => setShowForm(false)} className="btn-ghost btn-sm">Cancel</button></div>
        </form>
      )}

      <div className="space-y-3">
        {notices.map(n => (
          <div key={n.id} className="card p-4 flex items-center justify-between">
            <div><span className="badge-primary mr-2 text-xs">{n.category}</span><span className="font-medium text-sm">{n.title}</span><p className="text-xs text-foreground-muted mt-1">{new Date(n.postedAt).toLocaleDateString()}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
