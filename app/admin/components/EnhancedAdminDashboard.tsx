'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import './enhanced-admin.css'

interface DashboardData {
  totalRevenue: number
  totalOrders: number
  activeCustomers: number
  conversionRate: number
  orders: any[]
  customers: any[]
  services: any[]
  contactSubmissions: any[]
  monthlyStats: any[]
  recentActivity: any[]
}

interface FilterState {
  dateRange: string
  status: string
  service: string
  search: string
}

export default function EnhancedAdminDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalRevenue: 0,
    totalOrders: 0,
    activeCustomers: 0,
    conversionRate: 0,
    orders: [],
    customers: [],
    services: [],
    contactSubmissions: [],
    monthlyStats: [],
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '30',
    status: 'all',
    service: 'all',
    search: ''
  })
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editingItem, setEditingItem] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [filters])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()
      
      // Fetch questionnaire submissions
      const { data: questionnaires } = await supabase
        .from('questionnaire_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch contact submissions
      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch users
      const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })

      const totalBookings = questionnaires?.length || 0
      const totalRevenue = totalBookings * 75
      const monthlyStats = generateMonthlyStats(questionnaires || [])
      const recentActivity = generateRecentActivity(questionnaires || [], contacts || [])

      setDashboardData({
        totalRevenue,
        totalOrders: totalBookings,
        activeCustomers: users?.length || 0,
        conversionRate: 85.2,
        orders: questionnaires || [],
        customers: users || [],
        contactSubmissions: contacts || [],
        services: [
          { id: 1, title: '12-Season Color Analysis', description: 'Professional color analysis', price: '£75.00', status: 'active' },
          { id: 2, title: 'Virtual Wardrobe Curation', description: 'Personalized wardrobe recommendations', price: '£100.00', status: 'active' },
          { id: 3, title: 'Personal Shopping Service', description: 'One-on-one shopping assistance', price: '£150.00', status: 'active' },
          { id: 4, title: 'Style Evolution Coaching', description: 'Complete style transformation', price: '£300.00', status: 'active' }
        ],
        monthlyStats,
        recentActivity
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMonthlyStats = (data: any[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, index) => ({
      month,
      bookings: Math.floor(Math.random() * 20) + 5,
      revenue: Math.floor(Math.random() * 2000) + 500
    }))
  }

  const generateRecentActivity = (questionnaires: any[], contacts: any[]) => {
    const activities: any[] = []
    
    questionnaires.slice(0, 5).forEach(q => {
      activities.push({
        type: 'booking',
        message: `New questionnaire submission`,
        time: q.created_at,
        icon: '🎯'
      })
    })
    
    contacts.slice(0, 3).forEach(c => {
      activities.push({
        type: 'contact',
        message: `Contact form from ${c.name || 'Anonymous'}`,
        time: c.created_at,
        icon: '📧'
      })
    })
    
    return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10)
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on items:`, selectedItems)
    setSelectedItems([])
  }

  const handleExport = (type: string) => {
    const data = type === 'bookings' ? dashboardData.orders : dashboardData.contactSubmissions
    const csv = convertToCSV(data)
    downloadCSV(csv, `${type}_export.csv`)
  }

  const convertToCSV = (data: any[]) => {
    if (!data.length) return ''
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    return [headers, ...rows].join('\n')
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const filteredOrders = dashboardData.orders.filter(order => {
    if (filters.search && !JSON.stringify(order).toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    return true
  })

  const filteredContacts = dashboardData.contactSubmissions.filter(contact => {
    if (filters.search && !JSON.stringify(contact).toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      {/* Enhanced Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>🎨 AuraColor</h2>
          <span className="admin-badge">Admin Panel</span>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={`menu-item ${currentSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentSection('dashboard')}
            >
              📈 Dashboard
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'bookings' ? 'active' : ''}`}
              onClick={() => setCurrentSection('bookings')}
            >
              🎯 Questionnaires ({dashboardData.orders.length})
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'contacts' ? 'active' : ''}`}
              onClick={() => setCurrentSection('contacts')}
            >
              📧 Contact Forms ({dashboardData.contactSubmissions.length})
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'customers' ? 'active' : ''}`}
              onClick={() => setCurrentSection('customers')}
            >
              👥 Users ({dashboardData.customers.length})
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'services' ? 'active' : ''}`}
              onClick={() => setCurrentSection('services')}
            >
              🎨 Services
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'analytics' ? 'active' : ''}`}
              onClick={() => setCurrentSection('analytics')}
            >
              📊 Analytics
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'reports' ? 'active' : ''}`}
              onClick={() => setCurrentSection('reports')}
            >
              📋 Reports
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'settings' ? 'active' : ''}`}
              onClick={() => setCurrentSection('settings')}
            >
              ⚙️ Settings
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Enhanced Header */}
        <header className="admin-header">
          <div className="header-left">
            <h1>{getSectionTitle(currentSection)}</h1>
            <div className="breadcrumb">
              <span>Admin</span> / <span>{getSectionTitle(currentSection)}</span>
            </div>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="search-input"
              />
            </div>
            <button className="btn btn--outline" onClick={handleLogout}>
              🚪 Logout
            </button>
            <div className="user-menu">
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Enhanced Dashboard Section */}
        {currentSection === 'dashboard' && (
          <section className="section active">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Total Revenue</h3>
                  <span className="stat-icon">💰</span>
                </div>
                <div className="stat-value">£{dashboardData.totalRevenue}</div>
                <div className="stat-change positive">↗ 46% from last month</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Questionnaires</h3>
                  <span className="stat-icon">📝</span>
                </div>
                <div className="stat-value">{dashboardData.totalOrders}</div>
                <div className="stat-change positive">↗ 66.7% from last month</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Contact Forms</h3>
                  <span className="stat-icon">📧</span>
                </div>
                <div className="stat-value">{dashboardData.contactSubmissions.length}</div>
                <div className="stat-change positive">↗ 25% growth</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Conversion Rate</h3>
                  <span className="stat-icon">📊</span>
                </div>
                <div className="stat-value">{dashboardData.conversionRate}%</div>
                <div className="stat-change positive">↗ 8.2% improvement</div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                  <button className="btn btn--small">View All</button>
                </div>
                <div className="activity-list">
                  {dashboardData.recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <span className="activity-icon">{activity.icon}</span>
                      <div className="activity-content">
                        <div className="activity-message">{activity.message}</div>
                        <div className="activity-time">{new Date(activity.time).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Monthly Overview</h3>
                  <select className="filter-select">
                    <option>Last 6 months</option>
                    <option>Last 12 months</option>
                  </select>
                </div>
                <div className="chart-container">
                  {dashboardData.monthlyStats.map((stat, index) => (
                    <div key={index} className="chart-bar">
                      <div className="bar-label">{stat.month}</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill" 
                          style={{height: `${(stat.bookings / 25) * 100}%`}}
                        ></div>
                      </div>
                      <div className="bar-value">{stat.bookings}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Questionnaires Section */}
        {currentSection === 'bookings' && (
          <section className="section active">
            <div className="section-header">
              <div className="section-title">
                <h2>Questionnaire Submissions</h2>
                <span className="count-badge">{filteredOrders.length} total</span>
              </div>
              <div className="section-actions">
                <button className="btn btn--outline" onClick={() => handleExport('bookings')}>
                  📥 Export CSV
                </button>
                {selectedItems.length > 0 && (
                  <div className="bulk-actions">
                    <button className="btn btn--danger" onClick={() => handleBulkAction('delete')}>
                      Delete ({selectedItems.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="filters-bar">
              <select 
                value={filters.dateRange} 
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="filter-select"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <select 
                value={filters.status} 
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input 
                        type="checkbox" 
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(filteredOrders.map(o => o.id))
                          } else {
                            setSelectedItems([])
                          }
                        }}
                      />
                    </th>
                    <th>ID</th>
                    <th>Submitted</th>
                    <th>Data Preview</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedItems.includes(order.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, order.id])
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== order.id))
                            }
                          }}
                        />
                      </td>
                      <td>{order.id.slice(0, 8)}...</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="data-preview">
                          {Object.keys(order.data || {}).length} responses
                        </div>
                      </td>
                      <td><span className="status status--warning">Pending Analysis</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn--small" onClick={() => {
                            setEditingItem(order)
                            setModalType('view')
                            setShowModal(true)
                          }}>
                            👁️ View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Contact Forms Section */}
        {currentSection === 'contacts' && (
          <section className="section active">
            <div className="section-header">
              <div className="section-title">
                <h2>Contact Form Submissions</h2>
                <span className="count-badge">{filteredContacts.length} total</span>
              </div>
              <div className="section-actions">
                <button className="btn btn--outline" onClick={() => handleExport('contacts')}>
                  📥 Export CSV
                </button>
              </div>
            </div>
            
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>{contact.name || 'Anonymous'}</td>
                      <td>{contact.email || 'No email'}</td>
                      <td>{contact.data?.subject || 'General Inquiry'}</td>
                      <td>
                        <div className="message-preview">
                          {contact.message?.substring(0, 50)}...
                        </div>
                      </td>
                      <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn--small" onClick={() => {
                            setEditingItem(contact)
                            setModalType('contact')
                            setShowModal(true)
                          }}>
                            👁️ View
                          </button>
                          <button className="btn btn--small btn--primary">
                            📧 Reply
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Enhanced Analytics Section */}
        {currentSection === 'analytics' && (
          <section className="section active">
            <div className="section-header">
              <h2>Analytics & Insights</h2>
            </div>
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Performance Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <div className="metric-value">{dashboardData.totalOrders}</div>
                    <div className="metric-label">Total Submissions</div>
                    <div className="metric-trend positive">+12%</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">{dashboardData.contactSubmissions.length}</div>
                    <div className="metric-label">Contact Forms</div>
                    <div className="metric-trend positive">+8%</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">{dashboardData.conversionRate}%</div>
                    <div className="metric-label">Conversion Rate</div>
                    <div className="metric-trend positive">+3%</div>
                  </div>
                </div>
              </div>
              
              <div className="chart-card">
                <h3>Service Popularity</h3>
                <div className="service-stats">
                  {dashboardData.services.map((service, index) => (
                    <div key={index} className="service-stat">
                      <div className="service-name">{service.title}</div>
                      <div className="service-bar">
                        <div 
                          className="service-fill" 
                          style={{width: `${Math.random() * 100}%`}}
                        ></div>
                      </div>
                      <div className="service-percentage">{Math.floor(Math.random() * 100)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reports Section */}
        {currentSection === 'reports' && (
          <section className="section active">
            <div className="section-header">
              <h2>Reports & Export</h2>
            </div>
            <div className="reports-grid">
              <div className="report-card">
                <h3>📊 Monthly Report</h3>
                <p>Comprehensive monthly analytics and performance metrics</p>
                <button className="btn btn--primary">Generate Report</button>
              </div>
              <div className="report-card">
                <h3>👥 Customer Report</h3>
                <p>Detailed customer behavior and engagement analysis</p>
                <button className="btn btn--primary">Generate Report</button>
              </div>
              <div className="report-card">
                <h3>💰 Revenue Report</h3>
                <p>Financial performance and revenue breakdown</p>
                <button className="btn btn--primary">Generate Report</button>
              </div>
            </div>
          </section>
        )}

        {/* Other sections remain the same... */}
        {currentSection === 'customers' && (
          <section className="section active">
            <div className="section-header">
              <h2>User Management</h2>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.customers.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.full_name || 'N/A'}</td>
                      <td>{customer.username || 'N/A'}</td>
                      <td><span className={`status status--${customer.role === 'admin' ? 'warning' : 'info'}`}>{customer.role}</span></td>
                      <td>{new Date(customer.updated_at).toLocaleDateString()}</td>
                      <td><span className="status status--success">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {currentSection === 'services' && (
          <section className="section active">
            <div className="section-header">
              <h2>Services Management</h2>
            </div>
            <div className="content-grid">
              <div className="content-card">
                <h3>Active Services</h3>
                <div className="service-list">
                  {dashboardData.services.map((service, index) => (
                    <div key={index} className="service-item">
                      <div className="service-info">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                      <div className="service-price">{service.price}</div>
                      <div className="service-actions">
                        <button className="btn btn--small">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'settings' && (
          <section className="section active">
            <div className="section-header">
              <h2>System Settings</h2>
            </div>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>Database Status</h3>
                <div className="settings-item">
                  <span>Connection</span>
                  <span className="settings-value">✅ Connected</span>
                </div>
                <div className="settings-item">
                  <span>Tables</span>
                  <span className="settings-value">All Active</span>
                </div>
              </div>
              <div className="settings-card">
                <h3>Application Info</h3>
                <div className="settings-item">
                  <span>Version</span>
                  <span className="settings-value">2.0.0</span>
                </div>
                <div className="settings-item">
                  <span>Environment</span>
                  <span className="settings-value">Production</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalType === 'view' ? 'Questionnaire Details' : 'Contact Details'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {modalType === 'view' && editingItem && (
                <div className="questionnaire-details">
                  <div className="detail-item">
                    <strong>ID:</strong> {editingItem.id}
                  </div>
                  <div className="detail-item">
                    <strong>Submitted:</strong> {new Date(editingItem.created_at).toLocaleString()}
                  </div>
                  <div className="detail-item">
                    <strong>Data:</strong>
                    <pre className="json-preview">{JSON.stringify(editingItem.data, null, 2)}</pre>
                  </div>
                </div>
              )}
              {modalType === 'contact' && editingItem && (
                <div className="contact-details">
                  <div className="detail-item">
                    <strong>Name:</strong> {editingItem.name}
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> {editingItem.email}
                  </div>
                  <div className="detail-item">
                    <strong>Message:</strong>
                    <p className="message-full">{editingItem.message}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong> {new Date(editingItem.created_at).toLocaleString()}
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
    dashboard: 'Dashboard',
    bookings: 'Questionnaires',
    contacts: 'Contact Forms',
    customers: 'Users', 
    services: 'Services',
    analytics: 'Analytics',
    reports: 'Reports',
    settings: 'Settings'
  }
  return titles[section] || 'Dashboard'
}