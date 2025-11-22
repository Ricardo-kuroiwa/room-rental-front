import { UsuarioFormCreate } from "@/components/geral/UsuarioFormCreate";
import { getAllNivelAcesso } from "@/services/nivelAcessoService";

export default async function CriarUsuarioPage() {
  const niveisData = await getAllNivelAcesso() || [];

  return (
    <div className="container py-10">
      
      <UsuarioFormCreate niveis={niveisData} />
    </div>
  );
}