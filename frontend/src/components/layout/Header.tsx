'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import ONSLogo from '@/components/common/ONSLogo'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => { logout(); router.push('/') }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/treatments', label: 'Treatments' },
    { href: '/machines', label: 'Machines' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/stories', label: 'Stories' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 border-b border-purple-500/20'
          : 'py-4 border-b border-purple-500/10'
      }`}
      style={{
        background: isScrolled
          ? 'rgba(13,8,32,0.97)'
          : 'rgba(13,8,32,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <ONSLogo height={48} dark />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-purple-300 font-medium transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href={user.role === 'ADMIN' ? '/admin' : '/patient/dashboard'}
                className="px-4 py-2 text-purple-300 border border-purple-500/40 rounded-lg hover:bg-purple-500/10 transition font-medium text-sm"
              >
                {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-purple-300 border border-purple-500/40 rounded-lg hover:bg-purple-500/10 transition font-medium text-sm"
              >
                Login
              </Link>
              <Link
                href="/patient/appointments/new"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm shadow-lg shadow-purple-900/50"
              >
                Book Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-purple-500/20"
          style={{ background: 'rgba(13,8,32,0.98)' }}>
          <nav className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-white/70 hover:text-purple-300 font-medium py-1"
                onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-purple-500/20">
              {user ? (
                <>
                  <Link href={user.role === 'ADMIN' ? '/admin' : '/patient/dashboard'}
                    className="px-4 py-2 text-center text-purple-300 border border-purple-500/40 rounded-lg"
                    onClick={() => setIsOpen(false)}>
                    {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login"
                    className="px-4 py-2 text-center text-purple-300 border border-purple-500/40 rounded-lg"
                    onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link href="/patient/appointments/new"
                    className="px-4 py-2 text-center bg-purple-600 text-white rounded-lg"
                    onClick={() => setIsOpen(false)}>
                    Book Now
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
