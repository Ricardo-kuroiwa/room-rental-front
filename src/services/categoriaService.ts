import { Categoria } from "@/types/categoria";

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
export async function getAllCategorias(): Promise<Categoria[]> {
  try {
    const response = await fetch(`${API_URL}/adm/categoria`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    await handleResponse(response);
    const data = await response.json();
    return Array.isArray(data) ? data : data.data ?? [];
  } catch (err: any) {
    console.error("[getAllCategorias] Exceção:", err.message);
    throw err;
  }
}
export async function getCategoriaByName(name: string): Promise<Categoria | null> {
  try {
    const encodedName = encodeURIComponent(name);
    const response = await fetch(`${API_URL}/adm/categoria/${encodedName}`, {       
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });
    await handleResponse(response);
    const data = await response.json();
    console.log("[getCategoriaByName] Data recebida:", data);
    return data;
  } catch (err: any) {
    console.error("[getCategoriaByName] Exceção:", err.message);
    return null;
  }     
}
export async function deleteCategoriaByName(name:string): Promise<boolean> {
  try {
    const encodedName = encodeURIComponent(name);
    const response = await fetch(`${API_URL}/adm/categoria/${encodedName}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    await handleResponse(response);
    return true;
  } catch (err: any) {
    console.error("[deleteCategoriaByName] Exceção:", err.message);
    return false;
  }
}
export async function createCategoria(categoria: Categoria): Promise<boolean> {
    try {   

        const response = await fetch(`${API_URL}/adm/categoria`, {  
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria),
        });
        await handleResponse(response);
        return true;
    } catch (err: any) {
        console.error("[createCategoria] Exceção:", err.message);
        return false;
    }
}
export async function updateCategoria(nome:string,categoria: Categoria): Promise<boolean> {
    try {
        const encodedName = encodeURIComponent(nome);
        const response = await fetch(`${API_URL}/adm/categoria/${encodedName}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },    
            body: JSON.stringify(categoria),
        });
        await handleResponse(response);
        return true;
    } catch (err: any) {
        console.error("[updateCategoria] Exceção:", err.message);
        return false;
    }
}