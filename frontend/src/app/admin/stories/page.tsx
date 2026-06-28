'use client'

import { useState, useEffect } from 'react'

interface Story {
  id: string
  name: string
  condition: string
  specialty: string
  status: string
  story_text: string
}

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setStories(d || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Patient Stories</h1>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-500">{story.condition} — {story.specialty}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 italic">"{story.story_text}"</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    story.status === 'published' ? 'bg-green-100 text-green-700'
                    : story.status === 'rejected' ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                  }`}>{story.status}</span>
                  {story.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(story.id, 'published')} className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition">Approve</button>
                      <button onClick={() => updateStatus(story.id, 'rejected')} className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition">Reject</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {stories.length === 0 && <p className="text-center py-20 text-gray-500">No stories found.</p>}
        </div>
      )}
    </div>
  )
}
