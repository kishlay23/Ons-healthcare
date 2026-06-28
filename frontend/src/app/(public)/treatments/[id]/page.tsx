import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

async function getTreatment(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/treatments/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { id } = await params
  const treatment = await getTreatment(id)

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Treatment Not Found</h1>
          <Link href="/treatments" className="text-red-700 hover:underline">Back to Treatments</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/treatments" className="text-red-700 hover:underline text-sm mb-6 inline-block">
        ← Back to Treatments
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-700 to-red-900 h-48 flex items-center justify-center text-7xl">
          🏥
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{treatment.name}</h1>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {treatment.specialty}
            </span>
          </div>
          <p className="text-gray-600 mb-6">{treatment.description}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-red-700">{treatment.duration_minutes}</div>
              <div className="text-xs text-gray-500 mt-1">Minutes / Session</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-red-700">{treatment.standard_sessions}</div>
              <div className="text-xs text-gray-500 mt-1">Recommended Sessions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-red-700">₹{treatment.price_per_session}</div>
              <div className="text-xs text-gray-500 mt-1">Per Session</div>
            </div>
          </div>
          <Link
            href="/appointments/new"
            className="inline-block px-8 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition"
          >
            Book This Treatment
          </Link>
        </div>
      </div>
    </div>
  )
}
