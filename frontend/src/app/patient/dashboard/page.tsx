'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {user?.firstName ?? 'Patient'}!
      </h1>
      <p className="text-gray-500 mb-10">Here&apos;s an overview of your health journey.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { icon: '📅', label: 'Upcoming', value: '—', link: '/patient/appointments' },
          { icon: '✅', label: 'Completed', value: '—', link: '/patient/history' },
          { icon: '💊', label: 'Treatments', value: '—', link: '/treatments' },
          { icon: '⭐', label: 'Reviews', value: '—', link: '/stories' },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.link}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/patient/appointments/new"
          className="px-6 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition"
        >
          Book New Appointment
        </Link>
        <Link
          href="/patient/profile"
          className="px-6 py-3 border border-red-700 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}
