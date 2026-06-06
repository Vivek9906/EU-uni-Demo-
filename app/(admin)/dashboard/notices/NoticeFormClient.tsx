'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createNotice, updateNotice } from './actions'

interface NoticeFormClientProps {
  mode:    'create' | 'edit'
  notice?: {
    id:       string
    title:    string
    content:  string
    category: string
    isActive: boolean
  }
}

const CATEGORIES = ['academic', 'administrative', 'examination', 'general', 'event']

export function NoticeFormClient({ mode, notice }: NoticeFormClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title:    notice?.title    ?? '',
    content:  notice?.content  ?? '',
    category: notice?.category ?? 'general',
    isActive: notice?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        if (mode === 'edit' && notice?.id) {
          const res = await updateNotice(notice.id, form)
          if (!res.success) throw new Error(res.error || 'Update failed')
        } else {
          const res = await createNotice(form)
          if (!res.success) throw new Error(res.error || 'Creation failed')
        }
        router.push('/dashboard/notices')
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      }
    })
  }

  return (
    <div>
      {/* Page header */}
      <div style={{ background:'#FFF', borderBottom:'1px solid #E2E8F0', padding:'20px 28px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <button onClick={() => router.back()} style={{ background:'none', border:'none', color:'#64748B', cursor:'pointer', fontSize:13, marginBottom:4, display:'flex', alignItems:'center', gap:4, padding:0, fontFamily:'inherit' }}>
            ← Back
          </button>
          <h1 style={{ fontSize:22, fontWeight:800, color:'#0F172A', margin:0 }}>
            {mode === 'create' ? 'New Notice' : 'Edit Notice'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <div style={{ padding:'28px', maxWidth:680 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background:'#FFF', borderRadius:12, border:'1px solid #E2E8F0', padding:'28px' }}>

            {error && (
              <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:8, padding:'12px 16px', marginBottom:20, color:'#DC2626', fontSize:13.5 }}>
                ⚠️ {error}
              </div>
            )}

            {/* Title */}
            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>
                Notice Title <span style={{ color:'#DC2626' }}>*</span>
              </label>
              <input
                required
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Fall 2026 Enrollment Now Open"
                style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#1B3A6B'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#D1D5DB'}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>
                Category <span style={{ color:'#DC2626' }}>*</span>
              </label>
              <select
                required
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, fontFamily:'inherit' }}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c} style={{ textTransform:'capitalize' }}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>
                Content <span style={{ color:'#DC2626' }}>*</span>
              </label>
              <textarea
                required
                rows={6}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Write the full notice content here..."
                style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, resize:'vertical', fontFamily:'inherit', outline:'none', boxSizing:'border-box' }}
                onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#1B3A6B'}
                onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = '#D1D5DB'}
              />
            </div>

            {/* Active toggle */}
            <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
                style={{ width:16, height:16, accentColor:'#1B3A6B' }}
              />
              <span style={{ fontSize:14, fontWeight:600, color:'#374151' }}>Publish immediately</span>
            </label>
          </div>

          {/* Submit */}
          <div style={{ display:'flex', gap:12, marginTop:16, justifyContent:'flex-end' }}>
            <button
              type="button"
              onClick={() => router.back()}
              style={{ padding:'10px 20px', background:'transparent', color:'#1B3A6B', border:'1.5px solid #BFDBFE', borderRadius:8, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              style={{ padding:'10px 24px', background: isPending ? '#94A3B8' : '#1B3A6B', color:'#FFF', border:'none', borderRadius:8, fontWeight:700, cursor: isPending ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}
            >
              {isPending ? 'Saving...' : mode === 'create' ? 'Create Notice' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
