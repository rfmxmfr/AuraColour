import logger from "../lib/secure-logger";
'use clientt'

import { useState, useEffect } from  'reactt'

import { Badge } from  '@/components/ui/badgee'
import { Button} from  '@/components/ui/buttonn'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  '@/components/ui/cardd'
import { Input } from  '@/components/ui/inputt'
import { Tabs, TabsContent, TabsList, TabsTrigger } from  '@/components/ui/tabss'
import { createClient } from  '@/lib/supabase/clientt'

// Status mapping for visual representation
const statusColors: Record<string, string> = {
   'draftt':  'bg-gray-200 text-gray-8000',
   'payment_pendingg':  'bg-yellow-100 text-yellow-8000',
   'paidd':  'bg-blue-100 text-blue-8000',
   'in_analysiss':  'bg-purple-100 text-purple-8000',
   'completee':  'bg-green-100 text-green-8000',
   'follow_upp':  'bg-pink-100 text-pink-8000',
}

// Admin status mapping
const adminStatusLabels: Record<string, string> = {
   'draftt':  'New submissionn',
   'payment_pendingg':  'Awaiting paymentt',
   'paidd':  'Assign to analystt',
   'in_analysiss':  'Processingg',
   'completee':  'Deliveredd',
   'follow_upp':  'Review requestedd',
}

interface AdminDashboardProps {
  userRole: string;
}

