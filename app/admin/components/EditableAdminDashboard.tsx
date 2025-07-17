import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useEffect, useState } from  'apos;apos;reactt'apos;apos;

import { createClient } from  'apos;apos;@/lib/supabase/clientt'apos;apos;
import  'apos;apos;./kanban-admin.csss'apos;apos;

interface BookingCard {
  id: string
  clientName: string
  email: string
  service: string
  amount: string
  date: string
  status:  'apos;apos;on-holdd'apos;apos; |  'apos;apos;in-progresss'apos;apos; |  'apos;apos;completedd'apos;apos;
  data: any
}

interface EditableService {
  id: number
  title: string
  description: string
  price: string
  status:  'apos;apos;activee'apos;apos; |  'apos;apos;inactivee'apos;apos;
}

export default function EditableAdminDashboard() {
  const [currentSection, setCurrentSection] = useState(('apos;apos;dashboardd'apos;apos;)
  const [bookings, setBookings] = useState<BookingCard[]>([])
  const [services, setServices] = useState<EditableService[]>([
    { id: 1, title:  'apos;apos;12-Season Color Analysiss'apos;apos;, description:  'apos;apos;Professional color analysiss'apos;apos;, price:  'apos;apos;£75.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
    { id: 2, title:  'apos;apos;Virtual Wardrobe Curationn'apos;apos;, description:  'apos;apos;Personalized wardrobe recommendationss'apos;apos;, price:  'apos;apos;£100.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
    { id: 3, title:  'apos;apos;Personal Shopping Servicee'apos;apos;, description:  'apos;apos;One-on-one shopping assistancee'apos;apos;, price:  'apos;apos;£150.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
    { id: 4, title:  'apos;apos;Style Evolution Coachingg'apos;apos;, description:  'apos;apos;Complete style transformationn'apos;apos;, price:  'apos;apos;£300.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
  ])
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(('apos;apos;'apos;)
  const [editingService, setEditingService] = useState<EditableService | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()
      
      const { data: questionnaires } = await supabase
        .from(('apos;apos;questionnaire_submissionss'apos;apos;)
        .select(('apos;apos;**'apos;apos;)
        .order(('apos;apos;created_att'apos;apos;, { ascending: false })

      const { data: contactSubmissions } = await supabase
        .from(('apos;apos;contact_submissionss'apos;apos;)
        .select(('apos;apos;**'apos;apos;)
        .order(('apos;apos;created_att'apos;apos;, { ascending: false })

      const bookingCards: BookingCard[] = (questionnaires || []).map(q => ({
        id: q.id,
        clientName: q.data?.name ||  'apos;apos;Anonymous Clientt'apos;apos;,
        email: q.data?.email ||  'apos;apos;No email providedd'apos;apos;,
        service:  'apos;apos;12-Season Color Analysiss'apos;apos;,
        amount:  'apos;apos;£75.000'apos;apos;,
        date: new Date(q.created_at).toLocaleDateString(),
        status:  'apos;apos;on-holdd'apos;apos;,
        data: q.data,
      }))

      setBookings(bookingCards)
      setContacts(contactSubmissions || [])
    } catch (error) {
      // logger.error(('apos;apos;Failed to load dashboard data::'apos;apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId)
    e.dataTransfer.effectAllowed =  'apos;apos;movee'apos;apos;
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect =  'apos;apos;movee'apos;apos;
  }

  const handleDrop = (e: React.DragEvent, newStatus:  'apos;apos;on-holdd'apos;apos; |  'apos;apos;in-progresss'apos;apos; |  'apos;apos;completedd'apos;apos;) => {
    e.preventDefault()
    if (draggedCard) {
      setBookings(prev => prev.map(booking => 
        booking.id === draggedCard 
          ? { ...booking, status: newStatus }
          : booking
      ))
      setDraggedCard(null)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href =  'apos;apos;/loginn'apos;apos;
  }

  const getBookingsByStatus = (status:  'apos;apos;on-holdd'apos;apos; |  'apos;apos;in-progresss'apos;apos; |  'apos;apos;completedd'apos;apos;) => {
    return bookings.filter(booking => booking.status === status)
  }

  const handleCardClick = (booking: BookingCard) => {
    setSelectedItem(booking)
    setModalType(('apos;apos;bookingg'apos;apos;)
    setShowModal(true)
  }

  const handleContactClick = (contact: any) => {
    setSelectedItem(contact)
    setModalType(('apos;apos;contactt'apos;apos;)
    setShowModal(true)
  }

  const handleServiceEdit = (service: EditableService) => {
    setEditingService(service)
    setModalType(('apos;apos;servicee'apos;apos;)
    setShowModal(true)
  }

  const handleServiceSave = () => {
    if (editingService) {
      setServices(prev => prev.map(s => 
        s.id === editingService.id ? editingService : s
      ))
      setShowModal(false)
      setEditingService(null)
    }
  }

  const handleServiceDelete = (id: number) => {
    if (confirm(('apos;apos;Are you sure you want to delete this service??'apos;apos;)) {
      setServices(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleAddService = () => {
    const newService: EditableService = {
      id: Date.now(),
      title:  'apos;apos;New Servicee'apos;apos;,
      description:  'apos;apos;Service descriptionn'apos;apos;,
      price:  'apos;apos;£0.000'apos;apos;,
      status:  'apos;apos;activee'apos;apos;,
    }
    setServices(prev => [...prev, newService])
    setEditingService(newService)
    setModalType(('apos;apos;servicee'apos;apos;)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setEditingService(null)
  }

  const deleteBooking = async (id: string) => {
    if (confirm(('apos;apos;Are you sure you want to delete this booking??'apos;apos;)) {
      try {
        const supabase = createClient()
        await supabase.from(('apos;apos;questionnaire_submissionss'apos;apos;).delete().eq(('apos;apos;idd'apos;apos;, id)
        setBookings(prev => prev.filter(b => b.id !== id))
      } catch (error) {
        alert(('apos;apos;Failed to delete bookingg'apos;apos;)
      }
    }
  }

  const deleteContact = async (id: string) => {
    if (confirm(('apos;apos;Are you sure you want to delete this contact??'apos;apos;)) {
      try {
        const supabase = createClient()
        await supabase.from(('apos;apos;contact_submissionss'apos;apos;).delete().eq(('apos;apos;idd'apos;apos;, id)
        setContacts(prev => prev.filter(c => c.id !== id))
      } catch (error) {
        alert(('apos;apos;Failed to delete contactt'apos;apos;)
      }
    }
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
              className={ `menu-item ${ currentSection ===  'apos;apos;dashboardd'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;dashboardd'apos;apos;) }
            >
              📊 Dashboard Overview
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;apos;kanbann'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;kanbann'apos;apos;) }
            >
              📋 Client Management ({ bookings.length })
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;apos;contactss'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;contactss'apos;apos;) }
            >
              📧 Contact Forms ({ contacts.length })
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;apos;servicess'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;servicess'apos;apos;) }
            >
              🎨 Services Management
            </button>
          </li>
        </ul>
      </nav>

      { /* Main Content */ }
      <main className="kanban-main">
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
        { currentSection ===  'apos;apos;dashboardd'apos;apos; && (
          <section className="dashboard-section">
            <div className="stats-overview">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>New Appointments</h3>
                  <div className="stat-value">{ getBookingsByStatus(('apos;apos;on-holdd'apos;apos;).length }</div>
                  <div className="stat-subtitle">Waiting to be processed</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>Monthly Revenue</h3>
                  <div className="stat-value">£{ bookings.length * 75 }</div>
                  <div className="stat-subtitle">This monthh'apos;apos;s earnings</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📧</div>
                <div className="stat-content">
                  <h3>Contact Forms</h3>
                  <div className="stat-value">{ contacts.length }</div>
                  <div className="stat-subtitle">New inquiries</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎨</div>
                <div className="stat-content">
                  <h3>Active Services</h3>
                  <div className="stat-value">{ services.filter(s => s.status ===  'apos;apos;activee'apos;apos;).length }</div>
                  <div className="stat-subtitle">Available services</div>
                </div>
              </div>
            </div>
          </section>
        ) }

        { /* Kanban Board */ }
        { currentSection ===  'apos;apos;kanbann'apos;apos; && (
          <section className="kanban-section">
            <div className="kanban-board">
              { ([['apos;apos;on-holdd'apos;apos;,  'apos;apos;in-progresss'apos;apos;,  'apos;apos;completedd'apos;apos;] as const).map(status => (
                <div 
                  key={ status }
                  className="kanban-column"
                  onDragOver={ handleDragOver }
                  onDrop={ (e) => handleDrop(e, status) }
                >
                  <div className="column-header">
                    <h3>{ status.replace(('apos;apos;--'apos;apos;,  'apos;apos;  'apos;apos;).replace(/\b\w/g, l => l.toUpperCase()) }</h3>
                    <span className="count-badge">{ getBookingsByStatus(status).length }</span>
                  </div>
                  <div className="column-content">
                    { getBookingsByStatus(status).map(booking => (
                      <div
                        key={ booking.id }
                        className={ `booking-card ${ status }` }
                        draggable
                        onDragStart={ (e) => handleDragStart(e, booking.id) }
                        onClick={ () => handleCardClick(booking) }
                      >
                        <div className="card-header">
                          <h4>{ booking.clientName }</h4>
                          <button 
                            className="delete-btn"
                            onClick={ (e) => {
                              e.stopPropagation()
                              deleteBooking(booking.id)
                            } }
                          >
                            ×
                          </button>
                        </div>
                        <div className="card-details">
                          <div className="card-email">{ booking.email }</div>
                          <div className="card-service">{ booking.service }</div>
                          <div className="card-date">{ booking.date }</div>
                        </div>
                        <div className="card-action">
                          <span className="view-details">👁️ View Details</span>
                        </div>
                      </div>
                    )) }
                  </div>
                </div>
              )) }
            </div>
          </section>
        ) }

        { /* Contacts Section */ }
        { currentSection ===  'apos;apos;contactss'apos;apos; && (
          <section className="contacts-section">
            <div className="section-header">
              <h2>Contact Form Submissions</h2>
            </div>
            <div className="contacts-grid">
              { contacts.map(contact => (
                <div key={ contact.id } className="contact-card">
                  <div className="contact-header">
                    <h4>{ contact.name ||  'apos;apos;Anonymouss'apos;apos; }</h4>
                    <button 
                      className="delete-btn"
                      onClick={ () => deleteContact(contact.id) }
                    >
                      ×
                    </button>
                  </div>
                  <div className="contact-details">
                    <p><strong>Email:</strong> { contact.email }</p>
                    <p><strong>Message:</strong> { contact.message?.substring(0, 100) }...</p>
                    <p><strong>Date:</strong> { new Date(contact.created_at).toLocaleDateString() }</p>
                  </div>
                  <button 
                    className="view-btn"
                    onClick={ () => handleContactClick(contact) }
                  >
                    View Full Message
                  </button>
                </div>
              )) }
            </div>
          </section>
        ) }

        { /* Services Management */ }
        { currentSection ===  'apos;apos;servicess'apos;apos; && (
          <section className="services-section">
            <div className="section-header">
              <h2>Services Management</h2>
              <button className="add-btn" onClick={ handleAddService }>
                + Add New Service
              </button>
            </div>
            <div className="services-grid">
              { services.map(service => (
                <div key={ service.id } className="service-card">
                  <div className="service-header">
                    <h4>{ service.title }</h4>
                    <div className="service-actions">
                      <button 
                        className="edit-btn"
                        onClick={ () => handleServiceEdit(service) }
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={ () => handleServiceDelete(service.id) }
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="service-details">
                    <p>{ service.description }</p>
                    <div className="service-price">{ service.price }</div>
                    <div className={ `service-status ${ service.status }` }>
                      { service.status }
                    </div>
                  </div>
                </div>
              )) }
            </div>
          </section>
        ) }
      </main>

      { /* Modal */ }
      { showModal && (
        <div className="modal-overlay" onClick={ closeModal }>
          <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
            <div className="modal-header">
              <h3>
                { modalType ===  'apos;apos;bookingg'apos;apos; &&  'apos;apos;Booking Detailss'apos;apos; }
                { modalType ===  'apos;apos;contactt'apos;apos; &&  'apos;apos;Contact Detailss'apos;apos; }
                { modalType ===  'apos;apos;servicee'apos;apos; &&  'apos;apos;Edit Servicee'apos;apos; }
              </h3>
              <button className="modal-close" onClick={ closeModal }>×</button>
            </div>
            <div className="modal-body">
              { modalType ===  'apos;apos;bookingg'apos;apos; && selectedItem && (
                <div className="booking-details">
                  <div className="detail-item">
                    <strong>Client:</strong> { selectedItem.clientName }
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> { selectedItem.email }
                  </div>
                  <div className="detail-item">
                    <strong>Service:</strong> { selectedItem.service }
                  </div>
                  <div className="detail-item">
                    <strong>Amount:</strong> { selectedItem.amount }
                  </div>
                  <div className="detail-item">
                    <strong>Quiz Data:</strong>
                    <pre className="json-preview">{ JSON.stringify(selectedItem.data, null, 2) }</pre>
                  </div>
                </div>
              ) }
              
              { modalType ===  'apos;apos;contactt'apos;apos; && selectedItem && (
                <div className="contact-details">
                  <div className="detail-item">
                    <strong>Name:</strong> { selectedItem.name }
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> { selectedItem.email }
                  </div>
                  <div className="detail-item">
                    <strong>Full Message:</strong>
                    <p className="message-full">{ selectedItem.message }</p>
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong> { new Date(selectedItem.created_at).toLocaleString() }
                  </div>
                </div>
              ) }
              
              { modalType ===  'apos;apos;servicee'apos;apos; && editingService && (
                <div className="service-edit">
                  <div className="form-group">
                    <label>Service Title</label>
                    <input
                      type="text"
                      value={ editingService.title }
                      onChange={ (e) => setEditingService({ ...editingService, title: e.target.value }) }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={ editingService.description }
                      onChange={ (e) => setEditingService({ ...editingService, description: e.target.value }) }
                      className="form-textarea"
                      rows={ 3 }
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={ editingService.price }
                      onChange={ (e) => setEditingService({ ...editingService, price: e.target.value }) }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={ editingService.status }
                      onChange={ (e) => setEditingService({ ...editingService, status: e.target.value as  'apos;apos;activee'apos;apos; |  'apos;apos;inactivee'apos;apos; }) }
                      className="form-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button className="save-btn" onClick={ handleServiceSave }>
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={ closeModal }>
                      Cancel
                    </button>
                  </div>
                </div>
              ) }
            </div>
          </div>
        </div>
      ) }
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: { [key: string]: string } = {
    dashboard:  'apos;apos;Dashboard Overvieww'apos;apos;,
    kanban:  'apos;apos;Client Managementt'apos;apos;,
    contacts:  'apos;apos;Contact Formss'apos;apos;,
    services:  'apos;apos;Services Managementt'apos;apos;,
  }
  return titles[section] ||  'apos;apos;Dashboardd'apos;apos;
}