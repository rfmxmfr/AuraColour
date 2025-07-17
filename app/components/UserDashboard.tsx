'use client';

import logger from "../lib/secure-logger";

import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/lib/supabase/client';

// Status mapping for visual representation
const statusColors: Record<string, string> = {
  'draft': 'bg-gray-200 text-gray-800',
  'payment_pending': 'bg-yellow-100 text-yellow-800',
  'paid': 'bg-blue-100 text-blue-800',
  'in_analysis': 'bg-purple-100 text-purple-800',
  'complete': 'bg-green-100 text-green-800',
  'follow_up': 'bg-pink-100 text-pink-800',
};

// User-friendly status labels
const userStatusLabels: Record<string, string> = {
  'draft': 'Draft',
  'payment_pending': 'Payment Required',
  'paid': 'In Queue',
  'in_analysis': 'In Progress',
  'complete': 'Complete',
  'follow_up': 'Follow-up',
};

export default function UserDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    fetchUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Note: fetchUserData is defined inside the component and doesn't depend on props or state
  // so it doesn't need to be added to the dependency array

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return;
      }
      
      // Fetch user's submissions
      const { data } = await supabase
        .from('questionnaire_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setSubmissions(data || []);
    } catch (error) {
      logger.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resumePayment = async (submissionId: string) => {
    // Implementation would redirect to a payment recovery page
    window.location.href = `/payment-retry?id=${ submissionId }`;
  };

  const viewResults = (submissionId: string) => {
    window.location.href = `/results?id=${ submissionId }`;
  };

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
                <Button onClick={ () => window.location.href = '/questionnaire' }>
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
                        <CardTitle>{ submission.service_type || '12-Season Color Analysis' }</CardTitle>
                        <CardDescription>
                          { new Date(submission.created_at).toLocaleDateString() }
                        </CardDescription>
                      </div>
                      <Badge className={ statusColors[submission.status || 'draft'] }>
                        { userStatusLabels[submission.status || 'draft'] }
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      { submission.status === 'payment_pending' && (
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
                      
                      { submission.status === 'paid' && (
                        <div className="bg-blue-50 p-4 rounded-md">
                          <p className="text-blue-800 text-sm">
                            Your order is in queue. Our team will begin processing it shortly.
                          </p>
                        </div>
                      ) }
                      
                      { submission.status === 'in_analysis' && (
                        <div className="bg-purple-50 p-4 rounded-md">
                          <p className="text-purple-800 text-sm">
                            Your color analysis is currently being processed by our team.
                          </p>
                        </div>
                      ) }
                      
                      { submission.status === 'complete' && (
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
              ) : submissions.filter(s => s.status === 'complete').length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No completed analyses yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  { submissions
                    .filter(s => s.status === 'complete')
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
  );
}