'use client'

import { useState, useEffect } from 'react'

interface Appointment {
  id: string
  patient_name?: string
  appointment_date: string
  appointment_time: string
  status: string
  treatment_name?: string
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`, {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Appointments</h1>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Patient</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Treatment</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Time</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, i) => (
                <tr key={appt.id} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm text-gray-900">{appt.patient_name ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appt.treatment_name ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appt.appointment_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appt.appointment_time}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[appt.status] ?? 'bg-gray-100 text-gray-700'}`}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <p className="text-center py-10 text-gray-500">No appointments found.</p>
          )}
        </div>
      )}
    </div>
  )
}
