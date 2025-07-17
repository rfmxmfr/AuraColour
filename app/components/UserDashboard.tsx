import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useState, useEffect } from  'apos;apos;reactt'apos;apos;

import { Badge } from  'apos;apos;@/components/ui/badgee'apos;apos;
import { Button } from  'apos;apos;@/components/ui/buttonn'apos;apos;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  'apos;apos;@/components/ui/cardd'apos;apos;
import { Tabs, TabsContent, TabsList, TabsTrigger } from  'apos;apos;@/components/ui/tabss'apos;apos;
import { createClient } from  'apos;apos;@/lib/supabase/clientt'apos;apos;

// Status mapping for visual representation
const statusColors: Record<string, string> = {
   'apos;apos;draftt'apos;apos;:  'apos;apos;bg-gray-200 text-gray-8000'apos;apos;,
   'apos;apos;payment_pendingg'apos;apos;:  'apos;apos;bg-yellow-100 text-yellow-8000'apos;apos;,
   'apos;apos;paidd'apos;apos;:  'apos;apos;bg-blue-100 text-blue-8000'apos;apos;,
   'apos;apos;in_analysiss'apos;apos;:  'apos;apos;bg-purple-100 text-purple-8000'apos;apos;,
   'apos;apos;completee'apos;apos;:  'apos;apos;bg-green-100 text-green-8000'apos;apos;,
   'apos;apos;follow_upp'apos;apos;:  'apos;apos;bg-pink-100 text-pink-8000'apos;apos;,
}

// User-friendly status labels
const userStatusLabels: Record<string, string> = {
   'apos;apos;draftt'apos;apos;:  'apos;apos;Draftt'apos;apos;,
   'apos;apos;payment_pendingg'apos;apos;:  'apos;apos;Payment Requiredd'apos;apos;,
   'apos;apos;paidd'apos;apos;:  'apos;apos;In Queuee'apos;apos;,
   'apos;apos;in_analysiss'apos;apos;:  'apos;apos;In Progresss'apos;apos;,
   'apos;apos;completee'apos;apos;:  'apos;apos;Completee'apos;apos;,
   'apos;apos;follow_upp'apos;apos;:  'apos;apos;Follow-upp'apos;apos;,
}

export default function UserDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(('apos;apos;orderss'apos;apos;)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return
      }
      
      // Fetch userr'apos;apos;s submissions
      const { data } = await supabase
        .from(('apos;apos;questionnaire_submissionss'apos;apos;)
        .select(('apos;apos;**'apos;apos;)
        .eq(('apos;apos;user_idd'apos;apos;, user.id)
        .order(('apos;apos;created_att'apos;apos;, { ascending: false })
      
      setSubmissions(data || [])
    } catch (error) {
      // logger.error(('apos;apos;Error fetching user data::'apos;apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const resumePayment = async (submissionId: string) => {
    // Implementation would redirect to a payment recovery page
    window.location.href = `/payment-retry?id=${ submissionId }`
  }

  const viewResults = (submissionId: string) => {
    window.location.href = `/results?id=${ submissionId }`
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
        <p className="text-gray-600">Track your color analysis and styling services</p>
      </div>

      <Tabs value={ activeTab } onValueChange={ setActiveTab }>
        <TabsList className="mb-6">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          { loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          ) : submissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-4">Start by taking our color analysis questionnaire</p>
                <Button onClick={ () => window.location.href =  'apos;apos;/questionnairee'apos;apos; }>
                  Start Questionnaire
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              { submissions.map((submission) => (
                <Card key={ submission.id }>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{ submission.service_type ||  'apos;apos;12-Season Color Analysiss'apos;apos; }</CardTitle>
                        <CardDescription>
                          { new Date(submission.created_at).toLocaleDateString() }
                        </CardDescription>
                      </div>
                      <Badge className={ statusColors[submission.status ||  'apos;apos;draftt'apos;apos;] }>
                        { userStatusLabels[submission.status ||  'apos;apos;draftt'apos;apos;] }
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      { submission.status ===  'apos;apos;payment_pendingg'apos;apos; && (
                        <div className="bg-yellow-50 p-4 rounded-md">
                          <p className="text-yellow-800 text-sm mb-3">
                            Your order requires payment to proceed.
                          </p>
                          <Button 
                            size="sm" 
                            onClick={ () => resumePayment(submission.id) }
                          >
                            Complete Payment
                          </Button>
                        </div>
                      ) }
                      
                      { submission.status ===  'apos;apos;paidd'apos;apos; && (
                        <div className="bg-blue-50 p-4 rounded-md">
                          <p className="text-blue-800 text-sm">
                            Your order is in queue. Our team will begin processing it shortly.
                          </p>
                        </div>
                      ) }
                      
                      { submission.status ===  'apos;apos;in_analysiss'apos;apos; && (
                        <div className="bg-purple-50 p-4 rounded-md">
                          <p className="text-purple-800 text-sm">
                            Your color analysis is currently being processed by our team.
                          </p>
                        </div>
                      ) }
                      
                      { submission.status ===  'apos;apos;completee'apos;apos; && (
                        <div className="bg-green-50 p-4 rounded-md flex justify-between items-center">
                          <p className="text-green-800 text-sm">
                            Your results are ready to view!
                          </p>
                          <Button 
                            size="sm"
                            onClick={ () => viewResults(submission.id) }
                          >
                            View Results
                          </Button>
                        </div>
                      ) }
                      
                      <div className="pt-2">
                        <div className="text-sm font-medium text-gray-500 mb-1">Order ID</div>
                        <div className="font-mono text-xs">{ submission.id }</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) }
            </div>
          ) }
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Your Color Analysis Results</CardTitle>
              <CardDescription>View your completed analyses</CardDescription>
            </CardHeader>
            <CardContent>
              { loading ? (
                <div className="text-center py-4">Loading results...</div>
              ) : submissions.filter(s => s.status ===  'apos;apos;completee'apos;apos;).length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No completed analyses yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  { submissions
                    .filter(s => s.status ===  'apos;apos;completee'apos;apos;)
                    .map((submission) => (
                      <div key={ submission.id } className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <div className="font-medium">{ submission.service_type }</div>
                          <div className="text-sm text-gray-500">
                            { new Date(submission.created_at).toLocaleDateString() }
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={ () => viewResults(submission.id) }
                        >
                          View
                        </Button>
                      </div>
                    ))
                  }
                </div>
              ) }
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your email"
                    disabled
                  />
                </div>
                <div className="pt-4">
                  <Button>
                    Update Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}