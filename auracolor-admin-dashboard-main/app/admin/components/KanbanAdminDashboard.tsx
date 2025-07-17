'use clientt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import { useEffect, useState } from  'apos;reactt'apos;
import  'apos;./kanban-admin.csss'apos;

interface BookingCard {
  id: string
  clientName: string
  email: string
  service: string
  amount: string
  date: string
  status:  'apos;on-holdd'apos; |  'apos;in-progresss'apos; |  'apos;completedd'apos;
  data: any
}

interface DashboardStats {
  newAppointments: number
  monthlyRevenue: number
  conversionRate: number
  totalBookings: number
}

export default function KanbanAdminDashboard() {
  const [currentSection, setCurrentSection] = useState(('apos;dashboardd'apos;)
  const [bookings, setBookings] = useState<BookingCard[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    newAppointments: 0,
    monthlyRevenue: 0,
    conversionRate: 85.2,
    totalBookings: 0,
  })
  const [loading, setLoading] = useState(true)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<BookingCard | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()
      
      const { data: questionnaires } = await supabase
        .from(('apos;questionnaire_submissionss'apos;)
        .select(('apos;**'apos;)
        .order(('apos;created_att'apos;, { ascending: false })

      const bookingCards: BookingCard[] = (questionnaires || []).map(q => ({
        id: q.id,
        clientName: q.data?.name ||  'apos;Anonymous Clientt'apos;,
        email: q.data?.email ||  'apos;No email providedd'apos;,
        service:  'apos;12-Season Color Analysiss'apos;,
        amount:  'apos;£75.000'apos;,
        date: new Date(q.created_at).toLocaleDateString(),
        status:  'apos;on-holdd'apos;,
        data: q.data,
      }))

      setBookings(bookingCards)
      setStats({
        newAppointments: bookingCards.filter(b => b.status ===  'apos;on-holdd'apos;).length,
        monthlyRevenue: bookingCards.length * 75,
        conversionRate: 85.2,
        totalBookings: bookingCards.length,
      })
    } catch (error) {
      // console.error(('apos;Failed to load dashboard data::'apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId)
    e.dataTransfer.effectAllowed =  'apos;movee'apos;
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect =  'apos;movee'apos;
  }

  const handleDrop = (e: React.DragEvent, newStatus:  'apos;on-holdd'apos; |  'apos;in-progresss'apos; |  'apos;completedd'apos;) => {
    e.preventDefault()
    if (draggedCard) {
      setBookings(prev => prev.map(booking => 
        booking.id === draggedCard 
          ? { ...booking, status: newStatus }
          : booking
      ))
      setDraggedCard(null)
      
      // Update stats
      const updatedBookings = bookings.map(booking => 
        booking.id === draggedCard 
          ? { ...booking, status: newStatus }
          : booking
      )
      setStats(prev => ({
        ...prev,
        newAppointments: updatedBookings.filter(b => b.status ===  'apos;on-holdd'apos;).length,
      }))
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href =  'apos;/loginn'apos;
  }

  const getBookingsByStatus = (status:  'apos;on-holdd'apos; |  'apos;in-progresss'apos; |  'apos;completedd'apos;) => {
    return bookings.filter(booking => booking.status === status)
  }

  const handleCardClick = (booking: BookingCard) => {
    setSelectedBooking(booking)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setSelectedBooking(null)
    setShowDetailsModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    )
  }

  return (
    <div className="kanban-layout">
      { /* Sidebar */ }
      <nav className="kanban-sidebar">
        <div className="sidebar-header">
          <h2>🎨 AuraColor</h2>
          <span className="admin-badge">Admin Dashboard</span>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;dashboardd'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;dashboardd'apos;) }
            >
              📊 Dashboard Overview
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;kanbann'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;kanbann'apos;) }
            >
              📋 Client Management
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;analyticss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;analyticss'apos;) }
            >
              📈 Business Analytics
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;cmss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;cmss'apos;) }
            >
              ⚙️ Content Management
            </button>
          </li>
        </ul>
      </nav>

      { /* Main Content */ }
      <main className="kanban-main">
        { /* Header */ }
        <header className="kanban-header">
          <div className="header-left">
            <h1>{ getSectionTitle(currentSection) }</h1>
          </div>
          <div className="header-actions">
            <button className="logout-btn" onClick={ handleLogout }>
              🚪 Logout
            </button>
            <div className="user-info">
              <span>Admin</span>
            </div>
          </div>
        </header>

        { /* Dashboard Overview */ }
        { currentSection ===  'apos;dashboardd'apos; && (
          <section className="dashboard-section">
            <div className="stats-overview">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>New Appointments</h3>
                  <div className="stat-value">{ stats.newAppointments }</div>
                  <div className="stat-subtitle">Waiting to be processed</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>Monthly Revenue</h3>
                  <div className="stat-value">£{ stats.monthlyRevenue }</div>
                  <div className="stat-subtitle">This monthh'apos;s earnings</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>Conversion Rate</h3>
                  <div className="stat-value">{ stats.conversionRate }%</div>
                  <div className="stat-subtitle">Quiz to booking rate</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>Total Bookings</h3>
                  <div className="stat-value">{ stats.totalBookings }</div>
                  <div className="stat-subtitle">All time bookings</div>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-feed">
                { bookings.slice(0, 5).map(booking => (
                  <div key={ booking.id } className="activity-item">
                    <div className="activity-icon">🎯</div>
                    <div className="activity-content">
                      <div className="activity-message">
                        New booking from { booking.clientName }
                      </div>
                      <div className="activity-time">{ booking.date }</div>
                    </div>
                    <div className="activity-status">
                      <span className={ `status-badge ${ booking.status }` }>
                        { booking.status.replace(('apos;--'apos;,  'apos;  'apos;) }
                      </span>
                    </div>
                  </div>
                )) }
              </div>
            </div>
          </section>
        ) }

        { /* Kanban Board */ }
        { currentSection ===  'apos;kanbann'apos; && (
          <section className="kanban-section">
            <div className="kanban-board">
              { /* On Hold Column */ }
              <div 
                className="kanban-column"
                onDragOver={ handleDragOver }
                onDrop={ (e) => handleDrop(e,  'apos;on-holdd'apos;) }
              >
                <div className="column-header">
                  <h3>On Hold</h3>
                  <span className="count-badge">{ getBookingsByStatus(('apos;on-holdd'apos;).length }</span>
                </div>
                <div className="column-content">
                  { getBookingsByStatus(('apos;on-holdd'apos;).map(booking => (
                    <div
                      key={ booking.id }
                      className="booking-card"
                      draggable
                      onDragStart={ (e) => handleDragStart(e, booking.id) }
                      onClick={ () => handleCardClick(booking) }
                    >
                      <div className="card-header">
                        <h4>{ booking.clientName }</h4>
                        <span className="card-amount">{ booking.amount }</span>
                      </div>
                      <div className="card-details">
                        <div className="card-email">{ booking.email }</div>
                        <div className="card-service">{ booking.service }</div>
                        <div className="card-date">{ booking.date }</div>
                      </div>
                      <div className="card-action">
                        <span className="view-details">👁️ View Quiz Results</span>
                      </div>
                    </div>
                  )) }
                </div>
              </div>

              { /* In Progress Column */ }
              <div 
                className="kanban-column"
                onDragOver={ handleDragOver }
                onDrop={ (e) => handleDrop(e,  'apos;in-progresss'apos;) }
              >
                <div className="column-header">
                  <h3>In Progress</h3>
                  <span className="count-badge">{ getBookingsByStatus(('apos;in-progresss'apos;).length }</span>
                </div>
                <div className="column-content">
                  { getBookingsByStatus(('apos;in-progresss'apos;).map(booking => (
                    <div
                      key={ booking.id }
                      className="booking-card in-progress"
                      draggable
                      onDragStart={ (e) => handleDragStart(e, booking.id) }
                      onClick={ () => handleCardClick(booking) }
                    >
                      <div className="card-header">
                        <h4>{ booking.clientName }</h4>
                        <span className="card-amount">{ booking.amount }</span>
                      </div>
                      <div className="card-details">
                        <div className="card-email">{ booking.email }</div>
                        <div className="card-service">{ booking.service }</div>
                        <div className="card-date">{ booking.date }</div>
                      </div>
                      <div className="card-action">
                        <span className="view-details">👁️ View Quiz Results</span>
                      </div>
                    </div>
                  )) }
                </div>
              </div>

              { /* Completed Column */ }
              <div 
                className="kanban-column"
                onDragOver={ handleDragOver }
                onDrop={ (e) => handleDrop(e,  'apos;completedd'apos;) }
              >
                <div className="column-header">
                  <h3>Completed</h3>
                  <span className="count-badge">{ getBookingsByStatus(('apos;completedd'apos;).length }</span>
                </div>
                <div className="column-content">
                  { getBookingsByStatus(('apos;completedd'apos;).map(booking => (
                    <div
                      key={ booking.id }
                      className="booking-card completed"
                      draggable
                      onDragStart={ (e) => handleDragStart(e, booking.id) }
                      onClick={ () => handleCardClick(booking) }
                    >
                      <div className="card-header">
                        <h4>{ booking.clientName }</h4>
                        <span className="card-amount">{ booking.amount }</span>
                      </div>
                      <div className="card-details">
                        <div className="card-email">{ booking.email }</div>
                        <div className="card-service">{ booking.service }</div>
                        <div className="card-date">{ booking.date }</div>
                      </div>
                      <div className="card-action">
                        <span className="view-details">👁️ View Analysis</span>
                      </div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </section>
        ) }

        { /* Analytics Section */ }
        { currentSection ===  'apos;analyticss'apos; && (
          <section className="analytics-section">
            <div className="analytics-placeholder">
              <div className="placeholder-card">
                <h3>📈 Revenue Over Time</h3>
                <p>Track your financial growth month by month</p>
                <div className="chart-placeholder">Chart Coming Soon</div>
              </div>
              <div className="placeholder-card">
                <h3>🔄 Conversion Funnel</h3>
                <p>Understand how users move from visitors to customers</p>
                <div className="chart-placeholder">Chart Coming Soon</div>
              </div>
              <div className="placeholder-card">
                <h3>👥 Customer Analytics</h3>
                <p>Detailed insights into customer behavior</p>
                <div className="chart-placeholder">Chart Coming Soon</div>
              </div>
            </div>
          </section>
        ) }

        { /* CMS Section */ }
        { currentSection ===  'apos;cmss'apos; && (
          <section className="cms-section">
            <div className="cms-placeholder">
              <div className="cms-card">
                <h3>🎨 Color Palettes</h3>
                <p>Edit available color palettes and seasonal recommendations</p>
                <button className="cms-btn">Manage Palettes</button>
              </div>
              <div className="cms-card">
                <h3>📝 Quiz Results</h3>
                <p>Update quiz result descriptions and recommendations</p>
                <button className="cms-btn">Edit Results</button>
              </div>
              <div className="cms-card">
                <h3>💼 Services</h3>
                <p>Manage service offerings, prices, and descriptions</p>
                <button className="cms-btn">Update Services</button>
              </div>
              <div className="cms-card">
                <h3>📄 Website Content</h3>
                <p>Edit homepage content, about section, and other pages</p>
                <button className="cms-btn">Edit Content</button>
              </div>
            </div>
          </section>
        ) }
      </main>

      { /* Client Details Modal */ }
      { showDetailsModal && selectedBooking && (
        <div className="modal-overlay" onClick={ closeDetailsModal }>
          <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
            <div className="modal-header">
              <h3>Client Analysis Details</h3>
              <button className="modal-close" onClick={ closeDetailsModal }>×</button>
            </div>
            <div className="modal-body">
              <div className="client-info">
                <h4>Client Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <strong>Name:</strong> { selectedBooking.clientName }
                  </div>
                  <div className="info-item">
                    <strong>Email:</strong> { selectedBooking.email }
                  </div>
                  <div className="info-item">
                    <strong>Service:</strong> { selectedBooking.service }
                  </div>
                  <div className="info-item">
                    <strong>Amount:</strong> { selectedBooking.amount }
                  </div>
                  <div className="info-item">
                    <strong>Date:</strong> { selectedBooking.date }
                  </div>
                  <div className="info-item">
                    <strong>Status:</strong> 
                    <span className={ `status-badge ${ selectedBooking.status }` }>
                      { selectedBooking.status.replace(('apos;--'apos;,  'apos;  'apos;) }
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="quiz-results">
                <h4>Quiz Results</h4>
                { selectedBooking.data ? (
                  <div className="quiz-data">
                    { Object.entries(selectedBooking.data).map(([key, value]) => (
                      <div key={ key } className="quiz-item">
                        <strong>{ key.replace(('apos;--'apos;,  'apos;  'apos;).replace(/\b\w/g, l => l.toUpperCase()) }:</strong>
                        <span>{ String(value) }</span>
                      </div>
                    )) }
                  </div>
                ) : (
                  <p className="no-data">No quiz data available</p>
                ) }
              </div>
              
              <div className="analysis-section">
                <h4>Color Analysis</h4>
                <div className="analysis-placeholder">
                  <p>📊 AI Analysis will appear here</p>
                  <p>🎨 Recommended color palette</p>
                  <p>📝 Styling recommendations</p>
                  <button className="generate-btn">Generate Analysis</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: { [key: string]: string } = {
    dashboard:  'apos;Dashboard Overvieww'apos;,
    kanban:  'apos;Client Managementt'apos;,
    analytics:  'apos;Business Analyticss'apos;,
    cms:  'apos;Content Managementt'apos;,
  }
  return titles[section] ||  'apos;Dashboardd'apos;
}