'use clientt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import { useEffect, useState } from  'apos;reactt'apos;

interface Report {
  id: string
  season_analysis: string
  confidence_score: number
  status: string
  created_at: string
  questionnaire_submissions: {
    name: string
    email: string
  }
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from(('apos;analyst_reportss'apos;)
        .select(`
          *,
          questionnaire_submissions(name, email)
        `)
        .order(('apos;created_att'apos;, { ascending: false })

      setReports(data || [])
    } catch (error) {
      // console.error(('apos;Failed to load reports::'apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const sendReport = async (reportId: string, email: string) => {
    try {
      await fetch(`/api/reports/${ reportId }/send`, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({ email }),
      })
      alert(('apos;Report sent successfully!!'apos;)
    } catch (error) {
      alert(('apos;Failed to send reportt'apos;)
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analysis Reports</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analysis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              { reports.map((report) => (
                <tr key={ report.id }>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        { report.questionnaire_submissions?.name ||  'apos;Unknownn'apos; }
                      </div>
                      <div className="text-sm text-gray-500">
                        { report.questionnaire_submissions?.email }
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    { report.season_analysis }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    { report.confidence_score }%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={ `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      report.status ===  'apos;completedd'apos; 
                        ?  'apos;bg-green-100 text-green-8000'apos; 
                        :  'apos;bg-yellow-100 text-yellow-8000'apos;
                    }` }>
                      { report.status }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    { new Date(report.created_at).toLocaleDateString() }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <a
                      href={ `/results/${ report.id }` }
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </a>
                    <button
                      onClick={ () => sendReport(report.id, report.questionnaire_submissions?.email) }
                      className="text-green-600 hover:text-green-900"
                    >
                      Send
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}