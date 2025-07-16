'use client'

interface Ticket {
  id: string
  ticket_number: string
  customer_name: string
  customer_email: string
  service_type: string
  status: string
  created_at: string
}

interface TicketQueueProps {
  tickets: Ticket[]
  onSelectTicket: (ticket: Ticket) => void
  selectedTicket?: Ticket
}

export default function TicketQueue({ tickets, onSelectTicket, selectedTicket }: TicketQueueProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-black">Ticket Queue</h2>
      <div className="space-y-2">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`p-4 border rounded cursor-pointer transition-colors ${
              selectedTicket?.id === ticket.id 
                ? 'bg-blue-100 border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => onSelectTicket(ticket)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-black">{ticket.ticket_number}</h3>
                <p className="text-sm text-gray-600">{ticket.customer_name}</p>
                <p className="text-xs text-gray-500">{ticket.service_type}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs ${
                  ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  ticket.status === 'analyzed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(ticket.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}