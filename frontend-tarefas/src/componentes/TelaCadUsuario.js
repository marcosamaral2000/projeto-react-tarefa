import React from "react";
import useUsuario from "../hooks/useUsuario";
import { useNavigate } from "react-router-dom";

const TelaCadUsuario = () =>{
const {email, senha, erro, cadUsuario, setEmail, setSenha} = useUsuario()
const navigate = useNavigate()

const clickVoltar = () =>{
    navigate("/")
}

    return(
<>
<div className="box">
    <h4>Tela de Cadastro de Usuário</h4>
    <div
    style={{color:"red"}}>
        {erro?(
            <p
            aria-label="Mensagem de erro">
                {erro}
            </p>
        ):null}
    </div>
    <form onSubmit={cadUsuario}>
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
aria-label="email"
onChange={(campo) =>{
setEmail(campo.target.value) 
}}
/ >

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
    aria-label="senha"
    onChange={(campo) =>{
        setSenha(campo.target.value)
    }}
    / >
</div>
<div 
style={{padding:"10px"}}>
  <button type="submite">Cadastrar</button>
    <button onClick={clickVoltar}>Voltar</button>
</div>
    </form>
</div>
</>        
    )
}
export default TelaCadUsuario;