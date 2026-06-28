'use client'

import { useState, useEffect } from 'react'

interface PricingItem { id: string; name: string; specialty: string; price_per_session: number }

export default function AdminPricingPage() {
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Pricing</h1>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Treatment</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Specialty</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Price / Session</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4"><span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">{item.specialty}</span></td>
                  <td className="px-6 py-4 font-bold text-red-700">₹{item.price_per_session}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-red-700 font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
