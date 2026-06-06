'use client'

import { useState, useTransition } from 'react'
import { createPartner, updatePartner, deletePartner } from './actions'

interface Partner {
  id: string
  name: string
  address: string
  region: string
  country: string
  website?: string | null
  email?: string | null
  logoUrl?: string | null
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export function PartnersClient({ partners: initial }: { partners: Partner[] }) {
  const [partners, setPartners] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Partner | null>(null)
  const [search, setSearch] = useState('')
  const [regionFilter, setRegion] = useState('all')
  const [isPending, start] = useTransition()

  // Dynamically derive regions from the partners data, plus common defaults
  const dynamicRegions = Array.from(new Set(partners.map(p => p.region))).sort()
  const REGIONS = dynamicRegions.length > 0 ? dynamicRegions : ['Europe', 'Asia-Pacific', 'Americas', 'Africa', 'Middle East']

  const filtered = partners.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.country.toLowerCase().includes(search.toLowerCase())
    const matchRegion = regionFilter === 'all' || p.region === regionFilter
    return matchSearch && matchRegion
  })

  const grouped = REGIONS.reduce((acc, region) => {
    const inRegion = filtered.filter(p => p.region === region)
    if (inRegion.length > 0) acc[region] = inRegion
    return acc
  }, {} as Record<string, Partner[]>)

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Remove partner "${name}"?`)) return
    start(async () => {
      await deletePartner(id)
      setPartners(prev => prev.filter(p => p.id !== id))
    })
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#FFF', borderBottom: '1px solid #E2E8F0', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 40 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: 0 }}>Global Partners</h1>
          <p style={{ color: '#64748B', fontSize: 13, margin: '4px 0 0' }}>{partners.length} partners across {Object.keys(grouped).length} regions</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          style={{ padding: '9px 18px', background: '#1B3A6B', color: '#FFF', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13.5 }}>
          + Add Partner
        </button>
      </div>

      <div style={{ padding: '24px 28px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          <input placeholder="Search partners..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: 13.5, width: 220, fontFamily: 'inherit', background: '#F8FAFC' }} />
          <select value={regionFilter} onChange={e => setRegion(e.target.value)}
            style={{ padding: '8px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: '#F8FAFC' }}>
            <option value="all">All Regions</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Grouped by region */}
        {Object.entries(grouped).map(([region, items]) => (
          <div key={region} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#1B3A6B', marginBottom: 14, paddingBottom: 8, borderBottom: '2px solid #E09900', display: 'inline-block' }}>
              {region} ({items.length})
            </h2>
            <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Partner Name', 'Country', 'Website', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '13px 16px', fontWeight: 700, color: '#0F172A', fontSize: 13.5 }}>{p.name}</td>
                      <td style={{ padding: '13px 16px', color: '#374151', fontSize: 13 }}>{p.country}</td>
                      <td style={{ padding: '13px 16px' }}>
                        {p.website
                          ? <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ color: '#1B3A6B', fontSize: 12.5, textDecoration: 'none', fontWeight: 600 }}>Visit →</a>
                          : <span style={{ color: '#94A3B8', fontSize: 12 }}>—</span>}
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: p.isActive ? '#D1FAE5' : '#F1F5F9', color: p.isActive ? '#065F46' : '#64748B' }}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => { setEditing(p); setShowForm(true) }} disabled={isPending}
                            style={{ padding: '6px 12px', background: '#EFF6FF', color: '#1B3A6B', border: '1px solid #BFDBFE', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleDelete(p.id, p.name)} disabled={isPending}
                            style={{ padding: '6px 12px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px', color: '#94A3B8' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>No partners found</div>
            <div style={{ fontSize: 13 }}>Add your first partner using the button above.</div>
          </div>
        )}
      </div>

      {showForm && (
        <PartnerFormModal
          partner={editing}
          regions={REGIONS}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSave={async (data: any) => {
            if (editing) {
              const res = await updatePartner(editing.id, data)
              if (res.success && res.partner) {
                setPartners(prev => prev.map(p => p.id === editing.id ? { ...res.partner!, createdAt: new Date(res.partner!.createdAt).toISOString(), updatedAt: new Date(res.partner!.updatedAt).toISOString() } : p))
                setShowForm(false)
                setEditing(null)
              } else {
                alert(`Failed to update partner: ${res.error || 'Unknown error'}`)
              }
            } else {
              const res = await createPartner(data)
              if (res.success && res.partner) {
                setPartners(prev => [...prev, { ...res.partner!, createdAt: new Date(res.partner!.createdAt).toISOString(), updatedAt: new Date(res.partner!.updatedAt).toISOString() }])
                setShowForm(false)
                setEditing(null)
              } else {
                alert(`Failed to add partner: ${res.error || 'Unknown error'}`)
              }
            }
          }}
        />
      )}
    </div>
  )
}

function PartnerFormModal({ partner, regions, onClose, onSave }: { partner: Partner | null, regions: string[], onClose: () => void, onSave: (data: any) => Promise<void> }) {
  const [form, setForm] = useState({
    name: partner?.name ?? '',
    address: partner?.address ?? '',
    region: partner?.region ?? regions[0],
    country: partner?.country ?? '',
    website: partner?.website ?? '',
    email: partner?.email ?? '',
    isActive: partner?.isActive ?? true,
    order: partner?.order ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { await onSave(form) } finally { setSaving(false) } }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000, padding: 20 }}>
      <div style={{ background: '#FFF', borderRadius: 14, width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: 0 }}>{partner ? 'Edit Partner' : 'Add Partner'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94A3B8' }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '20px 24px', display: 'grid', gap: 14 }}>
            {([
              { label: 'Partner Name', key: 'name', required: true },
              { label: 'Address', key: 'address', required: true },
              { label: 'Country', key: 'country', required: true },
              { label: 'Website URL', key: 'website', required: false },
              { label: 'Email', key: 'email', type: 'email', required: false },
            ] as const).map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 5 }}>
                  {f.label}{f.required && <span style={{ color: '#DC2626', marginLeft: 2 }}>*</span>}
                </label>
                <input type={'type' in f ? f.type : 'text'} required={f.required} value={form[f.key] as string} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #D1D5DB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Region <span style={{ color: '#DC2626' }}>*</span></label>
              <select required value={form.region} onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #D1D5DB', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }}>
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Active</span>
            </label>
          </div>
          <div style={{ padding: '14px 24px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '9px 18px', background: 'transparent', color: '#1B3A6B', border: '1.5px solid #BFDBFE', borderRadius: 7, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 18px', background: saving ? '#94A3B8' : '#1B3A6B', color: '#FFF', border: 'none', borderRadius: 7, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
              {saving ? 'Saving...' : partner ? 'Update' : 'Add Partner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
