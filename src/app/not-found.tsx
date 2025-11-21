// app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Página Não Encontrada - Erro 404',
  description: 'A página que você está procurando não existe ou foi movida.',
}
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 p-4 ">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center ">
        
        <div className="bg-slate-800 h-full min-h-[500px] rounded-2xl
                        flex flex-col justify-between 
                        p-8 md:p-12 text-white  ">
          
          <div className="">
            
            <h1 className="font-inter font-black text-5xl md:text-8xl leading-none">
              Erro 404
              <span className="block text-violet-400">Oops!</span>
            </h1>
            
            <div className="mt-8 space-y-4 ">
              
              <h2 className="font-poppins text-gray-200 text-3xl md:text-4xl font-bold ">
                Página não encontrada
              </h2>
              
              <p className="font-inter text-gray-200 text-lg md:text-xl ">
                A página que você está procurando não existe ou foi removida.
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-start ">
            
            <div className="w-full sm:w-auto ">
              <Link
                href="/"
                className="inline-block text-center font-poppins font-semibold 
                          px-8 py-4 bg-violet-500 hover:bg-purple-700 
                          text-white text-lg rounded-xl
                          transition-all duration-200 transform hover:scale-105
                          w-full"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Bloco da Direita - Imagem (verde) ===== */}
        <div className="relative h-full  md:min-h-[500px] w-full  hidden md:block">
          <Image
            src="/404-illustration-space.svg"
            alt="Ilustração de erro 404"
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </div>
  )
}