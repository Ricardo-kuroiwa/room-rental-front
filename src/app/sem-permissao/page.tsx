"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SemPermissaoPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info("Redirecionando para o dashboard...");
      router.push("/dashboard");
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex-1 flex items-center justify-center min-h-screen py-12 px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Acesso Negado</CardTitle>
          <CardDescription>
            Você não tem permissão para acessar esta página. Você será redirecionado para o painel principal em breve.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Se você acredita que isso é um erro, entre em contato com o administrador.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 mt-8">
          <Button variant="outline" disabled className="w-full">
            Você será redirecionado em breve...
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
