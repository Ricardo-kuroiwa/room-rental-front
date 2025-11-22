// src/app/teste/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/components/geral/SideBar";
import { obterEmail, obterNome, obterPermissoes } from "@/utils/jwt";


export default async function TesteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const permissoes = await obterPermissoes();
  const email = await obterEmail();
  const nome = await obterNome();
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full min-h-screen bg-background text-foreground">
        <SideBar email={email} permissoes={permissoes} nome={nome}/>
        <main className="flex-1 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}