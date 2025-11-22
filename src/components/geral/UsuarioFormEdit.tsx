"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, UserCog, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { updateUsuario } from "@/services/usuarioServices";
import { UsuarioResponse } from "@/types/usuario";

// --- SCHEMA DE VALIDAÇÃO ATUALIZADO ---
const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  telefone: z.string().min(8, "Telefone inválido"),
  ramal: z.string().optional(),
  nivel: z.string().min(1, "Selecione um nível de acesso"),
  
  senha: z.string().optional(),
  confirmarSenha: z.string().optional(),
}).superRefine(({ senha, confirmarSenha }, ctx) => {
  
  if (senha && senha.trim().length > 0) {
    
    if (senha.length < 10) {
      ctx.addIssue({
        code: "custom",
        message: "A senha deve ter no mínimo 10 caracteres",
        path: ["senha"],
      });
    }
    if (!/[A-Z]/.test(senha)) {
      ctx.addIssue({
        code: "custom",
        message: "A senha deve conter pelo menos uma letra maiúscula",
        path: ["senha"],
      });
    }
    if (!/[a-z]/.test(senha)) {
      ctx.addIssue({
        code: "custom",
        message: "A senha deve conter pelo menos uma letra minúscula",
        path: ["senha"],
      });
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha)) {
      ctx.addIssue({
        code: "custom",
        message: "A senha deve conter pelo menos um caractere especial (@, #, $, etc.)",
        path: ["senha"],
      });
    }
    if (senha !== confirmarSenha) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não conferem",
        path: ["confirmarSenha"],
      });
    }
  }
});

type FormValues = z.infer<typeof formSchema>;

interface NivelOption {
  id: number | string;
  nivel: string;
}

interface UsuarioFormEditProps {
  initialData: UsuarioResponse;
  niveis: NivelOption[];
}

export function UsuarioFormEdit({ initialData, niveis }: UsuarioFormEditProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: String(initialData.nome),
      telefone: String(initialData.telefone),
      ramal: initialData.ramal ? String(initialData.ramal) : "",
      nivel: initialData.nivel ? String(initialData.nivel.nivel) : "",
      senha: "",          
      confirmarSenha: "", 
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const telefoneLimpo = values.telefone.replace(/\D/g, "");

      const payload: any = {
        nome: values.nome,
        email: initialData.email,
        telefone: Number(telefoneLimpo),
        ramal: values.ramal ? Number(values.ramal) : null,
        nivel: Number(values.nivel), 
        
      };

      if (values.senha && values.senha.trim() !== "") {
        payload.senha = values.senha; 
      }

      const success = await updateUsuario(initialData.email, payload);

      if (success) {
        toast.success("Usuário atualizado com sucesso!");
        router.push("/dashboard/usuarios");
        router.refresh(); 
      } else {
        toast.error("Erro ao salvar as alterações.");
      }
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error(error?.message || "Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    router.push("/dashboard/usuarios");
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md border-green-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-full">
            <UserCog className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <CardTitle>Editar Usuário</CardTitle>
            <CardDescription>Atualize os dados cadastrais e permissões.</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* DADOS PESSOAIS */}
            <div className="space-y-2">
              <FormLabel>E-mail (Identificador)</FormLabel>
              <Input
                value={initialData.email}
                disabled
                className="bg-gray-100 cursor-not-allowed font-bold text-base text-gray-600"
              />
            </div>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do usuário" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ramal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ramal (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 102" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de Acesso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {niveis.map((nivel) => (
                        <SelectItem key={nivel.nivel} value={String(nivel.nivel)}>
                          {nivel.nivel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SENHA - COM ÍCONES DE VALIDAÇÃO */}
            <div className="pt-4 pb-2">
              <div className="flex items-center gap-2 mb-4">
                 <LockKeyhole className="w-5 h-5 text-orange-500" />
                 <h3 className="font-semibold text-lg text-gray-700">Alterar Senha</h3>
              </div>
              
              <div className="border-l-4 border-orange-100 pl-4 ml-2 space-y-4">
                 <p className="text-sm text-muted-foreground">
                    Preencha apenas se desejar alterar. Requisitos: 
                    <span className="block text-xs mt-1 text-gray-500">
                      • Mínimo 10 caracteres <br/>
                      • 1 Maiúscula, 1 Minúscula, 1 Especial
                    </span>
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="senha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova Senha</FormLabel>
                          <FormControl>
                            <Input 
                                type="password" 
                                placeholder="••••••••••" 
                                disabled={isLoading} 
                                {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmarSenha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Nova Senha</FormLabel>
                          <FormControl>
                            <Input 
                                type="password" 
                                placeholder="••••••••••" 
                                disabled={isLoading} 
                                {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}