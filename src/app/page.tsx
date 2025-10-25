// app/page.tsx

import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWork'
import FeaturedListings from './components/FeaturedListings'
import HostCTA from './components/HostCTA'
import Footer from './components/Footer'

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