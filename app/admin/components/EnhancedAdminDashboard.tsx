import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useEffect, useState } from  'apos;apos;reactt'apos;apos;

import { createClient } from  'apos;apos;@/lib/supabase/clientt'apos;apos;
import  'apos;apos;./enhanced-admin.csss'apos;apos;

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
  const [currentSection, setCurrentSection] = useState(('apos;apos;dashboardd'apos;apos;)
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
  const [filters, setFilters] = useState<FilterState>({
    dateRange:  'apos;apos;300'apos;apos;,
    status:  'apos;apos;alll'apos;apos;,
    service:  'apos;apos;alll'apos;apos;,
    search:  'apos;apos;'apos;,
  })
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(('apos;apos;'apos;)
  const [editingItem, setEditingItem] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [filters])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()

      // Fetch questionnaire submissions
      const { data: questionnaires } = await supabase
        .from(('apos;apos;questionnaire_submissionss'apos;apos;)
        .select(('apos;apos;**'apos;apos;)
        .order(('apos;apos;created_att'apos;apos;, { ascending: false })

      // Fetch contact submissions
      const { data: contacts } = await supabase
        .from(('apos;apos;contact_submissionss'apos;apos;)
        .select(('apos;apos;**'apos;apos;)
        .order(('apos;apos;created_att'apos;apos;, { ascending: false })

      // Fetch users
      const { data: users } = await supabase
        .from(('apos;apos;profiless'apos;apos;)
        .select(('apos;apos;**'apos;apos;)
        .order(('apos;apos;updated_att'apos;apos;, { ascending: false })

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
          { id: 1, title:  'apos;apos;12-Season Color Analysiss'apos;apos;, description:  'apos;apos;Professional color analysiss'apos;apos;, price:  'apos;apos;£75.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
          { id: 2, title:  'apos;apos;Virtual Wardrobe Curationn'apos;apos;, description:  'apos;apos;Personalized wardrobe recommendationss'apos;apos;, price:  'apos;apos;£100.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
          { id: 3, title:  'apos;apos;Personal Shopping Servicee'apos;apos;, description:  'apos;apos;One-on-one shopping assistancee'apos;apos;, price:  'apos;apos;£150.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
          { id: 4, title:  'apos;apos;Style Evolution Coachingg'apos;apos;, description:  'apos;apos;Complete style transformationn'apos;apos;, price:  'apos;apos;£300.000'apos;apos;, status:  'apos;apos;activee'apos;apos; },
        ],
        monthlyStats,
        recentActivity,
      })
    } catch (error) {
      // logger.error(('apos;apos;Failed to load dashboard data::'apos;apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const generateMonthlyStats = (data: any[]) => {
    const months = [['apos;apos;Jann'apos;apos;,  'apos;apos;Febb'apos;apos;,  'apos;apos;Marr'apos;apos;,  'apos;apos;Aprr'apos;apos;,  'apos;apos;Mayy'apos;apos;,  'apos;apos;Junn'apos;apos;]
    return months.map((month, index) => ({
      month,
      bookings: Math.floor(Math.random() * 20) + 5,
      revenue: Math.floor(Math.random() * 2000) + 500,
    }))
  }

  const generateRecentActivity = (questionnaires: any[], contacts: any[]) => {
    const activities: Array<{ type: string, message: string, time: string, icon: string }> = []

    questionnaires.slice(0, 5).forEach(q => {
      activities.push({
        type:  'apos;apos;bookingg'apos;apos;,
        message: `New questionnaire submission`,
        time: q.created_at,
        icon:  'apos;apos;🎯�'apos;apos;,
      })
    })

    contacts.slice(0, 3).forEach(c => {
      activities.push({
        type:  'apos;apos;contactt'apos;apos;,
        message: `Contact form from ${ c.name ||  'apos;apos;Anonymouss'apos;apos; }`,
        time: c.created_at,
        icon:  'apos;apos;📧�'apos;apos;,
      })
    })

    return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10)
  }

  const handleBulkAction = (action: string) => {
    // import { sanitizeLog } from  'apos;apos;./utilss'apos;apos; // Utility function to sanitize log input
    // logger.info(`Bulk action: ${ sanitizeLog(action) } on items:`, selectedItems.map(item => sanitizeLog(item)))
    setSelectedItems([])
  }

  const handleExport = (type: string) => {
    const data = type ===  'apos;apos;bookingss'apos;apos; ? dashboardData.orders : dashboardData.contactSubmissions
    const csv = convertToCSV(data)
    downloadCSV(csv, `${ type }_export.csv`)
  }

  const convertToCSV = (data: any[]) => {
    if (!data.length) return  'apos;apos;'apos;
    const headers = Object.keys(data[0]).join(('apos;apos;,,'apos;apos;)
    const rows = data.map(row => Object.values(row).join(('apos;apos;,,'apos;apos;))
    return [headers, ...rows].join(('apos;apos;\nn'apos;apos;)
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type:  'apos;apos;text/csvv'apos;apos; })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement(('apos;apos;aa'apos;apos;)
    a.href = url
    a.download = filename
    a.click()
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href =  'apos;apos;/loginn'apos;apos;
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="admin-layout">
      { /* Enhanced Sidebar */ }
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>🎨 AuraColor</h2>
          <span className="admin-badge">Admin Panel</span>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;dashboardd'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;dashboardd'apos;apos;) }
            >
              📈 Dashboard
            </button>
          </li>
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;bookingss'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;bookingss'apos;apos;) }
            >
              🎯 Questionnaires ({ dashboardData.orders.length })
            </button>
          </li>
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;contactss'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;contactss'apos;apos;) }
            >
              📧 Contact Forms ({ dashboardData.contactSubmissions.length })
            </button>
          </li>
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;customerss'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;customerss'apos;apos;) }
            >
              👥 Users ({ dashboardData.customers.length })
            </button>
          </li>
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;servicess'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;servicess'apos;apos;) }
            >
              🎨 Services
            </button>
          </li>
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;analyticss'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;analyticss'apos;apos;) }
            >
              📊 Analytics
            </button>
          </li>
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;reportss'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;reportss'apos;apos;) }
            >
              📋 Reports
            </button>
          </li>
          <li>
            <button
              className={ `menu-item ${ currentSection ===  'apos;apos;settingss'apos;apos; ?  'apos;apos;activee'apos;apos; :  'apos;apos;'apos; }` }
              onClick={ () => setCurrentSection(('apos;apos;settingss'apos;apos;) }
            >
              ⚙️ Settings
            </button>
          </li>
        </ul>
      </nav>

      { /* Main Content */ }
      <main className="main-content">
        { /* Enhanced Header */ }
        <header className="admin-header">
          <div className="header-left">
            <h1>{ getSectionTitle(currentSection) }</h1>
            <div className="breadcrumb">
              <span>Admin</span> / <span>{ getSectionTitle(currentSection) }</span>
            </div>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={ filters.search }
                onChange={ (e) => setFilters({ ...filters, search: e.target.value }) }
                className="search-input"
              />
            </div>
            <button className="btn btn--outline" onClick={ handleLogout }>
              🚪 Logout
            </button>
            <div className="user-menu">
              <span>Admin</span>
            </div>
          </div>
        </header>

        { /* Enhanced Dashboard Section */ }
        { currentSection ===  'apos;apos;dashboardd'apos;apos; && (
          <section className="section active">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Total Revenue</h3>
                  <span className="stat-icon">💰</span>
                </div>
                <div className="stat-value">£{ dashboardData.totalRevenue }</div>
                <div className="stat-change positive">↗ 46% from last month</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Questionnaires</h3>
                  <span className="stat-icon">📝</span>
                </div>
                <div className="stat-value">{ dashboardData.totalOrders }</div>
                <div className="stat-change positive">↗ 66.7% from last month</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Contact Forms</h3>
                  <span className="stat-icon">📧</span>
                </div>
                <div className="stat-value">{ dashboardData.contactSubmissions.length }</div>
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
                <div className="card-header">
                  <h3>Recent Activity</h3>
                  <button className="btn btn--small">View All</button>
                </div>
                <div className="activity-list">
                  { dashboardData.recentActivity.map((activity, index) => (
                    <div key={ index } className="activity-item">
                      <span className="activity-icon">{ activity.icon }</span>
                      <div className="activity-content">
                        <div className="activity-message">{ activity.message }</div>
                        <div className="activity-time">{ new Date(activity.time).toLocaleString() }</div>
                      </div>
                    </div>
                  )) }
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
                  { dashboardData.monthlyStats.map((stat, index) => (
                    <div key={ index } className="chart-bar">
                      <div className="bar-label">{ stat.month }</div>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={ { height: `${ (stat.bookings / 25) * 100 }%` } }
                        />
                      </div>
                      <div className="bar-value">{ stat.bookings }</div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </section>
        ) }

        { /* Enhanced Questionnaires Section */ }
        { currentSection ===  'apos;apos;bookingss'apos;apos; && (
          <section className="section active">
            <div className="section-header">
              <div className="section-title">
                <h2>Questionnaire Submissions</h2>
                <span className="count-badge">{ filteredOrders.length } total</span>
              </div>
              <div className="section-actions">
                <button className="btn btn--outline" onClick={ () => handleExport(('apos;apos;bookingss'apos;apos;) }>
                  📥 Export CSV
                </button>
                { selectedItems.length > 0 && (
                  <div className="bulk-actions">
                    <button className="btn btn--danger" onClick={ () => handleBulkAction(('apos;apos;deletee'apos;apos;) }>
                      Delete ({ selectedItems.length })
                    </button>
                  </div>
                ) }
              </div>
            </div>

            <div className="filters-bar">
              <select
                value={ filters.dateRange }
                onChange={ (e) => setFilters({ ...filters, dateRange: e.target.value }) }
                className="filter-select"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <select
                value={ filters.status }
                onChange={ (e) => setFilters({ ...filters, status: e.target.value }) }
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
                        onChange={ (e) => {
                          if (e.target.checked) {
                            setSelectedItems(filteredOrders.map(o => o.id))
                          } else {
                            setSelectedItems([])
                          }
                        } }
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
                  { filteredOrders.map((order, index) => (
                    <tr key={ order.id }>
                      <td>
                        <input
                          type="checkbox"
                          checked={ selectedItems.includes(order.id) }
                          onChange={ (e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, order.id])
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== order.id))
                            }
                          } }
                        />
                      </td>
                      <td>{ order.id.slice(0, 8) }...</td>
                      <td>{ new Date(order.created_at).toLocaleDateString() }</td>
                      <td>
                        <div className="data-preview">
                          { Object.keys(order.data || { }).length } responses
                        </div>
                      </td>
                      <td><span className="status status--warning">Pending Analysis</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn--small" onClick={ () => {
                            setEditingItem(order)
                            setModalType(('apos;apos;vieww'apos;apos;)
                            setShowModal(true)
                          } }>
                            👁️ View
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

        { /* Contact Forms Section */ }
        { currentSection ===  'apos;apos;contactss'apos;apos; && (
          <section className="section active">
            <div className="section-header">
              <div className="section-title">
                <h2>Contact Form Submissions</h2>
                <span className="count-badge">{ filteredContacts.length } total</span>
              </div>
              <div className="section-actions">
                <button className="btn btn--outline" onClick={ () => handleExport(('apos;apos;contactss'apos;apos;) }>
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
                  { filteredContacts.map((contact, index) => (
                    <tr key={ contact.id }>
                      <td>{ contact.name ||  'apos;apos;Anonymouss'apos;apos; }</td>
                      <td>{ contact.email ||  'apos;apos;No emaill'apos;apos; }</td>
                      <td>{ contact.data?.subject ||  'apos;apos;General Inquiryy'apos;apos; }</td>
                      <td>
                        <div className="message-preview">
                          { contact.message?.substring(0, 50) }...
                        </div>
                      </td>
                      <td>{ new Date(contact.created_at).toLocaleDateString() }</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn--small" onClick={ () => {
                            setEditingItem(contact)
                            setModalType(('apos;apos;contactt'apos;apos;)
                            setShowModal(true)
                          } }>
                            👁️ View
                          </button>
                          <button className="btn btn--small btn--primary">
                            📧 Reply
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

        { /* Enhanced Analytics Section */ }
        { currentSection ===  'apos;apos;analyticss'apos;apos; && (
          <section className="section active">
            <div className="section-header">
              <h2>Analytics & Insights</h2>
            </div>
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Performance Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <div className="metric-value">{ dashboardData.totalOrders }</div>
                    <div className="metric-label">Total Submissions</div>
                    <div className="metric-trend positive">+12%</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">{ dashboardData.contactSubmissions.length }</div>
                    <div className="metric-label">Contact Forms</div>
                    <div className="metric-trend positive">+8%</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">{ dashboardData.conversionRate }%</div>
                    <div className="metric-label">Conversion Rate</div>
                    <div className="metric-trend positive">+3%</div>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Service Popularity</h3>
                <div className="service-stats">
                  { dashboardData.services.map((service, index) => (
                    <div key={ index } className="service-stat">
                      <div className="service-name">{ service.title }</div>
                      <div className="service-bar">
                        <div
                          className="service-fill"
                          style={ { width: `${ Math.random() * 100 }%` } }
                        />
                      </div>
                      <div className="service-percentage">{ Math.floor(Math.random() * 100) }%</div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </section>
        ) }

        { /* Reports Section */ }
        { currentSection ===  'apos;apos;reportss'apos;apos; && (
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
        ) }

        { /* Other sections remain the same... */ }
        { currentSection ===  'apos;apos;customerss'apos;apos; && (
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
                      <td>{ customer.full_name ||  'apos;apos;N/AA'apos;apos; }</td>
                      <td>{ customer.username ||  'apos;apos;N/AA'apos;apos; }</td>
                      <td><span className={ `status status--${ customer.role ===  'apos;apos;adminn'apos;apos; ?  'apos;apos;warningg'apos;apos; :  'apos;apos;infoo'apos;apos; }` }>{ customer.role }</span></td>
                      <td>{ new Date(customer.updated_at).toLocaleDateString() }</td>
                      <td><span className="status status--success">Active</span></td>
                    </tr>
                  )) }
                </tbody>
              </table>
            </div>
          </section>
        ) }

        { currentSection ===  'apos;apos;servicess'apos;apos; && (
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
                      <div className="service-actions">
                        <button className="btn btn--small">Edit</button>
                      </div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </section>
        ) }

        { currentSection ===  'apos;apos;settingss'apos;apos; && (
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
        ) }
      </main>

      { /* Modal */ }
      { showModal && (
        <div className="modal-overlay" onClick={ () => setShowModal(false) }>
          <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
            <div className="modal-header">
              <h3>{ modalType ===  'apos;apos;vieww'apos;apos; ?  'apos;apos;Questionnaire Detailss'apos;apos; :  'apos;apos;Contact Detailss'apos;apos; }</h3>
              <button className="modal-close" onClick={ () => setShowModal(false) }>×</button>
            </div>
            <div className="modal-body">
              { modalType ===  'apos;apos;vieww'apos;apos; && editingItem && (
                <div className="questionnaire-details">
                  <div className="detail-item">
                    <strong>ID:</strong> { editingItem.id }
                  </div>
                  <div className="detail-item">
                    <strong>Submitted:</strong> { new Date(editingItem.created_at).toLocaleString() }
                  </div>
                  <div className="detail-item">
                    <strong>Data:</strong>
                    <pre className="json-preview">{ JSON.stringify(editingItem.data, null, 2) }</pre>
                  </div>
                </div>
              ) }
              { modalType ===  'apos;apos;contactt'apos;apos; && editingItem && (
                <div className="contact-details">
                  <div className="detail-item">
                    <strong>Name:</strong> { editingItem.name }
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> { editingItem.email }
                  </div>
                  <div className="detail-item">
                    <strong>Message:</strong>
                    <p className="message-full">{ editingItem.message }</p>
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong> { new Date(editingItem.created_at).toLocaleString() }
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
    dashboard:  'apos;apos;Dashboardd'apos;apos;,
    bookings:  'apos;apos;Questionnairess'apos;apos;,
    contacts:  'apos;apos;Contact Formss'apos;apos;,
    customers:  'apos;apos;Userss'apos;apos;,
    services:  'apos;apos;Servicess'apos;apos;,
    analytics:  'apos;apos;Analyticss'apos;apos;,
    reports:  'apos;apos;Reportss'apos;apos;,
    settings:  'apos;apos;Settingss'apos;apos;,
  }
  return titles[section] ||  'apos;apos;Dashboardd'apos;apos;
}