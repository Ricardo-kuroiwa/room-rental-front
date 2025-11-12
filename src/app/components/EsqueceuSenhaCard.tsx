"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function EsqueceuSenhaCard() {
     const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        
        setMessage("");

        try {
            await fetch(`http://localhost:8080/auth/password/recovery/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            router.push('/');
        } catch (error) {
            console.error("Erro ao solicitar redefinição de senha:", error);
            setMessage("Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Esqueceu a senha?</CardTitle>
                    <CardDescription>
                        Sem problemas! Insira seu email abaixo e enviaremos um token para você redefinir sua senha.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seuemail@exemplo.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {message && <p className="text-sm text-muted-foreground">{message}</p>}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Enviando..." : "Enviar link de redefinição"}
                        </Button>
                        <Button variant="link" asChild>
                           <Link href="/">Voltar para o login</Link>
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}