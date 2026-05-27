'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Loader2 } from 'lucide-react';

export default function FacultyAdminPage() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', designation: '', department: '', specialization: '', bio: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetch('/api/admin/faculty').then(r => r.json()).then(d => setFaculty(d.faculty || [])).finally(() => setIsLoading(false)); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const res = await fetch('/api/admin/faculty', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { const data = await res.json(); setFaculty([...faculty, data.faculty]); setShowForm(false); setForm({ name: '', designation: '', department: '', specialization: '', bio: '', email: '' }); }
    } catch (e) { console.error(e); } finally { setIsSaving(false); }
  };

  if (isLoading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-foreground-muted" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Users className="text-primary" /> Faculty</h1><button onClick={() => setShowForm(!showForm)} className="btn-primary btn-sm gap-1"><Plus size={14} /> Add Faculty</button></div>
      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1.5">Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Designation *</label><input required value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Department *</label><input required value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Specialization *</label><input required value={form.specialization} onChange={e => setForm({...form, specialization: e.target.value})} className="input-field" /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1.5">Bio *</label><textarea required rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" /></div>
          <div className="flex gap-2"><button type="submit" disabled={isSaving} className="btn-primary btn-sm">{isSaving ? 'Saving...' : 'Add Faculty'}</button><button type="button" onClick={() => setShowForm(false)} className="btn-ghost btn-sm">Cancel</button></div>
        </form>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculty.map(f => (
          <div key={f.id} className="card p-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3"><span className="text-sm font-bold text-primary">{f.name?.split(' ').map((n: string) => n[0]).join('')}</span></div>
            <h3 className="font-heading text-sm font-bold">{f.name}</h3>
            <p className="text-xs text-accent font-medium">{f.designation}</p>
            <p className="text-xs text-foreground-muted mt-1">{f.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
