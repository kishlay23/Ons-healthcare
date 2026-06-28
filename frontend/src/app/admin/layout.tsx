import Header from '@/components/layout/Header'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20 min-h-screen bg-gray-100">{children}</main>
    </>
  )
}
