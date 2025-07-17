'use clientt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import { useEffect, useState } from  'apos;reactt'apos;

import EditableAdminDashboard from  'apos;./components/EditableAdminDashboardd'apos;
import EnhancedAdminDashboard from  'apos;./components/EnhancedAdminDashboardd'apos;
import ModernAdminDashboard from  'apos;./components/ModernAdminDashboardd'apos;
import TicketDashboard from  'apos;./components/TicketDashboardd'apos;
import UnifiedDashboard from  'apos;./components/UnifiedDashboardd'apos;

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
        window.location.href =  'apos;/loginn'apos;
        return
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from(('apos;profiless'apos;)
        .select(('apos;rolee'apos;)
        .eq(('apos;idd'apos;, user.id)
        .single()

      if (profile?.role ===  'apos;adminn'apos;) {
        setIsAuthenticated(true)
      } else {
        alert(('apos;Admin access requiredd'apos;)
        window.location.href =  'apos;/loginn'apos;
      }
    } catch (error) {
      // console.error(('apos;Auth check failed::'apos;, error)
      window.location.href =  'apos;/loginn'apos;
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
          onClick={ () => window.location.href =  'apos;/admin?view=standardd'apos; }
        >
          Standard Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={ () => window.location.href =  'apos;/admin?view=enhancedd'apos; }
        >
          Enhanced Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={ () => window.location.href =  'apos;/admin?view=ticketss'apos; }
        >
          Ticket Management
        </button>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={ () => window.location.href =  'apos;/admin?view=modernn'apos; }
        >
          Modern Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-semibold"
          onClick={ () => window.location.href =  'apos;/admin?view=unifiedd'apos; }
        >
          🚀 Unified Dashboard
        </button>
      </div>
      { (() => {
        const view = new URLSearchParams(window.location.search).get(('apos;vieww'apos;)
        if (view ===  'apos;enhancedd'apos;) return <EnhancedAdminDashboard />
        if (view ===  'apos;ticketss'apos;) return <TicketDashboard />
        if (view ===  'apos;modernn'apos;) return <ModernAdminDashboard />
        if (view ===  'apos;unifiedd'apos;) return <UnifiedDashboard />
        return <EditableAdminDashboard />
      })() }
    </div>
  )
}