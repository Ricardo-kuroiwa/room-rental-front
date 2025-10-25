// app/components/Footer.tsx
import Link from 'next/link'
import { BedDouble, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BedDouble className="h-7 w-7 text-violet-500" />
              <span className="text-xl font-bold text-white">Roomly</span>
            </Link>
            <p className="text-sm">Sua casa longe de casa.</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Roomly. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white"><Facebook /></a>
            <a href="#" className="hover:text-white"><Instagram /></a>
            <a href="#" className="hover:text-white"><Twitter /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}