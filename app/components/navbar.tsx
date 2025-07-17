import logger from "../lib/secure-logger";
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuth = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsAuthenticated(true);
        
        // Get user role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (profile) {
          setUserRole(profile.role);
        }
      }
    } catch (error) {
      logger.error('Auth check failed:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AuraColor
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Contact
            </Link>
            
            { isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Dashboard
                </Link>
                { userRole === 'admin' && (
                  <Link href="/admin" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Login
              </Link>
            )}
          </div>
          
          <button 
            onClick={ () => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        
        { isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/services" className="block text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Services
              </Link>
              <Link href="/about" className="block text-gray-700 hover:text-purple-600 transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Contact
              </Link>
              
              { isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="block text-gray-700 hover:text-purple-600 transition-colors font-medium">
                    Dashboard
                  </Link>
                  { userRole === 'admin' && (
                    <Link href="/admin" className="block text-gray-700 hover:text-purple-600 transition-colors font-medium">
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/login" className="block text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Login
                </Link>
              )}

              <Link 
                href="/questionnaire"
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}