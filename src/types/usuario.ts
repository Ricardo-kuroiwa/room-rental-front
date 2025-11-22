import { NivelAcesso } from "./nivelAcesso";

export interface Usuario {
    nome :String;
    email:string;
    senhaHash: string;
    nivel : number;
    telefone: number;
    ramal ?: number;  
}
export interface UsuarioCreate {
    nome :String;
    email:string;
    senhaHash:string;
    nivel : number;
    telefone: number;
    ramal?: number | null;
}
export interface UsuarioLogin {
    email:string;
    senha:string;
}
export interface UsuarioUpdate {
    nome :String;
    email:string;
    senha:string;
    nivel : number;
    telefone: number;
    ramal?: number;
}
export interface UsuarioResponse {
    nome :String;
    email:string;
    telefone: number;
    ramal?: number;
    nivel : NivelAcesso;
}


