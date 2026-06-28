'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Treatment {
  id: string
  name: string
  description: string
  specialty: string
  duration_minutes: number
  standard_sessions: number
  price_per_session: number
}

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [filtered, setFiltered] = useState<Treatment[]>([])
  const [specialty, setSpecialty] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/treatments`)
        const data = await res.json()
        setTreatments(data || [])
        setFiltered(data || [])
      } catch (error) {
        console.error('Failed to fetch treatments:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTreatments()
  }, [])

  useEffect(() => {
    let result = treatments
    if (specialty !== 'all') result = result.filter((t) => t.specialty === specialty)
    if (searchTerm) result = result.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFiltered(result)
  }, [specialty, searchTerm, treatments])

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Our Treatments</h1>
        <p className="text-red-100 max-w-xl mx-auto">
          Explore our comprehensive range of physiotherapy treatments
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-lg"
            />
            <span className="absolute right-4 top-3.5 text-gray-400 text-xl">🔍</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {['all', 'Ortho', 'Neuro', 'Sports'].map((spec) => (
              <button
                key={spec}
                onClick={() => setSpecialty(spec)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  specialty === spec
                    ? 'bg-red-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {spec === 'all' ? 'All Specialties' : spec}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading treatments...</div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((treatment) => (
              <div key={treatment.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-red-50 to-red-100 h-40 flex items-center justify-center text-5xl">
                  🏥
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{treatment.name}</h3>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                      {treatment.specialty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{treatment.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mb-4">
                    <span>⏱️ {treatment.duration_minutes} min</span>
                    <span>📋 ~{treatment.standard_sessions} sessions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-700 font-bold text-lg">₹{treatment.price_per_session}</span>
                    <Link
                      href={`/treatments/${treatment.id}`}
                      className="text-sm font-semibold text-red-700 hover:underline"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">No treatments found</div>
        )}
      </div>
    </div>
  )
}
