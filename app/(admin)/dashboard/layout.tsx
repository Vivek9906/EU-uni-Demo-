import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 ml-[240px] min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
