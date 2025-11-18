import { useState } from 'react'
import { MapPin, Route, ArrowRight, BadgeIndianRupee } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard({ user }){
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const fetchPrice = async () => {
    setError(''); setResult(null); setLoading(true)
    try {
      const parseCoords = (s) => {
        const [lat, lng] = s.split(',').map(v=>parseFloat(v.trim()))
        if(isNaN(lat) || isNaN(lng)) throw new Error('Enter coordinates as "lat,lng"')
        return { lat, lng }
      }
      const body = {
        origin: parseCoords(origin),
        destination: parseCoords(destination),
        user_email: user?.email,
      }
      const res = await fetch(`${API_BASE}/api/price/estimate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Failed to fetch prices')
      setResult(data)
    } catch (err){ setError(err.message) } finally { setLoading(false) }
  }

  const useCurrentLocation = () => {
    if(!navigator.geolocation){ setError('Geolocation not supported'); return }
    navigator.geolocation.getCurrentPosition((pos)=>{
      const { latitude, longitude } = pos.coords
      setOrigin(`${latitude.toFixed(6)},${longitude.toFixed(6)}`)
    }, (err)=> setError(err.message))
  }

  return (
    <div className="min-h-[70vh] py-12 bg-[#0b0b0e] text-white">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-2xl font-semibold">Compare fares</h2>
        <p className="text-white/70 mt-1">Enter coordinates as "lat,lng". Use the button to auto-fill your current location.</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-white/70 flex items-center gap-2"><MapPin size={16}/> Origin</label>
            <div className="flex gap-2">
              <input value={origin} onChange={e=>setOrigin(e.target.value)} placeholder="12.9716,77.5946" className="flex-1 px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/40" />
              <button onClick={useCurrentLocation} className="px-3 rounded-md bg-white/10 hover:bg-white/20">Use current</button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/70 flex items-center gap-2"><Route size={16}/> Destination</label>
            <input value={destination} onChange={e=>setDestination(e.target.value)} placeholder="12.9352,77.6245" className="px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/40" />
          </div>
        </div>

        <div className="mt-6">
          <button onClick={fetchPrice} disabled={loading} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium px-5 py-3 rounded-md"><ArrowRight size={18}/> {loading ? 'Fetching...' : 'Fetch prices'}</button>
        </div>

        {error && <div className="mt-4 text-red-400 bg-red-950/40 border border-red-900 px-3 py-2 rounded">{error}</div>}

        {result && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-white/80">Distance: <span className="font-medium">{result.distance_km} km</span></p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {result.quotes.map(q => (
                <div key={q.provider} className={`rounded-lg p-4 ${q.provider === result.cheapest.provider ? 'bg-green-500/15 border border-green-400/30' : 'bg-white/5 border border-white/10'}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{q.provider}</h4>
                    <span className="inline-flex items-center gap-1"><BadgeIndianRupee size={16}/>{q.price}</span>
                  </div>
                  <p className="text-sm text-white/60 mt-1">ETA ~ {q.eta_min} min</p>
                  {q.notes && <p className="text-xs text-white/50 mt-2">{q.notes}</p>}
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-green-600/20 border border-green-500/30">
              <p><span className="font-semibold">Cheapest:</span> {result.cheapest.provider} at ₹{result.cheapest.price}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
