"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { updateNivelAcesso } from "@/services/nivelAcessoService";
import { NivelAcesso } from "@/types/nivelAcesso";

const PERMISSOES_DISPONIVEIS = [
  { id: "VIZUALIZAR_ESPACOS", label: "Visualizar Espaços" },
  { id: "CADASTEAR_ESPACOS", label: "Cadastrar Espaços" },
  { id: "CADASTRAR_USUARIOS", label: "Cadastrar Usuários" },
  { id: "RESERVAR_ESPACOS", label: "Reservar Espaços" },
] as const;

const formSchema = z.object({
  nivel: z.number(),
  permissoes: z
    .array(z.string())
    .refine((value) => value.length > 0, {
      message: "Selecione pelo menos uma permissão.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface NivelAcessoFormEditProps {
  initialData: NivelAcesso;
}

export function NivelAcessoFormEdit({ initialData }: NivelAcessoFormEditProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nivel: initialData.nivel,
      permissoes: initialData.permissoes || [], 
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const success = await updateNivelAcesso(values);
      
      if (success) {
        toast.success("Nível de acesso atualizado com sucesso!");
        router.push('/dashboard/nivel');
        router.refresh(); 
      } else {
        toast.error("Erro ao atualizar. Verifique o console.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro inesperado ao atualizar.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    router.push('/dashboard/nivel');
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md border-orange-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 p-2 rounded-full">
            <ShieldAlert className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <CardTitle>Editar Nível de Acesso</CardTitle>
            <CardDescription>Altere as permissões para o nível <strong>{initialData.nivel}</strong>.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível (Identificador)</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={true}
                      {...field} 
                      className="bg-gray-100 cursor-not-allowed max-w-[150px] font-bold"
                    />
                  </FormControl>
                  <FormDescription>
                    O identificador do nível não pode ser alterado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="flex justify-end gap-3">
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
                className="bg-orange-500 text-white hover:bg-orange-700" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Alterações
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}