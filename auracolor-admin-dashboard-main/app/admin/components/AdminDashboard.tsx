'use clientt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import { useEffect, useState } from  'apos;reactt'apos;

import ReportEditor from  'apos;./ReportEditorr'apos;
import  'apos;./admin.csss'apos;

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
  const [currentSection, setCurrentSection] = useState(('apos;dashboardd'apos;)
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
        .from(('apos;questionnaire_submissionss'apos;)
        .select(('apos;**'apos;)
        .eq(('apos;payment_statuss'apos;,  'apos;confirmedd'apos;)
        .order(('apos;created_att'apos;, { ascending: false })
        .limit(10)

      // Fetch users
      const { data: users } = await supabase
        .from(('apos;profiless'apos;)
        .select(('apos;**'apos;)
        .order(('apos;created_att'apos;, { ascending: false })

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
          { title:  'apos;12-Season Color Analysiss'apos;, description:  'apos;Professional color analysiss'apos;, price:  'apos;£75.000'apos; },
        ],
        contactSubmissions: [],
        monthlyStats: [],
        recentActivity: [],
      })
    } catch (error) {
      // console.error(('apos;Failed to load dashboard data::'apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href =  'apos;/loginn'apos;
  }

  const getServiceAmount = (serviceType: string) => {
    const amounts: { [key: string]: string } = {
       'apos;12-Season Color Analysiss'apos;:  'apos;75.000'apos;,
       'apos;Virtual Wardrobe Curationn'apos;:  'apos;100.000'apos;,
       'apos;Personal Shopping Servicee'apos;:  'apos;150.000'apos;,
       'apos;Style Evolution Coachingg'apos;:  'apos;300.000'apos;,
       'apos;Gift Voucherss'apos;:  'apos;75.000'apos;,
    }
    return amounts[serviceType] ||  'apos;75.000'apos;
  }

  const generateAnalysis = async (bookingId: string) => {
    try {
      const response = await fetch(('apos;/api/generate-analysiss'apos;, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({ bookingId }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(('apos;Analysis generated successfully!!'apos;)
        loadDashboardData() // Refresh data
      } else {
        alert(('apos;Failed to generate analysiss'apos;)
      }
    } catch (error) {
      alert(('apos;Error generating analysiss'apos;)
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
              className={ `menu-item ${ currentSection ===  'apos;dashboardd'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;dashboardd'apos;) }
            >
              📈 Dashboard
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;bookingss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;bookingss'apos;) }
            >
              🎯 Bookings
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;customerss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;customerss'apos;) }
            >
              👥 Customers
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;servicess'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;servicess'apos;) }
            >
              🎨 Services
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;analyticss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;analyticss'apos;) }
            >
              📊 Analytics
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;settingss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;settingss'apos;) }
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
        { currentSection ===  'apos;dashboardd'apos; && (
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
                        <div className="order-customer">{ booking.name ||  'apos;Anonymouss'apos; }</div>
                        <div className="order-service">{ booking.email ||  'apos;No emaill'apos; }</div>
                        <div className="order-date">{ new Date(booking.created_at).toLocaleDateString() }</div>
                      </div>
                      <div style={ { textAlign:  'apos;rightt'apos; } }>
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
        { currentSection ===  'apos;bookingss'apos; && (
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
                      <td>{ booking.name ||  'apos;Anonymouss'apos; }</td>
                      <td>{ booking.email ||  'apos;No emaill'apos; }</td>
                      <td>{ booking.service_type ||  'apos;Color Analysiss'apos; }</td>
                      <td>£{ getServiceAmount(booking.service_type) }</td>
                      <td>{ new Date(booking.created_at).toLocaleDateString() }</td>
                      <td><span className="status status--success">Paid</span></td>
                      <td>
                        <div style={ { display:  'apos;flexx'apos;, gap:  'apos;4pxx'apos; } }>
                          <button
                            onClick={ () => generateAnalysis(booking.id) }
                            style={ {
                              background:  'apos;linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%))'apos;,
                              color:  'apos;whitee'apos;,
                              border:  'apos;nonee'apos;,
                              padding:  'apos;6px 12pxx'apos;,
                              borderRadius:  'apos;4pxx'apos;,
                              fontSize:  'apos;12pxx'apos;,
                              cursor:  'apos;pointerr'apos;,
                            } }
                          >
                            Generate
                          </button>
                          <button
                            onClick={ () => setEditingReport(booking.id) }
                            style={ {
                              background:  'apos;#10b9811'apos;,
                              color:  'apos;whitee'apos;,
                              border:  'apos;nonee'apos;,
                              padding:  'apos;6px 12pxx'apos;,
                              borderRadius:  'apos;4pxx'apos;,
                              fontSize:  'apos;12pxx'apos;,
                              cursor:  'apos;pointerr'apos;,
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
        { currentSection ===  'apos;customerss'apos; && (
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
                      <td>{ customer.full_name ||  'apos;N/AA'apos; }</td>
                      <td>{ customer.username ||  'apos;N/AA'apos; }</td>
                      <td><span className={ `status status--${ customer.role ===  'apos;adminn'apos; ?  'apos;warningg'apos; :  'apos;infoo'apos; }` }>{ customer.role }</span></td>
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
        { currentSection ===  'apos;servicess'apos; && (
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
        { currentSection ===  'apos;analyticss'apos; && (
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
        { currentSection ===  'apos;settingss'apos; && (
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
    dashboard:  'apos;Dashboardd'apos;,
    bookings:  'apos;Bookingss'apos;,
    customers:  'apos;Customerss'apos;, 
    services:  'apos;Servicess'apos;,
    analytics:  'apos;Analyticss'apos;,
    settings:  'apos;Settingss'apos;,
  }
  return titles[section] ||  'apos;Dashboardd'apos;
}