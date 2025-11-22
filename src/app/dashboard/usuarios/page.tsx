
import { getAllUsers } from "@/services/usuarioServices";
import { UsuarioTable } from '@/components/geral/UsuarioTable';
export default async function Page() {

  const usuarios = await getAllUsers() || [];

  return (
    <div className="container py-10">
      <UsuarioTable data={usuarios} />
    </div>
  );
}