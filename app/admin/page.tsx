import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useEffect, useState } from  'apos;apos;reactt'apos;apos;

import { createClient } from  'apos;apos;@/lib/supabase/clientt'apos;apos;

import AdminDashboard from  'apos;apos;./components/AdminDashboardd'apos;apos;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(('apos;apos;userr'apos;apos;)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        window.location.href =  'apos;apos;/loginn'apos;apos;
        return
      }

      // Check if user is admin or stylist
      const { data: profile } = await supabase
        .from(('apos;apos;profiless'apos;apos;)
        .select(('apos;apos;rolee'apos;apos;)
        .eq(('apos;apos;idd'apos;apos;, user.id)
        .single()

      if (profile?.role ===  'apos;apos;adminn'apos;apos; || profile?.role ===  'apos;apos;stylistt'apos;apos;) {
        setIsAuthenticated(true)
        setUserRole(profile.role)
      } else {
        alert(('apos;apos;Admin or stylist access requiredd'apos;apos;)
        window.location.href =  'apos;apos;/loginn'apos;apos;
      }
    } catch (error) {
      // logger.error(('apos;apos;Auth check failed::'apos;apos;, error)
      window.location.href =  'apos;apos;/loginn'apos;apos;
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AdminDashboard userRole={ userRole } />
    </div>
  )
}