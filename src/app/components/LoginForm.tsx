// app/components/LoginForm.tsx
"use client";//rodar no cliente

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

// 1. Schema de validação atualizado para email e senha
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres.",
  }),
});

export function LoginForm() {
  // 2. Definição do formulário com os novos valores padrão
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Função de submit (aqui você chamaria sua API ou Server Action)
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Dados do formulário validados:", values);
    alert("Login enviado! Verifique o console do navegador. }"+{values});
  }

  return (
    // 4. Container principal que centraliza o conteúdo
    <main className="flex-1 flex items-center justify-center py-18  bg-gray-50">
      
      {/* 5. O "div meio quadrado" usando o componente Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
            <div className="flex justify-center items-center gap-2 mb-6">
                <div className="bg-violet-100 p-3 rounded-full">
                <KeyRound className="h-7 w-7 text-violet-600" /> 
                </div>
                <p className="text-xl font-bold text-gray-900">Space Rental</p>
            </div>
          <CardTitle className="text-2xl">Acesse sua conta</CardTitle>
          <CardDescription>
            Insira seu email e senha para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo de Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seuemail@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Campo de Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}