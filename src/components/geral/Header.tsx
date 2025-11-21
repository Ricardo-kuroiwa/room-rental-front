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
      </div>
    </header>
  )
}