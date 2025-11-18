import { Sparkles, BadgeIndianRupee, ShieldCheck } from 'lucide-react'

export default function Features(){
  const items = [
    {icon: Sparkles, title: 'One search, all fares', desc: 'We compare Uber, Ola and Rapido for your trip in seconds.'},
    {icon: BadgeIndianRupee, title: 'Realistic estimates', desc: 'Smart pricing model approximates live surge and distance bands.'},
    {icon: ShieldCheck, title: 'Private & secure', desc: 'Your data is encrypted and never shared with providers.'},
  ]
  return (
    <section id="how" className="bg-[#0b0b0e] text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold">Why PriceFix</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {items.map(({icon:Icon, title, desc}) => (
            <div key={title} className="rounded-xl bg-white/5 border border-white/10 p-6">
              <Icon className="text-orange-400" />
              <h3 className="mt-4 font-medium text-xl">{title}</h3>
              <p className="mt-2 text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
