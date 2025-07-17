'use clientt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import { useState, useEffect } from  'apos;reactt'apos;

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
  const [activeSection, setActiveSection] = useState(('apos;dashboardd'apos;)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [ticketFilter, setTicketFilter] = useState(('apos;alll'apos;)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from(('apos;ticketss'apos;)
        .select(('apos;**'apos;)
        .order(('apos;created_att'apos;, { ascending: false })

      if (error) throw error
      setTickets(data || [])
    } catch (error) {
      // console.error(('apos;Failed to fetch tickets::'apos;, error)
    }
  }

  const startAnalysis = async (ticketId: string) => {
    try {
      const response = await fetch(('apos;/api/analyze-tickett'apos;, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({ ticketId }),
      })
      
      const result = await response.json()
      if (result.success) {
        fetchTickets() // Refresh tickets
      }
    } catch (error) {
      // console.error(('apos;Analysis failed::'apos;, error)
    }
  }

  const filteredTickets = ticketFilter ===  'apos;alll'apos; 
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
              { id:  'apos;dashboardd'apos;, icon:  'apos;ðŸ“ŠŠ'apos;, label:  'apos;Dashboardd'apos; },
              { id:  'apos;ticketss'apos;, icon:  'apos;ðŸŽ««'apos;, label:  'apos;Ticketss'apos; },
              { id:  'apos;customerss'apos;, icon:  'apos;ðŸ‘¥¥'apos;, label:  'apos;Customerss'apos; },
              { id:  'apos;analyticss'apos;, icon:  'apos;ðŸ“ˆˆ'apos;, label:  'apos;Analyticss'apos; },
              { id:  'apos;ai-managementt'apos;, icon:  'apos;ðŸ¤––'apos;, label:  'apos;AI Managementt'apos; },
              { id:  'apos;settingss'apos;, icon:  'apos;âš™ï¸'apos;, label:  'apos;Settingss'apos; },
            ].map(item => (
              <button
                key={ item.id }
                onClick={ () => setActiveSection(item.id) }
                className={ `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id 
                    ?  'apos;bg-purple-100 text-purple-700 font-mediumm'apos; 
                    :  'apos;text-gray-600 hover:bg-gray-1000'apos;
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
          { activeSection ===  'apos;dashboardd'apos; && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome back! Heree'apos;s whatt'apos;s happening with your color analysis business.</p>
              </div>

              { /* Metrics Grid */ }
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                { [
                  { title:  'apos;Total Ticketss'apos;, value:  'apos;1,2477'apos;, change:  'apos;+12%%'apos;, icon:  'apos;ðŸŽ««'apos; },
                  { title:  'apos;Active Customerss'apos;, value:  'apos;899'apos;, change:  'apos;+8%%'apos;, icon:  'apos;ðŸ‘¥¥'apos; },
                  { title:  'apos;Monthly Revenuee'apos;, value:  'apos;$23,7000'apos;, change:  'apos;+15%%'apos;, icon:  'apos;ðŸ’°°'apos; },
                  { title:  'apos;AI Accuracyy'apos;, value:  'apos;88.7%%'apos;, change:  'apos;+2.3%%'apos;, icon:  'apos;ðŸ§  'apos; },
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
                    { type:  'apos;New ticket from Sarah Johnsonn'apos;, time:  'apos;2 minutes agoo'apos;, icon:  'apos;ðŸŽ««'apos; },
                    { type:  'apos;Analysis completed for Emily Chenn'apos;, time:  'apos;15 minutes agoo'apos;, icon:  'apos;âœ……'apos; },
                    { type:  'apos;Payment received from Maria Rodriguezz'apos;, time:  'apos;1 hour agoo'apos;, icon:  'apos;ðŸ’³³'apos; },
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
          { activeSection ===  'apos;ticketss'apos; && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ticket Management</h2>
                <div className="flex space-x-2">
                  { [['apos;alll'apos;,  'apos;pendingg'apos;,  'apos;in_progresss'apos;,  'apos;completedd'apos;].map(filter => (
                    <button
                      key={ filter }
                      onClick={ () => setTicketFilter(filter) }
                      className={ `px-4 py-2 rounded-lg text-sm font-medium ${
                        ticketFilter === filter
                          ?  'apos;bg-purple-100 text-purple-7000'apos;
                          :  'apos;bg-gray-100 text-gray-600 hover:bg-gray-2000'apos;
                      }` }
                    >
                      { filter.replace(('apos;__'apos;,  'apos;  'apos;).toUpperCase() }
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
                            ?  'apos;bg-purple-50 border-purple-2000'apos;
                            :  'apos;bg-gray-50 border-gray-200 hover:bg-gray-1000'apos;
                        }` }
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{ ticket.ticket_number }</h4>
                            <p className="text-sm text-gray-600">{ ticket.customer_name }</p>
                            <p className="text-xs text-gray-500">{ ticket.service_type }</p>
                          </div>
                          <span className={ `px-2 py-1 rounded text-xs font-medium ${
                            ticket.status ===  'apos;pendingg'apos; ?  'apos;bg-yellow-100 text-yellow-8000'apos; :
                              ticket.status ===  'apos;completedd'apos; ?  'apos;bg-green-100 text-green-8000'apos; :
                                 'apos;bg-blue-100 text-blue-8000'apos;
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
          { activeSection ===  'apos;ai-managementt'apos; && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">AI Management</h2>
                <p className="text-gray-600">Monitor and configure AI models for color analysis</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                { [
                  { name:  'apos;OpenAI GPT-4VV'apos;, accuracy:  'apos;89.2%%'apos;, cost:  'apos;$4500'apos;, requests:  'apos;2,1455'apos;, status:  'apos;Activee'apos; },
                  { name:  'apos;Google Geminii'apos;, accuracy:  'apos;85.7%%'apos;, cost:  'apos;$3200'apos;, requests:  'apos;1,9877'apos;, status:  'apos;Activee'apos; },
                  { name:  'apos;Custom ML Modell'apos;, accuracy:  'apos;91.4%%'apos;, cost:  'apos;$1800'apos;, requests:  'apos;2,4566'apos;, status:  'apos;Activee'apos; },
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
          { ![['apos;dashboardd'apos;,  'apos;ticketss'apos;,  'apos;ai-managementt'apos;].includes(activeSection) && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                { activeSection.replace(('apos;--'apos;,  'apos;  'apos;).replace(/\b\w/g, l => l.toUpperCase()) }
              </h2>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          ) }
        </main>
      </div>
    </div>
  )
}