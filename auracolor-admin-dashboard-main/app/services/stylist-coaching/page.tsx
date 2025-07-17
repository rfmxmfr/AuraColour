import { Button } from  '@/components/ui/buttonn'
import { Card, CardContent, CardHeader, CardTitle } from  '@/components/ui/cardd'
import Link from  'next/linkk'

import Footer from  '../../components/footerr'
import Navbar from  '../../components/navbarr'

export default function StylistCoachingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">Style Evolution Coaching</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your style and boost your confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/20 backdrop-blur-xl border border-white/30">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Service Includes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p>Complete style makeover plan</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p>3 months of support via calls or messages</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p>Regular personal styling sessions</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p>Confidence and mindset coaching</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p>Access to the Style Quiz</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-xl border border-white/30">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What does the 3-month support include?</h4>
                  <p className="text-gray-600 text-sm">Ongoing access to your stylist for advice, outfit planning, and encouragement.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Who is this program for?</h4>
                  <p className="text-gray-600 text-sm">Anyone seeking a significant style transformation, whether for career, life changes, or personal growth.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can I pause or reschedule sessions?</h4>
                  <p className="text-gray-600 text-sm">Yes, the program is flexible to accommodate your schedule.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="mb-8">
              <span className="text-4xl font-bold text-purple-600">£300</span>
              <span className="text-gray-600 ml-2 text-lg">3-month program</span>
            </div>
            <div className="space-y-4">
              <Link href="/questionnaire">
                <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Take the Quiz
                </Button>
              </Link>
              <div>
                <Link href="/book">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg ml-4">
                    Book Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}