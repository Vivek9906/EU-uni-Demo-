'use client'

import { useState, useTransition } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { createCertification, updateCertification, deleteCertification, toggleCertificationActive } from './actions'

const CATEGORIES = ['Technology & IT', 'Business & Management', 'Engineering & Sciences', 'Research & Academia', 'Personal Development']

export function CertificationsClient({ initialData }: { initialData: any[] }) {
  const [items, setItems] = useState(initialData)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()

  const filtered = items.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'all' || c.category === categoryFilter
    return matchSearch && matchCat
  })

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    startTransition(async () => {
      const result = await deleteCertification(id)
      if (result.success) setItems(prev => prev.filter(c => c.id !== id))
    })
  }

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      await toggleCertificationActive(id, !current)
      setItems(prev => prev.map(c => c.id === id ? { ...c, isActive: !current } : c))
    })
  }

  const handleSave = async (data: any) => {
    if (editing) {
      const result = await updateCertification(editing.id, data)
      if (result.success && result.certification) {
        setItems(prev => prev.map(c => c.id === editing.id ? { ...c, ...result.certification } : c))
      }
    } else {
      const result = await createCertification(data)
      if (result.success && result.certification) {
        setItems(prev => [result.certification, ...prev])
      }
    }
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Certifications</h1>
          <p className="text-sm text-slate-500 mt-1">{items.length} certifications offered</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold text-[13.5px] transition-all duration-200 shadow-sm">
          <Plus size={16} /> Add Certification
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input
          placeholder="Search certifications..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-60 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        />
        <select
          value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="text-sm text-slate-400 self-center">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Bundle</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  {search || categoryFilter !== 'all' ? 'No certifications match your filter.' : 'No certifications yet. Add one above.'}
                </td></tr>
              ) : filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                  <td className="px-6 py-4 font-bold text-slate-900">{c.title}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">{c.category}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs font-bold">{c.isBundle ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={c.isActive} onChange={() => handleToggle(c.id, c.isActive)} className="w-4 h-4" />
                      <span className={`text-xs font-bold ${c.isActive ? 'text-emerald-700' : 'text-slate-400'}`}>{c.isActive ? 'Active' : 'Inactive'}</span>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{c.order ?? 0}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditing(c); setShowForm(true) }} disabled={isPending}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(c.id, c.title)} disabled={isPending}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && <CertFormModal cert={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={handleSave} />}
    </div>
  )
}

function CertFormModal({ cert, onClose, onSave }: { cert: any; onClose: () => void; onSave: (d: any) => Promise<void> }) {
  const [form, setForm] = useState({
    title: cert?.title ?? '', slug: cert?.slug ?? '', category: cert?.category ?? CATEGORIES[0],
    description: cert?.description ?? '', imageUrl: cert?.imageUrl ?? '',
    isBundle: cert?.isBundle ?? false, isActive: cert?.isActive ?? true, order: cert?.order ?? 0,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try { await onSave(form) } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">{cert ? 'Edit Certification' : 'Add Certification'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Title *</label>
            <input required value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value, ...(cert ? {} : { slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }) }))}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Slug *</label>
            <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Category *</label>
            <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Image URL</label>
            <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Order</label>
              <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4" /> Active
              </label>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" checked={form.isBundle} onChange={e => setForm(f => ({ ...f, isBundle: e.target.checked }))} className="w-4 h-4" /> Bundle
              </label>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50">
              {saving ? 'Saving...' : cert ? 'Update' : 'Add Certification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
