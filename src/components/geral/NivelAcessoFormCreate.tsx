// src/app/components/NivelAcessoForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {createNivelAcesso} from "@/services/nivelAcessoService";
import { useRouter } from "next/navigation";
const PERMISSOES_DISPONIVEIS = [
  { id: "VIZUALIZAR_ESPACOS", label: "Visualizar Espaços" },
  { id: "CADASTEAR_ESPACOS", label: "Cadastrar Espaços" },
  { id: "CADASTRAR_USUARIOS", label: "Cadastrar Usuários" },
  { id: "RESERVAR_ESPACOS", label: "Reservar Espaços" },
] as const;

const formSchema = z.object({
  nivel: z.number({
  
      error: "Nível é obrigatório e deve ser um número",
    })
    .int("O nível deve ser um número inteiro")
    .min(2, "O nível deve ser no mínimo 2"),
  permissoes: z
    .array(z.string())
    .refine((value) => value.length > 0, {
      message: "Selecione pelo menos uma permissão.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function NivelAcessoFormCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nivel: 2,
      permissoes: [],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      await createNivelAcesso(values);
      form.reset();
      toast.success("Cadastrado com sucesso!");
      router.push('/dashboard/nivel');
    } catch (error) {
      toast.error("Erro ao cadastrar.");
    } finally {
      setIsLoading(false);
    }
  }
  function handleCancel() {
    router.push('/dashboard/nivel');
  }
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Novo Nível de Acesso</CardTitle>
            <CardDescription>Defina a hierarquia e permissões.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* --- CAMPO NÍVEL (A CORREÇÃO ESTÁ AQUI) --- */}
            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 1" 
                      disabled={isLoading}
                      className="max-w-[150px]"
                      
                      {...field}
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        field.onChange(isNaN(value) ? "" : value); 
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --- CAMPO PERMISSÕES --- */}
            <FormField
              control={form.control}
              name="permissoes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Permissões</FormLabel>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PERMISSOES_DISPONIVEIS.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="permissoes"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:bg-accent">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((val) => val !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer w-full">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="button"  className="mr-2 bg-red-500"  onClick={() => handleCancel()} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-800" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isLoading ? "Salvando..." : "Salvar Nível"}
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}