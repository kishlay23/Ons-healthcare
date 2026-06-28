import Link from 'next/link'

export default function AboutPage() {
  return (
    <div>
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">About ONS Healthcare</h1>
        <p className="text-red-100 max-w-xl mx-auto">Our mission, team, and values</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            ONS Healthcare is a leading physiotherapy clinic in Hyderabad, Telangana, specializing in
            orthopedic, neurological, and sports injury rehabilitation. With over 15 years of experience,
            our expert team helps patients reclaim their mobility and quality of life.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To provide accessible, evidence-based physiotherapy services that empower patients to heal
            faster and live better — through personalized care, modern technology, and compassionate support.
          </p>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '🏆', title: '15+ Years', desc: 'Of clinical excellence' },
            { icon: '👨‍⚕️', title: 'Expert Team', desc: 'Certified physiotherapists' },
            { icon: '❤️', title: '500+ Patients', desc: 'Successfully treated' },
          ].map((card) => (
            <div key={card.title} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="font-bold text-gray-900 text-lg">{card.title}</div>
              <div className="text-gray-500 text-sm">{card.desc}</div>
            </div>
          ))}
        </section>
        <div className="text-center">
          <Link href="/contact" className="px-8 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
