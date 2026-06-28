'use client'

import { useState, useEffect } from 'react'

interface Appointment {
  id: string
  appointment_date: string
  appointment_time: string
  status: string
  treatment_name?: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/patient?status=completed`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setHistory(d || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Treatment History</h1>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading history...</div>
      ) : history.length > 0 ? (
        <div className="space-y-4">
          {history.map((appt) => (
            <div key={appt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{appt.treatment_name ?? 'Treatment'}</p>
                <p className="text-sm text-gray-500">{appt.appointment_date} at {appt.appointment_time}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Completed</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">📋</div>
          <p>No completed appointments yet.</p>
        </div>
      )}
    </div>
  )
}
