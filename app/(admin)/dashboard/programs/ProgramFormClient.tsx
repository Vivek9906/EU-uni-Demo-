'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ProgramFormClientProps {
  mode:    'create' | 'edit'
  program?: {
    id:          string
    title:       string
    slug:        string
    level:       string
    description: string
    imageUrl:    string
    isActive:    boolean
    order:       number
  }
}

const LEVELS = ['phd', 'honorary', 'masters', 'bachelors']

export function ProgramFormClient({ mode, program }: ProgramFormClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title:       program?.title       ?? '',
    slug:        program?.slug        ?? '',
    level:       program?.level       ?? 'bachelors',
    description: program?.description ?? '',
    imageUrl:    program?.imageUrl    ?? '',
    isActive:    program?.isActive    ?? true,
    order:       program?.order       ?? 0,
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setForm(f => ({ ...f, title, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        const method = mode === 'edit' && program?.id ? 'PUT' : 'POST'
        const url = mode === 'edit' && program?.id ? `/api/admin/programs/${program.id}` : '/api/admin/programs'
        
        // Use actions instead of API routes as per the user's updated instructions
        const { createProgram, updateProgram } = await import('./actions')
        let res;
        if (mode === 'edit' && program?.id) {
          res = await updateProgram(program.id, form)
        } else {
          res = await createProgram(form)
        }
        
        if (!res.success) throw new Error(res.error || 'Failed to save program')
        
        router.push('/dashboard/programs')
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      }
    })
  }

  return (
    <div>
      <div style={{ background:'#FFF', borderBottom:'1px solid #E2E8F0', padding:'20px 28px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <button onClick={() => router.back()} style={{ background:'none', border:'none', color:'#64748B', cursor:'pointer', fontSize:13, marginBottom:4, display:'flex', alignItems:'center', gap:4, padding:0, fontFamily:'inherit' }}>
            ← Back
          </button>
          <h1 style={{ fontSize:22, fontWeight:800, color:'#0F172A', margin:0 }}>
            {mode === 'create' ? 'New Program' : 'Edit Program'}
          </h1>
        </div>
      </div>

      <div style={{ padding:'28px', maxWidth:680 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background:'#FFF', borderRadius:12, border:'1px solid #E2E8F0', padding:'28px' }}>
            {error && (
              <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:8, padding:'12px 16px', marginBottom:20, color:'#DC2626', fontSize:13.5 }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Title <span style={{ color:'#DC2626' }}>*</span></label>
              <input required value={form.title} onChange={handleTitleChange} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Slug <span style={{ color:'#DC2626' }}>*</span></label>
              <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Level <span style={{ color:'#DC2626' }}>*</span></label>
              <select required value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, fontFamily:'inherit' }}>
                {LEVELS.map(l => <option key={l} value={l} style={{ textTransform:'capitalize' }}>{l}</option>)}
              </select>
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Description <span style={{ color:'#DC2626' }}>*</span></label>
              <textarea required rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Image URL</label>
              <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Order</label>
              <input type="number" required value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} style={{ width:16, height:16, accentColor:'#1B3A6B' }} />
              <span style={{ fontSize:14, fontWeight:600, color:'#374151' }}>Active</span>
            </label>
          </div>

          <div style={{ display:'flex', gap:12, marginTop:16, justifyContent:'flex-end' }}>
            <button type="button" onClick={() => router.back()} style={{ padding:'10px 20px', background:'transparent', color:'#1B3A6B', border:'1.5px solid #BFDBFE', borderRadius:8, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
            <button type="submit" disabled={isPending} style={{ padding:'10px 24px', background: isPending ? '#94A3B8' : '#1B3A6B', color:'#FFF', border:'none', borderRadius:8, fontWeight:700, cursor: isPending ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
              {isPending ? 'Saving...' : mode === 'create' ? 'Create Program' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
