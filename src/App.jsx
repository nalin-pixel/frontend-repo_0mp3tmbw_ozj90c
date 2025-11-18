import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Dashboard from './components/Dashboard'
import { LoginPage, SignupPage } from './components/AuthPages'

function Landing(){
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <Features />
    </main>
  )
}

function App(){
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('pf_user')
    return raw ? JSON.parse(raw) : null
  })
  const navigate = useNavigate()

  useEffect(()=>{ if(user) localStorage.setItem('pf_user', JSON.stringify(user)) }, [user])

  const onLogout = () => { setUser(null); localStorage.removeItem('pf_user'); navigate('/') }

  return (
    <div className="min-h-screen bg-black">
      <Navbar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage onAuth={(u)=>{ setUser(u); navigate('/app') }} />} />
        <Route path="/signup" element={<SignupPage onAuth={(u)=>{ setUser(u); navigate('/app') }} />} />
        <Route path="/app" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  )
}

export default App
