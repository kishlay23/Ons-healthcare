'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AppointmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [appt, setAppt] = useState<Record<string, string> | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setAppt)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleCancel = async () => {
    if (!confirm('Cancel this appointment?')) return
    const token = localStorage.getItem('token')
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    router.push('/patient/appointments')
  }

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>
  if (!appt) return <div className="text-center py-20 text-gray-500">Appointment not found.</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/patient/appointments" className="text-red-700 hover:underline text-sm mb-6 inline-block">← Back</Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
        {Object.entries(appt).map(([key, value]) => (
          <div key={key} className="flex gap-2 text-sm">
            <span className="font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>
            <span className="text-gray-600">{String(value)}</span>
          </div>
        ))}
        {appt.status !== 'cancelled' && appt.status !== 'completed' && (
          <button onClick={handleCancel} className="mt-4 px-5 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition">
            Cancel Appointment
          </button>
        )}
      </div>
    </div>
  )
}
