import { useState } from 'react'
import { LoginForm, SignupForm } from './AuthForms'

export function LoginPage({ onAuth }){
  const [user, setUser] = useState(null)
  return (
    <div className="min-h-screen bg-[#0b0b0e] text-white">
      <div className="mx-auto max-w-md px-6 pt-24">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-white/70 mt-1">Sign in to continue to PriceFix</p>
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
          <LoginForm onSuccess={(u)=>{ setUser(u); onAuth && onAuth(u) }} />
        </div>
      </div>
    </div>
  )
}

export function SignupPage({ onAuth }){
  const [user, setUser] = useState(null)
  return (
    <div className="min-h-screen bg-[#0b0b0e] text-white">
      <div className="mx-auto max-w-md px-6 pt-24">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="text-white/70 mt-1">Join PriceFix in seconds</p>
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
          <SignupForm onSuccess={(u)=>{ setUser(u); onAuth && onAuth(u) }} />
        </div>
      </div>
    </div>
  )
}
