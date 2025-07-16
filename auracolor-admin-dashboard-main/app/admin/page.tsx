'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import EditableAdminDashboard from './components/EditableAdminDashboard'
import EnhancedAdminDashboard from './components/EnhancedAdminDashboard'
import TicketDashboard from './components/TicketDashboard'
import ModernAdminDashboard from './components/ModernAdminDashboard'
import UnifiedDashboard from './components/UnifiedDashboard'

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
        window.location.href = '/login'
        return
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role === 'admin') {
        setIsAuthenticated(true)
      } else {
        alert('Admin access required')
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      window.location.href = '/login'
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          onClick={() => window.location.href = '/admin?view=standard'}
        >
          Standard Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={() => window.location.href = '/admin?view=enhanced'}
        >
          Enhanced Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => window.location.href = '/admin?view=tickets'}
        >
          Ticket Management
        </button>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => window.location.href = '/admin?view=modern'}
        >
          Modern Dashboard
        </button>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-semibold"
          onClick={() => window.location.href = '/admin?view=unified'}
        >
          🚀 Unified Dashboard
        </button>
      </div>
      {(() => {
        const view = new URLSearchParams(window.location.search).get('view')
        if (view === 'enhanced') return <EnhancedAdminDashboard />
        if (view === 'tickets') return <TicketDashboard />
        if (view === 'modern') return <ModernAdminDashboard />
        if (view === 'unified') return <UnifiedDashboard />
        return <EditableAdminDashboard />
      })()}
    </div>
  )
}