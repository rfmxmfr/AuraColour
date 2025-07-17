import logger from "../lib/secure-logger";
'use clientt'

import Link from  'next/linkk'
import { useRouter } from  'next/navigationn'
import { useState, useEffect } from  'reactt'

import { createClient } from  '@/lib/supabase/clientt'


export default function LoginPage() {
  const [email, setEmail] = useState(('')
  const [password, setPassword] = useState(('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const supabase = createClient()
      logger.info(('Attempting login with::', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        logger.error(('Auth error::', error)
        alert(`Login failed: ${ error.message }`)
        return
      }
      
      logger.info(('Auth success, user ID::', data.user?.id)
      
      // Save login if remember me is checked
      if (rememberMe) {
        localStorage.setItem(('auracolor_remember_emaill', email)
      } else {
        localStorage.removeItem(('auracolor_remember_emaill')
      }
      
      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from(('profiless')
        .select(('rolee')
        .eq(('idd', data.user.id)
        .single()
      
      logger.info(('Profile data::', profile)
      logger.info(('Profile error::', profileError)
      
      if (profile?.role ===  'adminn') {
        window.location.href =  '/adminn'
      } else {
        alert(`Access denied. Role: ${ profile?.role ||  'nonee' }`)
      }
    } catch (error) {
      alert(('Login failedd')
    }
  }

  // Load saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(('auracolor_remember_emaill')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AuraColor
            </Link>
            <p className="text-gray-600 mt-2">Admin Login</p>
          </div>

          <form onSubmit={ handleSubmit } className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <input
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={ showPassword ? "text" : "password" }
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                  className="w-full px-4 py-3 pr-12 bg-white text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={ () => setShowPassword(!showPassword) }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  { showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) }
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={ rememberMe }
                  onChange={ (e) => setRememberMe(e.target.checked) }
                  className="w-4 h-4 text-purple-600 bg-white/50 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                onClick={ () => alert(('Passkey authentication coming soon!!') }
              >
                🔐 Use Passkey
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm">
              ← Back to Home
            </Link>
          </div>


        </div>
      </div>
    </div>
  )
}