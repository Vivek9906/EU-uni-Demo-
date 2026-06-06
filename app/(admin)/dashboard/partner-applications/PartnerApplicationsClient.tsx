'use client'

import { useState, useTransition } from 'react'
import { approveApplication, rejectApplication, deleteApplication } from './actions'

interface PartnerApp {
  id: string
  name: string
  organization: string
  email: string
  phone?: string | null
  country?: string | null
  partnershipType?: string | null
  message?: string | null
  status: string
  createdAt: string
  updatedAt: string
  reviewedAt?: string | null
}

export function PartnerApplicationsClient({ applications: initial }: { applications: PartnerApp[] }) {
  const [apps, setApps] = useState(initial)
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')
  const [isPending, start] = useTransition()

  const filtered = tab === 'all' ? apps : apps.filter(a => a.status === tab)
  const counts = { pending: apps.filter(a => a.status === 'pending').length, approved: apps.filter(a => a.status === 'approved').length, rejected: apps.filter(a => a.status === 'rejected').length }

  const [selectedApp, setSelectedApp] = useState<PartnerApp | null>(null)

  const handleApprove = (id: string) => start(async () => {
    await approveApplication(id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a))
  })

  const handleReject = (id: string) => start(async () => {
    await rejectApplication(id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a))
  })

  const handleDelete = (id: string, org: string) => {
    if (!confirm(`Delete application from "${org}"?`)) return
    start(async () => {
      await deleteApplication(id)
      setApps(prev => prev.filter(a => a.id !== id))
    })
  }

  const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#FEF3C7', color: '#92400E' },
    approved: { bg: '#D1FAE5', color: '#065F46' },
    rejected: { bg: '#FEE2E2', color: '#991B1B' },
  }

  return (
    <div>
      <div style={{ background: '#FFF', borderBottom: '1px solid #E2E8F0', padding: '20px 28px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: 0 }}>Partnership Applications</h1>
        <p style={{ color: '#64748B', fontSize: 13, margin: '4px 0 0' }}>{counts.pending} pending review</p>
      </div>

      <div style={{ padding: '24px 28px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid #E2E8F0', marginBottom: 24 }}>
          {([['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected'], ['all', 'All']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: '10px 18px', background: 'none', border: 'none', fontSize: 13.5, fontWeight: tab === key ? 700 : 500, color: tab === key ? '#1B3A6B' : '#64748B', borderBottom: `2px solid ${tab === key ? '#E09900' : 'transparent'}`, marginBottom: -2, cursor: 'pointer', fontFamily: 'inherit' }}>
              {label} {key !== 'all' && `(${counts[key as keyof typeof counts]})`}
            </button>
          ))}
        </div>

        <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
              <div style={{ fontWeight: 700 }}>No {tab === 'all' ? '' : tab} applications</div>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Organization', 'Contact', 'Email', 'Type', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '13px 16px', fontWeight: 700, color: '#0F172A', fontSize: 13.5 }}>{a.organization}</td>
                    <td style={{ padding: '13px 16px', color: '#374151', fontSize: 13 }}>{a.name}</td>
                    <td style={{ padding: '13px 16px' }}><a href={`mailto:${a.email}`} style={{ color: '#1B3A6B', fontSize: 12.5 }}>{a.email}</a></td>
                    <td style={{ padding: '13px 16px', color: '#64748B', fontSize: 12.5 }}>{a.partnershipType ?? '—'}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: STATUS_STYLES[a.status]?.bg, color: STATUS_STYLES[a.status]?.color }}>
                        {a.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#94A3B8', fontSize: 12 }}>
                      {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(a.createdAt))}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: 5 }}>
                        <button onClick={() => setSelectedApp(a)} style={{ padding: '5px 10px', background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', borderRadius: 5, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>View</button>
                        {a.status === 'pending' && <>
                          <button onClick={() => handleApprove(a.id)} disabled={isPending} style={{ padding: '5px 10px', background: '#D1FAE5', color: '#065F46', border: '1px solid #A7F3D0', borderRadius: 5, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>Approve</button>
                          <button onClick={() => handleReject(a.id)} disabled={isPending} style={{ padding: '5px 10px', background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA', borderRadius: 5, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>Reject</button>
                        </>}
                        <button onClick={() => handleDelete(a.id, a.organization)} disabled={isPending} style={{ padding: '5px 10px', background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 5, fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* View Modal */}
      {selectedApp && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ background: '#FFF', borderRadius: 12, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>Application Details</h2>
              <button onClick={() => setSelectedApp(null)} style={{ background: 'none', border: 'none', fontSize: 24, color: '#64748B', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            
            <div style={{ padding: '24px 28px', display: 'grid', gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Organization</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A' }}>{selectedApp.organization}</div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Contact Person</div>
                  <div style={{ fontSize: 15, color: '#1E293B' }}>{selectedApp.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Email Address</div>
                  <div style={{ fontSize: 15, color: '#1E293B' }}><a href={`mailto:${selectedApp.email}`} style={{ color: '#1B3A6B' }}>{selectedApp.email}</a></div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Phone Number</div>
                  <div style={{ fontSize: 15, color: '#1E293B' }}>{selectedApp.phone || '—'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Country</div>
                  <div style={{ fontSize: 15, color: '#1E293B' }}>{selectedApp.country || '—'}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Partnership Type</div>
                <div style={{ fontSize: 15, color: '#1E293B' }}>{selectedApp.partnershipType || '—'}</div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Message / Proposal</div>
                <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, background: '#F8FAFC', padding: 16, borderRadius: 8, border: '1px solid #E2E8F0', whiteSpace: 'pre-wrap' }}>
                  {selectedApp.message || 'No additional message provided.'}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, paddingTop: 16, borderTop: '1px solid #E2E8F0', marginTop: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Status</div>
                  <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: STATUS_STYLES[selectedApp.status]?.bg, color: STATUS_STYLES[selectedApp.status]?.color, display: 'inline-block' }}>
                    {selectedApp.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Submitted On</div>
                  <div style={{ fontSize: 14, color: '#1E293B' }}>{new Date(selectedApp.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '16px 28px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setSelectedApp(null)} style={{ padding: '8px 16px', background: '#FFF', color: '#64748B', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Close</button>
              {selectedApp.status === 'pending' && (
                <>
                  <button onClick={() => { handleApprove(selectedApp.id); setSelectedApp(null); }} disabled={isPending} style={{ padding: '8px 16px', background: '#10B981', color: '#FFF', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                  <button onClick={() => { handleReject(selectedApp.id); setSelectedApp(null); }} disabled={isPending} style={{ padding: '8px 16px', background: '#EF4444', color: '#FFF', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
