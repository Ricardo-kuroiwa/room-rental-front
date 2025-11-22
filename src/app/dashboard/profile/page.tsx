import { getUsuarioByEmail } from "@/services/usuarioServices";
import { UserProfile } from "@/components/geral/UserProfile";

export default async function ProfilePage() {
  // ⚠️ TODO: Em produção, pegue este email da sessão do usuário logado!
  // Exemplo: const session = await getServerSession(); const email = session.user.email;
  const emailUsuarioLogado = "fabio@gmail.com"; // HARDCODED PARA TESTE

  const user = await getUsuarioByEmail(emailUsuarioLogado);

  if (!user) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Erro ao carregar perfil</h1>
        <p className="text-muted-foreground">Não foi possível identificar o usuário logado.</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Meu Perfil</h1>
      </div>
      
      <UserProfile user={user} />
    </div>
  );
}