'use client'

import { useState } from 'react'

const FAQS = [
  { q: 'What is physiotherapy?', a: 'Physiotherapy is a healthcare profession that helps people restore movement and function after injury, illness or disability.' },
  { q: 'How do I book an appointment?', a: 'You can book online through our website, call us directly, or walk in to our clinic.' },
  { q: 'How many sessions will I need?', a: 'It depends on the condition and severity. Your therapist will provide an estimated plan during the first session.' },
  { q: 'Do I need a referral?', a: 'No referral is needed for most cases. You can directly book an appointment.' },
  { q: 'What should I wear to my appointment?', a: 'Wear comfortable, loose-fitting clothing that allows access to the area being treated.' },
  { q: 'Is physiotherapy covered by insurance?', a: 'Many health insurance plans cover physiotherapy. Please check with your insurer for details.' },
]

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-red-100 max-w-xl mx-auto">Everything you need to know before your visit</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              className="w-full text-left px-6 py-4 font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.q}
              <span className="text-red-700 text-xl">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
