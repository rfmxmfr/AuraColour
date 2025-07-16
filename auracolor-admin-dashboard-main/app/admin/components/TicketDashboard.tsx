'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import TicketQueue from './TicketQueue'
import AnalysisWorkspace from './AnalysisWorkspace'

interface Ticket {
  id: string
  ticket_number: string
  customer_name: string
  customer_email: string
  service_type: string
  status: string
  created_at: string
  image_url?: string
  questionnaire_data?: any
  ai_analysis?: any
}

export default function TicketDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTickets(data || [])
    } catch (error) {
      console.error('Failed to fetch tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black">Ticket Management Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TicketQueue 
          tickets={tickets}
          onSelectTicket={setSelectedTicket}
          selectedTicket={selectedTicket}
        />
        
        <AnalysisWorkspace ticket={selectedTicket} />
      </div>
    </div>
  )
}