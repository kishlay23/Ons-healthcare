import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20 min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        {children}
      </main>
      <Footer />
    </>
  )
}
