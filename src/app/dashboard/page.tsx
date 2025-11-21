// src/app/teste/page.tsx

import { obterPermissoes ,obterEmail} from "@/utils/jwt";
import { useEffect } from "react";

 
export default async function TestePage() {
  
    const token = {
      "email": obterEmail(),
      "permissoes": obterPermissoes()
    };
    
    
  
  return (
    <>
    <h1>Teste Page</h1>
    <p>User data  : {token.email}</p>
    <p>Permissões :{token.permissoes} </p>
    
    </>
  );
}