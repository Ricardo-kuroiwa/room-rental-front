"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getNivelAcessoById } from '@/services/nivelAcessoService';
import { NivelAcesso } from '@/types/nivelAcesso';
import { NivelAcessoFormEdit } from '@/components/geral/NivelAcessoFormEdit'; 
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditarNivelPage() {
  const { id } = useParams();
  const router = useRouter();
  const [nivel, setNivel] = useState<NivelAcesso | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para garantir ID numérico válido
  const getValidId = (id: string | string[] | undefined): number | null => {
    if (Array.isArray(id)) return id.length > 0 ? Number(id[0]) : null;
    if (typeof id === 'string') return Number(id);
    return null;
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const validId = getValidId(id);

    if (!validId) {
      if(isMounted) {
        setError('ID inválido.');
        setLoading(false);
      }
      return;
    }

    const fetchNivel = async () => {
      setLoading(true);
      setError(null);

      try {
        const nivelData = await getNivelAcessoById(validId);
        
        if (isMounted) {
          if (nivelData) {
            setNivel(nivelData);
          } else {
            setError('Nível de Acesso não encontrado.');
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Erro ao buscar nível:", error);
          setError('Erro ao carregar dados.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNivel();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando dados do nível...</p>
      </div>
    );
  }

  if (error || !nivel) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h2 className="text-xl font-bold text-red-600">Ops! Algo deu errado.</h2>
        <p className="text-muted-foreground">{error || "Não foi possível encontrar os dados."}</p>
        <Button onClick={() => router.push('/dashboard/nivel')} variant="outline">
          Voltar para lista
        </Button>
      </div>
    );
  }

  // Se carregou com sucesso, renderiza o formulário passando os dados
  return (
    <div className="container py-10">
      <NivelAcessoFormEdit initialData={nivel} />
    </div>
  );
}