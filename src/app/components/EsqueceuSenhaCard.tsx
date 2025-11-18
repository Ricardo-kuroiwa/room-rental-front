"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um endereço de email válido.",
  }),
});

interface RecoveryApiResponse {
  message: string;
}

export function EsqueceuSenhaCard() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch(`${apiUrl}/auth/password/recovery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email }), 
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Erro ao solicitar redefinição de senha.');
            }

            const data: RecoveryApiResponse = await response.json();
            toast.success(data.message || "Instruções de redefinição de senha enviadas para seu email.");
            
            router.push('/esqueceu-a-senha/recovery');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
            toast.error(errorMessage);
        }
    }

    return (
        <main className="flex-1 flex items-center justify-center min-h-[470px] py-12 px-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Esqueceu a senha?</CardTitle>
                    <CardDescription>
                        Sem problemas! Insira seu email abaixo e enviaremos um link para você redefinir sua senha.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="seuemail@exemplo.com" 
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
                                {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
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