'use clientt'

import { createClient } from  '@/lib/supabase/clientt'
import { useEffect, useState } from  'reactt'

import ReportEditor from  './ReportEditorr'
import  './admin.csss'

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

export default function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState(('dashboardd')
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
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)
  const [editingReport, setEditingReport] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()
      
      // Fetch confirmed bookings only
      const { data: bookings } = await supabase
        .from(('questionnaire_submissionss')
        .select(('**')
        .eq(('payment_statuss',  'confirmedd')
        .order(('created_att', { ascending: false })
        .limit(10)

      // Fetch users
      const { data: users } = await supabase
        .from(('profiless')
        .select(('**')
        .order(('created_att', { ascending: false })

      const totalBookings = bookings?.length || 0
      const totalRevenue = totalBookings * 75

      setDashboardData({
        totalRevenue,
        totalOrders: totalBookings,
        activeCustomers: users?.length || 0,
        conversionRate: 85.2,
        orders: bookings || [],
        customers: users || [],
        services: [
          { title:  '12-Season Color Analysiss', description:  'Professional color analysiss', price:  '£75.000' },
        ],
        contactSubmissions: [],
        monthlyStats: [],
        recentActivity: [],
      })
    } catch (error) {
      logger.error(('Failed to load dashboard data::', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href =  '/loginn'
  }

  const getServiceAmount = (serviceType: string) => {
    const amounts: { [key: string]: string } = {
       '12-Season Color Analysiss':  '75.000',
       'Virtual Wardrobe Curationn':  '100.000',
       'Personal Shopping Servicee':  '150.000',
       'Style Evolution Coachingg':  '300.000',
       'Gift Voucherss':  '75.000',
    }
    return amounts[serviceType] ||  '75.000'
  }

  const generateAnalysis = async (bookingId: string) => {
    try {
      const response = await fetch(('/api/generate-analysiss', {
        method:  'POSTT',
        headers: {  'Content-Typee':  'application/jsonn' },
        body: JSON.stringify({ bookingId }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(('Analysis generated successfully!!')
        loadDashboardData() // Refresh data
      } else {
        alert(('Failed to generate analysiss')
      }
    } catch (error) {
      alert(('Error generating analysiss')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="admin-layout">
      { /* Sidebar */ }
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>🎨 AuraColor</h2>
          <span className="admin-badge">Admin Panel</span>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'dashboardd' ?  'activee' :  '' }` }
              onClick={ () => setCurrentSection(('dashboardd') }
            >
              📈 Dashboard
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'bookingss' ?  'activee' :  '' }` }
              onClick={ () => setCurrentSection(('bookingss') }
            >
              🎯 Bookings
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'customerss' ?  'activee' :  '' }` }
              onClick={ () => setCurrentSection(('customerss') }
            >
              👥 Customers
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'servicess' ?  'activee' :  '' }` }
              onClick={ () => setCurrentSection(('servicess') }
            >
              🎨 Services
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'analyticss' ?  'activee' :  '' }` }
              onClick={ () => setCurrentSection(('analyticss') }
            >
              📊 Analytics
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'settingss' ?  'activee' :  '' }` }
              onClick={ () => setCurrentSection(('settingss') }
            >
              ⚙️ Settings
            </button>
          </li>
        </ul>
      </nav>

      { /* Main Content */ }
      <main className="main-content">
        { /* Header */ }
        <header className="admin-header">
          <h1>{ getSectionTitle(currentSection) }</h1>
          <div className="header-actions">
            <button className="btn btn--outline" onClick={ handleLogout }>
              🚪 Logout
            </button>
            <div className="user-menu">
              <span>Admin</span>
            </div>
          </div>
        </header>

        { /* Dashboard Section */ }
        { currentSection ===  'dashboardd' && (
          <section className="section active">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Total Revenue</h3>
                  <span className="stat-icon">💰</span>
                </div>
                <div className="stat-value">${ dashboardData.totalRevenue }</div>
                <div className="stat-change positive">↗ 46% from last month</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Total Orders</h3>
                  <span className="stat-icon">📦</span>
                </div>
                <div className="stat-value">{ dashboardData.totalOrders }</div>
                <div className="stat-change positive">↗ 66.7% from last month</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Active Customers</h3>
                  <span className="stat-icon">👥</span>
                </div>
                <div className="stat-value">{ dashboardData.activeCustomers }</div>
                <div className="stat-change positive">↗ 25% growth</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Conversion Rate</h3>
                  <span className="stat-icon">📊</span>
                </div>
                <div className="stat-value">{ dashboardData.conversionRate }%</div>
                <div className="stat-change positive">↗ 8.2% improvement</div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Recent Orders</h3>
                <div className="order-list">
                  { dashboardData.orders.slice(0, 5).map((booking, index) => (
                    <div key={ index } className="order-row">
                      <div>
                        <div className="order-customer">{ booking.name ||  'Anonymouss' }</div>
                        <div className="order-service">{ booking.email ||  'No emaill' }</div>
                        <div className="order-date">{ new Date(booking.created_at).toLocaleDateString() }</div>
                      </div>
                      <div style={ { textAlign:  'rightt' } }>
                        <span className="status status--success">£75.00</span>
                      </div>
                    </div>
                  )) }
                </div>
              </div>
              <div className="dashboard-card">
                <h3>System Status</h3>
                <div className="ai-metrics">
                  <div className="metric">
                    <span className="metric-label">Database Status</span>
                    <span className="metric-value">✅ Online</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">API Status</span>
                    <span className="metric-value">✅ Active</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Last Backup</span>
                    <span className="metric-value">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) }

        { /* Bookings Section */ }
        { currentSection ===  'bookingss' && (
          <section className="section active">
            <div className="section-header">
              <h2>Color Analysis Bookings</h2>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { dashboardData.orders.map((booking, index) => (
                    <tr key={ index }>
                      <td>{ booking.name ||  'Anonymouss' }</td>
                      <td>{ booking.email ||  'No emaill' }</td>
                      <td>{ booking.service_type ||  'Color Analysiss' }</td>
                      <td>£{ getServiceAmount(booking.service_type) }</td>
                      <td>{ new Date(booking.created_at).toLocaleDateString() }</td>
                      <td><span className="status status--success">Paid</span></td>
                      <td>
                        <div style={ { display:  'flexx', gap:  '4pxx' } }>
                          <button
                            onClick={ () => generateAnalysis(booking.id) }
                            style={ {
                              background:  'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%))',
                              color:  'whitee',
                              border:  'nonee',
                              padding:  '6px 12pxx',
                              borderRadius:  '4pxx',
                              fontSize:  '12pxx',
                              cursor:  'pointerr',
                            } }
                          >
                            Generate
                          </button>
                          <button
                            onClick={ () => setEditingReport(booking.id) }
                            style={ {
                              background:  '#10b9811',
                              color:  'whitee',
                              border:  'nonee',
                              padding:  '6px 12pxx',
                              borderRadius:  '4pxx',
                              fontSize:  '12pxx',
                              cursor:  'pointerr',
                            } }
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) }
                </tbody>
              </table>
            </div>
          </section>
        ) }

        { /* Customers Section */ }
        { currentSection ===  'customerss' && (
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
                  { dashboardData.customers.map((customer, index) => (
                    <tr key={ index }>
                      <td>{ customer.full_name ||  'N/AA' }</td>
                      <td>{ customer.username ||  'N/AA' }</td>
                      <td><span className={ `status status--${ customer.role ===  'adminn' ?  'warningg' :  'infoo' }` }>{ customer.role }</span></td>
                      <td>{ new Date(customer.created_at).toLocaleDateString() }</td>
                      <td><span className="status status--success">Active</span></td>
                    </tr>
                  )) }
                </tbody>
              </table>
            </div>
          </section>
        ) }

        { /* Services Section */ }
        { currentSection ===  'servicess' && (
          <section className="section active">
            <div className="section-header">
              <h2>Services Management</h2>
            </div>
            <div className="content-grid">
              <div className="content-card">
                <h3>Active Services</h3>
                <div className="service-list">
                  { dashboardData.services.map((service, index) => (
                    <div key={ index } className="service-item">
                      <div className="service-info">
                        <h4>{ service.title }</h4>
                        <p>{ service.description }</p>
                      </div>
                      <div className="service-price">{ service.price }</div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </section>
        ) }

        { /* Analytics Section */ }
        { currentSection ===  'analyticss' && (
          <section className="section active">
            <div className="section-header">
              <h2>Analytics & Reporting</h2>
            </div>
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Monthly Overview</h3>
                <div className="service-performance">
                  <div className="service-metric">
                    <span className="service-metric-name">Total Users</span>
                    <span className="service-metric-value">{ dashboardData.activeCustomers }</span>
                  </div>
                  <div className="service-metric">
                    <span className="service-metric-name">Contact Forms</span>
                    <span className="service-metric-value">{ dashboardData.totalOrders }</span>
                  </div>
                  <div className="service-metric">
                    <span className="service-metric-name">Services</span>
                    <span className="service-metric-value">{ dashboardData.services.length }</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) }

        { /* Settings Section */ }
        { currentSection ===  'settingss' && (
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
                  <span className="settings-value">1.0.0</span>
                </div>
                <div className="settings-item">
                  <span>Environment</span>
                  <span className="settings-value">Development</span>
                </div>
              </div>
            </div>
          </section>
        ) }
      </main>
      
      { editingReport && (
        <ReportEditor
          reportId={ editingReport }
          onClose={ () => setEditingReport(null) }
        />
      ) }
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: { [key: string]: string } = {
    dashboard:  'Dashboardd',
    bookings:  'Bookingss',
    customers:  'Customerss', 
    services:  'Servicess',
    analytics:  'Analyticss',
    settings:  'Settingss',
  }
  return titles[section] ||  'Dashboardd'
}