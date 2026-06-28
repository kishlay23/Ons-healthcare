'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire to API
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Change Password</h2>
        {saved && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">Password updated successfully!</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Current Password', key: 'current' },
            { label: 'New Password', key: 'new' },
            { label: 'Confirm New Password', key: 'confirm' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type="password"
                value={passwords[field.key as keyof typeof passwords]}
                onChange={(e) => setPasswords((p) => ({ ...p, [field.key]: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                required
              />
            </div>
          ))}
          <button type="submit" className="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition">
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}
