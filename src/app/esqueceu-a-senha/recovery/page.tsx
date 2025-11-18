// /app/esqueceu-a-senha/recovery/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
  token: z.string().min(1, { message: "Token é obrigatório." }),
  newPassword: z.string().min(6, { message: "A nova senha deve ter no mínimo 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "A confirmação de senha deve ter no mínimo 6 caracteres." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

interface ChangePasswordApiResponse {
  message: string;
}

export default function RecuperarSenhaCard() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/auth/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao redefinir a senha.");
      }

      const data: ChangePasswordApiResponse = await response.json();
      toast.success(data.message || "Senha redefinida com sucesso.");

      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center min-h-screen py-12 px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Redefinir Senha</CardTitle>
          <CardDescription>
            Insira o token e as novas senhas abaixo para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token de Recuperação</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o token recebido"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua nova senha"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua nova senha"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mt-8">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
              </Button>
              <Button variant="link" asChild>
                <Link href="/">Voltar para o login</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
