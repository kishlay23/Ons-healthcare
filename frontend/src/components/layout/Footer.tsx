import Link from 'next/link'
import ONSLogo from '@/components/common/ONSLogo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <ONSLogo height={64} dark />
            </Link>
            <p className="text-sm leading-relaxed">
              Professional physiotherapy services for Ortho, Neuro, and Sports injuries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/treatments', label: 'Treatments' },
                { href: '/machines', label: 'Machines' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/stories', label: 'Patient Stories' },
                { href: '/about', label: 'About Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-white font-semibold mb-4">Specialties</h3>
            <ul className="space-y-2 text-sm">
              {['Orthopedic Therapy', 'Neurological Therapy', 'Sports Injury Recovery', 'Rehabilitation', 'Wellness Programs'].map(
                (s) => (
                  <li key={s}>{s}</li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-red-400">📞</span>
                <a href="tel:+919999999999" className="hover:text-white transition-colors">
                  +91-9999-999-999
                </a>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">✉️</span>
                <a href="mailto:info@onshealthcare.in" className="hover:text-white transition-colors">
                  info@onshealthcare.in
                </a>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">📍</span>
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {currentYear} ONS Healthcare. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
