'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import './kanban-admin.css'

interface BookingCard {
  id: string
  clientName: string
  email: string
  service: string
  amount: string
  date: string
  status: 'on-hold' | 'in-progress' | 'completed'
  data: any
}

interface EditableService {
  id: number
  title: string
  description: string
  price: string
  status: 'active' | 'inactive'
}

export default function EditableAdminDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [bookings, setBookings] = useState<BookingCard[]>([])
  const [services, setServices] = useState<EditableService[]>([
    { id: 1, title: '12-Season Color Analysis', description: 'Professional color analysis', price: '£75.00', status: 'active' },
    { id: 2, title: 'Virtual Wardrobe Curation', description: 'Personalized wardrobe recommendations', price: '£100.00', status: 'active' },
    { id: 3, title: 'Personal Shopping Service', description: 'One-on-one shopping assistance', price: '£150.00', status: 'active' },
    { id: 4, title: 'Style Evolution Coaching', description: 'Complete style transformation', price: '£300.00', status: 'active' }
  ])
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editingService, setEditingService] = useState<EditableService | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()
      
      const { data: questionnaires } = await supabase
        .from('questionnaire_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      const { data: contactSubmissions } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      const bookingCards: BookingCard[] = (questionnaires || []).map(q => ({
        id: q.id,
        clientName: q.data?.name || 'Anonymous Client',
        email: q.data?.email || 'No email provided',
        service: '12-Season Color Analysis',
        amount: '£75.00',
        date: new Date(q.created_at).toLocaleDateString(),
        status: 'on-hold',
        data: q.data
      }))

      setBookings(bookingCards)
      setContacts(contactSubmissions || [])
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, newStatus: 'on-hold' | 'in-progress' | 'completed') => {
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
    window.location.href = '/login'
  }

  const getBookingsByStatus = (status: 'on-hold' | 'in-progress' | 'completed') => {
    return bookings.filter(booking => booking.status === status)
  }

  const handleCardClick = (booking: BookingCard) => {
    setSelectedItem(booking)
    setModalType('booking')
    setShowModal(true)
  }

  const handleContactClick = (contact: any) => {
    setSelectedItem(contact)
    setModalType('contact')
    setShowModal(true)
  }

  const handleServiceEdit = (service: EditableService) => {
    setEditingService(service)
    setModalType('service')
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
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleAddService = () => {
    const newService: EditableService = {
      id: Date.now(),
      title: 'New Service',
      description: 'Service description',
      price: '£0.00',
      status: 'active'
    }
    setServices(prev => [...prev, newService])
    setEditingService(newService)
    setModalType('service')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setEditingService(null)
  }

  const deleteBooking = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        const supabase = createClient()
        await supabase.from('questionnaire_submissions').delete().eq('id', id)
        setBookings(prev => prev.filter(b => b.id !== id))
      } catch (error) {
        alert('Failed to delete booking')
      }
    }
  }

  const deleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        const supabase = createClient()
        await supabase.from('contact_submissions').delete().eq('id', id)
        setContacts(prev => prev.filter(c => c.id !== id))
      } catch (error) {
        alert('Failed to delete contact')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="kanban-layout">
      {/* Sidebar */}
      <nav className="kanban-sidebar">
        <div className="sidebar-header">
          <h2>🎨 AuraColor</h2>
          <span className="admin-badge">Admin Dashboard</span>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={`menu-item ${currentSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentSection('dashboard')}
            >
              📊 Dashboard Overview
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'kanban' ? 'active' : ''}`}
              onClick={() => setCurrentSection('kanban')}
            >
              📋 Client Management ({bookings.length})
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'contacts' ? 'active' : ''}`}
              onClick={() => setCurrentSection('contacts')}
            >
              📧 Contact Forms ({contacts.length})
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'services' ? 'active' : ''}`}
              onClick={() => setCurrentSection('services')}
            >
              🎨 Services Management
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="kanban-main">
        <header className="kanban-header">
          <div className="header-left">
            <h1>{getSectionTitle(currentSection)}</h1>
          </div>
          <div className="header-actions">
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
            <div className="user-info">
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Overview */}
        {currentSection === 'dashboard' && (
          <section className="dashboard-section">
            <div className="stats-overview">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>New Appointments</h3>
                  <div className="stat-value">{getBookingsByStatus('on-hold').length}</div>
                  <div className="stat-subtitle">Waiting to be processed</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>Monthly Revenue</h3>
                  <div className="stat-value">£{bookings.length * 75}</div>
                  <div className="stat-subtitle">This month's earnings</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📧</div>
                <div className="stat-content">
                  <h3>Contact Forms</h3>
                  <div className="stat-value">{contacts.length}</div>
                  <div className="stat-subtitle">New inquiries</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎨</div>
                <div className="stat-content">
                  <h3>Active Services</h3>
                  <div className="stat-value">{services.filter(s => s.status === 'active').length}</div>
                  <div className="stat-subtitle">Available services</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Kanban Board */}
        {currentSection === 'kanban' && (
          <section className="kanban-section">
            <div className="kanban-board">
              {(['on-hold', 'in-progress', 'completed'] as const).map(status => (
                <div 
                  key={status}
                  className="kanban-column"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <div className="column-header">
                    <h3>{status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                    <span className="count-badge">{getBookingsByStatus(status).length}</span>
                  </div>
                  <div className="column-content">
                    {getBookingsByStatus(status).map(booking => (
                      <div
                        key={booking.id}
                        className={`booking-card ${status}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, booking.id)}
                        onClick={() => handleCardClick(booking)}
                      >
                        <div className="card-header">
                          <h4>{booking.clientName}</h4>
                          <button 
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteBooking(booking.id)
                            }}
                          >
                            ×
                          </button>
                        </div>
                        <div className="card-details">
                          <div className="card-email">{booking.email}</div>
                          <div className="card-service">{booking.service}</div>
                          <div className="card-date">{booking.date}</div>
                        </div>
                        <div className="card-action">
                          <span className="view-details">👁️ View Details</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contacts Section */}
        {currentSection === 'contacts' && (
          <section className="contacts-section">
            <div className="section-header">
              <h2>Contact Form Submissions</h2>
            </div>
            <div className="contacts-grid">
              {contacts.map(contact => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <h4>{contact.name || 'Anonymous'}</h4>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteContact(contact.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="contact-details">
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Message:</strong> {contact.message?.substring(0, 100)}...</p>
                    <p><strong>Date:</strong> {new Date(contact.created_at).toLocaleDateString()}</p>
                  </div>
                  <button 
                    className="view-btn"
                    onClick={() => handleContactClick(contact)}
                  >
                    View Full Message
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Services Management */}
        {currentSection === 'services' && (
          <section className="services-section">
            <div className="section-header">
              <h2>Services Management</h2>
              <button className="add-btn" onClick={handleAddService}>
                + Add New Service
              </button>
            </div>
            <div className="services-grid">
              {services.map(service => (
                <div key={service.id} className="service-card">
                  <div className="service-header">
                    <h4>{service.title}</h4>
                    <div className="service-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleServiceEdit(service)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleServiceDelete(service.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="service-details">
                    <p>{service.description}</p>
                    <div className="service-price">{service.price}</div>
                    <div className={`service-status ${service.status}`}>
                      {service.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalType === 'booking' && 'Booking Details'}
                {modalType === 'contact' && 'Contact Details'}
                {modalType === 'service' && 'Edit Service'}
              </h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {modalType === 'booking' && selectedItem && (
                <div className="booking-details">
                  <div className="detail-item">
                    <strong>Client:</strong> {selectedItem.clientName}
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> {selectedItem.email}
                  </div>
                  <div className="detail-item">
                    <strong>Service:</strong> {selectedItem.service}
                  </div>
                  <div className="detail-item">
                    <strong>Amount:</strong> {selectedItem.amount}
                  </div>
                  <div className="detail-item">
                    <strong>Quiz Data:</strong>
                    <pre className="json-preview">{JSON.stringify(selectedItem.data, null, 2)}</pre>
                  </div>
                </div>
              )}
              
              {modalType === 'contact' && selectedItem && (
                <div className="contact-details">
                  <div className="detail-item">
                    <strong>Name:</strong> {selectedItem.name}
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> {selectedItem.email}
                  </div>
                  <div className="detail-item">
                    <strong>Full Message:</strong>
                    <p className="message-full">{selectedItem.message}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong> {new Date(selectedItem.created_at).toLocaleString()}
                  </div>
                </div>
              )}
              
              {modalType === 'service' && editingService && (
                <div className="service-edit">
                  <div className="form-group">
                    <label>Service Title</label>
                    <input
                      type="text"
                      value={editingService.title}
                      onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={editingService.description}
                      onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                      className="form-textarea"
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={editingService.price}
                      onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={editingService.status}
                      onChange={(e) => setEditingService({...editingService, status: e.target.value as 'active' | 'inactive'})}
                      className="form-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button className="save-btn" onClick={handleServiceSave}>
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: { [key: string]: string } = {
    dashboard: 'Dashboard Overview',
    kanban: 'Client Management',
    contacts: 'Contact Forms',
    services: 'Services Management'
  }
  return titles[section] || 'Dashboard'
}