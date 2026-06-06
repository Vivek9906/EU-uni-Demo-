'use client'

import { useState, useTransition } from 'react'
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react'
import { createProgram, updateProgram, deleteProgram } from './actions'

const LEVELS = ['phd', 'honorary', 'masters', 'bachelors']

export function ProgramsClient({ initialData }: { initialData: any[] }) {
  const [programs, setPrograms] = useState(initialData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [formData, setFormData] = useState({ title: '', slug: '', level: 'bachelors', description: '', imageUrl: '', isActive: true, order: 0 })
  const [isPending, startTransition] = useTransition()

  const openCreate = () => {
    setEditing(null)
    setFormData({ title: '', slug: '', level: 'bachelors', description: '', imageUrl: '', isActive: true, order: 0 })
    setIsModalOpen(true)
  }

  const openEdit = (p: any) => {
    setEditing(p)
    setFormData({ title: p.title, slug: p.slug, level: p.level, description: p.description, imageUrl: p.imageUrl || '', isActive: p.isActive, order: p.order })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (editing) {
        const result = await updateProgram(editing.id, formData)
        if (result.success && result.program) {
          setPrograms(prev => prev.map(p => p.id === editing.id ? result.program : p))
          setIsModalOpen(false)
          setEditing(null)
        } else {
          alert(`Failed to update program: ${result.error || 'Unknown error'}`)
        }
      } else {
        const result = await createProgram(formData)
        if (result.success && result.program) {
          setPrograms(prev => [result.program, ...prev])
          setIsModalOpen(false)
          setEditing(null)
        } else {
          alert(`Failed to create program: ${result.error || 'Unknown error'}`)
        }
      }
    })
  }

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete program "${title}"?`)) return
    startTransition(async () => {
      const result = await deleteProgram(id)
      if (result.success) setPrograms(prev => prev.filter(p => p.id !== id))
    })
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <GraduationCap className="text-amber-500" /> Manage Programs
        </h1>
        <button onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold text-[13.5px] transition-all duration-200 shadow-sm">
          <Plus size={16} /> Add Program
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Level</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programs.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No programs found.</td></tr>
              ) : (
                programs.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                    <td className="px-6 py-4 font-bold text-slate-900">{p.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.level === 'phd' ? 'bg-purple-100 text-purple-800' :
                        p.level === 'honorary' ? 'bg-amber-100 text-amber-800' :
                        p.level === 'masters' ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">{p.order}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} disabled={isPending}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(p.id, p.title)} disabled={isPending}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">{editing ? 'Edit Program' : 'Add New Program'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Program Title *</label>
                <input type="text" required value={formData.title}
                  onChange={e => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setFormData({ ...formData, title, slug });
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Slug *</label>
                <input type="text" required value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Level *</label>
                  <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                    {LEVELS.map(d => <option key={d} value={d} className="capitalize">{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Order</label>
                  <input type="number" required value={formData.order}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description *</label>
                <textarea required rows={3} value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Image URL</label>
                <input type="text" value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isActive}
                    onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 rounded border-slate-300" />
                  <span className="text-sm font-bold text-slate-700">Active</span>
                </label>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={isPending} className="px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50">
                  {isPending ? 'Saving...' : editing ? 'Save Changes' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
