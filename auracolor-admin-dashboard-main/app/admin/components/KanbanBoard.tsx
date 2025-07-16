'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Ticket {
  id: string
  ticket_number: string
  customer_name: string
  customer_email: string
  service_type: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  created_at: string
  assigned_to?: string
}

const statusColumns = {
  pending: { title: 'Open', color: 'bg-yellow-100 border-yellow-300' },
  in_progress: { title: 'In Progress', color: 'bg-blue-100 border-blue-300' },
  completed: { title: 'Resolved', color: 'bg-green-100 border-green-300' },
  cancelled: { title: 'Cancelled', color: 'bg-red-100 border-red-300' }
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700'
}

export default function KanbanBoard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [draggedTicket, setDraggedTicket] = useState<Ticket | null>(null)
  const [groupBy, setGroupBy] = useState<'status' | 'priority'>('status')

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
    }
  }

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('tickets')
        .update({ status: newStatus })
        .eq('id', ticketId)

      if (error) throw error
      fetchTickets()
    } catch (error) {
      console.error('Failed to update ticket:', error)
    }
  }

  const handleDragStart = (ticket: Ticket) => {
    setDraggedTicket(ticket)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (draggedTicket && draggedTicket.status !== newStatus) {
      updateTicketStatus(draggedTicket.id, newStatus)
    }
    setDraggedTicket(null)
  }

  const getTicketsByGroup = (groupValue: string) => {
    return tickets.filter(ticket => 
      groupBy === 'status' ? ticket.status === groupValue : ticket.priority === groupValue
    )
  }

  const getColumns = () => {
    if (groupBy === 'status') {
      return Object.entries(statusColumns)
    }
    return [
      ['high', { title: 'High Priority', color: 'bg-red-100 border-red-300' }],
      ['medium', { title: 'Medium Priority', color: 'bg-yellow-100 border-yellow-300' }],
      ['low', { title: 'Low Priority', color: 'bg-gray-100 border-gray-300' }]
    ]
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Kanban Ticket Management</h2>
        <div className="flex items-center space-x-4">
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'status' | 'priority')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="status">Group by Status</option>
            <option value="priority">Group by Priority</option>
          </select>
          <button
            onClick={fetchTickets}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getColumns().map(([key, column]) => (
          <div
            key={key}
            className={`${column.color} rounded-lg border-2 border-dashed p-4 min-h-96`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, key)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">{column.title}</h3>
              <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                {getTicketsByGroup(key).length}
              </span>
            </div>

            <div className="space-y-3">
              {getTicketsByGroup(key).map(ticket => (
                <div
                  key={ticket.id}
                  draggable
                  onDragStart={() => handleDragStart(ticket)}
                  className="bg-white p-4 rounded-lg shadow-sm border cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-purple-600">
                      {ticket.ticket_number}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-1">
                    {ticket.customer_name}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {ticket.service_type}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                    {ticket.assigned_to && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {ticket.assigned_to}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-600">Total Tickets</h4>
          <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-600">Open</h4>
          <p className="text-2xl font-bold text-yellow-600">
            {tickets.filter(t => t.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-600">In Progress</h4>
          <p className="text-2xl font-bold text-blue-600">
            {tickets.filter(t => t.status === 'in_progress').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-600">Resolved</h4>
          <p className="text-2xl font-bold text-green-600">
            {tickets.filter(t => t.status === 'completed').length}
          </p>
        </div>
      </div>
    </div>
  )
}