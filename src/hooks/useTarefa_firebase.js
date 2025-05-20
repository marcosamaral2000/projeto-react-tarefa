import { getAuth } from "firebase/auth";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore/lite";

const useTarefa_firebase = () =>{
const [id, setId] = useState(null)
const [titulo, setTitulo] = useState("")
const [finalizada, setFinalizada] = useState(false)
const [listaTarefas, setListaTarefas] = useState([])

//Recuperando o usuário logado no fire base
const auth = getAuth()
const usuario = auth.currentUser

const navigate = useNavigate()

//Função para buscar as tarefas do usuário no fire base
const BuscarTarefas = async () =>{
const colecao_tarefas = collection(db, "tarefas")
const doc_tarefas = await getDocs(colecao_tarefas)

//Filtrando as tarefas do usuário logado
const listaTarefasUsuario = doc_tarefas.docs.map(
    doc => ({
        id: doc.id, 
        ...doc.data()
    })
)
.filter(tarefa => tarefa.uid === usuario.uid)
setListaTarefas(listaTarefasUsuario)
}

useEffect(( )=>{
BuscarTarefas()
}, [usuario])

//Função para adicionar uma nova tarefa no fire base

const adicionar_tarefa = async (titulo) =>{
    if(titulo.trim() === ""){
        alert("Tarefa não pode conter título embranco. ")
    }else if(titulo.length < 3 || titulo.length > 15){
alert("Tarefa precisa ter entre 3 a 15 caracteres.")
    }else{
const novaTarefa = {
    titulo: titulo,
    finalizada: false,
    uid: usuario.uid
}
try {
    const novoRegistro = await addDoc(collection(db, "tarefas"), novaTarefa)
    //Atualizando a lista de tarefas com a nova tarefa
    const novaListaTarefa = [
        ...listaTarefas, 
        {id: novoRegistro.id, ...novaTarefa}
    ]
    setListaTarefas(novaListaTarefa)
    alert("Tarefa adicionada com sucesso. ")
} catch (error) {
    alert("Erro ao adicionar tarefa:  "+error)
}
}
}

//Função para exibir detalhes das tarefa
const  exibir_detalhe_tarefa = (id) =>{
const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
navigate("/tarefaDetalhes", {state: tarefa})
}

//Função para excluir uma tarefa
const excluir_tarefa = async (id) =>{
    try {
await deleteDoc(doc(db, "tarefas", id))
setListaTarefas(listaTarefas.filter(tarefa => tarefa.id !== id))
alert("Tarefa removida. ")
    } catch (error) {
        alert("Erro ao excluir a tarefa: " +error)
    }
}

//Função para alterar uma tarefa no fire base
const alterar_tarefa = async (tarefa_editada) =>{
    try {
        const registro_tarefa = doc(db, "tarefas", tarefa_editada.id)
        await updateDoc(registro_tarefa,
            {
                titulo: tarefa_editada.titulo,
                finalizada: tarefa_editada.finalizada
            }
        )
        //Atualiza a tarefa na lista localmente
        const novaListaTarefa = listaTarefas.map((tarefa) =>
            tarefa.id === tarefa_editada.id?tarefa_editada:tarefa
        )
        setListaTarefas(novaListaTarefa)
        alert("Tarefa alterada com sucesso. ")
    } catch (error) {
        alert("Erro ao alterar tarefa: " +error)
    }
}

    return{
id,
setId,
titulo,
setTitulo,
listaTarefas,
setListaTarefas,
exibir_detalhe_tarefa,
excluir_tarefa,
usuario,
adicionar_tarefa,
alterar_tarefa,
    }
}
export default useTarefa_firebase;