'use client';

import { useState, useEffect } from 'react';
import { Calendar, Plus, Loader2 } from 'lucide-react';

export default function EventsAdminPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', venue: '', category: 'Conference', isPublished: false });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetch('/api/admin/events').then(r => r.json()).then(d => setEvents(d.events || [])).finally(() => setIsLoading(false)); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const res = await fetch('/api/admin/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { const data = await res.json(); setEvents([data.event, ...events]); setShowForm(false); setForm({ title: '', description: '', date: '', venue: '', category: 'Conference', isPublished: false }); }
    } catch (e) { console.error(e); } finally { setIsSaving(false); }
  };

  if (isLoading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-foreground-muted" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Calendar className="text-primary" /> Events</h1><button onClick={() => setShowForm(!showForm)} className="btn-primary btn-sm gap-1"><Plus size={14} /> New Event</button></div>
      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 space-y-4">
          <div><label className="block text-sm font-medium mb-1.5">Title *</label><input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Description *</label><textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1.5">Date *</label><input type="datetime-local" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Venue *</label><input required value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} className="input-field" /></div>
          </div>
          <div className="flex gap-2"><button type="submit" disabled={isSaving} className="btn-primary btn-sm">{isSaving ? 'Creating...' : 'Create Event'}</button><button type="button" onClick={() => setShowForm(false)} className="btn-ghost btn-sm">Cancel</button></div>
        </form>
      )}
      <div className="card overflow-hidden">
        <table className="w-full text-sm text-left"><thead className="bg-background-subtle text-foreground-muted font-medium uppercase text-xs"><tr><th className="px-6 py-3">Event</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Venue</th><th className="px-6 py-3">Status</th></tr></thead>
          <tbody className="divide-y divide-border">{events.map(ev => (<tr key={ev.id} className="hover:bg-background-subtle/50"><td className="px-6 py-4 font-medium">{ev.title}</td><td className="px-6 py-4 text-foreground-muted">{new Date(ev.date).toLocaleDateString()}</td><td className="px-6 py-4 text-foreground-muted">{ev.venue}</td><td className="px-6 py-4">{ev.isPublished ? <span className="badge-success">Published</span> : <span className="badge-accent">Draft</span>}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
