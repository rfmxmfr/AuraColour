import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useEffect, useState } from  'apos;apos;reactt'apos;apos;

import { createClient } from  'apos;apos;@/lib/supabase/clientt'apos;apos;

import Footer from  'apos;apos;../components/footerr'apos;apos;
import Navbar from  'apos;apos;../components/navbarr'apos;apos;
import UserDashboard from  'apos;apos;../components/UserDashboardd'apos;apos;

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        window.location.href =  'apos;apos;/login?redirect=/dashboardd'apos;apos;
        return
      }

      setIsAuthenticated(true)
    } catch (error) {
      // logger.error(('apos;apos;Auth check failed::'apos;apos;, error)
      window.location.href =  'apos;apos;/login?redirect=/dashboardd'apos;apos;
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <UserDashboard />
        </div>
      </div>
      <Footer />
    </div>
  )
}