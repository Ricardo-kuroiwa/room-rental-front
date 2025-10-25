// app/components/RoomCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'

interface RoomCardProps {
  imageUrl: string;
  title: string;
  location: string;
  price: number;
  rating: number;
}

export default function RoomCard({ imageUrl, title, location, price, rating }: RoomCardProps) {
  return (
    <Link href="#" className="group block bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-bold">
          R$ {price}/mês
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate text-gray-900 group-hover:text-violet-600 transition-colors">{title}</h3>
        <p className="flex items-center text-gray-600 text-sm mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </p>
        <div className="flex items-center mt-4">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-current' : 'stroke-current'}`} />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}
