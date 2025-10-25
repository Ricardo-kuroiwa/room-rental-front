// app/components/HowItWorks.tsx
import { Search, ShieldCheck, Home } from 'lucide-react'

const steps = [
  {
    icon: <Search className="h-10 w-10 text-violet-600" />,
    title: 'Busque e Encontre',
    description: 'Use nossos filtros avançados para encontrar o quarto perfeito para suas necessidades.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-violet-600" />,
    title: 'Reserve com Segurança',
    description: 'Todos os anúncios são verificados e seu pagamento é processado com segurança.',
  },
  {
    icon: <Home className="h-10 w-10 text-violet-600" />,
    title: 'Mude-se!',
    description: 'Após a confirmação, é só arrumar as malas e se preparar para sua nova casa.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Como Funciona</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-violet-100 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}