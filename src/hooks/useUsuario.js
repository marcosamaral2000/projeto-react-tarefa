import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FaSignOutAlt } from "react-icons/fa";

const useUsuario = () =>{
    const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")
const [erro, setErro] = useState("")
const navigate = useNavigate()

const fazerLogin = async(e)=>{
    e.preventDefault()
    setErro("")
    try {
        await
        signInWithEmailAndPassword(auth, email, senha)
        navigate("/tarefas")
    } catch (error) {
        setErro("Email ou senha inválido. ")
    }
}

const fazerLogout = async (e) =>{
e.preventDefault()
setErro("")
try {
    await FaSignOutAlt(auth)
    navigate("/")
} catch (error) {
setErro("Erro ao fazer logout: ", error)    
}

}

const cadUsuario = async (e) =>{
e.preventDefault()
setErro("")
try {
    await createUserWithEmailAndPassword(auth, email, senha)
    alert("Cadastro erralizado com sucesso. ")
    navigate("/")
} catch (error) {
    setErro("Erro ao cadastrar: " + error.message)
}
}

    return(
{
    email,
    senha,
    erro,
    setEmail,
    setSenha,
    cadUsuario,
    fazerLogin,
    fazerLogout,
}
    )
}
export default useUsuario;