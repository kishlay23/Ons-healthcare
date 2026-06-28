import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20 min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  )
}
