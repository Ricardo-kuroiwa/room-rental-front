'use client';
import { CategoriaFormEdit } from "@/components/geral/CategoriaFormEdit";
import { Button } from "@/components/ui/button";
import { getCategoriaByName } from "@/services/categoriaService";
import { Categoria } from "@/types/categoria";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageEditCategoria() {
    const { nome } = useParams();
    const nomeCategoria = nome ? decodeURIComponent(nome as string) : "";
    const router = useRouter();
    const [categoria,setCategoria] = useState<Categoria |null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!nomeCategoria) {
            setError("Nome da categoria não informado.");
            
            setLoading(false);
            return;
        } 
        const fetchCategoria = async () => {
            setLoading(true);
            setError(null);
            console.log(nomeCategoria);
            try {
                const categoriaData = await getCategoriaByName(nomeCategoria);
                if (categoriaData) {
                    setCategoria(categoriaData);
                } else {
                    console.log("Data : ", categoriaData);
                    setError("Categoria não encontrada.");
                }
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar a categoria. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategoria();
    },[nomeCategoria]);
    if (loading) {
        return (
        <div className="container py-10 flex justify-center">
            <div className="text-lg">Carregando categoria...</div>
        </div>
        );
    }

    if (error || !categoria) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h2 className="text-xl font-bold text-red-600">Ops! Algo deu errado.</h2>
        <p className="text-muted-foreground">{error || "Não foi possível encontrar os dados."}</p>
        <Button onClick={() => router.push('/dashboard/categoria')} variant="outline">
          Voltar para lista
        </Button>
      </div>
    );
  }

    return (
        <div className="container py-10">
            <CategoriaFormEdit initialData={categoria} />
        </div>
    );
}