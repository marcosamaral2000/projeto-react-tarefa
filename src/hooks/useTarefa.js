import { getAuth } from "firebase/auth";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useTarefa = () =>{
const [tarefa, setTarefa] = useState(
{
    id: null,
    titulo: "",
    finalizada: false
}    
)
const auth = getAuth()
const usuario = auth.currentUser

const [listaTarefas, setListaTarefas] = useState(
    () =>{
        const listaTarefas_storage = localStorage.getItem("listaTarefas")
        const todasTarefas = listaTarefas_storage?JSON.parse(listaTarefas_storage):[]
        return todasTarefas.filter(tarefa => tarefa.uid === usuario.uid)
    }
)

useEffect(
    () =>{
        //Recupera lista completa de tarefas armazenada
        const listaTarefas_storage = localStorage.getItem("listaTarefas")
        const tarefasTodosUsuarios= listaTarefas_storage?JSON.parse(listaTarefas_storage):[]

        //Recupera tarefa dos outros usuários
        const tarefasOutrosUsuarios = tarefasTodosUsuarios.filter(tarefa => tarefa.uid !== usuario.uid)

        //Unir tarefas com o usuário atual com as tarefas de outros usuários
        const novaListaTarefas = [
            ...tarefasOutrosUsuarios, ...listaTarefas
        ]

        //Armazenar nova lista no local storage
        localStorage.setItem("listaTarefas", JSON.stringify(novaListaTarefas))
    }, [listaTarefas]
)

const adicionar_tarefa = (titulo) =>{
const novaTarefa = 
   {
id: Math.floor(Math.random()*1000)+1,
titulo: titulo,
finalizada: false,
uid: usuario.uid
}
const novaListaTarefas = [...listaTarefas, novaTarefa]
setListaTarefas(novaListaTarefas);
alert("Tarefa adicionada com sucesso.");
}

const excluir_tarefa = (idTarefa) =>{
    const novaListaTarefa = listaTarefas.filter(tarefa => tarefa.id !== idTarefa)
setListaTarefas(novaListaTarefa);
alert("Tarefa excluída com sucesso.")
}

const navigate = useNavigate()
const exibir_detalhe_tarefa = (id) =>{
const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
navigate("/tarefaDetalhes", { state:tarefa})
}

const alterar_tarefa = (tarefa_editada) =>{
const novaListaTarefa = listaTarefas.map(tarefa =>{
    if(tarefa.id === tarefa_editada.id){
return tarefa_editada;
    }else{
        return tarefa;
    }
})
setListaTarefas(novaListaTarefa);
alert("Tarefa alterada com sucesso.")
}

return({
    listaTarefas,
    adicionar_tarefa,
    excluir_tarefa,
    exibir_detalhe_tarefa,
    alterar_tarefa,
    usuario,
})
}
export default useTarefa;