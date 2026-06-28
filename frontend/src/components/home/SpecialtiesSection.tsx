import Link from 'next/link'

const specialties = [
  {
    title: 'Orthopedic',
    icon: '🦴',
    description: 'Treatment for bones, joints, muscles and ligament injuries with proven rehabilitation techniques.',
    accent: 'text-pink-300',
    iconBg: 'bg-pink-500/20',
    borderColor: 'border-pink-500/30',
    glowColor: 'rgba(236,72,153,0.15)',
    tag: 'ORTHO',
    tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    linkColor: 'text-pink-300',
    href: '/treatments?specialty=Ortho',
    delay: 'delay-50',
  },
  {
    title: 'Neurological',
    icon: '🧠',
    description: 'Rehabilitation for nerve, brain and spinal conditions — stroke, paralysis, and more.',
    accent: 'text-cyan-300',
    iconBg: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/30',
    glowColor: 'rgba(6,182,212,0.15)',
    tag: 'NEURO',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    linkColor: 'text-cyan-300',
    href: '/treatments?specialty=Neuro',
    delay: 'delay-50',
  },
  {
    title: 'Sports',
    icon: '⚽',
    description: 'Injury recovery and performance enhancement for athletes of all levels.',
    accent: 'text-violet-300',
    iconBg: 'bg-violet-500/20',
    borderColor: 'border-violet-500/30',
    glowColor: 'rgba(239, 239, 239, 0.15)',
    tag: 'SPORTS',
    tagColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    linkColor: 'text-violet-300',
    href: '/treatments?specialty=Sports',
    delay: 'delay-50',
  },
]

export default function SpecialtiesSection() {
  return (
    <section className="py-24 bg-white">

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16 animate-slideInUp">
          <span className="inline-block bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            What We Treat
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Specialties</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Specialized physiotherapy across three core areas, delivered by certified experts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((s) => (
            <div
              key={s.title}
              className={`animate-scaleIn ${s.delay} group rounded-3xl p-8 border ${s.borderColor} hover:-translate-y-2 transition-all duration-300 flex flex-col relative overflow-hidden cursor-pointer`}
              style={{
                background: 'linear-gradient(135deg, rgba(35,15,65,0.95) 0%, rgba(15,8,30,0.98) 100%)',
                boxShadow: `0 20px 60px rgba(10,5,25,0.15), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* Accent glow top-right */}
              <div
                className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${s.glowColor}, transparent)` }}
              />
              <div className="absolute -bottom-8 -left-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

              {/* Tag */}
              <span className={`inline-block ${s.tagColor} border text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 w-fit backdrop-blur-sm`}>
                {s.tag}
              </span>

              {/* Icon */}
              <div className={`w-16 h-16 ${s.iconBg} border border-white/10 rounded-2xl flex items-center justify-center text-4xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
              </div>

              <h3 className={`text-2xl font-bold ${s.accent} mb-3`}>{s.title}</h3>
              <p className="text-white/60 leading-relaxed flex-1 text-sm">{s.description}</p>

              <div className="h-px bg-white/10 my-5" />

              <Link
                href={s.href}
                className={`inline-flex items-center gap-2 ${s.linkColor} font-semibold text-sm group-hover:gap-3 transition-all`}
              >
                Explore Treatments
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
