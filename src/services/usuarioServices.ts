import { UsuarioCreate, UsuarioResponse, UsuarioUpdate } from "@/types/usuario";

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
export async function getAllUsers(): Promise<UsuarioResponse[]> {
    try {
        const response = await fetch(`${API_URL}/adm/usuarios`, {    
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        }); 
        await handleResponse(response);
        const data = await response.json();
        return data;
    }
    catch (err: any) {
        console.error("[getAllUsers] Exceção:", err.message);
        return [];
    }
}
export async function deleteUserByEmail(email: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/adm/usuarios/${encodeURIComponent(email)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        await handleResponse(response);
        return true;
    }
    catch (err: any) {

        console.error("[deleteUserByEmail] Exceção:", err.message);
        return false;
    }
}
export async function getUsuarioByEmail(email: string): Promise<UsuarioUpdate | null> {
    console.log("Buscando usuário com email:", email);
    try {
        const response = await fetch(`${API_URL}/adm/usuarios/${(email)}`, {  
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });
        await handleResponse(response);
        const data = await response.json();
        console.log("[getUsuarioByEmail] Data recebida:", data);
        return data;
    }
    catch (err: any) {
        console.error("[getUsuarioByEmail] Exceção:", err.message);
        return null;
    }
}
export async function createCommonUser(userData: Partial<UsuarioCreate>): Promise<boolean> {
    try {
        console.log("Criando usuário comum com dados:", userData);
        const response = await fetch(`${API_URL}/adm/usuarios/comum`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        await handleResponse(response);
        return true;
    }       
    catch (err: any) {
        console.error("[createUser] Exceção:", err.message);
        return false;
    }
}
export async function createDepartmentUser(userData: Partial<UsuarioCreate>): Promise<boolean> {
    try {
        console.log("Criando usuário de departamento com dados:", userData);
        const response = await fetch(`${API_URL}/adm/usuarios/depto`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        await handleResponse(response);
        return true;
    }       
    catch (err: any) {
        console.error("[createUser] Exceção:", err.message);
        return false;
    }
}   
export async function createUser(userData: Partial<UsuarioCreate>): Promise<{ success: true } | { success: false; error: string }> {
  try {
    console.log("Criando usuário com dado brutos:", userData);
    if (userData.ramal!==null) {
      await createDepartmentUser({ ...userData, ramal: Number(userData.ramal) });
    } else {
      await createCommonUser(userData);
    }

    return { success: true };
  } catch (error: any) {
    console.error('[user.service] Falha ao criar usuário:', error.message);
    return { success: false, error: error.message || 'Erro ao criar usuário' };
  }
}
export async function updateUsuario(email: string, userData: Partial<UsuarioCreate>): Promise<{ success: true } | { success: false; error: string }> {
    try {
        if (userData.ramal!==null) {
          await updateUsuarioDepartamento(email, { ...userData, ramal: Number(userData.ramal) });
        }else{
          await updateUsuarioComum(email, userData);
        }
       return { success: true };
  } catch (error: any) {
    console.error('[user.service] Falha ao atualizar usuário:', error.message);
    return { success: false, error: error.message || 'Erro ao criar usuário' };
  }
}
export async function updateUsuarioComum(email: string, userData: Partial<UsuarioCreate>): Promise<{ success: true } | { success: false; error: string }> {
    try {
        console.log("Atualizando usuário com dados:", userData);    
        const response = await fetch(`${API_URL}/adm/usuarios/comum/${encodeURIComponent(email)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        await handleResponse(response);
       return { success: true };
  } catch (error: any) {
    console.error('[user.service] Falha ao atualizar usuário:', error.message);
    return { success: false, error: error.message || 'Erro ao criar usuário' };
  }
}
export async function updateUsuarioDepartamento(email: string, userData: Partial<UsuarioCreate>): Promise<{ success: true } | { success: false; error: string }> {
    try {
        console.log("Atualizando usuário com dados:", userData);    
        const response = await fetch(`${API_URL}/adm/usuarios/comum/${encodeURIComponent(email)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        await handleResponse(response);
       return { success: true };
  } catch (error: any) {
    console.error('[user.service] Falha ao atualizar usuário:', error.message);
    return { success: false, error: error.message || 'Erro ao criar usuário' };
  }
}