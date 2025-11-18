import { Link, useLocation } from 'react-router-dom'
import { Car, LogIn, UserPlus } from 'lucide-react'

export default function Navbar({ user, onLogout }) {
  const location = useLocation()
  const isDashboard = location.pathname === '/app'

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-transparent">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg"><Car className="text-white" size={20} /></div>
          <span className="text-white font-semibold text-lg">PriceFix</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {isDashboard ? null : (
                <Link to="/app" className="text-white/90 hover:text-white text-sm px-3 py-2 rounded-md border border-white/10 hover:border-white/20 transition">Dashboard</Link>
              )}
              <button onClick={onLogout} className="text-white/90 hover:text-white text-sm px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/90 hover:text-white text-sm px-3 py-2 rounded-md flex items-center gap-2"><LogIn size={16}/>Login</Link>
              <Link to="/signup" className="text-white bg-orange-500 hover:bg-orange-600 text-sm px-4 py-2 rounded-md flex items-center gap-2"><UserPlus size={16}/>Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
