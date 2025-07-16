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
}

export default function SingleAdminDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [draggedTicket, setDraggedTicket] = useState<Ticket | null>(null)
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    inProgressTickets: 0,
    completedTickets: 0
  })

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
      
      const ticketData = data || []
      setTickets(ticketData)
      
      setStats({
        totalTickets: ticketData.length,
        pendingTickets: ticketData.filter(t => t.status === 'pending').length,
        inProgressTickets: ticketData.filter(t => t.status === 'in_progress').length,
        completedTickets: ticketData.filter(t => t.status === 'completed').length
      })
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

  const startAnalysis = async (ticketId: string) => {
    try {
      const response = await fetch('/api/analyze-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId })
      })
      
      const result = await response.json()
      if (result.success) {
        alert('AI Analysis completed!')
        fetchTickets()
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    }
  }

  const statusColumns = [
    { key: 'pending', title: 'Open', color: 'bg-yellow-100 border-yellow-300', tickets: tickets.filter(t => t.status === 'pending') },
    { key: 'in_progress', title: 'In Progress', color: 'bg-blue-100 border-blue-300', tickets: tickets.filter(t => t.status === 'in_progress') },
    { key: 'completed', title: 'Resolved', color: 'bg-green-100 border-green-300', tickets: tickets.filter(t => t.status === 'completed') },
    { key: 'cancelled', title: 'Cancelled', color: 'bg-red-100 border-red-300', tickets: tickets.filter(t => t.status === 'cancelled') }
  ]

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AuraColor Admin Dashboard</h1>
            <p className="text-gray-600">Complete ticket management and analytics</p>
          </div>
          <button
            onClick={fetchTickets}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Refresh Data
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTickets}</p>
              </div>
              <div className="text-4xl">🎫</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingTickets}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{stats.inProgressTickets}</p>
              </div>
              <div className="text-4xl">🔄</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedTickets}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Ticket Management Board</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statusColumns.map(column => (
              <div
                key={column.key}
                className={`${column.color} rounded-lg border-2 border-dashed p-4 min-h-96`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.key)}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">{column.title}</h3>
                  <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                    {column.tickets.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {column.tickets.map(ticket => (
                    <div
                      key={ticket.id}
                      draggable
                      onDragStart={() => handleDragStart(ticket)}
                      onClick={() => setSelectedTicket(ticket)}
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            startAnalysis(ticket.id)
                          }}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs hover:bg-purple-200"
                        >
                          Analyze
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Details Panel */}
        {selectedTicket && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Ticket Details</h2>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Ticket:</span> {selectedTicket.ticket_number}</p>
                  <p><span className="font-medium">Name:</span> {selectedTicket.customer_name}</p>
                  <p><span className="font-medium">Email:</span> {selectedTicket.customer_email}</p>
                  <p><span className="font-medium">Service:</span> {selectedTicket.service_type}</p>
                  <p><span className="font-medium">Status:</span> {selectedTicket.status}</p>
                  <p><span className="font-medium">Priority:</span> {selectedTicket.priority}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => startAnalysis(selectedTicket.id)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                  >
                    Start AI Analysis
                  </button>
                  <button
                    onClick={() => updateTicketStatus(selectedTicket.id, 'completed')}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    Mark as Resolved
                  </button>
                  <button
                    onClick={() => alert('Email functionality coming soon!')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Models Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Models Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'OpenAI GPT-4V', accuracy: '89.2%', status: 'Active', color: 'green' },
              { name: 'Google Gemini', accuracy: '85.7%', status: 'Active', color: 'green' },
              { name: 'Custom ML Model', accuracy: '91.4%', status: 'Active', color: 'green' }
            ].map((model, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">{model.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    model.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {model.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{model.accuracy}</p>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}