'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Appointment {
  id: string
  appointment_date: string
  appointment_time: string
  status: string
  treatment_name?: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/patient`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setAppointments(d || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
        <Link href="/patient/appointments/new" className="px-5 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition">
          + Book New
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading appointments...</div>
      ) : appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{appt.treatment_name ?? 'Treatment'}</p>
                <p className="text-sm text-gray-500">{appt.appointment_date} at {appt.appointment_time}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[appt.status] ?? 'bg-gray-100 text-gray-700'}`}>
                  {appt.status}
                </span>
                <Link href={`/patient/appointments/${appt.id}`} className="text-sm text-red-700 font-semibold hover:underline">
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">📅</div>
          <p className="mb-4">No appointments yet.</p>
          <Link href="/patient/appointments/new" className="text-red-700 font-semibold hover:underline">Book your first appointment</Link>
        </div>
      )}
    </div>
  )
}
