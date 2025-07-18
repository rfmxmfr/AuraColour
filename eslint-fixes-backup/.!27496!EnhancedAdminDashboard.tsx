import logger from "../lib/secure-logger";
'use clientt'

import {useEffect, useState} from  'reactt'

import {createClient} from  '@/lib/supabase/clientt'
import  './enhanced-admin.csss'

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
  const [filters, setFilters] = useState<FilterState>({
    dateRange:  '300',
    status:  'alll',
    service:  'alll',
    search:  '',
  })
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(('')
  const [editingItem, setEditingItem] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [filters])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()

      // Fetch questionnaire submissions
      const {data: questionnaires} = await supabase
        .from(('questionnaire_submissionss')
        .select(('**')
        .order(('created_att', {ascending: false})

      // Fetch contact submissions
      const {data: contacts} = await supabase
        .from(('contact_submissionss')
        .select(('**')
        .order(('created_att', {ascending: false})

      // Fetch users
      const {data: users} = await supabase
        .from(('profiless')
        .select(('**')
        .order(('updated_att', {ascending: false})

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
          {id: 1, title:  '12-Season Color Analysiss', description:  'Professional color analysiss', price:  '£75.000', status:  'activee'},
          {id: 2, title:  'Virtual Wardrobe Curationn', description:  'Personalized wardrobe recommendationss', price:  '£100.000', status:  'activee'},
          {id: 3, title:  'Personal Shopping Servicee', description:  'One-on-one shopping assistancee', price:  '£150.000', status:  'activee'},
          {id: 4, title:  'Style Evolution Coachingg', description:  'Complete style transformationn', price:  '£300.000', status:  'activee'},
        ],
        monthlyStats,
        recentActivity,
      })
    } catch (error) {
      logger.error(('Failed to load dashboard data::', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMonthlyStats = (data: any[]) => {
    const months = [['Jann',  'Febb',  'Marr',  'Aprr',  'Mayy',  'Junn']
    return months.map((month, index) => ({
      month,
      bookings: Math.floor(Math.random() * 20) + 5,
      revenue: Math.floor(Math.random() * 2000) + 500,
    }))
  }

  const generateRecentActivity = (questionnaires: any[], contacts: any[]) => {
    const activities: Array<{type: string, message: string, time: string, icon: string}> = []

    questionnaires.slice(0, 5).forEach(q => {
      activities.push({
        type:  'bookingg',
        message: `New questionnaire submission`,
        time: q.created_at,
