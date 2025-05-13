import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Tarefa.css";
import { EmailAuthCredential } from "firebase/auth/web-extension";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import useUsuario from "../hooks/useUsuario";

const TelaLogin = () =>{
    const {erro, senha, setSenha, email, setEmail, fazerLogin} = useUsuario()

return(
    <>
<div 
className="box">
<h4>
    Tela de Login
</h4>
<div
style={{color:"red"}}>
{erro?<p
aria-label="mensagem de erro">
{erro}
</p>:null}
</div>    

<form onSubmit={fazerLogin}>
    <div 
    style={
        
{
            display:"flex",
             alignItems:"center",
              gap:"10px",
               whiteSpace:"nowrap"
}
}>
    Email: 
        <input type="email"
        value={email}
        aria-label="email"
        onChange={(campo) =>{
setEmail(campo.target.value)
        }}
        />

    </div>
    <div 
    style={
{
            display:"flex",
             alignItems:"center",
              gap:"10px",
              whiteSpace:"nowrap"
}
}>
    Senha: 
<input type="password"
placeholder="senha"
aria-label="senho"
value={senha}
onChange={(campo) =>{
    setSenha(campo.target.value)
}}
/ >
    </div>
    
    <button type="submite"
    style={{padding:"10px"}}>
        Entrar
        </button>
        <p>
            <Link to="/cadUsuario">Não tem cadastro? Click aqui!</Link>
        </p>
</form>

</div>
</>
)
}
export default TelaLogin;