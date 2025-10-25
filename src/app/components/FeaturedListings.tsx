
// app/components/FeaturedListings.tsx
import RoomCard from './RoomCard'

const listings = [
  { imageUrl: '/hero-image.jpg', title: 'Quarto Iluminado no Centro', location: 'São Paulo, SP', price: 1500, rating: 4.8 },
  { imageUrl: '/hero-image.jpg', title: 'Suíte Aconchegante com Varanda', location: 'Rio de Janeiro, RJ', price: 1800, rating: 4.9 },
  { imageUrl: '/hero-image.jpg', title: 'Loft Moderno perto da Universidade', location: 'Belo Horizonte, MG', price: 1200, rating: 4.5 },
  { imageUrl: '/hero-image.jpg', title: 'Quarto com Vista para o Mar', location: 'Salvador, BA', price: 2200, rating: 1.7 },
];

export default function FeaturedListings() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Espaços em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {listings.map((listing, index) => (
            <RoomCard key={index} {...listing} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/listings" className="bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors">
            Ver todos os quartos
          </a>
        </div>
      </div>
    </section>
  )
}