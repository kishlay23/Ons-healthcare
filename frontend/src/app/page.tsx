import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import SpecialtiesSection from '@/components/home/SpecialtiesSection'
import StoriesCarousel from '@/components/home/StoriesCarousel'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SpecialtiesSection />
        <WhyChooseUs />
        <StoriesCarousel />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
