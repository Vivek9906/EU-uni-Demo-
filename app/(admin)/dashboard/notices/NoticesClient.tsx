'use client'

import { useState, useTransition } from 'react'
import { Plus, Edit2, Trash2, Bell } from 'lucide-react'
import { createNotice, updateNotice, deleteNotice, toggleNoticeActive } from './actions'

function formatDate(isoString: string | null): string {
  if (!isoString) return 'N/A'
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    }).format(new Date(isoString))
  } catch {
    return isoString
  }
}

const CATEGORIES = ['academic', 'administrative', 'examination', 'general', 'event']

export function NoticesClient({ initialData }: { initialData: any[] }) {
  const [notices, setNotices] = useState(initialData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [formData, setFormData] = useState({ title: '', content: '', category: 'general', isActive: true })
  const [isPending, startTransition] = useTransition()

  const openCreate = () => {
    setEditing(null)
    setFormData({ title: '', content: '', category: 'general', isActive: true })
    setIsModalOpen(true)
  }

  const openEdit = (notice: any) => {
    setEditing(notice)
    setFormData({ title: notice.title, content: notice.content, category: notice.category, isActive: notice.isActive })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (editing) {
        const result = await updateNotice(editing.id, formData)
        if (result.success && result.notice) {
          setNotices(prev => prev.map(n => n.id === editing.id ? result.notice : n))
        }
      } else {
        const result = await createNotice(formData)
        if (result.success && result.notice) {
          setNotices(prev => [result.notice, ...prev])
        }
      }
      setIsModalOpen(false)
      setEditing(null)
    })
  }

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete notice "${title}"? This cannot be undone.`)) return
    startTransition(async () => {
      const result = await deleteNotice(id)
      if (result.success) {
        setNotices(prev => prev.filter(n => n.id !== id))
      }
    })
  }

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      await toggleNoticeActive(id, !current)
      setNotices(prev => prev.map(n => n.id === id ? { ...n, isActive: !current } : n))
    })
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Bell className="text-amber-500" /> Manage Notices
        </h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold text-[13.5px] transition-all duration-200 shadow-sm"
        >
          <Plus size={16} /> Add Notice
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notices.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No notices found.</td></tr>
              ) : (
                notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                    <td className="px-6 py-4 font-bold text-slate-900">{notice.title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                        {notice.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notice.isActive}
                          onChange={() => handleToggle(notice.id, notice.isActive)}
                          disabled={isPending}
                          className="w-4 h-4"
                        />
                        <span className={`text-xs font-bold ${notice.isActive ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {notice.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{formatDate(notice.postedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(notice)}
                          disabled={isPending}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id, notice.title)}
                          disabled={isPending}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
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
              <h2 className="text-xl font-bold text-slate-900">{editing ? 'Edit Notice' : 'Add New Notice'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Title *</label>
                <input
                  type="text" required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Content *</label>
                <textarea required rows={4}
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold text-slate-700">Active (visible on website)</span>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isPending} className="px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50">
                  {isPending ? 'Saving...' : editing ? 'Save Changes' : 'Create Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
