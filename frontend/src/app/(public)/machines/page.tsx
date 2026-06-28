'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Machine {
  id: string
  name: string
  brand: string
  model: string
  description: string
  specialty: string
}

export default function MachinesPage() {
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
    <div>
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Our Machines & Equipment</h1>
        <p className="text-red-100 max-w-xl mx-auto">State-of-the-art technology for effective treatment</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading machines...</div>
        ) : machines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <div key={machine.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-40 flex items-center justify-center text-5xl">⚕️</div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{machine.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{machine.brand} — {machine.model}</p>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">{machine.specialty}</span>
                  <p className="text-gray-600 text-sm mt-3 line-clamp-2">{machine.description}</p>
                  <Link href={`/machines/${machine.id}`} className="text-sm font-semibold text-red-700 hover:underline mt-4 inline-block">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">No machines found</div>
        )}
      </div>
    </div>
  )
}
