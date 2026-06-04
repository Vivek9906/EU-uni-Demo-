'use client'

import { useState, useTransition } from 'react'
import { Settings, Save, Loader2, AlertTriangle, Shield } from 'lucide-react'
import { toggleMaintenanceMode } from './actions'

interface Props {
  settings: {
    isMaintenanceMode: boolean
    maintenanceMessage: string
  }
}

export function SettingsClient({ settings: initial }: Props) {
  const [maintenance, setMaintenance] = useState(initial.isMaintenanceMode)
  const [message, setMessage] = useState(initial.maintenanceMessage)
  const [isPending, start] = useTransition()
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // General settings (static for now)
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'EU American University',
    contactEmail: 'contact@euamericanuniversity.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 University Ave, New York, NY 10001',
  })

  const handleMaintenanceToggle = () => start(async () => {
    const newState = !maintenance
    await toggleMaintenanceMode(newState, message)
    setMaintenance(newState)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  })

  const handleSaveMessage = () => start(async () => {
    await toggleMaintenanceMode(maintenance, message)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  })

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 800)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="text-amber-500" /> Site Settings
        </h1>
        {saved && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-200">
            ✓ Saved successfully
          </div>
        )}
      </div>

      {/* ── Maintenance Mode Section ── */}
      <div
        className="bg-white rounded-xl border shadow-sm overflow-hidden"
        style={{ borderColor: maintenance ? '#DC2626' : '#E2E8F0', borderLeft: `4px solid ${maintenance ? '#DC2626' : '#059669'}` }}
      >
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            {maintenance ? <AlertTriangle className="text-red-500" size={22} /> : <Shield className="text-emerald-500" size={22} />}
            <h2 className="text-lg font-bold text-slate-900">Maintenance Mode</h2>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">
                {maintenance
                  ? '⚠️ Website is currently in maintenance mode. Visitors will see a maintenance banner.'
                  : '✅ Website is live and accessible to all visitors.'}
              </p>
            </div>
            <button
              onClick={handleMaintenanceToggle}
              disabled={isPending}
              className={`shrink-0 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 border ${
                maintenance
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              } disabled:opacity-50`}
            >
              {isPending ? 'Updating...' : maintenance ? 'Disable Maintenance' : 'Enable Maintenance'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Maintenance Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="Message shown to visitors during maintenance..."
            />
            <button
              onClick={handleSaveMessage}
              disabled={isPending}
              className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              Save Message
            </button>
          </div>
        </div>
      </div>

      {/* ── General Information ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSaveGeneral} className="p-8 space-y-8">
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Site Name</label>
                <input
                  type="text"
                  value={generalSettings.siteName}
                  onChange={e => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Contact Email</label>
                <input
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={e => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={generalSettings.phoneNumber}
                  onChange={e => setGeneralSettings({ ...generalSettings, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Address</label>
                <input
                  type="text"
                  value={generalSettings.address}
                  onChange={e => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSaving ? 'Saving Settings...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
