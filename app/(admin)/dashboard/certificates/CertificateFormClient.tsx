'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface CertificateFormClientProps {
  mode:    'create' | 'edit'
  certificate?: {
    id:            string
    certificateId: string
    holderName:    string
    programName:   string
    issuedDate:    string
    isValid:       boolean
  }
}

export function CertificateFormClient({ mode, certificate }: CertificateFormClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    certificateId: certificate?.certificateId ?? `CERT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    holderName:    certificate?.holderName    ?? '',
    programName:   certificate?.programName   ?? '',
    issuedDate:    certificate?.issuedDate    ?? new Date().toISOString().slice(0, 10),
    isValid:       certificate?.isValid       ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        const method = mode === 'edit' && certificate?.id ? 'PUT' : 'POST'
        const url = mode === 'edit' && certificate?.id ? `/api/certificates/${certificate.id}` : '/api/certificates'
        
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, id: certificate?.id }),
        })
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.error || 'Failed to save certificate')
        }
        
        router.push('/dashboard/certificates')
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
            {mode === 'create' ? 'Issue Certificate' : 'Edit Certificate'}
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
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Certificate ID <span style={{ color:'#DC2626' }}>*</span></label>
              <input required value={form.certificateId} onChange={e => setForm(f => ({ ...f, certificateId: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
              <p style={{ fontSize:11, color:'#64748B', marginTop:4 }}>Auto-generated, but you can modify it.</p>
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Holder Name <span style={{ color:'#DC2626' }}>*</span></label>
              <input required value={form.holderName} onChange={e => setForm(f => ({ ...f, holderName: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Program Name <span style={{ color:'#DC2626' }}>*</span></label>
              <input required value={form.programName} onChange={e => setForm(f => ({ ...f, programName: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'#374151', marginBottom:6 }}>Issued Date <span style={{ color:'#DC2626' }}>*</span></label>
              <input type="date" required value={form.issuedDate} onChange={e => setForm(f => ({ ...f, issuedDate: e.target.value }))} style={{ width:'100%', padding:'10px 13px', border:'1.5px solid #D1D5DB', borderRadius:8, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
            </div>

            <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <input type="checkbox" checked={form.isValid} onChange={e => setForm(f => ({ ...f, isValid: e.target.checked }))} style={{ width:16, height:16, accentColor:'#1B3A6B' }} />
              <span style={{ fontSize:14, fontWeight:600, color:'#374151' }}>Valid</span>
            </label>
          </div>

          <div style={{ display:'flex', gap:12, marginTop:16, justifyContent:'flex-end' }}>
            <button type="button" onClick={() => router.back()} style={{ padding:'10px 20px', background:'transparent', color:'#1B3A6B', border:'1.5px solid #BFDBFE', borderRadius:8, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
            <button type="submit" disabled={isPending} style={{ padding:'10px 24px', background: isPending ? '#94A3B8' : '#1B3A6B', color:'#FFF', border:'none', borderRadius:8, fontWeight:700, cursor: isPending ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
              {isPending ? 'Saving...' : mode === 'create' ? 'Issue Certificate' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
