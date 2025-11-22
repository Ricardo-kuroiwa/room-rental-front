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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { createCategoria } from "@/services/categoriaService";

const formSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome não pode ter mais de 50 caracteres"),
  descricao: z.string().nonempty("A descrição não pode ser vazia").max(500, "A descrição deve ter no máximo 500 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export function CategoriaFormCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const success = await createCategoria({
        nome: values.nome,
        descricao: values.descricao.trim() ?? "",
      });

      if (success) {
        toast.success("Categoria criada com sucesso!");
        router.push("/dashboard/categoria");
        router.refresh();
      } else {
        toast.error("Erro ao criar categoria. Verifique se o nome já existe.");
      }
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
      toast.error(error?.message || "Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-green-200">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Tag className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Criar Nova Categoria</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* NOME DA CATEGORIA */}
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Laboratório de Informática"
                      disabled={isLoading}
                      className="text-lg font-medium"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DESCRIÇÃO */}
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Usado para salas com computadores, projetores e acesso à internet para aulas práticas."
                      className="resize-none min-h-32"
                      disabled={isLoading}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BOTÕES */}
            <div className="flex justify-end gap-4 pt-8 border-t">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push("/dashboard/categoria")}
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
                    Criando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Criar Categoria
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