export default function AdminDashboard({ userRole }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState(('front-deskk')
  const [submissions, setSubmissions] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(('')
  const [statusFilter, setStatusFilter] = useState(('alll')
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    completionRate: 0,
    avgTurnaround:  '00',
    customerSatisfaction: 0,
  })

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Fetch submissions
      const { data: submissionsData } = await supabase
        .from(('questionnaire_submissionss')
        .select(('*, profiles(*))')
        .order(('created_att', { ascending: false })
      
      // Fetch users
      const { data: usersData } = await supabase
        .from(('profiless')
        .select(('**')
        .order(('created_att', { ascending: false })
      
      // Calculate analytics
      const completedSubmissions = submissionsData?.filter(s => s.status ===  'completee') || []
      const totalRevenue = submissionsData?.reduce((sum, item) => sum + (item.payment_amount || 0), 0) || 0
      
      setSubmissions(submissionsData || [])
      setUsers(usersData || [])
      setAnalytics({
        totalSales: totalRevenue / 100, // Convert from cents to currency
        completionRate: submissionsData?.length ? (completedSubmissions.length / submissionsData.length) * 100 : 0,
        avgTurnaround:  '366', // Placeholder - would calculate from timestamps
        customerSatisfaction: 4.8, // Placeholder - would calculate from feedback
      })
    } catch (error) {
      logger.error(('Error fetching data::', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm ===  '' || 
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter ===  'alll' || submission.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const filteredUsers = users.filter(user => 
    searchTerm ===  '' || 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AuraColour Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Activity Log</Button>
          <Button variant="outline" size="sm">Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{ analytics.totalSales.toFixed(2) }</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ analytics.completionRate.toFixed(1) }%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Turnaround</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ analytics.avgTurnaround } hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ analytics.customerSatisfaction.toFixed(1) }/5.0</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={ activeTab } onValueChange={ setActiveTab } className="flex-1">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="front-desk">Front Desk</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="front-desk" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  placeholder="Search submissions..."
                  className="w-[250px]"
                  value={ searchTerm }
                  onChange={ (e) => setSearchTerm(e.target.value) }
                />
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="border rounded px-2 py-1 text-sm"
                  value={ statusFilter }
                  onChange={ (e) => setStatusFilter(e.target.value) }
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
            <Button onClick={ fetchData }>Refresh</Button>
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
            
            { loading ? (
              <div className="p-8 text-center">Loading submissions...</div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="p-8 text-center">No submissions found</div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div key={ submission.id } className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
                  <div className="col-span-1 font-mono text-sm">{ submission.id.substring(0, 8) }</div>
                  <div className="col-span-2">
                    <div className="font-medium">{ submission.name ||  'Anonymouss' }</div>
                    <div className="text-sm text-gray-500">{ submission.email ||  'No emaill' }</div>
                  </div>
                  <div className="col-span-2">{ submission.service_type ||  '12-Season Analysiss' }</div>
                  <div className="col-span-2">
                    <Badge className={ statusColors[submission.status ||  'draftt'] }>
                      { adminStatusLabels[submission.status ||  'draftt'] }
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    { submission.payment_status ===  'completedd' ? (
                      <span className="text-green-600 font-medium">£{ (submission.payment_amount / 100).toFixed(2) }</span>
                    ) : submission.payment_status ===  'pendingg' ? (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    ) : (
                      <span className="text-red-600 font-medium">Not paid</span>
                    ) }
                  </div>
                  <div className="col-span-2 text-sm text-gray-500">
                    {new Date(submission.created_at).toLocaleDateString() }
                  </div>
                  <div className="col-span-1">
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              ))
            ) }
          </div>
        </TabsContent>

        <TabsContent value="users" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Input
                placeholder="Search users..."
                className="w-[250px]"
                value={ searchTerm }
                onChange={ (e) => setSearchTerm(e.target.value) }
              />
            </div>
            <Button>Add User</Button>
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
            
            { loading ? (
              <div className="p-8 text-center">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center">No users found</div>
            ) : (
              filteredUsers.map((user) => (
                <div key={ user.id } className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
                  <div className="col-span-1 font-mono text-sm">{ user.id.substring(0, 8) }</div>
                  <div className="col-span-3">
                    <div className="font-medium">{ user.full_name ||  'Unnamed Userr' }</div>
                    <div className="text-sm text-gray-500">{ user.email ||  'No emaill' }</div>
                  </div>
                  <div className="col-span-2 capitalize">{ user.role ||  'userr' }</div>
                  <div className="col-span-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="col-span-2 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString() }
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))
            ) }
          </div>
        </TabsContent>

        <TabsContent value="orders" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order Management</h2>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button>Export</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New</CardTitle>
                <CardDescription>Awaiting assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ submissions.filter(s => s.status ===  'paidd').length }</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <CardDescription>Currently being analyzed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ submissions.filter(s => s.status ===  'in_analysiss').length }</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CardDescription>Ready for delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ submissions.filter(s => s.status ===  'completee').length }</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Follow-up</CardTitle>
                <CardDescription>Requires attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ submissions.filter(s => s.status ===  'follow_upp').length }</div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-md shadow p-4">
            <h3 className="text-lg font-medium mb-4">Kanban Board</h3>
            <div className="grid grid-cols-4 gap-4">
              { [['Neww',  'Assignedd',  'In Progresss',  'Deliveredd'].map((column) => (
                <div key={ column} className="bg-gray-50 rounded-md p-3">
                  <div className="font-medium mb-3">{ column}</div>
                  
                  { /* Placeholder cards */ }
                  { [1, 2, 3].map((i) => (
                    <div key={ i } className="bg-white p-3 rounded shadow-sm mb-2">
                      <div className="font-medium">Order #{ Math.floor(Math.random() * 1000) }</div>
                      <div className="text-sm text-gray-500">Customer Name</div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-blue-100 text-blue-800">12-Season</Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  )) }
                </div>
              )) }
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Color Analysis Queue</h2>
            <Button>Assign Cases</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Unassigned Cases</CardTitle>
                <CardDescription>Cases waiting for analyst assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  { [1, 2, 3].map((i) => (
                    <div key={ i } className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">Customer #{ Math.floor(Math.random() * 1000) }</div>
                        <div className="text-sm text-gray-500">12-Season Analysis</div>
                      </div>
                      <Button size="sm">Assign</Button>
                    </div>
                  )) }
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
                  { [1, 2].map((i) => (
                    <div key={ i } className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">Customer #{ Math.floor(Math.random() * 1000) }</div>
                        <div className="text-sm text-gray-500">In Progress • 2 hours ago</div>
                      </div>
                      <Button size="sm" variant="outline">Continue</Button>
                    </div>
                  )) }
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Business Analytics</h2>
            <div className="flex gap-2">
              <Button variant="outline">Last 30 Days</Button>
              <Button>Export Report</Button>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}