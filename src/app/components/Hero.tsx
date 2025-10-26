// app/components/Hero.tsx
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import Image from 'next/image'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'RoomRental - Encontre seu espaço ideal',
  description: 'A página que você está procurando não existe ou foi movida.',
}


export default function Hero() {
  return (
    <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center text-white">
      {/* Background Image */}
      <Image 
        src="/hero-image.jpg" // Coloque sua imagem em public/modern-room.jpg
        alt="Quarto moderno e aconchegante"
        fill
        className="object-cover -z-30  brightness-[.6]"
        priority
      />

      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl text-gray-200 md:text-6xl font-black mb-4 leading-tight">
          Seu próximo espaço, a um clique de distância.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Encontre espaços verificados, de curta ou longa duração, em qualquer lugar.
        </p>
        
      </div>
    </section>
  )
}