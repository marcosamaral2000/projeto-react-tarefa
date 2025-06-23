import axios, { getAdapter } from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertar } from "../componentes/alertar";
import { toast, ToastContainer } from "react-toastify";

const useTarefa_mysql = () =>{
const [listaTarefas, setListaTarefas] = useState([])
const [id, setId] = useState(null)
const [titulo, setTitulo] = useState("")
const [finalizada, setFinalizada] = useState(false)
const navigate = useNavigate()

//Definição fixa da url do servidor my sql
const api = axios.create({
//    baseURL:"http://localhost:3001"
baseURL: process.env.REACT_APP_BACKEND_API_URL
})

//Recuperando o usuário logado do firebase
const auth = getAuth()
const usuario = auth.currentUser

//Função para buscar as tarefas do servidor
const buscarTarefas = async () =>{
try {
    const resposta = await api.get("/tarefas")
    const tarefasUsuario = resposta.data.filter(tarefa => tarefa.uid === usuario.uid)
    setListaTarefas(tarefasUsuario)
} catch (error) {
    alertar("Erro ao buscar tarefas do servidor: " +error)
}
}

useEffect(() =>{
    if(usuario){
            buscarTarefas()
    }
}, [usuario])

//Função para adicionar uma nova tarefa no servidor
const adicionar_tarefa = async (titulo) =>{
const novaTarefa = {
    titulo: titulo,
    finalizada: false, 
    uid: usuario.uid
}

try {
    await api.post("/tarefas", novaTarefa)
    buscarTarefas()
alertar("Tarefa adicionada com sucesso. ")
} catch (error) {
    alertar("Erro ao adicionar tarefa: " +error, {role:"alert"})
}
}

    //Função para excluir uma tarefa do servidor
    const excluir_tarefa = async (id) =>{
try {
    await api.delete("/tarefas/"+id)
    buscarTarefas()
    alertar("Tarefa excluída com sucesso. ")
} catch (error) {
    alertar("Erro ao excluir tarefa: " +error)
}        
    }

    //Função para exibir detalhes uma tarefa no servidor
    const exibir_detalhe_tarefa = (id) =>{
        const tarefa = listaTarefas.find((tarefa) => tarefa.id === id)
        navigate("/tarefaDetalhes", {state: tarefa})
    }

//Função para alterar uma tarefa
const alterar_tarefa = async (tarefa_editada) =>{
try {
    await api.put("/tarefas/"+tarefa_editada.id, tarefa_editada)
    buscarTarefas()
    alertar("Tarefa alterada com sucesso. ")
    navigate("/tarefas")
} catch (error) {
    alertar("Erro ao alterar tarefa: " +error)
}
}

return{
    id,
    setId,
listaTarefas,
setListaTarefas,
titulo,
setTitulo,
finalizada,
setFinalizada,
adicionar_tarefa,
excluir_tarefa,
alterar_tarefa,
exibir_detalhe_tarefa,
usuario,
}
}
export default useTarefa_mysql;