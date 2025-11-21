'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllNivelAcesso, deleteNivelAcessoById } from "@/services/nivelAcessoService";
import { NivelAcesso } from "@/types/nivelAcesso";
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; 
const PERMISSOES_DISPONIVEIS = [
  { id: "VIZUALIZAR_ESPACOS", label: "Visualizar Espaços" },
  { id: "CADASTEAR_ESPACOS", label: "Cadastrar Espaços" },
  { id: "CADASTRAR_USUARIOS", label: "Cadastrar Usuários" },
  { id: "RESERVAR_ESPACOS", label: "Reservar Espaços" },
] 
export default function Page() {
  const [niveis, setNiveis] = useState<NivelAcesso[]>([]);
  const [nivelToDelete, setNivelToDelete] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    async function loadNiveis() {
      const niveisData = await getAllNivelAcesso();
      setNiveis(niveisData);
    }
    loadNiveis();
  }, []);

  const handleEdit = (nivel: number) => {
    router.push(`/dashboard/nivel/editar-nivel/${nivel}`);
  };

  const openDeleteModal = (nivel: number) => {
    setNivelToDelete(nivel);
  };

  const confirmDelete = async () => {
    if (nivelToDelete !== null) {
      console.log("Confirmando a exclusão do nível:", nivelToDelete);

      // Chama o serviço para excluir o nível.
      const result: boolean = await deleteNivelAcessoById(nivelToDelete);

      if (result) {
        // Após a exclusão bem-sucedida, recarregue a lista de níveis atualizada.
        await loadNiveis();
        toast.success(`Nível de acesso ${nivelToDelete} excluído com sucesso!`);
      } else {
        toast.error(`Falha ao excluir o nível de acesso: ${nivelToDelete}`);
      }

      // Fecha o modal após a tentativa de exclusão.
      setNivelToDelete(null);
    }
  };

  // Função para recarregar os níveis após a exclusão
  const loadNiveis = async () => {
    const niveisData = await getAllNivelAcesso();
    setNiveis(niveisData);
  };
  const handleCreate = () => {
    router.push('/dashboard/nivel/criar-nivel');
  }

  return (
    <div className="container py-10">
      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleCreate}
          className='bg-green-600 text-white hover:bg-green-800'
        > 
          <Plus className="mr-2 h-4 w-4"/>
          Cadastrar
        </Button>
      </div>
      <Table>
        <TableCaption>Lista dos Níveis Cadastrados no Sistema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Nível</TableHead>
            <TableHead>Permissões</TableHead>
            <TableHead className="">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {niveis.map(({ nivel, permissoes }, index) => (
            <TableRow key={index}>
              <TableCell>{nivel}</TableCell>
              <TableCell>
                {permissoes.length > 0 ? (
                  PERMISSOES_DISPONIVEIS.filter(p => permissoes.includes(p.id))
                    .map(p => p.label).join(', ')
                ) : (
                  <p>Sem permissões</p>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleEdit(nivel)} 
                    className="bg-orange-400 hover:bg-orange-500 text-white"
                  >
                    <Pencil />
                    Editar
                  </Button>
                  <Dialog open={nivelToDelete !== null} onOpenChange={(open) => open || setNivelToDelete(null)}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => openDeleteModal(nivel)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash />
                        Excluir
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Você tem certeza?</DialogTitle> 
                      </DialogHeader>
                      <p>Deseja realmente excluir este nível de acesso?</p>
                      <DialogFooter className="flex justify-end gap-4 mt-6">
                        <DialogClose asChild>
                          <Button 
                            className='bg-red-500 hover:bg-red-700 text-white'
                            onClick={()=>handleEdit(nivel)}
                          >Cancelar</Button>
                        </DialogClose>
                        <Button
                          onClick={confirmDelete}
                          className="bg-green-700 hover:bg-green-900 text-white"
                        >
                          Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
