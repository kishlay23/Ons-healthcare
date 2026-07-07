const reasons = [
  { icon: '👨‍⚕️', title: 'Expert Therapists',    description: 'Highly qualified and certified physiotherapists with years of clinical experience.',               accent: 'text-pink-300',   iconBg: 'bg-pink-500/20',   number: '01', delay: 'delay-100' },
  { icon: '🏥',    title: 'Modern Equipment',    description: 'State-of-the-art machines and technology for faster, more effective treatment.',                   accent: 'text-cyan-300',   iconBg: 'bg-cyan-500/20',   number: '02', delay: 'delay-200' },
  { icon: '📱',    title: 'Easy Online Booking', description: 'Book appointments online 24/7 with flexible time slots that fit your schedule.',                   accent: 'text-violet-300', iconBg: 'bg-violet-500/20', number: '03', delay: 'delay-300' },
  { icon: '📋',    title: 'Personalized Care',   description: 'Customized treatment plans tailored to your specific condition and goals.',                        accent: 'text-purple-300', iconBg: 'bg-purple-500/20', number: '04', delay: 'delay-400' },
  { icon: '⏱️',   title: 'Quick Recovery',      description: 'Evidence-based methods that accelerate healing and get you back to life faster.',                  accent: 'text-fuchsia-300',iconBg: 'bg-fuchsia-500/20',number: '05', delay: 'delay-500' },
  { icon: '🎯',    title: 'Measurable Results',  description: 'Track your progress with regular assessments and milestone-based feedback.',                       accent: 'text-indigo-300', iconBg: 'bg-indigo-500/20', number: '06', delay: 'delay-600' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 animate-slideInUp">
          <span className="inline-block bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Why Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ONS Healthcare</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Trusted by hundreds of patients for excellence, care, and lasting results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title}
              className={`animate-slideInUp ${r.delay} group relative overflow-hidden rounded-2xl p-7 border border-purple-500/20 hover:-translate-y-1.5 transition-all duration-300 cursor-default`}
              style={{
                background: 'linear-gradient(135deg, rgba(35,15,65,0.95) 0%, rgba(15,8,30,0.98) 100%)',
                boxShadow: '0 8px 32px rgba(10,5,25,0.15)',
              }}
            >
              {/* Decorative corners */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-500/10 pointer-events-none" />
              <div className="absolute -bottom-6 -left-4 w-16 h-16 rounded-full bg-purple-700/10 pointer-events-none" />

              {/* Number */}
              <span className="absolute top-4 right-5 text-white/10 font-black text-3xl select-none">{r.number}</span>

              {/* Icon */}
              <div className={`w-14 h-14 ${r.iconBg} border border-white/10 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {r.icon}
              </div>

              <h3 className={`${r.accent} font-bold text-lg mb-2`}>{r.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{r.description}</p>

              {/* Bottom glow line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
