'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllNivelAcesso, deleteNivelAcessoById } from "@/services/nivelAcessoService";
import { NivelAcesso } from "@/types/nivelAcesso";
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PERMISSOES_DISPONIVEIS = [
  { id: "VIZUALIZAR_ESPACOS", label: "Visualizar Espaços" },
  { id: "CADASTEAR_ESPACOS", label: "Cadastrar Espaços" },
  { id: "CADASTRAR_USUARIOS", label: "Cadastrar Usuários" },
  { id: "RESERVAR_ESPACOS", label: "Reservar Espaços" },
] as const;

export default function Page() {
  const [niveis, setNiveis] = useState<NivelAcesso[]>([]);
  const [nivelToDelete, setNivelToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const loadNiveis = async () => {
    const niveisData = await getAllNivelAcesso();
    setNiveis(niveisData || []);
  };

  useEffect(() => {
    loadNiveis();
  }, []);

  const handleCreate = () => {
    router.push('/dashboard/nivel/criar-nivel');
  };

  const handleEdit = (nivel: number) => {
    router.push(`/dashboard/nivel/editar-nivel/${nivel}`);
  };

  const openDeleteModal = (nivel: number) => {
    setNivelToDelete(nivel);
  };

  const confirmDelete = async () => {
    if (nivelToDelete === null) return;

    setIsDeleting(true);
    const success = await deleteNivelAcessoById(nivelToDelete);

    if (success) {
      toast.success("Nível de acesso excluído com sucesso!");
      await loadNiveis();
    } else {
      toast.error("Erro ao excluir o nível de acesso.");
    }

    setIsDeleting(false);
    setNivelToDelete(null);
  };

  return (
    <div className="container py-10">
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar
        </Button>
      </div>

      <Table>
        <TableCaption>Lista dos Níveis Cadastrados no Sistema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Nível</TableHead>
            <TableHead>Permissões</TableHead>
            <TableHead >Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {niveis.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                Nenhum nível de acesso cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            niveis.map(({ nivel, permissoes }) => (
              <TableRow key={nivel}>
                <TableCell className="font-medium">{nivel}</TableCell>
                <TableCell>
                  {permissoes.length > 0 ? (
                    PERMISSOES_DISPONIVEIS
                      .filter(p => permissoes.includes(p.id))
                      .map(p => p.label)
                      .join(', ')
                  ) : (
                    <span className="text-muted-foreground">Sem permissões</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex  gap-3">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(nivel)}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteModal(nivel)}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={nivelToDelete !== null} onOpenChange={(open) => !open && setNivelToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir nível de acesso?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o nível <strong>{nivelToDelete}</strong>? 
            Esta ação não pode ser desfeita.
          </p>
          <DialogFooter className="gap-3 sm:gap-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Excluindo..." : "Sim, excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}