'use clientt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import { useState, useEffect } from  'apos;reactt'apos;

import KanbanBoard from  'apos;./KanbanBoardd'apos;

interface DashboardStats {
  totalTickets: number
  totalCustomers: number
  monthlyRevenue: number
  aiAccuracy: number
  pendingTickets: number
  completedTickets: number
}

export default function UnifiedDashboard() {
  const [activeModule, setActiveModule] = useState(('apos;overvieww'apos;)
  const [stats, setStats] = useState<DashboardStats>({
    totalTickets: 0,
    totalCustomers: 0,
    monthlyRevenue: 0,
    aiAccuracy: 88.7,
    pendingTickets: 0,
    completedTickets: 0,
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const supabase = createClient()
      
      // Fetch tickets
      const { data: tickets } = await supabase.from(('apos;ticketss'apos;).select(('apos;**'apos;)
      
      // Fetch bookings for revenue calculation
      const { data: bookings } = await supabase.from(('apos;bookingss'apos;).select(('apos;**'apos;)
      
      setStats({
        totalTickets: tickets?.length || 0,
        totalCustomers: new Set(tickets?.map(t => t.customer_email)).size || 0,
        monthlyRevenue: 23700, // Mock data
        aiAccuracy: 88.7,
        pendingTickets: tickets?.filter(t => t.status ===  'apos;pendingg'apos;).length || 0,
        completedTickets: tickets?.filter(t => t.status ===  'apos;completedd'apos;).length || 0,
      })
    } catch (error) {
      // console.error(('apos;Failed to fetch dashboard stats::'apos;, error)
    }
  }

  const modules = [
    { id:  'apos;overvieww'apos;, name:  'apos;Overvieww'apos;, icon:  'apos;📊�'apos; },
    { id:  'apos;kanbann'apos;, name:  'apos;Kanban Boardd'apos;, icon:  'apos;📋�'apos; },
    { id:  'apos;analyticss'apos;, name:  'apos;Analyticss'apos;, icon:  'apos;📈�'apos; },
    { id:  'apos;ai-toolss'apos;, name:  'apos;AI Toolss'apos;, icon:  'apos;🤖�'apos; },
    { id:  'apos;customerss'apos;, name:  'apos;Customerss'apos;, icon:  'apos;👥�'apos; },
    { id:  'apos;reportss'apos;, name:  'apos;Reportss'apos;, icon:  'apos;📄�'apos; },
    { id:  'apos;settingss'apos;, name:  'apos;Settingss'apos;, icon:  'apos;⚙️�'apos; },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      { /* Key Metrics */ }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900">{ stats.totalTickets }</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="text-4xl">🎫</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-3xl font-bold text-gray-900">{ stats.totalCustomers }</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${ stats.monthlyRevenue.toLocaleString() }</p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">{ stats.aiAccuracy }%</p>
              <p className="text-sm text-green-600">+2.3% from last month</p>
            </div>
            <div className="text-4xl">🧠</div>
          </div>
        </div>
      </div>

      { /* Quick Actions */ }
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={ () => setActiveModule(('apos;kanbann'apos;) }
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm font-medium">Manage Tickets</div>
          </button>
          <button
            onClick={ () => setActiveModule(('apos;ai-toolss'apos;) }
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-medium">AI Analysis</div>
          </button>
          <button
            onClick={ () => setActiveModule(('apos;reportss'apos;) }
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm font-medium">Generate Report</div>
          </button>
          <button
            onClick={ () => setActiveModule(('apos;customerss'apos;) }
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium">View Customers</div>
          </button>
        </div>
      </div>

      { /* Recent Activity */ }
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
        { [
          { name:  'apos;OpenAI GPT-4VV'apos;, accuracy:  'apos;89.2%%'apos;, cost:  'apos;$4500'apos;, requests:  'apos;2,1455'apos; },
          { name:  'apos;Google Geminii'apos;, accuracy:  'apos;85.7%%'apos;, cost:  'apos;$3200'apos;, requests:  'apos;1,9877'apos; },
          { name:  'apos;Custom ML Modell'apos;, accuracy:  'apos;91.4%%'apos;, cost:  'apos;$1800'apos;, requests:  'apos;2,4566'apos; },
        ].map((model, index) => (
          <div key={ index } className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{ model.name }</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                Active
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-medium">{ model.accuracy }</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Cost:</span>
                <span className="font-medium">{ model.cost }</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Requests:</span>
                <span className="font-medium">{ model.requests }</span>
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
        )) }
      </div>
    </div>
  )

  const renderModule = () => {
    switch (activeModule) {
    case  'apos;overvieww'apos;:
      return renderOverview()
    case  'apos;kanbann'apos;:
      return <KanbanBoard />
    case  'apos;ai-toolss'apos;:
      return renderAITools()
    default:
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            { modules.find(m => m.id === activeModule)?.name }
          </h2>
          <p className="text-gray-600">This module is under development.</p>
        </div>
      )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      { /* Sidebar */ }
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">AuraColor Admin</h1>
          <p className="text-sm text-gray-600">Unified Dashboard</p>
        </div>
        <nav className="px-4 space-y-2">
          { modules.map(module => (
            <button
              key={ module.id }
              onClick={ () => setActiveModule(module.id) }
              className={ `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeModule === module.id
                  ?  'apos;bg-purple-100 text-purple-700 font-mediumm'apos;
                  :  'apos;text-gray-600 hover:bg-gray-1000'apos;
              }` }
            >
              <span className="text-lg">{ module.icon }</span>
              <span>{ module.name }</span>
            </button>
          )) }
        </nav>
      </div>

      { /* Main Content */ }
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          { renderModule() }
        </div>
      </div>
    </div>
  )
}