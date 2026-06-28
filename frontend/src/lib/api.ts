const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    ;(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API error')
  }

  return response.json()
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email: string, password: string) =>
    apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  signup: (data: Record<string, unknown>) =>
    apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  logout: () => apiCall('/api/auth/logout', { method: 'POST' }),
}

// ── Treatments ────────────────────────────────────────────────────────────────
export const treatmentAPI = {
  getAll: () => apiCall('/api/treatments'),
  getById: (id: string) => apiCall(`/api/treatments/${id}`),
}

// ── Appointments ──────────────────────────────────────────────────────────────
export const appointmentAPI = {
  getAvailableSlots: (date: string, therapistId: string) =>
    apiCall(`/api/available-slots?date=${date}&therapistId=${therapistId}`),
  create: (data: Record<string, unknown>) =>
    apiCall('/api/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getPatientAppointments: () => apiCall('/api/bookings/patient'),
  cancel: (id: string) => apiCall(`/api/bookings/${id}`, { method: 'DELETE' }),
}

// ── Stories ───────────────────────────────────────────────────────────────────
export const storyAPI = {
  getAll: () => apiCall('/api/stories'),
  getById: (id: string) => apiCall(`/api/stories/${id}`),
  submit: (data: Record<string, unknown>) =>
    apiCall('/api/stories', { method: 'POST', body: JSON.stringify(data) }),
}
