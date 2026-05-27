'use client';

import { useState, useEffect } from 'react';
import { FileImage, Plus, Loader2 } from 'lucide-react';

export default function NewsAdminPage() {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'General', isPublished: false });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetch('/api/admin/news').then(r => r.json()).then(d => setNews(d.news || [])).finally(() => setIsLoading(false)); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { const data = await res.json(); setNews([data.news, ...news]); setForm({ title: '', excerpt: '', content: '', category: 'General', isPublished: false }); setShowForm(false); }
    } catch (e) { console.error(e); }
    finally { setIsSaving(false); }
  };

  if (isLoading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-foreground-muted" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><FileImage className="text-primary" /> News & Media</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary btn-sm gap-1"><Plus size={14} /> New Article</button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 space-y-4">
          <div><label className="block text-sm font-medium mb-1.5">Title *</label><input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Excerpt *</label><input required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Content *</label><textarea required rows={8} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="input-field" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1.5">Category</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field" /></div>
            <div className="flex items-center gap-2 mt-7"><input type="checkbox" checked={form.isPublished} onChange={e => setForm({...form, isPublished: e.target.checked})} id="publish" /><label htmlFor="publish" className="text-sm">Publish immediately</label></div>
          </div>
          <div className="flex gap-2"><button type="submit" disabled={isSaving} className="btn-primary btn-sm">{isSaving ? 'Saving...' : 'Create Article'}</button><button type="button" onClick={() => setShowForm(false)} className="btn-ghost btn-sm">Cancel</button></div>
        </form>
      )}
      <div className="card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-background-subtle text-foreground-muted font-medium uppercase text-xs"><tr><th className="px-6 py-3">Title</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Date</th></tr></thead>
          <tbody className="divide-y divide-border">
            {news.map(n => (
              <tr key={n.id} className="hover:bg-background-subtle/50">
                <td className="px-6 py-4 font-medium">{n.title}</td>
                <td className="px-6 py-4"><span className="badge-primary">{n.category}</span></td>
                <td className="px-6 py-4">{n.isPublished ? <span className="badge-success">Published</span> : <span className="badge-accent">Draft</span>}</td>
                <td className="px-6 py-4 text-foreground-muted">{new Date(n.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
