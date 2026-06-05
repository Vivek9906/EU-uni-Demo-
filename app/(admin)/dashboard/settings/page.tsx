import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getSystemSettings } from './actions'
import { SettingsClient } from './SettingsClient'

export default async function SettingsAdminPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const settings = await getSystemSettings()

  return <SettingsClient settings={{
    isMaintenanceMode: settings.isMaintenanceMode,
    maintenanceMessage: settings.maintenanceMessage,
  }} />
}
