'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire to API
    setSent(true)
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-red-100 max-w-xl mx-auto">We&apos;re here to help — reach out anytime</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>
          {[
            { icon: '📞', label: 'Phone', value: '+91-9999-999-999' },
            { icon: '✉️', label: 'Email', value: 'info@onshealthcare.in' },
            { icon: '📍', label: 'Address', value: 'Hardyal Road near kali mandir,Katihar, Bihar, India' },
            { icon: '🕐', label: 'Hours', value: 'Mon–Sun: 8am – 10pm' },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-gray-600">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-bold text-gray-900 text-lg">Message Sent!</h3>
              <p className="text-gray-500 text-sm mt-2">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition resize-none" required />
              </div>
              <button type="submit" className="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
