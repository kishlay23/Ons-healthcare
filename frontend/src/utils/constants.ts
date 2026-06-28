export const APP_NAME = 'ONS Healthcare'
export const APP_TAGLINE = 'Heal Your Body, Transform Your Life'
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const SPECIALTIES = ['Ortho', 'Neuro', 'Sports'] as const
export type Specialty = (typeof SPECIALTIES)[number]

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Machines', href: '/machines' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Stories', href: '/stories' },
  { label: 'About', href: '/about' },
] as const
