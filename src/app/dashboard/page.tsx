// src/app/teste/page.tsx

import { obterPermissoes ,obterEmail, obterNome} from "@/utils/jwt";

 
export default async function TestePage() {

    const token = {
      "email": obterEmail(),
      "permissoes": obterPermissoes(),
      "nome": obterNome()
    };
    
    
    
  
  return (
    <>
    
    </>
  );
}