'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BarChart, 
  CalendarDays, 
  Clock, 
  FileText, 
  Filter, 
  Inbox, 
  MessageSquare, 
  Search, 
  Settings, 
  Users 
} from 'lucide-react'

// Status mapping for visual representation
const statusColors = {
  'draft': 'bg-gray-200 text-gray-800',
  'payment_pending': 'bg-yellow-100 text-yellow-800',
  'paid': 'bg-blue-100 text-blue-800',
  'in_analysis': 'bg-purple-100 text-purple-800',
  'complete': 'bg-green-100 text-green-800',
  'follow_up': 'bg-pink-100 text-pink-800'
}

// Admin status mapping
const adminStatusLabels = {
  'draft': 'New submission',
  'payment_pending': 'Awaiting payment',
  'paid': 'Assign to analyst',
  'in_analysis': 'Processing',
  'complete': 'Delivered',
  'follow_up': 'Review requested'
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState('front-desk')
  const [submissions, setSubmissions] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    completionRate: 0,
    avgTurnaround: '0',
    customerSatisfaction: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Fetch submissions
      const { data: submissionsData } = await supabase
        .from('questionnaire_submissions')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false })
      
      // Fetch users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      // Calculate analytics
      const completedSubmissions = submissionsData?.filter(s => s.status === 'complete') || []
      const totalRevenue = submissionsData?.reduce((sum, item) => sum + (item.payment_amount || 0), 0) || 0
      
      setSubmissions(submissionsData || [])
      setUsers(usersData || [])
      setAnalytics({
        totalSales: totalRevenue / 100, // Convert from cents to currency
        completionRate: submissionsData?.length ? (completedSubmissions.length / submissionsData.length) * 100 : 0,
        avgTurnaround: '36', // Placeholder - would calculate from timestamps
        customerSatisfaction: 4.8 // Placeholder - would calculate from feedback
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const filteredUsers = users.filter(user => 
    searchTerm === '' || 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AuraColour Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Activity Log
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{analytics.totalSales.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Turnaround</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgTurnaround} hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.customerSatisfaction.toFixed(1)}/5.0</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="front-desk">
            <Inbox className="mr-2 h-4 w-4" />
            Front Desk
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="orders">
            <FileText className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <MessageSquare className="mr-2 h-4 w-4" />
            Analysis Queue
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="front-desk" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select 
                  className="border rounded px-2 py-1 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="draft">New submissions</option>
                  <option value="payment_pending">Awaiting payment</option>
                  <option value="paid">Ready to assign</option>
                  <option value="in_analysis">In progress</option>
                  <option value="complete">Completed</option>
                </select>
              </div>
            </div>
            <Button>
              Refresh
            </Button>
          </div>

          <div className="bg-white rounded-md shadow">
            <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm text-gray-500">
              <div className="col-span-1">ID</div>
              <div className="col-span-2">Customer</div>
              <div className="col-span-2">Service</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Payment</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">Loading submissions...</div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="p-8 text-center">No submissions found</div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div key={submission.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
                  <div className="col-span-1 font-mono text-sm">{submission.id.substring(0, 8)}</div>
                  <div className="col-span-2">
                    <div className="font-medium">{submission.name || 'Anonymous'}</div>
                    <div className="text-sm text-gray-500">{submission.email || 'No email'}</div>
                  </div>
                  <div className="col-span-2">{submission.service_type || '12-Season Analysis'}</div>
                  <div className="col-span-2">
                    <Badge className={statusColors[submission.status || 'draft']}>
                      {adminStatusLabels[submission.status || 'draft']}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    {submission.payment_status === 'completed' ? (
                      <span className="text-green-600 font-medium">£{(submission.payment_amount / 100).toFixed(2)}</span>
                    ) : submission.payment_status === 'pending' ? (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    ) : (
                      <span className="text-red-600 font-medium">Not paid</span>
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-gray-500">
                    {new Date(submission.created_at).toLocaleDateString()}
                  </div>
                  <div className="col-span-1">
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="users" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              Add User
            </Button>
          </div>

          <div className="bg-white rounded-md shadow">
            <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm text-gray-500">
              <div className="col-span-1">ID</div>
              <div className="col-span-3">User</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Joined</div>
              <div className="col-span-2">Actions</div>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center">No users found</div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
                  <div className="col-span-1 font-mono text-sm">{user.id.substring(0, 8)}</div>
                  <div className="col-span-3">
                    <div className="font-medium">{user.full_name || 'Unnamed User'}</div>
                    <div className="text-sm text-gray-500">{user.email || 'No email'}</div>
                  </div>
                  <div className="col-span-2 capitalize">{user.role || 'user'}</div>
                  <div className="col-span-2">
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="col-span-2 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order Management</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New</CardTitle>
                <CardDescription>Awaiting assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.filter(s => s.status === 'paid').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <CardDescription>Currently being analyzed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.filter(s => s.status === 'in_analysis').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CardDescription>Ready for delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.filter(s => s.status === 'complete').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Follow-up</CardTitle>
                <CardDescription>Requires attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.filter(s => s.status === 'follow_up').length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-md shadow p-4">
            <h3 className="text-lg font-medium mb-4">Kanban Board</h3>
            <div className="grid grid-cols-4 gap-4">
              {['New', 'Assigned', 'In Progress', 'Delivered'].map((column) => (
                <div key={column} className="bg-gray-50 rounded-md p-3">
                  <div className="font-medium mb-3">{column}</div>
                  
                  {/* Placeholder cards */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-3 rounded shadow-sm mb-2">
                      <div className="font-medium">Order #{Math.floor(Math.random() * 1000)}</div>
                      <div className="text-sm text-gray-500">Customer Name</div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-blue-100 text-blue-800">12-Season</Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Color Analysis Queue</h2>
            <Button>
              Assign Cases
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Unassigned Cases</CardTitle>
                <CardDescription>Cases waiting for analyst assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">Customer #{Math.floor(Math.random() * 1000)}</div>
                        <div className="text-sm text-gray-500">12-Season Analysis</div>
                      </div>
                      <Button size="sm">Assign</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Assigned Cases</CardTitle>
                <CardDescription>Cases assigned to you for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">Customer #{Math.floor(Math.random() * 1000)}</div>
                        <div className="text-sm text-gray-500">In Progress • 2 hours ago</div>
                      </div>
                      <Button size="sm" variant="outline">Continue</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Completions</CardTitle>
              <CardDescription>Recently completed color analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div>
                        <div className="font-medium">Customer #{Math.floor(Math.random() * 1000)}</div>
                        <div className="text-sm text-gray-500">Completed • {i} day{i > 1 ? 's' : ''} ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Winter</Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Business Analytics</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <CalendarDays className="mr-2 h-4 w-4" />
                Last 30 Days
              </Button>
              <Button>
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-gray-400">
                  [Sales Chart Placeholder]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Breakdown by service type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-gray-400">
                  [Service Distribution Chart Placeholder]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Feedback and ratings</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-gray-400">
                  [Satisfaction Chart Placeholder]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Metrics</CardTitle>
                <CardDescription>Turnaround time and efficiency</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-gray-400">
                  [Operational Metrics Chart Placeholder]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}