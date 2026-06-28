'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Treatment {
  id: string
  name: string
  specialty: string
  price_per_session: number
}

export default function AdminTreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/treatments`)
      .then((r) => r.json())
      .then((d) => setTreatments(d || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Treatments</h1>
        <Link href="/admin/content/treatments/new" className="px-5 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition">
          + Add Treatment
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Specialty</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Price / Session</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((t, i) => (
                <tr key={t.id} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-900">{t.name}</td>
                  <td className="px-6 py-4"><span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">{t.specialty}</span></td>
                  <td className="px-6 py-4 text-gray-600">₹{t.price_per_session}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-red-700 font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {treatments.length === 0 && <p className="text-center py-10 text-gray-500">No treatments found.</p>}
        </div>
      )}
    </div>
  )
}
