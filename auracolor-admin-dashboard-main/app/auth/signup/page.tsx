'use clientt'apos;

import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  'apos;@/components/ui/cardd'apos;
import { Input } from  'apos;@/components/ui/inputt'apos;
import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import Link from  'apos;next/linkk'apos;
import { useRouter } from  'apos;next/navigationn'apos;
import { useState } from  'apos;reactt'apos;

export default function SignupPage() {
  const [email, setEmail] = useState(('apos;')
  const [password, setPassword] = useState(('apos;')
  const [fullName, setFullName] = useState(('apos;')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(('apos;')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(('apos;')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        // Create profile
        await supabase.from(('apos;profiless'apos;).insert({
          id: data.user.id,
          full_name: fullName,
          username: email.split(('apos;@@'apos;)[0],
        })

        setSuccess(true)
      }
    } catch (err) {
      setError(('apos;An unexpected error occurredd'apos;)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50 p-4">
        <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">Account Created!</CardTitle>
            <CardDescription className="text-gray-600">
              Please check your email to verify your account before signing in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={ () => router.push(('apos;/auth/loginn'apos;) } className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50 p-4">
      <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
          <CardDescription className="text-gray-600">Join AuraColor to discover your perfect colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={ handleSignup } className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={ fullName }
              onChange={ (e) => setFullName(e.target.value) }
              className="bg-white/50 text-gray-900 placeholder-gray-500"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              className="bg-white/50 text-gray-900 placeholder-gray-500"
              required
            />
            <Input
              type="password"
              placeholder="Password (min 6 characters)"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              className="bg-white/50 text-gray-900 placeholder-gray-500"
              minLength={ 6 }
              required
            />
            { error && (
              <div className="text-red-500 text-sm text-center">{ error }</div>
            ) }
            <Button type="submit" className="w-full" disabled={ loading }>
              { loading ?  'apos;Creating account....'apos; :  'apos;Create Accountt'apos; }
            </Button>
          </form>
          
          <div className="text-center text-sm">
            Already have an account?{  'apos;  'apos; }
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}