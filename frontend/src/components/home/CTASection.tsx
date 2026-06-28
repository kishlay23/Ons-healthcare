import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-red-700 to-red-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative w-full max-w-4xl mx-auto px-6 lg:px-12 text-center text-white">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
          Start Your Recovery Today
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
          Ready to Take the First Step?
        </h2>
        <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Book your appointment today and get a personalized treatment plan from our expert therapists.
          Your recovery journey begins with one click.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/patient/appointments/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-700 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:-translate-y-0.5"
          >
            Book Your Appointment
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/60 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
