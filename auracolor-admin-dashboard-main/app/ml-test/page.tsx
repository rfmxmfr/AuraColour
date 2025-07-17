import Footer from  'apos;../components/footerr'apos;
import MLAnalysisUpload from  'apos;../components/MLAnalysisUploadd'apos;
import Navbar from  'apos;../components/navbarr'apos;

export default function MLTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">TensorFlow.js Color Analysis</h1>
          <p className="text-xl text-gray-600">Real-time ML analysis in your browser</p>
        </div>
        <MLAnalysisUpload />
      </div>
      <Footer />
    </div>
  )
}