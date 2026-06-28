'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Story {
  id: string
  name: string
  condition: string
  specialty: string
  story_text: string
  rating: number
  photo_url?: string
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [filtered, setFiltered] = useState<Story[]>([])
  const [specialty, setSpecialty] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories`)
        const data = await res.json()
        setStories(data || [])
        setFiltered(data || [])
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  useEffect(() => {
    setFiltered(specialty === 'all' ? stories : stories.filter((s) => s.specialty === specialty))
  }, [specialty, stories])

  return (
    <div>
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Patient Success Stories</h1>
        <p className="text-red-100 max-w-xl mx-auto">Real transformations from real patients</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {['all', 'Ortho', 'Neuro', 'Sports'].map((spec) => (
              <button
                key={spec}
                onClick={() => setSpecialty(spec)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  specialty === spec ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {spec === 'all' ? 'All Stories' : spec}
              </button>
            ))}
          </div>
          <Link
            href="/stories/submit"
            className="px-5 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition"
          >
            + Share Your Story
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading stories...</div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-xs text-gray-500">{story.condition}</p>
                  </div>
                  <span className="ml-auto text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    {story.specialty}
                  </span>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">"{story.story_text}"</p>
                <Link
                  href={`/stories/${story.id}`}
                  className="text-sm font-semibold text-red-700 hover:underline"
                >
                  Read Full Story →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">No stories found</div>
        )}
      </div>
    </div>
  )
}
