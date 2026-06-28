'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Story {
  id: string
  name: string
  condition: string
  specialty: string
  story_text: string
  rating: number
  // Prisma-style (from new backend)
  patient?: { firstName: string; lastName: string }
  storyText?: string
}

const SPECIALTY_COLOR: Record<string, string> = {
  Ortho:  'bg-red-100 text-red-700',
  Neuro:  'bg-blue-100 text-blue-700',
  Sports: 'bg-green-100 text-green-700',
}

const AVATARS = ['👨‍💼', '👩‍⚕️', '👨‍🦱', '👩‍💼', '🧑‍⚕️', '👩‍🦰', '👨‍🦳', '🧑‍💼']

const CARDS_PER_PAGE = 3

export default function StoriesCarousel() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)        // which "window" of 3 we're showing
  const [activeCard, setActiveCard] = useState(0) // index within the window
  const [paused, setPaused] = useState(false)

  // Fetch all published stories from backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories`)
      .then((r) => r.json())
      .then((data: Story[]) => {
        setStories(Array.isArray(data) ? data : [])
      })
      .catch(() => setStories([]))
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(stories.length / CARDS_PER_PAGE)

  // Current window of stories to display
  const visibleStories = stories.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  )

  const prevPage = useCallback(() => {
    setPage((p) => (p - 1 + totalPages) % totalPages)
    setActiveCard(0)
    setPaused(true)
  }, [totalPages])

  const nextPage = useCallback(() => {
    setPage((p) => (p + 1) % totalPages)
    setActiveCard(0)
    setPaused(true)
  }, [totalPages])

  // Auto-advance
  useEffect(() => {
    if (paused || stories.length === 0) return
    const timer = setInterval(() => nextPage(), 6000)
    return () => clearInterval(timer)
  }, [paused, stories.length, nextPage])

  const getDisplayName = (story: Story) => {
    if (story.patient) return `${story.patient.firstName} ${story.patient.lastName}`
    return story.name || 'Patient'
  }

  const getExcerpt = (story: Story) => {
    const text = story.storyText || story.story_text || ''
    return text.length > 120 ? text.slice(0, 120) + '…' : text
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-red-100 text-red-700 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Patient Transformations</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Real stories from real patients who reclaimed their lives through physiotherapy.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading stories…</div>
        ) : stories.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No stories yet.</div>
        ) : (
          <>
            {/* Cards + side arrows */}
            <div className="relative">
              {/* Left arrow */}
              <button
                onClick={prevPage}
                disabled={totalPages <= 1}
                aria-label="Previous stories"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-red-700 hover:text-white hover:border-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right arrow */}
              <button
                onClick={nextPage}
                disabled={totalPages <= 1}
                aria-label="Next stories"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-red-700 hover:text-white hover:border-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {visibleStories.map((story, i) => {
                  const globalIdx = page * CARDS_PER_PAGE + i
                  return (
                    <div
                      key={story.id}
                      onClick={() => setActiveCard(i)}
                      className={`bg-white rounded-2xl p-7 cursor-pointer transition-all duration-300 ${
                        i === activeCard
                          ? 'shadow-xl border-2 border-red-300 scale-[1.03] ring-1 ring-red-100'
                          : 'shadow-sm border border-gray-100 hover:shadow-md opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                          i === activeCard ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {AVATARS[globalIdx % AVATARS.length]}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{getDisplayName(story)}</div>
                          <div className="text-xs text-red-700 font-medium">{story.condition}</div>
                        </div>
                        <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${
                          SPECIALTY_COLOR[story.specialty] ?? 'bg-gray-100 text-gray-600'
                        }`}>
                          {story.specialty}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: story.rating ?? 5 }).map((_, j) => (
                          <span key={j} className="text-yellow-400 text-base">★</span>
                        ))}
                      </div>

                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        &ldquo;{getExcerpt(story)}&rdquo;
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dot indicators with inline arrows */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <button
                onClick={prevPage}
                disabled={totalPages <= 1}
                aria-label="Previous"
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-red-700 hover:text-white hover:border-red-700 disabled:opacity-30 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i); setActiveCard(0); setPaused(true) }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === page ? 'w-8 bg-red-700' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={totalPages <= 1}
                aria-label="Next"
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-red-700 hover:text-white hover:border-red-700 disabled:opacity-30 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Story count */}
            <p className="text-center text-xs text-gray-400 mb-6">
              Showing {page * CARDS_PER_PAGE + 1}–{Math.min((page + 1) * CARDS_PER_PAGE, stories.length)} of {stories.length} stories
            </p>
          </>
        )}

        <div className="text-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-800 transition-all shadow-lg shadow-red-200"
          >
            View All Stories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
