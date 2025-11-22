"use client";

import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash } from "lucide-react";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Opcional, para deixar bonito
import { UsuarioResponse } from "@/types/usuario";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "sonner";
import { deleteUserAction } from "@/app/actions/usuario-action";

interface UsuarioTableProps {
  data: UsuarioResponse[];
}

export function UsuarioTable({ data }: UsuarioTableProps) {
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleCreate = () => router.push('/dashboard/usuarios/criar-usuario');
  
  const handleEdit = (email: string) => {
    router.push(`/dashboard/usuarios/editar-usuario/${email}`);
  };
    const openDeleteModal = (email: string) => {
    setUserToDelete(email);
  };
  const confirmDelete = async () => {
    if (userToDelete === null) return;

    setIsDeleting(true);
    const result = await deleteUserAction(userToDelete);
    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message);
      setUserToDelete(null);
    } else {
      toast.error(result.message);
    }
    
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho com Botão Criar */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>
        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <div >
        <Table>
          <TableCaption>Lista de usuários cadastrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Ramal</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              data.map((usuario) => (
                <TableRow key={usuario.email}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium flex items-center gap-2">
                        {usuario.nome}
                      </span>
                    </div>
                  </TableCell>
                <TableCell>{usuario.email}</TableCell>

                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2 text-sm">
                        {usuario.telefone}
                      </div>
                      
                    </div>
                  </TableCell>
                  <TableCell>{usuario.ramal || '-'}</TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {usuario.nivel.nivel}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell >
                    <div className="flex  gap-3">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(usuario.email)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => openDeleteModal(usuario.email)}
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
      </div>
      <Dialog open={userToDelete !== null} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir nível de acesso?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o usuario <strong>{userToDelete}</strong>? 
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