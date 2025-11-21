"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  KeyRound, 
  LogOut, 
  Home, 
  Building2, 
  Calendar, 
  Users, 
  User2 ,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/login";    
import { obterEmail, obterPermissoes } from "@/utils/jwt";
interface SideBarProps {
  permissoes: string[];
  email?: string;
}
const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Espaços", href: "/dashboard/espacos", icon: Building2 },
  { title: "Reservas", href: "/dashboard/reservas", icon: Calendar },
  { title: "Usuários", href: "/dashboard/usuarios", icon: Users },
  { title: "Níveis", href: "/dashboard/nivel", icon: ShieldCheck },
];



export default function SideBar({permissoes,email}: SideBarProps) {
  const pathname = usePathname();
  
  function handleClickLogout() {
    logoutAction();
  }
  const userData = {
    name: "João Delgado",
    email: email || "",
  };

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2 transition-all">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                <KeyRound className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">Space Rental</span>
                <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* MENU PRINCIPAL */}
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href} className="p-1.5">
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="text-muted-foreground">
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2">
              
              <Link 
                href="/dashboard/profile"
                className="flex flex-1 items-center gap-2 overflow-hidden rounded-md py-1.5 hover:bg-sidebar-accent transition-colors"
              >
                <div className="flex shrink-0 aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-primary-foreground border border-sidebar-border">
                   <User2 className="size-4 text-foreground" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold pl-1">{userData.name}</span>
                  <span className="truncate text-xs text-muted-foreground pl-1">{userData.email}</span>
                </div>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-red-600 hover:bg-red-50 group-data-[collapsible=icon]:hidden"
                title="Sair da conta"
                onClick={handleClickLogout}
              >
                <LogOut className="size-4" />
              </Button>

            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}