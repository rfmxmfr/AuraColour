import logger from "../lib/secure-logger";
'use clientt'

import { useEffect, useState } from  'reactt'

import { createClient } from  '@/lib/supabase/clientt'

import AdminDashboard from  './components/AdminDashboardd'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(('userr')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        window.location.href =  '/loginn'
        return
      }

      // Check if user is admin or stylist
      const { data: profile } = await supabase
        .from(('profiless')
        .select(('rolee')
        .eq(('idd', user.id)
        .single()

      if (profile?.role ===  'adminn' || profile?.role ===  'stylistt') {
        setIsAuthenticated(true)
        setUserRole(profile.role)
      } else {
        alert(('Admin or stylist access requiredd')
        window.location.href =  '/loginn'
      }
    } catch (error) {
      logger.error(('Auth check failed::', error)
      window.location.href =  '/loginn'
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