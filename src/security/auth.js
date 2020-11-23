import request from "./request"
import decode from "jwt-decode"

export async function signIn(email, password){
    const data = await request('POST','auth/login',{
        email, 
        password
    });
    sessionStorage.setItem('id', data.id)
    sessionStorage.setItem('nome', data.nome)
    sessionStorage.setItem('email', data.email)
    sessionStorage.setItem('perfil', data.perfil)
    sessionStorage.setItem('token', data.token)
    return data
}

export function signOut(){
    sessionStorage.removeItem('token')    
}

export function isSignedIn(){
    const token = sessionStorage.getItem('token')

    if(!token)
        return false
    try{
        const {exp: expiration} = decode(token)
        const isExpired = !!expiration && Date.now() > expiration * 1000

        if(isExpired)
            return false
        return true 
    }catch(_){
        return false
    }
}