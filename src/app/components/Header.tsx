// app/components/Header.tsx
import { KeyRound, Menu } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <KeyRound className="h-7 w-7 text-violet-600" />
          <span className="text-xl font-bold text-gray-900">Space Rental</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/listings" className="text-gray-600 hover:text-violet-600 transition-colors">Encontrar Quarto</Link>
          <Link href="/about" className="text-gray-600 hover:text-violet-600 transition-colors">Sobre Nós</Link>
          <Link href="/contact" className="text-gray-600 hover:text-violet-600 transition-colors">Contato</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Entrar</Link>
          <Link href="/register" className="bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-700 transition-colors">
            Cadastre-se
          </Link>
          <button className="md:hidden text-gray-800">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  )
}