import Link from 'next/link'

interface Props { params: Promise<{ id: string }> }

async function getMachine(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/machines/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

export default async function MachineDetailPage({ params }: Props) {
  const { id } = await params
  const machine = await getMachine(id)

  if (!machine) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Machine Not Found</h1>
        <Link href="/machines" className="text-red-700 hover:underline">Back to Machines</Link>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/machines" className="text-red-700 hover:underline text-sm mb-6 inline-block">← Back to Machines</Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-48 flex items-center justify-center text-7xl">⚕️</div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{machine.name}</h1>
          <p className="text-gray-500 mb-4">{machine.brand} — {machine.model}</p>
          <p className="text-gray-700">{machine.description}</p>
        </div>
      </div>
    </div>
  )
}
