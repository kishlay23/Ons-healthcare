export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Appointments', value: '—', icon: '📅', color: 'bg-blue-50' },
          { label: 'This Month Revenue', value: '—', icon: '💰', color: 'bg-green-50' },
          { label: 'Active Patients', value: '—', icon: '👥', color: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-6`}>
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        <p>Detailed analytics charts coming soon.</p>
      </div>
    </div>
  )
}
