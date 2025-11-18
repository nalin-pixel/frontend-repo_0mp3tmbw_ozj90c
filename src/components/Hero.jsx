import Spline from '@splinetool/react-spline'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full">
        <div className="mx-auto max-w-7xl h-full flex items-center px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg">Your ride, best price. Every time.</h1>
            <p className="mt-4 text-white/80 text-lg">PriceFix compares live fares from Uber, Ola and Rapido for your route and highlights the cheapest option to book instantly.</p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-md font-medium hover:bg-white/90 transition shadow">
                Get started <ArrowRight size={18} />
              </Link>
              <a href="#how" className="text-white/80 hover:text-white">See how it works</a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
    </section>
  )
}
