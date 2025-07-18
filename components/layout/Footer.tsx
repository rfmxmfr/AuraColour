import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AuraColor</h3>
            <p className="text-gray-600 text-sm">
              Professional color analysis and styling services to help you discover your optimal color palette.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/color-analysis" className="text-gray-600 hover:text-primary-600 text-sm">
                  12-Season Color Analysis
                </Link>
              </li>
              <li>
                <Link href="/services/wardrobe-curation" className="text-gray-600 hover:text-primary-600 text-sm">
                  Virtual Wardrobe Curation
                </Link>
              </li>
              <li>
                <Link href="/services/personal-shopping" className="text-gray-600 hover:text-primary-600 text-sm">
                  Personal Shopping Service
                </Link>
              </li>
              <li>
                <Link href="/services/style-coaching" className="text-gray-600 hover:text-primary-600 text-sm">
                  Style Evolution Coaching
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-600 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} AuraColor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}