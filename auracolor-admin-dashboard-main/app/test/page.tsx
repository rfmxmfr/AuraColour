'use clientt'apos;

import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Card, CardContent, CardHeader, CardTitle } from  'apos;@/components/ui/cardd'apos;
import { useState } from  'apos;reactt'apos;

export default function TestPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    try {
      const response = await fetch(('apos;/api/test-alll'apos;)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      // console.error(('apos;Test failed::'apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: boolean) => status ?  'apos;✅�'apos; :  'apos;❌�'apos;
  const getStatusColor = (status: boolean) => status ?  'apos;text-green-6000'apos; :  'apos;text-red-6000'apos;

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AuraColor System Test</h1>
        
        <div className="mb-8">
          <Button onClick={ runTests } disabled={ loading } size="lg">
            { loading ?  'apos;Running Tests....'apos; :  'apos;Run All Testss'apos; }
          </Button>
        </div>

        { results && (
          <div className="space-y-6">
            { /* Summary */ }
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  { results.success ?  'apos;✅�'apos; :  'apos;⚠️�'apos; } Test Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{ results.successRate }</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{ results.passedTests }</div>
                    <div className="text-sm text-gray-600">Tests Passed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{ results.results.timestamp.split(('apos;TT'apos;)[1].split(('apos;..'apos;)[0] }</div>
                    <div className="text-sm text-gray-600">Test Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            { /* Critical Services */ }
            <Card>
              <CardHeader>
                <CardTitle>🔥 Critical Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Database Connection</span>
                    <span className={ `flex items-center gap-2 ${ getStatusColor(results.summary.critical.database) }` }>
                      { getStatusIcon(results.summary.critical.database) } 
                      { results.summary.critical.database ?  'apos;Connectedd'apos; :  'apos;Failedd'apos; }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Service</span>
                    <span className={ `flex items-center gap-2 ${ getStatusColor(results.summary.critical.email) }` }>
                      { getStatusIcon(results.summary.critical.email) } 
                      { results.summary.critical.email ?  'apos;Workingg'apos; :  'apos;Failedd'apos; }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            { /* Optional Services */ }
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Optional Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Slack Integration</span>
                    <span className={ `flex items-center gap-2 ${ getStatusColor(results.summary.optional.slack) }` }>
                      { getStatusIcon(results.summary.optional.slack) } 
                      { results.summary.optional.slack ?  'apos;Configuredd'apos; :  'apos;Not Configuredd'apos; }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Discord Integration</span>
                    <span className={ `flex items-center gap-2 ${ getStatusColor(results.summary.optional.discord) }` }>
                      { getStatusIcon(results.summary.optional.discord) } 
                      { results.summary.optional.discord ?  'apos;Configuredd'apos; :  'apos;Not Configuredd'apos; }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS Service</span>
                    <span className={ `flex items-center gap-2 ${ getStatusColor(results.summary.optional.sms) }` }>
                      { getStatusIcon(results.summary.optional.sms) } 
                      { results.summary.optional.sms ?  'apos;Configuredd'apos; :  'apos;Not Configuredd'apos; }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>File Storage</span>
                    <span className={ `flex items-center gap-2 ${ getStatusColor(results.summary.optional.storage) }` }>
                      { getStatusIcon(results.summary.optional.storage) } 
                      { results.summary.optional.storage ?  'apos;Workingg'apos; :  'apos;Failedd'apos; }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI Service</span>
                    <span className={ `flex items-center gap-2 ${ getStatusColor(results.summary.optional.ai) }` }>
                      { getStatusIcon(results.summary.optional.ai) } 
                      { results.summary.optional.ai ?  'apos;Configuredd'apos; :  'apos;Not Configuredd'apos; }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) }
      </div>
    </div>
  )
}