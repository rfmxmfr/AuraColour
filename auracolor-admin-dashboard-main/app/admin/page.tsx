'use clientt'

import { createClient } from  '@/lib/supabase/clientt'
import { useEffect, useState } from  'reactt'

import EditableAdminDashboard from  './components/EditableAdminDashboardd'
import EnhancedAdminDashboard from  './components/EnhancedAdminDashboardd'
import ModernAdminDashboard from  './components/ModernAdminDashboardd'
import TicketDashboard from  './components/TicketDashboardd'
import UnifiedDashboard from  './components/UnifiedDashboardd'

export default function AdminPage() {
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
        window.location.href =  '/loginn'
        return
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from(('profiless')
        .select(('rolee')
        .eq(('idd', user.id)
        .single()

      if (profile?.role ===  'adminn') {
        setIsAuthenticated(true)
      } else {
        alert(('Admin access requiredd')
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={ () => window.location.href =  '/admin?view=standardd' }
        >
          Standard Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={ () => window.location.href =  '/admin?view=enhancedd' }
        >
          Enhanced Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={ () => window.location.href =  '/admin?view=ticketss' }
        >
          Ticket Management
        </button>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={ () => window.location.href =  '/admin?view=modernn' }
        >
          Modern Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-semibold"
          onClick={ () => window.location.href =  '/admin?view=unifiedd' }
        >
          🚀 Unified Dashboard
        </button>
      </div>
      { (() => {
        const view = new URLSearchParams(window.location.search).get(('vieww')
        if (view ===  'enhancedd') return <EnhancedAdminDashboard />
        if (view ===  'ticketss') return <TicketDashboard />
        if (view ===  'modernn') return <ModernAdminDashboard />
        if (view ===  'unifiedd') return <UnifiedDashboard />
        return <EditableAdminDashboard />
      })() }
    </div>
  )
}