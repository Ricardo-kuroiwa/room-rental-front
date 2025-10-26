// app/page.tsx

import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWork'
import FeaturedListings from './components/FeaturedListings'
import Footer from './components/Footer'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Space Rental - Encontre Seu Espaço Perfeito',
  description: 'A página que você está procurando não existe ou foi movida.',
}
export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedListings />
      </main>
      <Footer />
    </div>
  )
}