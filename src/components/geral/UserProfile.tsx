"use client";

import { useRouter } from "next/navigation";
import { UsuarioResponse } from "@/types/usuario";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Network, 
  Pencil, 
  UserCircle 
} from "lucide-react";

interface UserProfileProps {
  user: UsuarioResponse;
}

export function UserProfile({ user }: UserProfileProps) {
  const router = useRouter();

  // Função para pegar iniciais (ex: Fabio Silva -> FS)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Função para navegar para a edição
  const handleEdit = () => {
    router.push(`/dashboard/usuarios/editar-usuario/${user.email}`);
  };

  // Tratamento seguro para exibir o nível
  const nivelDisplay = typeof user.nivel === 'object' && user.nivel 
    ? user.nivel.nivel 
    : user.nivel;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-green-100 overflow-hidden">
      {/* Cabeçalho com fundo colorido */}
      <div className="bg-green-50 p-8 flex flex-col md:flex-row items-center gap-6 border-b border-green-100">
       
        <div className="text-center md:text-left  flex-1">
          <h2 className="text-3xl font-bold text-gray-800">{user.nome}</h2>
        </div>

        <Button 
          onClick={handleEdit} 
          size="lg" 
          className="bg-green-600 hover:bg-green-700 text-white shadow-md"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Editar Informações
        </Button>
      </div>

      <CardContent className="p-8">
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 text-gray-700">
                Dados
            </h3>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                   Email :<span className=" text-base font-medium pl-6">{user.email}</span>
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                   Telefone :<span className=" text-base font-medium pl-6">{user.telefone}</span>
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                   Ramal Interno:<span className=" text-base font-medium pl-6"> {user.ramal ? user.ramal : <span className="text-gray-400 italic">Não informado</span>}</span>
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Nível de Acesso :<span className=" text-base font-medium pl-6">{String(nivelDisplay)}</span></p>
            </div>


        </div>
        
      </CardContent>
    </Card>
  );
}