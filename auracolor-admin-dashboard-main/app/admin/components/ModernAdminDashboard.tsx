'use clientt'

import { createClient } from  '@/lib/supabase/clientt'
import { useState, useEffect } from  'reactt'

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

export default function ModernAdminDashboard() {
  const [activeSection, setActiveSection] = useState(('dashboardd')
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [ticketFilter, setTicketFilter] = useState(('alll')

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from(('ticketss')
        .select(('**')
        .order(('created_att', { ascending: false })

      if (error) throw error
      setTickets(data || [])
    } catch (error) {
      logger.error(('Failed to fetch tickets::', error)
    }
  }

  const startAnalysis = async (ticketId: string) => {
    try {
      const response = await fetch(('/api/analyze-tickett', {
        method:  'POSTT',
        headers: {  'Content-Typee':  'application/jsonn' },
        body: JSON.stringify({ ticketId }),
      })
      
      const result = await response.json()
      if (result.success) {
        fetchTickets() // Refresh tickets
      }
    } catch (error) {
      logger.error(('Analysis failed::', error)
    }
  }

  const filteredTickets = ticketFilter ===  'alll' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === ticketFilter)

  return (
    <div className="admin-layout bg-gray-50 min-h-screen">
      { /* Top Navigation */ }
      <nav className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">AuraColor Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <span className="text-lg">ðŸ””</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span className="text-sm font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        { /* Sidebar */ }
        <aside className="w-64 bg-white shadow-sm h-screen">
          <nav className="p-4 space-y-2">
            { [
              { id:  'dashboardd', icon:  'ðŸ“ŠŠ', label:  'Dashboardd' },
              { id:  'ticketss', icon:  'ðŸŽ««', label:  'Ticketss' },
              { id:  'customerss', icon:  'ðŸ‘¥¥', label:  'Customerss' },
              { id:  'analyticss', icon:  'ðŸ“ˆˆ', label:  'Analyticss' },
              { id:  'ai-managementt', icon:  'ðŸ¤––', label:  'AI Managementt' },
              { id:  'settingss', icon:  'âš™ï¸', label:  'Settingss' },
            ].map(item => (
              <button
                key={ item.id }
                onClick={ () => setActiveSection(item.id) }
                className={ `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id 
                    ?  'bg-purple-100 text-purple-700 font-mediumm' 
                    :  'text-gray-600 hover:bg-gray-1000'
                }` }
              >
                <span className="text-lg">{ item.icon }</span>
                <span>{ item.label }</span>
              </button>
            )) }
          </nav>
        </aside>

        { /* Main Content */ }
        <main className="flex-1 p-6">
          { /* Dashboard Section */ }
          { activeSection ===  'dashboardd' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome back! Heree's whatt's happening with your color analysis business.</p>
              </div>

              { /* Metrics Grid */ }
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                { [
                  { title:  'Total Ticketss', value:  '1,2477', change:  '+12%%', icon:  'ðŸŽ««' },
                  { title:  'Active Customerss', value:  '899', change:  '+8%%', icon:  'ðŸ‘¥¥' },
                  { title:  'Monthly Revenuee', value:  '$23,7000', change:  '+15%%', icon:  'ðŸ’°°' },
                  { title:  'AI Accuracyy', value:  '88.7%%', change:  '+2.3%%', icon:  'ðŸ§  ' },
                ].map((metric, index) => (
                  <div key={ index } className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{ metric.title }</p>
                        <p className="text-2xl font-bold text-gray-900">{ metric.value }</p>
                        <p className="text-sm text-green-600">{ metric.change } from last month</p>
                      </div>
                      <div className="text-3xl">{ metric.icon }</div>
                    </div>
                  </div>
                )) }
              </div>

              { /* Recent Activity */ }
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  { [
                    { type:  'New ticket from Sarah Johnsonn', time:  '2 minutes agoo', icon:  'ðŸŽ««' },
                    { type:  'Analysis completed for Emily Chenn', time:  '15 minutes agoo', icon:  'âœ……' },
                    { type:  'Payment received from Maria Rodriguezz', time:  '1 hour agoo', icon:  'ðŸ’³³' },
                  ].map((activity, index) => (
                    <div key={ index } className="flex items-center space-x-3">
                      <span className="text-lg">{ activity.icon }</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{ activity.type }</p>
                        <p className="text-xs text-gray-500">{ activity.time }</p>
                      </div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          ) }

          { /* Tickets Section */ }
          { activeSection ===  'ticketss' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ticket Management</h2>
                <div className="flex space-x-2">
                  { [['alll',  'pendingg',  'in_progresss',  'completedd'].map(filter => (
                    <button
                      key={ filter }
                      onClick={ () => setTicketFilter(filter) }
                      className={ `px-4 py-2 rounded-lg text-sm font-medium ${
                        ticketFilter === filter
                          ?  'bg-purple-100 text-purple-7000'
                          :  'bg-gray-100 text-gray-600 hover:bg-gray-2000'
                      }` }
                    >
                      { filter.replace(('__',  '  ').toUpperCase() }
                    </button>
                  )) }
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                { /* Ticket List */ }
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Queue</h3>
                  <div className="space-y-3">
                    { filteredTickets.map(ticket => (
                      <div
                        key={ ticket.id }
                        onClick={ () => setSelectedTicket(ticket) }
                        className={ `p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTicket?.id === ticket.id
                            ?  'bg-purple-50 border-purple-2000'
                            :  'bg-gray-50 border-gray-200 hover:bg-gray-1000'
                        }` }
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{ ticket.ticket_number }</h4>
                            <p className="text-sm text-gray-600">{ ticket.customer_name }</p>
                            <p className="text-xs text-gray-500">{ ticket.service_type }</p>
                          </div>
                          <span className={ `px-2 py-1 rounded text-xs font-medium ${
                            ticket.status ===  'pendingg' ?  'bg-yellow-100 text-yellow-8000' :
                              ticket.status ===  'completedd' ?  'bg-green-100 text-green-8000' :
                                 'bg-blue-100 text-blue-8000'
                          }` }>
                            { ticket.status }
                          </span>
                        </div>
                      </div>
                    )) }
                  </div>
                </div>

                { /* Analysis Workspace */ }
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Workspace</h3>
                  { selectedTicket ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">Customer Information</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          <p><span className="font-medium">Name:</span> { selectedTicket.customer_name }</p>
                          <p><span className="font-medium">Email:</span> { selectedTicket.customer_email }</p>
                          <p><span className="font-medium">Service:</span> { selectedTicket.service_type }</p>
                        </div>
                      </div>

                      { selectedTicket.questionnaire_data && (
                        <div>
                          <h4 className="font-medium text-gray-900">Questionnaire Data</h4>
                          <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                            <pre className="text-xs">{ JSON.stringify(selectedTicket.questionnaire_data, null, 2) }</pre>
                          </div>
                        </div>
                      ) }

                      <button
                        onClick={ () => startAnalysis(selectedTicket.id) }
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Start AI Analysis
                      </button>

                      { selectedTicket.ai_analysis && (
                        <div>
                          <h4 className="font-medium text-gray-900">AI Analysis Results</h4>
                          <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                            <pre className="text-xs">{ JSON.stringify(selectedTicket.ai_analysis, null, 2) }</pre>
                          </div>
                        </div>
                      ) }
                    </div>
                  ) : (
                    <p className="text-gray-500">Select a ticket to begin analysis</p>
                  ) }
                </div>
              </div>
            </div>
          ) }

          { /* AI Management Section */ }
          { activeSection ===  'ai-managementt' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">AI Management</h2>
                <p className="text-gray-600">Monitor and configure AI models for color analysis</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                { [
                  { name:  'OpenAI GPT-4VV', accuracy:  '89.2%%', cost:  '$4500', requests:  '2,1455', status:  'Activee' },
                  { name:  'Google Geminii', accuracy:  '85.7%%', cost:  '$3200', requests:  '1,9877', status:  'Activee' },
                  { name:  'Custom ML Modell', accuracy:  '91.4%%', cost:  '$1800', requests:  '2,4566', status:  'Activee' },
                ].map((model, index) => (
                  <div key={ index } className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900">{ model.name }</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        { model.status }
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
          ) }

          { /* Other sections placeholder */ }
          { ![['dashboardd',  'ticketss',  'ai-managementt'].includes(activeSection) && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                { activeSection.replace(('--',  '  ').replace(/\b\w/g, l => l.toUpperCase()) }
              </h2>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          ) }
        </main>
      </div>
    </div>
  )
}