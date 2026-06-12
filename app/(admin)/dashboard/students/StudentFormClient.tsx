'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface StudentFormClientProps {
  mode:    'create' | 'edit'
  student?: {
    id:                 string
    enrollmentId:       string
    fullName:           string
    email:              string
    programName:        string
    programLevel:       string
    graduatingYear:     number
    status:             string
    photo:              string | null
    photoPublicId?:     string | null
    isPubliclyVisible:  boolean
  }
}

export function StudentFormClient({ mode, student }: StudentFormClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [photoMode, setPhotoMode] = useState<'upload' | 'url'>(student?.photo ? 'url' : 'upload')
  const [isUploading, setIsUploading] = useState(false)
  const [form, setForm] = useState({
    enrollmentId:       student?.enrollmentId       ?? '',
    fullName:           student?.fullName           ?? '',
    email:              student?.email              ?? '',
    programName:        student?.programName        ?? '',
    programLevel:       student?.programLevel       ?? '',
    graduatingYear:     student?.graduatingYear     ?? new Date().getFullYear(),
    status:             student?.status             ?? 'enrolled',
    photo:              student?.photo              ?? '',
    photoPublicId:      student?.photoPublicId      ?? '',
    isPubliclyVisible:  student?.isPubliclyVisible  ?? true,
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 13px',
    border: '1.5px solid #D1D5DB',
    borderRadius: 8,
    fontSize: 14,
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12.5,
    fontWeight: 700,
    color: '#374151',
    marginBottom: 6,
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

      <div style={{ padding:'28px', maxWidth:720 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background:'#FFF', borderRadius:12, border:'1px solid #E2E8F0', padding:'28px' }}>
            {error && (
              <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:8, padding:'12px 16px', marginBottom:20, color:'#DC2626', fontSize:13.5 }}>
                ⚠️ {error}
              </div>
            )}

            {/* Photo preview */}
            {form.photo && (
              <div style={{ marginBottom: 20, textAlign: 'center' }}>
                <img
                  src={form.photo}
                  alt="Student photo"
                  style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', border: '2px solid #E2E8F0' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Enrollment ID <span style={{ color:'#DC2626' }}>*</span></label>
                <input
                  required
                  placeholder="e.g. EUAU-2024-00001"
                  value={form.enrollmentId}
                  onChange={e => setForm(f => ({ ...f, enrollmentId: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Full Name <span style={{ color:'#DC2626' }}>*</span></label>
                <input required value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Email <span style={{ color:'#DC2626' }}>*</span></label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Program Level <span style={{ color:'#DC2626' }}>*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bachelor's, Master's, Honorary Doctorate"
                  value={form.programLevel}
                  onChange={e => setForm(f => ({ ...f, programLevel: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Program Name <span style={{ color:'#DC2626' }}>*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Business Administration (MBA)"
                  value={form.programName}
                  onChange={e => setForm(f => ({ ...f, programName: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Graduating Year <span style={{ color:'#DC2626' }}>*</span></label>
                <input type="number" required value={form.graduatingYear} onChange={e => setForm(f => ({ ...f, graduatingYear: parseInt(e.target.value) || 2024 }))} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Status <span style={{ color:'#DC2626' }}>*</span></label>
                <select required value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={inputStyle}>
                  <option value="enrolled">Enrolled</option>
                  <option value="active">Active</option>
                  <option value="graduated">Graduated</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Publicly Visible</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4 }}>
                  <input
                    type="checkbox"
                    checked={form.isPubliclyVisible}
                    onChange={e => setForm(f => ({ ...f, isPubliclyVisible: e.target.checked }))}
                    style={{ width: 18, height: 18, accentColor: '#1B3A6B' }}
                  />
                  <span style={{ fontSize: 13.5, color: '#475569' }}>Show on verification portal</span>
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Student Photo</label>
                <div style={{ display: 'flex', gap: 2, background: '#F1F5F9', padding: 2, borderRadius: 8, marginBottom: 12 }}>
                  <button
                    type="button"
                    onClick={() => setPhotoMode('upload')}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0', fontSize: 12, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: photoMode === 'upload' ? '#FFF' : 'transparent', color: photoMode === 'upload' ? '#0F172A' : '#64748B', boxShadow: photoMode === 'upload' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                  >
                    📤 Upload Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoMode('url')}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0', fontSize: 12, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: photoMode === 'url' ? '#FFF' : 'transparent', color: photoMode === 'url' ? '#0F172A' : '#64748B', boxShadow: photoMode === 'url' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                  >
                    🔗 Image URL
                  </button>
                </div>
                {photoMode === 'upload' ? (
                  <div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploading(true);
                        try {
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                          if (res.ok) {
                            const data = await res.json();
                            setForm(f => ({ ...f, photo: data.url, photoPublicId: data.publicId || '' }));
                          } else {
                            const err = await res.json();
                            alert(err.error || 'Upload failed');
                          }
                        } catch { alert('Upload failed'); }
                        finally { setIsUploading(false); }
                      }}
                      style={{ fontSize: 13 }}
                    />
                    {isUploading && <p style={{ fontSize: 11, color: '#D97706', marginTop: 4 }}>⏳ Uploading...</p>}
                    {form.photo && !isUploading && <p style={{ fontSize: 11, color: '#059669', marginTop: 4 }}>✓ Photo ready</p>}
                  </div>
                ) : (
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={form.photo}
                    onChange={e => setForm(f => ({ ...f, photo: e.target.value }))}
                    style={inputStyle}
                  />
                )}
                {form.photo && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={form.photo} alt="Preview" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: '1px solid #E2E8F0' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    <button type="button" onClick={() => setForm(f => ({ ...f, photo: '', photoPublicId: '' }))} style={{ fontSize: 12, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Remove photo</button>
                  </div>
                )}
              </div>
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
