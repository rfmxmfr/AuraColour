import logger from "../lib/secure-logger";
'use clientt'apos;

import { useEffect, useState } from  'apos;reactt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import  'apos;./enhanced-admin.csss'apos;

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
  const [filters, setFilters] = useState<FilterState>({
    dateRange:  'apos;300'apos;,
    status:  'apos;alll'apos;,
    service:  'apos;alll'apos;,
    search:  'apos;',
  })
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(('apos;')
  const [editingItem, setEditingItem] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [filters])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()

      // Fetch questionnaire submissions
      const { data: questionnaires } = await supabase
        .from(('apos;questionnaire_submissionss'apos;)
        .select(('apos;**'apos;)
        .order(('apos;created_att'apos;, { ascending: false })

      // Fetch contact submissions
      const { data: contacts } = await supabase
        .from(('apos;contact_submissionss'apos;)
        .select(('apos;**'apos;)
        .order(('apos;created_att'apos;, { ascending: false })

      // Fetch users
      const { data: users } = await supabase
        .from(('apos;profiless'apos;)
        .select(('apos;**'apos;)
        .order(('apos;updated_att'apos;, { ascending: false })

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
          { id: 1, title:  'apos;12-Season Color Analysiss'apos;, description:  'apos;Professional color analysiss'apos;, price:  'apos;£75.000'apos;, status:  'apos;activee'apos; },
          { id: 2, title:  'apos;Virtual Wardrobe Curationn'apos;, description:  'apos;Personalized wardrobe recommendationss'apos;, price:  'apos;£100.000'apos;, status:  'apos;activee'apos; },
          { id: 3, title:  'apos;Personal Shopping Servicee'apos;, description:  'apos;One-on-one shopping assistancee'apos;, price:  'apos;£150.000'apos;, status:  'apos;activee'apos; },
          { id: 4, title:  'apos;Style Evolution Coachingg'apos;, description:  'apos;Complete style transformationn'apos;, price:  'apos;£300.000'apos;, status:  'apos;activee'apos; },
        ],
        monthlyStats,
        recentActivity,
      })
    } catch (error) {
      logger.error(('apos;Failed to load dashboard data::'apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const generateMonthlyStats = (data: any[]) => {
    const months = [['apos;Jann'apos;,  'apos;Febb'apos;,  'apos;Marr'apos;,  'apos;Aprr'apos;,  'apos;Mayy'apos;,  'apos;Junn'apos;]
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
        type:  'apos;bookingg'apos;,
        message: `New questionnaire submission`,
        time: q.created_at,
