import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  email: string;
  permissoes: string[];
}

export function decodeToken(): JwtPayload | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export function obterPermissoes(): string[] {
  return decodeToken()?.permissoes || [];
}

export function obterEmail(): string {
  return decodeToken()?.email || "";
}

export function verificarPermissao(permissao: string): boolean {
  return obterPermissoes().includes(permissao);
}
