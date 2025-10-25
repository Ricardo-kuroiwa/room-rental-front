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
    // Contêiner principal da página inteira (cinza)
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 border-2 border-dashed border-gray-400">
      
      {/* Contêiner do Grid que alinha os dois blocos principais (vermelho) */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center border-4 border-red-500">
        
        {/* ===== Bloco da Esquerda - Conteúdo (azul) ===== */}
        {/* ADICIONAMOS O bg-gray-900 DE VOLTA AQUI! */}
        <div className="bg-slate-800 h-full min-h-[500px] rounded-2xl
                        flex flex-col justify-between 
                        p-8 md:p-12 text-white border-4 border-blue-500">
          
          {/* Grupo de texto superior (amarelo) */}
          <div className="border-2 border-yellow-400">
            
            {/* O h1 em si (rosa) */}
            <h1 className="font-inter font-black text-5xl md:text-8xl leading-none border border-pink-500">
              Erro 404
              <span className="block text-violet-400">Oops!</span>
            </h1>
            
            {/* O grupo de subtítulo e parágrafo (ciano) */}
            <div className="mt-8 space-y-4 border-2 border-cyan-400">
              
              <h2 className="font-poppins text-gray-200 text-3xl md:text-4xl font-bold border border-dashed border-orange-500">
                Página não encontrada
              </h2>
              
              <p className="font-inter text-gray-200 text-lg md:text-xl border border-dashed border-orange-500">
                A página que você está procurando não existe ou foi movida.
              </p>
            </div>
          </div>

          {/* Grupo do botão inferior (índigo/roxo) */}
          <div className="flex justify-center md:justify-start border-2 border-indigo-500">
            
            <div className="w-full sm:w-auto border-2 border-lime-400">
              <Link
                href="/"
                className="inline-block text-center font-poppins font-semibold 
                          px-8 py-4 bg-violet-600 hover:bg-purple-700 
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
        <div className="relative h-full  md:min-h-[500px] w-full border-8 border-green-500 hidden md:block">
          <Image
            src="/404-illustration.svg"
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