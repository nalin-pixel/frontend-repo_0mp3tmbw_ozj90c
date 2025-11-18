import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function LoginForm({ onSuccess }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Login failed')
      onSuccess && onSuccess(data)
    } catch (err){ setError(err.message) } finally { setLoading(false) }
  }

  const google = async () => {
    setLoading(true); setError('')
    try {
      // Demo: ask for email only; in production verify Google id_token on backend
      const emailInput = prompt('Enter your Google email to continue:')
      if(!emailInput) return setLoading(false)
      const res = await fetch(`${API_BASE}/api/auth/google`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: emailInput }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Google sign-in failed')
      onSuccess && onSuccess(data)
    } catch (err){ setError(err.message) } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="text-red-400 bg-red-950/40 border border-red-900 px-3 py-2 rounded">{error}</div>}
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50" required />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50" required />
      <button disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium py-3 rounded-md">{loading ? 'Signing in...' : 'Login'}</button>
      <button type="button" onClick={google} className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-md">Continue with Google</button>
    </form>
  )
}

export function SignupForm({ onSuccess }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, password, confirm_password: confirmPassword }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Signup failed')
      onSuccess && onSuccess(data)
    } catch (err){ setError(err.message) } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="text-red-400 bg-red-950/40 border border-red-900 px-3 py-2 rounded">{error}</div>}
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50" required />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50" required />
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50" required />
      <input value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50" required />
      <button disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium py-3 rounded-md">{loading ? 'Creating account...' : 'Create account'}</button>
    </form>
  )
}
