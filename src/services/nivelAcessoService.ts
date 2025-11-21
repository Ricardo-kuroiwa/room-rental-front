import { NivelAcesso } from "@/types/nivelAcesso";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error("A URL da API não está definida");
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `Erro ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData && (errorData.error || errorData.message)) {
        errorMessage = errorData.error || errorData.message;
      }
    } catch (e) {
    }
    throw new Error(errorMessage);
  }
  return response;
};

export async function getAllNivelAcesso(): Promise<NivelAcesso[]> {
  try {
    const response = await fetch(`${API_URL}/adm/niveis`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    await handleResponse(response);

    const data = await response.json();
    return Array.isArray(data) ? data : data.data ?? [];
  } catch (err: any) {
    console.error("[getAllNivelAcesso] Exceção:", err.message);
    throw err;
  }
}

export async function getNivelAcessoById(id: number): Promise<NivelAcesso | null> {
  try {
    const response = await fetch(`${API_URL}/adm/niveis/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (response.status === 404) return null;
    await handleResponse(response);

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error("[getNivelAcessoById] Exceção:", err.message);
    return null;
  }
}

export async function deleteNivelAcessoById(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/adm/niveis/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    await handleResponse(response);
    return true;
  } catch (err: any) {
    console.error("[deleteNivelAcessoById] Exceção:", err.message);
    return false;
  }
}

export async function createNivelAcesso(nivelAcesso: NivelAcesso): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/adm/niveis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nivelAcesso),
    });

    await handleResponse(response);
    return true;
  } catch (err: any) {
    console.error("[createNivelAcesso] Exceção:", err.message);
    return false;
  }
}

export async function updateNivelAcesso(nivel: NivelAcesso): Promise<boolean> {
  try {
    const id = (nivel as any).nivel; 
    
    const response = await fetch(`${API_URL}/adm/niveis/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nivel),
    });

    await handleResponse(response);
    return true;
  } catch (err: any) {
    console.error("[updateNivelAcesso] Exceção:", err.message);
    return false;
  }
}