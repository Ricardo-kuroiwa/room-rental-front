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
    <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center text-white">
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
          Seu próximo quarto, a um clique de distância.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Encontre quartos verificados, de curta ou longa duração, em qualquer lugar.
        </p>

        {/* Search Bar */}
        <div className="bg-white max-w-4xl mx-auto rounded-full p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center w-full md:w-1/3 pl-4">
            <MapPin className="text-gray-400 mr-2" />
            <input type="text" placeholder="Onde você quer morar?" className="w-full focus:outline-none text-gray-700" />
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200" />
          <div className="flex items-center w-full md:w-1/3 pl-4">
            <Calendar className="text-gray-400 mr-2" />
            <input type="text" placeholder="Check-in - Check-out" className="w-full focus:outline-none text-gray-700" />
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200" />
          <div className="flex items-center w-full md:w-1/3 pl-4">
            <Users className="text-gray-400 mr-2" />
            <input type="text" placeholder="Hóspedes" className="w-full focus:outline-none text-gray-700" />
          </div>
          <button className="bg-violet-600 rounded-full p-3 md:p-4 hover:bg-violet-700 transition-transform hover:scale-105">
            <Search className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}