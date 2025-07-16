'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import KanbanBoard from './KanbanBoard'

interface DashboardStats {
  totalTickets: number
  totalCustomers: number
  monthlyRevenue: number
  aiAccuracy: number
  pendingTickets: number
  completedTickets: number
}

export default function UnifiedDashboard() {
  const [activeModule, setActiveModule] = useState('overview')
  const [stats, setStats] = useState<DashboardStats>({
    totalTickets: 0,
    totalCustomers: 0,
    monthlyRevenue: 0,
    aiAccuracy: 88.7,
    pendingTickets: 0,
    completedTickets: 0
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const supabase = createClient()
      
      // Fetch tickets
      const { data: tickets } = await supabase.from('tickets').select('*')
      
      // Fetch bookings for revenue calculation
      const { data: bookings } = await supabase.from('bookings').select('*')
      
      setStats({
        totalTickets: tickets?.length || 0,
        totalCustomers: new Set(tickets?.map(t => t.customer_email)).size || 0,
        monthlyRevenue: 23700, // Mock data
        aiAccuracy: 88.7,
        pendingTickets: tickets?.filter(t => t.status === 'pending').length || 0,
        completedTickets: tickets?.filter(t => t.status === 'completed').length || 0
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    }
  }

  const modules = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'kanban', name: 'Kanban Board', icon: '📋' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'ai-tools', name: 'AI Tools', icon: '🤖' },
    { id: 'customers', name: 'Customers', icon: '👥' },
    { id: 'reports', name: 'Reports', icon: '📄' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTickets}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="text-4xl">🎫</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">{stats.aiAccuracy}%</p>
              <p className="text-sm text-green-600">+2.3% from last month</p>
            </div>
            <div className="text-4xl">🧠</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveModule('kanban')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm font-medium">Manage Tickets</div>
          </button>
          <button
            onClick={() => setActiveModule('ai-tools')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-medium">AI Analysis</div>
          </button>
          <button
            onClick={() => setActiveModule('reports')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm font-medium">Generate Report</div>
          </button>
          <button
            onClick={() => setActiveModule('customers')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium">View Customers</div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="text-lg">🎫</div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">New ticket from Sarah Johnson</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-lg">✅</div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Analysis completed for Emily Chen</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-lg">💳</div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Payment received from Maria Rodriguez</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAITools = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">AI Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'OpenAI GPT-4V', accuracy: '89.2%', cost: '$450', requests: '2,145' },
          { name: 'Google Gemini', accuracy: '85.7%', cost: '$320', requests: '1,987' },
          { name: 'Custom ML Model', accuracy: '91.4%', cost: '$180', requests: '2,456' }
        ].map((model, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{model.name}</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                Active
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-medium">{model.accuracy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Cost:</span>
                <span className="font-medium">{model.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Requests:</span>
                <span className="font-medium">{model.requests}</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200">
                Configure
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50">
                View Logs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return renderOverview()
      case 'kanban':
        return <KanbanBoard />
      case 'ai-tools':
        return renderAITools()
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {modules.find(m => m.id === activeModule)?.name}
            </h2>
            <p className="text-gray-600">This module is under development.</p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">AuraColor Admin</h1>
          <p className="text-sm text-gray-600">Unified Dashboard</p>
        </div>
        <nav className="px-4 space-y-2">
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeModule === module.id
                  ? 'bg-purple-100 text-purple-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{module.icon}</span>
              <span>{module.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderModule()}
        </div>
      </div>
    </div>
  )
}