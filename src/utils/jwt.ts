//app/utils/jwt.ts
import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers'

interface JwtPayload {
  sub: string;
  permissoes: string[];
}

export async function decodeToken(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value || null;
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export async function obterPermissoes(): Promise<string[]> {
  const token = await decodeToken();
  return token?.permissoes || [];
}

export async function obterEmail(): Promise<string> {
  const token = await decodeToken();
  return token?.sub || "";
}

export async function verificarPermissao(permissao: string): Promise<boolean> {
  const permissoes = await obterPermissoes();
  return permissoes.includes(permissao);
}
