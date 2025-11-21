// src/app/actions/login.ts
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

export async function loginAction(email: string, senha: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Falha no login" };
    }
    (await cookies()).set("authToken", data.token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", // Só HTTPS em produção
      path: "/dashboard", 
      maxAge: 60 * 60 * 24 * 7, 
    });

    return { success: true, message: data.message };
    
  } catch (err) {
    console.error(err);
    return { success: false, error: "Erro de conexão com o servidor." };
  }
}
export async function logoutAction() {
  (await cookies()).delete({
      name: "authToken",
      path: "/dashboard" 
  });
  redirect("/");
} 