'use server';
import { createUser, deleteUserByEmail, getUsuarioByEmail } from "@/services/usuarioServices";
import { UsuarioCreate } from "@/types/usuario";
import { revalidatePath } from "next/cache";
import { id } from "zod/v4/locales";


export async function deleteUserAction(email: string) {
  try {
    const success = await deleteUserByEmail(email);

    if (success) {
      revalidatePath("/dashboard/usuario");
      return { success: true, message: "Usuário excluído com sucesso!" };
    } else {
      return { success: false, message: "Erro ao excluir usuário. Tente novamente." };
    }
  } catch (error) {
    console.error("Erro na action:", error);
    return { success: false, message: "Erro interno do servidor." };
  }
}
export async function createUserAction(userData: Partial<UsuarioCreate>) {
  try {
    const  success = await createUser(userData);
  
    if (success) {
      revalidatePath("/dashboard/usuarios");
      return { success: true, message: "Usuário criado com sucesso!" };
    }
  } catch (error) {
    console.error("Erro na action:", error);
    return { success: false, message: "Erro interno do servidor." };
  }
}
export async function getUserAction(email: string) {
  try {
    const user = await getUsuarioByEmail(email);
    return user;
  } catch (error) {
    console.error("Erro na action:", error);
    return null;
  } 
}
    