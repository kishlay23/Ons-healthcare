import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

async function getStory(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function StoryDetailPage({ params }: Props) {
  const { id } = await params
  const story = await getStory(id)

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Story Not Found</h1>
          <Link href="/stories" className="text-red-700 hover:underline">Back to Stories</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/stories" className="text-red-700 hover:underline text-sm mb-6 inline-block">← Back to Stories</Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">👤</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{story.name}</h1>
            <p className="text-gray-500">{story.condition}</p>
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">{story.specialty}</span>
          </div>
          <div className="ml-auto flex gap-1">
            {Array.from({ length: story.rating || 5 }).map((_: unknown, i: number) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{story.story_text}</p>
      </div>
    </div>
  )
}
