'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewTreatmentPage() {
  const [form, setForm] = useState({ name: '', description: '', specialty: '', duration_minutes: '', standard_sessions: '', price_per_session: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/treatments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, duration_minutes: +form.duration_minutes, standard_sessions: +form.standard_sessions, price_per_session: +form.price_per_session }),
      })
      if (!res.ok) { const d = await res.json(); setError(d.message || 'Failed'); return }
      router.push('/admin/content/treatments')
    } catch { setError('Something went wrong.') }
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Treatment</h1>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition resize-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
          <select name="specialty" value={form.specialty} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" required>
            <option value="">Select</option>
            <option value="Ortho">Ortho</option>
            <option value="Neuro">Neuro</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Duration (min)', key: 'duration_minutes' },
            { label: 'Sessions', key: 'standard_sessions' },
            { label: 'Price (₹)', key: 'price_per_session' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label} *</label>
              <input type="number" name={f.key} value={form[f.key as keyof typeof form]} onChange={handleChange} min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" required />
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition disabled:opacity-60">
          {loading ? 'Saving...' : 'Add Treatment'}
        </button>
      </form>
    </div>
  )
}
