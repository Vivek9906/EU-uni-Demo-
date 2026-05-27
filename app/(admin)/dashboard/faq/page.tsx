'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, Plus, Loader2 } from 'lucide-react';

export default function FaqAdminPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: '', answer: '', category: 'Admissions' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetch('/api/admin/faq').then(r => r.json()).then(d => setFaqs(d.faqs || [])).finally(() => setIsLoading(false)); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const res = await fetch('/api/admin/faq', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { const data = await res.json(); setFaqs([...faqs, data.faq]); setShowForm(false); setForm({ question: '', answer: '', category: 'Admissions' }); }
    } catch (e) { console.error(e); } finally { setIsSaving(false); }
  };

  if (isLoading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-foreground-muted" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-heading font-bold flex items-center gap-2"><HelpCircle className="text-primary" /> FAQ Management</h1><button onClick={() => setShowForm(!showForm)} className="btn-primary btn-sm gap-1"><Plus size={14} /> New FAQ</button></div>
      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 space-y-4">
          <div><label className="block text-sm font-medium mb-1.5">Question *</label><input required value={form.question} onChange={e => setForm({...form, question: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Answer *</label><textarea required rows={4} value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field"><option>Admissions</option><option>Programs</option><option>Fees</option><option>Campus Life</option><option>Certificates</option></select></div>
          <div className="flex gap-2"><button type="submit" disabled={isSaving} className="btn-primary btn-sm">{isSaving ? 'Saving...' : 'Add FAQ'}</button><button type="button" onClick={() => setShowForm(false)} className="btn-ghost btn-sm">Cancel</button></div>
        </form>
      )}
      <div className="space-y-3">
        {faqs.map(f => (
          <div key={f.id} className="card p-4"><span className="badge-primary text-xs mr-2">{f.category}</span><h3 className="font-medium text-sm mt-1">{f.question}</h3><p className="text-xs text-foreground-muted mt-1">{f.answer}</p></div>
        ))}
      </div>
    </div>
  );
}
