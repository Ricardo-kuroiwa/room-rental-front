// src/app/dashboard/usuario/editar-usuario/[email]/page.tsx

// SEM "use client" -> Isso roda no servidor
import { getUsuarioByEmail } from "@/services/usuarioServices";
import { getAllNivelAcesso } from "@/services/nivelAcessoService";
import { UsuarioFormEdit } from "@/components/geral/UsuarioFormEdit"; // Seu form cliente

interface PageProps {
    params: Promise<{
        email: string;
    }>;
}
export default async function PageUsuarioEdit(props: PageProps) {
    const params = await props.params;
    const [user,niveis] = await Promise.all([
        getUsuarioByEmail(params.email  ),
        getAllNivelAcesso()
    ]);
    console.log("Níveis de Acesso disponíveis:", niveis);
    console.log("Dados do usuário para edição:", user);

    if (!user) {
        return <div>Usuário não encontrado</div>;
    }

    return (
        <div className="container py-10">
            <UsuarioFormEdit 
                initialData={user} 
                niveis={niveis} 
            />
        </div>
    );
}