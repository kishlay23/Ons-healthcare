'use client'

import { useAuth } from '@/lib/hooks/useAuth'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-4xl">👤</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full capitalize">{user?.role}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Phone', value: user?.phone },
            { label: 'Age', value: user?.age },
            { label: 'Gender', value: user?.gender },
            { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—' },
          ].map((field) => (
            <div key={field.label} className="p-4 bg-gray-50 rounded-xl">
              <div className="text-gray-500 text-xs mb-1">{field.label}</div>
              <div className="font-semibold text-gray-900">{field.value ?? '—'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
