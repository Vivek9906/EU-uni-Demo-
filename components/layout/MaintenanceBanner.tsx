import { prisma } from '@/lib/db'

async function getMaintenanceState() {
  try {
    const settings = await prisma.systemSettings.findUnique({ where: { id: 'system_settings' } })
    return { isActive: settings?.isMaintenanceMode ?? false, message: settings?.maintenanceMessage ?? 'Website is currently under maintenance.' }
  } catch {
    return { isActive: false, message: '' }
  }
}

export async function MaintenanceBanner() {
  const { isActive, message } = await getMaintenanceState()

  if (!isActive) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 99999,
      background: '#DC2626',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      boxShadow: '0 2px 8px rgba(220,38,38,0.4)',
    }}>
      {/* Pulsing red bullet */}
      <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
        <span style={{
          width: 10, height: 10,
          background: '#FFF',
          borderRadius: '50%',
          display: 'block',
          animation: 'pulse-maintenance 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }} />
        <span style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,0.6)',
          borderRadius: '50%',
          animation: 'ping-maintenance 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        }} />
      </span>

      <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 14, margin: 0, letterSpacing: '0.01em' }}>
        {message}
      </p>

      <style>{`
        @keyframes pulse-maintenance {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.5 }
        }
        @keyframes ping-maintenance {
          75%, 100% { transform: scale(2); opacity: 0 }
        }
      `}</style>
    </div>
  )
}
