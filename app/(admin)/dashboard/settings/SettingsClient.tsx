'use client'

import { useState, useTransition } from 'react'
import { Settings, AlertTriangle, Shield } from 'lucide-react'
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
    </div>
  )
}
