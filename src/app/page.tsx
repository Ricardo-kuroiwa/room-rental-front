// app/page.tsx

import Header from '@/components/geral/Header'
import Footer from '@/components/geral/Footer'
import type { Metadata } from 'next'
import { LoginForm } from '@/components/geral/LoginForm'
export const metadata: Metadata = {
  title: 'Space Rental - Encontre Seu Espaço Perfeito',
  description: 'A página que você está procurando não existe ou foi movida.',
}
export default function HomePage() {
  return (
    <div className="bg-gray-50  text-gray-800 min-h-screen flex flex-col">
          <Header />
          
          <LoginForm />
          
          <Footer />
    </div>
  )
}