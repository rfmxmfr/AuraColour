import FloatingParticles from "./floating-particles"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative border-t py-16 overflow-hidden" style={{ borderColor: 'var(--champagne-border)', background: 'var(--bg-primary)' }}>
      <FloatingParticles particleCount={10} opacity={0.1} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-champagne rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-semibold tracking-wide text-primary">Aura</span>
            </Link>
            <p className="text-secondary leading-relaxed mb-6 max-w-md">
              Discover the colors that make you look effortlessly radiant.
            </p>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary">Stay Updated</h3>
              <p className="text-secondary text-sm mb-4">
                Receive style tips, seasonal updates, and exclusive offers.
              </p>
              <div className="flex space-x-2">
                <input
                  className="flex-1 glass-panel-light rounded-md px-4 py-2 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-champagne focus:border-transparent"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
                <button
                  className="btn-champagne px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/color-analysis" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Color Analysis
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Wardrobe Management
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Personal Styling
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  All Services
                </Link>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Gift Vouchers
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Book Consultation
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-secondary hover:text-accent transition-colors duration-200 text-sm">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--champagne-border)' }}>
          <p className="text-secondary text-sm mb-4 md:mb-0">
            © 2024 Aura Styling Platform. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              className="w-8 h-8 glass-panel-light hover:bg-champagne/20 rounded-full flex items-center justify-center transition-colors duration-200 group"
              aria-label="Instagram"
              href="#"
            >
              <svg className="text-secondary group-hover:text-accent" height="16" width="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="20" width="20" rx="5" ry="5" x="2" y="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              className="w-8 h-8 glass-panel-light hover:bg-champagne/20 rounded-full flex items-center justify-center transition-colors duration-200 group"
              aria-label="Facebook"
              href="#"
            >
              <svg className="text-secondary group-hover:text-accent" height="16" width="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              className="w-8 h-8 glass-panel-light hover:bg-champagne/20 rounded-full flex items-center justify-center transition-colors duration-200 group"
              aria-label="Twitter"
              href="#"
            >
              <svg className="text-secondary group-hover:text-accent" height="16" width="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}