import Link from 'next/link'

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-10">Manage appointments, content, and reports.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: '📅', label: 'Appointments', href: '/admin/appointments', desc: 'View and manage all bookings' },
          { icon: '🏥', label: 'Treatments', href: '/admin/content/treatments', desc: 'Add and edit treatments' },
          { icon: '⚕️', label: 'Machines', href: '/admin/content/machines', desc: 'Manage clinic equipment' },
          { icon: '💰', label: 'Pricing', href: '/admin/content/pricing', desc: 'Update pricing information' },
          { icon: '💬', label: 'Stories', href: '/admin/stories', desc: 'Approve patient stories' },
          { icon: '📊', label: 'Reports', href: '/admin/reports', desc: 'View analytics and reports' },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{card.label}</h3>
            <p className="text-sm text-gray-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
