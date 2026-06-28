export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  age?: number
  gender?: string
  role: 'patient' | 'therapist' | 'admin'
  createdAt: string
}

export interface Treatment {
  id: string
  name: string
  description: string
  specialty: 'Ortho' | 'Neuro' | 'Sports'
  durationMinutes: number
  standardSessions: number
  pricePerSession: number
  benefits: string[]
  conditions: string[]
}

export interface Appointment {
  id: string
  patientId: string
  therapistId: string
  treatmentId: string
  appointmentDate: string
  appointmentTime: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

export interface PatientStory {
  id: string
  patientId: string
  title: string
  storyText: string
  condition: string
  specialty: 'Ortho' | 'Neuro' | 'Sports'
  photoUrl?: string
  videoUrl?: string
  rating: number
  status: 'pending' | 'published' | 'rejected'
  featured: boolean
  createdAt: string
}

export interface Machine {
  id: string
  name: string
  brand: string
  model: string
  description: string
  imageUrl?: string
  specialty: string
  certifications: string[]
  acquiredDate: string
}
