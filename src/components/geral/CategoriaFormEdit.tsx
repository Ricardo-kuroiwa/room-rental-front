"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Tag } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updateCategoria } from "@/services/categoriaService";
import { Categoria } from "@/types/categoria";

const formSchema = z.object({
  descricao: z.string().nonempty("A descrição não pode ser vazia").max(500, "A descrição deve ter no máximo 500 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoriaFormEditProps {
  initialData: Categoria;
}

export function CategoriaFormEdit({ initialData }: CategoriaFormEditProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: initialData.descricao ?? "", 
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const success = await updateCategoria(initialData.nome, 
        
      {
        nome: initialData.nome,
        descricao: values.descricao?.trim() ?? "",
      });

      if (success) {
        toast.success("Categoria atualizada com sucesso!");
        router.push("/dashboard/categoria");
        router.refresh();
      } else {
        toast.error("Erro ao salvar as alterações.");
      }
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    router.push("/dashboard/categoria");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md border-green-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-full">
            <Tag className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <CardTitle>Editar Categoria</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <FormLabel>Nome da Categoria</FormLabel>
              <Input
                value={initialData.nome}
                disabled
                className="bg-gray-100 cursor-not-allowed font-bold text-base max-w-md"
              />
            </div>

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Usado para salas de aula do ensino médio, laboratórios de informática, etc."
                      className="resize-none min-h-28"
                      {...field}
                      value={field.value ?? ''} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-6">
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