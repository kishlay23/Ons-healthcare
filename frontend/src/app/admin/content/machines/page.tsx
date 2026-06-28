'use client'

import { useState, useEffect } from 'react'

interface Machine { id: string; name: string; brand: string; model: string; specialty: string }

export default function AdminMachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/machines`)
      .then((r) => r.json())
      .then((d) => setMachines(d || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Machines</h1>
        <button className="px-5 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition">+ Add Machine</button>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-3xl mb-3">⚕️</div>
              <h3 className="font-bold text-gray-900">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.brand} — {m.model}</p>
              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full mt-2 inline-block">{m.specialty}</span>
              <button className="block mt-3 text-sm text-red-700 font-semibold hover:underline">Edit</button>
            </div>
          ))}
          {machines.length === 0 && <p className="col-span-3 text-center py-10 text-gray-500">No machines found.</p>}
        </div>
      )}
    </div>
  )
}
