// app/components/HostCTA.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function HostCTA() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-16 flex items-center">
          <Image 
            src="/host-background.jpg" 
            alt="Anfitriã sorrindo"
            fill
            className="object-cover -z-10 brightness-50"
          />
          <div className="relative max-w-xl text-white">
            <h2 className="text-4xl font-bold mb-4">Torne-se um Anfitrião</h2>
            <p className="text-lg mb-8 text-gray-200">
              Ganhe uma renda extra alugando seu quarto vago. Nós cuidamos da segurança e do marketing para você.
            </p>
            <Link href="/become-a-host" className="bg-white text-violet-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors">
              Comece a Anunciar
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}