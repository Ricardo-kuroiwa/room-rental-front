// File: app/login/page.tsx

"use client";

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';

export default function SimpleApiTestPage() {
  
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Supondo que este endpoint retorne um array de usuários com a estrutura fornecida
        const response = await fetch('http://localhost:8080/adm/usuarios');
        
        if (!response.ok) {
          throw new Error(`A resposta da rede não foi "ok": ${response.statusText}`);
        }
        
        const data = await response.json();
        setUsers(data);
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Teste de Conexão com a API Spring Boot</h1>

      {loading && <p>Carregando dados da API...</p>}
      
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      
      {!loading && !error && (
        <div>
          <h2>Usuários Encontrados:</h2>
          {users.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {users.map((user, index) => (
                // --- CORREÇÃO PARA DADOS ANINHADOS ---
                <li key={user.email || index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                  <strong>Nome:</strong> {user.nome} <br />
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Telefone:</strong> {user.telefone} <br />
                  
                  {/* Acessando a propriedade do objeto aninhado */}
                  <strong>Nível ID:</strong> {user.nivel.nivel} <br />

                  <strong>Permissões:</strong>
                  {/* Mapeando o array aninhado para criar uma lista */}
                  <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                    {user.nivel.permissaos.map((permissao: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, permIndex: Key | null | undefined) => (
                      <li key={permIndex}>{permissao}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum usuário foi encontrado ou a lista está vazia.</p>
          )}
        </div>
      )}
    </div>
  );
}