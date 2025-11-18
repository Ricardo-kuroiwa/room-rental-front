"use client";

import { obterEmail, obterPermissoes,decodeToken } from "../utils/jwt";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Metadata } from 'next';

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/");
      return;
    }

    const decoded = decodeToken(); 

    if (!decoded) {
      setIsTokenValid(false);
      router.push("/");
      return;
    }

    setEmail(obterEmail());
    setPermissoes(obterPermissoes());
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isTokenValid) {
    return <div>Token inválido ou expirado. Você será redirecionado para o login...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Email: <strong>{email}</strong></p>

      <h2>Permissões:</h2>
      {permissoes.length > 0 ? (
        <ul>
          {permissoes.map((permissao, i) => (
            <li key={i}>{permissao}</li>
          ))}
        </ul>
      ) : (
        <p>Você não tem permissões atribuídas.</p>
      )}
    </div>
  );
}
