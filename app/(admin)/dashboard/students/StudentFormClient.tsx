'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface StudentFormClientProps {
  mode:    'create' | 'edit'
  student?: {
    id:             string
    fullName:       string
    email:          string
    programName:    string
    programLevel:   string
    enrollmentYear: number
    status:         string
  }
}

export function StudentFormClient({ mode, student }: StudentFormClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    fullName:       student?.fullName       ?? '',
    email:          student?.email          ?? '',
    programName:    student?.programName    ?? '',
    programLevel:   student?.programLevel   ?? 'Bachelors',
    enrollmentYear: student?.enrollmentYear ?? new Date().getFullYear(),
    status:         student?.status         ?? 'enrolled',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        const method = mode === 'edit' && student?.id ? 'PUT' : 'POST'
        const url = mode === 'edit' && student?.id ? `/api/admin/students/${student.id}` : '/api/admin/students'
        
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, id: student?.id }),
        })
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.error || 'Failed to save student')
        }
        
        router.push('/dashboard/students')
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
            {mode === 'create' ? 'New Student' : 'Edit Student'}
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
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Full Name <span style={{ color:'#DC2626' }}>*</span></label>
              <input required value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Email <span style={{ color:'#DC2626' }}>*</span></label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Program Level <span style={{ color:'#DC2626' }}>*</span></label>
              <select required value={form.programLevel} onChange={e => setForm(f => ({ ...f, programLevel: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, fontFamily:'inherit' }}>
                <option value="Bachelors">Bachelor's</option>
                <option value="Masters">Master's</option>
                <option value="PhD">PhD</option>
                <option value="Honorary">Honorary</option>
                <option value="Certification">Certification</option>
              </select>
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Program Name <span style={{ color:'#DC2626' }}>*</span></label>
              <input required value={form.programName} onChange={e => setForm(f => ({ ...f, programName: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Enrollment Year <span style={{ color:'#DC2626' }}>*</span></label>
              <input type="number" required value={form.enrollmentYear} onChange={e => setForm(f => ({ ...f, enrollmentYear: parseInt(e.target.value) || 2024 }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Status <span style={{ color:'#DC2626' }}>*</span></label>
              <select required value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, fontFamily:'inherit' }}>
                <option value="enrolled">Enrolled</option>
                <option value="active">Active</option>
                <option value="graduated">Graduated</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div style={{ display:'flex', gap:12, marginTop:16, justifyContent:'flex-end' }}>
            <button type="button" onClick={() => router.back()} style={{ padding:'10px 20px', background:'transparent', color:'#1B3A6B', border:'1.5px solid #BFDBFE', borderRadius:8, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
            <button type="submit" disabled={isPending} style={{ padding:'10px 24px', background: isPending ? '#94A3B8' : '#1B3A6B', color:'#FFF', border:'none', borderRadius:8, fontWeight:700, cursor: isPending ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
              {isPending ? 'Saving...' : mode === 'create' ? 'Create Student' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
