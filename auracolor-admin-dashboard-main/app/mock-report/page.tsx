import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Card, CardContent, CardHeader, CardTitle } from  'apos;@/components/ui/cardd'apos;

import Footer from  'apos;../components/footerr'apos;
import Navbar from  'apos;../components/navbarr'apos;

export default function MockReportPage() {
  const mockReport = {
    clientName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    season: "Deep Winter",
    confidence: 92,
    undertone: "Cool",
    analysisDate: "2024-01-15",
    colors: {
      best: [['apos;#0000800'apos;,  'apos;#8B00000'apos;,  'apos;#4B00822'apos;,  'apos;#0064000'apos;,  'apos;#2F4F4FF'apos;,  'apos;#8B008BB'apos;],
      avoid: [['apos;#FFB6C11'apos;,  'apos;#F0E68CC'apos;,  'apos;#DDA0DDD'apos;,  'apos;#98FB988'apos;],
    },
    recommendations: [
      "Wear deep, rich colors that complement your natural undertones",
      "Navy blue and burgundy are your power colors for professional settings",
      "Avoid light, muted colors that may wash out your complexion",
      "Jewel tones like emerald and sapphire enhance your natural beauty",
    ],
    styleGuide: {
      professional: "Navy blazer, white crisp shirt, burgundy accessories",
      casual: "Deep denim, emerald green sweater, black boots",
      evening: "Royal blue dress, silver jewelry, black heels",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Color Analysis Report</h1>
            <p className="text-xl text-gray-600">Professional Style Consultation</p>
          </div>

          <Card className="mb-8 bg-white/20 backdrop-blur-xl border border-white/30">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Client Information</span>
                <span className="text-sm text-gray-600">Report #{ mockReport.analysisDate.replace(/-/g,  'apos;') }</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div><strong>Name:</strong> { mockReport.clientName }</div>
                <div><strong>Email:</strong> { mockReport.email }</div>
                <div><strong>Analysis Date:</strong> { new Date(mockReport.analysisDate).toLocaleDateString() }</div>
                <div><strong>Confidence Score:</strong> { mockReport.confidence }%</div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-white/20 backdrop-blur-xl border border-white/30">
            <CardHeader>
              <CardTitle>Your Color Season</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">{ mockReport.season }</div>
                <div className="text-lg text-gray-600">Undertone: { mockReport.undertone }</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                    style={ { width: `${ mockReport.confidence }%` } }
                  />
                </div>
                <div className="text-sm text-gray-600 mt-2">{ mockReport.confidence }% Confidence</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white/20 backdrop-blur-xl border border-white/30">
              <CardHeader>
                <CardTitle className="text-green-600">✓ Your Best Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  { mockReport.colors.best.map((color, idx) => (
                    <div key={ idx } className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-300"
                        style={ { backgroundColor: color } }
                      />
                      <div className="text-xs text-gray-600">{ color }</div>
                    </div>
                  )) }
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-xl border border-white/30">
              <CardHeader>
                <CardTitle className="text-red-600">✗ Colors to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  { mockReport.colors.avoid.map((color, idx) => (
                    <div key={ idx } className="text-center">
                      <div 
                        className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-300 opacity-60"
                        style={ { backgroundColor: color } }
                      />
                      <div className="text-xs text-gray-600">{ color }</div>
                    </div>
                  )) }
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 bg-white/20 backdrop-blur-xl border border-white/30">
            <CardHeader>
              <CardTitle>Style Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                { mockReport.recommendations.map((rec, idx) => (
                  <li key={ idx } className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>{ rec }</span>
                  </li>
                )) }
              </ul>
            </CardContent>
          </Card>

          <div className="text-center space-x-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              Download PDF Report
            </Button>
            <Button variant="outline">
              Book Follow-up Consultation
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}