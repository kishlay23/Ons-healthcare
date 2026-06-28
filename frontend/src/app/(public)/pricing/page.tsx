'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface PricingItem {
  id: string
  name: string
  specialty: string
  price_per_session: number
  standard_sessions: number
}

export default function PricingPage() {
  const [items, setItems] = useState<PricingItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/treatments`)
      .then((r) => r.json())
      .then((d) => setItems(d || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Transparent Pricing</h1>
        <p className="text-red-100 max-w-xl mx-auto">No hidden fees — know exactly what you pay</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading pricing...</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Treatment</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Specialty</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Per Session</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Package (est.)</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">{item.specialty}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-red-700">₹{item.price_per_session}</td>
                    <td className="px-6 py-4 text-gray-600">₹{item.price_per_session * item.standard_sessions}</td>
                    <td className="px-6 py-4">
                      <Link href="/appointments/new" className="text-sm text-red-700 font-semibold hover:underline">Book</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-gray-500 text-sm text-center mt-6">
          Package estimate based on recommended sessions. Actual sessions may vary.
        </p>
      </div>
    </div>
  )
}
