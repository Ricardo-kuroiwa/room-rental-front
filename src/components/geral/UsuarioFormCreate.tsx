"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, UserPlus } from "lucide-react";
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
import { NivelAcesso } from "@/types/nivelAcesso";
import { createUser  } from "@/services/usuarioServices";

const formSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .email("Insira um e-mail válido"),
  telefone: z
    .string()
    .min(8, "Telefone inválido"),
  ramal: z.string().optional(),
  nivel: z.string().min(1, "Selecione um nível de acesso"),
});

type FormValues = z.infer<typeof formSchema>;


interface UsuarioFormCreateProps {
  niveis: NivelAcesso[];
}

export function UsuarioFormCreate({ niveis }: UsuarioFormCreateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      ramal: "",
      nivel: "",
    },
  });
  function gerarSenhaAleatoria(tamanho: number = 10): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let senha = "";

    for (let i = 0; i < tamanho; i++) {
      const aleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres[aleatorio];
    }

    return senha;
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // 2. Prepara o objeto para enviar ao Java
      const payload = {
        nome: values.nome,
        email: values.email,
        telefone: Number(values.telefone),
        ramal: values.ramal ? Number(values.ramal) : null,
        nivel: Number(values.nivel),
        senhaHash : gerarSenhaAleatoria(),
      };

      // 3. Chama o serviço diretamente
      const success = await createUser(payload);
      if (success) {
        toast.success("Usuário cadastrado com sucesso!");
        
        // 4. Atualiza a lista e redireciona
        router.refresh(); // Atualiza o cache do Next.js
        router.push("/dashboard/usuarios"); 
      } else {
        toast.error("Erro ao criar usuário.");
      }
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      toast.error(error?.message || "Erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-green-200">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <UserPlus className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Cadastrar Novo Usuário</CardTitle>
            <CardDescription>
              Preencha os dados pessoais e defina o nível de acesso.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* NOME */}
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: João da Silva"
                      disabled={isLoading}
                      className="font-medium"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GRID: EMAIL E TELEFONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="joao@exemplo.com"
                        type="email"
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
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(00) 00000-0000"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* GRID: RAMAL E NÍVEL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ramal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ramal (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 102"
                        disabled={isLoading}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>

            {/* BOTÕES */}
            <div className="flex justify-end gap-4 pt-8 border-t">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push("/dashboard/usuarios")}
                disabled={isLoading}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Cadastrar Usuário
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}