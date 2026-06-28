import Link from 'next/link'
import Image from 'next/image'
import ONSLogo from '@/components/common/ONSLogo'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* ── Background video ─────────────────────────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark + red tint overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/80 via-[#2d1b4e]/70 to-[#0d0a1a]/85 pointer-events-none" />

      {/* Subtle vignette edge */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 160px rgba(10,5,20,0.7)' }} />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div className="animate-slideInUp space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Trusted Physiotherapy Clinic
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Heal Your Body,{' '}
            <span className="text-purple-300 block">Transform Your Life</span>
          </h1>

          <p className="text-lg text-white/75 leading-relaxed max-w-lg">
            Expert physiotherapy services for orthopedic, neurological, and sports injuries.
            Book your appointment online and start your recovery journey today.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/patient/appointments/new"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/50 hover:-translate-y-0.5"
            >
              Book Appointment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/70 transition-all backdrop-blur-sm"
            >
              Explore Treatments
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4 border-t border-white/15">
            {[
              { value: '500+', label: 'Patients Treated' },
              { value: '15+',  label: 'Years Experience' },
              { value: '25+',  label: 'Treatments' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-purple-300">{stat.value}</div>
                <div className="text-sm text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-purple-500/30 blur-2xl scale-110 pointer-events-none" />

            {/* Main card — dark glass matching the video background */}
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-3xl flex flex-col items-center justify-center p-8 border border-purple-400/20"
              style={{
                background: 'linear-gradient(135deg, rgba(45,27,78,0.85) 0%, rgba(20,10,40,0.9) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 25px 60px rgba(10,5,25,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Purple inner glow */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 40px rgba(139,92,246,0.15)' }} />
              <ONSLogo height={140} dark />
            </div>

            {/* Floating badge top-right — dark glass */}
            <div
              className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 flex items-center gap-2 animate-float border border-purple-400/20"
              style={{
                background: 'rgba(35,20,65,0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(10,5,25,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-2xl">⭐</span>
              <div>
                <div className="text-sm font-bold text-white">4.9 / 5</div>
                <div className="text-xs text-purple-300">Patient Rating</div>
              </div>
            </div>

            {/* Floating badge bottom-left — dark glass */}
            <div
              className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 flex items-center gap-3 animate-float border border-purple-400/20"
              style={{
                background: 'rgba(35,20,65,0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(10,5,25,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                animationDelay: '1.5s',
              }}
            >
              <Image
                src="/certified-badge.png"
                alt="Certified Therapists"
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <div className="text-sm font-bold text-white">Certified</div>
                <div className="text-xs text-purple-300">Therapists</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
