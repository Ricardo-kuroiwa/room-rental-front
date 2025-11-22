'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllCategorias, deleteCategoriaByName } from "@/services/categoriaService";
import { Categoria } from "@/types/categoria";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaToDelete, setCategoriaToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const loadCategorias = async () => {
    const data = await getAllCategorias();
    setCategorias(data || []);
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleCreate = () => {
    router.push('/dashboard/categoria/criar-categoria');
  };

  const handleEdit = (nome: string) => {
    router.push(`/dashboard/categoria/editar-categoria/${encodeURIComponent(nome)}`);
  };

  const openDeleteModal = (nome: string) => {
    setCategoriaToDelete(nome);
  };

  const confirmDelete = async () => {
    if (!categoriaToDelete) return;

    setIsDeleting(true);
    const success = await deleteCategoriaByName(categoriaToDelete);

    if (success) {
      toast.success("Categoria excluída com sucesso!");
      await loadCategorias();
    } else {
      toast.error("Erro ao excluir a categoria.");
    }

    setIsDeleting(false);
    setCategoriaToDelete(null);
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
        <TableCaption>Lista de Categorias</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categorias.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                Nenhuma categoria cadastrada.
              </TableCell>
            </TableRow>
          ) : (
            categorias.map(({ nome, descricao }) => (
              <TableRow key={nome}>
                <TableCell className="font-medium">{nome}</TableCell>
                <TableCell className="text-muted-foreground">
                  {descricao || "Sem descrição"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(nome)}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteModal(nome)}
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

      <Dialog open={categoriaToDelete !== null} onOpenChange={(open) => !open && setCategoriaToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir categoria?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir a categoria <strong>{categoriaToDelete}</strong>?
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