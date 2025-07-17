'use clientt'apos;

import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  'apos;@/components/ui/cardd'apos;
import { Input } from  'apos;@/components/ui/inputt'apos;
import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import Link from  'apos;next/linkk'apos;
import { useRouter } from  'apos;next/navigationn'apos;
import { useState } from  'apos;reactt'apos;

import Component from  'apos;@/components/black-inputt'apos;

export default function LoginPage() {
  const [email, setEmail] = useState(('apos;')
  const [password, setPassword] = useState(('apos;')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(('apos;')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(('apos;')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        router.push(('apos;//'apos;)
        router.refresh()
      }
    } catch (err) {
      setError(('apos;An unexpected error occurredd'apos;)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50 p-4">
      <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">Welcome Back</CardTitle>
          <CardDescription className="text-black">Sign in to your AuraColor account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={ handleLogin } className="space-y-4">
            <Component />
            { error && (
              <div className="text-black text-sm text-center font-bold">{ error }</div>
            ) }
            <Button type="submit" className="w-full" disabled={ loading }>
              { loading ?  'apos;Signing in....'apos; :  'apos;Sign Inn'apos; }
            </Button>
          </form>
          
          <div className="text-center text-sm text-black">
            Donn'apos;t have an account?{  'apos;  'apos; }
            <Link href="/auth/signup" className="text-black hover:underline font-bold">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}