import AdminSidebar from './components/admin-sidebar'
import AdminHeader from './components/admin-header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}